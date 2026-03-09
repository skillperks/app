"use client";

import { useState } from "react";
import { Bell, Mail, Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { trackEvent } from "@/lib/analytics";

interface EmailDealAlertProps {
  platform: string;
  currentDiscount?: string;
}

export function EmailDealAlert({ platform, currentDiscount }: EmailDealAlertProps) {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    setError("");

    try {
      trackEvent("newsletter_submit", {
        source: "deal_alert",
        platform,
        current_discount: currentDiscount,
      });

      const response = await fetch(process.env.NEXT_PUBLIC_NEWSLETTER_API_URL || "/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          source: "deal_alert",
          platform,
          current_discount: currentDiscount,
        }),
      });

      if (response.ok) {
        setIsSubmitted(true);
        trackEvent("newsletter_success", {
          source: "deal_alert",
          platform,
        });
      } else {
        throw new Error("Subscription failed");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
      trackEvent("newsletter_error", {
        source: "deal_alert",
        platform,
        error: err instanceof Error ? err.message : "unknown",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <Card className="bg-green-500/5 border-green-500/20">
        <CardContent className="p-6 text-center">
          <Check className="h-12 w-12 text-green-500 mx-auto mb-4" />
          <h3 className="font-semibold text-green-400 mb-2">You&apos;re on the list!</h3>
          <p className="text-sm text-muted-foreground">
            We&apos;ll email you when {platform} has a better deal.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Bell className="h-5 w-5" />
          Get Notified of Better Deals
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">
          {currentDiscount 
            ? `Currently ${currentDiscount} off. We'll alert you when ${platform} has an even better discount.`
            : `Get notified when ${platform} goes on sale.`
          }
        </p>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="flex gap-2">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1"
            />
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
              ) : (
                <Mail className="h-4 w-4" />
              )}
            </Button>
          </div>
          {error && <p className="text-xs text-red-500">{error}</p>}
          <p className="text-xs text-muted-foreground">
            No spam, unsubscribe anytime. We only send the best deals.
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
