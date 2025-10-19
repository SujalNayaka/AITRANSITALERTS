import { useEffect, useRef, useState, useCallback } from "react";
import type { Vehicle, Alert, CrowdDetection, WSMessage } from "@shared/schema";

export function useWebSocket() {
  const [isConnected, setIsConnected] = useState(false);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [crowdDetection, setCrowdDetection] = useState<CrowdDetection | null>(null);
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    // Construct WebSocket URL using window.location.origin
    const wsUrl = new URL('/ws', window.location.origin);
    wsUrl.protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
    
    const socket = new WebSocket(wsUrl.toString());
    wsRef.current = socket;

    socket.onopen = () => {
      console.log('WebSocket connected');
      setIsConnected(true);
    };

    socket.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);
        
        if (message.type === 'initial_data') {
          setVehicles(message.vehicles || []);
          setAlerts(message.alerts || []);
        } else if (message.type === 'vehicle_update') {
          const updatedVehicle: Vehicle = message.data;
          setVehicles(prev => {
            const index = prev.findIndex(v => v.id === updatedVehicle.id);
            if (index >= 0) {
              const newVehicles = [...prev];
              newVehicles[index] = updatedVehicle;
              return newVehicles;
            }
            return [...prev, updatedVehicle];
          });
        } else if (message.type === 'alert') {
          const newAlert: Alert = message.data;
          setAlerts(prev => [newAlert, ...prev]);
        } else if (message.type === 'crowd_detection') {
          setCrowdDetection(message.data);
        }
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
      }
    };

    socket.onclose = () => {
      console.log('WebSocket disconnected');
      setIsConnected(false);
    };

    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
      setIsConnected(false);
    };

    return () => {
      socket.close();
    };
  }, []);

  const acknowledgeAlert = useCallback(async (id: string) => {
    // Optimistically update UI
    setAlerts(prev => prev.map(alert =>
      alert.id === id ? { ...alert, acknowledged: true } : alert
    ));
    
    // Persist to backend
    try {
      await fetch(`/api/alerts/${id}/acknowledge`, { method: 'POST' });
    } catch (error) {
      console.error('Failed to acknowledge alert:', error);
      // Revert on error
      setAlerts(prev => prev.map(alert =>
        alert.id === id ? { ...alert, acknowledged: false } : alert
      ));
    }
  }, []);

  return {
    isConnected,
    vehicles,
    alerts,
    crowdDetection,
    acknowledgeAlert,
  };
}
