import { createClient } from '@supabase/supabase-js';
import { browser } from '$app/environment';

const supabaseUrl =
	import.meta.env.VITE_SUPABASE_URL || 'https://dqooabpikiranbzbxeoj.supabase.co';
const supabaseAnonKey =
	import.meta.env.VITE_SUPABASE_ANON_KEY ||
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRxb29hYnBpa2lyYW5iemJ4ZW9qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA1MDAxMjQsImV4cCI6MjA5NjA3NjEyNH0.9xdmnQEtsbIPTQGQIjAfmW5A6DeavJHUW6mQyK75Wns';

export const supabase = browser ? createClient(supabaseUrl, supabaseAnonKey) : null;














// import { createClient } from '@supabase/supabase-js';

// const supabaseUrl =
// 	import.meta.env.VITE_SUPABASE_URL || 'https://dqooabpikiranbzbxeoj.supabase.co';
// const supabaseAnonKey =
// 	import.meta.env.VITE_SUPABASE_ANON_KEY ||
// 	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRxb29hYnBpa2lyYW5iemJ4ZW9qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA1MDAxMjQsImV4cCI6MjA5NjA3NjEyNH0.9xdmnQEtsbIPTQGQIjAfmW5A6DeavJHUW6mQyK75Wns';

// export const supabase = createClient(supabaseUrl, supabaseAnonKey);
