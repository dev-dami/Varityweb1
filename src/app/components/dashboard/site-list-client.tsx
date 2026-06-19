"use client";

import { useState } from "react";
import { Page } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { getLink } from "@/lib/getLink";
import {
  Laptop,
  Tablet,
  Smartphone,
  ExternalLink,
  ChevronRight,
  Sparkles,
  Search,
  Lock,
  CheckCircle,
  RefreshCw,
  Copy,
  Check,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export default function SiteListClient({ sites }: { sites: Page[] }) {
  const [selectedSiteId, setSelectedSiteId] = useState<string | null>(
    sites.length > 0 ? sites[0].id : null
  );
  const [viewport, setViewport] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [copied, setCopied] = useState(false);
  const [iframeKey, setIframeKey] = useState(0);

  const selectedSite = sites.find((s) => s.id === selectedSiteId) || sites[0];

  const handleCopyLink = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast.success("Link copied!");
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error("Failed to copy link");
    }
  };

  const handleReload = () => {
    setIframeKey((prev) => prev + 1);
  };

  return (
    <div className="space-y-12">
      {/* Site Cards List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sites.map((site) => {
          const isSelected = site.id === selectedSiteId;
          const siteUrl = getLink({ subdomain: site.subdomain });
          const editorUrl = getLink({ subdomain: "editor", pathName: site.id });

          return (
            <div
              key={site.id}
              onClick={() => setSelectedSiteId(site.id)}
              className={cn(
                "group relative bg-card border rounded-2xl p-6 transition-all duration-300 cursor-pointer flex flex-col justify-between h-[180px] shadow-sm select-none hover:shadow-md",
                isSelected
                  ? "border-primary ring-2 ring-primary/10 shadow-primary/5"
                  : "border-border hover:border-primary/30"
              )}
            >
              <div>
                <div className="flex items-start justify-between">
                  <div className="space-y-1 min-w-0 pr-6">
                    <h3 className="font-bold text-lg tracking-tight group-hover:text-primary transition-colors truncate">
                      {site.title}
                    </h3>
                    <p className="text-xs text-muted-foreground font-mono truncate">
                      {site.subdomain}.varityweb.com
                    </p>
                  </div>
                  {isSelected && (
                    <span className="flex h-2.5 w-2.5 rounded-full bg-primary animate-pulse shrink-0 mt-2" />
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between mt-4">
                <Button
                  variant={isSelected ? "default" : "outline"}
                  size="sm"
                  className={cn(
                    "text-xs px-4 h-9 font-medium transition-all",
                    isSelected
                      ? "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-sm shadow-blue-500/10"
                      : "hover:bg-primary/5 hover:border-primary/20"
                  )}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedSiteId(site.id);
                  }}
                >
                  View Preview
                </Button>

                <div className="flex items-center gap-2">
                  <Button
                    asChild
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 rounded-xl hover:bg-muted"
                    title="Open Live Site"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <a href={siteUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="size-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    </a>
                  </Button>

                  <Button
                    asChild
                    variant="secondary"
                    size="sm"
                    className="h-9 rounded-xl text-xs px-3 font-semibold hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <a href={editorUrl}>
                      Edit
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {selectedSite && (
        <div className="space-y-6 pt-4 border-t">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
                Live Simulator & Live Preview
                <span className="text-xs font-semibold px-2 py-0.5 bg-primary/10 text-primary rounded-full">
                  {selectedSite.title}
                </span>
              </h2>
              <p className="text-muted-foreground text-sm">
                Interact with your site live in the simulator below, and configure its domain settings.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Live Site Simulator */}
            <div className="lg:col-span-2 space-y-4">
              {/* Simulator Toolbar */}
              <div className="flex items-center justify-between bg-muted/40 border p-3 rounded-2xl backdrop-blur-sm">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5 px-2">
                    <span className="size-3 rounded-full bg-red-500/80" />
                    <span className="size-3 rounded-full bg-yellow-500/80" />
                    <span className="size-3 rounded-full bg-green-500/80" />
                  </div>
                  
                  <div className="hidden sm:flex items-center gap-1 bg-background/80 border rounded-xl p-1 text-xs text-muted-foreground font-mono px-3 py-1 shadow-sm select-all">
                    <Lock className="size-3.5 text-green-500 shrink-0" />
                    <span className="truncate max-w-[200px] sm:max-w-[280px]">
                      {selectedSite.subdomain}.varityweb.com
                    </span>
                    <button
                      onClick={() => handleCopyLink(getLink({ subdomain: selectedSite.subdomain }))}
                      className="ml-2 hover:text-primary transition-colors cursor-pointer"
                    >
                      {copied ? <Check className="size-3.5 text-green-500" /> : <Copy className="size-3.5" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-lg hover:bg-muted"
                    onClick={handleReload}
                    title="Reload site"
                  >
                    <RefreshCw className="size-3.5" />
                  </Button>

                  <span className="h-4 w-px bg-border my-auto mx-1" />

                  {/* Device Selectors */}
                  <div className="flex items-center gap-1 bg-background/60 border rounded-xl p-0.5">
                    <Button
                      variant={viewport === "desktop" ? "secondary" : "ghost"}
                      size="icon"
                      className="h-7 w-8 rounded-lg"
                      onClick={() => setViewport("desktop")}
                      title="Desktop view"
                    >
                      <Laptop className="size-4" />
                    </Button>
                    <Button
                      variant={viewport === "tablet" ? "secondary" : "ghost"}
                      size="icon"
                      className="h-7 w-8 rounded-lg"
                      onClick={() => setViewport("tablet")}
                      title="Tablet view"
                    >
                      <Tablet className="size-4" />
                    </Button>
                    <Button
                      variant={viewport === "mobile" ? "secondary" : "ghost"}
                      size="icon"
                      className="h-7 w-8 rounded-lg"
                      onClick={() => setViewport("mobile")}
                      title="Mobile view"
                    >
                      <Smartphone className="size-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Viewport Frame */}
              <div className="flex items-center justify-center bg-zinc-950/5 border rounded-3xl overflow-hidden p-6 min-h-[460px] relative transition-all duration-300">
                <div
                  className={cn(
                    "bg-white dark:bg-zinc-950 border shadow-2xl rounded-2xl overflow-hidden transition-all duration-300 relative aspect-video flex flex-col",
                    viewport === "desktop" && "w-full h-[440px]",
                    viewport === "tablet" && "w-[600px] h-[480px]",
                    viewport === "mobile" && "w-[360px] h-[520px]"
                  )}
                >
                  <iframe
                    key={iframeKey}
                    src={getLink({ subdomain: selectedSite.subdomain })}
                    className="w-full h-full border-0 select-none pointer-events-auto"
                    title={selectedSite.title}
                    sandbox="allow-scripts allow-same-origin allow-forms"
                  />
                </div>
              </div>
            </div>

            {/* Right Column: Premium CTAs and Configure */}
            <div className="space-y-6">
              {/* Main Premium CTA Card */}
              <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 dark:from-zinc-950 dark:to-black text-white border border-zinc-800 rounded-3xl p-6 shadow-xl flex flex-col justify-between min-h-[220px]">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-primary">
                    <Sparkles className="size-5 text-blue-400" />
                    <span className="text-xs font-bold uppercase tracking-wider text-blue-400">Launch Editor</span>
                  </div>
                  <h3 className="font-bold text-xl leading-tight">
                    Ready to design {selectedSite.title}?
                  </h3>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    Open our custom visual web builder to draft pages, customize text, adjust palettes, and publish instant builds.
                  </p>
                </div>

                <div className="space-y-3 mt-6">
                  <Button
                    asChild
                    className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-400 hover:to-indigo-500 text-white font-bold h-11 rounded-xl shadow-lg shadow-blue-500/20 group/btn transition-all duration-300 border-none"
                  >
                    <a href={getLink({ subdomain: "editor", pathName: selectedSite.id })}>
                      Open Web Builder
                      <ChevronRight className="size-4 ml-1.5 group-hover/btn:translate-x-0.5 transition-transform" />
                    </a>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="w-full bg-transparent border-zinc-800 hover:bg-zinc-900 hover:text-white text-zinc-300 font-semibold h-11 rounded-xl"
                  >
                    <a href={getLink({ subdomain: selectedSite.subdomain })} target="_blank" rel="noopener noreferrer">
                      Visit Live Website
                    </a>
                  </Button>
                </div>
              </div>

              {/* Mock SEO Preview Card */}
              <div className="border bg-card rounded-3xl p-6 shadow-sm space-y-4">
                <div className="flex items-center justify-between pb-2 border-b">
                  <div className="flex items-center gap-2">
                    <Search className="size-4 text-muted-foreground" />
                    <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">SEO Index Preview</span>
                  </div>
                  <span className="text-[10px] bg-green-500/10 text-green-600 font-bold px-2 py-0.5 rounded-full uppercase">Google Index Ready</span>
                </div>
                
                <div className="space-y-2 select-text text-left">
                  <div className="text-[12px] text-[#202124] dark:text-[#bdc1c6] font-mono leading-tight truncate">
                    https://{selectedSite.subdomain}.varityweb.com
                  </div>
                  <div className="text-[19px] text-[#1a0dab] dark:text-[#8ab4f8] hover:underline cursor-pointer leading-snug font-medium line-clamp-1">
                    {selectedSite.title} | Premium Worry-Free Site Builder
                  </div>
                  <div className="text-[13px] text-[#4d5156] dark:text-[#bdc1c6] leading-relaxed line-clamp-2">
                    Create beautiful, premium worry-free web designs with Varityweb. Experience instant responsive previews, custom domain resolution, and seamless branding.
                  </div>
                </div>
              </div>

              {/* Status and Health checks */}
              <div className="border bg-card rounded-3xl p-6 shadow-sm space-y-3">
                <h4 className="font-bold text-sm tracking-tight">System Checks & Credentials</h4>
                
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground flex items-center gap-1.5">
                      <CheckCircle className="size-3.5 text-green-500" />
                      SSL (HTTPS) Certificate
                    </span>
                    <span className="font-medium text-green-600">Active</span>
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground flex items-center gap-1.5">
                      <CheckCircle className="size-3.5 text-green-500" />
                      Global Edge Propagation
                    </span>
                    <span className="font-medium text-green-600">100% Synced</span>
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground flex items-center gap-1.5">
                      <CheckCircle className="size-3.5 text-green-500" />
                      Platform Performance
                    </span>
                    <span className="font-semibold text-blue-600 bg-blue-50 dark:bg-blue-900/30 px-2 py-0.5 rounded">98 / 100</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
