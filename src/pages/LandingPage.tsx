import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Activity, ShieldCheck, Brain, LayoutDashboard, ArrowRight, Watch, Heart, Moon, Zap } from 'lucide-react';
import { Navbar } from '@/components/Navbar';

const features = [
  {
    icon: ShieldCheck,
    title: 'Secure Garmin Connection',
    description: 'Connect your Garmin account through MissingMCP with end-to-end encryption. Your credentials never touch our servers.',
  },
  {
    icon: Brain,
    title: 'AI-Powered Training Insights',
    description: 'Ask natural questions about your workouts, sleep, HRV, stress, and recovery. Get concise, data-backed answers.',
  },
  {
    icon: LayoutDashboard,
    title: 'Clean Activity Dashboard',
    description: 'See recent activities, weekly summaries, and health metric trends in a minimal, focused interface.',
  },
];

const stats = [
  { icon: Watch, label: 'Activities', value: 'Real-time' },
  { icon: Heart, label: 'HRV & Stress', value: 'Tracked' },
  { icon: Moon, label: 'Sleep Quality', value: 'Analyzed' },
  { icon: Zap, label: 'Training Load', value: 'Monitored' },
];

export function LandingPage() {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      <Navbar />
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-container px-4 py-20 sm:py-28">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mx-auto max-w-2xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-3 py-1 text-xs text-neutral-600 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-400">
              <Activity className="h-3 w-3 text-accent-500" />
              Powered by MissingMCP & Groq AI
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 sm:text-5xl">
              Chat with your <span className="text-accent-600 dark:text-accent-400">Garmin data.</span>
            </h1>
            <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-400">
              Connect Garmin securely and ask AI about your training, sleep, recovery, and progress.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link to="/signup" className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-neutral-900 px-6 text-base font-medium text-white transition-all hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200">
                Get started <ArrowRight className="h-4 w-4" />
              </Link>
              <a href="#how-it-works" className="inline-flex h-12 items-center justify-center rounded-xl border border-neutral-200 px-6 text-base font-medium text-neutral-700 transition-colors hover:bg-neutral-100 dark:border-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-900">
                See how it works
              </a>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="mx-auto mt-16 grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col items-center gap-2 rounded-xl border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900">
                <stat.icon className="h-5 w-5 text-accent-500" />
                <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100">{stat.value}</span>
                <span className="text-xs text-neutral-500 dark:text-neutral-400">{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>
      <section id="how-it-works" className="border-t border-neutral-200 dark:border-neutral-800">
        <div className="mx-auto max-w-container px-4 py-20">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">Everything you need</h2>
            <p className="mt-2 text-neutral-600 dark:text-neutral-400">Three core capabilities, built for athletes who want answers.</p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            {features.map((feature, i) => (
              <motion.div key={feature.title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }} className="rounded-xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-50 dark:bg-accent-950">
                  <feature.icon className="h-5 w-5 text-accent-600 dark:text-accent-400" />
                </div>
                <h3 className="mt-4 font-semibold text-neutral-900 dark:text-neutral-100">{feature.title}</h3>
                <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <footer className="border-t border-neutral-200 dark:border-neutral-800">
        <div className="mx-auto max-w-container px-4 py-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex items-center gap-2">
              <Activity className="h-4 w-4 text-accent-500" />
              <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100">Garmin Chat</span>
            </div>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">AI insights are informational, not medical advice.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
