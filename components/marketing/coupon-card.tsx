"use client";

import { useState } from "react";
import { Check, Copy, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { Coupon } from "@/lib/data";

function maskCouponCode(code: string) {
    const trimmed = code.trim();
    if (!trimmed) return "";
    const keep = 2;
    const start = trimmed.slice(0, keep);
    const end = trimmed.slice(Math.max(keep, trimmed.length - keep));
    if (trimmed.length <= keep * 2) return `${start}••`;
    return `${start}${"•".repeat(Math.min(6, Math.max(3, trimmed.length - keep * 2)))}${end}`;
}

interface CouponCardProps {
    coupon: Coupon;
    platformName: string;
}

export function CouponCard({ coupon, platformName }: CouponCardProps) {
    const [isRevealed, setIsRevealed] = useState(false);
    const [isCopied, setIsCopied] = useState(false);

    const maskedCode = coupon.code ? maskCouponCode(coupon.code) : "";

    const handleReveal = () => {
        if (coupon.link) {
            window.open(coupon.link, "_blank");
        }
        setIsRevealed(true);
    };

    const handleCopy = () => {
        if (coupon.code) {
            navigator.clipboard.writeText(coupon.code);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        }
    };

    // Direct Deal (No Code)
    if (coupon.type === "link") {
        return (
            <div className="space-y-4">
                <div className="bg-muted/50 p-4 rounded-lg text-center border border-dashed border-primary/30">
                    <p className="text-sm font-medium text-muted-foreground mb-1">
                        No coupon code needed
                    </p>
                    <p className="text-xs text-muted-foreground">
                        Discount automatically applied
                    </p>
                </div>

                <Button
                    className="w-full text-base font-bold shadow-md hover:shadow-lg transition-all"
                    size="lg"
                    asChild
                >
                    <a href={coupon.link || "#"} target="_blank" rel="noopener noreferrer">
                        Activate Deal <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                </Button>

                <p className="text-xs text-center text-muted-foreground">
                    *Verified working as of Feb 2026
                </p>
            </div>
        );
    }

    // Code Deal (Reveal Pattern)
    return (
        <div className="space-y-4">
            {!isRevealed ? (
                // Hidden State
                <>
                    <div className="relative bg-muted/50 p-4 rounded-lg text-center border border-dashed border-primary/30 overflow-hidden group">
                        <div className="absolute inset-0 bg-background/50 backdrop-blur-[2px] z-10 flex items-center justify-center">
                            <span className="text-sm font-medium text-muted-foreground">
                                •••• ••••
                            </span>
                        </div>
                        <code className="text-lg font-mono font-bold text-primary opacity-50 blur-sm">
                            HIDDENCODE
                        </code>
                    </div>

                    <Button
                        onClick={handleReveal}
                        className="w-full text-base font-bold shadow-md hover:shadow-lg transition-all"
                        size="lg"
                    >
                        Show Code & Visit Site <ExternalLink className="ml-2 h-4 w-4" />
                    </Button>
                </>
            ) : (
                // Revealed State
                <>
                    <div className="bg-primary/5 p-4 rounded-lg text-center border border-primary/20 animate-in fade-in zoom-in-95 duration-200">
                        <p className="text-xs text-muted-foreground mb-2">Copy this code at checkout:</p>
                        <div className="flex items-center gap-2">
                            <div className="flex-1 bg-background border rounded-md px-3 py-2 font-mono font-bold text-primary text-lg text-center select-all">
                                {maskedCode || "••••••"}
                            </div>
                            <Button
                                size="icon"
                                variant="outline"
                                onClick={handleCopy}
                                className={cn("shrink-0 transition-colors", isCopied && "text-green-600 border-green-600 bg-green-50")}
                            >
                                {isCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                            </Button>
                        </div>
                    </div>

                    <Button
                        variant="outline"
                        className="w-full"
                        asChild
                    >
                        <a href={coupon.link || "#"} target="_blank" rel="noopener noreferrer">
                            Visit {platformName} Again <ExternalLink className="ml-2 h-4 w-4" />
                        </a>
                    </Button>
                </>
            )}

            <p className="text-xs text-center text-muted-foreground">
                *Verified working as of Feb 2026
            </p>
        </div>
    );
}
