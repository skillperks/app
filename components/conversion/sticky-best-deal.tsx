"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { X, Tag } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface BestDealProps {
  platform: string;
  discount: string;
  couponSlug: string;
  expiresAt?: string;
}

export function StickyBestDeal({ platform, discount, couponSlug, expiresAt }: BestDealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (isDismissed) return;
      
      const scrollY = window.scrollY;
      setIsVisible(scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isDismissed]);

  if (!isVisible || isDismissed) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-sm animate-in slide-in-from-bottom-4 fade-in duration-300">
      <div className="bg-card border border-border rounded-2xl shadow-2xl p-4 space-y-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="secondary" className="bg-green-500/10 text-green-400 border-green-500/30">
                Best Deal Now
              </Badge>
              <button
                onClick={() => setIsDismissed(true)}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            
            <h4 className="font-semibold text-foreground mb-1">{platform}</h4>
            <p className="text-2xl font-bold text-green-400 mb-2">{discount}</p>
            
            {expiresAt && (
              <p className="text-xs text-muted-foreground mb-3">
                Expires: {expiresAt}
              </p>
            )}
            
            <div className="flex gap-2">
              <Button className="flex-1" size="sm" asChild>
                <Link href={`/coupons/${couponSlug}`}>
                  <Tag className="h-4 w-4 mr-1" />
                  Get Coupon
                </Link>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <Link href={`/reviews/${platform.toLowerCase()}`}>
                  View Review
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
