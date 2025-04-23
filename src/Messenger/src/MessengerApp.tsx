import React, { useState, useEffect } from 'react';
import ServerList from './components/ServerList';
import ChannelList from './components/ChannelList';
import ChatArea from './components/ChatArea';
import { Eye } from 'lucide-react';

function App() {
  const [currentServer, setCurrentServer] = useState('Court of Owls');
  const [currentChannel, setCurrentChannel] = useState('general-assembly');
  const [secretMode, setSecretMode] = useState(false);
  const [showOwlEyes, setShowOwlEyes] = useState(false);
  const [lastActivity, setLastActivity] = useState(Date.now());
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Track user activity
  useEffect(() => {
    const handleActivity = () => {
      setLastActivity(Date.now());
      setShowOwlEyes(false);
    };

    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('keydown', handleActivity);

    const checkInactivity = setInterval(() => {
      if (Date.now() - lastActivity > 30000) { // 30 seconds
        setShowOwlEyes(true);
      }
    }, 1000);

    return () => {
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('keydown', handleActivity);
      clearInterval(checkInactivity);
    };
  }, [lastActivity]);

  return (
    <div className={`flex h-screen bg-[#0A0C10] text-gray-300 overflow-hidden ${secretMode ? 'secret-mode' : ''}`}>
      {/* Secret Mode Toggle Button */}
      <button
        onClick={() => setSecretMode(!secretMode)}
        className="fixed top-4 right-4 marble-button p-3 rounded-lg z-50 group"
        title="Toggle Secret Mode"
      >
        <Eye
          size={20}
          className={`transition-all duration-500 ${
            secretMode ? 'text-red-300/80' : 'text-[#C0C0C0]/60'
          } group-hover:text-[#C0C0C0]`}
        />
      </button>

      {/* Gargoyle Statues */}
      <div className="fixed top-0 left-0 w-full h-16 pointer-events-none">
        <div className="absolute top-0 left-1/4 transform -translate-x-1/2 opacity-10">
          <img
            src="https://images.unsplash.com/photo-1564182842519-8a3b2af3e228?w=150&h=150&fit=crop"
            alt=""
            className="gargoyle-statue w-24 h-24 object-cover"
          />
        </div>
        <div className="absolute top-0 right-1/4 transform translate-x-1/2 opacity-10">
          <img
            src="https://images.unsplash.com/photo-1599083549920-8da49388c05e?w=150&h=150&fit=crop"
            alt=""
            className="gargoyle-statue w-24 h-24 object-cover"
          />
        </div>
      </div>

      {/* Noir Overlay */}
      <div className="fixed inset-0 pointer-events-none bg-gradient-to-b from-black/40 to-black/60"></div>

      {/* Watching Owl Eyes */}
      {showOwlEyes && (
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/4 owl-eyes">
            <Eye size={24} className="text-amber-500/20" />
          </div>
          <div className="absolute top-1/3 right-1/4 owl-eyes">
            <Eye size={24} className="text-amber-500/20" />
          </div>
        </div>
      )}

      {/* Cryptic Symbols */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/3 transform rotate-45 opacity-5 text-4xl font-serif">⦿</div>
        <div className="absolute bottom-1/4 right-1/3 transform -rotate-45 opacity-5 text-4xl font-serif">◈</div>
        <div className="absolute top-1/2 left-1/4 transform rotate-90 opacity-5 text-4xl font-serif">◈</div>
        <div className="absolute bottom-1/2 right-1/4 transform -rotate-90 opacity-5 text-4xl font-serif">◈</div>
      </div>

      {/* Main Layout */}
      <ServerList 
        currentServer={currentServer} 
        setCurrentServer={setCurrentServer} 
        secretMode={secretMode}
        onSettingsOpen={() => setIsSettingsOpen(true)}
        onSettingsClose={() => setIsSettingsOpen(false)}
      />
      <div className={`flex-1 flex ${isSettingsOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        <ChannelList currentChannel={currentChannel} setCurrentChannel={setCurrentChannel} />
        <ChatArea currentServer={currentServer} currentChannel={currentChannel} secretMode={secretMode} />
      </div>
    </div>
  );
}

export default App;