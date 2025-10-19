import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Camera, Map, TrendingUp, Bell, ArrowRight, Zap } from "lucide-react";

export default function Home() {
  const features = [
    {
      icon: Camera,
      title: "Webcam Detection",
      description: "Real-time AI-powered crowd detection using YOLOv8 for accurate passenger counting",
      gradient: "from-chart-1 to-chart-3",
    },
    {
      icon: Map,
      title: "GPS Tracking",
      description: "Live vehicle location monitoring with interactive maps and route visualization",
      gradient: "from-chart-2 to-chart-1",
    },
    {
      icon: TrendingUp,
      title: "Data Analysis",
      description: "Comprehensive passenger trends and analytics for informed decision making",
      gradient: "from-chart-3 to-chart-4",
    },
    {
      icon: Bell,
      title: "Smart Alerts",
      description: "Intelligent overcrowding alerts with real-time notifications and thresholds",
      gradient: "from-chart-5 to-chart-2",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-primary/5 to-chart-2/5">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]" />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        </div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />

        {/* Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8">
              <Zap className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Powered by AI Technology</span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 tracking-tight">
              <span className="bg-gradient-to-r from-foreground via-primary to-chart-2 bg-clip-text text-transparent">
                AI-Powered Transit
              </span>
              <br />
              <span className="bg-gradient-to-r from-chart-2 via-chart-3 to-primary bg-clip-text text-transparent">
                Monitoring System
              </span>
            </h1>

            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed">
              Experience the future of public transportation with real-time crowd detection,
              intelligent GPS tracking, and predictive analytics for safer, smarter transit management.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/dashboard" data-testid="link-dashboard-cta">
                <Button
                  size="lg"
                  className="gap-2 bg-gradient-to-r from-primary to-chart-2 hover:opacity-90 shadow-neon-blue"
                  data-testid="button-open-dashboard"
                >
                  Open Dashboard
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link href="/system" data-testid="link-system-cta">
                <Button
                  size="lg"
                  variant="outline"
                  className="gap-2 border-primary/30 hover:bg-primary/10 backdrop-blur-sm"
                  data-testid="button-view-system"
                >
                  <Camera className="w-5 h-5" />
                  View System
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Features Section */}
      <section className="py-24 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              System <span className="bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent">Capabilities</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Advanced AI-driven modules working together to create a comprehensive transit monitoring solution
            </p>
          </div>

          <div className="grid grid-col s-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={index}
                  className="p-8 hover-elevate cursor-pointer group relative overflow-hidden"
                  data-testid={`card-feature-${index}`}
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />
                  
                  <div className="relative">
                    <div className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${feature.gradient} mb-4`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    
                    <h3 className="text-2xl font-semibold mb-3 group-hover:text-primary transition-colors">
                      {feature.title}
                    </h3>
                    
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-chart-2/10 to-chart-3/10" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Experience the Future?
          </h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of transit systems using AI-powered monitoring to improve safety and efficiency
          </p>
          <Link href="/dashboard" data-testid="link-experience-cta">
            <Button
              size="lg"
              className="gap-2 bg-gradient-to-r from-primary to-chart-2 hover:opacity-90"
              data-testid="button-experience-dashboard"
            >
              Experience the Dashboard
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
