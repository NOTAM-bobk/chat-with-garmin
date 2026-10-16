import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Moon, Activity, Zap, MessageSquare, TrendingUp } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useGarminConnection } from '@/hooks/useGarminConnection';
import { Navbar } from '@/components/Navbar';
import { ConnectionStatus } from '@/components/ui/ConnectionStatus';
import { MetricCard } from '@/components/ui/MetricCard';
import { ChartCard } from '@/components/ui/ChartCard';
import { ActivityCard } from '@/components/ui/ActivityCard';
import { EmptyState } from '@/components/ui/EmptyState';
import { LoadingSkeleton } from '@/components/ui/LoadingSkeleton';
import { Button } from '@/components/ui/Button';

const mockHrvData = [
  { day: 'Mon', hrv: 52 }, { day: 'Tue', hrv: 48 }, { day: 'Wed', hrv: 55 },
  { day: 'Thu', hrv: 50 }, { day: 'Fri', hrv: 58 }, { day: 'Sat', hrv: 61 }, { day: 'Sun', hrv: 57 },
];
const mockSleepData = [
  { day: 'Mon', hours: 7.2 }, { day: 'Tue', hours: 6.5 }, { day: 'Wed', hours: 7.8 },
  { day: 'Thu', hours: 6.1 }, { day: 'Fri', hours: 8.0 }, { day: 'Sat', hours: 7.5 }, { day: 'Sun', hours: 7.0 },
];
const mockActivities = [
  { name: 'Morning Run', type: 'Running', date: 'Oct 15', duration: '42 min', distance: '7.2 km', calories: 380 },
  { name: 'Cycling Session', type: 'Cycling', date: 'Oct 14', duration: '1h 12m', distance: '28.5 km', calories: 520 },
  { name: 'Pool Swim', type: 'Swimming', date: 'Oct 12', duration: '35 min', distance: '1.5 km', calories: 280 },
  { name: 'Strength Training', type: 'Strength', date: 'Oct 11', duration: '50 min', distance: undefined, calories: 210 },
  { name: 'Trail Run', type: 'Running', date: 'Oct 10', duration: '1h 05m', distance: '10.3 km', calories: 450 },
];

export function DashboardPage() {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { status, connect, disconnect, loading: garminLoading, handleCallback } = useGarminConnection();
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => { if (!authLoading && !user) navigate('/login'); }, [authLoading, user, navigate]);
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const sessionRef = urlParams.get('session');
    const garminConnecting = urlParams.get('garmin');
    if (sessionRef) { handleCallback(sessionRef); window.history.replaceState({}, '', '/dashboard'); }
    else if (!garminConnecting) setDataLoading(false);
  }, [handleCallback]);
  useEffect(() => { if (!garminLoading) { const t = setTimeout(() => setDataLoading(false), 600); return () => clearTimeout(t); } }, [garminLoading]);

  if (authLoading) return (<div className="min-h-screen bg-neutral-50 dark:bg-neutral-950"><Navbar /><div className="mx-auto max-w-container px-4 py-8"><LoadingSkeleton className="h-8 w-48" /></div></div>);

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      <Navbar />
      <div className="mx-auto max-w-container px-4 py-8">
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div><h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">Dashboard</h1><p className="text-sm text-neutral-500 dark:text-neutral-400">{user?.email}</p></div>
          <Button onClick={() => navigate('/chat')} className="gap-2"><MessageSquare className="h-4 w-4" />Open Chat</Button>
        </motion.div>
        <div className="mb-6"><ConnectionStatus status={status} onConnect={connect} onDisconnect={disconnect} loading={garminLoading} /></div>
        {status !== 'connected' ? (
          <EmptyState icon={Activity} title="No Garmin data yet" description="Connect your Garmin account to see your activities, health metrics, and training trends." action={<Button onClick={connect} loading={garminLoading}>Connect Garmin</Button>} />
        ) : dataLoading ? (
          <div className="space-y-6"><div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">{Array.from({ length: 4 }).map((_, i) => (<LoadingSkeleton key={i} className="h-28" />))}</div><div className="grid grid-cols-1 gap-4 lg:grid-cols-2"><LoadingSkeleton className="h-64" /><LoadingSkeleton className="h-64" /></div></div>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <MetricCard label="Training Load" value="847" unit="CT" icon={Zap} trend="+12% vs last week" index={0} />
              <MetricCard label="Avg HRV" value="57" unit="ms" icon={Heart} trend="Stable trend" index={1} />
              <MetricCard label="Sleep Avg" value="7.2" unit="h" icon={Moon} trend="Above target" index={2} />
              <MetricCard label="Recovery" value="82" unit="%" icon={TrendingUp} trend="Good recovery" index={3} />
            </div>
            <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
              <ChartCard title="HRV Trend (7 days)" type="line" data={mockHrvData} dataKey="hrv" xKey="day" unit=" ms" index={0} />
              <ChartCard title="Sleep Duration (7 days)" type="bar" data={mockSleepData} dataKey="hours" xKey="day" unit="h" color="#22c55e" index={1} />
            </div>
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.2 }} className="mt-6 rounded-xl border border-neutral-200 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-900">
              <h3 className="text-sm font-medium text-neutral-900 dark:text-neutral-100">Weekly Training Summary</h3>
              <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
                <div><p className="text-xs text-neutral-500 dark:text-neutral-400">Total Distance</p><p className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">47.5 km</p></div>
                <div><p className="text-xs text-neutral-500 dark:text-neutral-400">Total Duration</p><p className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">4h 24m</p></div>
                <div><p className="text-xs text-neutral-500 dark:text-neutral-400">Total Calories</p><p className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">1,840</p></div>
                <div><p className="text-xs text-neutral-500 dark:text-neutral-400">Activities</p><p className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">5</p></div>
              </div>
            </motion.div>
            <div className="mt-6">
              <h3 className="mb-3 text-sm font-medium text-neutral-900 dark:text-neutral-100">Recent Activities</h3>
              <div className="space-y-2">{mockActivities.map((a, i) => (<ActivityCard key={i} name={a.name} type={a.type} date={a.date} duration={a.duration} distance={a.distance} calories={a.calories} index={i} />))}</div>
            </div>
            <p className="mt-6 text-xs text-neutral-400 dark:text-neutral-500">AI insights are informational, not medical advice.</p>
          </>
        )}
      </div>
    </div>
  );
}
