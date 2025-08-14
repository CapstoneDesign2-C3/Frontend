"use client"

import { BarData } from "@/utils/chartUtils";
import { ResponsiveBar } from "@nivo/bar";

function BarChart({ barData }: { barData: BarData[] }){
  return(
    <div className="h-[40vh] w-[35vw] text-black" style={{
      backgroundColor: "var(--first-color)"
    }}>
      <ResponsiveBar
        data={barData}
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
        colorBy="indexValue"
        colors={{ scheme: "tableau10" }}
        padding={0.4}
        theme={{
          labels: { text: { fill: "#fff" } },
          axis: {
            ticks: { text: { fill: "#fff" } },
            legend: { text: { fill: "#fff" } }
          },
          legends: { text: { fill: "#fff" } }
        }}
      />
    </div>
  );
}

export default BarChart;