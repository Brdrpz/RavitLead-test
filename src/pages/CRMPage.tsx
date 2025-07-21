import { Navigation } from "@/components/Navigation";
import { CRMIntegration } from "@/components/CRMIntegration";

export const CRMPage = () => {
  return (
    <div className="flex">
      <Navigation />
      <main className="flex-1 p-6 lg:p-8 bg-background min-h-screen">
        <div className="max-w-6xl mx-auto">
          <CRMIntegration />
        </div>
      </main>
    </div>
  );
};