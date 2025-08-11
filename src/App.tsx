
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Index from '@/pages/Index';
import NotFound from '@/pages/NotFound';
import Login from '@/pages/admin/Login';
import AdminLayout from '@/components/admin/AdminLayout';
import AdminDashboard from '@/pages/admin/AdminDashboard';
import UserManagement from '@/components/admin/UserManagementFixed';
import EmailBlastManager from '@/components/admin/EmailBlastManager';
import MapManager from '@/components/admin/MapManager';
import EventManagement from '@/pages/admin/EventManagementFixed';
import ThemeEditor from '@/pages/admin/ThemeEditor';
import ThemeManager from '@/pages/admin/ThemeManager';
import Settings from '@/pages/admin/Settings';
import Analytics from '@/pages/admin/Analytics';
import GuestManagement from '@/pages/admin/GuestManagement';
import EditProfile from '@/pages/admin/EditProfile';
import { AuthProvider } from '@/components/AuthProvider';
import { ThemeWrapper } from '@/components/ThemeWrapper';
import { Toaster } from '@/components/ui/toaster';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeWrapper>
          <Router>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/admin/login" element={<Login />} />
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminDashboard />} />
                <Route path="users" element={<UserManagement />} />
                <Route path="guests" element={<GuestManagement />} />
                <Route path="events" element={<EventManagement />} />
                <Route path="email" element={<EmailBlastManager />} />
                <Route path="map" element={<MapManager />} />
                <Route path="themes" element={<ThemeManager />} />
                <Route path="theme-editor" element={<ThemeEditor />} />
                <Route path="analytics" element={<Analytics />} />
                <Route path="settings" element={<Settings />} />
                <Route path="profile" element={<EditProfile />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Router>
          <Toaster />
        </ThemeWrapper>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
