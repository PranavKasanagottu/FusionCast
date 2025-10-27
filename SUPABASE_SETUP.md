# Supabase Setup Instructions

## Database Schema

You need to create a `forecasts` table in your Supabase database with the following schema:

### SQL to Run in Supabase SQL Editor

```sql
-- Create forecasts table
CREATE TABLE forecasts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  historical_data JSONB NOT NULL,
  forecast_data JSONB NOT NULL,
  metrics JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX idx_forecasts_user_id ON forecasts(user_id);
CREATE INDEX idx_forecasts_created_at ON forecasts(created_at DESC);

-- Enable Row Level Security
ALTER TABLE forecasts ENABLE ROW LEVEL SECURITY;

-- Create policy for users to read their own forecasts
CREATE POLICY "Users can read own forecasts"
  ON forecasts
  FOR SELECT
  USING (auth.uid() = user_id);

-- Create policy for users to insert their own forecasts
CREATE POLICY "Users can insert own forecasts"
  ON forecasts
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Create policy for users to update their own forecasts
CREATE POLICY "Users can update own forecasts"
  ON forecasts
  FOR UPDATE
  USING (auth.uid() = user_id);

-- Create policy for users to delete their own forecasts
CREATE POLICY "Users can delete own forecasts"
  ON forecasts
  FOR DELETE
  USING (auth.uid() = user_id);
```

## How to Set Up

1. Go to your Supabase project dashboard
2. Navigate to the SQL Editor
3. Copy and paste the SQL above
4. Click "Run" to execute the SQL

## Table Structure

### Fields:

- `id` (UUID): Primary key, auto-generated
- `user_id` (UUID): Foreign key to auth.users, identifies the owner
- `name` (TEXT): Name/identifier for the forecast
- `historical_data` (JSONB): Historical sales data with dates and values
- `forecast_data` (JSONB): Forecast data with dates and predicted values
- `metrics` (JSONB): Calculated metrics (average, max, min, trend)
- `created_at` (TIMESTAMP): When the forecast was created

### Example JSON Structure:

```json
{
  "historical_data": {
    "dates": ["2023-01-01", "2023-01-02", ...],
    "sales": [100, 120, ...]
  },
  "forecast_data": {
    "dates": ["2023-02-01", "2023-02-02", ...],
    "sales": [150, 155, ...]
  },
  "metrics": {
    "forecast_change_percent": 5.2,
    "average_historical": 120.5,
    "average_forecast": 157.8,
    "max_forecast": 180.0,
    "min_forecast": 140.0
  }
}
```

## Environment Variables

Make sure your `.env.local` file in the frontend directory has:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Testing

After setup, you can test by:
1. Logging into the application
2. Uploading a CSV file
3. Generating a forecast
4. The forecast should be saved automatically
5. Navigate to "My Results" to see saved forecasts

