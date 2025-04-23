import React, { useState } from 'react';
import { Settings, Plus } from 'lucide-react';
import ServerSettings from './ServerSettings';

interface Server {
  id: number;
  name: string;
  description: string;
  lore: string;
  imageUrl: string;
  memberCount: number;
  privacy: 'public' | 'private' | 'secret';
  slowMode: boolean;
  inviteLink: string;
}

interface ServerListProps {
  currentServer: string;
  setCurrentServer: (server: string) => void;
  secretMode: boolean;
  onSettingsOpen: () => void;
  onSettingsClose: () => void;
}

const ServerList = ({ currentServer, setCurrentServer, secretMode, onSettingsOpen, onSettingsClose }: ServerListProps) => {
  const [servers, setServers] = useState<Server[]>([
    {
      id: 1,
      name: 'Court of Owls',
      description: 'The secret society that rules Gotham from the shadows',
      lore: 'Beware The Court of Owls, that watches all the time, ruling Gotham from a shadow perch, behind granite and lime.',
      imageUrl: 'https://images.unsplash.com/photo-1584824388174-7c69a307f710?w=400&h=400&fit=crop',
      memberCount: 13,
      privacy: 'secret',
      slowMode: true,
      inviteLink: 'court-of-owls-invite'
    },
    {
      id: 2,
      name: 'Arkham Archives',
      description: 'Historical records of Gotham\'s darkest secrets',
      lore: 'Within these walls lie the forgotten tales of madness and mystery.',
      imageUrl: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=400&fit=crop',
      memberCount: 28,
      privacy: 'private',
      slowMode: false,
      inviteLink: 'arkham-archives-invite'
    },
    {
      id: 3,
      name: 'Wayne Enterprises',
      description: 'Official communications of Wayne Enterprises',
      lore: 'The public face of the Wayne legacy, hiding secrets in plain sight.',
      imageUrl: 'https://images.unsplash.com/photo-1582647509711-c8aa8eb7c7a4?w=400&h=400&fit=crop',
      memberCount: 42,
      privacy: 'public',
      slowMode: false,
      inviteLink: 'wayne-enterprises-invite'
    }
  ]);

  const [editingServer, setEditingServer] = useState<Server | null>(null);
  const [isCreatingServer, setIsCreatingServer] = useState(false);

  const handleServerUpdate = (updatedServer: Server) => {
    setServers(prev => prev.map(server => 
      server.id === updatedServer.id ? updatedServer : server
    ));
    setEditingServer(null);
    onSettingsClose();
  };

  const handleCreateServer = (newServer: Server) => {
    setServers(prev => [...prev, { ...newServer, id: prev.length + 1 }]);
    setIsCreatingServer(false);
    onSettingsClose();
  };

  const handleSettingsClick = (server: Server) => {
    setEditingServer(server);
    onSettingsOpen();
  };

  const handleCreateClick = () => {
    setIsCreatingServer(true);
    onSettingsOpen();
  };

  return (
    <div className="w-20 glass-panel-darker flex flex-col items-center py-4 space-y-4 border-l-0 border-t-0 border-b-0">
      {servers.map((server) => (
        <div key={server.id} className="relative group">
          <div className="flex flex-col items-center space-y-2">
            <button
              onClick={() => setCurrentServer(server.name)}
              className={`w-12 h-12 rounded-lg overflow-hidden transition-all duration-300 ${
                currentServer === server.name
                  ? 'ring-2 ring-[#C0C0C0]/40 shadow-[0_0_15px_rgba(192,192,192,0.2)]'
                  : 'opacity-70 hover:opacity-100 hover:shadow-[0_0_10px_rgba(192,192,192,0.1)]'
              }`}
              title={server.name}
            >
              <div className="w-full h-full relative">
                <img
                  src={server.imageUrl}
                  alt={server.name}
                  className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40" />
              </div>
            </button>
            
            {/* Settings button below each server icon */}
            {currentServer === server.name && (
              <button
                onClick={() => handleSettingsClick(server)}
                className="marble-button p-2 rounded-lg text-[#C0C0C0]/50 hover:text-[#C0C0C0]"
                title="Server Settings"
              >
                <Settings size={16} />
              </button>
            )}
          </div>
          
          {/* Server info tooltip */}
          <div className="absolute left-full ml-2 top-0 hidden group-hover:block z-50">
            <div className="glass-panel p-3 rounded-lg whitespace-nowrap">
              <h3 className="font-medium text-sm mb-1">{server.name}</h3>
              <p className="text-xs text-[#C0C0C0]/60 mb-2">{server.description}</p>
              <div className="flex items-center space-x-2 text-xs text-[#C0C0C0]/40">
                <span>{server.memberCount} members</span>
                <span>•</span>
                <span className="capitalize">{server.privacy}</span>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Add Server Button */}
      <button
        onClick={handleCreateClick}
        className="w-12 h-12 marble-button rounded-lg flex items-center justify-center text-[#C0C0C0]/50 hover:text-[#C0C0C0]"
        title="Create New Server"
      >
        <Plus size={24} />
      </button>

      {/* Server Settings Modal */}
      {(editingServer || isCreatingServer) && (
        <ServerSettings
          server={editingServer}
          onClose={() => {
            setEditingServer(null);
            setIsCreatingServer(false);
            onSettingsClose();
          }}
          onSave={isCreatingServer ? handleCreateServer : handleServerUpdate}
          isCreating={isCreatingServer}
        />
      )}
    </div>
  );
};

export default ServerList;