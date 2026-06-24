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

const statusColors: Record<string, string> = {
  success: "border-emerald-700/40 bg-emerald-950/20",
  warning: "border-amber-700/40 bg-amber-950/20",
  error: "border-red-700/40 bg-red-950/20",
  info: "border-blue-700/40 bg-blue-950/20",
};

const statusBadge: Record<string, string> = {
  success: "bg-emerald-500/10 text-emerald-400",
  warning: "bg-amber-500/10 text-amber-400",
  error: "bg-red-500/10 text-red-400",
  info: "bg-blue-500/10 text-blue-400",
};

const statusDot: Record<string, string> = {
  success: "bg-emerald-400",
  warning: "bg-amber-400",
  error: "bg-red-400",
  info: "bg-blue-400",
};

export default function BriefingCard({
  section,
}: {
  section: BriefingSection;
}) {
  return (
    <div
      className={`rounded-xl border p-5 transition-colors ${statusColors[section.status] ?? statusColors.info}`}
    >
      <div className="mb-3 flex items-center gap-2">
        <span
          className={`h-2.5 w-2.5 rounded-full ${statusDot[section.status] ?? statusDot.info}`}
        />
        <h2 className="text-lg font-semibold text-white">{section.title}</h2>
        <span
          className={`ml-auto rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${statusBadge[section.status] ?? statusBadge.info}`}
        >
          {section.status}
        </span>
      </div>
      <div className="space-y-2">
        {section.items.map((item, i) => (
          <div key={i} className="flex items-start gap-3 text-sm">
            {item.icon && (
              <span className="mt-0.5 shrink-0 text-base">{item.icon}</span>
            )}
            <span className="min-w-[100px] font-medium text-slate-300">
              {item.label}
            </span>
            <span className="text-slate-400">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
