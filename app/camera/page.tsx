"use client";

import cameraStore from '@/store/cameraStore';
import KakaoMap from '../../components/map/GoogleMap';
import EventForm from '../../components/sidebar/video/VideoForm';
import { useEffect } from 'react';

function Camera(){
  const {camera, cameras, selectCamera, fetchCameras} = cameraStore();

  useEffect(() => {
    fetchCameras();
  }, [fetchCameras]);

  return (
    <div>
      <div className="flex h-screen bg-gray-100">
        <div className="flex-1 relative">
          <KakaoMap cameras={cameras} onMarkerClick={selectCamera} />
        </div>
        {camera && (<div className="w-[300px] bg-white border-l flex flex-col h-full">
          <div className="flex justify-between items-center border">
            <div className="flex-1">
              <h2 className='text-xl'> {camera.cameraScenery}</h2>
              <h2 className='text-xs'>위도 | {camera.cameraLatitude}</h2>
              <h2 className='text-xs'>경도 | {camera.cameraLongitude}</h2>
            </div>
            <button className="text-gray-400 hover:text-gray-800 text-xl" onClick={() => selectCamera(null)}>
            ×
            </button>
          </div>
          <div className="overflow-y-auto">
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
    </div>
  );
}

export default Camera;
