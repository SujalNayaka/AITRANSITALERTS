import { Card } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import type { PassengerData } from "@shared/schema";

interface PassengerChartProps {
  data?: PassengerData[];
}

export function PassengerChart({ data = [] }: PassengerChartProps) {
  // Default sample data for initial render
  const sampleData = [
    { time: "06:00", passengers: 45, route: "Route A" },
    { time: "08:00", passengers: 120, route: "Route A" },
    { time: "10:00", passengers: 85, route: "Route A" },
    { time: "12:00", passengers: 95, route: "Route A" },
    { time: "14:00", passengers: 70, route: "Route A" },
    { time: "16:00", passengers: 110, route: "Route A" },
    { time: "18:00", passengers: 135, route: "Route A" },
    { time: "20:00", passengers: 65, route: "Route A" },
  ];

  const chartData = data.length > 0 ? data : sampleData;

  return (
    <Card className="p-6 h-full flex flex-col">
      <div className="flex items-center gap-2 mb-4">
        <div className="p-2 rounded-lg bg-gradient-to-br from-chart-3 to-chart-4">
          <TrendingUp className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="font-semibold text-lg">Passenger Trends</h3>
          <p className="text-sm text-muted-foreground">Hourly Analytics</p>
        </div>
      </div>

      <div className="flex-1 min-h-0" data-testid="chart-passenger-trends">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
            <defs>
              <linearGradient id="colorPassengers" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.2} />
            <XAxis
              dataKey="time"
              stroke="hsl(var(--muted-foreground))"
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
            />
            <YAxis
              stroke="hsl(var(--muted-foreground))"
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--popover))",
                border: "1px solid hsl(var(--popover-border))",
                borderRadius: "0.5rem",
                padding: "8px 12px",
              }}
              labelStyle={{ color: "hsl(var(--popover-foreground))", fontWeight: 600 }}
              itemStyle={{ color: "hsl(var(--chart-1))" }}
            />
            <Legend
              wrapperStyle={{ color: "hsl(var(--muted-foreground))", fontSize: 12 }}
            />
            <Line
              type="monotone"
              dataKey="passengers"
              stroke="hsl(var(--chart-1))"
              strokeWidth={3}
              dot={{ fill: "hsl(var(--chart-1))", strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: "hsl(var(--background))", strokeWidth: 2 }}
              fill="url(#colorPassengers)"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 pt-4 border-t border-border flex items-center justify-between text-sm">
        <div className="text-muted-foreground">Peak Hour: 18:00</div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-chart-1" />
          <span className="text-muted-foreground">Live Data</span>
        </div>
      </div>
    </Card>
  );
}
