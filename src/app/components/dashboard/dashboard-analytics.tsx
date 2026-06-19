import React from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartLine, Eye, Users, Clock, ArrowUpRight } from "lucide-react";

function DashboardAnalytics() {
  const weeklyData = [
    { day: "Mon", views: 240, height: "h-[45%]" },
    { day: "Tue", views: 320, height: "h-[60%]" },
    { day: "Wed", views: 290, height: "h-[55%]" },
    { day: "Thu", views: 450, height: "h-[85%]" },
    { day: "Fri", views: 380, height: "h-[72%]" },
    { day: "Sat", views: 510, height: "h-[95%]" },
    { day: "Sun", views: 420, height: "h-[80%]" },
  ];

  const trafficSources = [
    { name: "Direct Traffic", count: 850, percentage: 65, color: "bg-primary" },
    { name: "Google (Search)", count: 260, percentage: 20, color: "bg-green-500" },
    { name: "Twitter/X (Social)", count: 90, percentage: 10, color: "bg-blue-400" },
    { name: "Others", count: 40, percentage: 5, color: "bg-zinc-600" },
  ];

  const geoData = [
    { name: "Lagos, Nigeria", views: 780, percentage: 60 },
    { name: "Abuja, Nigeria", views: 325, percentage: 25 },
    { name: "London, UK", views: 90, percentage: 7 },
    { name: "New York, USA", views: 45, percentage: 8 },
  ];

  return (
    <div className="w-full p-6">
      <SidebarTrigger className="w-12 h-12 mb-4" />
      
      <div className="container flex flex-col items-center mx-auto">
        <div className="flex flex-col w-full max-w-4xl space-y-8">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
              <p className="text-muted-foreground text-sm">
                Track visitor performance, views, and geo-locations of your sites.
              </p>
            </div>
            <div className="flex items-center gap-2 bg-muted/50 border border-border p-1 rounded-lg text-xs font-semibold">
              <button className="px-3 py-1.5 bg-card text-foreground shadow rounded-md">7 Days</button>
              <button className="px-3 py-1.5 text-muted-foreground hover:text-foreground">30 Days</button>
            </div>
          </div>

          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card className="bg-card border-border shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Page Views</CardTitle>
                <Eye className="size-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2,610</div>
                <div className="flex items-center gap-1 text-xs text-green-500 mt-1">
                  <ArrowUpRight className="size-3.5" />
                  <span>+18.4% since yesterday</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Unique Visitors</CardTitle>
                <Users className="size-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,240</div>
                <div className="flex items-center gap-1 text-xs text-green-500 mt-1">
                  <ArrowUpRight className="size-3.5" />
                  <span>+8.2% since yesterday</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Avg. Session Duration</CardTitle>
                <Clock className="size-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1m 48s</div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                  <span>Steady performance</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Weekly Visitor Chart */}
            <Card className="md:col-span-2 bg-card border-border shadow-sm flex flex-col justify-between">
              <CardHeader>
                <CardTitle className="text-sm font-bold flex items-center gap-2">
                  <ChartLine className="size-4 text-primary" />
                  Traffic Performance
                </CardTitle>
              </CardHeader>
              <CardContent className="h-[240px] flex items-end justify-between px-6 pb-4 pt-8">
                {weeklyData.map((data) => (
                  <div key={data.day} className="flex flex-col items-center flex-1 h-full justify-end group cursor-pointer">
                    <div className="text-[10px] text-muted-foreground mb-2 opacity-0 group-hover:opacity-100 transition-opacity font-semibold">{data.views}</div>
                    <div className={`w-8 ${data.height} bg-gradient-to-t from-primary/70 to-primary rounded-t group-hover:brightness-110 transition-all`} />
                    <div className="text-xs text-muted-foreground mt-3 font-medium">{data.day}</div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Traffic Sources */}
            <Card className="bg-card border-border shadow-sm">
              <CardHeader>
                <CardTitle className="text-sm font-bold">Traffic Sources</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {trafficSources.map((source) => (
                  <div key={source.name} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-semibold">
                      <span>{source.name}</span>
                      <span className="text-muted-foreground">{source.count} ({source.percentage}%)</span>
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                      <div className={`h-full ${source.color} rounded-full`} style={{ width: `${source.percentage}%` }} />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Geo Breakdown */}
          <Card className="bg-card border-border shadow-sm">
            <CardHeader>
              <CardTitle className="text-sm font-bold">Geographic Distribution</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {geoData.map((geo) => (
                <div key={geo.name} className="flex items-center justify-between border-b border-border/40 pb-3 last:border-b-0">
                  <div className="space-y-0.5">
                    <span className="font-semibold text-sm">{geo.name}</span>
                    <p className="text-xs text-muted-foreground">{geo.views.toLocaleString()} page views</p>
                  </div>
                  <div className="flex items-center space-x-3 text-right">
                    <span className="text-sm font-bold">{geo.percentage}%</span>
                    <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full" style={{ width: `${geo.percentage}%` }} />
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
}

export default DashboardAnalytics;
