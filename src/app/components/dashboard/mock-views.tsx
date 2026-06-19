"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  MessageSquare, 
  Send, 
  Sparkles,
  Plus,
  ArrowUpRight,
  ShieldCheck,
  Zap,
  Globe,
  Search,
  BookOpen,
  HelpCircle,
  Mail,
  CheckCircle,
  FileText,
  UserCheck
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

// 1. Reports Component
export function ReportsView() {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="space-y-1">
        <h2 className="text-3xl font-bold tracking-tight">System Reports & SEO Audit</h2>
        <p className="text-muted-foreground text-sm">Analyze system logs, performance, and search engine optimization indexes.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-card to-muted/20">
          <CardHeader className="pb-2">
            <CardDescription className="uppercase tracking-wider text-xs font-semibold">SEO Visibility Score</CardDescription>
            <CardTitle className="text-3xl font-black text-blue-500">94%</CardTitle>
          </CardHeader>
          <CardContent className="text-xs text-muted-foreground">
            Site tags, metadata, and headings are fully optimized. 6% remaining for perfect schema markups.
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-card to-muted/20">
          <CardHeader className="pb-2">
            <CardDescription className="uppercase tracking-wider text-xs font-semibold">Average Load Time</CardDescription>
            <CardTitle className="text-3xl font-black text-green-500">0.48s</CardTitle>
          </CardHeader>
          <CardContent className="text-xs text-muted-foreground">
            Varityweb static hosting serves files directly from local edge locations for lightning speeds.
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-card to-muted/20">
          <CardHeader className="pb-2">
            <CardDescription className="uppercase tracking-wider text-xs font-semibold">SSL Status</CardDescription>
            <CardTitle className="text-3xl font-black text-indigo-500">Secure</CardTitle>
          </CardHeader>
          <CardContent className="text-xs text-muted-foreground">
            Let&apos;s Encrypt certificate auto-renewing. Force HTTPS redirect is enabled.
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Crawler Logs</CardTitle>
          <CardDescription>Visual tracker of search engine crawls and page indexing requests.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { bot: "Googlebot Desktop", path: "/", status: 200, time: "2 hours ago" },
              { bot: "Bingbot Desktop", path: "/about", status: 200, time: "5 hours ago" },
              { bot: "Googlebot Mobile", path: "/contact", status: 200, time: "Yesterday" },
            ].map((log, index) => (
              <div key={index} className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0 text-sm">
                <div className="flex items-center gap-2.5">
                  <div className="size-2 rounded-full bg-green-500" />
                  <span className="font-semibold">{log.bot}</span>
                </div>
                <span className="font-mono text-xs bg-muted px-2 py-0.5 rounded text-muted-foreground">{log.path}</span>
                <div className="flex items-center gap-4">
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">{log.status} OK</Badge>
                  <span className="text-xs text-muted-foreground">{log.time}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// 2. Chat Component
export function ChatView() {
  const [messages, setMessages] = useState([
    { sender: "ai", text: "Hello! I am your Varityweb AI Site Assistant. How can I help you design, edit, or configure your website today?" }
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages((prev) => [...prev, { sender: "user", text: input }]);
    const currentInput = input;
    setInput("");
    
    setTimeout(() => {
      let reply = "I can definitely help with that! Let's open the website editor and design a custom section together.";
      if (currentInput.toLowerCase().includes("domain") || currentInput.toLowerCase().includes("subdomain")) {
        reply = "To connect a custom domain, navigate to the Settings tab in the sidebar. You can configure CNAME, A-Records, and check status live.";
      } else if (currentInput.toLowerCase().includes("seo") || currentInput.toLowerCase().includes("search")) {
        reply = "You can view Google Crawl status and indexation quality directly under the Reports section. Varityweb generates auto sitemaps.";
      }
      setMessages((prev) => [...prev, { sender: "ai", text: reply }]);
    }, 1000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="space-y-1">
        <h2 className="text-3xl font-bold tracking-tight">AI Chat Assistant</h2>
        <p className="text-muted-foreground text-sm">Talk with AI to draft layout layouts, configure DNS, or compose copywriting.</p>
      </div>

      <Card className="h-[520px] flex flex-col justify-between overflow-hidden border border-primary/10 shadow-lg">
        <CardHeader className="border-b bg-muted/20 py-4 flex flex-row items-center gap-3">
          <div className="size-9 rounded-xl bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center shadow shadow-blue-500/25">
            <Sparkles className="size-4 text-white" />
          </div>
          <div>
            <CardTitle className="text-base font-bold">Varityweb Assistant</CardTitle>
            <CardDescription className="text-xs text-green-500 font-semibold">Active & Online</CardDescription>
          </div>
        </CardHeader>
        
        <CardContent className="flex-1 overflow-y-auto p-6 space-y-4 font-normal text-sm">
          {messages.map((msg, index) => (
            <div key={index} className={cn("flex max-w-[80%] flex-col gap-1.5", msg.sender === "user" ? "ml-auto items-end" : "mr-auto items-start")}>
              <div className={cn("p-3.5 rounded-2xl leading-relaxed text-sm shadow-sm", msg.sender === "user" ? "bg-blue-600 text-white rounded-tr-none" : "bg-muted text-foreground rounded-tl-none")}>
                {msg.text}
              </div>
            </div>
          ))}
        </CardContent>

        <div className="p-4 border-t bg-muted/10 flex gap-2">
          <Input 
            value={input} 
            onChange={(e) => setInput(e.target.value)} 
            placeholder="Type your design question or command..." 
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            className="rounded-xl"
          />
          <Button onClick={handleSend} className="rounded-xl bg-blue-600 hover:bg-blue-500 text-white shrink-0 px-4">
            <Send className="size-4" />
          </Button>
        </div>
      </Card>
    </div>
  );
}

// 3. Deals Component
export function DealsView() {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-3xl font-bold tracking-tight">CRM & Contact Leads</h2>
          <p className="text-muted-foreground text-sm">Manage contacts, leads, and forms submitted directly through your Varityweb sites.</p>
        </div>
        <Button className="rounded-xl bg-blue-600 hover:bg-blue-500 text-white"><Plus className="size-4 mr-2" /> Add Contact</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Kanban Columns */}
        {[
          {
            title: "New Contacts",
            color: "bg-blue-500",
            leads: [
              { name: "John Doe", email: "john@example.com", source: "varityweb.com/contact", date: "3 hours ago" },
              { name: "Sarah Connor", email: "sarah@cyberdyne.co", source: "mybrand.com/leads", date: "1 day ago" }
            ]
          },
          {
            title: "Contact Responded",
            color: "bg-yellow-500",
            leads: [
              { name: "Bruce Wayne", email: "bruce@waynecorp.com", source: "gotham.varityweb.com", date: "2 days ago" }
            ]
          },
          {
            title: "Deal Signed",
            color: "bg-green-500",
            leads: [
              { name: "Tony Stark", email: "tony@stark.com", source: "starkindustries.com", date: "Completed" }
            ]
          }
        ].map((column, idx) => (
          <div key={idx} className="space-y-3 bg-muted/30 border p-4 rounded-3xl min-h-[350px]">
            <div className="flex items-center justify-between border-b pb-2 px-1">
              <span className="font-bold text-sm flex items-center gap-2">
                <span className={cn("size-2 rounded-full", column.color)} />
                {column.title}
              </span>
              <Badge variant="secondary" className="font-mono text-xs">{column.leads.length}</Badge>
            </div>
            
            <div className="space-y-3">
              {column.leads.map((lead, lIdx) => (
                <Card key={lIdx} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm">{lead.name}</span>
                      <ArrowUpRight className="size-4 text-muted-foreground hover:text-primary cursor-pointer" />
                    </div>
                    <p className="text-xs text-muted-foreground truncate">{lead.email}</p>
                    <div className="flex justify-between items-center text-[10px] text-muted-foreground pt-2 border-t mt-2">
                      <span className="font-mono truncate max-w-[120px]">{lead.source}</span>
                      <span>{lead.date}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// 4. Accounts Component
export function AccountsView() {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="space-y-1">
        <h2 className="text-3xl font-bold tracking-tight">Client Accounts</h2>
        <p className="text-muted-foreground text-sm">Configure permissions, invitations, and team client portals.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Invite Clients & Collaborators</CardTitle>
          <CardDescription>Give clients full viewer permissions to review static page iterations.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 max-w-md">
            <Input placeholder="Enter collaborator email..." className="rounded-xl" />
            <Button className="bg-blue-600 hover:bg-blue-500 text-white rounded-xl">Send Invitation</Button>
          </div>

          <div className="mt-8 space-y-4">
            {[
              { name: "Andrew Luo", role: "Owner", email: "andrew@usehindsight.com", status: "Active" },
              { name: "Jane Smith", role: "Developer", email: "jane@company.com", status: "Active" },
              { name: "Mark Wilson", role: "Client Reviewer", email: "mark@client.com", status: "Pending Invite" },
            ].map((member, index) => (
              <div key={index} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0 text-sm">
                <div className="flex items-center gap-3">
                  <div className="size-9 rounded-full bg-primary/10 flex items-center justify-center font-bold text-xs">
                    {member.name.substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <div className="font-semibold">{member.name}</div>
                    <div className="text-xs text-muted-foreground">{member.email}</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Badge variant="secondary" className="font-mono text-xs">{member.role}</Badge>
                  <span className={cn("text-xs font-semibold", member.status === "Active" ? "text-green-500" : "text-amber-500")}>
                    {member.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// 5. Competitors Component
export function CompetitorsView() {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="space-y-1">
        <h2 className="text-3xl font-bold tracking-tight">Competitor Tracking & Audits</h2>
        <p className="text-muted-foreground text-sm">Compare speed and search performance against typical site builders.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Page Speed Index Comparison</CardTitle>
            <CardDescription>Lighthouse Speed Index comparison (Lower is better).</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { name: "Varityweb Static (Our Edge)", score: "0.48s", width: "w-[15%]", color: "bg-green-500" },
              { name: "Next.js Custom Server", score: "1.12s", width: "w-[45%]", color: "bg-blue-500" },
              { name: "Wix / Squarespace Templates", score: "3.42s", width: "w-[85%]", color: "bg-red-500" },
            ].map((item, idx) => (
              <div key={idx} className="space-y-1 text-xs">
                <div className="flex justify-between font-semibold">
                  <span>{item.name}</span>
                  <span>{item.score}</span>
                </div>
                <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                  <div className={cn("h-full rounded-full transition-all duration-500", item.color, item.width)} />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Network Bundle Payload</CardTitle>
            <CardDescription>Client-side JS/CSS bundle size loaded on first visit.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { name: "Varityweb CSS-First Framework", size: "18 KB", width: "w-[12%]", color: "bg-green-500" },
              { name: "Vite + React Vanilla Bundle", size: "142 KB", width: "w-[40%]", color: "bg-blue-500" },
              { name: "Wordpress + Elementor Page", size: "620 KB", width: "w-[90%]", color: "bg-red-500" },
            ].map((item, idx) => (
              <div key={idx} className="space-y-1 text-xs">
                <div className="flex justify-between font-semibold">
                  <span>{item.name}</span>
                  <span>{item.size}</span>
                </div>
                <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                  <div className={cn("h-full rounded-full transition-all duration-500", item.color, item.width)} />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// 6. Knowledge Base Component
export function KnowledgeView() {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="space-y-1">
        <h2 className="text-3xl font-bold tracking-tight">Varityweb Knowledge Base</h2>
        <p className="text-muted-foreground text-sm">Read documentation guides, tips, and tutorials about worry-free web design.</p>
      </div>

      <div className="flex gap-2 max-w-lg">
        <Input placeholder="Search tutorials, DNS guides..." className="rounded-xl" />
        <Button className="bg-blue-600 hover:bg-blue-500 text-white rounded-xl"><Search className="size-4" /></Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { title: "Custom Domain DNS Setup", desc: "Configure CNAME, A-Records, and link your custom naked domains to Varityweb edge networks.", icon: Globe },
          { title: "SEO Meta Tags & Sitemaps", desc: "Customize meta tags, robot files, and trigger auto sitemap submissions to Google.", icon: BookOpen },
          { title: "CSS Styling System", desc: "Understand Varityweb design tokens, styling layouts, and pixel gooey hover trail filters.", icon: HelpCircle },
        ].map((item, idx) => (
          <Card key={idx} className="hover:border-primary/40 hover:shadow-md transition-all cursor-pointer">
            <CardHeader className="pb-2">
              <div className="size-8 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
                <item.icon className="size-4 text-primary" />
              </div>
              <CardTitle className="text-base">{item.title}</CardTitle>
            </CardHeader>
            <CardContent className="text-xs text-muted-foreground">
              {item.desc}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

// 7. Feedback Component
export function FeedbackView() {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="space-y-1">
        <h2 className="text-3xl font-bold tracking-tight">Site Form Feedback</h2>
        <p className="text-muted-foreground text-sm">View and manage messages submitted through your live contact forms.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Form Submissions</CardTitle>
          <CardDescription>Direct queries collected from the contact widgets of your Varityweb pages.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { name: "Alice Johnson", email: "alice@hometown.net", message: "Hi! Can you quote a landing page for our local bakery store?", time: "3 hours ago" },
              { name: "Bob Carter", email: "bob@carterconsulting.org", message: "We would like to move our enterprise site over to Varityweb edge hosting. Who can we discuss custom enterprise limits with?", time: "1 day ago" },
            ].map((item, index) => (
              <div key={index} className="border-b pb-4 last:border-0 last:pb-0 space-y-2">
                <div className="flex justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <Mail className="size-3.5 text-primary" />
                    <span className="font-bold">{item.name}</span>
                    <span className="text-xs text-muted-foreground">({item.email})</span>
                  </div>
                  <span className="text-xs text-muted-foreground">{item.time}</span>
                </div>
                <p className="text-sm bg-muted/40 border p-3 rounded-2xl leading-relaxed text-muted-foreground font-normal">
                  &quot;{item.message}&quot;
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// 8. Document Review Component
export function ReviewView() {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="space-y-1">
        <h2 className="text-3xl font-bold tracking-tight">Document Review & Visual Auditor</h2>
        <p className="text-muted-foreground text-sm">Review draft layout iterations, accessibility constraints, and structure.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Accessibility & WCAG Checklist</CardTitle>
          <CardDescription>Varityweb visual audit scanning your active static code for standard accessibility tags.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            { tag: "HTML Lang attribute", status: "Passed", details: "<html lang=\"en\"> tag verified on main layout document." },
            { tag: "Image alt tags", status: "Passed", details: "All stock images and generated images contain descriptive alt text." },
            { tag: "Contrast ratios", status: "Attention Needed", details: "Light gray buttons on white backgrounds might have low visibility. Consider dark-mode support." },
          ].map((item, idx) => (
            <div key={idx} className="flex items-start justify-between border-b pb-4 last:border-0 last:pb-0 text-sm gap-4">
              <div className="space-y-1">
                <div className="font-bold flex items-center gap-1.5">
                  <CheckCircle className={cn("size-4", item.status === "Passed" ? "text-green-500" : "text-amber-500")} />
                  {item.tag}
                </div>
                <p className="text-xs text-muted-foreground">{item.details}</p>
              </div>
              <Badge variant={item.status === "Passed" ? "outline" : "default"} className={cn(item.status === "Passed" ? "bg-green-50 text-green-700 border-green-200" : "bg-amber-50 text-amber-700 border-amber-200")}>
                {item.status}
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
