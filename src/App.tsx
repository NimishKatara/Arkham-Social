import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Layout from './components/Layout';
import Explore from './pages/Explore';
import Store from './pages/Store';
import Timeline from './pages/Timeline';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Reels from './pages/Reels';
import Addons from './pages/Addons';
import Feed from './pages/Feed';

// ✅ Import the Messenger Wrapper Page
import MessengerWrapper from './pages/MessengerWrapper';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Main Layout wrapper for regular pages */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Feed />} />
          <Route path="explore" element={<Explore />} />
          <Route path="feed" element={<Feed />} />
          <Route path="reels" element={<Reels />} />
          <Route path="store" element={<Store />} />
          <Route path="timeline" element={<Timeline />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
          <Route path="addons" element={<Addons />} />
          
          {/* ✅ Messenger route added here */}
          <Route path="messenger" element={<MessengerWrapper />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
