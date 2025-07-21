import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Users, 
  TrendingUp, 
  Target, 
  DollarSign, 
  Mail, 
  Phone, 
  Building2, 
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  Filter,
  Download
} from "lucide-react";

interface Lead {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  jobTitle: string;
  industry: string;
  message: string;
  source: string;
  createdAt: string;
  status: "new" | "contacted" | "qualified" | "converted" | "lost";
  score: number;
}

interface DashboardStats {
  totalLeads: number;
  newLeads: number;
  qualifiedLeads: number;
  conversionRate: number;
  avgScore: number;
  dailyChange: number;
}

export const Dashboard = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [stats, setStats] = useState<DashboardStats>({
    totalLeads: 0,
    newLeads: 0,
    qualifiedLeads: 0,
    conversionRate: 0,
    avgScore: 0,
    dailyChange: 0
  });

  useEffect(() => {
    // Load leads from localStorage
    const storedLeads = JSON.parse(localStorage.getItem("leads") || "[]");
    setLeads(storedLeads);

    // Calculate stats
    const total = storedLeads.length;
    const newCount = storedLeads.filter((lead: Lead) => lead.status === "new").length;
    const qualified = storedLeads.filter((lead: Lead) => lead.status === "qualified").length;
    const converted = storedLeads.filter((lead: Lead) => lead.status === "converted").length;
    const avgScore = total > 0 ? storedLeads.reduce((sum: number, lead: Lead) => sum + lead.score, 0) / total : 0;
    const conversionRate = total > 0 ? (converted / total) * 100 : 0;

    setStats({
      totalLeads: total,
      newLeads: newCount,
      qualifiedLeads: qualified,
      conversionRate,
      avgScore,
      dailyChange: Math.floor(Math.random() * 20) - 10 // Random for demo
    });
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new": return "bg-info";
      case "contacted": return "bg-warning";
      case "qualified": return "bg-success";
      case "converted": return "bg-primary";
      case "lost": return "bg-destructive";
      default: return "bg-muted";
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-success";
    if (score >= 60) return "text-warning";
    return "text-destructive";
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-0 shadow-md bg-gradient-secondary">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Leads</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalLeads}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              {stats.dailyChange >= 0 ? (
                <ArrowUpRight className="h-3 w-3 text-success mr-1" />
              ) : (
                <ArrowDownRight className="h-3 w-3 text-destructive mr-1" />
              )}
              {Math.abs(stats.dailyChange)}% from yesterday
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Leads</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-info">{stats.newLeads}</div>
            <div className="text-xs text-muted-foreground">
              Awaiting contact
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Qualified Leads</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">{stats.qualifiedLeads}</div>
            <div className="text-xs text-muted-foreground">
              Ready for conversion
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{stats.conversionRate.toFixed(1)}%</div>
            <Progress value={stats.conversionRate} className="mt-2 h-2" />
          </CardContent>
        </Card>
      </div>

      {/* Recent Leads */}
      <Card className="border-0 shadow-md">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl">Recent Leads</CardTitle>
              <CardDescription>Latest leads captured from your campaigns</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {leads.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg font-medium">No leads yet</p>
              <p>Start capturing leads to see them here</p>
            </div>
          ) : (
            <div className="space-y-4">
              {leads.slice(0, 10).map((lead) => (
                <div key={lead.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center text-primary-foreground font-medium">
                      {lead.firstName[0]}{lead.lastName[0]}
                    </div>
                    <div className="space-y-1">
                      <p className="font-medium">
                        {lead.firstName} {lead.lastName}
                      </p>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <Mail className="h-3 w-3 mr-1" />
                          {lead.email}
                        </div>
                        {lead.phone && (
                          <div className="flex items-center">
                            <Phone className="h-3 w-3 mr-1" />
                            {lead.phone}
                          </div>
                        )}
                        <div className="flex items-center">
                          <Building2 className="h-3 w-3 mr-1" />
                          {lead.company}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="text-right text-sm">
                      <div className={`font-medium ${getScoreColor(lead.score)}`}>
                        Score: {lead.score}
                      </div>
                      <div className="text-muted-foreground">
                        {lead.source}
                      </div>
                    </div>
                    <Badge variant="secondary" className={getStatusColor(lead.status)}>
                      {lead.status}
                    </Badge>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Clock className="h-3 w-3 mr-1" />
                      {new Date(lead.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle>Lead Score Distribution</CardTitle>
            <CardDescription>Average lead quality by source</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {["website", "social-media", "email-campaign", "referral"].map((source) => {
                const sourceLeads = leads.filter(lead => lead.source === source);
                const avgScore = sourceLeads.length > 0 
                  ? sourceLeads.reduce((sum, lead) => sum + lead.score, 0) / sourceLeads.length 
                  : 0;
                
                return (
                  <div key={source} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="capitalize">{source.replace("-", " ")}</span>
                      <span className="font-medium">{avgScore.toFixed(0)}/100</span>
                    </div>
                    <Progress value={avgScore} className="h-2" />
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Manage your lead generation pipeline</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="gradient" className="w-full justify-start">
              <Users className="h-4 w-4 mr-2" />
              View All Leads
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Target className="h-4 w-4 mr-2" />
              Create Campaign
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <TrendingUp className="h-4 w-4 mr-2" />
              Analytics Report
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <DollarSign className="h-4 w-4 mr-2" />
              CRM Integration
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};