import { SidebarTrigger } from "@/components/ui/sidebar";
import NewSiteModal from "./new-site-modal";
import { db } from "@/lib/db";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import SiteListClient from "./site-list-client";

async function SiteList() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const userId = session?.user.id || "";
  const sites = await db.page.findMany({
    where: { userId: userId },
    orderBy: { updatedAt: "desc" },
  });

  return (
    <div className="w-full p-6">
      <SidebarTrigger className="w-12 h-12 mb-4" />
      <div className="container flex flex-col items-center mx-auto">
        <div className="flex flex-col w-full max-w-4xl space-y-8">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold tracking-tight">My Sites</h1>
            <NewSiteModal />
          </div>

          {sites.length >= 1 ? (
            <SiteListClient sites={sites} />
          ) : (
            <div className="flex flex-col items-center justify-center border-2 border-dashed rounded-3xl p-12 text-center bg-card shadow-sm space-y-4">
              <p className="text-muted-foreground text-sm max-w-sm">
                It&apos;s pretty empty in here. Create your first worried-free premium site to get started with Varityweb!
              </p>
              <NewSiteModal />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SiteList;
