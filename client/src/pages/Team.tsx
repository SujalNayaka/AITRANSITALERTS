import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { GraduationCap, Mail, User } from "lucide-react";

export default function Team() {
  const teamMembers = [
    {
      name: "Apeksha S",
      id: "1MP23AD003",
      role: "Team Member",
      initials: "AS",
      gradient: "from-chart-1 to-chart-3",
    },
    {
      name: "Hima Gowda N",
      id: "1MP23AD016",
      role: "Team Member",
      initials: "HG",
      gradient: "from-chart-2 to-chart-1",
    },
    {
      name: "Ramya R",
      id: "1MP23AD042",
      role: "Team Member",
      initials: "RR",
      gradient: "from-chart-3 to-chart-4",
    },
    {
      name: "Sohan M",
      id: "1MP22AD048",
      role: "Team Member",
      initials: "SM",
      gradient: "from-chart-5 to-chart-2",
    },
  ];

  const guide = {
    name: "Mamatha V Jadhav",
    title: "Assistant Professor",
    department: "Dept. of AI & DS",
    institution: "BGSCET",
    initials: "MJ",
  };

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">
            Meet the <span className="bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent">Team</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            The brilliant minds behind AI-Transit Alerts
          </p>
        </div>

        {/* Team Members Grid */}
        <div>
          <h2 className="text-2xl font-bold mb-6 text-center">Development Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <Card
                key={index}
                className="p-6 hover-elevate group cursor-pointer text-center"
                data-testid={`card-team-member-${index}`}
              >
                <div className="flex flex-col items-center">
                  <div className="relative mb-4">
                    <div className={`absolute inset-0 bg-gradient-to-br ${member.gradient} opacity-20 blur-2xl rounded-full animate-pulse-glow`} />
                    <Avatar className="w-24 h-24 relative">
                      <AvatarFallback className={`bg-gradient-to-br ${member.gradient} text-white text-2xl font-bold`}>
                        {member.initials}
                      </AvatarFallback>
                    </Avatar>
                  </div>

                  <h3 className="text-xl font-semibold mb-1 group-hover:text-primary transition-colors">
                    {member.name}
                  </h3>
                  
                  <p className="text-sm text-muted-foreground mb-3">
                    {member.role}
                  </p>
                  
                  <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-muted/50 border border-border">
                    <User className="w-3 h-3 text-muted-foreground" />
                    <span className="text-xs font-mono text-muted-foreground">
                      {member.id}
                    </span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Guide Section */}
        <div>
          <h2 className="text-2xl font-bold mb-6 text-center">Project Guide</h2>
          <div className="max-w-2xl mx-auto">
            <Card className="p-8 hover-elevate">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="relative flex-shrink-0">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary to-chart-2 opacity-20 blur-3xl rounded-full animate-pulse-glow" />
                  <Avatar className="w-32 h-32 relative">
                    <AvatarFallback className="bg-gradient-to-br from-primary to-chart-2 text-white text-4xl font-bold">
                      {guide.initials}
                    </AvatarFallback>
                  </Avatar>
                </div>

                <div className="flex-1 text-center md:text-left">
                  <div className="flex items-center gap-2 mb-2 justify-center md:justify-start">
                    <GraduationCap className="w-5 h-5 text-primary" />
                    <span className="text-sm text-primary font-semibold">Project Guide</span>
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-2">{guide.name}</h3>
                  
                  <p className="text-muted-foreground mb-4">
                    {guide.title}
                    <br />
                    {guide.department}
                    <br />
                    {guide.institution}
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Institution Info */}
        <div className="text-center py-12 border-t border-border">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">
              B.G.S. College of Engineering & Technology
            </h3>
            <p className="text-muted-foreground mb-2">
              Department of Artificial Intelligence & Data Science
            </p>
            <p className="text-sm text-muted-foreground">
              Mini Project - Phase 1
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
