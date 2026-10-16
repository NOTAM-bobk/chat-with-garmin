import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, Trash2, LogOut, Mail, Cpu, AlertCircle } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useGarminConnection } from '@/hooks/useGarminConnection';
import { supabase } from '@/lib/supabase';
import { Navbar } from '@/components/Navbar';
import { ConnectionStatus } from '@/components/ui/ConnectionStatus';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

export function SettingsPage() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { status, connect, disconnect, loading } = useGarminConnection();
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const handleDeleteChats = async () => {
    setDeleteLoading(true); setDeleteError(null);
    try { const { error } = await supabase.from('chats').delete().neq('id', '00000000-0000-0000-0000-000000000000'); if (error) throw error; }
    catch { setDeleteError('Failed to delete chat history.'); }
    finally { setDeleteLoading(false); }
  };
  const handleSignOut = async () => { await signOut(); navigate('/'); };
  if (!user) { navigate('/login'); return null; }

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      <Navbar />
      <div className="mx-auto max-w-2xl px-4 py-8">
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">Settings</h1>
          <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">Manage your account and Garmin connection.</p>
        </motion.div>
        <motion.section initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.05 }} className="mt-6">
          <h2 className="mb-3 text-sm font-medium text-neutral-900 dark:text-neutral-100">Garmin Connection</h2>
          <ConnectionStatus status={status} onConnect={connect} onDisconnect={disconnect} loading={loading} />
        </motion.section>
        <motion.section initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.1 }} className="mt-6">
          <h2 className="mb-3 text-sm font-medium text-neutral-900 dark:text-neutral-100">Account</h2>
          <div className="rounded-xl border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-neutral-100 dark:bg-neutral-800"><Mail className="h-5 w-5 text-neutral-500" /></div>
              <div><p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">{user.email}</p><p className="text-xs text-neutral-500 dark:text-neutral-400">Email address</p></div>
            </div>
          </div>
        </motion.section>
        <motion.section initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.15 }} className="mt-6">
          <h2 className="mb-3 text-sm font-medium text-neutral-900 dark:text-neutral-100">AI Provider</h2>
          <div className="rounded-xl border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-neutral-100 dark:bg-neutral-800"><Cpu className="h-5 w-5 text-neutral-500" /></div>
              <div className="flex-1"><p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">Groq</p><p className="text-xs text-neutral-500 dark:text-neutral-400">llama-3.3-70b-versatile</p></div>
              <Badge variant="connected">Active</Badge>
            </div>
          </div>
        </motion.section>
        <motion.section initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.2 }} className="mt-6">
          <h2 className="mb-3 text-sm font-medium text-neutral-900 dark:text-neutral-100">Data Management</h2>
          <div className="space-y-3">
            {deleteError && (<div className="flex items-center gap-2 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600 dark:bg-red-950 dark:text-red-400"><AlertCircle className="h-4 w-4 shrink-0" /><span>{deleteError}</span></div>)}
            <div className="flex items-center justify-between rounded-xl border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-50 dark:bg-red-950"><Trash2 className="h-5 w-5 text-red-500" /></div>
                <div><p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">Delete chat history</p><p className="text-xs text-neutral-500 dark:text-neutral-400">Remove all your conversations</p></div>
              </div>
              <Button variant="danger" size="sm" onClick={handleDeleteChats} loading={deleteLoading}>Delete</Button>
            </div>
          </div>
        </motion.section>
        <motion.section initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.25 }} className="mt-6">
          <h2 className="mb-3 text-sm font-medium text-neutral-900 dark:text-neutral-100">Privacy</h2>
          <div className="rounded-xl border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900">
            <div className="flex items-start gap-3">
              <Shield className="mt-0.5 h-5 w-5 shrink-0 text-accent-500" />
              <div className="space-y-1">
                <p className="text-sm text-neutral-700 dark:text-neutral-300">Your Garmin credentials are handled securely through MissingMCP and never stored in our database.</p>
                <p className="text-sm text-neutral-700 dark:text-neutral-300">Chat messages are stored in Supabase with row-level security — only you can access your data.</p>
                <p className="text-sm text-neutral-700 dark:text-neutral-300">AI providers receive only the conversation context needed to answer your questions.</p>
              </div>
            </div>
          </div>
        </motion.section>
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.3 }} className="mt-6 flex justify-end">
          <Button variant="outline" onClick={handleSignOut} className="gap-2"><LogOut className="h-4 w-4" />Sign out</Button>
        </motion.div>
      </div>
    </div>
  );
}
