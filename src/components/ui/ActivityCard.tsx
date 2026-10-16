import { motion } from 'framer-motion';
import { Activity } from 'lucide-react';

interface ActivityCardProps {
  name: string;
  type: string;
  date: string;
  duration?: string;
  distance?: string;
  calories?: number;
  index?: number;
}

export function ActivityCard({ name, type, date, duration, distance, calories, index = 0 }: ActivityCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: index * 0.04 }}
      className="flex items-center gap-4 rounded-lg border border-neutral-200 bg-white p-3 dark:border-neutral-800 dark:bg-neutral-900"
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-neutral-100 dark:bg-neutral-800">
        <Activity className="h-5 w-5 text-neutral-500 dark:text-neutral-400" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="truncate text-sm font-medium text-neutral-900 dark:text-neutral-100">{name}</p>
        <p className="text-xs text-neutral-500 dark:text-neutral-400">{type} · {date}</p>
      </div>
      <div className="flex items-center gap-4 text-xs text-neutral-500 dark:text-neutral-400">
        {duration && <span>{duration}</span>}
        {distance && <span>{distance}</span>}
        {calories !== undefined && <span>{calories} cal</span>}
      </div>
    </motion.div>
  );
}
