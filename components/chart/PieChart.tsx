"use client"

import { ResponsivePie } from "@nivo/pie";
import { PieData } from "@/utils/chartUtils";



function PieChart({ pieData }: { pieData: PieData[] }) {
  return (
    <div className="h-[40vh] w-[30vw] text-black"style={{
      backgroundColor: "var(--first-color)"
    }}>
      <ResponsivePie
        data={pieData}
        margin={{ top: 40, right: 100, bottom: 40, left: 100 }}
        colors={{scheme: 'tableau10'}}
        innerRadius={0.75}
        enableArcLabels={true}
        arcLinkLabel={d => `${d.id}`}
        arcLinkLabelsTextColor={'#ffffff'}
        legends={[
          {
            anchor: 'right',
            direction: 'column',
            effects: [
              {
                on: 'hover',
                style: {
                  itemTextColor: '#000'
                }
              }
            ],
            itemHeight: 15,
            itemTextColor: '#ffffff',
            itemWidth: 70,
            symbolShape: 'square',
            symbolSize: 12,
            toggleSerie: true,
            translateX: 70,
            translateY: 120
          }
        ]}
        activeInnerRadiusOffset={6}
        layers={["arcs", "arcLabels", "arcLinkLabels", "legends"]}
      />
    </div>
  );
}

export default PieChart;
