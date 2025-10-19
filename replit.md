# AI-Transit Alerts

## Project Overview

AI-Transit Alerts is a real-time AI-powered public transport monitoring system that combines webcam crowd detection, GPS vehicle tracking, and intelligent analytics to prevent overcrowding and improve transit safety.

## Purpose & Goals

- **Real-time Crowd Detection**: Use AI (simulated YOLOv8) to detect and count passengers via webcam
- **GPS Vehicle Tracking**: Monitor 3-5 transit vehicles with live location updates on an interactive map
- **Data Analytics**: Visualize passenger trends and patterns with interactive charts
- **Smart Alerts**: Trigger notifications when overcrowding thresholds are exceeded
- **Professional Presentation**: College mini-project with modern, futuristic UI design

## Current State

### Completed Features
- ✅ Futuristic UI with dark theme, blue/violet neon gradients, and smooth animations
- ✅ Navigation system with 5 pages: Home, System, Dashboard, Team, Architecture
- ✅ Home page with hero section and feature cards
- ✅ Webcam component with real browser camera access and live AI detection overlay
- ✅ Interactive map component using Leaflet.js with 5 live-tracked vehicles
- ✅ Real-time dashboard with live-updating metric cards and WebSocket connection status
- ✅ Passenger trend chart using Recharts with real analytics data
- ✅ Alert feed component with severity classification and acknowledgment
- ✅ System overview page explaining all modules with live demo
- ✅ Architecture flow diagram showing complete data pipeline
- ✅ Team page showcasing 4 students and faculty guide
- ✅ Responsive design with proper spacing, typography, and accessibility
- ✅ Backend WebSocket server broadcasting real-time updates
- ✅ API endpoints for vehicle data, analytics, and alert management
- ✅ Simulated AI detection logic sending crowd data every 2 seconds
- ✅ GPS coordinate simulation with 5 vehicles moving across Bangalore
- ✅ Alert threshold monitoring creating alerts for overcrowding
- ✅ Full frontend-backend integration with WebSocket hooks
- ✅ Real-time data synchronization across all components

### Next Phase
- Real YOLOv8 integration with Python backend
- External GPS API integration for live vehicle tracking
- Sound alerts and browser notifications
- Historical data analysis with date filtering
- Admin panel for configuration management

## Project Structure

```
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navigation.tsx         # Main navigation bar
│   │   │   ├── WebcamView.tsx         # Webcam feed with AI overlay
│   │   │   ├── MapView.tsx            # Leaflet GPS map
│   │   │   ├── PassengerChart.tsx     # Recharts analytics
│   │   │   ├── AlertFeed.tsx          # Real-time alerts
│   │   │   └── ui/                    # shadcn components
│   │   ├── pages/
│   │   │   ├── Home.tsx               # Landing page
│   │   │   ├── Dashboard.tsx          # Main dashboard
│   │   │   ├── System.tsx             # System overview
│   │   │   ├── Team.tsx               # Team members
│   │   │   └── Architecture.tsx       # Technical flow
│   │   ├── App.tsx                    # Main app with routing
│   │   └── index.css                  # Global styles
│   └── index.html                     # HTML entry point
├── server/
│   ├── routes.ts                      # API & WebSocket routes
│   └── storage.ts                     # In-memory data storage
├── shared/
│   └── schema.ts                      # TypeScript types & interfaces
└── design_guidelines.md               # UI/UX design system
```

## Architecture

### Data Flow
1. **Camera → AI Model**: WebRTC captures video → Simulated YOLOv8 detects people
2. **GPS → Map**: Vehicle coordinates → Leaflet.js visualization
3. **Data → Analytics**: Passenger counts → Recharts graphs
4. **Alerts → Dashboard**: Threshold monitoring → Real-time notifications
5. **WebSocket**: Bidirectional real-time updates between frontend/backend

### Technology Stack

**Frontend**:
- React.js with TypeScript
- Tailwind CSS + shadcn/ui components
- Recharts for data visualization
- Leaflet.js for interactive maps
- WebRTC for camera access
- Wouter for client-side routing

**Backend**:
- Node.js + Express
- WebSocket (ws package) for real-time communication
- In-memory storage (MemStorage)
- RESTful API endpoints

**AI & Data**:
- Simulated YOLOv8 detection (MVP)
- GPS coordinate simulation
- JSON/CSV ticketing data
- Threshold-based alert system

## Team

### Development Team
- **Apeksha S** [1MP23AD003]
- **Hima Gowda N** [1MP23AD016]
- **Ramya R** [1MP23AD042]
- **Sohan M** [1MP22AD048]

### Project Guide
- **Mamatha V Jadhav**
  - Assistant Professor
  - Dept. of AI & DS
  - BGSCET

## Design System

The application follows a **futuristic AI monitoring** aesthetic:
- Dark theme with neon blue (#3B82F6) and violet (#8B5CF6) accents
- Glassmorphism effects with backdrop blur
- Neon glow shadows on interactive elements
- Smooth animations (pulse, fade-in, slide-in)
- Consistent spacing (4, 6, 8, 12, 16, 20, 24px units)
- Typography: Inter (UI), JetBrains Mono (metrics), Space Grotesk (headings)

See `design_guidelines.md` for complete design specifications.

## User Preferences

- College project requiring professional presentation quality
- Modern futuristic design with cyberpunk aesthetics preferred
- Real-time functionality is critical for demo purposes
- Must run directly on Replit without complex setup
- Dark mode only (no light mode toggle needed for MVP)

## Recent Changes

### 2025-01-19 - Phase 1 Complete
- Created all data schemas and TypeScript interfaces
- Configured design tokens in tailwind.config.ts with neon gradients
- Built complete navigation system with active state indicators
- Implemented Home page with hero section and feature showcase
- Created WebcamView component with camera access and overlay UI
- Built MapView with Leaflet.js integration and status markers
- Developed Dashboard with live metrics and 4-panel grid layout
- Added PassengerChart with Recharts line graph visualization
- Created AlertFeed with severity-based styling and scroll area
- Built System page with live demo and module cards
- Implemented Architecture page with flow diagram and tech stack
- Created Team page with member cards and guide section
- Installed Recharts package for data visualization
- Added Leaflet CSS and JS for map functionality
- Configured SEO meta tags and page titles

## Notes

- WebSocket integration planned for Phase 2 backend implementation
- Camera detection currently shows UI only; AI logic will be added in Phase 2
- Map displays empty until vehicle data is connected via WebSocket
- All components follow design guidelines for consistent UX
- Responsive design tested for mobile, tablet, and desktop viewports
