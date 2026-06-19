"use client";

import React, { useState } from "react";
import { EditorElement } from "@/app/providers/editor-provider";
import { createSubmission } from "@/lib/actions/integrations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Loader2, Mail, Send, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

type Props = {
  element: EditorElement;
};

export default function CMSListElement({ element }: Props) {
  const { siteId } = useEditor();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const activeSiteId = siteId;
    if (!activeSiteId) {
      toast.error("Error: Could not identify site configuration ID");
      return;
    }

    if (!name || !email || !message) {
      toast.error("Please fill in all form fields");
      return;
    }

    setSubmitting(true);
    const res = await createSubmission(activeSiteId, {
      name,
      email,
      message,
    });

    if (res.success) {
      setSubmitted(true);
      setName("");
      setEmail("");
      setMessage("");
      toast.success("Message sent successfully!");
    } else {
      toast.error(res.msg || "Failed to submit message");
    }
    setSubmitting(false);
  };

  return (
    <div className="w-full max-w-lg mx-auto p-4">
      <Card className="border border-border/80 bg-card shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader className="text-left pb-4">
          <div className="flex items-center gap-2 text-primary mb-1">
            <Mail className="size-5" />
            <span className="text-xs font-bold uppercase tracking-wider">Contact Form</span>
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight">Get in Touch</CardTitle>
          <CardDescription>
            Have a question or business enquiry? Send us a message and our integrations will forward it to our team.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {submitted ? (
            <div className="flex flex-col items-center justify-center py-8 text-center space-y-3">
              <CheckCircle2 className="size-12 text-emerald-500 animate-bounce" />
              <h4 className="font-bold text-lg text-foreground">Message Sent!</h4>
              <p className="text-sm text-muted-foreground max-w-sm">
                Thank you for contacting us. Your message has been routed through our no-code integrations database.
              </p>
              <Button 
                onClick={() => setSubmitted(false)} 
                variant="outline" 
                size="sm" 
                className="mt-2 text-xs"
              >
                Send Another Message
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5 text-left">
                <label className="text-xs font-semibold text-muted-foreground" htmlFor="form-name">
                  Full Name
                </label>
                <Input
                  id="form-name"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="bg-background border-input focus-visible:ring-primary"
                />
              </div>

              <div className="space-y-1.5 text-left">
                <label className="text-xs font-semibold text-muted-foreground" htmlFor="form-email">
                  Email Address
                </label>
                <Input
                  id="form-email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-background border-input focus-visible:ring-primary"
                />
              </div>

              <div className="space-y-1.5 text-left">
                <label className="text-xs font-semibold text-muted-foreground" htmlFor="form-message">
                  Your Message
                </label>
                <Textarea
                  id="form-message"
                  placeholder="How can we help you?"
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  className="bg-background border-input focus-visible:ring-primary resize-none"
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-primary text-primary-foreground hover:bg-primary/95 font-semibold gap-2 mt-2" 
                disabled={submitting}
              >
                {submitting ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    Sending Message...
                  </>
                ) : (
                  <>
                    <Send className="size-4" />
                    Submit Enquiry
                  </>
                )}
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
