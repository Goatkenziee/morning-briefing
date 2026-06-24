"use client";

import { useState, useEffect } from "react";
import BriefingCard from "@/components/BriefingCard";

interface BriefingSection {
  title: string;
  status: "success" | "warning" | "error" | "info";
  items: { label: string; value: string; icon?: string }[];
}

export default function Home() {
  const [sections, setSections] = useState<BriefingSection[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/briefing")
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setSections(data.sections ?? []);
        }
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10 text-center">
          <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-blue-500/10 px-4 py-1.5 text-sm text-blue-400">
            <span className="h-2 w-2 rounded-full bg-blue-400 animate-pulse" />
            Live Briefing
          </div>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Morning Briefing
          </h1>
          <p className="mt-3 text-lg text-slate-400">{today}</p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-500/30 border-t-blue-500" />
            <p className="mt-4 text-sm text-slate-500">
              Gathering your data...
            </p>
          </div>
        )}

        {/* Error */}
        {error && !loading && (
          <div className="rounded-xl border border-red-800/40 bg-red-950/30 p-6 text-center">
            <p className="text-lg text-red-400">⚠ {error}</p>
            <p className="mt-2 text-sm text-slate-500">
              Reconnect your integrations and refresh.
            </p>
          </div>
        )}

        {/* Sections */}
        {!loading && !error && (
          <div className="space-y-6">
            {sections.length === 0 && (
              <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-8 text-center">
                <p className="text-slate-400">
                  No data to display. Connect Gmail and other services to see
                  your briefing.
                </p>
              </div>
            )}
            {sections.map((section, i) => (
              <BriefingCard key={i} section={section} />
            ))}
          </div>
        )}

        {/* Footer */}
        <footer className="mt-12 border-t border-slate-800 pt-6 text-center text-xs text-slate-600">
          Data refreshes daily. Integrations managed in Settings.
        </footer>
      </div>
    </main>
  );
}
