import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  max?: string | number;
  unit?: string;
  icon?: LucideIcon;
  color?: string;
  progress?: number;
}

export function StatCard({
  title,
  value,
  max,
  unit = "",
  icon: Icon,
  color = "bg-indigo-50",
  progress,
}: StatCardProps) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="text-sm text-gray-600">{title}</div>
        {Icon && (
          <div className={`${color} p-2 rounded-lg`}>
            <Icon className="w-4 h-4 text-primary" />
          </div>
        )}
      </div>
      <div className="flex items-baseline gap-1 mb-2">
        <span className="text-3xl">{value}</span>
        {max && <span className="text-lg text-gray-400">/ {max}</span>}
        {unit && <span className="text-sm text-gray-500 ml-1">{unit}</span>}
      </div>
      {progress !== undefined && (
        <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
          <div
            className="bg-black h-full rounded-full transition-all duration-500"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>
      )}
    </div>
  );
}
