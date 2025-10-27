# Supabase Setup Verification Checklist

## ✅ What's Already Included in Supabase

Supabase **automatically creates and manages** these tables - **you don't need to create them**:

- ✅ `auth.users` - User accounts (already exists)
- ✅ `auth.sessions` - Active user sessions (already exists)
- ✅ `auth.refresh_tokens` - Session refresh tokens (already exists)

These are built-in authentication tables that Supabase manages for you.

## ✅ What YOU Need to Create

**Only ONE table** needs to be created:

### `forecasts` Table

Run this SQL in your Supabase SQL Editor:

```sql
-- Create forecasts table
CREATE TABLE IF NOT EXISTS forecasts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  historical_data JSONB NOT NULL,
  forecast_data JSONB NOT NULL,
  metrics JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_forecasts_user_id ON forecasts(user_id);
CREATE INDEX IF NOT EXISTS idx_forecasts_created_at ON forecasts(created_at DESC);

-- Enable Row Level Security
ALTER TABLE forecasts ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (safe to run multiple times)
DROP POLICY IF EXISTS "Users can read own forecasts" ON forecasts;
DROP POLICY IF EXISTS "Users can insert own forecasts" ON forecasts;
DROP POLICY IF EXISTS "Users can update own forecasts" ON forecasts;
DROP POLICY IF EXISTS "Users can delete own forecasts" ON forecasts;

-- Create RLS policies for users to manage their own forecasts
CREATE POLICY "Users can read own forecasts"
  ON forecasts FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own forecasts"
  ON forecasts FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own forecasts"
  ON forecasts FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own forecasts"
  ON forecasts FOR DELETE
  USING (auth.uid() = user_id);
```

## 🔧 Environment Variables

Make sure your `frontend/.env.local` file has the NEW credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-new-anon-key
```

## 📋 Complete Setup Steps

### Step 1: Verify New Credentials
1. Go to your Supabase project dashboard
2. Navigate to **Settings** → **API**
3. Copy your **Project URL** and **anon/public key**
4. Update `frontend/.env.local` with these values

### Step 2: Create the Forecasts Table
1. In Supabase dashboard, go to **SQL Editor**
2. Click **New Query**
3. Copy and paste the SQL above
4. Click **Run** (or press Ctrl/Cmd + Enter)
5. You should see "Success" message

### Step 3: Verify Setup
1. **Check the table exists**: Go to **Table Editor** → You should see `forecasts` table
2. **Check RLS**: Go to **Table Editor** → `forecasts` → Settings → RLS should be enabled
3. **Check policies**: Go to **Authentication** → **Policies** → Should see 4 policies

## ✅ How Authentication Works

1. **User Registration/Login** → Managed by Supabase (no code needed)
2. **Session Management** → Automatic by Supabase SDK
3. **User ID** → Automatically retrieved via `auth.uid()`
4. **RLS Policies** → Automatically enforce user isolation

## 🧪 Testing

After setup, test the flow:

1. **Start your app**:
   ```bash
   cd frontend
   npm run dev
   ```

2. **Register a new user** (or login if you have one)

3. **Upload a CSV** via the dashboard

4. **Check Supabase**:
   - Go to **Table Editor** → `forecasts` 
   - You should see your forecast data

5. **View in app**: Click "My Results" in the navbar

## ⚠️ Common Issues

### Issue: "relation auth.users does not exist"
**Solution**: You're using the wrong Supabase credentials. Double-check your environment variables.

### Issue: "permission denied for table forecasts"
**Solution**: RLS policies not set up. Run the SQL above to create policies.

### Issue: "column user_id does not exist"
**Solution**: Run the CREATE TABLE SQL to create the forecasts table.

### Issue: Can't see data in "My Results"
**Solution**: 
- Check that the forecast was saved (check Supabase dashboard)
- Check browser console for errors
- Verify RLS policies are enabled

## ✨ Summary

- ✅ **Auth tables**: Automatically managed by Supabase (no action needed)
- ✅ **forecasts table**: You need to create this ONE table
- ✅ **Environment variables**: Update with new credentials
- ✅ **RLS policies**: Included in the SQL above

You're ready to go! Just create the `forecasts` table and update your credentials.

