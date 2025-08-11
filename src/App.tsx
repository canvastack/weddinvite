import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminLayout from './layouts/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import GuestManagement from './pages/admin/GuestManagement';
import MapManager from './components/admin/MapManager';
import Settings from './pages/admin/Settings';
import EventManagement from './pages/admin/EventManagement';
import Frontend from './pages/Frontend';
import EmailManagement from './pages/admin/EmailManagement';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Frontend />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="guests" element={<GuestManagement />} />
          <Route path="map" element={<MapManager />} />
          <Route path="settings" element={<Settings />} />
          <Route path="events" element={<EventManagement />} />
          <Route path="/admin/email" element={<EmailManagement />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
