import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, X, Minus, Star, ExternalLink } from "lucide-react";

import { getPlatformBySlug, platforms } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ComparisonTable } from "@/components/conversion/comparison-table";
import { absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Educative vs DataCamp (2026) - Honest Comparison",
  description: "Side-by-side comparison of Educative and DataCamp. See which platform is better for your learning goals, budget, and career path.",
  alternates: {
    canonical: absoluteUrl("/comparisons/educative-vs-datacamp"),
  },
  openGraph: {
    title: "Educative vs DataCamp (2026) - Honest Comparison",
    description: "Side-by-side comparison of Educative and DataCamp. See which platform is better for your learning goals, budget, and career path.",
    url: absoluteUrl("/comparisons/educative-vs-datacamp"),
    type: "article",
  },
};

const features = [
  { name: "Interactive Learning", description: "Hands-on practice in browser" },
  { name: "Video Content", description: "Video lessons and tutorials" },
  { name: "Text-Based Content", description: "Written explanations and docs" },
  { name: "Cloud Labs/IDE", description: "In-browser development environment" },
  { name: "Interview Prep", description: "Technical interview practice" },
  { name: "Data Science Focus", description: "Data science and analytics courses" },
  { name: "System Design", description: "System architecture and design" },
  { name: "Mobile Access", description: "iOS/Android apps available" },
];

export default function EducativeVsDataCamp() {
  const educative = getPlatformBySlug("educative");
  const datacamp = getPlatformBySlug("datacamp");

  if (!educative || !datacamp) return null;

  const comparisonData = [
    {
      name: "Educative",
      rating: 4.8,
      price: "$199/year",
      bestFor: "System Design & Coding Interviews",
      features: [true, false, true, true, true, false, true, false],
      couponAvailable: true,
      couponDiscount: "40% OFF",
    },
    {
      name: "DataCamp",
      rating: 4.9,
      price: "$149/year",
      bestFor: "Data Science & Analytics",
      features: [true, true, false, true, false, true, false, true],
      couponAvailable: true,
      couponDiscount: "50% OFF",
    },
  ];

  return (
    <div className="container px-4 md:px-6 mx-auto py-12 space-y-12">
      {/* Hero */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          Educative vs DataCamp
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Two popular learning platforms, but they serve very different purposes. 
          Here's the honest breakdown to help you choose the right one.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Badge variant="secondary" className="text-sm">
            <Star className="h-4 w-4 mr-1" />
            Updated for 2026
          </Badge>
          <Badge variant="secondary" className="text-sm">
            Real user insights
          </Badge>
        </div>
      </div>

      {/* Quick Answer */}
      <Card className="border-primary/20 bg-primary/5">
        <CardHeader>
          <CardTitle className="text-xl">Quick Answer</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="font-semibold text-green-600 mb-2">Choose Educative if:</h3>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• You're preparing for FAANG interviews</li>
                <li>• You prefer text-based interactive learning</li>
                <li>• You need system design and coding patterns</li>
                <li>• You want in-browser coding practice</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-blue-600 mb-2">Choose DataCamp if:</h3>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• You're pursuing data science/analytics</li>
                <li>• You prefer video-based learning</li>
                <li>• You need Python, R, and SQL skills</li>
                <li>• You want mobile app access</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Comparison Table */}
      <div className="space-y-6">
        <h2 className="text-3xl font-bold">Feature Comparison</h2>
        <ComparisonTable platforms={comparisonData} features={features} />
      </div>

      {/* Detailed Breakdown */}
      <div className="grid gap-8 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Educative Strengths
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {educative.pros.map((pro, i) => (
                <li key={i} className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                  <span className="text-sm">{pro}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              DataCamp Strengths
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {datacamp.pros.map((pro, i) => (
                <li key={i} className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                  <span className="text-sm">{pro}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Pricing Comparison */}
      <Card>
        <CardHeader>
          <CardTitle>Pricing & Value</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">Educative</h3>
              <div className="text-2xl font-bold text-green-600 mb-2">$199/year</div>
              <p className="text-sm text-muted-foreground mb-3">
                Annual subscription with full access to all courses and projects.
              </p>
              <Button asChild className="w-full">
                <Link href="/coupons/educative-coupon-code">
                  Get 40% OFF <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">DataCamp</h3>
              <div className="text-2xl font-bold text-green-600 mb-2">$149/year</div>
              <p className="text-sm text-muted-foreground mb-3">
                Premium subscription includes all courses and skill tracks.
              </p>
              <Button asChild className="w-full">
                <Link href="/coupons/datacamp-coupon-code">
                  Get 50% OFF <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bottom CTA */}
      <Card className="text-center">
        <CardContent className="p-8 space-y-4">
          <h2 className="text-2xl font-bold">Still can't decide?</h2>
          <p className="text-muted-foreground">
            Read our detailed reviews to see real user experiences and current deals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="outline">
              <Link href="/reviews/educative">
                Read Educative Review <ExternalLink className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/reviews/datacamp">
                Read DataCamp Review <ExternalLink className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
