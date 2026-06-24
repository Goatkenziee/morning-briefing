"use client";

import { useEffect, useState } from "react";
import BriefingCard from "@/components/BriefingCard";

interface BriefingData {
  date: string;
  gmail: { status: "ok" | "error"; message: string };
  slack: { status: "ok" | "error"; recentAlerts: number; message: string };
  github: { status: "ok" | "warning"; repos: number; openIssues: number; message: string };
  integrations: { name: string; status: "ok" | "warning" | "error" }[];
  actions: { priority: "high" | "medium" | "low"; text: string }[];
}

const defaultBriefing: BriefingData = {
  date: new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }),
  gmail: {
    status: "error",
    message:
      "Gmail is disconnected. Go to Settings → Integrations to re-authorize your account.",
  },
  slack: {
    status: "ok",
    recentAlerts: 12,
    message:
      "Platform watchdog active. Gemini and Fly worker had outages in the last 24h — currently recovered.",
  },
  github: {
    status: "warning",
    repos: 19,
    openIssues: 1,
    message:
      "BOOM-ROOM-TRADERSS has an open issue (#20). Morning-briefing app is built but not deployed.",
  },
  integrations: [
    { name: "Gmail", status: "error" },
    { name: "Slack", status: "ok" },
    { name: "GitHub", status: "ok" },
    { name: "Facebook", status: "ok" },
    { name: "Instagram", status: "ok" },
    { name: "Discord", status: "ok" },
    { name: "Stripe", status: "warning" },
    { name: "Google Ads", status: "warning" },
  ],
  actions: [
    {
      priority: "high",
      text: 'Reconnect Gmail — go to Settings → Integrations and re-authorize mackquisition@gmail.com.',
    },
    {
      priority: "medium",
      text: "BOOM-ROOM-TRADERSS Issue #20 — verification fix needs review. Check and merge if ready.",
    },
    {
      priority: "medium",
      text: "Deploy the morning-briefing app to Vercel so you can visit this dashboard daily.",
    },
    {
      priority: "low",
      text: "Connect Stripe + Google Ads to include revenue and campaign data in future briefings.",
    },
  ],
};

export default function Home() {
  const [briefing] = useState<BriefingData>(defaultBriefing);
  const [time, setTime] = useState("");

  useEffect(() => {
    setTime(
      new Date().toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      })
    );
  }, []);

  const priorityColors: Record<string, string> = {
    high: "bg-red-900/50 text-red-300 border-red-700",
    medium: "bg-yellow-900/50 text-yellow-300 border-yellow-700",
    low: "bg-blue-900/50 text-blue-300 border-blue-700",
  };

  const priorityLabels: Record<string, string> = {
    high: "HIGH",
    medium: "MEDIUM",
    low: "LOW",
  };

  return (
    <main className="min-h-screen bg-slate-900 text-slate-200">
      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Header */}
        <header className="mb-8 pb-6 border-b border-slate-700">
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <span>☀️</span> Morning Briefing
          </h1>
          <p className="text-slate-400 mt-1">
            {briefing.date}
            {time && <span> · {time}</span>}
          </p>
        </header>

        <div className="space-y-5">
          {/* Gmail */}
          <BriefingCard title="Gmail & Calendar" icon="📨" status={briefing.gmail.status}>
            <div className="bg-slate-800/50 rounded-lg p-3 border border-red-800/50">
              <p className="text-red-300 font-medium">⚠️ {briefing.gmail.message}</p>
              <p className="text-slate-400 text-xs mt-1">
                No emails or calendar events could be read.
              </p>
            </div>
          </BriefingCard>

          {/* Slack */}
          <BriefingCard title="Slack" icon="💬" status={briefing.slack.status}>
            <p>{briefing.slack.message}</p>
            <div className="flex gap-2 mt-2">
              <span className="bg-slate-700 text-slate-300 text-xs px-2 py-1 rounded">
                {briefing.slack.recentAlerts} alerts in 24h
              </span>
              <span className="bg-green-900/50 text-green-300 text-xs px-2 py-1 rounded">
                Connected
              </span>
            </div>
          </BriefingCard>

          {/* GitHub */}
          <BriefingCard title="GitHub Activity" icon="🐙" status={briefing.github.status}>
            <p>{briefing.github.message}</p>
            <div className="flex gap-2 mt-2 flex-wrap">
              <span className="bg-slate-700 text-slate-300 text-xs px-2 py-1 rounded">
                {briefing.github.repos} repos
              </span>
              <span className="bg-yellow-900/50 text-yellow-300 text-xs px-2 py-1 rounded">
                {briefing.github.openIssues} open issue
              </span>
              <span className="bg-green-900/50 text-green-300 text-xs px-2 py-1 rounded">
                Connected
              </span>
            </div>
          </BriefingCard>

          {/* Integration Health */}
          <BriefingCard title="Integration Health" icon="🔌" status="info">
            <div className="grid grid-cols-2 gap-2">
              {briefing.integrations.map((int) => (
                <div
                  key={int.name}
                  className={`flex items-center justify-between bg-slate-800/50 rounded-lg px-3 py-2 ${
                    int.status === "error"
                      ? "border border-red-800/30"
                      : int.status === "warning"
                        ? "border border-yellow-800/30"
                        : ""
                  }`}
                >
                  <span className="text-sm">{int.name}</span>
                  <span
                    className={`text-xs font-medium ${
                      int.status === "ok"
                        ? "text-green-400"
                        : int.status === "warning"
                          ? "text-yellow-400"
                          : "text-red-400"
                    }`}
                  >
                    {int.status === "ok" ? "✅" : int.status === "warning" ? "⚠️" : "❌"}
                  </span>
                </div>
              ))}
            </div>
          </BriefingCard>

          {/* Action Items */}
          <BriefingCard title="Action Items" icon="✅" status="info">
            <ol className="space-y-2">
              {briefing.actions.map((action, i) => (
                <li
                  key={i}
                  className={`flex items-start gap-3 p-3 rounded-lg border ${priorityColors[action.priority]}`}
                >
                  <span className="text-xs font-bold uppercase shrink-0 mt-0.5">
                    {priorityLabels[action.priority]}
                  </span>
                  <span className="text-sm">{action.text}</span>
                </li>
              ))}
            </ol>
          </BriefingCard>
        </div>

        <footer className="mt-10 pt-4 border-t border-slate-700 text-center text-slate-500 text-xs">
          Morning Briefing · Generated from your connected integrations
        </footer>
      </div>
    </main>
  );
}
