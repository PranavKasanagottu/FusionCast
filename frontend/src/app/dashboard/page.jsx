// 'use client';

// import { useState } from 'react';
// import Navbar from './components/Navbar';
// import Upload from './components/upload';
// import Profile from './components/profile';
// import ModelInfo from './components/modelInfo';
// import styles from './page.module.css'; // Import the CSS module

// export default function DashboardPage() {
//   const [activeSection, setActiveSection] = useState('home');

//   const [user, setUser] = useState({
//     name: 'John Doe',
//     email: 'john.doe@example.com',
//     joinDate: 'January 2025',
//   });

//   const renderSection = () => {
//     switch (activeSection) {
//       case 'upload':
//         return <Upload />;
//       case 'profile':
//         return <Profile user={user} setUser={setUser} />;
//       case 'modelInfo':
//         return <ModelInfo />;
//       default:
//         return (
//           // Use the class from page.module.css
//           <div className={styles.homeSection}>
//             {/* Use the class from page.module.css */}
//             <h1 className={styles.homeHeading}>
//               Welcome to the MCDFN Forecasting Dashboard 👋
//             </h1>
//             {/* Use the class from page.module.css */}
//             <p className={styles.homeParagraph}>
//               Upload your time-series CSV file, view explainable deep learning forecasts,
//               and manage your profile — all in one place.
//             </p>
//           </div>
//         );
//     }
//   };

//   return (
//     // Use the class from page.module.css
//     <div className={styles.dashboardContainer}>
//       {/* Navbar - remains the same as it's a separate component */}
//       <Navbar user={user} activeSection={activeSection} setActiveSection={setActiveSection} />

//       {/* Section Content */}
//       {/* Use the class from page.module.css */}
//       <main className={styles.mainContent}>
//         {/* Use the class from page.module.css */}
//         <div className={styles.contentWrapper}>{renderSection()}</div>
//       </main>
//     </div>
//   );
// }

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from './components/Navbar';
import Upload from './components/upload';
import Profile from './components/profile';
import ModelInfo from './components/modelInfo';
import Results from './components/results';
import SavedResults from './components/savedResults';
import { supabase } from '../../../lib/supabaseClient';
import styles from './page.module.css'; 

export default function DashboardPage() {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState('home');
  const [user, setUser] = useState({ name: '', email: '' });
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check URL parameters for section and data
    const params = new URLSearchParams(window.location.search);
    const sectionParam = params.get('section');
    if (sectionParam === 'results') {
      setActiveSection('results');
    }
  }, []);

  useEffect(() => {
    let mounted = true;

    const checkAuth = async () => {
      try {
        // Get current session
        const { data: { session }, error } = await supabase.auth.getSession();

        if (!mounted) return;

        if (error || !session) {
          console.log('No session found, redirecting to login...');
          // Keep loading state - don't set isAuthenticated to false
          // Just redirect and keep showing loading
          setIsLoading(true);
          router.replace('/login');
          return;
        }

        // User is authenticated
        const supabaseUser = session.user;
        setIsAuthenticated(true);
        setUser({
          name: supabaseUser.user_metadata?.username || supabaseUser.email?.split('@')[0] || 'User',
          email: supabaseUser.email || '',
        });
        setIsLoading(false);
      } catch (err) {
        if (!mounted) return;
        console.error('Auth check error:', err);
        setIsLoading(true); // Keep loading
        router.replace('/login');
      }
    };

    checkAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!mounted) return;

      if (!session) {
        setIsLoading(true); // Keep showing loading during redirect
        router.replace('/login');
      } else {
        setIsAuthenticated(true);
        setUser({
          name: session.user.user_metadata?.username || session.user.email?.split('@')[0] || 'User',
          email: session.user.email || '',
        });
        setIsLoading(false);
      }
    });

    return () => {
      mounted = false;
      subscription?.unsubscribe();
    };
  }, [router]);

  const renderSection = () => {
    switch (activeSection) {
      case 'upload':
        return <Upload />;
      case 'profile':
        return <Profile user={user} setUser={setUser} />;
      case 'modelInfo':
        return <ModelInfo />;
      case 'results':
        // Check if we have data in URL (individual forecast) or show saved results
        const params = new URLSearchParams(window.location.search);
        const dataParam = params.get('data');
        
        if (dataParam) {
          // Show individual forecast result
          return <Results />;
        } else {
          // Show list of saved results
          return <SavedResults />;
        }
      default:
        return (
          <div className={styles.homeSection}>
            <h1 className={styles.homeHeading}>
              Welcome to the MCDFN Forecasting Dashboard 👋
            </h1>
            <p className={styles.homeParagraph}>
              Upload your time-series CSV file, view explainable deep learning forecasts,
              and manage your profile — all in one place.
            </p>
          </div>
        );
    }
  };

  // NEVER render dashboard content if not authenticated
  // This check MUST come before any dashboard rendering
  if (!isAuthenticated) {
    // Show loading while we redirect
    return (
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        backgroundColor: 'var(--background, #ffffff)'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ 
            border: '4px solid #f3f3f3',
            borderTop: '4px solid #6366f1',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 16px'
          }}></div>
          <p style={{ color: '#6b7280' }}>Checking authentication...</p>
          <style jsx>{`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      </div>
    );
  }

  // Show loading only after we know user is authenticated
  if (isLoading) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        backgroundColor: 'var(--background, #ffffff)'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ 
            border: '4px solid #f3f3f3',
            borderTop: '4px solid #6366f1',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 16px'
          }}></div>
          <p style={{ color: '#6b7280' }}>Loading dashboard...</p>
          <style jsx>{`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.dashboardContainer}>
      <Navbar user={user} activeSection={activeSection} setActiveSection={setActiveSection} />
      <main className={styles.mainContent}>
        <div className={styles.contentWrapper}>{renderSection()}</div>
      </main>
    </div>
  );
}

