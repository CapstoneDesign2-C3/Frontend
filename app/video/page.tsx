"use client"

import TrackingMap from '@/components/map/TrackingMap';
import mapStore from '@/store/mapStore';
import { useEffect } from 'react';

function VideoPage(){
  const fetchCameras = mapStore(state => state.fetchCameras);

  useEffect(() => {
    fetchCameras();
  }, []);

  return (
    <div className="h-screen">
      <div className="flex h-full">
        <TrackingMap />
      </div>
    </div>
  );
} 

export default VideoPage;
