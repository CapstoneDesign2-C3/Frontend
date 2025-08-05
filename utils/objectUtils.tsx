export type DetectedObject = {
  detectedObjectId: number,
  categoryName: string,
  cropImg: string,
  alias: string | null,
  feature: string
};

export function toLocalDateTimeString(date: Date | null, form: "start" | "end"): string {
  if (!date) return "";
  const yyyy = date.getFullYear();
  const MM = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  
  let hh = '00', mm = '00', ss = '00';
  if (form === 'end') {
    hh = '23'; mm = '59'; ss = '59';
  }
  
  return `${yyyy}-${MM}-${dd}T${hh}:${mm}:${ss}`;
}