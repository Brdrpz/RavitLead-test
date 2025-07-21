import { Navigation } from "@/components/Navigation";
import { Dashboard } from "@/components/Dashboard";

export const DashboardPage = () => {
  return (
    <div className="flex">
      <Navigation />
      <main className="flex-1 p-6 lg:p-8 bg-background min-h-screen">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">RavitLead Dashboard</h1>
            <p className="text-muted-foreground">
              Monitor your lead generation performance and track key metrics
            </p>
          </div>
          <Dashboard />
        </div>
      </main>
    </div>
  );
};