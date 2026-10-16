import { type LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface MetricCardProps {
  label: string;
  value: string | number;
  unit?: string;
  icon: LucideIcon;
  trend?: string;
  index?: number;
}

export function MetricCard({ label, value, unit, icon: Icon, trend, index = 0 }: MetricCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="rounded-xl border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900"
    >
      <div className="flex items-center justify-between">
        <span className="text-sm text-neutral-500 dark:text-neutral-400">{label}</span>
        <Icon className="h-4 w-4 text-neutral-400" />
      </div>
      <div className="mt-2 flex items-baseline gap-1">
        <span className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">{value}</span>
        {unit && <span className="text-sm text-neutral-500 dark:text-neutral-400">{unit}</span>}
      </div>
      {trend && <p className="mt-1 text-xs text-neutral-400 dark:text-neutral-500">{trend}</p>}
    </motion.div>
  );
}
