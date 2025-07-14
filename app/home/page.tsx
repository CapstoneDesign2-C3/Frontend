import TrackingMap from '../../components/map/TrackingMap';
import CommonHeader from '../../components/header/Header'
import SideBar from '../../components/sidebar/SideBar';

function HomeLayout(){
  return (
    <div className="h-screen w-screen">
        <CommonHeader />
      <div className="flex h-full">
        <TrackingMap />
        <SideBar />
      </div>
    </div>
  );
} 

export default HomeLayout;
