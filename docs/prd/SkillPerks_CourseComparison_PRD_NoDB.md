# SkillPerks — Course Comparison Table Feature PRD
## Feature Addition to Enhanced PRD v2.0 | No-Database Edition

---

**Feature Name:** Interactive Course Comparison Table  
**Feature ID:** SP-FEAT-021  
**Document Version:** 2.0 (Revised — Static / No-DB Architecture)  
**Last Updated:** February 2026  
**Status:** Proposed  
**Parent Document:** SkillPerks Enhanced PRD v2.0  
**Architecture Constraint:** No database. All data is static JSON. All comparison logic runs client-side in the browser.

---

## 1. FEATURE OVERVIEW

### Problem Statement

Users visiting SkillPerks currently experience fragmented decision-making. They must navigate across multiple platform review pages, scroll through lengthy comparison articles, and mentally synthesize information to determine which course best fits their goals. This cognitive overhead increases drop-off rates and reduces affiliate conversion.

### Solution

An **Interactive Course Comparison Table** that allows users to hand-pick specific courses from across supported learning platforms and view a unified, side-by-side comparison table — covering pricing, content depth, format, certification, community, and more — in a single scrollable view.

All data is pre-authored as static JSON files. The comparison logic (filtering, sorting, highlighting) runs entirely in the browser. No server calls are made at comparison time. No database is involved at any stage.

### Feature Goal

Enable users to move from "I'm considering 3–5 courses" to "I've made my decision" without leaving SkillPerks — increasing session depth, trust, and affiliate click-through rates.

---

## 2. ARCHITECTURE PHILOSOPHY

### Why No Database?

Most course data on SkillPerks is **editorially curated and relatively static**:
- Prices change occasionally (weekly manual or scripted update)
- Course content/structure changes rarely (per platform release cycle)
- Platform features change infrequently

A database would add hosting cost, infrastructure complexity, and maintenance overhead that is not justified for this content type. Instead:

| Concern | Solution |
|---|---|
| Where does data live? | JSON files in the `/data/` folder of the Next.js repo |
| How is data updated? | Editors update JSON files and commit to Git; CI/CD deploys the change |
| How does the comparison work? | All logic runs in the browser using React state + imported JSON |
| How are comparisons shared? | Course IDs are encoded in the URL query string — no server storage |
| How are curated comparisons stored? | MDX files in `/content/comparisons/` |
| How fast is it? | Very fast — data is bundled at build time, no runtime API calls |

---

## 3. SCOPE & BOUNDARIES

### In Scope
- Course-level selection (not just platform-level)
- Dynamic comparison table with configurable attribute rows — all client-side
- Save and share comparison via URL query params
- Affiliate CTA integration per course column
- Mobile-responsive table design
- Category-based course browsing for selection
- Filter and sort within comparison table (client-side)
- Curated comparison pages (MDX-driven)

### Out of Scope (v1)
- Server-side comparison session storage
- User accounts or saved comparisons requiring login
- Real-time pricing sync (prices updated manually in JSON)
- AI-powered recommendations
- Video previews within table

---

## 4. FILE & FOLDER STRUCTURE

```
/
├── data/
│   ├── courses/
│   │   ├── educative.json           # All tracked Educative courses
│   │   ├── udemy.json
│   │   ├── datacamp.json
│   │   ├── bytebytego.json
│   │   ├── coursera.json
│   │   ├── pluralsight.json
│   │   ├── frontend-masters.json
│   │   ├── algoexpert.json
│   │   ├── leetcode.json
│   │   └── index.json               # Master flat list (all courses, all platforms)
│   │
│   ├── platforms/
│   │   └── index.json               # Platform metadata (name, logo, affiliate link, etc.)
│   │
│   └── comparisons/
│       └── curated-index.json       # List of all curated comparison slugs + metadata
│
├── content/
│   └── comparisons/
│       ├── system-design-top-3.mdx
│       ├── datacamp-vs-coursera-vs-udemy.mdx
│       └── ...                      # One MDX file per curated comparison
│
├── components/
│   └── course-comparator/
│       └── ...                      # (see Section 13)
│
└── app/
    └── tools/
        └── course-comparator/
            └── page.tsx             # Course Selector + Comparison Table page
    └── comparisons/
        └── [slug]/
            └── page.tsx             # Curated comparison page (MDX-driven)
```

---

## 5. DATA SCHEMA (STATIC JSON)

All schemas below represent the shape of JSON files in `/data/`. No ORM, no migrations, no database — just typed JSON.

### 5.1 Course JSON Schema

Each platform has its own JSON file (e.g., `/data/courses/educative.json`) containing an array of course objects.

```json
// Example: /data/courses/educative.json
[
  {
    "id": "educative-grokking-system-design",
    "slug": "grokking-the-system-design-interview",
    "platformId": "educative",
    "title": "Grokking the System Design Interview",
    "thumbnailUrl": "/images/courses/educative-grokking-system-design.jpg",
    "instructors": [
      { "name": "Design Gurus", "credential": "Industry Engineers" }
    ],
    "rating": 4.7,
    "reviewCount": 18200,
    "studentCount": 125000,
    "lastUpdated": "2025-11",
    "language": "English",
    "subtitles": ["English"],
    "categories": ["system-design", "interview-prep"],

    "pricing": {
      "currentPrice": 79,
      "originalPrice": 159,
      "currency": "USD",
      "accessModel": "subscription",
      "subscriptionTierRequired": "Educative Unlimited",
      "lifetimeAccess": false,
      "pricePerHour": 9.9
    },

    "content": {
      "totalDurationHours": 8,
      "moduleCount": 21,
      "lessonCount": 103,
      "skillLevel": "intermediate",
      "prerequisites": ["Basic programming knowledge", "Data structures basics"],
      "topicsTags": ["System Design", "Scalability", "Load Balancing", "Databases", "Caching"],
      "projectCount": 0,
      "codingExerciseCount": 15,
      "hasQuizzes": true,
      "hasCaseStudies": true,
      "hasDownloadableResources": false
    },

    "format": {
      "primaryFormat": "text",
      "videoQuality": null,
      "hasPlaybackSpeedControl": false,
      "hasOfflineAccess": false,
      "mobileSupport": ["ios", "android"],
      "hasLiveSessions": false,
      "aiFeatures": ["AI-powered code execution"],
      "hasCodeSandbox": true,
      "hasDiscussionForum": true
    },

    "certification": {
      "hasCertificate": true,
      "certificateType": "completion",
      "industryRecognition": "medium",
      "linkedInIntegration": true,
      "recognizedEmployers": ["Google", "Amazon", "Meta"],
      "hasPortfolioProject": false,
      "hasJobPlacementSupport": false,
      "hasMentorship": false
    },

    "community": {
      "communityPlatform": ["forum"],
      "hasInstructorQA": true,
      "instructorResponseTime": "24-48 hours",
      "hasPeerReview": false,
      "hasMentoring": false,
      "supportTypes": ["email", "community"]
    },

    "skillPerksData": {
      "editorialRating": 4.5,
      "bestForSegments": ["Mid-level engineers", "Interview prep"],
      "valueScore": 88,
      "popularityTrend": "rising",
      "isEditorsPick": true,
      "affiliateLink": "https://educative.io/?ref=skillperks",
      "activeCouponCode": "SKILLPERKS30"
    }
  }
]
```

### 5.2 Platform JSON Schema

```json
// /data/platforms/index.json
[
  {
    "id": "educative",
    "name": "Educative",
    "slug": "educative",
    "logoUrl": "/images/platforms/educative.svg",
    "websiteUrl": "https://educative.io",
    "affiliateBaseUrl": "https://educative.io/?ref=skillperks",
    "primaryColor": "#0070f3",
    "tagline": "Text-based interactive courses for developers"
  }
]
```

### 5.3 Master Index (All Courses)

At build time, a script (`/scripts/build-course-index.js`) merges all platform-specific JSON files into a single flat array at `/data/courses/index.json`. This is the file loaded by the Course Comparator page on the client.

```bash
# Run as part of Next.js build
node scripts/build-course-index.js
```

The master index contains all courses across all platforms in one array, enabling instant client-side search and filtering without any API call.

### 5.4 Curated Comparison MDX Frontmatter

```mdx
---
title: "Grokking vs ByteByteGo vs Educative: Best System Design Course (2026)"
slug: "system-design-top-3"
metaDescription: "Compare the top 3 system design courses side by side..."
targetKeyword: "system design course comparison 2026"
category: "system-design"
courseIds:
  - "educative-grokking-system-design"
  - "bytebytego-system-design-interview"
  - "udemy-system-design-interview-alex-xu"
verdicts:
  bestOverall: "educative-grokking-system-design"
  bestForBeginners: "udemy-system-design-interview-alex-xu"
  bestValue: "bytebytego-system-design-interview"
  bestCertification: "educative-grokking-system-design"
publishDate: "2026-02-01"
lastUpdated: "2026-02-15"
author: "SkillPerks Editorial Team"
relatedSlugs:
  - "interview-prep-top-4"
  - "datacamp-vs-coursera-data-science"
---

## Why We Compared These Three

System design interviews are the biggest hurdle for mid-level engineers aiming for senior roles...

[rest of editorial content as MDX]
```

---

## 6. CLIENT-SIDE DATA LOADING

All comparison logic is 100% client-side. Here is how data flows from JSON files to the browser:

### 6.1 Next.js Page — Static Props

```typescript
// app/tools/course-comparator/page.tsx

import coursesData from '@/data/courses/index.json';
import platformsData from '@/data/platforms/index.json';

// Data is imported directly — bundled at build time.
// No fetch(), no API routes, no database calls.

export default function CourseComparatorPage() {
  return (
    <CourseComparatorProvider
      courses={coursesData}
      platforms={platformsData}
    >
      <CourseSelector />
      <ComparisonTable />
    </CourseComparatorProvider>
  );
}
```

### 6.2 Curated Comparison — Static Generation

```typescript
// app/comparisons/[slug]/page.tsx

import { getAllComparisonSlugs, getComparisonBySlug } from '@/lib/comparisons';
import coursesData from '@/data/courses/index.json';

export async function generateStaticParams() {
  return getAllComparisonSlugs().map(slug => ({ slug }));
}

export default async function CuratedComparisonPage({ params }) {
  const comparison = await getComparisonBySlug(params.slug);
  const courses = coursesData.filter(c => comparison.courseIds.includes(c.id));

  return <CuratedComparisonPage comparison={comparison} courses={courses} />;
}
```

All curated comparison pages are **statically generated at build time** — no server required at runtime.

### 6.3 Client-Side State — Context

```typescript
// context/ComparisonContext.tsx

interface ComparisonContextValue {
  allCourses: Course[];                    // Full JSON, loaded once
  filteredCourses: Course[];               // After search/filter
  selectedCourseIds: string[];             // Max 5
  searchQuery: string;
  activeFilters: FilterState;
  actions: {
    addCourse: (id: string) => void;
    removeCourse: (id: string) => void;
    clearAll: () => void;
    setFilter: (key: string, value: any) => void;
    setSearchQuery: (q: string) => void;
  };
}

// No API calls. All filtering is pure JS array operations on the JSON data.
```

---

## 7. USER FLOW

```
[Entry Point]
     │
     ▼
[Course Selector — /tools/course-comparator/]
  - All courses loaded from index.json into memory (one-time, at page load)
  - Search filters courses array client-side (no API)
  - Category / Platform / Level / Format / Price filters (client-side)
  - Course cards with "Add to Compare" toggle
  - Selected courses shown in sticky bottom tray (1–5 max)
     │
     ▼ (2+ courses selected)
[Comparison Table renders below / on same page]
  - Reads selected course objects from memory (already loaded)
  - Renders 7 attribute groups
  - Best-value column highlighted per row
  - Affiliate CTA at top of each column
  - Active coupon code shown if present in JSON
     │
     ├──► [Share] → URL encodes course IDs as query params → shareable link
     │
     ├──► [Click Affiliate CTA] → Opens affiliate link (from JSON) in new tab
     │
     └──► [Modify] → Add/remove courses, table re-renders instantly
```

---

## 8. URL ARCHITECTURE & STATE

### URL Structure

All comparison state lives in the URL — no server, no session storage needed.

**Course Selector (empty):**
`/tools/course-comparator/`

**Active Comparison (shareable):**
`/tools/course-comparator/?c=educative-grokking-system-design,bytebytego-system-design-interview,udemy-system-design-alex-xu`

**With active filters:**
`/tools/course-comparator/?c=course-a,course-b&cat=system-design&level=intermediate`

**Curated Comparison:**
`/comparisons/system-design-top-3/`

### State Sync Logic

```typescript
// On page load: read URL params → populate selected courses from JSON
// On course add/remove: update URL params → no page reload (Next.js router.replace)
// On share: copy current URL to clipboard

const syncStateToUrl = (selectedIds: string[]) => {
  const params = new URLSearchParams();
  params.set('c', selectedIds.join(','));
  router.replace(`?${params.toString()}`, { scroll: false });
};
```

This means the share button simply copies `window.location.href` — no server-side short URL required.

---

## 9. COMPARISON TABLE — ATTRIBUTE GROUPS

The table has a **fixed first column** (attribute labels) and **horizontally scrollable course columns**. On mobile, it switches to a **card-per-course stacked layout**.

### GROUP 1: OVERVIEW
| Attribute | Source in JSON |
|---|---|
| Platform | `platformId` → lookup in platforms/index.json |
| Course Title | `title` |
| Instructor(s) | `instructors[].name + credential` |
| Overall Rating | `rating` + `reviewCount` |
| Total Students | `studentCount` |
| Last Updated | `lastUpdated` |
| Language | `language` |
| Subtitles Available | `subtitles` |

### GROUP 2: PRICING & ACCESS
| Attribute | Source in JSON |
|---|---|
| Current Price | `pricing.currentPrice` |
| Original Price | `pricing.originalPrice` (shown as strikethrough) |
| Active Coupon | `skillPerksData.activeCouponCode` |
| Access Model | `pricing.accessModel` |
| Subscription Required | `pricing.subscriptionTierRequired` |
| Free Trial | `pricing.freeTrial` |
| Money-Back Guarantee | `pricing.moneyBackGuarantee` |
| Price Per Learning Hour | `pricing.pricePerHour` (pre-calculated in JSON) |
| Lifetime Access | `pricing.lifetimeAccess` |

### GROUP 3: COURSE CONTENT
| Attribute | Source in JSON |
|---|---|
| Total Duration | `content.totalDurationHours` |
| Modules | `content.moduleCount` |
| Lessons | `content.lessonCount` |
| Skill Level | `content.skillLevel` |
| Prerequisites | `content.prerequisites` |
| Topics Covered | `content.topicsTags` |
| Projects Included | `content.projectCount` |
| Coding Exercises | `content.codingExerciseCount` |
| Quizzes | `content.hasQuizzes` |
| Case Studies | `content.hasCaseStudies` |
| Downloadable Resources | `content.hasDownloadableResources` |

### GROUP 4: LEARNING FORMAT
| Attribute | Source in JSON |
|---|---|
| Primary Format | `format.primaryFormat` |
| Video Quality | `format.videoQuality` |
| Playback Speed | `format.hasPlaybackSpeedControl` |
| Offline Access | `format.hasOfflineAccess` |
| Mobile App | `format.mobileSupport` |
| Live Sessions | `format.hasLiveSessions` |
| AI Features | `format.aiFeatures` |
| Code Sandbox | `format.hasCodeSandbox` |
| Discussion Forum | `format.hasDiscussionForum` |

### GROUP 5: CERTIFICATION & CAREER VALUE
| Attribute | Source in JSON |
|---|---|
| Certificate | `certification.hasCertificate` |
| Certificate Type | `certification.certificateType` |
| Industry Recognition | `certification.industryRecognition` |
| LinkedIn Integration | `certification.linkedInIntegration` |
| Portfolio Project | `certification.hasPortfolioProject` |
| Job Placement Support | `certification.hasJobPlacementSupport` |
| Mentorship | `certification.hasMentorship` |

### GROUP 6: COMMUNITY & SUPPORT
| Attribute | Source in JSON |
|---|---|
| Community Platform | `community.communityPlatform` |
| Instructor Q&A | `community.hasInstructorQA` |
| Response Time | `community.instructorResponseTime` |
| Peer Review | `community.hasPeerReview` |
| Support Types | `community.supportTypes` |

### GROUP 7: SKILLPERKS INSIGHTS *(editorial)*
| Attribute | Source in JSON |
|---|---|
| SkillPerks Rating | `skillPerksData.editorialRating` |
| Best For | `skillPerksData.bestForSegments` |
| Value Score | `skillPerksData.valueScore` |
| Popularity Trend | `skillPerksData.popularityTrend` |
| Editor's Pick | `skillPerksData.isEditorsPick` |

---

## 10. TABLE INTERACTION FEATURES

**Best Value Highlight**
For numeric/boolean rows, the "winning" cell gets a subtle green background. Win logic is defined per attribute (e.g., lowest price wins, highest rating wins, `true` beats `false`). Win logic is a simple mapping object in the codebase — no server logic.

**Sticky Column Headers**
Course column headers (thumbnail, title, CTA) remain visible as users scroll down.

**Row Filter Chips**
Chips above the table: Overview · Pricing · Content · Format · Certification · Community · SkillPerks. Clicking a chip hides all other groups (client-side toggle, no reload).

**Sort Columns**
Sort by: Rating (desc), Price (asc/desc), Duration (asc/desc), Value Score (desc). Sorting reorders the course columns in React state — no API call.

**Collapsible Groups**
Each attribute group has a collapse toggle. State stored in `localStorage` so preference persists across page reloads.

**Mobile Layout**
Below 768px: switches from horizontal scroll table to vertical card view per course. A top tab bar lets users switch between selected courses. All attribute groups remain collapsible.

**Coupon Copy Button**
If `skillPerksData.activeCouponCode` is present, a copy button appears in the Pricing row. Copies code to clipboard using the browser Clipboard API.

---

## 11. DATA MAINTENANCE WORKFLOW

Since there is no database, the editorial/data team manages course data via JSON files in the repository.

### Update Workflow

```
1. Editor opens /data/courses/[platform].json in GitHub or a local editor
2. Updates the relevant field (e.g., price, coupon code, lastUpdated)
3. Commits to main branch (or via PR for review)
4. GitHub Actions CI runs:
   a. node scripts/build-course-index.js  → rebuilds index.json
   b. Vercel deployment triggered
   c. New static build deployed (all pages rebuilt)
5. Change is live within ~2 minutes of merge
```

### Maintenance Schedule

| Data Type | Update Frequency | Owner |
|---|---|---|
| Course prices | Weekly | Data Editor |
| Coupon codes | As received / as expired | Coupon Editor |
| Course ratings + student counts | Monthly | Data Editor |
| New courses added | Per platform release | Content Editor |
| SkillPerks editorial scores | Quarterly | Editorial Lead |
| Platform metadata | On platform changes | Tech Lead |

### Data Validation

A lightweight validation script (`/scripts/validate-courses.js`) runs in CI to catch malformed JSON before deployment:
- Required fields present
- `pricePerHour` matches `currentPrice / totalDurationHours`
- Enum fields use valid values (e.g., `skillLevel` must be one of the defined options)
- Affiliate links are not broken (HTTP check)

---

## 12. CURATED COMPARISONS (MDX)

Curated comparisons are authored as MDX files in `/content/comparisons/`. They use the same `ComparisonTable` React component, fed with course data resolved from the `courseIds` in the MDX frontmatter.

### Editorial Authoring Process

```
1. Editor creates /content/comparisons/[slug].mdx
2. Fills in frontmatter (courseIds, verdicts, metadata)
3. Writes introductory editorial content in MDX body
4. Commits to repo → Vercel builds the static page
5. Page lives at /comparisons/[slug]/
```

No CMS login required. The repo is the source of truth.

### Initial Curated Comparisons (Launch Set)

| File | URL | Target Query |
|---|---|---|
| `system-design-top-3.mdx` | `/comparisons/system-design-top-3/` | system design course comparison |
| `datacamp-vs-coursera-vs-udemy.mdx` | `/comparisons/data-science-top-3/` | best data science courses 2026 |
| `interview-prep-top-4.mdx` | `/comparisons/interview-prep-top-4/` | coding interview prep comparison |
| `aws-vs-gcp-vs-azure-courses.mdx` | `/comparisons/cloud-cert-courses/` | cloud certification course comparison |
| `web-dev-top-3.mdx` | `/comparisons/web-dev-top-3/` | web development course comparison |

---

## 13. COMPONENT ARCHITECTURE

```
/components/course-comparator/
  │
  ├── CourseComparatorProvider.tsx     # Context + state management, loads JSON once
  ├── CourseSelector.tsx               # Step 1: browsing + selecting courses
  │     ├── CourseSearchBar.tsx        # Client-side search (filters allCourses array)
  │     ├── CourseFilterPanel.tsx      # Sidebar filters (all client-side)
  │     ├── CourseGrid.tsx             # Renders filtered course cards
  │     └── CourseCard.tsx             # Individual selectable card
  │
  ├── ComparisonTray.tsx               # Sticky bottom bar showing selections
  │
  ├── ComparisonTable.tsx              # Main table component
  │     ├── ComparisonTableHeader.tsx  # Sticky course column headers + CTAs
  │     ├── AttributeGroupSection.tsx  # Collapsible group wrapper
  │     ├── AttributeRow.tsx           # Single attribute row across all columns
  │     ├── AttributeValueCell.tsx     # Renders value by type (badge/star/bool/text)
  │     ├── BestValueMarker.tsx        # Highlights winning cell
  │     └── CouponCopyButton.tsx       # Copies coupon code to clipboard
  │
  ├── ComparisonRowFilter.tsx          # Filter chips above table
  ├── ComparisonShareBar.tsx           # Copy URL / share actions
  │
  └── CuratedComparisonPage.tsx        # Wrapper for MDX-driven curated pages
        ├── ComparisonTable.tsx        # (reused)
        ├── ComparisonVerdict.tsx      # Best Overall / Best Value / Best Beginner
        └── RelatedComparisons.tsx     # Links to other curated comparisons
```

### Key Implementation Notes

- `CourseComparatorProvider` imports `index.json` once. All child components read from context — no prop drilling, no repeated data loading.
- `CourseSearchBar` uses a simple `Array.filter()` with debounced input — no search API, no Algolia needed for v1.
- `AttributeValueCell` is a single component that renders differently based on the attribute's declared `type` (`boolean`, `number`, `currency`, `stars`, `tags`, `text`, `enum`). The attribute type map is a static config object in `/lib/comparison-attributes.ts`.
- The entire comparison table re-renders on course add/remove via React state — instant, no loading states needed.

---

## 14. AFFILIATE TRACKING

All affiliate links come from the JSON (`skillPerksData.affiliateLink`). UTM parameters are appended client-side before opening the link.

### UTM Structure

```typescript
const buildAffiliateUrl = (course: Course, sessionId: string): string => {
  const url = new URL(course.skillPerksData.affiliateLink);
  url.searchParams.set('utm_source', 'skillperks');
  url.searchParams.set('utm_medium', 'comparison_table');
  url.searchParams.set('utm_campaign', course.categories[0]);
  url.searchParams.set('utm_content', course.id);
  url.searchParams.set('utm_term', sessionId);
  return url.toString();
};

// sessionId = comma-joined courseIds from URL params (stable, reproducible)
```

### Analytics Events (GA4 — Client-Side)

| Event | Trigger |
|---|---|
| `comparison_started` | "Compare Now" clicked with 2+ courses |
| `comparison_viewed` | Table renders |
| `comparison_cta_click` | "View Deal" clicked in column header |
| `comparison_shared` | Share URL copied |
| `comparison_course_added` | Course added to tray |
| `comparison_course_removed` | Course removed |
| `comparison_row_filtered` | Row filter chip applied |
| `coupon_copied` | Coupon copy button clicked |

All events fire via `gtag()` — no server-side event tracking required.

---

## 15. SEO

### Indexable Pages

User-built comparisons (with `?c=` query params) use `<meta name="robots" content="noindex">` — they are not crawled. Only curated MDX pages are indexed.

### Curated Page SEO Spec

Each curated comparison page includes:
- `<title>`: `[A] vs [B] vs [C]: Which Course Is Best? (2026)`
- `<meta description>`: 155-char summary with primary differentiator
- Schema markup: `ItemList` (courses), `FAQPage`, `BreadcrumbList`
- `lastUpdated` date visible on page — freshness signal for crawlers
- Canonical URL pointing to clean slug (not query param URL)
- Internal links: to platform review pages, coupon pages, related comparisons

### Freshness Notice

All comparison pages (curated and user-built) display:
> *"Prices and features last verified: [lastUpdated from JSON]"*

This is pulled from the most recent `lastUpdated` field across the compared courses — computed client-side.

---

## 16. PERFORMANCE

Since all data is static JSON bundled at build time:

- **No runtime API calls** — comparison page loads are just static assets
- **index.json size:** ~200–400KB for 500 courses (well within acceptable range; gzipped to ~50–80KB)
- **Table render time:** < 100ms (pure React state operation on in-memory data)
- **Search/filter response:** < 50ms (client-side array filter with debounce)
- **LCP target:** < 1.5s (static page, CDN-served)

For scale beyond 1,000+ courses, `index.json` can be split by category (loaded lazily) without any architectural change to the comparison logic.

---

## 17. ACCESSIBILITY

- Table uses semantic `<thead>`, `<tbody>`, `<th scope="col">`, `<th scope="row">` for screen readers
- Best-value highlight uses both color and a crown icon — color is never the sole indicator
- All icon buttons have `aria-label`
- Keyboard navigation: tab through course cards, tray, table CTAs
- Mobile touch targets minimum 44×44px
- WCAG 2.1 AA contrast on all text and UI elements

---

## 18. LAUNCH PLAN

### Phase 1 — Data & Foundation (Weeks 1–2)
- Author JSON files for top 10 platforms (~100 courses total)
- Run and validate `build-course-index.js` script
- Build `CourseComparatorProvider`, `CourseSelector`, `ComparisonTray`

### Phase 2 — Comparison Table (Weeks 3–4)
- Build `ComparisonTable` with all 7 attribute groups
- Implement URL state sync (share functionality)
- Internal data accuracy QA

### Phase 3 — Curated Comparisons (Weeks 5–6)
- Author 5 curated MDX comparison files
- Build `CuratedComparisonPage` with verdict section and FAQ
- SEO metadata and schema markup
- Submit to Google Search Console

### Phase 4 — Polish & Analytics (Weeks 7–8)
- GA4 event tracking QA
- Mobile layout testing
- Row filter chips and sort functionality
- A/B test CTA button copy

### Phase 5 — Scale (Month 3+)
- Expand to 50 platforms, 500+ courses
- Add 20+ curated comparisons
- Explore category-split JSON loading for performance
- Consider lightweight CMS (Sanity/Contentful) for non-technical editors if JSON editing becomes bottleneck — optional, not required

---

## 19. SUCCESS METRICS

| Metric | Target (90 Days Post-Launch) |
|---|---|
| Comparison sessions started | 500/month |
| Avg courses per comparison | 3.2 |
| Affiliate CTA CTR from table | > 18% |
| Curated pages organic traffic | 2,000 sessions/month |
| Comparison share rate | > 5% of sessions |
| Avg time on comparison table | > 3 minutes |
| Bounce rate on curated pages | < 45% |
| Revenue from comparison CTAs | $800+/month |
| Build time (CI/CD) | < 90 seconds |
| index.json size (gzipped) | < 100KB |

---

## 20. RISKS & MITIGATIONS

| Risk | Mitigation |
|---|---|
| JSON data becomes stale (prices change) | Weekly editor reminder + validation script catches obvious mismatches |
| index.json grows too large (1,000+ courses) | Split by category, lazy-load on filter selection |
| Non-technical editors struggle with JSON editing | Add a simple internal form UI (React + file write via API route) as optional admin tool in Phase 5 |
| Comparison URL becomes too long (many courses) | Encode course IDs as short numeric aliases in URL (e.g., `?c=42,17,8`) |
| Mobile table UX confusion | Dedicated card view for mobile — no horizontal table scroll on small screens |
| Affiliate link rot (URLs change) | Validation script checks affiliate links on every CI build |

---

*Feature PRD Version: 2.0 — Static / No-DB Architecture*  
*Status: Proposed — Pending Engineering Review*  
*Last Updated: February 2026*  
*Prepared by: Product Team — SkillPerks*  
*Parent Document: SkillPerks Enhanced PRD v2.0*
