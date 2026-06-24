import { NextResponse } from "next/server";

interface BriefingItem {
  label: string;
  value: string;
  icon?: string;
}

interface BriefingSection {
  title: string;
  status: "success" | "warning" | "error" | "info";
  items: BriefingItem[];
}

export async function GET() {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // In a real deployment, this route would call Gmail/Calendar/Slack APIs.
  // For now, it returns the briefing data that was compiled from the agent run.
  const sections: BriefingSection[] = [
    {
      title: "📨 Email",
      status: "error",
      items: [
        {
          label: "Gmail",
          value: "Disconnected — reauthorize in Integrations",
          icon: "🔴",
        },
        {
          label: "Unread",
          value: "Unavailable (Gmail OAuth expired)",
          icon: "—",
        },
      ],
    },
    {
      title: "💬 Slack",
      status: "warning",
      items: [
        {
          label: "Platform",
          value: "Fly worker had 2 outages overnight (recovered)",
          icon: "🟡",
        },
        {
          label: "Gemini",
          value: "Brief outage alongside Fly worker (recovered)",
          icon: "🟢",
        },
        {
          label: "Build",
          value: "BOOM-ROOM-TRADERSS blocked — npm dep resolution bug",
          icon: "🔴",
        },
      ],
    },
    {
      title: "🐙 GitHub",
      status: "success",
      items: [
        { label: "Active Repos", value: "10 repos (Next.js 14 stack)", icon: "📦" },
        { label: "Latest", value: "home-control-app, booking-app, ai-chatbot-app", icon: "🆕" },
        { label: "Blocked", value: "BOOM-ROOM-TRADERSS (npm build stuck round 80/80)", icon: "⚠️" },
      ],
    },
    {
      title: "📊 Google Ads",
      status: "warning",
      items: [
        {
          label: "Status",
          value: "Connected — needs customer ID for data",
          icon: "🟡",
        },
      ],
    },
    {
      title: "💳 Stripe",
      status: "error",
      items: [
        {
          label: "Status",
          value: "Not connected — add secret key in Integrations",
          icon: "🔴",
        },
      ],
    },
    {
      title: "📱 Social",
      status: "success",
      items: [
        { label: "Instagram", value: "Oriumai — connected", icon: "🟢" },
        { label: "Facebook", value: "Kenzie Johnson · Oriumai — connected", icon: "🟢" },
        { label: "Discord", value: "sampsonai — OAuth connected", icon: "🟡" },
      ],
    },
    {
      title: "✅ Action Items",
      status: "error",
      items: [
        {
          label: "HIGH",
          value: "Reconnect Gmail (expired OAuth token)",
          icon: "🔴",
        },
        {
          label: "HIGH",
          value: "Fix BOOM-ROOM-TRADERSS npm build (try pnpm or npm upgrade)",
          icon: "🔴",
        },
        {
          label: "MEDIUM",
          value: "Configure Google Ads customer ID",
          icon: "🟡",
        },
        {
          label: "MEDIUM",
          value: "Connect Stripe secret key",
          icon: "🟡",
        },
      ],
    },
  ];

  return NextResponse.json({ date: today, sections });
}
