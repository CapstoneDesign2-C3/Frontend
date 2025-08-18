import TrackingMap from '@/components/map/TrackingMap';
import SideBar from '@/app/object/sidebar/SideBar';

function HomeLayout(){
  return (
    <div className="h-full w-full">
      <div className="flex h-full w-full">
        <TrackingMap />
        <SideBar />
      </div>
    </div>
  );
} 

export default HomeLayout;
