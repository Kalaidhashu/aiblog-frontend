// import React, { useState } from 'react';
// import { useAuth } from '../context/AuthContext';
// import { FiUser, FiMail, FiSave, FiCamera } from 'react-icons/fi';
// import toast from 'react-hot-toast';

// const ProfilePage = () => {
//     const { user, updateProfile } = useAuth();
//     const [formData, setFormData] = useState({
//         username: user?.username || '',
//         email: user?.email || '',
//         currentPassword: '',
//         newPassword: '',
//         confirmPassword: '',
//     });
//     const [loading, setLoading] = useState(false);

//     const handleChange = (e) => {
//         setFormData({
//             ...formData,
//             [e.target.name]: e.target.value,
//         });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
        
//         if (formData.newPassword && formData.newPassword !== formData.confirmPassword) {
//             toast.error('New passwords do not match');
//             return;
//         }

//         setLoading(true);
//         const updateData = {
//             username: formData.username,
//             email: formData.email,
//         };
        
//         if (formData.newPassword) {
//             updateData.password = formData.newPassword;
//         }
        
//         const success = await updateProfile(updateData);
//         setLoading(false);
        
//         if (success) {
//             setFormData({
//                 ...formData,
//                 currentPassword: '',
//                 newPassword: '',
//                 confirmPassword: '',
//             });
//         }
//     };

//     return (
//         <div className="profile-page fade-in">
//             <div className="profile-container">
//                 <div className="profile-header">
//                     <div className="profile-avatar">
//                         <div className="avatar-large">
//                             {user?.username?.[0]?.toUpperCase()}
//                         </div>
//                         <button className="change-avatar-btn">
//                             <FiCamera />
//                         </button>
//                     </div>
//                     <h1>Profile Settings</h1>
//                     <p>Manage your account information</p>
//                 </div>

//                 <form onSubmit={handleSubmit} className="profile-form">
//                     <div className="form-group">
//                         <label className="form-label">Username</label>
//                         <div className="input-icon">
//                             <FiUser />
//                             <input
//                                 type="text"
//                                 name="username"
//                                 className="form-input"
//                                 value={formData.username}
//                                 onChange={handleChange}
//                                 required
//                             />
//                         </div>
//                     </div>

//                     <div className="form-group">
//                         <label className="form-label">Email Address</label>
//                         <div className="input-icon">
//                             <FiMail />
//                             <input
//                                 type="email"
//                                 name="email"
//                                 className="form-input"
//                                 value={formData.email}
//                                 onChange={handleChange}
//                                 required
//                             />
//                         </div>
//                     </div>

//                     <div className="form-divider">
//                         <h3>Change Password</h3>
//                     </div>

//                     <div className="form-group">
//                         <label className="form-label">Current Password</label>
//                         <input
//                             type="password"
//                             name="currentPassword"
//                             className="form-input"
//                             value={formData.currentPassword}
//                             onChange={handleChange}
//                             placeholder="Leave blank to keep current password"
//                         />
//                     </div>

//                     <div className="form-group">
//                         <label className="form-label">New Password</label>
//                         <input
//                             type="password"
//                             name="newPassword"
//                             className="form-input"
//                             value={formData.newPassword}
//                             onChange={handleChange}
//                             placeholder="Enter new password"
//                         />
//                     </div>

//                     <div className="form-group">
//                         <label className="form-label">Confirm New Password</label>
//                         <input
//                             type="password"
//                             name="confirmPassword"
//                             className="form-input"
//                             value={formData.confirmPassword}
//                             onChange={handleChange}
//                             placeholder="Confirm new password"
//                         />
//                     </div>

//                     <div className="form-actions">
//                         <button type="submit" disabled={loading} className="btn btn-primary">
//                             <FiSave /> {loading ? 'Saving...' : 'Save Changes'}
//                         </button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default ProfilePage;

import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import {
    FiUser,
    FiMail,
    FiSave,
    FiCamera,
    FiFileText,
    FiHeart,
    FiEye,
    FiBookmark
} from 'react-icons/fi';
import toast from 'react-hot-toast';

const ProfilePage = () => {
    const { user, updateProfile } = useAuth();

    const [loading, setLoading] = useState(false);

    const [previewImage, setPreviewImage] = useState(null);

    const [formData, setFormData] = useState({
        username: user?.username || '',
        email: user?.email || '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleAvatarUpload = (e) => {
        const file = e.target.files[0];

        if (!file) return;

        setPreviewImage(URL.createObjectURL(file));

        toast.success('Profile image selected');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (
            formData.newPassword &&
            formData.newPassword !== formData.confirmPassword
        ) {
            toast.error('Passwords do not match');
            return;
        }

        setLoading(true);

        const updateData = {
            username: formData.username,
            email: formData.email,
        };

        if (formData.newPassword) {
            updateData.password = formData.newPassword;
        }

        const success = await updateProfile(updateData);

        setLoading(false);

        if (success) {
            setFormData({
                ...formData,
                currentPassword: '',
                newPassword: '',
                confirmPassword: '',
            });
        }
    };

    return (
        <div className="profile-page fade-in">

            <div className="profile-container">

                {/* HEADER */}

                <div className="profile-header">

                    <div className="profile-avatar">

                        <div className="avatar-large">

                            {previewImage ? (
                                <img
                                    src={previewImage}
                                    alt="Profile"
                                />
                            ) : (
                                user?.username?.[0]?.toUpperCase()
                            )}

                        </div>

                        <label
                            htmlFor="avatar-upload"
                            className="change-avatar-btn"
                        >
                            <FiCamera />
                        </label>

                        <input
                            id="avatar-upload"
                            type="file"
                            accept="image/*"
                            hidden
                            onChange={handleAvatarUpload}
                        />

                    </div>

                    <h1>{user?.username}</h1>

                    <p>{user?.email}</p>

                </div>

                {/* STATS */}

                <div className="profile-stats">

                    <div className="profile-stat-card">
                        <FiFileText size={24} />
                        <h2>0</h2>
                        <span>Total Blogs</span>
                    </div>

                    <div className="profile-stat-card">
                        <FiEye size={24} />
                        <h2>0</h2>
                        <span>Total Views</span>
                    </div>

                    <div className="profile-stat-card">
                        <FiHeart size={24} />
                        <h2>0</h2>
                        <span>Total Likes</span>
                    </div>

                    <div className="profile-stat-card">
                        <FiBookmark size={24} />
                        <h2>0</h2>
                        <span>Favorites</span>
                    </div>

                </div>

                {/* FORM */}

                <form
                    onSubmit={handleSubmit}
                    className="profile-form"
                >

                    <div className="profile-card">

                        <h2>Profile Information</h2>

                        <div className="form-group">

                            <label className="form-label">
                                Username
                            </label>

                            <div className="input-icon">
                                <FiUser />
                                <input
                                    type="text"
                                    name="username"
                                    className="form-input"
                                    value={formData.username}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                        </div>

                        <div className="form-group">

                            <label className="form-label">
                                Email Address
                            </label>

                            <div className="input-icon">
                                <FiMail />
                                <input
                                    type="email"
                                    name="email"
                                    className="form-input"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                        </div>

                    </div>

                    <div className="profile-card">

                        <h2>Change Password</h2>

                        <div className="form-group">
                            <label className="form-label">
                                Current Password
                            </label>

                            <input
                                type="password"
                                name="currentPassword"
                                className="form-input"
                                value={formData.currentPassword}
                                onChange={handleChange}
                                placeholder="Current password"
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">
                                New Password
                            </label>

                            <input
                                type="password"
                                name="newPassword"
                                className="form-input"
                                value={formData.newPassword}
                                onChange={handleChange}
                                placeholder="Enter new password"
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">
                                Confirm Password
                            </label>

                            <input
                                type="password"
                                name="confirmPassword"
                                className="form-input"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                placeholder="Confirm new password"
                            />
                        </div>

                    </div>

                    <div className="form-actions">

                        <button
                            type="submit"
                            disabled={loading}
                            className="btn btn-primary"
                        >
                            <FiSave />

                            {loading
                                ? 'Saving...'
                                : 'Save Changes'}
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
};

export default ProfilePage;