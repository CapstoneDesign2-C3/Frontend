export type PieData = {
  id: string;
  value: number;
}

export type BarData = {
  id: string;
  data: number;
}

export type LineData = {
  id: string | number;
  data: readonly {
        x: string | number | Date | null;
        y: string | number | Date | null;
    }[];
}