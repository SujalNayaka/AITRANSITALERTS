import type { Express } from "express";
import { createServer, type Server } from "http";
import { WebSocketServer, WebSocket } from "ws";
import { storage } from "./storage";
import type { Vehicle, Alert, CrowdDetection, WSMessage, PassengerData } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  const httpServer = createServer(app);

  // WebSocket server for real-time updates
  const wss = new WebSocketServer({ server: httpServer, path: '/ws' });

  wss.on('connection', (ws) => {
    console.log('Client connected to WebSocket');

    // Send initial data
    const vehicles = storage.getVehicles();
    const alerts = storage.getAlerts();
    
    ws.send(JSON.stringify({
      type: 'initial_data',
      vehicles,
      alerts,
    }));

    ws.on('close', () => {
      console.log('Client disconnected from WebSocket');
    });

    ws.on('error', (error) => {
      console.error('WebSocket error:', error);
    });
  });

  // Broadcast function to all connected clients
  const broadcast = (message: WSMessage) => {
    const data = JSON.stringify(message);
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
  };

  // Start simulation loops
  startVehicleSimulation(broadcast);
  startCrowdDetectionSimulation(broadcast);
  startAlertMonitoring(broadcast);

  // API Routes
  app.get('/api/vehicles', (req, res) => {
    res.json(storage.getVehicles());
  });

  app.get('/api/vehicles/:id', (req, res) => {
    const vehicle = storage.getVehicle(req.params.id);
    if (vehicle) {
      res.json(vehicle);
    } else {
      res.status(404).json({ error: 'Vehicle not found' });
    }
  });

  app.get('/api/alerts', (req, res) => {
    res.json(storage.getAlerts());
  });

  app.post('/api/alerts/:id/acknowledge', (req, res) => {
    const alert = storage.acknowledgeAlert(req.params.id);
    if (alert) {
      res.json(alert);
    } else {
      res.status(404).json({ error: 'Alert not found' });
    }
  });

  app.get('/api/analytics/passengers', (req, res) => {
    res.json(storage.getPassengerData());
  });

  return httpServer;
}

// Simulate vehicle movement and passenger updates
function startVehicleSimulation(broadcast: (message: WSMessage) => void) {
  // Update vehicles every 3 seconds
  setInterval(() => {
    const vehicles = storage.getVehicles();
    
    vehicles.forEach(vehicle => {
      // Simulate GPS movement (small random changes)
      const latChange = (Math.random() - 0.5) * 0.002;
      const lonChange = (Math.random() - 0.5) * 0.002;
      
      // Simulate passenger count changes
      const passengerChange = Math.floor(Math.random() * 10) - 5;
      const newPassengerCount = Math.max(0, Math.min(
        vehicle.capacity,
        vehicle.passengerCount + passengerChange
      ));

      // Update vehicle
      const updatedVehicle = storage.updateVehicle(vehicle.id, {
        latitude: vehicle.latitude + latChange,
        longitude: vehicle.longitude + lonChange,
        passengerCount: newPassengerCount,
        speed: Math.floor(Math.random() * 30) + 20, // 20-50 km/h
        lastUpdated: new Date().toISOString(),
      });

      if (updatedVehicle) {
        broadcast({
          type: 'vehicle_update',
          data: updatedVehicle,
        });
      }
    });
  }, 3000);
}

// Simulate crowd detection from webcam
function startCrowdDetectionSimulation(broadcast: (message: WSMessage) => void) {
  // Send detection updates every 2 seconds
  setInterval(() => {
    const personCount = Math.floor(Math.random() * 15) + 5; // 5-20 people
    const boundingBoxes = Array.from({ length: personCount }, () => ({
      x: Math.random() * 600,
      y: Math.random() * 400,
      width: 40 + Math.random() * 40,
      height: 80 + Math.random() * 80,
      confidence: 0.7 + Math.random() * 0.3,
    }));

    const detection: CrowdDetection = {
      personCount,
      timestamp: new Date().toISOString(),
      boundingBoxes,
      confidence: 0.85 + Math.random() * 0.15,
    };

    broadcast({
      type: 'crowd_detection',
      data: detection,
    });
  }, 2000);
}

// Monitor vehicles and create alerts when needed
function startAlertMonitoring(broadcast: (message: WSMessage) => void) {
  setInterval(() => {
    const vehicles = storage.getVehicles();
    
    vehicles.forEach(vehicle => {
      const capacityPercent = (vehicle.passengerCount / vehicle.capacity) * 100;
      
      // Check if we should create an alert
      if (capacityPercent > 80 && vehicle.status === 'critical') {
        // Check if there's already a recent alert for this vehicle
        const recentAlerts = storage.getAlerts().filter(
          a => a.vehicleId === vehicle.id && !a.acknowledged
        );

        if (recentAlerts.length === 0) {
          const alert = storage.createAlert({
            vehicleId: vehicle.id,
            vehicleName: vehicle.name,
            type: 'overcrowding',
            severity: 'high',
            message: `Critical overcrowding detected: ${vehicle.passengerCount}/${vehicle.capacity} passengers (${Math.round(capacityPercent)}%)`,
          });

          broadcast({
            type: 'alert',
            data: alert,
          });
        }
      } else if (capacityPercent > 60 && vehicle.status === 'medium') {
        const recentAlerts = storage.getAlerts().filter(
          a => a.vehicleId === vehicle.id && !a.acknowledged && a.severity === 'medium'
        );

        if (recentAlerts.length === 0) {
          const alert = storage.createAlert({
            vehicleId: vehicle.id,
            vehicleName: vehicle.name,
            type: 'capacity',
            severity: 'medium',
            message: `Moderate crowd level: ${vehicle.passengerCount}/${vehicle.capacity} passengers (${Math.round(capacityPercent)}%)`,
          });

          broadcast({
            type: 'alert',
            data: alert,
          });
        }
      }
    });
  }, 5000);
}
