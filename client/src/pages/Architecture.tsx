import { Card } from "@/components/ui/card";
import { Camera, Cpu, Database, Map, Bell, ArrowRight, Zap } from "lucide-react";
import { useState } from "react";

export default function Architecture() {
  const [hoveredModule, setHoveredModule] = useState<number | null>(null);

  const modules = [
    {
      icon: Camera,
      title: "Webcam Input",
      description: "Browser WebRTC API captures live video feed from user's camera at 640x480 resolution",
      gradient: "from-chart-1 to-chart-3",
      technical: "getUserMedia() → Video Stream",
    },
    {
      icon: Cpu,
      title: "AI Model",
      description: "YOLOv8 Nano performs real-time object detection, identifying people with bounding boxes and confidence scores",
      gradient: "from-chart-2 to-chart-1",
      technical: "YOLOv8n → Person Detection",
    },
    {
      icon: Database,
      title: "Data Integration",
      description: "Combines crowd detection data with GPS coordinates, ticketing records, and vehicle telemetry",
      gradient: "from-chart-3 to-chart-4",
      technical: "WebSocket → Real-time Sync",
    },
    {
      icon: Map,
      title: "Dashboard",
      description: "React-based interface displays live metrics, interactive maps, charts, and vehicle tracking on unified view",
      gradient: "from-chart-4 to-chart-5",
      technical: "React + Recharts + Leaflet",
    },
    {
      icon: Bell,
      title: "Alert System",
      description: "Monitors passenger thresholds and triggers visual/audio notifications when overcrowding is detected",
      gradient: "from-chart-5 to-chart-2",
      technical: "Threshold Logic → Notifications",
    },
  ];

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">
            System <span className="bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent">Architecture</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            End-to-end data flow from camera to intelligent alerts
          </p>
        </div>

        {/* Flow Diagram */}
        <div className="relative">
          <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-4">
            {modules.map((module, index) => {
              const Icon = module.icon;
              const isHovered = hoveredModule === index;
              
              return (
                <div key={index} className="flex items-center">
                  <Card
                    className={`p-6 w-48 hover-elevate cursor-pointer transition-all duration-300 ${
                      isHovered ? 'scale-105 shadow-neon-blue' : ''
                    }`}
                    onMouseEnter={() => setHoveredModule(index)}
                    onMouseLeave={() => setHoveredModule(null)}
                    data-testid={`card-architecture-${index}`}
                  >
                    <div className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${module.gradient} mb-3`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    
                    <h3 className="font-semibold mb-2 text-sm">
                      {module.title}
                    </h3>
                    
                    <p className="text-xs text-muted-foreground font-mono">
                      {module.technical}
                    </p>
                  </Card>

                  {index < modules.length - 1 && (
                    <div className="hidden lg:block mx-2">
                      <ArrowRight className="w-6 h-6 text-primary" />
                    </div>
                  )}
                  
                  {index < modules.length - 1 && (
                    <div className="lg:hidden my-2">
                      <ArrowRight className="w-6 h-6 text-primary rotate-90" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Module Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {modules.map((module, index) => {
            const Icon = module.icon;
            return (
              <Card
                key={index}
                className="p-6 hover-elevate"
                data-testid={`card-module-detail-${index}`}
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-lg bg-gradient-to-br ${module.gradient} flex-shrink-0`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-2">{module.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {module.description}
                    </p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Technical Stack */}
        <div>
          <h2 className="text-2xl font-bold mb-6 text-center">Technology Stack</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 rounded-lg bg-gradient-to-br from-chart-1 to-chart-3">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-semibold">Frontend</h3>
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• React.js with TypeScript</li>
                <li>• Tailwind CSS + shadcn/ui</li>
                <li>• Recharts for analytics</li>
                <li>• Leaflet.js for mapping</li>
                <li>• WebRTC for camera access</li>
              </ul>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 rounded-lg bg-gradient-to-br from-chart-2 to-chart-1">
                  <Database className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-semibold">Backend</h3>
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Node.js + Express</li>
                <li>• WebSocket (Socket.io)</li>
                <li>• Python Flask (AI Model)</li>
                <li>• RESTful API endpoints</li>
                <li>• Real-time data streaming</li>
              </ul>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 rounded-lg bg-gradient-to-br from-chart-3 to-chart-4">
                  <Cpu className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-semibold">AI & Data</h3>
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• YOLOv8 Nano model</li>
                <li>• Ultralytics framework</li>
                <li>• CSV/JSON data sources</li>
                <li>• GPS coordinate simulation</li>
                <li>• Threshold-based alerts</li>
              </ul>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
