# chat-with-garmin
# Garmin Chat — AI Prompt

Build a complete, production-ready web app called **Garmin Chat**.  
It lets a user securely connect their Garmin account through **MissingMCP’s Garmin MCP server**, then chat with their own Garmin fitness and health data using AI.

The app must be deployable to **Vercel via GitHub**, use free-tier services, and have a clean, minimal, Vercel-inspired UI.

---

## Core Product

Create a personal AI dashboard where users can:

- Connect their Garmin account through MissingMCP.
- Chat naturally with their Garmin data.
- Ask questions about workouts, sleep, HRV, stress, training load, recovery, and trends.
- See a minimal dashboard with recent activities and health metrics.
- Disconnect Garmin and delete their session data.

Example user questions:

- “Summarize my last 7 days of training.”
- “How did my sleep affect my runs this week?”
- “What were my three hardest workouts this month?”
- “Show my HRV trend for the past 30 days.”
- “Am I showing signs of overtraining?”
- “Compare this week’s mileage to last week.”

---

## Required Tech Stack

Use this exact stack:

- **Next.js 14+ App Router**
- **TypeScript**
- **Tailwind CSS**
- **shadcn/ui-style components** or clean custom components
- **Vercel**
- **Supabase** for authentication, user profiles, chat history, and Garmin connection state
- **MissingMCP Garmin MCP server** at `https://missingmcp.com/garmin/mcp`
- **MCP TypeScript SDK** for connecting to the MCP server from backend API routes
- **Groq API** as the default AI provider, with optional support for **OpenRouter** and **Mistral**
- **Recharts** for charts
- **Lucide React** for icons
- **Framer Motion** for subtle animations

### AI Provider Requirements

Use a provider abstraction so the AI provider can be switched through environment variables.

Supported providers:

1. **Groq** — default provider  
2. **OpenRouter** — optional fallback  
3. **Mistral** — optional fallback  

Use tool/function calling where supported.

The provider selection must work like this:

```env
AI_PROVIDER=groq
```

Valid values:

```env
AI_PROVIDER=groq
AI_PROVIDER=openrouter
AI_PROVIDER=mistral
```

Use these environment variables:

```env
GROQ_API_KEY=
OPENROUTER_API_KEY=
MISTRAL_API_KEY=
```

Recommended default model:

```env
GROQ_MODEL=llama-3.3-70b-versatile
```

For OpenRouter and Mistral, make the model configurable through environment variables:

```env
OPENROUTER_MODEL=
MISTRAL_MODEL=
```

Do not put API keys, Garmin credentials, MCP tokens, or session data in frontend code.  
All AI and MCP calls must happen in Next.js server routes or server actions.

---

## Garmin Connection Flow

Implement this exact flow:

1. User creates an account or signs in with Supabase Auth.
2. On the dashboard, user clicks **Connect Garmin**.
3. Backend redirects the user to MissingMCP’s Garmin authorization/login flow.
4. User signs in to Garmin and completes Garmin 2FA, including SMS/email verification if required.
5. MissingMCP returns an authorized MCP session.
6. Backend securely stores only the user’s internal ID and the encrypted MCP/session reference in Supabase.
7. User is redirected back to the dashboard.
8. Dashboard shows **Garmin connected**.
9. User can now chat with their Garmin data.
10. User can click **Disconnect Garmin**, which removes the stored session reference and related chat data if requested.

Important requirements:

- Never collect Garmin passwords or 2FA codes directly in the app.
- Use MissingMCP’s hosted Garmin login flow.
- Handle expired Garmin sessions gracefully.
- If a Garmin session expires, show a clear reconnect prompt.
- Store chat messages in Supabase with row-level security so users can only access their own chats.
- Add a loading state during Garmin connection and during AI responses.

---

## MCP + AI Chat Flow

Implement a real MCP client integration:

1. After Garmin is connected, call the MissingMCP MCP endpoint from a backend route.
2. List the available Garmin MCP tools.
3. Convert the MCP tool definitions into the selected AI provider’s tool-calling format.
4. When the user sends a chat message:
   - Send conversation history and available Garmin tools to the selected AI provider.
   - If the AI requests a Garmin tool, execute that MCP tool through MissingMCP.
   - Return the MCP result to the AI.
   - Have the AI generate a concise, helpful final response.
   - Save both the user message and final assistant response to Supabase.
5. Support multi-turn conversation.
6. If a tool call fails, show a friendly error and suggest reconnecting Garmin if appropriate.

The AI must:

- Use only returned Garmin data for factual claims.
- Say when it does not have enough data.
- Prefer concise, useful answers.
- Include relevant numbers, dates, and trends.
- Avoid medical diagnoses.
- Add a small disclaimer: “AI insights are informational, not medical advice.”

---

## Pages and Routes

Build these pages:

### 1. Landing Page — `/`

Minimal marketing page with:

- App name: **Garmin Chat**
- Headline: “Chat with your Garmin data.”
- Subheadline: “Connect Garmin securely and ask AI about your training, sleep, recovery, and progress.”
- Primary CTA: **Get started**
- Secondary CTA: **See how it works**
- Three feature cards:
  - Secure Garmin connection
  - AI-powered training insights
  - Clean activity dashboard
- Simple footer

### 2. Auth Pages

- `/login`
- `/signup`

Use Supabase email/password auth for the first version.  
Include clean form validation and helpful error states.

### 3. Dashboard — `/dashboard`

Only accessible when logged in.

Include:

- Top navigation with app name, user email/avatar, and logout.
- Garmin connection status card.
- If not connected: large **Connect Garmin** button.
- If connected:
  - Recent activities list or cards.
  - Weekly training summary.
  - Sleep, HRV, stress, and recovery metric cards where data is available.
  - Simple line or bar charts.
  - Button to open AI chat.

Use skeleton loaders while data is loading.  
Show clean empty states if Garmin data is unavailable.

### 4. Chat Page — `/chat`

Full-page chat interface with:

- Left sidebar: recent chats and new chat button.
- Main area: message thread.
- Bottom input with send button.
- Suggested prompt chips:
  - “Summarize my last 7 days”
  - “How is my recovery?”
  - “What were my best workouts this month?”
  - “Show my sleep trends”
- Streaming or progressive response display if practical.
- Tool-call status indicator, such as “Checking your Garmin activities…”
- Copy button for AI responses.
- New chat button.
- Chat history loaded from Supabase.

### 5. Settings Page — `/settings`

Include:

- Garmin connection status.
- Connect / reconnect / disconnect Garmin buttons.
- Account email.
- AI provider status.
- Delete chat history button.
- Sign out button.
- Short privacy explanation.

---

## UI Design Direction

Make the UI feel like a polished Vercel-style developer product:

- Background: near-white `#fafafa` in light mode and near-black `#0a0a0a` in dark mode.
- Cards: subtle borders, very light shadows, rounded corners around `12px–16px`.
- Typography: Inter or Geist.
- Accent color: minimal blue or violet; avoid loud gradients.
- Layout: generous whitespace, clear hierarchy, max-width around `1200px`.
- Buttons: solid black or white primary buttons with subtle hover transitions.
- Use small badges for connection status:
  - Green: Connected
  - Gray: Not connected
  - Amber: Reconnect required
- Charts should be minimal, with no unnecessary gridlines.
- Mobile-first responsive design.
- Include dark mode toggle.
- Add subtle Framer Motion animations:
  - Fade/slide-in cards on page load.
  - Smooth hover states.
  - Animated connection status.
  - Message entrance animation in chat.
  - Respect `prefers-reduced-motion`.

Do not make it look like a generic fitness template.  
It should feel modern, calm, technical, and premium.

---

## Database Schema

Create Supabase tables:

```sql
profiles (
  id uuid primary key references auth.users,
  email text,
  created_at timestamp
);

garmin_connections (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users,
  status text, -- connected, expired, disconnected
  mcp_session_reference text,
  connected_at timestamp,
  updated_at timestamp
);

chats (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users,
  title text,
  created_at timestamp
);

messages (
  id uuid primary key default gen_random_uuid(),
  chat_id uuid references chats,
  user_id uuid references auth.users,
  role text, -- user or assistant
  content text,
  tool_calls jsonb,
  created_at timestamp
);
```

Enable row-level security so each user can only read and write their own records.

---

## Environment Variables

Create a `.env.example` file with these variables:

```env
# App
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# MissingMCP Garmin
MISSINGMCP_GARMIN_URL=[https://missingmcp.com/garmin/mcp](https://missingmcp.com/garmin/mcp)

# AI provider: groq, openrouter, or mistral
AI_PROVIDER=groq

# Groq
GROQ_API_KEY=
GROQ_MODEL=llama-3.3-70b-versatile

# OpenRouter
OPENROUTER_API_KEY=
OPENROUTER_MODEL=

# Mistral
MISTRAL_API_KEY=
MISTRAL_MODEL=
```

---

## Backend API Routes

Create backend routes for:

- `POST /api/auth/callback`
- `GET /api/garmin/connect`
- `GET /api/garmin/callback`
- `POST /api/garmin/disconnect`
- `GET /api/garmin/status`
- `GET /api/garmin/tools`
- `POST /api/chat`
- `GET /api/chats`
- `GET /api/chats/[chatId]`
- `DELETE /api/chats/[chatId]`

All Garmin MCP and AI provider calls must happen server-side.

---

## Deliverables

Provide a complete project with:

- Full Next.js file structure.
- All frontend pages and components.
- Backend API routes for:
  - Starting Garmin connection
  - Handling Garmin/MCP callback
  - Listing Garmin MCP tools
  - Sending chat messages
  - Executing MCP tool calls
  - Disconnecting Garmin
- Supabase SQL migration file.
- Tailwind design tokens.
- Reusable components:
  - Button
  - Card
  - Badge
  - Input
  - ChatMessage
  - ChatInput
  - MetricCard
  - ActivityCard
  - ChartCard
  - ConnectionStatus
  - EmptyState
  - LoadingSkeleton
- README with:
  - Local setup
  - Supabase setup
  - MissingMCP setup
  - Groq / OpenRouter / Mistral setup
  - GitHub upload
  - Vercel deployment
  - Environment variable instructions

---

## Build Order

Build in this order:

1. Project setup, Tailwind, design system, and layout.
2. Supabase auth and protected dashboard route.
3. Garmin connection UI and backend callback flow.
4. MCP client integration and tool listing.
5. AI provider abstraction using Groq, OpenRouter, or Mistral.
6. Tool-calling chat system.
7. Chat history and multi-turn conversation.
8. Dashboard metrics and charts.
9. Settings, disconnect flow, and error handling.
10. Polish animations, empty states, mobile responsiveness, dark mode, and accessibility.

---

## Quality Requirements

- TypeScript strict mode.
- No hardcoded secrets.
- No unused dependencies.
- Accessible buttons, labels, and focus states.
- Responsive from 360px to desktop.
- Fast initial load.
- Clean, readable code with small components.
- Production-ready folder structure.
- Ready to push directly to GitHub and deploy on Vercel.

Start by generating the complete project structure, then implement each feature fully.  
Do not create placeholder fake Garmin data in the final chat flow; use real MissingMCP MCP tool calls once the user connects Garmin.  
You may use clearly labeled mock data only for initial UI development.
