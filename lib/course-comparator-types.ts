export interface CourseInstructor {
  name: string;
  credential?: string | null;
}

export type SkillLevel = "beginner" | "intermediate" | "advanced";

export interface CoursePricing {
  currentPrice: number;
  originalPrice?: number | null;
  currency: string;
  accessModel: "subscription" | "lifetime" | "purchase";
  subscriptionTierRequired?: string | null;
  freeTrial?: boolean | null;
  moneyBackGuarantee?: boolean | null;
  lifetimeAccess?: boolean | null;
  pricePerHour?: number | null;
}

export interface CourseContent {
  totalDurationHours: number;
  moduleCount?: number | null;
  lessonCount?: number | null;
  skillLevel: SkillLevel;
  prerequisites?: string[] | null;
  topicsTags?: string[] | null;
  projectCount?: number | null;
  codingExerciseCount?: number | null;
  hasQuizzes?: boolean | null;
  hasCaseStudies?: boolean | null;
  hasDownloadableResources?: boolean | null;
}

export interface CourseFormat {
  primaryFormat: "text" | "video" | "interactive";
  videoQuality?: string | null;
  hasPlaybackSpeedControl?: boolean | null;
  hasOfflineAccess?: boolean | null;
  mobileSupport?: Array<"ios" | "android"> | null;
  hasLiveSessions?: boolean | null;
  aiFeatures?: string[] | null;
  hasCodeSandbox?: boolean | null;
  hasDiscussionForum?: boolean | null;
}

export interface CourseCertification {
  hasCertificate?: boolean | null;
  certificateType?: string | null;
  industryRecognition?: "low" | "medium" | "high" | null;
  linkedInIntegration?: boolean | null;
  recognizedEmployers?: string[] | null;
  hasPortfolioProject?: boolean | null;
  hasJobPlacementSupport?: boolean | null;
  hasMentorship?: boolean | null;
}

export interface CourseCommunity {
  communityPlatform?: string[] | null;
  hasInstructorQA?: boolean | null;
  instructorResponseTime?: string | null;
  hasPeerReview?: boolean | null;
  hasMentoring?: boolean | null;
  supportTypes?: string[] | null;
}

export interface SkillPerksCourseData {
  editorialRating?: number | null;
  bestForSegments?: string[] | null;
  valueScore?: number | null;
  popularityTrend?: "rising" | "stable" | "declining" | null;
  isEditorsPick?: boolean | null;
  affiliateLink: string;
  activeCouponCode?: string | null;
}

export interface Course {
  id: string;
  slug: string;
  platformId: string;
  title: string;
  thumbnailUrl?: string | null;
  instructors?: CourseInstructor[] | null;
  rating?: number | null;
  reviewCount?: number | null;
  studentCount?: number | null;
  lastUpdated?: string | null;
  language?: string | null;
  subtitles?: string[] | null;
  categories: string[];
  pricing: CoursePricing;
  content: CourseContent;
  format: CourseFormat;
  certification?: CourseCertification | null;
  community?: CourseCommunity | null;
  skillPerksData: SkillPerksCourseData;
}

export interface PlatformMeta {
  id: string;
  name: string;
  slug: string;
  logoUrl?: string | null;
  websiteUrl?: string | null;
  affiliateBaseUrl?: string | null;
  primaryColor?: string | null;
  tagline?: string | null;
}
