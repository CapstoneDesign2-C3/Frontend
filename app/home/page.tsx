"use client"

import detectedObjectStore from '@/store/detectedObjectStore';
import TrackingMap from '../../components/map/TrackingMap';
import SideBar from '../../components/sidebar/SideBar';
import { useEffect } from 'react';

function HomeLayout(){
  const fetchDetectedObjects = detectedObjectStore(state => state.fetchDetectedObjects);
  
  return (
    <div className="h-screen w-screen">
      <div className="flex h-full">
        <TrackingMap />
        <SideBar />
      </div>
    </div>
  );
} 

export default HomeLayout;
