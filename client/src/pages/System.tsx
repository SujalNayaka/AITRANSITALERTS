import { Card } from "@/components/ui/card";
import { Camera, Users, Map, TrendingUp, Bell, Zap } from "lucide-react";
import { WebcamView } from "@/components/WebcamView";

export default function System() {
  const modules = [
    {
      icon: Camera,
      title: "Webcam Interface",
      description: "Access camera feed",
      color: "from-chart-1 to-chart-3",
      details: [
        "Real-time video streaming",
        "YOLOv8 object detection",
        "Bounding box visualization",
        "Person counting algorithm",
      ],
    },
    {
      icon: Users,
      title: "AI Detection",
      description: "Process crowd data",
      color: "from-chart-2 to-chart-1",
      details: [
        "Deep learning inference",
        "Confidence scoring",
        "Multi-person tracking",
        "Real-time analysis",
      ],
    },
    {
      icon: Map,
      title: "GPS Integration",
      description: "Track vehicle location",
      color: "from-chart-3 to-chart-4",
      details: [
        "Live coordinate updates",
        "Route visualization",
        "Interactive mapping",
        "Status color coding",
      ],
    },
    {
      icon: TrendingUp,
      title: "Data Analysis",
      description: "Generate insights",
      color: "from-chart-4 to-chart-5",
      details: [
        "Passenger trend analysis",
        "Peak hour detection",
        "Route optimization",
        "Historical comparisons",
      ],
    },
    {
      icon: Bell,
      title: "Alert System",
      description: "Trigger notifications",
      color: "from-chart-5 to-chart-2",
      details: [
        "Threshold monitoring",
        "Real-time alerts",
        "Severity classification",
        "Notification delivery",
      ],
    },
    {
      icon: Zap,
      title: "WebSocket Sync",
      description: "Real-time updates",
      color: "from-chart-1 to-chart-2",
      details: [
        "Bidirectional communication",
        "Low latency updates",
        "Connection management",
        "Data synchronization",
      ],
    },
  ];

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            System <span className="bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent">Overview</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Comprehensive monitoring system combining AI detection, GPS tracking, and real-time analytics
          </p>
        </div>

        {/* Live Webcam Demo */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Live Detection Demo</h2>
          <div className="h-[500px]">
            <WebcamView />
          </div>
        </div>

        {/* System Modules */}
        <div>
          <h2 className="text-2xl font-bold mb-6">System Modules</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.map((module, index) => {
              const Icon = module.icon;
              return (
                <Card
                  key={index}
                  className="p-6 hover-elevate group cursor-pointer"
                  data-testid={`card-module-${index}`}
                >
                  <div className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${module.color} mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                    {module.title}
                  </h3>
                  
                  <p className="text-muted-foreground mb-4">
                    {module.description}
                  </p>
                  
                  <ul className="space-y-2">
                    {module.details.map((detail, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5" />
                        <span className="text-muted-foreground">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
