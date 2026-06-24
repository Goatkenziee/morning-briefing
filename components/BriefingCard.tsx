interface BriefingCardProps {
  title: string;
  icon: string;
  children: React.ReactNode;
  status?: "ok" | "warning" | "error" | "info";
}

const statusStyles: Record<string, string> = {
  ok: "border-green-700 bg-green-950/30",
  warning: "border-yellow-700 bg-yellow-950/30",
  error: "border-red-700 bg-red-950/30",
  info: "border-blue-700 bg-blue-950/30",
};

const statusBadge: Record<string, string> = {
  ok: "bg-green-900 text-green-300",
  warning: "bg-yellow-900 text-yellow-300",
  error: "bg-red-900 text-red-300",
  info: "bg-blue-900 text-blue-300",
};

const statusLabel: Record<string, string> = {
  ok: "✅ Healthy",
  warning: "⚠️ Needs Attention",
  error: "❌ Disconnected",
  info: "ℹ️ Info",
};

export default function BriefingCard({
  title,
  icon,
  children,
  status = "info",
}: BriefingCardProps) {
  return (
    <div
      className={`rounded-xl border p-5 ${statusStyles[status] || statusStyles.info}`}
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold flex items-center gap-2 text-slate-100">
          <span>{icon}</span>
          {title}
        </h2>
        <span
          className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusBadge[status] || statusBadge.info}`}
        >
          {statusLabel[status] || statusLabel.info}
        </span>
      </div>
      <div className="space-y-2 text-sm text-slate-300">{children}</div>
    </div>
  );
}
