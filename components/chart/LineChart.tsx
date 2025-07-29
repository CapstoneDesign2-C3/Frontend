"use client"

import { ResponsiveLine } from "@nivo/line";
import { LineData } from "@/utils/chartUtils";

function LineChart({ lineData }: { lineData: LineData[] }) {
  return (
    <div style={{ height: 400, width: 900 }} className="border">
      <ResponsiveLine
        animate
        axisBottom={{
          format: '%H',
          tickValues: 'every 1 hour',
        }}
        
        curve="linear"
        data={lineData}
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
