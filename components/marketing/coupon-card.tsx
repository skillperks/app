"use client";

import { useState } from "react";
import { Check, Copy, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { trackEvent } from "@/lib/analytics";

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
    const verifiedAtRaw = coupon.verifiedAt ?? coupon.verifiedAtIso;
    const verifiedAtLabel = verifiedAtRaw ? `Last verified: ${verifiedAtRaw}` : "";

    const now = new Date();
    const expiresAt = coupon.expiresAtIso ? new Date(`${coupon.expiresAtIso}T23:59:59.999Z`) : null;
    const isExpired = expiresAt ? expiresAt.getTime() < now.getTime() : false;
    const statusLabel = expiresAt ? (isExpired ? "Expired" : "Active") : "No expiry info";
    const statusTone = expiresAt
        ? isExpired
            ? "bg-red-100 text-red-800 border-red-200"
            : "bg-green-100 text-green-800 border-green-200"
        : "bg-muted text-muted-foreground border-muted";

    const handleReveal = () => {
        if (coupon.link) {
            trackEvent("outbound_click", {
                platform: platformName,
                coupon_type: coupon.type ?? "code",
                discount: coupon.discount,
                destination: coupon.link,
                status: statusLabel,
                verified_at: verifiedAtRaw,
                expires_at: coupon.expiresAtIso,
                action: "reveal",
            });
            window.open(coupon.link, "_blank");
        }
        setIsRevealed(true);
    };

    const handleCopy = () => {
        if (coupon.code) {
            navigator.clipboard.writeText(coupon.code);
            setIsCopied(true);
            trackEvent("copy_coupon", {
                platform: platformName,
                coupon_type: coupon.type ?? "code",
                discount: coupon.discount,
                status: statusLabel,
                verified_at: verifiedAtRaw,
                expires_at: coupon.expiresAtIso,
            });
            setTimeout(() => setIsCopied(false), 2000);
        }
    };

    // Direct Deal (No Code)
    if (coupon.type === "link") {
        return (
            <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-center gap-2">
                    <span className={cn("inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold", statusTone)}>
                        {statusLabel}
                    </span>
                    {verifiedAtLabel ? (
                        <span className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-semibold text-slate-700">
                            {verifiedAtLabel}
                        </span>
                    ) : null}
                </div>
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
                    <a
                        href={coupon.link || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => {
                            if (!coupon.link) return;
                            trackEvent("outbound_click", {
                                platform: platformName,
                                coupon_type: coupon.type ?? "link",
                                discount: coupon.discount,
                                destination: coupon.link,
                                status: statusLabel,
                                verified_at: verifiedAtRaw,
                                expires_at: coupon.expiresAtIso,
                                action: "activate_deal",
                            });
                        }}
                    >
                        Activate Deal <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                </Button>
            </div>
        );
    }

    // Code Deal (Reveal Pattern)
    return (
        <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-center gap-2">
                <span className={cn("inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold", statusTone)}>
                    {statusLabel}
                </span>
                {verifiedAtLabel ? (
                    <span className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-semibold text-slate-700">
                        {verifiedAtLabel}
                    </span>
                ) : null}
            </div>
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
                        <a
                            href={coupon.link || "#"}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => {
                                if (!coupon.link) return;
                                trackEvent("outbound_click", {
                                    platform: platformName,
                                    coupon_type: coupon.type ?? "code",
                                    discount: coupon.discount,
                                    destination: coupon.link,
                                    status: statusLabel,
                                    verified_at: verifiedAtRaw,
                                    expires_at: coupon.expiresAtIso,
                                    action: "visit_again",
                                });
                            }}
                        >
                            Visit {platformName} Again <ExternalLink className="ml-2 h-4 w-4" />
                        </a>
                    </Button>
                </>
            )}
        </div>
    );
}
