export interface Profile {
  id: string;
  email: string;
  created_at: string;
}

export interface GarminConnection {
  id: string;
  user_id: string;
  status: 'connected' | 'expired' | 'disconnected';
  mcp_session_reference: string | null;
  connected_at: string | null;
  updated_at: string;
}

export interface Chat {
  id: string;
  user_id: string;
  title: string;
  created_at: string;
}

export interface Message {
  id: string;
  chat_id: string;
  user_id: string;
  role: 'user' | 'assistant';
  content: string;
  tool_calls?: ToolCall[] | null;
  created_at: string;
}

export interface ToolCall {
  name: string;
  arguments: Record<string, unknown>;
  result?: string;
  status?: 'pending' | 'executing' | 'completed' | 'error';
}

export interface GarminTool {
  name: string;
  description: string;
  inputSchema: Record<string, unknown>;
}

export interface GarminActivity {
  id: string;
  name: string;
  type: string;
  date: string;
  duration: number;
  distance: number;
  calories: number;
  avg_hr?: number;
  max_hr?: number;
}

export interface HealthMetric {
  date: string;
  value: number;
  label: string;
  unit: string;
}
