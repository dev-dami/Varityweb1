"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { authClient } from "@/lib/auth-client";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  BarChart,
  ChartLine,
  FileText,
  Globe,
  LayoutDashboard,
  Lightbulb,
  LogOut,
  Moon,
  Settings,
  MessagesSquare,
  Layout,
  UserCircle,
  UserSearch,
  GraduationCap,
  MessageSquareText,
  FileClock
} from "lucide-react";
import { useTheme } from "next-themes";
import { Badge } from "@/components/ui/badge";

const items = [
  { title: "Dashboard", url: "/dashboard?tab=overview", icon: LayoutDashboard, value: "overview" },
  { title: "Sites", url: "/dashboard?tab=sites", icon: Globe, value: "sites" },
  { title: "Analytics", url: "/dashboard?tab=analytics", icon: BarChart, value: "analytics" },
  { title: "Settings", url: "/dashboard?tab=settings", icon: Settings, value: "settings" },
];

const AppSidebar = () => {
  const { theme, setTheme } = useTheme();
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab") || "overview";

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login");
        },
      },
    });
  };

  return (
    <Sidebar className="w-[16rem]">
      <SidebarHeader>
        <SidebarGroup>
          <div className="flex justify-between">
            <div className="flex flex-row space-x-2">
              <div className="flex aspect-square size-8 items-center justify-center overflow-hidden">
                <img 
                  src="/varityweb.png" 
                  alt="Logo" 
                  className="size-full object-contain dark:invert"
                />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">Varityweb</span>
                <span className="truncate text-xs">Dashboard</span>
              </div>
            </div>
            <div>
              {theme === "light" ? (
                <Button
                  onClick={() => setTheme("dark")}
                  variant="outline"
                  size="icon"
                >
                  <Moon />
                </Button>
              ) : (
                <Button
                  onClick={() => setTheme("light")}
                  variant="secondary"
                  size="icon"
                >
                  <Lightbulb />
                </Button>
              )}
            </div>
          </div>
        </SidebarGroup>
      </SidebarHeader>
      <SidebarContent className="justify-between px-2">
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const isActive = activeTab === item.value;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={isActive}>
                      <a href={item.url} className={isActive ? "text-primary font-medium flex items-center justify-between" : "flex items-center justify-between"}>
                        <div className="flex items-center gap-2">
                          <item.icon className={isActive ? "text-primary scale-110 transition-transform" : ""} />
                          <span>{item.title}</span>
                        </div>
                        {('beta' in item && (item as any).beta) && (
                          <Badge
                            className="flex h-fit w-fit items-center gap-1.5 rounded border-none bg-blue-50 px-1.5 text-[10px] text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 font-semibold uppercase"
                            variant="outline"
                          >
                            Beta
                          </Badge>
                        )}
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="px-4">
        <Separator />
        <SidebarMenu>
          <SidebarMenuItem>
            {isPending ? (
              <div className="flex items-center p-2 gap-2">
                <div className="w-8 h-8 rounded-full bg-muted animate-pulse" />
                <div className="flex-1 space-y-1">
                  <div className="w-24 h-4 rounded bg-muted animate-pulse" />
                  <div className="w-16 h-3 rounded bg-muted animate-pulse" />
                </div>
              </div>
            ) : session ? (
              <Dialog>
                <div className="flex items-center justify-between w-full space-x-2">
                  <DialogTrigger asChild>
                    <div className="flex items-center gap-2 max-w-full truncate pr-2 hover:bg-muted rounded-lg p-2 flex-1 cursor-pointer">
                      {session.user.image ? (
                        <img
                          src={session.user.image}
                          alt={session.user.name || "User"}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">
                          {session.user.name?.[0]?.toUpperCase() || session.user.email?.[0]?.toUpperCase() || "?"}
                        </div>
                      )}
                      <div className="flex flex-col text-left text-sm leading-tight truncate">
                        <span className="truncate font-semibold">{session.user.name || "User"}</span>
                        <span className="truncate text-xs text-muted-foreground">{session.user.email}</span>
                      </div>
                    </div>
                  </DialogTrigger>
                  <Button variant={"ghost"} className="px-2 py-6" onClick={handleSignOut}>
                    <LogOut className="w-4 h-4" />
                  </Button>
                </div>
                <DialogContent className="sm:max-w-[425px] border-zinc-800 bg-zinc-950 text-white">
                  <DialogHeader>
                    <DialogTitle>Account Settings</DialogTitle>
                    <DialogDescription className="text-zinc-400">
                      Manage your profile and account details.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="flex items-center gap-4">
                      {session.user.image ? (
                        <img
                          src={session.user.image}
                          alt={session.user.name || "User"}
                          className="w-16 h-16 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold">
                          {session.user.name?.[0]?.toUpperCase() || session.user.email?.[0]?.toUpperCase() || "?"}
                        </div>
                      )}
                      <div>
                        <h4 className="font-semibold text-lg">{session.user.name || "User"}</h4>
                        <p className="text-sm text-zinc-400">{session.user.email}</p>
                      </div>
                    </div>
                    <div className="border-t border-zinc-850 pt-4 space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-zinc-400">Account ID:</span>
                        <span className="font-mono text-xs select-all text-zinc-300">{session.user.id}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-zinc-400">Email Verified:</span>
                        <span className="text-zinc-300">{session.user.emailVerified ? "Yes" : "No"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-zinc-400">Joined:</span>
                        <span className="text-zinc-300">{new Date(session.user.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end gap-2 border-t border-zinc-850 pt-4">
                    <Button variant="destructive" className="w-full" onClick={handleSignOut}>
                      Sign Out
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            ) : (
              <Button className="w-full" onClick={() => router.push("/login")}>
                Sign in
              </Button>
            )}
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
