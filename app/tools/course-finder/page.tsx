"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";

import { platforms } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

type Goal = "system-design" | "data-science" | "interview-prep";
type Format = "text-interactive" | "video" | "any";
type Coaching = "yes" | "no";
type Budget = "budget" | "any";

type Answers = {
  goal: Goal;
  format: Format;
  coaching: Coaching;
  budget: Budget;
};

type Recommendation = {
  platform: (typeof platforms)[number];
  score: number;
  reasons: string[];
};

export default function CourseFinderPage() {
  const [step, setStep] = useState<0 | 1 | 2 | 3 | 4>(0);
  const [answers, setAnswers] = useState<Answers>({
    goal: "system-design",
    format: "any",
    coaching: "no",
    budget: "any",
  });

  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartX = useRef(0);
  const dragHasStarted = useRef(false);
  const pointerIdRef = useRef<number | null>(null);

  const recommendations = useMemo(() => {
    const scored: Recommendation[] = [];

    for (const p of platforms) {
      let score = 0;
      const reasons: string[] = [];

      if (answers.goal === "data-science" && p.slug === "datacamp") {
        score += 6;
        reasons.push("Strong for data skills (Python, SQL, analytics). ");
      }

      if (answers.goal === "system-design") {
        if (p.slug === "educative") {
          score += 4;
          reasons.push("Great system design course library (hands-on, text-based). ");
        }
        if (p.slug === "exponent") {
          score += 3;
          reasons.push("System design + company guides + practice. ");
        }
      }

      if (answers.goal === "interview-prep") {
        if (p.slug === "exponent") {
          score += 5;
          reasons.push("Built for interview prep (questions, practice, coaching). ");
        }
        if (p.slug === "educative") {
          score += 3;
          reasons.push("Good for interview prep via hands-on practice. ");
        }
      }

      if (answers.format === "text-interactive") {
        if (p.slug === "educative" || p.slug === "datacamp") {
          score += 3;
          reasons.push("Matches your preference for text + interactive learning.");
        }
      }

      if (answers.format === "video") {
        if (p.slug === "exponent") {
          score += 3;
          reasons.push("Better fit if you prefer video-style explanations.");
        }
      }

      if (answers.coaching === "yes" && p.slug === "exponent") {
        score += 4;
        reasons.push("Offers coaching like mock interviews and resume review.");
      }

      if (answers.budget === "budget") {
        if (p.slug === "datacamp") {
          score += 1;
          reasons.push("Has a free Basic tier (first chapters). ");
        }
      }

      if (score > 0) {
        scored.push({ platform: p, score, reasons });
      }
    }

    const uniqueBySlug = new Map<string, Recommendation>();
    for (const r of scored) {
      const existing = uniqueBySlug.get(r.platform.slug);
      if (!existing || r.score > existing.score) uniqueBySlug.set(r.platform.slug, r);
    }

    return Array.from(uniqueBySlug.values())
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);
  }, [answers]);

  function next() {
    setStep((s) => (s < 4 ? ((s + 1) as 0 | 1 | 2 | 3 | 4) : s));
  }

  function back() {
    setStep((s) => (s > 0 ? ((s - 1) as 0 | 1 | 2 | 3 | 4) : s));
  }

  function restart() {
    setAnswers({ goal: "system-design", format: "any", coaching: "no", budget: "any" });
    setStep(0);
    setDragX(0);
  }

  function clamp(n: number, min: number, max: number) {
    return Math.min(max, Math.max(min, n));
  }

  function handlePointerDown(e: React.PointerEvent<HTMLDivElement>) {
    if (step === 4) return;
    if (pointerIdRef.current !== null) return;

    const target = e.target as HTMLElement | null;
    if (target?.closest("button,a,input,select,textarea,[role='button']")) return;

    pointerIdRef.current = e.pointerId;
    dragStartX.current = e.clientX;
    dragHasStarted.current = false;
  }

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (pointerIdRef.current !== e.pointerId) return;
    const dx = e.clientX - dragStartX.current;

    if (!dragHasStarted.current) {
      const threshold = 8;
      if (Math.abs(dx) < threshold) return;
      dragHasStarted.current = true;
      setIsDragging(true);
      (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
    }

    setDragX(clamp(dx, -220, 220));
  }

  function endDrag(e: React.PointerEvent<HTMLDivElement>) {
    if (pointerIdRef.current !== e.pointerId) return;

    const threshold = 120;
    const dx = dragX;
    setIsDragging(false);
    dragHasStarted.current = false;
    pointerIdRef.current = null;
    setDragX(0);

    if (dx > threshold) next();
    if (dx < -threshold) back();
  }

  return (
    <div className="container px-4 py-10 md:px-6 md:py-16 mx-auto">
      <div className="space-y-10">
        <div className="space-y-4 max-w-3xl">
          <Badge className="w-fit">Tool</Badge>
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">Course Finder Quiz</h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Answer a few quick questions and we’ll recommend the best platform matches.
          </p>
        </div>

        <div className="max-w-3xl">
          {step !== 4 ? (
            <div className="text-sm text-muted-foreground pb-3">
              Swipe left for previous, swipe right for next.
            </div>
          ) : null}

          <div
            className="relative"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
          >
            <Card
              className={`select-none ${step === 4 ? "" : "touch-none"}`}
              style={{
                transform: step === 4 ? undefined : `translateX(${dragX}px) rotate(${dragX / 25}deg)`,
                transition: isDragging ? "none" : "transform 180ms ease",
              }}
            >
              <CardHeader className="space-y-2">
                <CardTitle>Step {step + 1} of 5</CardTitle>
                <div className="text-sm text-muted-foreground">
                  {step === 0
                    ? "What’s your primary goal?"
                    : step === 1
                      ? "What learning format do you prefer?"
                      : step === 2
                        ? "Do you want coaching support?"
                        : step === 3
                          ? "Are you optimizing for budget?"
                          : "Your matches"}
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {step === 0 ? (
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant={answers.goal === "system-design" ? "default" : "outline"}
                      onClick={() => setAnswers((a) => ({ ...a, goal: "system-design" }))}
                    >
                      System Design
                    </Button>
                    <Button
                      variant={answers.goal === "data-science" ? "default" : "outline"}
                      onClick={() => setAnswers((a) => ({ ...a, goal: "data-science" }))}
                    >
                      Data Science
                    </Button>
                    <Button
                      variant={answers.goal === "interview-prep" ? "default" : "outline"}
                      onClick={() => setAnswers((a) => ({ ...a, goal: "interview-prep" }))}
                    >
                      Interview Prep
                    </Button>
                  </div>
                ) : null}

                {step === 1 ? (
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant={answers.format === "any" ? "default" : "outline"}
                      onClick={() => setAnswers((a) => ({ ...a, format: "any" }))}
                    >
                      Any
                    </Button>
                    <Button
                      variant={answers.format === "text-interactive" ? "default" : "outline"}
                      onClick={() => setAnswers((a) => ({ ...a, format: "text-interactive" }))}
                    >
                      Text + Interactive
                    </Button>
                    <Button
                      variant={answers.format === "video" ? "default" : "outline"}
                      onClick={() => setAnswers((a) => ({ ...a, format: "video" }))}
                    >
                      Video
                    </Button>
                  </div>
                ) : null}

                {step === 2 ? (
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant={answers.coaching === "yes" ? "default" : "outline"}
                      onClick={() => setAnswers((a) => ({ ...a, coaching: "yes" }))}
                    >
                      Yes, I want coaching
                    </Button>
                    <Button
                      variant={answers.coaching === "no" ? "default" : "outline"}
                      onClick={() => setAnswers((a) => ({ ...a, coaching: "no" }))}
                    >
                      No, self-study is fine
                    </Button>
                  </div>
                ) : null}

                {step === 3 ? (
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant={answers.budget === "any" ? "default" : "outline"}
                      onClick={() => setAnswers((a) => ({ ...a, budget: "any" }))}
                    >
                      Not really
                    </Button>
                    <Button
                      variant={answers.budget === "budget" ? "default" : "outline"}
                      onClick={() => setAnswers((a) => ({ ...a, budget: "budget" }))}
                    >
                      Yes, keep it budget-friendly
                    </Button>
                  </div>
                ) : null}

                {step !== 4 ? <Separator /> : null}

                {step !== 4 ? (
                  <div className="flex items-center justify-between gap-2">
                    <Button variant="outline" onClick={back} disabled={step === 0}>
                      Back
                    </Button>
                    <Button onClick={next}>
                      Next
                    </Button>
                  </div>
                ) : null}

                {step === 4 ? (
                  <div className="space-y-4">
                    <div className="text-sm text-muted-foreground">
                      Based on your answers, here are the best matches.
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                      {recommendations.map((rec) => (
                        <Card key={rec.platform.slug} className="overflow-hidden">
                          <CardHeader className="space-y-1">
                            <CardTitle>{rec.platform.name}</CardTitle>
                            <p className="text-sm text-muted-foreground">{rec.platform.description}</p>
                          </CardHeader>
                          <CardContent className="space-y-3">
                            <div className="space-y-1">
                              <div className="text-sm font-semibold">Why this match</div>
                              <div className="text-sm text-muted-foreground">
                                {rec.reasons.slice(0, 3).join(" ").trim()}
                              </div>
                            </div>

                            <Separator />

                            <div className="flex items-center justify-between">
                              <span className="text-sm text-muted-foreground">Best deal</span>
                              <span className="font-semibold text-primary">{rec.platform.activeCoupon.discount}</span>
                            </div>

                            <div className="flex flex-col gap-2">
                              <Button asChild>
                                <Link href={`/coupons/${rec.platform.couponSlug}`}>Get Deal</Link>
                              </Button>
                              <Button asChild variant="outline">
                                <Link href={`/reviews/${rec.platform.slug}`}>Read Review</Link>
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>

                    <div>
                      <Button variant="outline" onClick={restart}>
                        Restart quiz
                      </Button>
                    </div>
                  </div>
                ) : null}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
