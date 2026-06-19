import React from "react";
import AppSidebar from "../components/dashboard/sidebar";
import SiteList from "../components/dashboard/site-list";
import DashboardOverview from "../components/dashboard/dashboard-overview";
import DashboardAnalytics from "../components/dashboard/dashboard-analytics";
import DashboardSettings from "../components/dashboard/dashboard-settings";

import { SidebarProvider } from "@/components/ui/sidebar";

export const dynamic = "force-dynamic";

const Dashboard = async ({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>;
}) => {
  const { tab = "overview" } = await searchParams;

  return (
    <SidebarProvider>
      <div className="flex w-screen h-screen">
        <AppSidebar />
        <main className="flex-1 overflow-y-auto bg-background">
          {tab === "overview" && <DashboardOverview />}
          {tab === "sites" && <SiteList />}
          {tab === "analytics" && <DashboardAnalytics />}
          {tab === "settings" && <DashboardSettings />}

        </main>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
