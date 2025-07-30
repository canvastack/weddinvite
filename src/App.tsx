
import { Suspense, lazy } from 'react';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@/contexts/ThemeContext';

const queryClient = new QueryClient();

// Lazy load components
const Index = lazy(() => import('./pages/Index'));
const AdminLayout = lazy(() => import('./components/admin/AdminLayout'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const Dashboard = lazy(() => import('./pages/admin/Dashboard'));
const GuestManagement = lazy(() => import('./pages/admin/GuestManagement'));
const EventManagement = lazy(() => import('./pages/admin/EventManagement'));
const Analytics = lazy(() => import('./pages/admin/Analytics'));
const ThemeEditor = lazy(() => import('./pages/admin/ThemeEditor'));
const Settings = lazy(() => import('./pages/admin/Settings'));
const EditProfile = lazy(() => import('./pages/admin/EditProfile'));
const Login = lazy(() => import('./pages/admin/Login'));
const NotFound = lazy(() => import('./pages/NotFound'));

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <BrowserRouter>
            <div className="min-h-screen bg-background font-sans antialiased">
              <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/admin/login" element={<Login />} />
                  <Route path="/admin" element={<AdminLayout />}>
                    <Route index element={<AdminDashboard />} />
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="guests" element={<GuestManagement />} />
                    <Route path="events" element={<EventManagement />} />
                    <Route path="analytics" element={<Analytics />} />
                    <Route path="theme" element={<ThemeEditor />} />
                    <Route path="settings" element={<Settings />} />
                    <Route path="profile" element={<EditProfile />} />
                  </Route>
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
              <Toaster />
            </div>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
