import { Link, useLocation } from "wouter";
import { Camera, LayoutDashboard, Users, Home, GitBranch } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navigation() {
  const [location] = useLocation();

  const navItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/system", label: "System", icon: Camera },
    { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { path: "/team", label: "Team", icon: Users },
    { path: "/architecture", label: "Architecture", icon: GitBranch },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" data-testid="link-home">
            <div className="flex items-center gap-3 cursor-pointer group">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full animate-pulse-glow" />
                <div className="relative w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-chart-2 flex items-center justify-center">
                  <Camera className="w-5 h-5 text-primary-foreground" />
                </div>
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-primary via-chart-2 to-chart-3 bg-clip-text text-transparent">
                  AI-Transit Alerts
                </h1>
                <p className="text-xs text-muted-foreground">Real-time Monitoring</p>
              </div>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location === item.path;
              
              return (
                <Link key={item.path} href={item.path} data-testid={`link-${item.label.toLowerCase()}`}>
                  <Button
                    variant={isActive ? "secondary" : "ghost"}
                    size="sm"
                    className={`gap-2 relative ${
                      isActive
                        ? "bg-primary/10 text-primary hover:bg-primary/20"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                    {isActive && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent" />
                    )}
                  </Button>
                </Link>
              );
            })}
          </div>

          <div className="flex md:hidden">
            <Button variant="ghost" size="icon" data-testid="button-menu">
              <LayoutDashboard className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
