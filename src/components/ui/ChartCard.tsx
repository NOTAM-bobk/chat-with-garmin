import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, BarChart, Bar } from 'recharts';
import { motion } from 'framer-motion';

interface ChartCardProps {
  title: string;
  type: 'line' | 'bar';
  data: Array<Record<string, string | number>>;
  dataKey: string;
  xKey: string;
  unit?: string;
  color?: string;
  index?: number;
}

export function ChartCard({ title, type, data, dataKey, xKey, unit, color = '#3b82f6', index = 0 }: ChartCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="rounded-xl border border-neutral-200 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-900"
    >
      <h3 className="text-sm font-medium text-neutral-900 dark:text-neutral-100">{title}</h3>
      <div className="mt-4 h-48">
        <ResponsiveContainer width="100%" height="100%">
          {type === 'line' ? (
            <LineChart data={data} margin={{ top: 5, right: 5, bottom: 0, left: -20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="text-neutral-200 dark:text-neutral-800" vertical={false} />
              <XAxis dataKey={xKey} tick={{ fontSize: 11 }} stroke="currentColor" className="text-neutral-400" />
              <YAxis tick={{ fontSize: 11 }} stroke="currentColor" className="text-neutral-400" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--tooltip-bg, #fff)',
                  border: '1px solid var(--tooltip-border, #e5e5e5)',
                  borderRadius: '8px',
                  fontSize: '12px',
                }}
                formatter={(value) => [`${value}${unit ?? ''}`, dataKey]}
              />
              <Line
                type="monotone"
                dataKey={dataKey}
                stroke={color}
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4 }}
              />
            </LineChart>
          ) : (
            <BarChart data={data} margin={{ top: 5, right: 5, bottom: 0, left: -20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="text-neutral-200 dark:text-neutral-800" vertical={false} />
              <XAxis dataKey={xKey} tick={{ fontSize: 11 }} stroke="currentColor" className="text-neutral-400" />
              <YAxis tick={{ fontSize: 11 }} stroke="currentColor" className="text-neutral-400" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--tooltip-bg, #fff)',
                  border: '1px solid var(--tooltip-border, #e5e5e5)',
                  borderRadius: '8px',
                  fontSize: '12px',
                }}
                formatter={(value) => [`${value}${unit ?? ''}`, dataKey]}
              />
              <Bar dataKey={dataKey} fill={color} radius={[4, 4, 0, 0]} />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
