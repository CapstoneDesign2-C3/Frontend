"use client"

import { useEffect } from "react";
import BarChart from "@/components/chart/BarChart";
import LineChart from "@/components/chart/LineChart";
import PieChart from "@/components/chart/PieChart";
import chartStore from "@/store/chartStore";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function HomePage() {
  const { eventData, timeData, cameraData, riskData, date, fetchData, setDate } = chartStore();

  // 페이지 첫 로딩 시 오늘 날짜로 fetch
  useEffect(() => {
    setDate(new Date());
    fetchData();
  }, []);

  useEffect(() => {
    fetchData();
  }, [date]);

  return (
    <div className="flex-1 py-3">
      <div className="flex justify-start items-center w-full mb-8 gap-8 px-4">
        <div className="left-4 top-14 white-component rounded px-6 py-1 shadow font-medium">
          <DatePicker
            selected={date}
            onChange={(selectedDate) => {
              if (selectedDate) setDate(selectedDate);
            }}
            dateFormat="yyyy-MM-dd"
            maxDate={new Date()}
            className="text-center text-sm"
          />
        </div>
      </div>
      <div className="flex justify-center items-center mb-8 gap-8">
        <div>
          <div>이벤트별 발생 건수</div>
          <PieChart pieData={eventData}/>
        </div>
        <div>
          <div>시간대별 이벤트 발생 건수</div>
          <LineChart lineData={timeData}/>
        </div>
      </div>
      <div className="flex justify-center items-center mb-8 gap-8">
        <div>
          <div>카메라별 이벤트 발생 건수</div>
          <BarChart barData={cameraData}/>
        </div>
        <div>
          <div>위험 레벨별 이벤트 발생 건수</div>
          <BarChart barData={riskData}/>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
