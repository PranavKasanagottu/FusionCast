'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Brain, BarChart3, Shield, ArrowRight, TrendingUp } from 'lucide-react';
import { supabase } from '../../../lib/supabaseClient';
import styles from './landing.module.css';

export default function LandingPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is already authenticated
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setIsAuthenticated(true);
        router.push('/dashboard');
      } else {
        setIsLoading(false);
      }
    };
    checkAuth();
  }, [router]);

  const handleGetStarted = () => {
    router.push('/login');
  };

  const handleLearnMore = () => {
    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
  };

  if (isLoading) {
    return null;
  }

  return (
    <div className={styles.landingContainer}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <div className={styles.heroText}>
            <div className={styles.badge}>
              <TrendingUp size={16} />
              <span>AI-Powered Forecasting</span>
            </div>
            <h1 className={styles.heroTitle}>
              FusionCast
            </h1>
            <p className={styles.heroTagline}>
              Intelligent Demand Forecasting Powered by AI
            </p>
            <p className={styles.heroSubtitle}>
              Transform your business decisions with advanced deep learning models. 
              Get accurate 30-day demand forecasts with interactive visualizations and explainable insights.
            </p>
            <div className={styles.heroButtons}>
              <button onClick={handleGetStarted} className={styles.primaryButton}>
                Get Started
                <ArrowRight size={20} />
              </button>
              <button onClick={handleLearnMore} className={styles.secondaryButton}>
                Learn More
              </button>
            </div>
          </div>
          <div className={styles.heroVisual}>
            <div className={styles.visualCard}>
              <div className={styles.visualIcon}>
                <Brain size={48} />
              </div>
              <div className={styles.visualText}>
                <h3>MCDFN Model</h3>
                <p>Multi-Channel Deep Forecasting Network</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className={styles.featuresSection}>
        <div className={styles.featuresContainer}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Why Choose FusionCast?</h2>
            <p className={styles.sectionSubtitle}>
              Powerful features designed to give you the competitive edge
            </p>
          </div>
          
          <div className={styles.featuresGrid}>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <Brain size={32} />
              </div>
              <h3 className={styles.featureTitle}>AI-Powered Forecasting</h3>
              <p className={styles.featureDescription}>
                Leverage advanced deep learning with our MCDFN model that combines CNN, BiLSTM, BiGRU, 
                and Stacked LSTM architectures for superior accuracy. Get 30-day forecasts with confidence.
              </p>
            </div>

            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <BarChart3 size={32} />
              </div>
              <h3 className={styles.featureTitle}>Interactive Visualizations</h3>
              <p className={styles.featureDescription}>
                Explore your data with beautiful, interactive charts and dashboards. 
                Compare historical trends with forecasts, analyze metrics, and make data-driven decisions instantly.
              </p>
            </div>

            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <Shield size={32} />
              </div>
              <h3 className={styles.featureTitle}>Secure & Reliable</h3>
              <p className={styles.featureDescription}>
                Your data is protected with enterprise-grade security. Enjoy persistent forecast storage, 
                user authentication, and reliable performance backed by modern cloud infrastructure.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.footerSection}>
            <h3 className={styles.footerTitle}>FusionCast</h3>
            <p className={styles.footerText}>
              Revolutionizing demand forecasting with AI
            </p>
          </div>
          
          <div className={styles.footerSection}>
            <h4 className={styles.footerHeading}>Quick Links</h4>
            <div className={styles.footerLinks}>
              <button onClick={() => router.push('/login')} className={styles.footerLink}>
                Login
              </button>
              <button onClick={() => router.push('/register')} className={styles.footerLink}>
                Register
              </button>
            </div>
          </div>
          
          <div className={styles.footerSection}>
            <h4 className={styles.footerHeading}>Contributors</h4>
            <p className={styles.footerText}>
              MKN Sai Varun • K Pranav<br />
              G Balasai Sri Manikanta • K Preetham Reddy
            </p>
          </div>
        </div>
        
        <div className={styles.footerBottom}>
          <p className={styles.copyright}>
            © {new Date().getFullYear()} FusionCast. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
