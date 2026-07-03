import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { BlogProvider } from './context/BlogContext';
import ProtectedRoute from './components/common/ProtectedRoute';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Sidebar from './components/common/Sidebar';
import FloatingChatbot from './components/common/FloatingChatbot';
// Pages
import HomePage from './pages/HomePage';
import ExplorePage from './pages/ExplorePage';
import BlogDetailsPage from './pages/BlogDetailsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import CreateBlogPage from './pages/CreateBlogPage';
import EditBlogPage from './pages/EditBlogPage';
import FavoritesPage from './pages/FavoritesPage';
import ProfilePage from './pages/ProfilePage';
import AdminPage from './pages/AdminPage';

function App() {
    const [sidebarOpen, setSidebarOpen] = React.useState(false);

    return (
        <ThemeProvider>
            <AuthProvider>
                <BlogProvider>
                    <div className="app">
                        <Toaster 
                            position="top-right"
                            toastOptions={{
                                duration: 4000,
                                style: {
                                    background: '#363636',
                                    color: '#fff',
                                },
                            }}
                        />
                        <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
                        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
                        <main className="main-content">
                            <Routes>
                                {/* Public Routes */}
                                <Route path="/" element={<HomePage />} />
                                <Route path="/explore" element={<ExplorePage />} />
                                <Route path="/blog/:id" element={<BlogDetailsPage />} />
                                <Route path="/login" element={<LoginPage />} />
                                <Route path="/register" element={<RegisterPage />} />
                                
                                {/* Private Routes */}
                                <Route path="/dashboard" element={
                                    <ProtectedRoute>
                                        <DashboardPage />
                                    </ProtectedRoute>
                                } />
                                <Route path="/create" element={
                                    <ProtectedRoute>
                                        <CreateBlogPage />
                                    </ProtectedRoute>
                                } />
                                <Route path="/edit/:id" element={
                                    <ProtectedRoute>
                                        <EditBlogPage />
                                    </ProtectedRoute>
                                } />
                                <Route path="/favorites" element={
                                    <ProtectedRoute>
                                        <FavoritesPage />
                                    </ProtectedRoute>
                                } />
                                <Route path="/profile" element={
                                    <ProtectedRoute>
                                        <ProfilePage />
                                    </ProtectedRoute>
                                } />
                                <Route path="/admin" element={
                                    <ProtectedRoute adminOnly>
                                        <AdminPage />
                                    </ProtectedRoute>
                                } />
                            </Routes>
                            <FloatingChatbot />
                        </main>
                        <Footer />
                    </div>
                </BlogProvider>
            </AuthProvider>
        </ThemeProvider>
    );
}

export default App;