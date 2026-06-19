import React from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { ShieldAlert, CreditCard, Sparkles, KeyRound, Bell, MessageSquare, Info } from "lucide-react";

async function DashboardSettings() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <div className="w-full p-6">
      <SidebarTrigger className="w-12 h-12 mb-4" />
      
      <div className="container flex flex-col items-center mx-auto">
        <div className="flex flex-col w-full max-w-4xl space-y-8">
          
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
            <p className="text-muted-foreground text-sm">
              Manage your credentials, preferences, billing, and account plan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Account Details & Billing Info */}
            <div className="md:col-span-2 space-y-6">
              
              {/* Profile Card */}
              <Card className="bg-card border-border shadow-sm">
                <CardHeader>
                  <CardTitle className="text-sm font-bold flex items-center gap-2">
                    <KeyRound className="size-4 text-primary" />
                    Account Profile
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <span className="text-xs text-muted-foreground font-semibold">Full Name</span>
                      <p className="text-sm font-medium border border-border/60 bg-muted/20 px-3 py-2 rounded-lg">{session?.user.name || "N/A"}</p>
                    </div>
                    <div className="space-y-1">
                      <span className="text-xs text-muted-foreground font-semibold">Email Address</span>
                      <p className="text-sm font-medium border border-border/60 bg-muted/20 px-3 py-2 rounded-lg">{session?.user.email || "N/A"}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Preferences */}
              <Card className="bg-card border-border shadow-sm">
                <CardHeader>
                  <CardTitle className="text-sm font-bold flex items-center gap-2">
                    <Bell className="size-4 text-primary" />
                    Notification Preferences
                  </CardTitle>
                  <CardDescription>Control how Varityweb communicates critical updates.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between border-b border-border/40 pb-3">
                    <div className="space-y-0.5">
                      <Label htmlFor="email-notif" className="font-semibold text-sm cursor-pointer">Email Notifications</Label>
                      <p className="text-xs text-muted-foreground">Receive weekly traffic and platform performance reports.</p>
                    </div>
                    <Switch id="email-notif" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="whatsapp-notif" className="font-semibold text-sm cursor-pointer">WhatsApp Alerts</Label>
                      <p className="text-xs text-muted-foreground">Get server warnings and critical domain updates via text.</p>
                    </div>
                    <Switch id="whatsapp-notif" />
                  </div>
                </CardContent>
              </Card>

              {/* Danger Zone */}
              <Card className="bg-card border-destructive/20 shadow-sm border-2">
                <CardHeader>
                  <CardTitle className="text-sm font-bold flex items-center gap-2 text-destructive">
                    <ShieldAlert className="size-4" />
                    Danger Zone
                  </CardTitle>
                  <CardDescription>Permanently remove your account and all associated pages.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="destructive" className="w-full sm:w-auto text-xs font-semibold">Delete Account</Button>
                </CardContent>
              </Card>

            </div>

            {/* Plan / Subscription Gating */}
            <div className="space-y-6">
              <Card className="bg-gradient-to-b from-card to-muted/20 border-border p-6 flex flex-col justify-between shadow-sm">
                <div className="space-y-6">
                  <div className="flex items-center space-x-2 text-primary">
                    <CreditCard className="size-5" />
                    <span className="font-bold text-sm uppercase tracking-wide">Active Plan</span>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="text-2xl font-black">Starter Plan</h4>
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-primary/20 text-primary border border-primary/30 px-2 py-0.5 rounded-full">Free</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Upgrade to Growth to link custom domains and access advanced dashboard metrics.
                    </p>
                  </div>

                  <Separator />

                  <div className="space-y-2 text-xs text-muted-foreground">
                    <div className="flex justify-between">
                      <span>Monthly Fee:</span>
                      <span className="text-foreground font-semibold">₦0 / forever</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sites limit:</span>
                      <span className="text-foreground font-semibold">1 published site</span>
                    </div>
                  </div>
                </div>

                <Button className="w-full mt-8 text-xs font-semibold bg-primary text-primary-foreground hover:bg-primary/95 flex items-center justify-center gap-2">
                  <Sparkles className="size-3.5" />
                  Upgrade to Growth Plan
                </Button>
              </Card>

              {/* Support */}
              <Card className="bg-card border-border p-6 shadow-sm space-y-4">
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <MessageSquare className="size-4" />
                  <span className="font-bold text-xs uppercase tracking-wide">Contact Support</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Stuck with custom domain setup or DNS records mapping? Reach out to our engineers.
                </p>
                <Button variant="outline" className="w-full text-xs font-semibold">
                  Get WhatsApp Support
                </Button>
              </Card>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

export default DashboardSettings;
