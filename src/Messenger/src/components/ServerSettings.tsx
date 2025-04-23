import React, { useState } from 'react';
import { X, Shield, Clock } from 'lucide-react';

interface Server {
  id: number;
  name: string;
  icon: React.ReactNode;
  description: string;
  lore: string;
  imageUrl: string;
  memberCount: number;
  privacy: 'public' | 'private' | 'secret';
  slowMode: boolean;
  inviteLink: string;
}

interface ServerSettingsProps {
  server: Server | null;
  onClose: () => void;
  onSave: (server: Server) => void;
  isCreating?: boolean;
}

const ServerSettings = ({ server, onClose, onSave, isCreating = false }: ServerSettingsProps) => {
  const [formData, setFormData] = useState<Partial<Server>>(
    server || {
      name: '',
      description: '',
      lore: '',
      imageUrl: '',
      privacy: 'public',
      slowMode: false,
      memberCount: 0,
      inviteLink: ''
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData as Server);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="w-[800px] max-h-[90vh] glass-panel rounded-xl overflow-hidden">
        <div className="sticky top-0 z-10 bg-black/40 backdrop-blur-md border-b border-[#C0C0C0]/10 p-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-cinzel">
              {isCreating ? 'Create New Server' : 'Server Settings'}
            </h1>
            <button
              onClick={onClose}
              className="marble-button p-2 rounded-lg hover:text-[#C0C0C0]"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="overflow-y-auto max-h-[calc(90vh-4rem)]">
          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Server Banner and Icon */}
              <div className="relative">
                <div className="aspect-[5/2] rounded-lg overflow-hidden marble-button">
                  <img
                    src={formData.imageUrl || 'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?w=1200&h=600&fit=crop'}
                    alt="Server banner"
                    className="w-full h-full object-cover opacity-60"
                  />
                </div>
                <div className="absolute -bottom-6 left-6">
                  <div className="w-20 h-20 rounded-2xl overflow-hidden marble-button">
                    <img
                      src={formData.imageUrl || 'https://images.unsplash.com/photo-1584824388174-7c69a307f710?w=200&h=200&fit=crop'}
                      alt="Server icon"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-6 mt-12">
                <div>
                  <label className="block text-sm font-medium mb-2">Server Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="glass-input w-full p-3 rounded-lg font-cinzel text-lg"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Server Image URL</label>
                  <input
                    type="url"
                    value={formData.imageUrl}
                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                    className="glass-input w-full p-3 rounded-lg font-serif"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="glass-input w-full p-3 rounded-lg h-24 font-serif"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Server Lore</label>
                  <textarea
                    value={formData.lore}
                    onChange={(e) => setFormData({ ...formData, lore: e.target.value })}
                    className="glass-input w-full p-3 rounded-lg h-40 font-serif"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-4">Privacy Settings</label>
                  <div className="grid grid-cols-1 gap-4">
                    {['public', 'private', 'secret'].map((privacy) => (
                      <label
                        key={privacy}
                        className={`flex items-center p-4 rounded-lg cursor-pointer transition-all ${
                          formData.privacy === privacy
                            ? 'marble-button text-[#C0C0C0]'
                            : 'glass-panel text-[#C0C0C0]/50 hover:text-[#C0C0C0]'
                        }`}
                      >
                        <input
                          type="radio"
                          name="privacy"
                          value={privacy}
                          checked={formData.privacy === privacy}
                          onChange={(e) => setFormData({ ...formData, privacy: e.target.value as Server['privacy'] })}
                          className="hidden"
                        />
                        <Shield size={24} className="mr-4" />
                        <div>
                          <span className="block capitalize font-cinzel">{privacy}</span>
                          <span className="text-sm text-[#C0C0C0]/60">
                            {privacy === 'public' && 'Anyone can join and view this server'}
                            {privacy === 'private' && 'Members must be invited to join'}
                            {privacy === 'secret' && 'Hidden from server listings, invitation only'}
                          </span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-4">Server Features</label>
                  <div className="space-y-4">
                    <label className="flex items-center p-4 rounded-lg glass-panel cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.slowMode}
                        onChange={(e) => setFormData({ ...formData, slowMode: e.target.checked })}
                        className="hidden"
                      />
                      <div
                        className={`w-14 h-7 rounded-full transition-colors duration-200 ease-in-out relative ${
                          formData.slowMode ? 'bg-[#C0C0C0]/20' : 'bg-[#C0C0C0]/5'
                        }`}
                      >
                        <div
                          className={`absolute w-6 h-6 rounded-full top-0.5 transition-transform duration-200 ease-in-out marble-button ${
                            formData.slowMode ? 'translate-x-7' : 'translate-x-0.5'
                          }`}
                        />
                      </div>
                      <div className="ml-4">
                        <div className="flex items-center space-x-2">
                          <Clock size={20} />
                          <span className="font-cinzel">Slow Mode</span>
                        </div>
                        <span className="text-sm text-[#C0C0C0]/60">
                          Limit how often members can send messages
                        </span>
                      </div>
                    </label>
                  </div>
                </div>

                {!isCreating && (
                  <div>
                    <label className="block text-sm font-medium mb-4">Danger Zone</label>
                    <button
                      type="button"
                      className="w-full p-4 rounded-lg border-2 border-red-900/20 text-red-300/60 hover:text-red-300/80 hover:border-red-900/40 transition-colors duration-200"
                    >
                      Delete Server
                    </button>
                  </div>
                )}
              </div>

              {/* Footer Actions */}
              <div className="sticky bottom-0 bg-black/40 backdrop-blur-md -mx-6 -mb-6 p-4 flex justify-end space-x-4 border-t border-[#C0C0C0]/10">
                <button
                  type="button"
                  onClick={onClose}
                  className="marble-button px-6 py-2 rounded-lg text-[#C0C0C0]/60 hover:text-[#C0C0C0]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="marble-button px-6 py-2 rounded-lg bg-[#1A1D24]/60 text-[#C0C0C0] shadow-[0_0_15px_rgba(192,192,192,0.1)]"
                >
                  {isCreating ? 'Create Server' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServerSettings;