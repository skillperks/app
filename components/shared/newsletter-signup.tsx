"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        setStatus("error");
        return;
      }

      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  };

  return (
    <form onSubmit={onSubmit} className="flex w-full flex-col gap-2 sm:flex-row">
      <Input
        type="email"
        required
        placeholder="Get deal alerts (email)"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="sm:max-w-xs"
      />
      <Button type="submit" disabled={status === "loading"}>
        {status === "success" ? "Subscribed" : "Subscribe"}
      </Button>
      {status === "error" && (
        <div className="text-xs text-muted-foreground sm:self-center">Something went wrong. Try again.</div>
      )}
    </form>
  );
}
