import { NextResponse } from "next/server";

export async function GET() {
  const briefing = {
    date: new Date().toISOString(),
    gmail: {
      status: "error" as const,
      message:
        "Gmail is disconnected. Re-authorize in Settings → Integrations.",
    },
    slack: {
      status: "ok" as const,
      recentAlerts: 12,
      message:
        "Platform watchdog active. Gemini and Fly worker had outages in the last 24h — currently recovered.",
    },
    github: {
      status: "warning" as const,
      repos: 19,
      openIssues: 1,
      message:
        "BOOM-ROOM-TRADERSS has an open issue (#20). Morning-briefing app is built but not deployed.",
    },
    integrations: [
      { name: "Gmail", status: "error" as const },
      { name: "Slack", status: "ok" as const },
      { name: "GitHub", status: "ok" as const },
      { name: "Facebook", status: "ok" as const },
      { name: "Instagram", status: "ok" as const },
      { name: "Discord", status: "ok" as const },
      { name: "Stripe", status: "warning" as const },
      { name: "Google Ads", status: "warning" as const },
    ],
    actions: [
      {
        priority: "high" as const,
        text: "Reconnect Gmail — go to Settings → Integrations and re-authorize mackquisition@gmail.com.",
      },
      {
        priority: "medium" as const,
        text: "BOOM-ROOM-TRADERSS Issue #20 — verification fix needs review. Check and merge if ready.",
      },
      {
        priority: "medium" as const,
        text: "Deploy the morning-briefing app to Vercel so you can visit this dashboard daily.",
      },
      {
        priority: "low" as const,
        text: "Connect Stripe + Google Ads to include revenue and campaign data in future briefings.",
      },
    ],
  };

  return NextResponse.json(briefing);
}
