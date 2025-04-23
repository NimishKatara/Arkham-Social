import React, { useState } from 'react';
import { ExploreNav } from '../components/explore/ExploreNav';
import { AlgorithmSelector } from '../components/explore/AlgorithmSelector';
import { useExplorePreferences } from '../hooks/useExplorePreferences';

const Explore = () => {
  const [activeTab, setActiveTab] = useState('people');
  const { preferences, updatePreference, updateAlgorithm } = useExplorePreferences();

  const renderContent = () => {
    switch (activeTab) {
      case 'people':
    }
  };

  return (
    <div className="max-w-7xl mx-auto font-cormorant">
      <h1 className="text-3xl text-zinc-200 mb-8 font-light tracking-wide">
        Explore
      </h1>
      
      <AlgorithmSelector 
        selectedAlgorithm={preferences.algorithm}
        onAlgorithmChange={updateAlgorithm}
      />
      
      <ExploreNav 
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
      
     
    </div>
  );
};

export default Explore;