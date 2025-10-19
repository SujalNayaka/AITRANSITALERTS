import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, real, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Vehicle tracking types
export interface Vehicle {
  id: string;
  name: string;
  type: 'bus' | 'train';
  route: string;
  latitude: number;
  longitude: number;
  passengerCount: number;
  capacity: number;
  status: 'normal' | 'medium' | 'critical';
  speed: number;
  lastUpdated: string;
}

// Real-time crowd detection data
export interface CrowdDetection {
  personCount: number;
  timestamp: string;
  boundingBoxes: BoundingBox[];
  confidence: number;
}

export interface BoundingBox {
  x: number;
  y: number;
  width: number;
  height: number;
  confidence: number;
}

// Alert system
export interface Alert {
  id: string;
  vehicleId: string;
  vehicleName: string;
  type: 'overcrowding' | 'capacity' | 'delay';
  severity: 'low' | 'medium' | 'high';
  message: string;
  timestamp: string;
  acknowledged: boolean;
}

// Passenger analytics data
export interface PassengerData {
  route: string;
  time: string;
  passengers: number;
  hour: number;
}

// WebSocket message types
export type WSMessage = 
  | { type: 'vehicle_update'; data: Vehicle }
  | { type: 'crowd_detection'; data: CrowdDetection }
  | { type: 'alert'; data: Alert }
  | { type: 'analytics_update'; data: PassengerData[] };
