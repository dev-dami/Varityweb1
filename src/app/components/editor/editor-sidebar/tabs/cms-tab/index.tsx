"use client";

import React, { useEffect, useState } from "react";
import { useEditor } from "@/app/providers/editor-provider";
import {
  getIntegrations,
  createIntegration,
  updateIntegration,
  deleteIntegration,
  getSubmissions,
  deleteSubmission
} from "@/lib/actions/integrations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Database, Plus, Trash2, Webhook, Mail, MessageSquare, Check, X, Loader2, Eye } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

export default function IntegrationsTab() {
  const { siteId } = useEditor();
  const [integrations, setIntegrations] = useState<any[]>([]);
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [loadingInts, setLoadingInts] = useState(true);
  const [loadingSubs, setLoadingSubs] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  
  // New Integration Fields
  const [intType, setIntType] = useState("webhook");
  const [intTarget, setIntTarget] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Selected Submission Detail
  const [selectedSub, setSelectedSub] = useState<any | null>(null);

  useEffect(() => {
    loadData();
  }, [siteId]);

  const loadData = () => {
    loadIntegrations();
    loadSubmissions();
  };

  const loadIntegrations = async () => {
    if (!siteId) return;
    setLoadingInts(true);
    const res = await getIntegrations(siteId);
    if (res.success && res.integrations) {
      setIntegrations(res.integrations);
    }
    setLoadingInts(false);
  };

  const loadSubmissions = async () => {
    if (!siteId) return;
    setLoadingSubs(true);
    const res = await getSubmissions(siteId);
    if (res.success && res.submissions) {
      setSubmissions(res.submissions);
    }
    setLoadingSubs(false);
  };

  const handleCreateIntegration = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!intTarget) {
      toast.error("Destination target is required");
      return;
    }

    setSubmitting(true);
    const res = await createIntegration({
      pageId: siteId,
      type: intType,
      target: intTarget,
      active: true,
    });

    if (res.success) {
      toast.success("Integration added successfully!");
      setIntTarget("");
      setDialogOpen(false);
      loadIntegrations();
    } else {
      toast.error(res.msg || "Failed to add integration");
    }
    setSubmitting(false);
  };

  const handleToggleActive = async (id: string, currentStatus: boolean) => {
    const res = await updateIntegration(id, { active: !currentStatus });
    if (res.success) {
      toast.success(`Integration ${!currentStatus ? "activated" : "deactivated"}`);
      loadIntegrations();
    } else {
      toast.error(res.msg || "Failed to update status");
    }
  };

  const handleDeleteIntegration = async (id: string) => {
    if (!confirm("Remove this integration?")) return;
    const res = await deleteIntegration(id);
    if (res.success) {
      toast.success("Integration removed");
      loadIntegrations();
    } else {
      toast.error(res.msg || "Failed to remove integration");
    }
  };

  const handleDeleteSubmission = async (id: string) => {
    if (!confirm("Delete this form submission?")) return;
    const res = await deleteSubmission(id);
    if (res.success) {
      toast.success("Submission deleted");
      loadSubmissions();
    } else {
      toast.error(res.msg || "Failed to delete submission");
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "webhook": return <Webhook className="w-4 h-4 text-blue-500" />;
      case "email": return <Mail className="w-4 h-4 text-amber-500" />;
      case "whatsapp": return <MessageSquare className="w-4 h-4 text-emerald-500" />;
      default: return <Database className="w-4 h-4 text-zinc-500" />;
    }
  };

  return (
    <div className="flex flex-col gap-6 p-4">
      {/* Integrations Header */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between border-b pb-2">
          <div className="flex items-center gap-2 text-[#1d2327] font-semibold text-sm">
            <Webhook className="w-4 h-4 text-[#2271b1]" />
            <span>Integrations</span>
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="h-7 px-3 bg-[#2271b1] hover:bg-[#135e96] text-white shadow-sm rounded-sm">
                Add New
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] border-border bg-white text-[#1d2327]">
              <DialogHeader>
                <DialogTitle className="text-lg font-normal">Add Integration</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleCreateIntegration} className="space-y-4 py-4">
                <div className="space-y-1.5">
                  <Label htmlFor="int-type" className="text-xs font-semibold text-[#1d2327]">Integration Trigger</Label>
                  <Select value={intType} onValueChange={setIntType}>
                    <SelectTrigger className="w-full bg-white border-gray-300">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="webhook">Outgoing Webhook (JSON POST)</SelectItem>
                      <SelectItem value="email">Email Notification Alert</SelectItem>
                      <SelectItem value="whatsapp">WhatsApp Text Warning</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="int-target" className="text-xs font-semibold text-[#1d2327]">
                    {intType === "webhook" && "Webhook Destination URL"}
                    {intType === "email" && "Notification Email Address"}
                    {intType === "whatsapp" && "WhatsApp Phone Number (with code)"}
                  </Label>
                  <Input
                    id="int-target"
                    className="border-gray-300 shadow-inner"
                    placeholder={
                      intType === "webhook" ? "https://api.yourdomain.com/webhook" :
                      intType === "email" ? "alerts@company.com" : "+2348030000000"
                    }
                    value={intTarget}
                    onChange={(e) => setIntTarget(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full gap-2 bg-[#2271b1] hover:bg-[#135e96] text-white" disabled={submitting}>
                  {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
                  Enable Integration
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Integrations List */}
        {loadingInts ? (
          <div className="flex items-center justify-center py-4">
            <Loader2 className="w-4 h-4 animate-spin text-gray-400" />
          </div>
        ) : integrations.length === 0 ? (
          <div className="text-center py-4 px-2 border border-dashed border-gray-300 rounded bg-gray-50">
            <p className="text-xs text-gray-500">No integrations configured yet.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-2 max-h-[220px] overflow-y-auto">
            {integrations.map((int) => (
              <div key={int.id} className="border border-gray-200 bg-white shadow-sm p-2.5 rounded-sm flex items-center justify-between gap-2 hover:border-[#2271b1] transition-colors">
                <div className="flex items-center gap-2 min-w-0 flex-1">
                  {getIcon(int.type)}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-xs text-[#1d2327] capitalize truncate">{int.type}</h4>
                    <p className="text-[10px] text-gray-500 truncate font-mono">{int.target}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Button
                    size="icon"
                    variant="ghost"
                    className={`w-6 h-6 rounded-sm ${int.active ? "text-green-600 hover:text-green-700 bg-green-50" : "text-gray-400 hover:text-gray-600 bg-gray-50"}`}
                    onClick={() => handleToggleActive(int.id, int.active)}
                  >
                    {int.active ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5" />}
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="w-6 h-6 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-sm"
                    onClick={() => handleDeleteIntegration(int.id)}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Submissions Header */}
      <div className="flex flex-col gap-3 mt-4">
        <div className="flex items-center justify-between border-b pb-2">
          <div className="flex items-center gap-2 text-[#1d2327] font-semibold text-sm">
            <Database className="w-4 h-4 text-[#2271b1]" />
            <span>Form Submissions</span>
          </div>
          <Button size="sm" variant="outline" className="h-7 px-3 text-xs border-gray-300 text-[#1d2327] hover:border-gray-400 rounded-sm" onClick={loadSubmissions}>
            Refresh
          </Button>
        </div>

        {/* Submissions List */}
        {loadingSubs ? (
          <div className="flex items-center justify-center py-4">
            <Loader2 className="w-4 h-4 animate-spin text-gray-400" />
          </div>
        ) : submissions.length === 0 ? (
          <div className="text-center py-6 px-2 border border-dashed border-gray-300 rounded bg-gray-50">
            <p className="text-xs text-gray-500">No form submissions received yet.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-2 max-h-[250px] overflow-y-auto">
            {submissions.map((sub) => {
              const dateStr = new Date(sub.createdAt).toLocaleDateString();
              const subData = typeof sub.data === "string" ? JSON.parse(sub.data) : sub.data;
              const name = subData?.name || subData?.email || "Anonymous Submission";
              return (
                <div key={sub.id} className="border border-gray-200 bg-white shadow-sm p-2.5 rounded-sm flex items-center justify-between gap-2 hover:border-[#2271b1] transition-colors">
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-xs text-[#1d2327] truncate">{name}</h4>
                    <p className="text-[10px] text-gray-500">{dateStr}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="w-6 h-6 text-[#2271b1] hover:bg-blue-50 rounded-sm"
                          onClick={() => setSelectedSub(subData)}
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="border-gray-200 bg-white text-[#1d2327] sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle className="text-lg font-normal">Submission Details</DialogTitle>
                        </DialogHeader>
                        <div className="py-4 space-y-3">
                          <div className="text-xs text-gray-500 font-mono">
                            Submitted: {new Date(sub.createdAt).toLocaleString()}
                          </div>
                          <div className="border border-gray-200 bg-gray-50 p-3 rounded-sm space-y-2 text-sm shadow-inner">
                            {selectedSub && Object.entries(selectedSub).map(([key, val]: [string, any]) => (
                              <div key={key} className="grid grid-cols-3 gap-2">
                                <span className="text-gray-600 font-semibold uppercase text-[10px]">{key}:</span>
                                <span className="col-span-2 text-[#1d2327] text-xs font-mono break-all">{val}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="w-6 h-6 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-sm"
                      onClick={() => handleDeleteSubmission(sub.id)}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
