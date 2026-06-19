"use client";

import React from "react";
import { getLink } from "@/lib/getLink";
import { Button } from "@/components/ui/button";
import {
  Sparkles,
  Zap,
  Shield,
  Layers,
  ArrowRight,
} from "lucide-react";
import { useScreenSize } from "@/hooks/use-screen-size";
import { PixelTrail } from "@/components/ui/pixel-trail";
import { GooeyFilter } from "@/components/ui/gooey-filter";
import { GooeyDemo } from "@/components/ui/gooey-demo";

export default function LandingPage() {
  const loginUrl = getLink({ subdomain: "app", pathName: "login" });
  const appUrl = getLink({ subdomain: "app" });
  const screenSize = useScreenSize();

  return (
    <div className="relative min-h-screen bg-black text-white overflow-x-hidden transition-colors duration-300">
      {/* Background Pixel Trail with Gooey Filter */}
      <div className="absolute inset-0 h-[100vh] w-full overflow-hidden pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black z-10" />
        <img
          src="https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=1200&auto=format&fit=crop"
          alt="Abstract landing page background"
          className="w-full h-full object-cover absolute inset-0 opacity-20 select-none pointer-events-none"
        />
        <GooeyFilter id="gooey-filter-bg" strength={6} />
        <div
          className="absolute inset-0 z-0"
          style={{ filter: "url(#gooey-filter-bg)" }}
        >
          <PixelTrail
            pixelSize={screenSize.lessThan("md") ? 28 : 36}
            fadeDuration={0}
            delay={500}
            pixelClassName="bg-white/40"
          />
        </div>
      </div>

      {/* Header */}
      <div className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4">
        <header className="w-full max-w-4xl rounded-full border border-white/10 bg-black/40 backdrop-blur-xl shadow-lg transition-all duration-300">
          <div className="px-6 h-14 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img 
                src="/varityweb.png" 
                alt="Varityweb Logo" 
                className="size-8 object-contain"
              />
              <span className="font-bold text-lg tracking-tight text-white">
                Varityweb
              </span>
            </div>

            <nav className="flex items-center space-x-6">
              <a
                href={appUrl}
                className="text-sm font-medium text-white/80 hover:text-white transition-colors"
              >
                Dashboard
              </a>
              <Button
                asChild
                variant="outline"
                className="rounded-full border-white/10 bg-white/10 text-white hover:bg-white/20 hover:text-white h-9 px-4 text-xs font-semibold"
              >
                <a href={loginUrl}>Sign In</a>
              </Button>
            </nav>
          </div>
        </header>
      </div>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-6 pt-32 pb-20 flex flex-col items-center text-center relative z-10">
        <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 text-xs text-primary mb-8 backdrop-blur-sm">
          <Sparkles className="size-3.5" />
          <span>Nigeria&apos;s Leading High-Performance No-Code Web Platform</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight max-w-4xl leading-tight text-white drop-shadow-md">
          Launch Stunning Websites. <br />
          Zero Coding. Zero Server Stress.
        </h1>

        <p className="mt-6 text-lg md:text-xl text-white/70 max-w-2xl leading-relaxed">
          Varityweb is the first fully-managed web engine engineered from the ground up for Nigeria. Create beautiful, high-converting pages that load instantly on local networks while we handle all the hosting, performance, and security.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
          <Button
            asChild
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold shadow-md px-8"
          >
            <a href={loginUrl} className="flex items-center gap-2">
              Start Building Free <ArrowRight className="size-4" />
            </a>
          </Button>
        </div>

        {/* Feature Grid */}
        <section className="mt-32 w-full grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white/5 border border-white/10 p-8 rounded-2xl text-left shadow-sm backdrop-blur-sm">
            <div className="size-12 rounded-xl bg-white/5 flex items-center justify-center text-primary mb-6 border border-white/10">
              <Zap className="size-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Engineered for Local Network Speeds</h3>
            <p className="mt-2 text-white/70 leading-relaxed">
              Every millisecond counts. Our optimized server framework and local media caching ensure your website loads instantly for visitors across Lagos, Abuja, Port Harcourt, and beyond, even on standard mobile data connections.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 p-8 rounded-2xl text-left shadow-sm backdrop-blur-sm">
            <div className="size-12 rounded-xl bg-white/5 flex items-center justify-center text-primary mb-6 border border-white/10">
              <Shield className="size-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Fully-Managed & Secure Hosting</h3>
            <p className="mt-2 text-white/70 leading-relaxed">
              No server setups, subscription configuration, or SSL certificate renewals. Varityweb runs a fully-managed ecosystem with automatic security updates, guaranteed global uptime, and continuous site backups.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 p-8 rounded-2xl text-left shadow-sm backdrop-blur-sm">
            <div className="size-12 rounded-xl bg-white/5 flex items-center justify-center text-primary mb-6 border border-white/10">
              <Layers className="size-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Built for Entrepreneurs & Creators</h3>
            <p className="mt-2 text-white/70 leading-relaxed">
              Tailored to power local brands, creative portfolios, corporate landing pages, and professional agencies. Design highly responsive layouts that represent your brand professionally and turn visitors into clients.
            </p>
          </div>
        </section>

        {/* Interactive Showcase Section */}
        <section className="mt-32 w-full max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white">
              Interactive Design Playground
            </h2>
            <p className="mt-4 text-white/70 max-w-xl mx-auto">
              Varityweb is built for responsive, high-performance interactions. Drag your cursor across the canvas below to test our custom gooey pixel trail algorithm.
            </p>
          </div>
          <GooeyDemo />
        </section>

        {/* Pricing Section */}
        <section className="mt-32 w-full max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white">
              Transparent, Worry-Free Pricing
            </h2>
            <p className="mt-4 text-white/70">
              No hidden fees. Choose a plan that suits your goals and upgrade as your digital footprint expands.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            {/* Free Tier */}
            <div className="bg-white/5 border border-white/10 p-8 rounded-3xl flex flex-col justify-between hover:border-primary/45 transition-all shadow-sm backdrop-blur-sm">
              <div>
                <h3 className="text-2xl font-bold text-white">Starter Plan</h3>
                <p className="mt-2 text-white/70 text-sm">Perfect for testing new ideas and side projects.</p>
                <div className="mt-6 flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-white">₦0</span>
                  <span className="text-white/60 font-medium">/ forever</span>
                </div>
                <ul className="mt-8 space-y-4 text-white/70 text-sm">
                  <li className="flex items-center gap-2">
                    <span className="text-primary font-bold">✓</span> 1 Live Published Website
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-primary font-bold">✓</span> High-Speed Varityweb Subdomain
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-primary font-bold">✓</span> Intuitive Drag & Drop Editor
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-primary font-bold">✓</span> SSL Security Certificate
                  </li>
                </ul>
              </div>
              <Button asChild className="mt-8 w-full bg-white/10 text-white border border-white/10 hover:bg-white/20 font-medium">
                <a href={loginUrl}>Start Building Free</a>
              </Button>
            </div>

            {/* Pro Tier */}
            <div className="relative bg-white/5 border border-primary/50 p-8 rounded-3xl flex flex-col justify-between hover:border-primary transition-all shadow-md backdrop-blur-sm">
              <div className="absolute top-0 right-8 -translate-y-1/2 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                Popular
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">Growth Plan</h3>
                <p className="mt-2 text-white/70 text-sm">For scaling businesses, agencies, and elite creators.</p>
                <div className="mt-6 flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-white">₦5,000</span>
                  <span className="text-white/60 font-medium">/ month</span>
                </div>
                <ul className="mt-8 space-y-4 text-white/70 text-sm">
                  <li className="flex items-center gap-2">
                    <span className="text-primary font-bold">✓</span> Unlimited Published Websites
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-primary font-bold">✓</span> Connect Your Custom Domain
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-primary font-bold">✓</span> Premium Layout Components & Templates
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-primary font-bold">✓</span> Advanced Visitor Traffic Analytics
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-primary font-bold">✓</span> Priority Support (WhatsApp & Email)
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-primary font-bold">✓</span> Completely Ad-Free (No Varityweb Branding)
                  </li>
                </ul>
              </div>
              <Button asChild className="mt-8 w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold">
                <a href={loginUrl}>Upgrade to Growth</a>
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-black/60 py-12 relative z-10 text-center text-sm text-white/60">
        <p>© {new Date().getFullYear()} Varityweb. All rights reserved.</p>
      </footer>
    </div>
  );
}
