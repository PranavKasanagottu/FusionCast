# 🚀 FusionCast Quick Start Guide

Get FusionCast running in 5 minutes!

## Prerequisites Checklist
- [ ] Python 3.10+ installed
- [ ] Node.js 18+ installed
- [ ] Supabase account created

## Step 1: Backend (Django) - 2 minutes

```bash
cd backend

# Create virtual environment (optional but recommended)
python -m venv backend_venv

# Activate virtual environment
# Windows:
backend_venv\Scripts\activate
# Linux/Mac:
source backend_venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run migrations
python manage.py migrate

# Start server
python manage.py runserver
```

✅ Backend running at `http://127.0.0.1:8000`

## Step 2: Frontend (Next.js) - 2 minutes

**Open a NEW terminal:**

```bash
cd frontend

# Install dependencies
npm install

# Create environment file
# Windows:
type nul > .env.local
# Linux/Mac:
touch .env.local
```

**Add these lines to `.env.local`:**

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

**Get Supabase credentials:**
1. Go to https://app.supabase.com
2. Create a new project (or use existing)
3. Go to **Settings** → **API**
4. Copy **Project URL** and **anon public key**
5. Paste into `.env.local`

**Setup database:**
1. Go to **SQL Editor** in Supabase
2. Copy and paste the SQL from `README.md` section "Step 3.4 Setup Supabase Database"
3. Click **Run**

**Start frontend:**
```bash
npm run dev
```

✅ Frontend running at `http://localhost:3000`

## Step 3: Test It! - 1 minute

1. Open `http://localhost:3000`
2. Click "Register here"
3. Create an account
4. Go to Dashboard → Upload Data
5. Upload a CSV file (see `sample_data.csv` for format)
6. View your forecast!

---

## 💡 Sample Data Format

Create a CSV file with:
```csv
date,sales
2023-01-01,100
2023-01-02,120
2023-01-03,110
...
```

Minimum 30 days of data required.

---

## 🆘 Need Help?

- Check the main `README.md` for detailed instructions
- Ensure both servers are running (Django + Next.js)
- Check browser console for errors
- Verify Supabase credentials are correct

---

**That's it! You're ready to forecast! 🎉**

