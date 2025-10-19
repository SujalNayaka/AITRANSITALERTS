import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Map, Navigation } from "lucide-react";
import type { Vehicle } from "@shared/schema";

interface MapViewProps {
  vehicles: Vehicle[];
}

export function MapView({ vehicles }: MapViewProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const leafletMapRef = useRef<any>(null);
  const markersRef = useRef<Map<string, any>>(new Map());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!mapRef.current || leafletMapRef.current) return;

    // Wait for Leaflet to load
    const initializeMap = () => {
      const L = (window as any).L;
      if (!L) {
        console.error("Leaflet not loaded");
        setIsLoading(false);
        return;
      }

      try {
        // Bangalore coordinates
        const map = L.map(mapRef.current).setView([12.9716, 77.5946], 13);

        L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
          maxZoom: 19,
        }).addTo(map);

        leafletMapRef.current = map;
        setIsLoading(false);
      } catch (error) {
        console.error("Error initializing Leaflet map:", error);
        setIsLoading(false);
      }
    };

    // Check if Leaflet is already loaded
    if ((window as any).L) {
      initializeMap();
    } else {
      // Wait for Leaflet to load
      const checkLeaflet = setInterval(() => {
        if ((window as any).L) {
          clearInterval(checkLeaflet);
          initializeMap();
        }
      }, 100);

      // Timeout after 5 seconds
      setTimeout(() => {
        clearInterval(checkLeaflet);
        if (!leafletMapRef.current) {
          console.error("Leaflet failed to load within timeout");
          setIsLoading(false);
        }
      }, 5000);
    }

    return () => {
      if (leafletMapRef.current) {
        try {
          leafletMapRef.current.remove();
        } catch (e) {
          console.error("Error removing map:", e);
        }
        leafletMapRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!leafletMapRef.current || isLoading) return;

    const L = (window as any).L;
    
    vehicles.forEach(vehicle => {
      const existingMarker = markersRef.current.get(vehicle.id);
      
      if (existingMarker) {
        // Update existing marker
        existingMarker.setLatLng([vehicle.latitude, vehicle.longitude]);
        existingMarker.setPopupContent(createPopupContent(vehicle));
      } else {
        // Create new marker
        const color = getStatusColor(vehicle.status);
        const icon = L.divIcon({
          className: 'custom-marker',
          html: `
            <div class="relative">
              <div class="absolute inset-0 rounded-full ${color} opacity-50 blur-md animate-pulse-glow"></div>
              <div class="relative w-8 h-8 rounded-full ${color} border-2 border-white flex items-center justify-center shadow-lg">
                <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                </svg>
              </div>
            </div>
          `,
          iconSize: [32, 32],
          iconAnchor: [16, 16],
        });

        const marker = L.marker([vehicle.latitude, vehicle.longitude], { icon })
          .addTo(leafletMapRef.current)
          .bindPopup(createPopupContent(vehicle));

        markersRef.current.set(vehicle.id, marker);
      }
    });

    // Remove markers for vehicles that no longer exist
    markersRef.current.forEach((marker, id) => {
      if (!vehicles.find(v => v.id === id)) {
        marker.remove();
        markersRef.current.delete(id);
      }
    });
  }, [vehicles, isLoading]);

  const createPopupContent = (vehicle: Vehicle) => {
    const statusColor = getStatusTextColor(vehicle.status);
    const percentage = Math.round((vehicle.passengerCount / vehicle.capacity) * 100);
    
    return `
      <div class="p-2 min-w-[200px]">
        <div class="font-bold text-base mb-2">${vehicle.name}</div>
        <div class="space-y-1 text-sm">
          <div class="flex justify-between">
            <span class="text-gray-400">Route:</span>
            <span class="font-mono">${vehicle.route}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-400">Passengers:</span>
            <span class="font-mono">${vehicle.passengerCount}/${vehicle.capacity}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-400">Capacity:</span>
            <span class="font-mono">${percentage}%</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-400">Status:</span>
            <span class="font-semibold ${statusColor}">${vehicle.status.toUpperCase()}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-400">Speed:</span>
            <span class="font-mono">${vehicle.speed} km/h</span>
          </div>
        </div>
      </div>
    `;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal': return 'bg-green-500';
      case 'medium': return 'bg-amber-500';
      case 'critical': return 'bg-red-500';
      default: return 'bg-blue-500';
    }
  };

  const getStatusTextColor = (status: string) => {
    switch (status) {
      case 'normal': return 'text-green-400';
      case 'medium': return 'text-amber-400';
      case 'critical': return 'text-red-400';
      default: return 'text-blue-400';
    }
  };

  return (
    <Card className="p-6 h-full flex flex-col">
      <div className="flex items-center gap-2 mb-4">
        <div className="p-2 rounded-lg bg-gradient-to-br from-chart-2 to-chart-1">
          <Map className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="font-semibold text-lg">GPS Tracking</h3>
          <p className="text-sm text-muted-foreground">Live Vehicle Positions</p>
        </div>
      </div>

      <div className="relative flex-1 rounded-lg overflow-hidden border border-card-border">
        <div ref={mapRef} className="absolute inset-0 z-0" data-testid="map-container" />
        
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-muted/30 backdrop-blur-sm z-10">
            <div className="flex flex-col items-center gap-4">
              <Navigation className="w-12 h-12 text-primary animate-spin" />
              <p className="text-muted-foreground">Loading map...</p>
            </div>
          </div>
        )}

        <div className="absolute top-4 left-4 z-10 flex gap-2">
          <div className="flex items-center gap-2 bg-background/90 backdrop-blur-sm px-3 py-2 rounded-lg border border-border">
            <div className="w-3 h-3 rounded-full bg-green-500 shadow-neon-green" />
            <span className="text-xs">Normal</span>
          </div>
          <div className="flex items-center gap-2 bg-background/90 backdrop-blur-sm px-3 py-2 rounded-lg border border-border">
            <div className="w-3 h-3 rounded-full bg-amber-500 shadow-neon-amber" />
            <span className="text-xs">Medium</span>
          </div>
          <div className="flex items-center gap-2 bg-background/90 backdrop-blur-sm px-3 py-2 rounded-lg border border-border">
            <div className="w-3 h-3 rounded-full bg-red-500 shadow-neon-red" />
            <span className="text-xs">Critical</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
