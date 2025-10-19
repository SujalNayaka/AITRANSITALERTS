import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bell, AlertTriangle, Info, CheckCircle, X } from "lucide-react";
import type { Alert } from "@shared/schema";

interface AlertFeedProps {
  alerts: Alert[];
  onAcknowledge?: (id: string) => void;
}

export function AlertFeed({ alerts, onAcknowledge }: AlertFeedProps) {
  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'high':
        return <AlertTriangle className="w-5 h-5 text-destructive" />;
      case 'medium':
        return <Bell className="w-5 h-5 text-amber-500" />;
      default:
        return <Info className="w-5 h-5 text-chart-1" />;
    }
  };

  const getSeverityBorder = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'border-l-destructive shadow-neon-red';
      case 'medium':
        return 'border-l-amber-500 shadow-neon-amber';
      default:
        return 'border-l-chart-1 shadow-neon-blue';
    }
  };

  return (
    <Card className="p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-gradient-to-br from-chart-5 to-chart-2">
            <Bell className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-lg">Alert Feed</h3>
            <p className="text-sm text-muted-foreground">Real-time Notifications</p>
          </div>
        </div>
        
        {alerts.length > 0 && (
          <div className="px-3 py-1 rounded-full bg-destructive/10 border border-destructive/30">
            <span className="text-sm font-semibold text-destructive" data-testid="text-alert-count">
              {alerts.filter(a => !a.acknowledged).length} Active
            </span>
          </div>
        )}
      </div>

      <ScrollArea className="flex-1 -mx-6 px-6">
        {alerts.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full py-12">
            <div className="p-4 rounded-full bg-muted/30 mb-4">
              <CheckCircle className="w-12 h-12 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground text-center">
              No active alerts
              <br />
              <span className="text-sm">System operating normally</span>
            </p>
          </div>
        ) : (
          <div className="space-y-3" data-testid="list-alerts">
            {alerts.map((alert) => (
              <div
                key={alert.id}
                className={`p-4 rounded-lg bg-card border-l-4 ${getSeverityBorder(alert.severity)} ${
                  alert.acknowledged ? 'opacity-50' : ''
                } hover-elevate animate-slide-in`}
                data-testid={`alert-${alert.id}`}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5">
                    {getSeverityIcon(alert.severity)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h4 className="font-semibold text-sm">{alert.vehicleName}</h4>
                      {!alert.acknowledged && onAcknowledge && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 -mt-1"
                          onClick={() => onAcknowledge(alert.id)}
                          data-testid={`button-acknowledge-${alert.id}`}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-2">
                      {alert.message}
                    </p>
                    
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground font-mono">
                        {new Date(alert.timestamp).toLocaleTimeString()}
                      </span>
                      <span className={`px-2 py-0.5 rounded-full ${
                        alert.severity === 'high'
                          ? 'bg-destructive/10 text-destructive'
                          : alert.severity === 'medium'
                          ? 'bg-amber-500/10 text-amber-500'
                          : 'bg-chart-1/10 text-chart-1'
                      }`}>
                        {alert.severity.toUpperCase()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </ScrollArea>
    </Card>
  );
}
