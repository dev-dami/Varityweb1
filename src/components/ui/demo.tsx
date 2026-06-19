"use client";

import AppSidebar from "@/app/components/dashboard/sidebar"

export function SidebarDemo() {
  return (
    <div className="flex h-screen w-screen flex-row">
      <AppSidebar />
      <main className="flex h-screen grow flex-col overflow-auto">
      </main>
    </div>
  );
}
