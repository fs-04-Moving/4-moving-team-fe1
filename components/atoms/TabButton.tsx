'use client';

import { useState } from 'react';

const TabButton = () => {
  const [activeTab, setActiveTab] = useState('pending');

  return (
    <div className="flex bg-gray-100">
      <button
        className={`px-[10px] py-[6px] rounded-lg ${
          activeTab === 'pending' ? 'bg-gray-50 text-black' : 'text-gray-300'
        }`}
        onClick={() => setActiveTab('pending')}
      >
        대기 중인 견적
      </button>
      <button
        className={`px-[10px] py-[6px] rounded-lg ${
          activeTab === 'received' ? 'bg-gray-50 text-black' : 'text-gray-300'
        }`}
        onClick={() => setActiveTab('received')}
        disabled
      >
        받았던 견적
      </button>
    </div>
  );
};

export default TabButton;
