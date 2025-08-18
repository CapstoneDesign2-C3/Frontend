"use client";

import cameraStore from '@/store/cameraStore';
import GoogleMap from '@/components/map/GoogleMap';
import EventForm from '@/components/VideoForm';
import { useEffect } from 'react';
import mapStore from '@/store/mapStore';

function Camera(){
  const {camera, selectCamera} = cameraStore();
  const fetchCameras = mapStore(state => state.fetchCameras);

  useEffect(() => {
    fetchCameras();
  }, []);

  return (
  <div className="flex h-full w-full">
    <GoogleMap onMarkerClick={selectCamera} />
    {camera && (
    <div className="w-[20%] flex flex-col h-full">
      <div className="flex justify-between items-center">
        <div className="flex-1">
          <h2 className='text-xl'> {camera.cameraScenery}</h2>
          <h2 className='text-xs'>위도 | {camera.cameraLatitude}</h2>
          <h2 className='text-xs'>경도 | {camera.cameraLongitude}</h2>
        </div>
        <button className="hover:text-gray-300 text-xl" onClick={() => selectCamera(null)}>
        ×
        </button>
      </div>
      <div className="overflow-y-auto flex-1">
        {camera.videos && camera.videos.length > 0 ? (
          camera.videos.map((video) => (
            <EventForm key={video.videoId} video={video} />
          ))
        ) : (
          <div className="text-gray-400 p-4">이 카메라에 연결된 이벤트가 없습니다.</div>
        )}
      </div>
    </div>
    )}
  </div>
  );
}

export default Camera;
