import { useState, useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { 
  Users, 
  Search, 
  Filter, 
  Download, 
  Mail, 
  Phone, 
  Building2, 
  Calendar,
  MoreHorizontal,
  Edit,
  Trash2,
  Star
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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

export const LeadsPage = () => {
  const { toast } = useToast();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filteredLeads, setFilteredLeads] = useState<Lead[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sourceFilter, setSourceFilter] = useState("all");

  useEffect(() => {
    // Load leads from localStorage
    const storedLeads = JSON.parse(localStorage.getItem("leads") || "[]");
    setLeads(storedLeads);
    setFilteredLeads(storedLeads);
  }, []);

  useEffect(() => {
    // Filter leads based on search and filters
    let filtered = leads;

    if (searchTerm) {
      filtered = filtered.filter(lead => 
        lead.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.company.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter(lead => lead.status === statusFilter);
    }

    if (sourceFilter !== "all") {
      filtered = filtered.filter(lead => lead.source === sourceFilter);
    }

    setFilteredLeads(filtered);
  }, [leads, searchTerm, statusFilter, sourceFilter]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new": return "bg-info text-info-foreground";
      case "contacted": return "bg-warning text-warning-foreground";
      case "qualified": return "bg-success text-success-foreground";
      case "converted": return "bg-primary text-primary-foreground";
      case "lost": return "bg-destructive text-destructive-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-success";
    if (score >= 60) return "text-warning";
    return "text-destructive";
  };

  const handleStatusChange = (leadId: string, newStatus: string) => {
    const updatedLeads = leads.map(lead => 
      lead.id === leadId 
        ? { ...lead, status: newStatus as Lead["status"] }
        : lead
    );
    
    setLeads(updatedLeads);
    localStorage.setItem("leads", JSON.stringify(updatedLeads));
    
    toast({
      title: "Lead Updated",
      description: `Lead status changed to ${newStatus}`,
    });
  };

  const handleDeleteLead = (leadId: string) => {
    const updatedLeads = leads.filter(lead => lead.id !== leadId);
    setLeads(updatedLeads);
    localStorage.setItem("leads", JSON.stringify(updatedLeads));
    
    toast({
      title: "Lead Deleted",
      description: "Lead has been removed from your database",
    });
  };

  const exportLeads = () => {
    const csvContent = [
      ["Name", "Email", "Phone", "Company", "Job Title", "Industry", "Source", "Status", "Score", "Created"],
      ...filteredLeads.map(lead => [
        `${lead.firstName} ${lead.lastName}`,
        lead.email,
        lead.phone,
        lead.company,
        lead.jobTitle,
        lead.industry,
        lead.source,
        lead.status,
        lead.score.toString(),
        new Date(lead.createdAt).toLocaleDateString()
      ])
    ].map(row => row.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "leads-export.csv";
    a.click();
    URL.revokeObjectURL(url);

    toast({
      title: "Export Complete",
      description: `${filteredLeads.length} leads exported to CSV`,
    });
  };

  return (
    <div className="flex">
      <Navigation />
      <main className="flex-1 p-6 lg:p-8 bg-background min-h-screen">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Lead Database</h1>
              <p className="text-muted-foreground">
                Manage and track all your captured leads
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={exportLeads}>
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              <Button variant="gradient">
                <Users className="w-4 h-4 mr-2" />
                Import Leads
              </Button>
            </div>
          </div>

          {/* Stats Summary */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="border-0 shadow-md">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Leads</p>
                    <p className="text-2xl font-bold">{leads.length}</p>
                  </div>
                  <Users className="w-8 h-8 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-md">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">New Leads</p>
                    <p className="text-2xl font-bold text-info">
                      {leads.filter(l => l.status === "new").length}
                    </p>
                  </div>
                  <Star className="w-8 h-8 text-info" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-md">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Qualified</p>
                    <p className="text-2xl font-bold text-success">
                      {leads.filter(l => l.status === "qualified").length}
                    </p>
                  </div>
                  <Star className="w-8 h-8 text-success" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-md">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Converted</p>
                    <p className="text-2xl font-bold text-primary">
                      {leads.filter(l => l.status === "converted").length}
                    </p>
                  </div>
                  <Star className="w-8 h-8 text-primary" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="w-5 h-5" />
                Filters & Search
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search leads..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Statuses" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="contacted">Contacted</SelectItem>
                    <SelectItem value="qualified">Qualified</SelectItem>
                    <SelectItem value="converted">Converted</SelectItem>
                    <SelectItem value="lost">Lost</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={sourceFilter} onValueChange={setSourceFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Sources" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Sources</SelectItem>
                    <SelectItem value="website">Website</SelectItem>
                    <SelectItem value="social-media">Social Media</SelectItem>
                    <SelectItem value="email-campaign">Email Campaign</SelectItem>
                    <SelectItem value="referral">Referral</SelectItem>
                    <SelectItem value="event">Event</SelectItem>
                    <SelectItem value="advertisement">Advertisement</SelectItem>
                  </SelectContent>
                </Select>
                
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSearchTerm("");
                    setStatusFilter("all");
                    setSourceFilter("all");
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Leads Table */}
          <Card className="border-0 shadow-md">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Leads ({filteredLeads.length})</CardTitle>
                  <CardDescription>Manage your lead pipeline</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {filteredLeads.length === 0 ? (
                <div className="text-center py-12">
                  <Users className="w-16 h-16 mx-auto text-muted-foreground/50 mb-4" />
                  <h3 className="text-lg font-medium mb-2">No leads found</h3>
                  <p className="text-muted-foreground">
                    {leads.length === 0 
                      ? "Start capturing leads to see them here"
                      : "Try adjusting your filters"
                    }
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredLeads.map((lead) => (
                    <div 
                      key={lead.id} 
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/30 transition-colors"
                    >
                      <div className="flex items-center space-x-4 flex-1">
                        <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center text-primary-foreground font-medium">
                          {lead.firstName[0]}{lead.lastName[0]}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-1">
                            <h3 className="font-medium text-lg">
                              {lead.firstName} {lead.lastName}
                            </h3>
                            <Badge className={getStatusColor(lead.status)}>
                              {lead.status}
                            </Badge>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Mail className="w-3 h-3" />
                              <span className="truncate">{lead.email}</span>
                            </div>
                            {lead.phone && (
                              <div className="flex items-center gap-1">
                                <Phone className="w-3 h-3" />
                                <span>{lead.phone}</span>
                              </div>
                            )}
                            <div className="flex items-center gap-1">
                              <Building2 className="w-3 h-3" />
                              <span className="truncate">{lead.company}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className={`font-bold ${getScoreColor(lead.score)}`}>
                            {lead.score}
                          </div>
                          <div className="text-xs text-muted-foreground">Score</div>
                        </div>
                        
                        <div className="text-right">
                          <div className="text-sm font-medium">{lead.source.replace("-", " ")}</div>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <Calendar className="w-3 h-3 mr-1" />
                            {new Date(lead.createdAt).toLocaleDateString()}
                          </div>
                        </div>

                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="icon">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleStatusChange(lead.id, "contacted")}>
                              <Edit className="w-4 h-4 mr-2" />
                              Mark as Contacted
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleStatusChange(lead.id, "qualified")}>
                              <Star className="w-4 h-4 mr-2" />
                              Mark as Qualified
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleStatusChange(lead.id, "converted")}>
                              <Star className="w-4 h-4 mr-2" />
                              Mark as Converted
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => handleDeleteLead(lead.id)}
                              className="text-destructive"
                            >
                              <Trash2 className="w-4 h-4 mr-2" />
                              Delete Lead
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};