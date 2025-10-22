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
import Navbar from './components/Navbar';
import Upload from './components/upload';
import Profile from './components/profile';
import ModelInfo from './components/modelInfo';
import { supabase } from '../../../lib/supabaseClient'; // Make sure this import exists
import { useRouter } from 'next/navigation';
import styles from './page.module.css'; 

export default function DashboardPage() {
  const router = useRouter();

  const [activeSection, setActiveSection] = useState('home');
  const [user, setUser] = useState({ name: '', email: '' }); // <-- user state added

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user: supabaseUser }, error } = await supabase.auth.getUser();

      if (error) {
        console.error(error);
        return;
      }

      if (!supabaseUser) {
        router.push('/login'); // redirect if not logged in
        return;
      }

      setUser({
        name: supabaseUser.user_metadata?.username || 'User',
        email: supabaseUser.email,
      });
    };

    fetchUser();
  }, [router]);

  const renderSection = () => {
    switch (activeSection) {
      case 'upload':
        return <Upload />;
      case 'profile':
        return <Profile user={user} setUser={setUser} />;
      case 'modelInfo':
        return <ModelInfo />;
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

  return (
    <div className={styles.dashboardContainer}>
      <Navbar user={user} activeSection={activeSection} setActiveSection={setActiveSection} />
      <main className={styles.mainContent}>
        <div className={styles.contentWrapper}>{renderSection()}</div>
      </main>
    </div>
  );
}

