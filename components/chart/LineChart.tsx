"use client"

import { ResponsiveLine } from "@nivo/line";
import { LineData } from "@/utils/chartUtils";

function LineChart({ lineData }: { lineData: LineData[] }) {
  const safeData = Array.isArray(lineData) ? lineData : []; 

  return (
    <div className="border border h-[40vh] w-[45vw]">
      <ResponsiveLine
        animate
        axisBottom={{
          format: '%H',
          tickValues: 'every 1 hour',
        }}
        curve="linear"
        data={safeData}
        colors={['#87A8CB']}
        enableTouchCrosshair
        initialHiddenIds={['cognac']}
        margin={{ bottom: 60, left: 30, right: 20, top: 20 }}
        pointSize={0}
        useMesh
        enableGridX={false}
        xFormat="time:%Y-%m-%dT%H:%M:%S"
        xScale={{
          type: 'time',
          format: '%Y-%m-%dT%H:%M:%S',
          precision: 'hour',
          useUTC: false
        }}
        yScale={{
          type: 'linear'
        }}
      />
    </div>
  );
}


export default LineChart;
