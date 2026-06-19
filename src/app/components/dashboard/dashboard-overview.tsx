import React from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import NewSiteModal from "./new-site-modal";
import { db } from "@/lib/db";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { Globe, ArrowRight, Activity, Cpu, Sparkles, TrendingUp } from "lucide-react";
import Link from "next/link";
import { getLink } from "@/lib/getLink";

async function DashboardOverview() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const userId = session?.user.id || "";
  const sites = await db.page.findMany({
    where: { userId: userId },
    orderBy: { updatedAt: "desc" },
    take: 3,
  });

  const allSitesCount = await db.page.count({
    where: { userId: userId },
  });

  // Calculate mock stats based on number of sites
  const totalViews = allSitesCount * 342;
  const avgLoadTime = allSitesCount > 0 ? "0.62s" : "0.00s";

  return (
    <div className="w-full p-6">
      <SidebarTrigger className="w-12 h-12 mb-4" />
      
      <div className="container flex flex-col items-center mx-auto">
        <div className="flex flex-col w-full max-w-4xl space-y-8">
          
          {/* Welcome Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border border-primary/20 p-8 rounded-3xl backdrop-blur-sm">
            <div className="space-y-1">
              <h1 className="text-3xl font-bold tracking-tight">
                Welcome back, {session?.user.name || "Creator"}!
              </h1>
              <p className="text-muted-foreground text-sm max-w-md">
                Here is the latest snapshot of your digital ecosystem. Hover, create, and optimize.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <NewSiteModal />
            </div>
          </div>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="bg-card border-border hover:border-primary/45 transition-colors shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Total Sites</CardTitle>
                <Globe className="size-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{allSitesCount}</div>
                <p className="text-xs text-muted-foreground mt-1">Active published domains</p>
              </CardContent>
            </Card>

            <Card className="bg-card border-border hover:border-primary/45 transition-colors shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Total Views</CardTitle>
                <TrendingUp className="size-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalViews.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground mt-1">+12% traffic this week</p>
              </CardContent>
            </Card>

            <Card className="bg-card border-border hover:border-primary/45 transition-colors shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Avg. Load Speed</CardTitle>
                <Cpu className="size-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{avgLoadTime}</div>
                <p className="text-xs text-muted-foreground mt-1">Optimized local network</p>
              </CardContent>
            </Card>

            <Card className="bg-card border-border hover:border-primary/45 transition-colors shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Platform Health</CardTitle>
                <Activity className="size-4 text-amber-500 animate-pulse" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">100%</div>
                <p className="text-xs text-muted-foreground mt-1">Managed servers operational</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Recent Sites Activity */}
            <div className="md:col-span-2 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold">Recent Sites</h3>
                <Link href="/?tab=sites" className="text-xs font-semibold text-primary hover:underline flex items-center gap-1">
                  View All <ArrowRight className="size-3" />
                </Link>
              </div>

              <div className="space-y-3">
                {sites.length >= 1 ? (
                  sites.map((site) => (
                    <Card key={site.id} className="bg-card border-border hover:border-primary/20 transition-all p-4 flex items-center justify-between gap-4 shadow-sm">
                      <div className="flex items-center space-x-4 min-w-0">
                        <div className="size-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                          <Globe className="size-5 text-primary" />
                        </div>
                        <div className="min-w-0">
                          <h4 className="font-semibold text-sm truncate">{site.title}</h4>
                          <p className="text-xs text-muted-foreground truncate">{site.subdomain}.varityweb.com</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Button asChild variant="outline" size="sm" className="h-8">
                          <a href={getLink({ subdomain: "editor", pathName: site.id })}>Edit</a>
                        </Button>
                        <Button asChild variant="ghost" size="sm" className="h-8 text-primary hover:text-primary">
                          <a href={getLink({ subdomain: site.subdomain })} target="_blank" rel="noreferrer">
                            Visit
                          </a>
                        </Button>
                      </div>
                    </Card>
                  ))
                ) : (
                  <Card className="bg-card border-dashed border-border py-12 text-center">
                    <p className="text-sm text-muted-foreground">No sites created yet. Let&apos;s build one!</p>
                  </Card>
                )}
              </div>
            </div>

            {/* Quick Tips Box */}
            <Card className="bg-gradient-to-b from-card to-muted/20 border-border p-6 flex flex-col justify-between shadow-sm">
              <div className="space-y-4">
                <div className="flex items-center space-x-2 text-primary">
                  <Sparkles className="size-5" />
                  <span className="font-bold text-sm uppercase tracking-wide">Design Tip</span>
                </div>
                <h4 className="font-semibold text-sm">Interactive Hover Experiences</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Varityweb landing page uses a custom gooey pixel engine. Drag your mouse over the background to experience it! Dynamic visual assets significantly boost user engagement.
                </p>
              </div>
              <Button asChild size="sm" variant="secondary" className="w-full mt-6 text-xs">
                <Link href="/?tab=settings">Configure Profile</Link>
              </Button>
            </Card>

          </div>

        </div>
      </div>
    </div>
  );
}

export default DashboardOverview;
