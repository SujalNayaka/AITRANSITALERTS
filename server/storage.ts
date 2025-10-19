import { type User, type InsertUser, type Vehicle, type Alert, type PassengerData } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // User methods
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Vehicle methods
  getVehicles(): Vehicle[];
  getVehicle(id: string): Vehicle | undefined;
  updateVehicle(id: string, updates: Partial<Vehicle>): Vehicle | undefined;
  
  // Alert methods
  getAlerts(): Alert[];
  createAlert(alert: Omit<Alert, 'id' | 'timestamp' | 'acknowledged'>): Alert;
  acknowledgeAlert(id: string): Alert | undefined;
  
  // Passenger data methods
  getPassengerData(): PassengerData[];
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private vehicles: Map<string, Vehicle>;
  private alerts: Map<string, Alert>;
  private passengerData: PassengerData[];

  constructor() {
    this.users = new Map();
    this.vehicles = new Map();
    this.alerts = new Map();
    this.passengerData = [];
    
    // Initialize with sample data
    this.initializeVehicles();
    this.initializePassengerData();
  }

  // User methods
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Vehicle methods
  getVehicles(): Vehicle[] {
    return Array.from(this.vehicles.values());
  }

  getVehicle(id: string): Vehicle | undefined {
    return this.vehicles.get(id);
  }

  updateVehicle(id: string, updates: Partial<Vehicle>): Vehicle | undefined {
    const vehicle = this.vehicles.get(id);
    if (!vehicle) return undefined;

    const updatedVehicle = { ...vehicle, ...updates };
    
    // Update status based on passenger count
    const capacityPercent = (updatedVehicle.passengerCount / updatedVehicle.capacity) * 100;
    if (capacityPercent >= 80) {
      updatedVehicle.status = 'critical';
    } else if (capacityPercent >= 60) {
      updatedVehicle.status = 'medium';
    } else {
      updatedVehicle.status = 'normal';
    }

    this.vehicles.set(id, updatedVehicle);
    return updatedVehicle;
  }

  // Alert methods
  getAlerts(): Alert[] {
    return Array.from(this.alerts.values());
  }

  createAlert(alertData: Omit<Alert, 'id' | 'timestamp' | 'acknowledged'>): Alert {
    const alert: Alert = {
      id: randomUUID(),
      ...alertData,
      timestamp: new Date().toISOString(),
      acknowledged: false,
    };
    this.alerts.set(alert.id, alert);
    return alert;
  }

  acknowledgeAlert(id: string): Alert | undefined {
    const alert = this.alerts.get(id);
    if (!alert) return undefined;

    const updatedAlert = { ...alert, acknowledged: true };
    this.alerts.set(id, updatedAlert);
    return updatedAlert;
  }

  // Passenger data methods
  getPassengerData(): PassengerData[] {
    return this.passengerData;
  }

  // Initialize sample vehicles (Bangalore routes)
  private initializeVehicles() {
    const vehicles: Vehicle[] = [
      {
        id: randomUUID(),
        name: "Bus MH-01",
        type: "bus",
        route: "Route 356E - Whitefield to Majestic",
        latitude: 12.9716,
        longitude: 77.5946,
        passengerCount: 45,
        capacity: 60,
        status: "medium",
        speed: 35,
        lastUpdated: new Date().toISOString(),
      },
      {
        id: randomUUID(),
        name: "Bus MH-02",
        type: "bus",
        route: "Route 500K - Kengeri to KR Market",
        latitude: 12.9141,
        longitude: 77.4925,
        passengerCount: 28,
        capacity: 60,
        status: "normal",
        speed: 42,
        lastUpdated: new Date().toISOString(),
      },
      {
        id: randomUUID(),
        name: "Metro M1",
        type: "train",
        route: "Purple Line - Whitefield to Challaghatta",
        latitude: 13.0358,
        longitude: 77.5970,
        passengerCount: 150,
        capacity: 180,
        status: "critical",
        speed: 60,
        lastUpdated: new Date().toISOString(),
      },
      {
        id: randomUUID(),
        name: "Bus MH-03",
        type: "bus",
        route: "Route 201A - Yeshwanthpur to Banashankari",
        latitude: 12.9879,
        longitude: 77.5704,
        passengerCount: 35,
        capacity: 60,
        status: "normal",
        speed: 38,
        lastUpdated: new Date().toISOString(),
      },
      {
        id: randomUUID(),
        name: "Metro M2",
        type: "train",
        route: "Green Line - Nagasandra to Silk Institute",
        latitude: 12.9352,
        longitude: 77.6245,
        passengerCount: 120,
        capacity: 180,
        status: "medium",
        speed: 55,
        lastUpdated: new Date().toISOString(),
      },
    ];

    vehicles.forEach(vehicle => {
      this.vehicles.set(vehicle.id, vehicle);
    });
  }

  // Initialize passenger trend data
  private initializePassengerData() {
    this.passengerData = [
      { route: "Route 356E", time: "06:00", passengers: 45, hour: 6 },
      { route: "Route 356E", time: "07:00", passengers: 72, hour: 7 },
      { route: "Route 356E", time: "08:00", passengers: 120, hour: 8 },
      { route: "Route 356E", time: "09:00", passengers: 95, hour: 9 },
      { route: "Route 356E", time: "10:00", passengers: 68, hour: 10 },
      { route: "Route 356E", time: "11:00", passengers: 55, hour: 11 },
      { route: "Route 356E", time: "12:00", passengers: 82, hour: 12 },
      { route: "Route 356E", time: "13:00", passengers: 70, hour: 13 },
      { route: "Route 356E", time: "14:00", passengers: 58, hour: 14 },
      { route: "Route 356E", time: "15:00", passengers: 65, hour: 15 },
      { route: "Route 356E", time: "16:00", passengers: 88, hour: 16 },
      { route: "Route 356E", time: "17:00", passengers: 105, hour: 17 },
      { route: "Route 356E", time: "18:00", passengers: 135, hour: 18 },
      { route: "Route 356E", time: "19:00", passengers: 115, hour: 19 },
      { route: "Route 356E", time: "20:00", passengers: 85, hour: 20 },
      { route: "Route 356E", time: "21:00", passengers: 52, hour: 21 },
    ];
  }
}

export const storage = new MemStorage();
