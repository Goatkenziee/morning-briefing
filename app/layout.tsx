import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Morning Briefing",
  description: "Daily briefing — emails, calendar, tasks, and alerts",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
