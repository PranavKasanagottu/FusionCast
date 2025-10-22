// 'use client';

// import { useState } from 'react';
// import { User, Mail, Calendar, Edit2, Save, X } from 'lucide-react';
// import styles from './Profile.module.css'; // Import the CSS module

// export default function ProfilePage({ userData }) {
//   const [user, setUser] = useState(userData || {
//     name: 'John Doe',
//     email: 'john.doe@example.com',
//     joinDate: 'January 2025'
//   });

//   const [isEditing, setIsEditing] = useState(false);
//   const [formData, setFormData] = useState({
//     name: user.name,
//     email: user.email,
//     joinDate: user.joinDate
//   });

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleSave = () => {
//     setUser(formData);
//     setIsEditing(false);
//     // Here you would typically send the updated data to your backend
//     console.log('Saving profile:', formData);
//   };

//   const handleCancel = () => {
//     setFormData({
//       name: user.name,
//       email: user.email,
//       joinDate: user.joinDate
//     });
//     setIsEditing(false);
//   };

//   return (
//     <div className={styles.profileContainer}>
//       <div className={styles.profileCard}>
//         <div className={styles.header}>
//           <h2 className={styles.mainHeading}>
//             <User className={styles.mainIcon} />
//             Profile Information
//           </h2>
//           {!isEditing && (
//             <button
//               onClick={() => setIsEditing(true)}
//               className={styles.editButton}
//             >
//               <Edit2 className={styles.editButtonIcon} />
//               <span className={styles.editButtonText}>Edit Profile</span>
//             </button>
//           )}
//         </div>

//         {/* Profile Avatar */}
//         <div className={styles.avatarSection}>
//           <div className={styles.avatarWrapper}>
//             <div className={styles.avatar}>
//               {formData.name.charAt(0).toUpperCase()}
//             </div>
//             <div className={styles.avatarStatusDot}></div>
//           </div>
//         </div>

//         {/* Profile Fields */}
//         <div className={styles.fieldsContainer}>
//           {/* Name Field */}
//           <div>
//             <label className={styles.fieldLabel}>
//               Full Name
//             </label>
//             {isEditing ? (
//               <input
//                 type="text"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 className={styles.inputField}
//                 placeholder="Enter your full name"
//               />
//             ) : (
//               <div className={styles.displayField}>
//                 <User className={styles.displayFieldIcon} />
//                 <span className={styles.displayFieldText}>{formData.name}</span>
//               </div>
//             )}
//           </div>

//           {/* Email Field */}
//           <div>
//             <label className={styles.fieldLabel}>
//               Email Address
//             </label>
//             {isEditing ? (
//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 className={styles.inputField}
//                 placeholder="Enter your email"
//               />
//             ) : (
//               <div className={styles.displayField}>
//                 <Mail className={styles.displayFieldIcon} />
//                 <span className={styles.displayFieldText}>{formData.email}</span>
//               </div>
//             )}
//           </div>

//           {/* Join Date */}
//           <div>
//             <label className={styles.fieldLabel}>
//               Member Since
//             </label>
//             <div className={styles.displayField}>
//               <Calendar className={styles.displayFieldIcon} />
//               <span className={styles.displayFieldText}>{formData.joinDate}</span>
//             </div>
//           </div>
//         </div>

//         {/* Action Buttons (Edit Mode) */}
//         {isEditing && (
//           <div className={styles.actionButtonsContainer}>
//             <button
//               onClick={handleSave}
//               className={styles.saveButton}
//             >
//               <Save className={styles.navItemIcon} />
//               <span className={styles.editButtonText}>Save Changes</span>
//             </button>
//             <button
//               onClick={handleCancel}
//               className={styles.cancelButton}
//             >
//               <X className={styles.navItemIcon} />
//               <span className={styles.editButtonText}>Cancel</span>
//             </button>
//           </div>
//         )}

//         {/* Additional Info */}
//         <div className={`${styles.sectionSeparator} ${styles.sectionSeparatorPt6}`}>
//           <h3 className={styles.sectionHeading}>
//             Account Statistics
//           </h3>
//           <div className={styles.statsGrid}>
//             <div className={`${styles.statCard} ${styles.forecastsCard}`}>
//               <p className={`${styles.statValue} ${styles.forecastsValue}`}>12</p>
//               <p className={styles.statLabel}>Forecasts Run</p>
//             </div>
//             <div className={`${styles.statCard} ${styles.datasetsCard}`}>
//               <p className={`${styles.statValue} ${styles.datasetsValue}`}>8</p>
//               <p className={styles.statLabel}>Datasets Uploaded</p>
//             </div>
//           </div>
//         </div>

//         {/* Recent Activity */}
//         <div className={styles.sectionSeparatorMt6}>
//           <h3 className={styles.sectionHeading}>
//             Recent Activity
//           </h3>
//           <div className={styles.listSpaceY3}>
//             <div className={styles.listItem}>
//               <span className={styles.activityLabel}>Last Login</span>
//               <span className={styles.activityValue}>Today, 10:30 AM</span>
//             </div>
//             <div className={styles.listItem}>
//               <span className={styles.activityLabel}>Last Forecast</span>
//               <span className={styles.activityValue}>2 days ago</span>
//             </div>
//             <div className={styles.listItem}>
//               <span className={styles.activityLabel}>Account Created</span>
//               <span className={styles.activityValue}>{formData.joinDate}</span>
//             </div>
//           </div>
//         </div>

//         {/* Account Settings */}
//         <div className={`${styles.sectionSeparator} ${styles.sectionSeparatorPt6}`}>
//           <h3 className={styles.sectionHeading}>
//             Account Settings
//           </h3>
//           <div className={styles.listSpaceY3}>
//             <button className={styles.listItemButton}>
//               <span className={styles.settingLabel}>Change Password</span>
//               <span className={styles.settingActionBlue}>Update</span>
//             </button>
//             <button className={styles.listItemButton}>
//               <span className={styles.settingLabel}>Email Notifications</span>
//               <span className={styles.settingActionGreen}>Enabled</span>
//             </button>
//             <button className={styles.listItemButton}>
//               <span className={styles.settingLabel}>Two-Factor Authentication</span>
//               <span className={styles.settingActionGray}>Disabled</span>
//             </button>
//           </div>
//         </div>

//         {/* Danger Zone */}
//         <div className={`${styles.sectionSeparator} ${styles.sectionSeparatorPt6} ${styles.sectionSeparatorBorderRed}`}>
//           <h3 className={`${styles.sectionHeading} ${styles.dangerZoneHeading}`}>
//             Danger Zone
//           </h3>
//           <button className={styles.dangerButton}>
//             Delete Account
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// 'use client';

// import { useState, useEffect } from 'react';
// import { User, Mail, Calendar, Edit2, Save, X } from 'lucide-react';
// import { supabase } from '../../../../lib/supabaseClient';
// import styles from './Profile.module.css';

// export default function Profile({ user, setUser }) {
//   const [isEditing, setIsEditing] = useState(false);
//   const [formData, setFormData] = useState({
//     name: user.name,
//     email: user.email,
//     joinDate: user.joinDate || new Date().toLocaleDateString(),
//   });

//   useEffect(() => {
//     // Sync formData when user updates
//     setFormData({
//       name: user.name,
//       email: user.email,
//       joinDate: user.joinDate || new Date().toLocaleDateString(),
//     });
//   }, [user]);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSave = async () => {
//     // Update Supabase user metadata
//     const { data, error } = await supabase.auth.updateUser({
//       data: { username: formData.name }
//     });

//     if (error) {
//       alert(error.message);
//       return;
//     }

//     // Update local state
//     setUser({ ...user, name: formData.name, email: formData.email });
//     setIsEditing(false);
//     alert('Profile updated successfully!');
//   };

//   const handleCancel = () => {
//     setFormData({ name: user.name, email: user.email, joinDate: user.joinDate });
//     setIsEditing(false);
//   };

//   return (
//     <div className={styles.profileContainer}>
//       <div className={styles.profileCard}>
//         <div className={styles.header}>
//           <h2 className={styles.mainHeading}>
//             <User className={styles.mainIcon} />
//             Profile Information
//           </h2>
//           {!isEditing && (
//             <button
//               onClick={() => setIsEditing(true)}
//               className={styles.editButton}
//             >
//               <Edit2 className={styles.editButtonIcon} />
//               <span className={styles.editButtonText}>Edit Profile</span>
//             </button>
//           )}
//         </div>

//         {/* Profile Avatar */}
//         <div className={styles.avatarSection}>
//           <div className={styles.avatarWrapper}>
//             <div className={styles.avatar}>
//               {formData.name.charAt(0).toUpperCase()}
//             </div>
//             <div className={styles.avatarStatusDot}></div>
//           </div>
//         </div>

//         {/* Profile Fields */}
//         <div className={styles.fieldsContainer}>
//           {/* Name Field */}
//           <div>
//             <label className={styles.fieldLabel}>
//               Full Name
//             </label>
//             {isEditing ? (
//               <input
//                 type="text"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 className={styles.inputField}
//                 placeholder="Enter your full name"
//               />
//             ) : (
//               <div className={styles.displayField}>
//                 <User className={styles.displayFieldIcon} />
//                 <span className={styles.displayFieldText}>{formData.name}</span>
//               </div>
//             )}
//           </div>

//           {/* Email Field */}
//           <div>
//             <label className={styles.fieldLabel}>
//               Email Address
//             </label>
//             {isEditing ? (
//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 className={styles.inputField}
//                 placeholder="Enter your email"
//               />
//             ) : (
//               <div className={styles.displayField}>
//                 <Mail className={styles.displayFieldIcon} />
//                 <span className={styles.displayFieldText}>{formData.email}</span>
//               </div>
//             )}
//           </div>

//           {/* Join Date */}
//           <div>
//             <label className={styles.fieldLabel}>
//               Member Since
//             </label>
//             <div className={styles.displayField}>
//               <Calendar className={styles.displayFieldIcon} />
//               <span className={styles.displayFieldText}>{formData.joinDate}</span>
//             </div>
//           </div>
//         </div>

//         {/* Action Buttons (Edit Mode) */}
//         {isEditing && (
//           <div className={styles.actionButtonsContainer}>
//             <button
//               onClick={handleSave}
//               className={styles.saveButton}
//             >
//               <Save className={styles.navItemIcon} />
//               <span className={styles.editButtonText}>Save Changes</span>
//             </button>
//             <button
//               onClick={handleCancel}
//               className={styles.cancelButton}
//             >
//               <X className={styles.navItemIcon} />
//               <span className={styles.editButtonText}>Cancel</span>
//             </button>
//           </div>
//         )}

//         {/* Additional Info */}
//         <div className={`${styles.sectionSeparator} ${styles.sectionSeparatorPt6}`}>
//           <h3 className={styles.sectionHeading}>
//             Account Statistics
//           </h3>
//           <div className={styles.statsGrid}>
//             <div className={`${styles.statCard} ${styles.forecastsCard}`}>
//               <p className={`${styles.statValue} ${styles.forecastsValue}`}>12</p>
//               <p className={styles.statLabel}>Forecasts Run</p>
//             </div>
//             <div className={`${styles.statCard} ${styles.datasetsCard}`}>
//               <p className={`${styles.statValue} ${styles.datasetsValue}`}>8</p>
//               <p className={styles.statLabel}>Datasets Uploaded</p>
//             </div>
//           </div>
//         </div>

//         {/* Recent Activity */}
//         <div className={styles.sectionSeparatorMt6}>
//           <h3 className={styles.sectionHeading}>
//             Recent Activity
//           </h3>
//           <div className={styles.listSpaceY3}>
//             <div className={styles.listItem}>
//               <span className={styles.activityLabel}>Last Login</span>
//               <span className={styles.activityValue}>Today, 10:30 AM</span>
//             </div>
//             <div className={styles.listItem}>
//               <span className={styles.activityLabel}>Last Forecast</span>
//               <span className={styles.activityValue}>2 days ago</span>
//             </div>
//             <div className={styles.listItem}>
//               <span className={styles.activityLabel}>Account Created</span>
//               <span className={styles.activityValue}>{formData.joinDate}</span>
//             </div>
//           </div>
//         </div>

//         {/* Account Settings */}
//         <div className={`${styles.sectionSeparator} ${styles.sectionSeparatorPt6}`}>
//           <h3 className={styles.sectionHeading}>
//             Account Settings
//           </h3>
//           <div className={styles.listSpaceY3}>
//             <button className={styles.listItemButton}>
//               <span className={styles.settingLabel}>Change Password</span>
//               <span className={styles.settingActionBlue}>Update</span>
//             </button>
//             <button className={styles.listItemButton}>
//               <span className={styles.settingLabel}>Email Notifications</span>
//               <span className={styles.settingActionGreen}>Enabled</span>
//             </button>
//             <button className={styles.listItemButton}>
//               <span className={styles.settingLabel}>Two-Factor Authentication</span>
//               <span className={styles.settingActionGray}>Disabled</span>
//             </button>
//           </div>
//         </div>

//         {/* Danger Zone */}
//         <div className={`${styles.sectionSeparator} ${styles.sectionSeparatorPt6} ${styles.sectionSeparatorBorderRed}`}>
//           <h3 className={`${styles.sectionHeading} ${styles.dangerZoneHeading}`}>
//             Danger Zone
//           </h3>
//           <button className={styles.dangerButton}>
//             Delete Account
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }


'use client';

import { useState, useEffect } from 'react';
import { User, Mail, Calendar, Edit2, Save, X } from 'lucide-react';
import { supabase } from '../../../../lib/supabaseClient';
import styles from './Profile.module.css';

export default function Profile({ user, setUser }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    joinDate: user.joinDate || new Date().toLocaleDateString(),
  });
  const [lastLogin, setLastLogin] = useState(null);

  useEffect(() => {
    // Sync formData when user updates
    setFormData({
      name: user.name,
      email: user.email,
      joinDate: user.joinDate || new Date().toLocaleDateString(),
    });

    // Fetch Supabase user for last login
    const fetchLastLogin = async () => {
      const { data: { user: supabaseUser }, error } = await supabase.auth.getUser();

      if (error) {
        console.log('Error fetching user:', error.message);
        return;
      }

      if (supabaseUser) {
        setLastLogin(supabaseUser.last_sign_in_at);
        // Optional: keep formData synced with Supabase username/email
        setFormData((prev) => ({
          ...prev,
          name: supabaseUser.user_metadata?.username || supabaseUser.email,
          email: supabaseUser.email,
        }));
      }
    };

    fetchLastLogin();
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    // Update Supabase user metadata
    const { data, error } = await supabase.auth.updateUser({
      data: { username: formData.name }
    });

    if (error) {
      alert(error.message);
      return;
    }

    // Update local state
    setUser({ ...user, name: formData.name, email: formData.email });
    setIsEditing(false);
    alert('Profile updated successfully!');
  };

  const handleCancel = () => {
    setFormData({ name: user.name, email: user.email, joinDate: user.joinDate });
    setIsEditing(false);
  };

  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileCard}>
        <div className={styles.header}>
          <h2 className={styles.mainHeading}>
            <User className={styles.mainIcon} />
            Profile Information
          </h2>
          {!isEditing && (
            <button onClick={() => setIsEditing(true)} className={styles.editButton}>
              <Edit2 className={styles.editButtonIcon} />
              <span className={styles.editButtonText}>Edit Profile</span>
            </button>
          )}
        </div>

        {/* Profile Avatar */}
        <div className={styles.avatarSection}>
          <div className={styles.avatarWrapper}>
            <div className={styles.avatar}>
              {formData.name.charAt(0).toUpperCase()}
            </div>
            <div className={styles.avatarStatusDot}></div>
          </div>
        </div>

        {/* Profile Fields */}
        <div className={styles.fieldsContainer}>
          {/* Name */}
          <div>
            <label className={styles.fieldLabel}>Full Name</label>
            {isEditing ? (
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={styles.inputField}
                placeholder="Enter your full name"
              />
            ) : (
              <div className={styles.displayField}>
                <User className={styles.displayFieldIcon} />
                <span className={styles.displayFieldText}>{formData.name}</span>
              </div>
            )}
          </div>

          {/* Email */}
          <div>
            <label className={styles.fieldLabel}>Email Address</label>
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={styles.inputField}
                placeholder="Enter your email"
              />
            ) : (
              <div className={styles.displayField}>
                <Mail className={styles.displayFieldIcon} />
                <span className={styles.displayFieldText}>{formData.email}</span>
              </div>
            )}
          </div>

          {/* Join Date */}
          <div>
            <label className={styles.fieldLabel}>Member Since</label>
            <div className={styles.displayField}>
              <Calendar className={styles.displayFieldIcon} />
              <span className={styles.displayFieldText}>{formData.joinDate}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        {isEditing && (
          <div className={styles.actionButtonsContainer}>
            <button onClick={handleSave} className={styles.saveButton}>
              <Save className={styles.navItemIcon} />
              <span className={styles.editButtonText}>Save Changes</span>
            </button>
            <button onClick={handleCancel} className={styles.cancelButton}>
              <X className={styles.navItemIcon} />
              <span className={styles.editButtonText}>Cancel</span>
            </button>
          </div>
        )}

        {/* Additional Info */}
        <div className={`${styles.sectionSeparator} ${styles.sectionSeparatorPt6}`}>
          <h3 className={styles.sectionHeading}>Account Statistics</h3>
          <div className={styles.statsGrid}>
            <div className={`${styles.statCard} ${styles.forecastsCard}`}>
              <p className={`${styles.statValue} ${styles.forecastsValue}`}>12</p>
              <p className={styles.statLabel}>Forecasts Run</p>
            </div>
            <div className={`${styles.statCard} ${styles.datasetsCard}`}>
              <p className={`${styles.statValue} ${styles.datasetsValue}`}>8</p>
              <p className={styles.statLabel}>Datasets Uploaded</p>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className={styles.sectionSeparatorMt6}>
          <h3 className={styles.sectionHeading}>Recent Activity</h3>
          <div className={styles.listSpaceY3}>
            <div className={styles.listItem}>
              <span className={styles.activityLabel}>Last Login</span>
              <span className={styles.activityValue}>
                {lastLogin ? new Date(lastLogin).toLocaleString() : 'Loading...'}
              </span>
            </div>
            <div className={styles.listItem}>
              <span className={styles.activityLabel}>Last Forecast</span>
              <span className={styles.activityValue}>2 days ago</span>
            </div>
            <div className={styles.listItem}>
              <span className={styles.activityLabel}>Account Created</span>
              <span className={styles.activityValue}>{formData.joinDate}</span>
            </div>
          </div>
        </div>
        {/* Account Settings */}
         <div className={`${styles.sectionSeparator} ${styles.sectionSeparatorPt6}`}>
           <h3 className={styles.sectionHeading}>
             Account Settings
           </h3>
           <div className={styles.listSpaceY3}>
             <button className={styles.listItemButton}>
               <span className={styles.settingLabel}>Change Password</span>
               <span className={styles.settingActionBlue}>Update</span>
             </button>
             <button className={styles.listItemButton}>
               <span className={styles.settingLabel}>Email Notifications</span>
               <span className={styles.settingActionGreen}>Enabled</span>
             </button>
             <button className={styles.listItemButton}>
               <span className={styles.settingLabel}>Two-Factor Authentication</span>
               <span className={styles.settingActionGray}>Disabled</span>
             </button>
           </div>
         </div>
        {/* Danger Zone */}
        <div className={`${styles.sectionSeparator} ${styles.sectionSeparatorPt6} ${styles.sectionSeparatorBorderRed}`}>
          <h3 className={`${styles.sectionHeading} ${styles.dangerZoneHeading}`}>Danger Zone</h3>
          <button className={styles.dangerButton}>Delete Account</button>
        </div>

      </div>
    </div>
    

    // </div>
  );
}
