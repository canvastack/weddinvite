
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';

// Pages
import Index from '@/pages/Index';
import NotFound from '@/pages/NotFound';

// Admin Pages
import AdminLayout from '@/components/admin/AdminLayout';
import AdminDashboard from '@/pages/admin/AdminDashboard';
import GuestManagement from '@/pages/admin/GuestManagement';
import EmailBlastManager from '@/components/admin/EmailBlastManager';
import MapManager from '@/components/admin/MapManager';
import EventManagement from '@/pages/admin/EventManagement';
import ThemeEditor from '@/pages/admin/ThemeEditor';
import ThemeManager from '@/pages/admin/ThemeManager';
import Analytics from '@/pages/admin/Analytics';
import UserManagement from '@/components/admin/UserManagement';
import Settings from '@/pages/admin/Settings';
import Login from '@/pages/admin/Login';
import EditProfile from '@/pages/admin/EditProfile';
import { WeddingHeroManager } from '@/components/admin/WeddingHeroManager';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Index />} />
          
          {/* Admin Login */}
          <Route path="/admin/login" element={<Login />} />
          
          {/* Protected Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="guests" element={<GuestManagement />} />
            <Route path="email" element={<EmailBlastManager />} />
            <Route path="map" element={<MapManager />} />
            <Route path="events" element={<EventManagement />} />
            <Route path="hero" element={<WeddingHeroManager />} />
            <Route path="theme" element={<ThemeManager />} />
            <Route path="theme-editor" element={<ThemeEditor />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="users" element={<UserManagement />} />
            <Route path="settings" element={<Settings />} />
            <Route path="profile" element={<EditProfile />} />
          </Route>
          
          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        
        <Toaster />
      </div>
    </Router>
  );
}

export default App;
