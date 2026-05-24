//ตั้งค่า supabase
import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://ylspghescsvpotxwrziy.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlsc3BnaGVzY3N2cG90eHdyeml5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk2MjUwNTUsImV4cCI6MjA5NTIwMTA1NX0.DxI8YVdpYnH5blv58fltytNSxeyJpiLZ9vYp4jfX59o'
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)