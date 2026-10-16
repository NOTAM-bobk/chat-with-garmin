import { Link, useNavigate } from 'react-router-dom';
import { Activity, LogOut, Moon, Sun, Settings } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';

export function Navbar() {
  const { user, signOut } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-40 border-b border-neutral-200 bg-white/80 backdrop-blur-md dark:border-neutral-800 dark:bg-neutral-950/80">
      <div className="mx-auto flex h-14 max-w-container items-center justify-between px-4">
        <Link to={user ? '/dashboard' : '/'} className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-accent-500" />
          <span className="font-semibold text-neutral-900 dark:text-neutral-100">Garmin Chat</span>
        </Link>

        <div className="flex items-center gap-1">
          <button
            onClick={toggleTheme}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-neutral-500 transition-colors hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
          </button>

          {user ? (
            <>
              <Link
                to="/settings"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-neutral-500 transition-colors hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800"
                aria-label="Settings"
              >
                <Settings className="h-4 w-4" />
              </Link>
              <button
                onClick={handleSignOut}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-neutral-500 transition-colors hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800"
                aria-label="Sign out"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="inline-flex h-9 items-center justify-center rounded-lg px-4 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800"
              >
                Sign in
              </Link>
              <Link
                to="/signup"
                className="inline-flex h-9 items-center justify-center rounded-lg bg-neutral-900 px-4 text-sm font-medium text-white transition-colors hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200"
              >
                Get started
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
