import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { 
  BarChart3, 
  Users, 
  Settings, 
  Menu, 
  Zap,
  Target,
  Database
} from "lucide-react";

const navItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: BarChart3,
    description: "View analytics and metrics"
  },
  {
    title: "Lead Capture",
    href: "/capture",
    icon: Target,
    description: "Create and manage lead forms"
  },
  {
    title: "Leads",
    href: "/leads",
    icon: Users,
    description: "Manage your lead database"
  },
  {
    title: "CRM Integration",
    href: "/crm",
    icon: Database,
    description: "Connect with your CRM"
  }
];

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const NavContent = () => (
    <>
      <div className="flex items-center gap-2 mb-8">
        <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
          <Zap className="w-4 h-4 text-primary-foreground" />
        </div>
        <span className="font-bold text-lg">RavitLead</span>
      </div>
      
      <nav className="space-y-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <NavLink
              key={item.href}
              to={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                isActive 
                  ? "bg-primary text-primary-foreground shadow-md" 
                  : "hover:bg-muted/50"
              }`}
              onClick={() => setIsOpen(false)}
            >
              <item.icon className="w-4 h-4" />
              <div className="flex-1">
                <div className="font-medium">{item.title}</div>
                <div className={`text-xs ${isActive ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                  {item.description}
                </div>
              </div>
            </NavLink>
          );
        })}
      </nav>
    </>
  );

  return (
    <>
      {/* Mobile Navigation */}
      <div className="lg:hidden">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="fixed top-4 left-4 z-50">
              <Menu className="h-4 w-4" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72 p-6">
            <NavContent />
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden lg:block w-72 border-r bg-card p-6 min-h-screen">
        <NavContent />
      </div>
    </>
  );
};