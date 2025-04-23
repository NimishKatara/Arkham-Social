import React, { useState } from 'react';
import { CreatePost } from '../components/create/CreatePost';
import { CreatorRow } from '../components/creator/CreatorRow';
import { FeedHeader } from '../components/feed/FeedHeader';
import { FeedPost } from '../components/feed/FeedPost';
import { AiContentGenerator } from '../components/feed/AiContentGenerator';
import { LiveStream } from '../components/feed/LiveStream';
import { Wand2, Radio } from 'lucide-react';

const Feed = () => {
  const [showAiGenerator, setShowAiGenerator] = useState(false);
  const [showLiveStream, setShowLiveStream] = useState(false);

  const posts = [
    {
      id: 1,
      user: {
        name: 'Vincent Gray',
        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop',
      },
      image: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=800',
      likes: 234,
      caption: 'Shadows and light in the concrete jungle 🌃',
      comments: 12,
    },
    {
      id: 2,
      user: {
        name: 'Nina Blake',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop',
      },
      image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800',
      likes: 456,
      caption: 'Late night jazz session at The Blue Room 🎷',
      comments: 23,
    },
  ];

  const handleGenerate = (url: string, type: string) => {
    console.log(`Generated ${type} content:`, url);
    // Handle the generated content
  };

  return (
    <div className="max-w-2xl mx-auto bg-transparent min-h-screen p-8">
      <FeedHeader />
      <CreatorRow />

      <div className="flex space-x-4 mb-8">
        <button
          onClick={() => setShowAiGenerator(true)}
          className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 bg-black/20 hover:bg-black/30 text-white border border-white/10 rounded-lg transition-colors backdrop-blur-sm"
        >
          <Wand2 className="w-5 h-5" />
          <span>Create with AI</span>
        </button>
        <button
          onClick={() => setShowLiveStream(!showLiveStream)}
          className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 bg-black/20 hover:bg-black/30 text-white border border-white/10 rounded-lg transition-colors backdrop-blur-sm"
        >
          <Radio className="w-5 h-5" />
          <span>Go Live</span>
        </button>
      </div>

      {showLiveStream && <LiveStream />}

      <div className="mb-8">
        <CreatePost />
      </div>

      {posts.map((post) => (
        <FeedPost key={post.id} post={post} />
      ))}

      {showAiGenerator && (
        <AiContentGenerator
          onGenerate={handleGenerate}
          onClose={() => setShowAiGenerator(false)}
        />
      )}
    </div>
  );
};

export default Feed;