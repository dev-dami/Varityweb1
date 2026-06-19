import React from "react";
import AppSidebar from "../components/dashboard/sidebar";
import SiteList from "../components/dashboard/site-list";
import DashboardOverview from "../components/dashboard/dashboard-overview";
import DashboardAnalytics from "../components/dashboard/dashboard-analytics";
import DashboardSettings from "../components/dashboard/dashboard-settings";
import { 
  ReportsView, 
  ChatView, 
  DealsView, 
  AccountsView, 
  CompetitorsView, 
  KnowledgeView, 
  FeedbackView, 
  ReviewView 
} from "../components/dashboard/mock-views";
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
          {tab === "reports" && <ReportsView />}
          {tab === "chat" && <ChatView />}
          {tab === "deals" && <DealsView />}
          {tab === "accounts" && <AccountsView />}
          {tab === "competitors" && <CompetitorsView />}
          {tab === "knowledge" && <KnowledgeView />}
          {tab === "feedback" && <FeedbackView />}
          {tab === "review" && <ReviewView />}
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
