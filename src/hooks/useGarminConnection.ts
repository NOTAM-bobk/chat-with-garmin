import { useCallback, useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import type { GarminConnection } from '@/types';

export function useGarminConnection() {
  const [connection, setConnection] = useState<GarminConnection | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchConnection = useCallback(async () => {
    const { data } = await supabase
      .from('garmin_connections')
      .select('*')
      .order('updated_at', { ascending: false })
      .limit(1)
      .maybeSingle();
    setConnection(data as GarminConnection | null);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchConnection();
  }, [fetchConnection]);

  const status: 'connected' | 'disconnected' | 'expired' =
    connection?.status === 'connected' ? 'connected' :
    connection?.status === 'expired' ? 'expired' : 'disconnected';

  const connect = async () => {
    const redirectUrl = `${window.location.origin}/dashboard?garmin=connecting`;
    window.location.href = `https://missingmcp.com/garmin/mcp/authorize?redirect_uri=${encodeURIComponent(redirectUrl)}`;
  };

  const handleCallback = async (sessionRef: string) => {
    await supabase.from('garmin_connections').upsert({
      status: 'connected',
      mcp_session_reference: sessionRef,
      connected_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });
    await fetchConnection();
  };

  const disconnect = async () => {
    if (connection) {
      await supabase
        .from('garmin_connections')
        .update({ status: 'disconnected', mcp_session_reference: null, updated_at: new Date().toISOString() })
        .eq('id', connection.id);
    }
    await fetchConnection();
  };

  return { connection, status, loading, connect, disconnect, handleCallback, refresh: fetchConnection };
}
