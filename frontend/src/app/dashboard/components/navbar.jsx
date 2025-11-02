// 'use client';

// import { useState } from 'react';
// import { Home, User, Upload, Database, LogOut, Menu, X } from 'lucide-react';
// import styles from './Navbar.module.css'; // Import the CSS module

// export default function Navbar({ user, activeSection, setActiveSection }) {
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

//   const navItems = [
//     { id: 'home', name: 'Home', icon: Home },
//     { id: 'upload', name: 'Upload Data', icon: Upload },
//     { id: 'profile', name: 'Profile', icon: User },
//     { id: 'modelInfo', name: 'Model Info', icon: Database },
//   ];

//   const handleLogout = () => {
//     window.location.href = '/login';
//   };

//   return (
//     <nav className={styles.navbarContainer}>
//       <div className={styles.contentWrapper}>
//         <div className={styles.navFlex}>
//           <h1 className={styles.logo}>
//             MCDFN
//           </h1>

//           {/* Desktop Menu */}
//           <div className={styles.desktopMenu}>
//             {navItems.map((item) => (
//               <button
//                 key={item.id}
//                 onClick={() => setActiveSection(item.id)}
//                 className={`${styles.navItem} ${
//                   activeSection === item.id
//                     ? styles.navItemActive
//                     : styles.navItemInactive
//                 }`}
//               >
//                 <item.icon className={styles.navItemIcon} />
//                 {item.name}
//               </button>
//             ))}

//             <div className={styles.userActions}>
//               <span className={styles.userName}>{user.name}</span>
//               <button
//                 onClick={handleLogout}
//                 className={styles.logoutButton}
//               >
//                 <LogOut className={styles.navItemIcon} style={{ marginRight: 0 }} />
//                 <span>Logout</span>
//               </button>
//             </div>
//           </div>

//           {/* Mobile Menu Button */}
//           <div className= "md:hidden">
//             <button
//               onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//               className={styles.mobileMenuButton}
//             >
//               {mobileMenuOpen ? <X className={styles.mobileMenuIcon} /> : <Menu className={styles.mobileMenuIcon} />}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Menu Dropdown */}
//       {mobileMenuOpen && (
//         <div className={styles.mobileMenuDropdown}>
//           <div className={styles.mobileMenuNavList}>
//             {navItems.map((item) => (
//               <button
//                 key={item.id}
//                 onClick={() => {
//                   setActiveSection(item.id);
//                   setMobileMenuOpen(false);
//                 }}
//                 className={`${styles.mobileNavItem} ${
//                   activeSection === item.id
//                     ? styles.mobileNavItemActive
//                     : styles.mobileNavItemInactive
//                 }`}
//               >
//                 <item.icon className={styles.navItemIcon} />
//                 {item.name}
//               </button>
//             ))}

//             <button
//               onClick={handleLogout}
//               className={styles.mobileLogoutButton}
//             >
//               <LogOut className={styles.navItemIcon} />
//               Logout
//             </button>
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// }

'use client';

import { useState } from 'react';
import { Home, User, Upload, Database, LogOut, Menu, X, BarChart3 } from 'lucide-react';
import { supabase } from '../../../../lib/supabaseClient';
import { useRouter } from 'next/navigation';
import ThemeToggle from '../../../../components/ThemeToggle';
import styles from './Navbar.module.css';

export default function Navbar({ user, activeSection, setActiveSection }) {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', name: 'Home', icon: Home },
    { id: 'upload', name: 'Upload Data', icon: Upload },
    { id: 'results', name: 'My Results', icon: BarChart3 },
    { id: 'profile', name: 'Profile', icon: User },
    { id: 'modelInfo', name: 'Model Info', icon: Database },
  ];

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  return (
    <nav className={styles.navbarContainer}>
      <div className={styles.contentWrapper}>
        <div className={styles.navFlex}>
          <h1 className={styles.logo}>MCDFN</h1>

          {/* Desktop Menu */}
          <div className={styles.desktopMenu}>
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`${styles.navItem} ${
                  activeSection === item.id
                    ? styles.navItemActive
                    : styles.navItemInactive
                }`}
              >
                <item.icon className={styles.navItemIcon} />
                {item.name}
              </button>
            ))}

            <div className={styles.userActions}>
              <ThemeToggle />
              <span className={styles.userName}>Welcome, {user.name || 'Guest'}</span>
              <button onClick={handleLogout} className={styles.logoutButton}>
                <LogOut className={styles.navItemIcon} style={{ marginRight: 0 }} />
                <span>Logout</span>
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={styles.mobileMenuButton}
            >
              {mobileMenuOpen ? (
                <X className={styles.mobileMenuIcon} />
              ) : (
                <Menu className={styles.mobileMenuIcon} />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className={styles.mobileMenuDropdown}>
          <div className={styles.mobileMenuNavList}>
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveSection(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`${styles.mobileNavItem} ${
                  activeSection === item.id
                    ? styles.mobileNavItemActive
                    : styles.mobileNavItemInactive
                }`}
              >
                <item.icon className={styles.navItemIcon} />
                {item.name}
              </button>
            ))}

            <button onClick={handleLogout} className={styles.mobileLogoutButton}>
              <LogOut className={styles.navItemIcon} />
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
