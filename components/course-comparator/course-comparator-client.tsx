"use client";

import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import type { Course, PlatformMeta, SkillLevel } from "@/lib/course-comparator-types";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

function safeNumber(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  return null;
}

function trackEvent(name: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag;
  if (typeof gtag !== "function") return;
  gtag("event", name, params ?? {});
}

function formatCurrency(value: number | null, currency: string) {
  if (value === null) return "—";
  try {
    return new Intl.NumberFormat(undefined, { style: "currency", currency, maximumFractionDigits: 0 }).format(value);
  } catch {
    return `${value} ${currency}`;
  }
}

function boolLabel(value: boolean | null | undefined) {
  if (value === true) return "Yes";
  if (value === false) return "No";
  return "—";
}

function maskCouponCode(code: string) {
  const trimmed = code.trim();
  if (!trimmed) return "";
  const keep = 2;
  const start = trimmed.slice(0, keep);
  const end = trimmed.slice(Math.max(keep, trimmed.length - keep));
  if (trimmed.length <= keep * 2) return `${start}••`;
  return `${start}${"•".repeat(Math.min(6, Math.max(3, trimmed.length - keep * 2)))}${end}`;
}

function CouponReveal({
  code,
  revealed,
  onReveal,
  onCopy,
}: {
  code: string;
  revealed: boolean;
  onReveal: () => void;
  onCopy: () => void;
}) {
  const masked = maskCouponCode(code);
  if (!masked) return <span>—</span>;

  return (
    <div className="flex items-center gap-2">
      <Button
        size="sm"
        variant="outline"
        onClick={onReveal}
        className="relative overflow-hidden"
      >
        <span className="relative z-10">{revealed ? "Shown" : "Show"}</span>
        <span
          aria-hidden
          className={`absolute inset-0 bg-primary/10 transition-transform duration-300 ${revealed ? "translate-x-full" : "translate-x-0"}`}
        />
      </Button>

      <span
        className={`font-mono text-xs px-2 py-1 rounded border border-dashed transition-all duration-300 ${
          revealed ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-1 pointer-events-none"
        }`}
      >
        {masked}
      </span>

      <Button size="sm" variant="outline" onClick={onCopy}>
        Copy
      </Button>
    </div>
  );
}

function buildAffiliateUrl(course: Course, sessionId: string) {
  try {
    const url = new URL(course.skillPerksData.affiliateLink);
    url.searchParams.set("utm_source", "skillperks");
    url.searchParams.set("utm_medium", "comparison_table");
    url.searchParams.set("utm_campaign", course.categories?.[0] ?? "course-comparator");
    url.searchParams.set("utm_content", course.id);
    url.searchParams.set("utm_term", sessionId);
    return url.toString();
  } catch {
    return course.skillPerksData.affiliateLink;
  }
}

type SortKey = "none" | "rating" | "price_asc" | "price_desc" | "value";

type TableRow = {
  label: string;
  type: "text" | "currency" | "currency_min" | "number_min" | "number_max" | "bool_true" | "coupon";
  getValue: (course: Course) => unknown;
  format?: (value: number | null, course: Course) => string;
};

type TableGroup = {
  group: string;
  rows: TableRow[];
};

type Filters = {
  platformId: string;
  category: string;
  level: SkillLevel | "any";
  format: "any" | "text" | "video" | "interactive";
};

const DEFAULT_FILTERS: Filters = {
  platformId: "all",
  category: "all",
  level: "any",
  format: "any",
};

export function CourseComparatorClient({ courses, platforms }: { courses: Course[]; platforms: PlatformMeta[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);
  const [sortKey, setSortKey] = useState<SortKey>("none");
  const [activeGroup, setActiveGroup] = useState<string>("All");
  const [collapsedGroups, setCollapsedGroups] = useState<Record<string, boolean>>(() => {
    if (typeof window === "undefined") return {};
    try {
      const raw = window.localStorage.getItem("sp_course_comparator_collapsed_groups");
      if (!raw) return {};
      const parsed = JSON.parse(raw) as unknown;
      if (parsed && typeof parsed === "object") return parsed as Record<string, boolean>;
      return {};
    } catch {
      return {};
    }
  });
  const [mobileActiveId, setMobileActiveId] = useState<string>("");
  const [hasCompared, setHasCompared] = useState(false);
  const [revealedCoupons, setRevealedCoupons] = useState<Record<string, boolean>>({});

  const comparisonRef = useRef<HTMLDivElement | null>(null);
  const hasTrackedViewRef = useRef(false);

  function resetFilters() {
    setQuery("");
    setFilters(DEFAULT_FILTERS);
    setSortKey("none");
  }

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.setItem("sp_course_comparator_collapsed_groups", JSON.stringify(collapsedGroups));
    } catch {
      // noop
    }
  }, [collapsedGroups]);

  const selectedIds = useMemo(() => {
    const param = searchParams.get("c");
    if (!param) return [] as string[];

    const ids = param
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    const allowed = new Set(courses.map((c) => c.id));
    const deduped: string[] = [];
    for (const id of ids) {
      if (!allowed.has(id)) continue;
      if (deduped.includes(id)) continue;
      deduped.push(id);
      if (deduped.length >= 5) break;
    }

    return deduped;
  }, [courses, searchParams]);

  const sessionId = useMemo(() => selectedIds.join(","), [selectedIds]);

  const platformById = useMemo(() => {
    const map = new Map<string, PlatformMeta>();
    for (const p of platforms) map.set(p.id, p);
    return map;
  }, [platforms]);

  const categories = useMemo(() => {
    const set = new Set<string>();
    courses.forEach((c) => c.categories?.forEach((cat) => set.add(cat)));
    return Array.from(set).sort();
  }, [courses]);

  const filteredCourses = useMemo(() => {
    const q = query.trim().toLowerCase();

    return courses.filter((c) => {
      if (q) {
        const hay = `${c.title} ${(c.instructors ?? []).map((i) => i.name).join(" ")} ${(c.categories ?? []).join(" ")}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }

      if (filters.platformId !== "all" && c.platformId !== filters.platformId) return false;
      if (filters.category !== "all" && !(c.categories ?? []).includes(filters.category)) return false;
      if (filters.level !== "any" && c.content?.skillLevel !== filters.level) return false;
      if (filters.format !== "any" && c.format?.primaryFormat !== filters.format) return false;

      return true;
    });
  }, [courses, filters, query]);

  const selectedCourses = useMemo(() => {
    const map = new Map(courses.map((c) => [c.id, c] as const));
    const list = selectedIds.map((id) => map.get(id)).filter(Boolean) as Course[];

    const sorters: Record<SortKey, (a: Course, b: Course) => number> = {
      none: () => 0,
      rating: (a, b) => (safeNumber(b.rating) ?? -1) - (safeNumber(a.rating) ?? -1),
      price_asc: (a, b) => (safeNumber(a.pricing.currentPrice) ?? Number.POSITIVE_INFINITY) - (safeNumber(b.pricing.currentPrice) ?? Number.POSITIVE_INFINITY),
      price_desc: (a, b) => (safeNumber(b.pricing.currentPrice) ?? -1) - (safeNumber(a.pricing.currentPrice) ?? -1),
      value: (a, b) => (safeNumber(b.skillPerksData.valueScore) ?? -1) - (safeNumber(a.skillPerksData.valueScore) ?? -1),
    };

    const sorted = [...list];
    if (sortKey !== "none") sorted.sort(sorters[sortKey]);

    return sorted;
  }, [courses, selectedIds, sortKey]);

  const effectiveMobileActiveId = useMemo(() => {
    if (selectedCourses.length === 0) return "";
    if (mobileActiveId && selectedCourses.some((c) => c.id === mobileActiveId)) return mobileActiveId;
    return selectedCourses[0]?.id ?? "";
  }, [mobileActiveId, selectedCourses]);

  const showComparison = useMemo(() => {
    const fromUrl = selectedIds.length >= 2;
    return hasCompared || fromUrl;
  }, [hasCompared, selectedIds.length]);

  function syncSelectedToUrl(next: string[]) {
    const params = new URLSearchParams(searchParams.toString());
    if (next.length === 0) params.delete("c");
    else params.set("c", next.join(","));
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  function toggleSelected(id: string) {
    const isRemoving = selectedIds.includes(id);
    const next = isRemoving ? selectedIds.filter((x) => x !== id) : [...selectedIds, id].slice(0, 5);
    syncSelectedToUrl(next);

    trackEvent(isRemoving ? "comparison_course_removed" : "comparison_course_added", {
      course_id: id,
      selected_count: next.length,
      session_id: next.join(","),
    });
  }

  function removeSelected(id: string) {
    const next = selectedIds.filter((x) => x !== id);
    syncSelectedToUrl(next);

    trackEvent("comparison_course_removed", {
      course_id: id,
      selected_count: next.length,
      session_id: next.join(","),
    });
  }

  function clearAll() {
    syncSelectedToUrl([]);
    setHasCompared(false);
  }

  function onCompare() {
    if (selectedCourses.length < 2) return;
    setHasCompared(true);
    trackEvent("comparison_started", {
      selected_count: selectedCourses.length,
      session_id: sessionId,
    });

    requestAnimationFrame(() => {
      comparisonRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  async function copyShareUrl() {
    const url = typeof window === "undefined" ? "" : window.location.href;
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      // noop
    }

    trackEvent("comparison_shared", {
      selected_count: selectedIds.length,
      session_id: sessionId,
    });
  }

  async function copyCoupon(code: string) {
    try {
      await navigator.clipboard.writeText(code);
    } catch {
      // noop
    }

    trackEvent("coupon_copied", {
      coupon: code,
      session_id: sessionId,
    });
  }

  function revealCoupon(courseId: string, code: string) {
    if (!code) return;
    setRevealedCoupons((prev) => ({ ...prev, [courseId]: true }));
    trackEvent("coupon_revealed", {
      course_id: courseId,
      session_id: sessionId,
    });
  }

  useEffect(() => {
    if (hasTrackedViewRef.current) return;
    if (selectedCourses.length < 2) return;

    trackEvent("comparison_viewed", {
      selected_count: selectedCourses.length,
      session_id: sessionId,
    });
    hasTrackedViewRef.current = true;
  }, [selectedCourses.length, sessionId]);

  const lastVerified = useMemo(() => {
    const months = selectedCourses.map((c) => c.lastUpdated).filter(Boolean) as string[];
    if (months.length === 0) return null;
    return months.sort().at(-1) ?? null;
  }, [selectedCourses]);

  const tableRows = useMemo(() => {
    const groups: TableGroup[] = [
      {
        group: "Overview",
        rows: [
          {
            label: "Platform",
            type: "text" as const,
            getValue: (c: Course) => platformById.get(c.platformId)?.name ?? c.platformId,
          },
          { label: "Course Title", type: "text" as const, getValue: (c: Course) => c.title },
          {
            label: "Instructor(s)",
            type: "text" as const,
            getValue: (c: Course) => (c.instructors ?? []).map((i) => `${i.name}${i.credential ? ` (${i.credential})` : ""}`).join(", ") || "—",
          },
          {
            label: "Rating",
            type: "number_max" as const,
            getValue: (c: Course) => safeNumber(c.rating),
            format: (v: number | null, course: Course) => (v === null ? "—" : `${v.toFixed(1)} (${course.reviewCount ?? 0})`),
          },
          {
            label: "Students",
            type: "number_max" as const,
            getValue: (c: Course) => safeNumber(c.studentCount ?? null),
            format: (v: number | null) => (v === null ? "—" : new Intl.NumberFormat().format(v)),
          },
          { label: "Last Updated", type: "text" as const, getValue: (c: Course) => c.lastUpdated ?? "—" },
          { label: "Language", type: "text" as const, getValue: (c: Course) => c.language ?? "—" },
          {
            label: "Subtitles",
            type: "text" as const,
            getValue: (c: Course) => (c.subtitles && c.subtitles.length ? c.subtitles.join(", ") : "—"),
          },
        ],
      },
      {
        group: "Pricing",
        rows: [
          {
            label: "Current Price",
            type: "currency_min" as const,
            getValue: (c: Course) => safeNumber(c.pricing.currentPrice),
            format: (v: number | null, c: Course) => formatCurrency(v, c.pricing.currency),
          },
          {
            label: "Original Price",
            type: "currency" as const,
            getValue: (c: Course) => safeNumber(c.pricing.originalPrice ?? null),
            format: (v: number | null, c: Course) => (v === null ? "—" : formatCurrency(v, c.pricing.currency)),
          },
          {
            label: "Coupon",
            type: "coupon" as const,
            getValue: (c: Course) => c.skillPerksData.activeCouponCode ?? "",
          },
          { label: "Access Model", type: "text" as const, getValue: (c: Course) => c.pricing.accessModel },
          {
            label: "Subscription Tier",
            type: "text" as const,
            getValue: (c: Course) => c.pricing.subscriptionTierRequired ?? "—",
          },
          { label: "Lifetime Access", type: "bool_true" as const, getValue: (c: Course) => c.pricing.lifetimeAccess ?? null },
          { label: "Free Trial", type: "bool_true" as const, getValue: (c: Course) => c.pricing.freeTrial ?? null },
          { label: "Money-back Guarantee", type: "bool_true" as const, getValue: (c: Course) => c.pricing.moneyBackGuarantee ?? null },
          {
            label: "Price per learning hour",
            type: "number_min" as const,
            getValue: (c: Course) => safeNumber(c.pricing.pricePerHour ?? null),
            format: (v: number | null, c: Course) => (v === null ? "—" : `${formatCurrency(v, c.pricing.currency)}/hr`),
          },
        ],
      },
      {
        group: "Content",
        rows: [
          {
            label: "Total Duration",
            type: "number_max" as const,
            getValue: (c: Course) => safeNumber(c.content.totalDurationHours),
            format: (v: number | null) => (v === null ? "—" : `${v} hrs`),
          },
          {
            label: "Modules",
            type: "number_max" as const,
            getValue: (c: Course) => safeNumber(c.content.moduleCount ?? null),
          },
          {
            label: "Lessons",
            type: "number_max" as const,
            getValue: (c: Course) => safeNumber(c.content.lessonCount ?? null),
          },
          { label: "Skill Level", type: "text" as const, getValue: (c: Course) => c.content.skillLevel },
          {
            label: "Prerequisites",
            type: "text" as const,
            getValue: (c: Course) => (c.content.prerequisites && c.content.prerequisites.length ? c.content.prerequisites.join(" · ") : "—"),
          },
          {
            label: "Topics",
            type: "text" as const,
            getValue: (c: Course) => (c.content.topicsTags && c.content.topicsTags.length ? c.content.topicsTags.join(", ") : "—"),
          },
          {
            label: "Projects",
            type: "number_max" as const,
            getValue: (c: Course) => safeNumber(c.content.projectCount ?? null),
          },
          {
            label: "Coding Exercises",
            type: "number_max" as const,
            getValue: (c: Course) => safeNumber(c.content.codingExerciseCount ?? null),
          },
          { label: "Quizzes", type: "bool_true" as const, getValue: (c: Course) => c.content.hasQuizzes ?? null },
          { label: "Case Studies", type: "bool_true" as const, getValue: (c: Course) => c.content.hasCaseStudies ?? null },
          {
            label: "Downloadable Resources",
            type: "bool_true" as const,
            getValue: (c: Course) => c.content.hasDownloadableResources ?? null,
          },
        ],
      },
      {
        group: "Format",
        rows: [
          { label: "Primary Format", type: "text" as const, getValue: (c: Course) => c.format.primaryFormat },
          { label: "Playback Speed", type: "bool_true" as const, getValue: (c: Course) => c.format.hasPlaybackSpeedControl ?? null },
          { label: "Offline Access", type: "bool_true" as const, getValue: (c: Course) => c.format.hasOfflineAccess ?? null },
          {
            label: "Mobile Apps",
            type: "text" as const,
            getValue: (c: Course) => (c.format.mobileSupport && c.format.mobileSupport.length ? c.format.mobileSupport.join(", ") : "—"),
          },
          { label: "Live Sessions", type: "bool_true" as const, getValue: (c: Course) => c.format.hasLiveSessions ?? null },
          { label: "Code Sandbox", type: "bool_true" as const, getValue: (c: Course) => c.format.hasCodeSandbox ?? null },
          { label: "Discussion Forum", type: "bool_true" as const, getValue: (c: Course) => c.format.hasDiscussionForum ?? null },
          {
            label: "AI Features",
            type: "text" as const,
            getValue: (c: Course) => (c.format.aiFeatures && c.format.aiFeatures.length ? c.format.aiFeatures.join(", ") : "—"),
          },
        ],
      },
      {
        group: "Certification",
        rows: [
          { label: "Certificate", type: "bool_true" as const, getValue: (c: Course) => c.certification?.hasCertificate ?? null },
          {
            label: "Certificate Type",
            type: "text" as const,
            getValue: (c: Course) => c.certification?.certificateType ?? "—",
          },
          {
            label: "Industry Recognition",
            type: "text" as const,
            getValue: (c: Course) => c.certification?.industryRecognition ?? "—",
          },
          { label: "LinkedIn Integration", type: "bool_true" as const, getValue: (c: Course) => c.certification?.linkedInIntegration ?? null },
          { label: "Portfolio Project", type: "bool_true" as const, getValue: (c: Course) => c.certification?.hasPortfolioProject ?? null },
          { label: "Mentorship", type: "bool_true" as const, getValue: (c: Course) => c.certification?.hasMentorship ?? null },
          { label: "Job Placement Support", type: "bool_true" as const, getValue: (c: Course) => c.certification?.hasJobPlacementSupport ?? null },
        ],
      },
      {
        group: "Community",
        rows: [
          {
            label: "Community Platforms",
            type: "text" as const,
            getValue: (c: Course) => (c.community?.communityPlatform && c.community.communityPlatform.length ? c.community.communityPlatform.join(", ") : "—"),
          },
          { label: "Instructor Q&A", type: "bool_true" as const, getValue: (c: Course) => c.community?.hasInstructorQA ?? null },
          {
            label: "Response Time",
            type: "text" as const,
            getValue: (c: Course) => c.community?.instructorResponseTime ?? "—",
          },
          { label: "Peer Review", type: "bool_true" as const, getValue: (c: Course) => c.community?.hasPeerReview ?? null },
          {
            label: "Support Types",
            type: "text" as const,
            getValue: (c: Course) => (c.community?.supportTypes && c.community.supportTypes.length ? c.community.supportTypes.join(", ") : "—"),
          },
        ],
      },
      {
        group: "SkillPerks",
        rows: [
          {
            label: "SkillPerks Rating",
            type: "number_max" as const,
            getValue: (c: Course) => safeNumber(c.skillPerksData.editorialRating ?? null),
            format: (v: number | null) => (v === null ? "—" : v.toFixed(1)),
          },
          {
            label: "Value Score",
            type: "number_max" as const,
            getValue: (c: Course) => safeNumber(c.skillPerksData.valueScore ?? null),
          },
          {
            label: "Editor's Pick",
            type: "bool_true" as const,
            getValue: (c: Course) => c.skillPerksData.isEditorsPick ?? null,
          },
        ],
      },
    ];

    return groups;
  }, [platformById]);

  const visibleGroups = useMemo(() => {
    if (activeGroup === "All") return tableRows;
    return tableRows.filter((g) => g.group === activeGroup);
  }, [activeGroup, tableRows]);

  function toggleGroupCollapsed(group: string) {
    setCollapsedGroups((prev) => ({ ...prev, [group]: !prev[group] }));
  }

  function winnerIndex(values: Array<number | null>, mode: "min" | "max") {
    const nums = values.map((v) => (typeof v === "number" ? v : null));
    const filtered = nums.filter((v) => v !== null) as number[];
    if (filtered.length <= 1) return null;
    const target = mode === "min" ? Math.min(...filtered) : Math.max(...filtered);
    const idx = nums.findIndex((v) => v === target);
    return idx >= 0 ? idx : null;
  }

  return (
    <div className="container px-4 py-10 md:px-6 md:py-16 mx-auto">
      <div className="space-y-10">
        <div className="space-y-3">
          <Badge className="w-fit">Tool</Badge>
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">Course Comparator</h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Pick up to 5 courses and compare pricing, format, and SkillPerks insights.
          </p>
        </div>

        <Card className="grid gap-4">
          <CardHeader className="space-y-2">
            <CardTitle>Find courses</CardTitle>
            <div className="text-sm text-muted-foreground">Search and filter. Click a course to add it to your comparison.</div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div className="text-sm text-muted-foreground">
                Showing <span className="font-medium text-foreground">{filteredCourses.length}</span> of {courses.length} courses
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-12 lg:items-end">
              <div className="space-y-2 lg:col-span-4">
                <Label htmlFor="cc-search">Search</Label>
                <Input id="cc-search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="e.g. system design, python" />
              </div>

              <div className="space-y-2 lg:col-span-2">
                <Label>Platform</Label>
                <Select value={filters.platformId} onValueChange={(v) => setFilters((f) => ({ ...f, platformId: v }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="All" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All platforms</SelectItem>
                    {platforms.map((p) => (
                      <SelectItem key={p.id} value={p.id}>
                        {p.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2 lg:col-span-3">
                <Label>Category</Label>
                <Select value={filters.category} onValueChange={(v) => setFilters((f) => ({ ...f, category: v }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="All" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All categories</SelectItem>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2 lg:col-span-1">
                <Label>Level</Label>
                <Select value={filters.level} onValueChange={(v) => setFilters((f) => ({ ...f, level: v as Filters["level"] }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Any" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any</SelectItem>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2 lg:col-span-2">
                <Label>Format</Label>
                <Select value={filters.format} onValueChange={(v) => setFilters((f) => ({ ...f, format: v as Filters["format"] }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Any" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any</SelectItem>
                    <SelectItem value="text">Text</SelectItem>
                    <SelectItem value="video">Video</SelectItem>
                    <SelectItem value="interactive">Interactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2 lg:col-span-3">
                <Label>Sort selected</Label>
                <Select value={sortKey} onValueChange={(v) => setSortKey(v as SortKey)}>
                  <SelectTrigger>
                    <SelectValue placeholder="None" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    <SelectItem value="rating">Rating (high → low)</SelectItem>
                    <SelectItem value="price_asc">Price (low → high)</SelectItem>
                    <SelectItem value="price_desc">Price (high → low)</SelectItem>
                    <SelectItem value="value">Value Score (high → low)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="sm:col-span-2 lg:col-span-12 lg:flex lg:justify-end">
                <Button variant="outline" size="sm" onClick={resetFilters}>
                  Reset filters
                </Button>
              </div>
            </div>

            <Separator />

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {filteredCourses.map((c) => {
                const platform = platformById.get(c.platformId);
                const isSelected = selectedIds.includes(c.id);

                return (
                  <Card
                    key={c.id}
                    className={`cursor-pointer transition-colors ${isSelected ? "border-primary" : "hover:border-primary/40"}`}
                    onClick={() => toggleSelected(c.id)}
                    role="button"
                    tabIndex={0}
                  >
                    <CardHeader className="space-y-1">
                      <div className="flex items-start justify-between gap-3">
                        <CardTitle className="text-base leading-snug">{c.title}</CardTitle>
                        <div className="flex items-center gap-2 pt-1 shrink-0">
                          <div
                            className="flex items-center gap-2"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              toggleSelected(c.id);
                            }}
                            role="button"
                            tabIndex={0}
                            aria-label={isSelected ? "Remove from compare" : "Add to compare"}
                          >
                            <Checkbox checked={isSelected} className="size-5 border-2" />
                            <span className="text-xs font-medium text-muted-foreground whitespace-nowrap">
                              {isSelected ? "Added" : "Add"}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground">{platform?.name ?? c.platformId}</div>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary">{c.content.skillLevel}</Badge>
                        <Badge variant="secondary">{c.format.primaryFormat}</Badge>
                        {(c.categories ?? []).slice(0, 2).map((cat) => (
                          <Badge key={cat} variant="outline">
                            {cat}
                          </Badge>
                        ))}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {formatCurrency(c.pricing.currentPrice, c.pricing.currency)}
                      </div>
                      {c.skillPerksData.activeCouponCode ? (
                        <div className="pt-1">
                          <CouponReveal
                            code={c.skillPerksData.activeCouponCode}
                            revealed={Boolean(revealedCoupons[c.id])}
                            onReveal={() => revealCoupon(c.id, c.skillPerksData.activeCouponCode ?? "")}
                            onCopy={() => copyCoupon(c.skillPerksData.activeCouponCode ?? "")}
                          />
                        </div>
                      ) : null}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="space-y-2">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <CardTitle>Your comparison ({selectedCourses.length}/5)</CardTitle>
              <div className="flex flex-wrap gap-2">
                <Button onClick={onCompare} disabled={selectedCourses.length < 2}>
                  Compare
                </Button>
                <Button variant="outline" onClick={copyShareUrl} disabled={selectedCourses.length === 0}>
                  Copy Share URL
                </Button>
                <Button variant="outline" onClick={clearAll} disabled={selectedCourses.length === 0}>
                  Clear
                </Button>
              </div>
            </div>
            <div className="text-sm text-muted-foreground">
              {selectedCourses.length < 2
                ? "Select at least 2 courses, then click Compare to see the table. Tip: if you only see one course, click Reset filters (or set Platform to All platforms)."
                : showComparison
                  ? "Scroll horizontally if needed. Best values are highlighted."
                  : "Ready—click Compare to generate your table."}
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            <div ref={comparisonRef} />
            {lastVerified ? <div className="text-sm text-muted-foreground">Prices and features last verified: {lastVerified}</div> : null}

            {selectedCourses.length === 0 ? (
              <div className="text-sm text-muted-foreground">No courses selected yet.</div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {selectedCourses.map((c) => (
                  <Badge key={c.id} variant="secondary" className="flex items-center gap-2">
                    <span>{c.title}</span>
                    <button
                      type="button"
                      className="text-muted-foreground hover:text-foreground"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        removeSelected(c.id);
                      }}
                      aria-label={`Remove ${c.title}`}
                    >
                      ×
                    </button>
                  </Badge>
                ))}
              </div>
            )}

            {showComparison && selectedCourses.length >= 2 ? (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <Button
                    size="sm"
                    variant={activeGroup === "All" ? "default" : "outline"}
                    onClick={() => {
                      setActiveGroup("All");
                      trackEvent("comparison_row_filtered", { group: "All", session_id: sessionId });
                    }}
                  >
                    All
                  </Button>
                  {tableRows.map((g) => (
                    <Button
                      key={g.group}
                      size="sm"
                      variant={activeGroup === g.group ? "default" : "outline"}
                      onClick={() => {
                        setActiveGroup(g.group);
                        trackEvent("comparison_row_filtered", { group: g.group, session_id: sessionId });
                      }}
                    >
                      {g.group}
                    </Button>
                  ))}
                </div>

                <div className="md:hidden space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {selectedCourses.map((c) => (
                      <Button
                        key={c.id}
                        size="sm"
                        variant={effectiveMobileActiveId === c.id ? "default" : "outline"}
                        onClick={() => setMobileActiveId(c.id)}
                      >
                        {platformById.get(c.platformId)?.name ?? c.platformId}
                      </Button>
                    ))}
                  </div>

                  {(() => {
                    const course = selectedCourses.find((c) => c.id === effectiveMobileActiveId) ?? selectedCourses[0];
                    if (!course) return null;
                    return (
                      <Card>
                        <CardHeader className="space-y-2">
                          <CardTitle className="text-base">{course.title}</CardTitle>
                          <div className="flex flex-wrap gap-2">
                            <Button asChild size="sm">
                              <a
                                href={buildAffiliateUrl(course, sessionId)}
                                target="_blank"
                                rel="noreferrer"
                                onClick={() =>
                                  trackEvent("comparison_cta_click", {
                                    course_id: course.id,
                                    platform_id: course.platformId,
                                    session_id: sessionId,
                                  })
                                }
                              >
                                View Deal
                              </a>
                            </Button>
                            <Button asChild size="sm" variant="outline">
                              <a href={`/reviews/${platformById.get(course.platformId)?.slug ?? course.platformId}`}>Review</a>
                            </Button>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          {visibleGroups.map((group) => (
                            <div key={group.group} className="space-y-2">
                              <div className="flex items-center justify-between">
                                <div className="font-semibold">{group.group}</div>
                                <Button size="sm" variant="ghost" onClick={() => toggleGroupCollapsed(group.group)}>
                                  {collapsedGroups[group.group] ? "Expand" : "Collapse"}
                                </Button>
                              </div>
                              {collapsedGroups[group.group]
                                ? null
                                : group.rows.map((row) => {
                                    const raw = row.getValue(course);
                                    let rendered: string = "—";
                                    if (row.type === "coupon") {
                                      const code = typeof raw === "string" ? raw : "";
                                      rendered = code ? code : "—";
                                    } else if (typeof raw === "string") {
                                      rendered = raw || "—";
                                    } else if (typeof raw === "number") {
                                      rendered = row.format ? row.format(raw, course) : String(raw);
                                    } else if (typeof raw === "boolean") {
                                      rendered = boolLabel(raw);
                                    } else if (raw === null || raw === undefined) {
                                      rendered = "—";
                                    } else {
                                      rendered = String(raw);
                                    }

                                    return (
                                      <div key={row.label} className="flex items-start justify-between gap-4 border rounded-md p-3">
                                        <div className="text-sm text-muted-foreground">{row.label}</div>
                                        <div className="text-sm font-medium text-right">
                                          {rendered}
                                          {row.type === "coupon" && typeof raw === "string" && raw ? (
                                            <div className="pt-2">
                                              <Button size="sm" variant="outline" onClick={() => copyCoupon(raw)}>
                                                Copy
                                              </Button>
                                            </div>
                                          ) : null}
                                        </div>
                                      </div>
                                    );
                                  })}
                            </div>
                          ))}
                        </CardContent>
                      </Card>
                    );
                  })()}
                </div>

                <div className="hidden md:block overflow-x-auto border rounded-lg">
                  <table className="w-full min-w-[720px] text-sm">
                    <thead className="sticky top-0 bg-background">
                      <tr>
                        <th className="text-left p-3 w-[220px] border-b">Attribute</th>
                        {selectedCourses.map((c) => (
                          <th key={c.id} className="text-left p-3 border-b align-top">
                            <div className="space-y-2">
                              <div className="font-semibold leading-snug">{c.title}</div>
                              <div className="flex flex-wrap gap-2">
                                <Button asChild size="sm">
                                  <a
                                    href={buildAffiliateUrl(c, sessionId)}
                                    target="_blank"
                                    rel="noreferrer"
                                    onClick={() =>
                                      trackEvent("comparison_cta_click", {
                                        course_id: c.id,
                                        platform_id: c.platformId,
                                        session_id: sessionId,
                                      })
                                    }
                                  >
                                    View Deal
                                  </a>
                                </Button>
                                <Button asChild size="sm" variant="outline">
                                  <a href={`/reviews/${platformById.get(c.platformId)?.slug ?? c.platformId}`}>Review</a>
                                </Button>
                              </div>
                            </div>
                          </th>
                        ))}
                      </tr>
                    </thead>

                    <tbody>
                      {visibleGroups.map((group) => (
                        <Fragment key={group.group}>
                          <tr className="bg-muted/30">
                            <td className="p-3 border-b" colSpan={1 + selectedCourses.length}>
                              <div className="flex items-center justify-between gap-3">
                                <span className="font-semibold">{group.group}</span>
                                <Button size="sm" variant="ghost" onClick={() => toggleGroupCollapsed(group.group)}>
                                  {collapsedGroups[group.group] ? "Expand" : "Collapse"}
                                </Button>
                              </div>
                            </td>
                          </tr>

                          {collapsedGroups[group.group]
                            ? null
                            : group.rows.map((row) => {
                                const values = selectedCourses.map((course) => {
                                  const raw = row.getValue(course);
                                  if (typeof raw === "number") return raw;
                                  if (typeof raw === "boolean") return raw ? 1 : 0;
                                  return null;
                                });

                                const winIdx = row.type.endsWith("_min")
                                  ? winnerIndex(values, "min")
                                  : row.type.endsWith("_max") || row.type === "bool_true"
                                    ? winnerIndex(values, "max")
                                    : null;

                                return (
                                  <tr key={`${group.group}-${row.label}`}>
                                    <td className="p-3 font-medium border-b align-top">{row.label}</td>
                                    {selectedCourses.map((course, idx) => {
                                      const raw = row.getValue(course);
                                      const highlight = winIdx === idx;

                                      if (row.type === "coupon") {
                                        const code = typeof raw === "string" ? raw : "";
                                        return (
                                          <td key={course.id} className={`p-3 border-b align-top ${highlight ? "bg-emerald-500/10" : ""}`}>
                                            {code ? (
                                              <CouponReveal
                                                code={code}
                                                revealed={Boolean(revealedCoupons[course.id])}
                                                onReveal={() => revealCoupon(course.id, code)}
                                                onCopy={() => copyCoupon(code)}
                                              />
                                            ) : (
                                              <span>—</span>
                                            )}
                                          </td>
                                        );
                                      }

                                      let rendered: string = "—";
                                      if (typeof raw === "string") {
                                        rendered = raw || "—";
                                      } else if (typeof raw === "number") {
                                        rendered = row.format ? row.format(raw, course) : String(raw);
                                      } else if (typeof raw === "boolean") {
                                        rendered = boolLabel(raw);
                                      } else if (raw === null || raw === undefined) {
                                        rendered = "—";
                                      } else {
                                        rendered = String(raw);
                                      }

                                      return (
                                        <td key={course.id} className={`p-3 border-b align-top ${highlight ? "bg-emerald-500/10" : ""}`}>
                                          <div className="flex items-center justify-between gap-3">
                                            <span>{rendered}</span>
                                          </div>
                                        </td>
                                      );
                                    })}
                                  </tr>
                                );
                              })}
                        </Fragment>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : null}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
