import { Card } from "@/components/ui/card";
import { Users, Bus, TrendingUp, Bell } from "lucide-react";
import { WebcamView } from "@/components/WebcamView";
import { MapView } from "@/components/MapView";
import { PassengerChart } from "@/components/PassengerChart";
import { AlertFeed } from "@/components/AlertFeed";
import { useWebSocket } from "@/hooks/useWebSocket";
import { useQuery } from "@tanstack/react-query";

export default function Dashboard() {
  const { isConnected, vehicles, alerts, acknowledgeAlert } = useWebSocket();
  
  // Fetch passenger analytics data
  const { data: passengerData = [] } = useQuery({
    queryKey: ['/api/analytics/passengers'],
  });

  const totalPassengers = vehicles.reduce((sum, v) => sum + v.passengerCount, 0);
  const avgDensity = vehicles.length > 0
    ? Math.round(vehicles.reduce((sum, v) => sum + (v.passengerCount / v.capacity) * 100, 0) / vehicles.length)
    : 0;
  const activeAlerts = alerts.filter(a => !a.acknowledged).length;

  const stats = [
    {
      label: "Total Passengers",
      value: totalPassengers,
      icon: Users,
      gradient: "from-chart-1 to-chart-3",
      testId: "stat-total-passengers",
    },
    {
      label: "Active Vehicles",
      value: vehicles.length,
      icon: Bus,
      gradient: "from-chart-2 to-chart-1",
      testId: "stat-active-vehicles",
    },
    {
      label: "Avg Density",
      value: `${avgDensity}%`,
      icon: TrendingUp,
      gradient: "from-chart-3 to-chart-4",
      testId: "stat-avg-density",
    },
    {
      label: "Active Alerts",
      value: activeAlerts,
      icon: Bell,
      gradient: "from-chart-5 to-chart-2",
      testId: "stat-active-alerts",
    },
  ];

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-[1800px] mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Live Dashboard</h1>
            <p className="text-muted-foreground">Real-time transit monitoring and analytics</p>
          </div>
          
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card border border-card-border">
            <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-chart-4 animate-pulse-glow' : 'bg-muted'}`} />
            <span className="text-sm font-mono" data-testid="text-connection-status">
              {isConnected ? 'Connected' : 'Connecting...'}
            </span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="p-6 hover-elevate animate-fade-in" data-testid={stat.testId}>
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                    <p className="text-3xl font-bold font-mono">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-lg bg-gradient-to-br ${stat.gradient}`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Webcam View */}
          <div className="h-[400px] animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <WebcamView />
          </div>

          {/* Map View */}
          <div className="h-[400px] animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <MapView vehicles={vehicles} />
          </div>

          {/* Passenger Chart */}
          <div className="h-[400px] animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <PassengerChart data={passengerData} />
          </div>

          {/* Alert Feed */}
          <div className="h-[400px] animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <AlertFeed alerts={alerts} onAcknowledge={acknowledgeAlert} />
          </div>
        </div>
      </div>
    </div>
  );
}
