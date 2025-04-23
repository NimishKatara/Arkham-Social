import React, { useState } from 'react';
import { Bird, Feather, Eye, Map, Globe, Users, Crown, Ban, Tag, MoreVertical, X, Book, Clock, ChevronRight, Calendar, Users2, Trophy, Plus, AlertCircle, Hash, FolderPlus } from 'lucide-react';

interface ChannelListProps {
  currentChannel: string;
  setCurrentChannel: (channel: string) => void;
}

type TabType = 'channels' | 'maps' | 'worlds' | 'members' | 'lore';

interface Section {
  id: number;
  name: string;
  channels: Channel[];
}

interface Channel {
  id: number;
  name: string;
  type: 'text' | 'voice';
  icon: React.ReactNode;
}

const ChannelList = ({ currentChannel, setCurrentChannel }: ChannelListProps) => {
  const [sections, setSections] = useState<Section[]>([
    {
      id: 1,
      name: 'Main Hall',
      channels: [
        { id: 1, name: 'general-assembly', type: 'text', icon: <Bird size={18} /> },
        { id: 2, name: 'grand-hall', type: 'voice', icon: <Feather size={18} className="rotate-45" /> },
      ]
    },
    {
      id: 2,
      name: 'Archives',
      channels: [
        { id: 3, name: 'ancient-texts', type: 'text', icon: <Feather size={18} /> },
        { id: 4, name: 'inner-circle', type: 'text', icon: <Eye size={18} /> },
      ]
    }
  ]);

  const [showNewSection, setShowNewSection] = useState(false);
  const [newSectionName, setNewSectionName] = useState('');
  const [showNewChannel, setShowNewChannel] = useState<number | null>(null);
  const [newChannelName, setNewChannelName] = useState('');
  const [newChannelType, setNewChannelType] = useState<'text' | 'voice'>('text');
  const [activeTab, setActiveTab] = useState<TabType>('channels');

  // Define the data for other tabs
  const maps = [
    { id: 1, name: 'gotham-overview', icon: <Map size={18} /> },
    { id: 2, name: 'secret-passages', icon: <Map size={18} /> }
  ];

  const worlds = [
    { id: 1, name: 'gotham-city', icon: <Globe size={18} /> },
    { id: 2, name: 'arkham-asylum', icon: <Globe size={18} /> }
  ];

  const members = [
    { id: 1, name: 'Bruce Wayne', status: 'online', role: 'Grand Master' },
    { id: 2, name: 'Alfred Pennyworth', status: 'idle', role: 'Keeper' }
  ];

  const handleCreateSection = () => {
    if (!newSectionName.trim()) return;

    setSections(prev => [...prev, {
      id: Date.now(),
      name: newSectionName,
      channels: []
    }]);

    setNewSectionName('');
    setShowNewSection(false);
  };

  const handleCreateChannel = (sectionId: number) => {
    if (!newChannelName.trim()) return;

    setSections(prev => prev.map(section => {
      if (section.id === sectionId) {
        return {
          ...section,
          channels: [...section.channels, {
            id: Date.now(),
            name: newChannelName.toLowerCase().replace(/\s+/g, '-'),
            type: newChannelType,
            icon: newChannelType === 'text' ? <Hash size={18} /> : <Feather size={18} />
          }]
        };
      }
      return section;
    }));

    setNewChannelName('');
    setShowNewChannel(null);
  };

  const handleDeleteSection = (sectionId: number) => {
    setSections(prev => prev.filter(section => section.id !== sectionId));
  };

  const handleDeleteChannel = (sectionId: number, channelId: number) => {
    setSections(prev => prev.map(section => {
      if (section.id === sectionId) {
        return {
          ...section,
          channels: section.channels.filter(channel => channel.id !== channelId)
        };
      }
      return section;
    }));
  };

  return (
    <div className="w-64 glass-panel p-4 border-l-0 border-t-0 border-b-0 z-10 flex flex-col">
      {/* Tabs */}
      <div className="grid grid-cols-3 gap-2 mb-6">
        <button
          onClick={() => setActiveTab('channels')}
          className={`p-2 rounded-lg font-cinzel text-sm transition-all ${
            activeTab === 'channels'
              ? 'marble-button text-[#C0C0C0] shadow-[0_0_15px_rgba(192,192,192,0.1)]'
              : 'text-[#C0C0C0]/50 hover:text-[#C0C0C0]'
          }`}
        >
          Chapters
        </button>
        <button
          onClick={() => setActiveTab('maps')}
          className={`p-2 rounded-lg font-cinzel text-sm transition-all ${
            activeTab === 'maps'
              ? 'marble-button text-[#C0C0C0] shadow-[0_0_15px_rgba(192,192,192,0.1)]'
              : 'text-[#C0C0C0]/50 hover:text-[#C0C0C0]'
          }`}
        >
          Maps
        </button>
        <button
          onClick={() => setActiveTab('worlds')}
          className={`p-2 rounded-lg font-cinzel text-sm transition-all ${
            activeTab === 'worlds'
              ? 'marble-button text-[#C0C0C0] shadow-[0_0_15px_rgba(192,192,192,0.1)]'
              : 'text-[#C0C0C0]/50 hover:text-[#C0C0C0]'
          }`}
        >
          Worlds
        </button>
      </div>

      {/* Content */}
      <div className="space-y-2 overflow-y-auto">
        {activeTab === 'channels' && (
          <>
            {/* Add Section Button */}
            <button
              onClick={() => setShowNewSection(true)}
              className="w-full p-3 rounded-lg marble-button flex items-center justify-center space-x-2 text-sm mb-4"
            >
              <FolderPlus size={16} />
              <span>New Section</span>
            </button>

            {/* New Section Form */}
            {showNewSection && (
              <div className="glass-panel p-4 rounded-lg space-y-4 mb-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-cinzel">New Section</h3>
                  <button
                    onClick={() => setShowNewSection(false)}
                    className="p-1 hover:text-[#C0C0C0]"
                  >
                    <X size={16} />
                  </button>
                </div>
                <input
                  type="text"
                  placeholder="Section Name"
                  value={newSectionName}
                  onChange={e => setNewSectionName(e.target.value)}
                  className="w-full glass-input p-2 rounded-lg text-sm"
                  onKeyPress={e => e.key === 'Enter' && handleCreateSection()}
                />
                <button
                  onClick={handleCreateSection}
                  className="w-full p-2 rounded-lg marble-button text-sm"
                >
                  Create Section
                </button>
              </div>
            )}

            {/* Sections */}
            {sections.map(section => (
              <div key={section.id} className="mb-6 last:mb-0">
                <div className="flex items-center justify-between mb-2 px-2">
                  <h3 className="text-sm font-cinzel text-[#C0C0C0]/80 uppercase tracking-wider">
                    {section.name}
                  </h3>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setShowNewChannel(section.id)}
                      className="p-1 rounded-lg hover:text-[#C0C0C0]"
                      title="Add Channel"
                    >
                      <Plus size={14} />
                    </button>
                    <button
                      onClick={() => handleDeleteSection(section.id)}
                      className="p-1 rounded-lg hover:text-red-300/60"
                      title="Delete Section"
                    >
                      <X size={14} />
                    </button>
                  </div>
                </div>

                {/* New Channel Form */}
                {showNewChannel === section.id && (
                  <div className="glass-panel p-4 rounded-lg space-y-4 mb-2">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-sm font-cinzel">New Channel</h3>
                      <button
                        onClick={() => setShowNewChannel(null)}
                        className="p-1 hover:text-[#C0C0C0]"
                      >
                        <X size={16} />
                      </button>
                    </div>
                    <input
                      type="text"
                      placeholder="Channel Name"
                      value={newChannelName}
                      onChange={e => setNewChannelName(e.target.value)}
                      className="w-full glass-input p-2 rounded-lg text-sm"
                    />
                    <select
                      value={newChannelType}
                      onChange={e => setNewChannelType(e.target.value as 'text' | 'voice')}
                      className="w-full glass-input p-2 rounded-lg text-sm"
                    >
                      <option value="text">Text Channel</option>
                      <option value="voice">Voice Channel</option>
                    </select>
                    <button
                      onClick={() => handleCreateChannel(section.id)}
                      className="w-full p-2 rounded-lg marble-button text-sm"
                    >
                      Create Channel
                    </button>
                  </div>
                )}

                {/* Channels */}
                <div className="space-y-1">
                  {section.channels.map(channel => (
                    <div key={channel.id} className="group relative">
                      <div
                        className={`w-full flex items-center px-3 py-2 rounded-md ${
                          currentChannel === channel.name
                            ? 'marble-button text-[#C0C0C0] font-semibold'
                            : 'marble-button text-[#C0C0C0]/50 hover:text-[#C0C0C0]'
                        }`}
                      >
                        <div
                          className="flex-1 flex items-center cursor-pointer"
                          onClick={() => setCurrentChannel(channel.name)}
                        >
                          {channel.icon}
                          <span className="ml-2 text-sm channel-name">{channel.name}</span>
                        </div>
                        <button
                          onClick={() => handleDeleteChannel(section.id, channel.id)}
                          className="p-1 opacity-0 group-hover:opacity-100 hover:text-red-300/60"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </>
        )}

        {/* Maps Tab */}
        {activeTab === 'maps' && maps.map((map) => (
          <div
            key={map.id}
            className={`w-full flex items-center px-3 py-2 rounded-md ${
              currentChannel === map.name
                ? 'marble-button text-[#C0C0C0] font-semibold'
                : 'marble-button text-[#C0C0C0]/50 hover:text-[#C0C0C0]'
            }`}
            onClick={() => setCurrentChannel(map.name)}
          >
            {map.icon}
            <span className="ml-2 text-sm channel-name">{map.name}</span>
          </div>
        ))}

        {/* Worlds Tab */}
        {activeTab === 'worlds' && worlds.map((world) => (
          <div
            key={world.id}
            className={`w-full flex items-center px-3 py-2 rounded-md ${
              currentChannel === world.name
                ? 'marble-button text-[#C0C0C0] font-semibold'
                : 'marble-button text-[#C0C0C0]/50 hover:text-[#C0C0C0]'
            }`}
            onClick={() => setCurrentChannel(world.name)}
          >
            {world.icon}
            <span className="ml-2 text-sm channel-name">{world.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChannelList;