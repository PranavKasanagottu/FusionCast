# 🚀 FusionCast — Intelligent Demand Forecasting Platform

FusionCast is an advanced demand forecasting web application built using **Next.js** and **Django** that integrates deep learning-based forecasting models to enhance prediction accuracy and interpretability.  
It aims to improve upon the original **MCDFN (Multi-Channel Deep Forecasting Network)** model by fusing multiple data sources and applying advanced neural architectures for smarter, adaptive demand forecasting.

---

## 🧠 Project Description

The goal of **FusionCast** is to revolutionize how businesses forecast demand by combining **data-driven modeling**, **AI-powered predictions**, and **interactive visualizations**.  
Traditional models often fail to capture complex, multi-factor relationships influencing demand — FusionCast bridges that gap through advanced model fusion and explainable insights.

### Key Features
- 📊 Multi-source data integration (sales, inventory, pricing, promotions, weather, etc.)  
- 🧠 Deep learning-based forecasting with cross-channel fusion (MCDFN model)
- 🧩 Modular architecture supporting future AI model upgrades (TFT, LSTM, LightGBM hybrids)  
- 🌐 Interactive Next.js interface for real-time charting and analysis  
- 📈 30-day forecasting with detailed metrics and visualization
- 🔐 User authentication and saved forecasts via Supabase
- 💾 Persistent forecast storage for analysis and comparison

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Python 3.10+** ([Download](https://www.python.org/downloads/))
- **Node.js 18+** and **npm** ([Download](https://nodejs.org/))
- **Supabase Account** ([Sign up](https://supabase.com)) - Free tier available

---

## ⚙️ Setup Instructions

### Step 1: Clone the Repository

```bash
git clone https://github.com/yourusername/FusionCast.git
cd FusionCast
```

### Step 2: Backend Setup (Django)

#### 2.1 Navigate to Backend Directory

```bash
cd backend
```

#### 2.2 Create Virtual Environment (Optional but recommended)

**Windows:**
```bash
python -m venv backend_venv
backend_venv\Scripts\activate
```

**Linux/Mac:**
```bash
python3 -m venv backend_venv
source backend_venv/bin/activate
```

#### 2.3 Install Dependencies

```bash
pip install -r requirements.txt
```

#### 2.4 Run Database Migrations

```bash
python manage.py migrate
```

#### 2.5 Start Django Server

```bash
python manage.py runserver
```

The backend API will be available at `http://127.0.0.1:8000`

---

### Step 3: Frontend Setup (Next.js)

#### 3.1 Open New Terminal and Navigate to Frontend

```bash
cd frontend
```

#### 3.2 Install Dependencies

```bash
npm install
```

#### 3.3 Configure Supabase Environment Variables

Create a `.env.local` file in the `frontend` directory:

```bash
# Windows
type nul > .env.local

# Linux/Mac
touch .env.local
```

Add your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

**Where to find these:**
1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Select your project (or create a new one)
3. Go to **Settings** → **API**
4. Copy **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
5. Copy **anon public key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

#### 3.4 Setup Supabase Database

In your Supabase SQL Editor, run this SQL:

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

-- Create indexes
CREATE INDEX idx_forecasts_user_id ON forecasts(user_id);
CREATE INDEX idx_forecasts_created_at ON forecasts(created_at DESC);

-- Enable Row Level Security
ALTER TABLE forecasts ENABLE ROW LEVEL SECURITY;

-- Create policies
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

#### 3.5 Start Development Server

```bash
npm run dev
```

The frontend will be available at `http://localhost:3000`

---

## 🎯 Running the Application

### Start Both Servers

You need to run **both** the Django backend and Next.js frontend simultaneously:

**Terminal 1 (Backend):**
```bash
cd backend
python manage.py runserver
```

**Terminal 2 (Frontend):**
```bash
cd frontend
npm run dev
```

### Access the Application

1. Open your browser and navigate to `http://localhost:3000`
2. Register a new account or login with existing credentials
3. Upload a CSV file with sales data
4. View your forecast results

---

## 📊 Data Format Requirements

### CSV File Format

Your CSV file must have:
- **Date column**: Named `date`, `Date`, `timestamp`, or `time` (case-insensitive)
- **Sales column**: Named `sales` or `Sales` (case-insensitive)
- **Minimum 30 days** of historical data

### Example CSV:
```csv
date,sales
2023-01-01,100
2023-01-02,120
2023-01-03,110
...
```

### Supported Date Formats:
- YYYY-MM-DD (e.g., `2023-01-01`)
- MM/DD/YYYY (e.g., `01/01/2023`)
- DD-MM-YYYY (e.g., `01-01-2023`)
- Any pandas-readable date format

---

## 🏗️ Model Architecture

The MCDFN (Multi-Channel Deep Forecasting Network) model uses:

### Model Features:
- **4 Parallel Channels**:
  1. CNN (Convolutional Neural Network)
  2. BiLSTM (Bidirectional LSTM)
  3. BiGRU (Bidirectional GRU)
  4. Stacked LSTM with Dropout

### Input Features:
- Sales data (target)
- 8 cyclic temporal features (month, day, week, year sin/cos)
- Holiday indicator

### Output:
- **30-day forecast** with predicted sales values
- **Metrics**: Average, peak, min, trend percentage
- **Visualization**: Interactive charts and tables

---

## 🔁 SDLC Methodology — Agile

FusionCast is developed using the Agile Software Development Life Cycle (SDLC) approach.
This methodology supports continuous improvement and rapid iteration throughout the project lifecycle.

### 🌀 Agile Workflow:

- **Planning** — Define project goals, features, and datasets.  
- **Design** — Develop UI wireframes, system flow diagrams, and architecture drafts.  
- **Development** — Implement backend APIs, frontend components, and model training scripts. 
- **Testing** — Sprint reviews, retrospectives, and backlog updates. 
- **Review & Feedback** — Compares results with baselines like MCDFN and classical models.
- **Deployment** — Deploy to staging and production environments with CI/CD pipelines.

---

## 🔧 API Endpoints

### Backend (Django)

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/predict/` | POST | Generate forecast from CSV file |
| `/api/upload-csv/` | POST | Upload and validate CSV file |
| `/admin/` | GET | Django admin panel |

### Request Format

**POST `/api/predict/`**
```javascript
// Request
FormData {
  file: <CSV file>
}

// Response
{
  "status": "success",
  "historical": {
    "dates": ["2023-01-01", ...],
    "sales": [100, 120, ...]
  },
  "forecast": {
    "dates": ["2023-08-01", ...],
    "sales": [150.5, 155.2, ...]
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

---

## 🛠️ Tech Stack

### Backend
- **Django 5.2.7** - Web framework
- **TensorFlow 2.20.0** - Deep learning model
- **Pandas 2.3.3** - Data processing
- **NumPy 2.2.6** - Numerical operations
- **Scikit-learn 1.0.0** - Data preprocessing
- **Holidays 0.34** - Holiday detection

### Frontend
- **Next.js 15.5.3** - React framework
- **React 19.1.0** - UI library
- **Tailwind CSS 4** - Styling
- **Supabase JS 2.76.1** - Database & Auth
- **Lucide React** - Icons

---

## 📚 Dependencies

### Backend (`backend/requirements.txt`)
```
Django==5.2.7
django-cors-headers==4.9.0
pandas==2.3.3
numpy==2.2.6
tensorflow==2.20.0
sklearn==1.0.0
holidays==0.34
```

### Frontend (`frontend/package.json`)
- Next.js, React, Tailwind CSS
- Supabase Client
- Lucide React

---

## 🐛 Troubleshooting

### Issue: "Module not found" errors
**Solution**: Install dependencies
```bash
cd backend && pip install -r requirements.txt
cd frontend && npm install
```

### Issue: CORS errors
**Solution**: Check Django settings has `CORS_ALLOW_ALL_ORIGINS = True` in `backend/backend/settings.py`

### Issue: "Model file not found"
**Solution**: Ensure `mcdfn_model.keras` exists in `backend/` directory

### Issue: Supabase connection errors
**Solution**: 
1. Verify `.env.local` exists in `frontend/` directory
2. Check Supabase credentials are correct
3. Ensure database tables are created (see Step 3.4)

### Issue: "Need at least 30 days of historical data"
**Solution**: Ensure your CSV has at least 30 rows of data

---

## 🚀 Deployment

### Production Considerations:
1. Set `DEBUG = False` in Django settings
2. Configure `ALLOWED_HOSTS` with your domain
3. Set up environment variables securely
4. Use PostgreSQL instead of SQLite
5. Deploy frontend to Vercel or similar
6. Deploy backend to AWS/Heroku/Railway

---

## 📚 References
- Md Abrar Jahin, Asef Shahriar (2024). MCDFN: Supply Chain Demand Forecasting via an Explainable Multi-Channel Data Fusion Network Model 
- Lim, B., & Zohdy, M. A. (2020). Temporal Fusion Transformers for Interpretable Multi-horizon Time Series Forecasting.  
- Next.js Documentation — https://nextjs.org/docs
- TensorFlow Documentation — https://www.tensorflow.org/
- Supabase Documentation — https://supabase.com/docs

---

## 👥 Contributors

| Name | Role | GitHub Profile |
|------|------|---------------|
| MKN Sai Varun | Application Developer | MKN-Sai-Varun |
| K Pranav | Application Developer | PranavKasanagottu |
| G Balasai Sri Manikanta | Model Architect | balasai14 |
| K Preetham Reddy | Model Architect | K-Preetham-Reddy |


---

**Happy Forecasting! 🎉**
