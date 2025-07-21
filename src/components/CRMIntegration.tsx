import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  Database, 
  Settings, 
  CheckCircle2, 
  AlertCircle, 
  ExternalLink, 
  RefreshCw,
  Zap,
  Shield,
  Globe
} from "lucide-react";

interface CRMConfig {
  name: string;
  apiKey: string;
  apiUrl: string;
  enabled: boolean;
  lastSync: string;
  status: "connected" | "disconnected" | "error";
}

interface CRMProvider {
  id: string;
  name: string;
  description: string;
  logo: string;
  features: string[];
  popular: boolean;
}

const crmProviders: CRMProvider[] = [
  {
    id: "hubspot",
    name: "HubSpot",
    description: "All-in-one marketing, sales, and service platform",
    logo: "🎯",
    features: ["Lead scoring", "Email automation", "Analytics", "Contact management"],
    popular: true
  },
  {
    id: "salesforce",
    name: "Salesforce",
    description: "World's #1 CRM platform for sales and customer service",
    logo: "☁️",
    features: ["Advanced reporting", "Custom objects", "AI insights", "Mobile app"],
    popular: true
  },
  {
    id: "pipedrive",
    name: "Pipedrive",
    description: "Simple and effective sales CRM for small businesses",
    logo: "🚀",
    features: ["Visual pipeline", "Activity reminders", "Email sync", "Mobile access"],
    popular: false
  },
  {
    id: "zoho",
    name: "Zoho CRM",
    description: "Complete CRM solution with built-in intelligence",
    logo: "⚡",
    features: ["AI assistant", "Social CRM", "Workflow automation", "Multi-channel"],
    popular: false
  }
];

export const CRMIntegration = () => {
  const { toast } = useToast();
  const [selectedCRM, setSelectedCRM] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [crmConfig, setCrmConfig] = useState<CRMConfig>({
    name: "",
    apiKey: "",
    apiUrl: "",
    enabled: false,
    lastSync: "",
    status: "disconnected"
  });

  const handleConnect = async (crmId: string) => {
    if (!crmConfig.apiKey) {
      toast({
        title: "API Key Required",
        description: "Please enter your CRM API key to connect",
        variant: "destructive",
      });
      return;
    }

    setIsConnecting(true);
    
    try {
      // Simulate API connection
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const provider = crmProviders.find(p => p.id === crmId);
      if (provider) {
        setCrmConfig(prev => ({
          ...prev,
          name: provider.name,
          enabled: true,
          status: "connected",
          lastSync: new Date().toISOString()
        }));

        // Store in localStorage for demo
        localStorage.setItem("crmConfig", JSON.stringify({
          ...crmConfig,
          name: provider.name,
          enabled: true,
          status: "connected",
          lastSync: new Date().toISOString()
        }));

        toast({
          title: "CRM Connected Successfully!",
          description: `Your ${provider.name} integration is now active`,
          variant: "default",
        });
      }
    } catch (error) {
      toast({
        title: "Connection Failed",
        description: "Failed to connect to CRM. Please check your credentials.",
        variant: "destructive",
      });
    } finally {
      setIsConnecting(false);
    }
  };

  const handleDisconnect = () => {
    setCrmConfig(prev => ({
      ...prev,
      enabled: false,
      status: "disconnected",
      lastSync: ""
    }));
    
    localStorage.removeItem("crmConfig");
    
    toast({
      title: "CRM Disconnected",
      description: "Your CRM integration has been disabled",
      variant: "default",
    });
  };

  const handleSync = async () => {
    setIsConnecting(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setCrmConfig(prev => ({
        ...prev,
        lastSync: new Date().toISOString()
      }));

      toast({
        title: "Sync Complete",
        description: "All leads have been synchronized with your CRM",
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "Sync Failed",
        description: "Failed to sync with CRM. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">CRM Integration</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Connect your favorite CRM to automatically sync leads and streamline your sales process
        </p>
      </div>

      {/* Current Connection Status */}
      {crmConfig.enabled && (
        <Card className="border-0 shadow-md bg-gradient-secondary">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-success rounded-lg flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-success-foreground" />
                </div>
                <div>
                  <CardTitle className="text-lg">Connected to {crmConfig.name}</CardTitle>
                  <CardDescription>
                    Last sync: {new Date(crmConfig.lastSync).toLocaleString()}
                  </CardDescription>
                </div>
              </div>
              <Badge variant="secondary" className="bg-success">
                Active
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex gap-3">
              <Button 
                variant="outline" 
                onClick={handleSync}
                disabled={isConnecting}
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${isConnecting ? "animate-spin" : ""}`} />
                {isConnecting ? "Syncing..." : "Sync Now"}
              </Button>
              <Button variant="outline" onClick={handleDisconnect}>
                Disconnect
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* CRM Providers */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {crmProviders.map((provider) => (
          <Card 
            key={provider.id} 
            className={`border-0 shadow-md cursor-pointer transition-all hover:shadow-lg ${
              selectedCRM === provider.id ? "ring-2 ring-primary shadow-glow" : ""
            } ${crmConfig.name === provider.name ? "bg-gradient-secondary" : ""}`}
            onClick={() => setSelectedCRM(provider.id)}
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-2xl">{provider.logo}</div>
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      {provider.name}
                      {provider.popular && (
                        <Badge variant="secondary" className="bg-warning text-warning-foreground">
                          Popular
                        </Badge>
                      )}
                      {crmConfig.name === provider.name && (
                        <Badge variant="secondary" className="bg-success">
                          Connected
                        </Badge>
                      )}
                    </CardTitle>
                    <CardDescription>{provider.description}</CardDescription>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Features:</h4>
                <div className="flex flex-wrap gap-1">
                  {provider.features.map((feature) => (
                    <Badge key={feature} variant="outline" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </div>
              
              {selectedCRM === provider.id && crmConfig.name !== provider.name && (
                <div className="space-y-4 pt-4 border-t">
                  <div className="space-y-2">
                    <Label htmlFor={`api-key-${provider.id}`}>API Key</Label>
                    <Input
                      id={`api-key-${provider.id}`}
                      type="password"
                      placeholder="Enter your API key..."
                      value={crmConfig.apiKey}
                      onChange={(e) => setCrmConfig(prev => ({ ...prev, apiKey: e.target.value }))}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor={`api-url-${provider.id}`}>API URL (Optional)</Label>
                    <Input
                      id={`api-url-${provider.id}`}
                      placeholder="https://api.example.com"
                      value={crmConfig.apiUrl}
                      onChange={(e) => setCrmConfig(prev => ({ ...prev, apiUrl: e.target.value }))}
                    />
                  </div>

                  <Button 
                    variant="gradient" 
                    className="w-full"
                    onClick={() => handleConnect(provider.id)}
                    disabled={isConnecting}
                  >
                    {isConnecting ? "Connecting..." : `Connect to ${provider.name}`}
                  </Button>
                </div>
              )}
              
              {crmConfig.name !== provider.name && (
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => setSelectedCRM(selectedCRM === provider.id ? null : provider.id)}
                >
                  {selectedCRM === provider.id ? "Cancel" : "Configure"}
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Integration Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-0 shadow-md text-center">
          <CardHeader>
            <div className="w-12 h-12 bg-info rounded-lg flex items-center justify-center mx-auto">
              <Zap className="w-6 h-6 text-info-foreground" />
            </div>
            <CardTitle className="text-lg">Real-time Sync</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Leads are automatically synchronized in real-time with your CRM system
            </p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md text-center">
          <CardHeader>
            <div className="w-12 h-12 bg-success rounded-lg flex items-center justify-center mx-auto">
              <Shield className="w-6 h-6 text-success-foreground" />
            </div>
            <CardTitle className="text-lg">Secure Connection</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              All data is encrypted and transmitted securely using industry standards
            </p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md text-center">
          <CardHeader>
            <div className="w-12 h-12 bg-warning rounded-lg flex items-center justify-center mx-auto">
              <Globe className="w-6 h-6 text-warning-foreground" />
            </div>
            <CardTitle className="text-lg">Multi-platform</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Works with all major CRM platforms and custom integrations
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Help Section */}
      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Integration Help
          </CardTitle>
          <CardDescription>
            Need help connecting your CRM? Check out our integration guides
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Button variant="outline" className="justify-start">
              <ExternalLink className="w-4 h-4 mr-2" />
              API Documentation
            </Button>
            <Button variant="outline" className="justify-start">
              <ExternalLink className="w-4 h-4 mr-2" />
              Video Tutorials
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            <AlertCircle className="w-4 h-4 inline mr-1" />
            Contact our support team if you need help with custom integrations
          </p>
        </CardContent>
      </Card>
    </div>
  );
};