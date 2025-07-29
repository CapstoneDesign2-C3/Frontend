import BarChart from "@/components/chart/BarChart";
import LineChart from "@/components/chart/LineChart";
import PieChart from "@/components/chart/PieChart";
import { mock_camera_bar, mock_line, mock_pie, mock_risk_bar } from "@/components/mock/MockData";

function HomePage() {
  return (
    <div className="flex-1 py-3">
      <div className="flex justify-center items-center w-full mb-8 gap-8">
        <div>
          <div>이벤트별 발생 건수</div>
          <PieChart pieData={mock_pie}/>
        </div>
        <div>
          <div>시간대별 이벤트 발생 건수</div>
          <LineChart lineData={mock_line}/>
        </div>
      </div>
      <div className="flex justify-center items-center w-full mb-8 gap-8">
        <div>
          <div>카메라별 이벤트 발생 건수</div>
          <BarChart barData={mock_camera_bar}/>
        </div>
        <div>
          <div>위험 레벨별 이벤트 발생 건수</div>
          <BarChart barData={mock_risk_bar}/>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
