"use client"

import { BarData } from "@/utils/chartUtils";
import { Bar } from "@nivo/bar";

function BarChart({ barData }: { barData: BarData[] }){
  return(
    <div className="border">
      <Bar
        data={barData}
        height={300}
        width={650}
        keys={[
          'data'
        ]}
        labelTextColor="inherit:brighter(1.2)"
        margin={{
          bottom: 60,
          left: 80,
          right: 60,
          top: 60
        }}
        colorBy="data"
        colors={{ scheme: "purple_blue"}}
        padding={0.4}
        
      />
    </div>
  );
}

export default BarChart;