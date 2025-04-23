import React, { useState, useEffect, useRef } from 'react';
import { Send, Image, Film, Smile, X, Maximize2, ExternalLink } from 'lucide-react';

interface ChatAreaProps {
  currentServer: string;
  currentChannel: string;
  secretMode: boolean;
}

interface Message {
  id: string;
  text: string;
  sender: string;
  timestamp: string;
  isSecret?: boolean;
  isRead?: boolean;
  media?: {
    type: 'image' | 'video' | 'gif';
    url: string;
    thumbnail?: string;
  };
}

const ChatArea = ({ currentServer, currentChannel, secretMode }: ChatAreaProps) => {
  const [message, setMessage] = useState('');
  const [showWaxSeal, setShowWaxSeal] = useState(false);
  const [sealPosition, setSealPosition] = useState({ x: 0, y: 0 });
  const [showMediaPreview, setShowMediaPreview] = useState(false);
  const [mediaPreview, setMediaPreview] = useState<string | null>(null);
  const [mediaType, setMediaType] = useState<'image' | 'video' | 'gif' | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'The darkness is your ally...',
      sender: 'Bruce Wayne',
      timestamp: 'Today at 12:42 PM',
      isSecret: true,
      isRead: false
    },
    {
      id: '2',
      text: 'Regular message for everyone',
      sender: 'Alfred Pennyworth',
      timestamp: 'Today at 12:45 PM',
      isSecret: false,
      isRead: true,
      media: {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1557683311-eac922347aa1?w=800&h=600&fit=crop'
      }
    },
    {
      id: '3',
      text: 'The Court of Owls has sentenced you to die.',
      sender: 'Unknown Member',
      timestamp: 'Today at 12:47 PM',
      isSecret: true,
      isRead: false
    }
  ]);

  useEffect(() => {
    const markAsRead = setTimeout(() => {
      setMessages(prev => prev.map(msg => ({
        ...msg,
        isRead: true
      })));
    }, 2000);

    return () => clearTimeout(markAsRead);
  }, [messages]);

  const handleMediaUpload = (type: 'image' | 'video' | 'gif') => {
    if (fileInputRef.current) {
      fileInputRef.current.accept = type === 'image' ? 'image/*' : 
                                   type === 'video' ? 'video/*' : 
                                   'image/gif';
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setMediaPreview(url);
      setMediaType(file.type.startsWith('image/gif') ? 'gif' : 
                  file.type.startsWith('video/') ? 'video' : 'image');
      setShowMediaPreview(true);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() && !mediaPreview) return;

    const button = document.querySelector('.send-button');
    if (button) {
      const rect = button.getBoundingClientRect();
      setSealPosition({
        x: rect.left + rect.width / 2 - 40,
        y: rect.top + rect.height / 2 - 40
      });
      setShowWaxSeal(true);
      setTimeout(() => setShowWaxSeal(false), 2000);
    }

    const newMessage: Message = {
      id: Date.now().toString(),
      text: message,
      sender: 'You',
      timestamp: new Date().toLocaleTimeString(),
      isSecret: secretMode,
      isRead: false,
      ...(mediaPreview && mediaType && {
        media: {
          type: mediaType,
          url: mediaPreview
        }
      })
    };

    setMessages(prev => [...prev, newMessage]);
    setMessage('');
    setMediaPreview(null);
    setShowMediaPreview(false);
    setMediaType(null);
  };

  const visibleMessages = messages.filter(msg => !msg.isSecret || (msg.isSecret && secretMode));

  return (
    <div className="flex-1 flex flex-col message-area">
      {/* Chat Header */}
      <div className="h-14 glass-panel-darker px-4 flex items-center border-b border-[#C0C0C0]/5 backdrop-blur-xl bg-black/40">
        <h3 className="text-[#C0C0C0] font-medium tracking-[0.15em] channel-name">#{currentChannel}</h3>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 backdrop-blur-xl bg-black/30">
        {visibleMessages.map(msg => (
          <div
            key={msg.id}
            className={`flex items-start space-x-4 hover:glass-button p-3 rounded-lg transition-all ${
              msg.isSecret ? 'secret-message' : ''
            } backdrop-blur-md bg-black/20 hover:bg-black/30`}
          >
            <img
              src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=64&h=64&fit=crop&crop=faces"
              alt="User Avatar"
              className="w-10 h-10 rounded-lg marble-button shadow-xl"
            />
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <span className="text-[#C0C0C0] font-medium tracking-wide">{msg.sender}</span>
                <span className="text-xs text-[#C0C0C0]/30 font-serif">{msg.timestamp}</span>
              </div>
              {msg.text && (
                <p className="text-[#C0C0C0]/80 mt-1 font-serif">{msg.text}</p>
              )}
              {msg.media && (
                <div className="mt-2 relative group">
                  {msg.media.type === 'image' && (
                    <div className="relative rounded-lg overflow-hidden marble-button shadow-xl">
                      <img 
                        src={msg.media.url} 
                        alt="Shared media"
                        className="max-h-96 object-contain w-full"
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <a 
                            href={msg.media.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="marble-button p-2 rounded-lg hover:text-[#C0C0C0] backdrop-blur-md bg-black/40"
                          >
                            <ExternalLink size={16} />
                          </a>
                        </div>
                      </div>
                    </div>
                  )}
                  {msg.media.type === 'video' && (
                    <div className="rounded-lg overflow-hidden marble-button shadow-xl">
                      <video 
                        src={msg.media.url} 
                        controls 
                        className="max-h-96 w-full"
                      />
                    </div>
                  )}
                  {msg.media.type === 'gif' && (
                    <div className="rounded-lg overflow-hidden marble-button shadow-xl">
                      <img 
                        src={msg.media.url} 
                        alt="GIF"
                        className="max-h-96 object-contain w-full"
                      />
                    </div>
                  )}
                </div>
              )}
              {msg.isSecret && msg.isRead && (
                <div className="relative h-2 mt-2">
                  <div className="blood-drop absolute right-0 transform -translate-y-1/2"></div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Media Preview */}
      {showMediaPreview && (
        <div className="p-4 glass-panel-darker border-t border-[#C0C0C0]/5 backdrop-blur-xl bg-black/40">
          <div className="relative">
            <button
              onClick={() => {
                setShowMediaPreview(false);
                setMediaPreview(null);
                setMediaType(null);
              }}
              className="absolute -top-2 -right-2 marble-button p-1 rounded-full hover:text-[#C0C0C0] z-10 backdrop-blur-md bg-black/40"
            >
              <X size={16} />
            </button>
            {mediaType === 'image' && (
              <img
                src={mediaPreview!}
                alt="Preview"
                className="max-h-48 object-contain rounded-lg marble-button shadow-xl"
              />
            )}
            {mediaType === 'video' && (
              <video
                src={mediaPreview!}
                className="max-h-48 rounded-lg marble-button shadow-xl"
                controls
              />
            )}
            {mediaType === 'gif' && (
              <img
                src={mediaPreview!}
                alt="GIF Preview"
                className="max-h-48 object-contain rounded-lg marble-button shadow-xl"
              />
            )}
          </div>
        </div>
      )}

      {/* Message Input */}
      <form onSubmit={handleSubmit} className="p-4 glass-panel-darker border-t border-[#C0C0C0]/5 backdrop-blur-xl bg-black/40">
        <div className="flex items-center glass-input rounded-lg px-4 py-3 backdrop-blur-md bg-black/20">
          <div className="flex space-x-2 mr-3">
            <button
              type="button"
              onClick={() => handleMediaUpload('image')}
              className="marble-button p-2 rounded-lg hover:text-[#C0C0C0] backdrop-blur-md bg-black/20"
              title="Upload Image"
            >
              <Image size={20} />
            </button>
            <button
              type="button"
              onClick={() => handleMediaUpload('video')}
              className="marble-button p-2 rounded-lg hover:text-[#C0C0C0] backdrop-blur-md bg-black/20"
              title="Upload Video"
            >
              <Film size={20} />
            </button>
            <button
              type="button"
              onClick={() => handleMediaUpload('gif')}
              className="marble-button p-2 rounded-lg hover:text-[#C0C0C0] backdrop-blur-md bg-black/20"
              title="Upload GIF"
            >
              <Smile size={20} />
            </button>
          </div>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={secretMode ? "Send a secret message..." : "Send a message..."}
            className="flex-1 bg-transparent outline-none text-[#C0C0C0] placeholder-[#C0C0C0]/20"
          />
          <button
            type="submit"
            className="send-button ml-2 marble-button p-2 rounded-lg hover:text-[#C0C0C0] backdrop-blur-md bg-black/20"
          >
            <Send size={20} />
          </button>
        </div>
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          onChange={handleFileChange}
        />
      </form>

      {/* Wax Seal Effect */}
      {showWaxSeal && (
        <div
          className="wax-seal"
          style={{
            left: `${sealPosition.x}px`,
            top: `${sealPosition.y}px`
          }}
        />
      )}
    </div>
  );
};

export default ChatArea;