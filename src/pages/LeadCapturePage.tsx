import { Navigation } from "@/components/Navigation";
import { LeadForm } from "@/components/LeadForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  Target, 
  Code, 
  Smartphone, 
  Globe, 
  Copy,
  ExternalLink,
  Settings
} from "lucide-react";

export const LeadCapturePage = () => {
  const { toast } = useToast();

  const handleCopyEmbed = () => {
    const embedCode = `<iframe src="${window.location.origin}/embed/lead-form" width="100%" height="600" frameborder="0"></iframe>`;
    navigator.clipboard.writeText(embedCode);
    toast({
      title: "Embed Code Copied",
      description: "Paste this code into your website to add the lead form",
    });
  };

  return (
    <div className="flex">
      <Navigation />
      <main className="flex-1 p-6 lg:p-8 bg-background min-h-screen">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Lead Capture Forms</h1>
            <p className="text-muted-foreground">
              Create and customize lead capture forms for your website
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Form Preview */}
            <div className="space-y-6">
              <Card className="border-0 shadow-md">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Target className="w-5 h-5" />
                        Live Form Preview
                      </CardTitle>
                      <CardDescription>
                        This is how your lead form will appear to visitors
                      </CardDescription>
                    </div>
                    <Badge variant="secondary" className="bg-success">
                      Active
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <LeadForm compact />
                </CardContent>
              </Card>

              {/* Embed Options */}
              <Card className="border-0 shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Code className="w-5 h-5" />
                    Embed Options
                  </CardTitle>
                  <CardDescription>
                    Add this form to your website in multiple ways
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Button variant="outline" onClick={handleCopyEmbed} className="justify-start">
                      <Copy className="w-4 h-4 mr-2" />
                      Copy Embed Code
                    </Button>
                    <Button variant="outline" className="justify-start">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Standalone Page
                    </Button>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="font-medium">Integration Methods:</h4>
                    <div className="grid grid-cols-1 gap-2">
                      <div className="flex items-center gap-3 p-3 border rounded-lg">
                        <Globe className="w-4 h-4 text-muted-foreground" />
                        <div className="flex-1">
                          <div className="font-medium text-sm">Website Embed</div>
                          <div className="text-xs text-muted-foreground">Add iframe to any webpage</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 border rounded-lg">
                        <Code className="w-4 h-4 text-muted-foreground" />
                        <div className="flex-1">
                          <div className="font-medium text-sm">JavaScript Widget</div>
                          <div className="text-xs text-muted-foreground">Floating or inline widget</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 border rounded-lg">
                        <Smartphone className="w-4 h-4 text-muted-foreground" />
                        <div className="flex-1">
                          <div className="font-medium text-sm">Mobile Optimized</div>
                          <div className="text-xs text-muted-foreground">Responsive design included</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Full Form */}
            <div className="space-y-6">
              <Card className="border-0 shadow-md">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Settings className="w-5 h-5" />
                        Detailed Lead Form
                      </CardTitle>
                      <CardDescription>
                        Comprehensive form for maximum lead qualification
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <LeadForm />
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Form Analytics */}
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle>Form Performance</CardTitle>
              <CardDescription>Track how your forms are performing</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center space-y-2">
                  <div className="text-2xl font-bold text-primary">2,847</div>
                  <div className="text-sm text-muted-foreground">Form Views</div>
                </div>
                <div className="text-center space-y-2">
                  <div className="text-2xl font-bold text-success">342</div>
                  <div className="text-sm text-muted-foreground">Submissions</div>
                </div>
                <div className="text-center space-y-2">
                  <div className="text-2xl font-bold text-info">12.0%</div>
                  <div className="text-sm text-muted-foreground">Conversion Rate</div>
                </div>
                <div className="text-center space-y-2">
                  <div className="text-2xl font-bold text-warning">87</div>
                  <div className="text-sm text-muted-foreground">Avg. Lead Score</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};