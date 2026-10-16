import { motion } from 'framer-motion';
import { type LucideIcon } from 'lucide-react';

interface ConnectionStatusProps {
  status: 'connected' | 'disconnected' | 'expired';
  onConnect?: () => void;
  onDisconnect?: () => void;
  loading?: boolean;
}

const statusConfig = {
  connected: {
    badge: 'connected' as const,
    label: 'Garmin Connected',
    description: 'Your Garmin account is linked. You can chat with your fitness data.',
    color: 'text-green-600 dark:text-green-400',
    icon: null,
  },
  disconnected: {
    badge: 'disconnected' as const,
    label: 'Garmin Not Connected',
    description: 'Connect your Garmin account to start chatting with your fitness data.',
    color: 'text-neutral-500',
    icon: null,
  },
  expired: {
    badge: 'expired' as const,
    label: 'Reconnect Required',
    description: 'Your Garmin session has expired. Please reconnect to continue.',
    color: 'text-amber-600 dark:text-amber-400',
    icon: null,
  },
};

export function ConnectionStatus({ status, onConnect, onDisconnect, loading }: ConnectionStatusProps) {
  const config = statusConfig[status];

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="rounded-xl border border-neutral-200 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-900"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`h-2.5 w-2.5 rounded-full ${
            status === 'connected' ? 'bg-green-500 animate-pulse-dot' :
            status === 'expired' ? 'bg-amber-500 animate-pulse-dot' :
            'bg-neutral-400'
          }`} />
          <span className={`text-sm font-medium ${config.color}`}>{config.label}</span>
        </div>
      </div>
      <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">{config.description}</p>
      <div className="mt-4 flex gap-2">
        {status !== 'connected' && onConnect && (
          <button
            onClick={onConnect}
            disabled={loading}
            className="inline-flex h-9 items-center justify-center gap-2 rounded-lg bg-neutral-900 px-4 text-sm font-medium text-white transition-colors hover:bg-neutral-800 disabled:opacity-50 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200"
          >
            {loading ? 'Connecting...' : status === 'expired' ? 'Reconnect Garmin' : 'Connect Garmin'}
          </button>
        )}
        {status === 'connected' && onDisconnect && (
          <button
            onClick={onDisconnect}
            disabled={loading}
            className="inline-flex h-9 items-center justify-center rounded-lg border border-neutral-200 px-4 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50 disabled:opacity-50 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800"
          >
            {loading ? 'Disconnecting...' : 'Disconnect'}
          </button>
        )}
      </div>
    </motion.div>
  );
}
