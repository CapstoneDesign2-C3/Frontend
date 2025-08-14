import TrackingMap from '@/components/map/TrackingMap';
import SideBar from '@/app/object/sidebar/SideBar';

function HomeLayout(){
  return (
    <div className="h-full">
      <div className="flex h-full">
        <TrackingMap />
        <SideBar />
      </div>
    </div>
  );
} 

export default HomeLayout;
