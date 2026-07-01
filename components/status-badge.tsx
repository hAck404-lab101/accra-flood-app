import type { FloodStatus } from "@/lib/types";

const styles: Record<FloodStatus, string> = {
  flooded: "bg-red-100 text-red-700 ring-red-200",
  water_rising: "bg-amber-100 text-amber-700 ring-amber-200",
  clear: "bg-green-100 text-green-700 ring-green-200"
};

const labels: Record<FloodStatus, string> = {
  flooded: "Flooded",
  water_rising: "Water rising",
  clear: "Clear"
};

export function StatusBadge({ status }: { status: FloodStatus }) {
  return (
    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ring-1 ${styles[status]}`}>
      {labels[status]}
    </span>
  );
}

export function statusLabel(status: FloodStatus) {
  return labels[status];
}
