import React from 'react';

const UserList = () => {
  const users = [
    { id: 1, name: 'Bruce Wayne', status: 'online', role: 'Grand Master' },
    { id: 2, name: 'Alfred Pennyworth', status: 'idle', role: 'Keeper' },
    { id: 3, name: 'Barbara Gordon', status: 'offline', role: 'Scholar' },
    { id: 4, name: 'Dick Grayson', status: 'online', role: 'Initiate' },
  ];

  return (
    <div className="w-64 glass-panel p-4 border-r-0 border-t-0 border-b-0">
      <h2 className="text-[#C0C0C0] font-semibold mb-6 text-lg tracking-[0.2em] border-b border-[#C0C0C0]/10 pb-2">MEMBERS</h2>
      <div className="space-y-2">
        {users.map((user) => (
          <div
            key={user.id}
            className="flex items-center space-x-3 px-3 py-2 rounded-md hover:glass-button"
          >
            <div className={`w-2 h-2 rounded-full glass-button ${
              user.status === 'online' ? 'bg-[#C0C0C0]/60' :
              user.status === 'idle' ? 'bg-[#C0C0C0]/30' :
              'bg-[#C0C0C0]/10'
            }`} />
            <div>
              <div className="text-[#C0C0C0] text-sm font-medium tracking-wide">{user.name}</div>
              <div className="text-[#C0C0C0]/60 text-xs tracking-[0.1em] font-serif">{user.role}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserList;