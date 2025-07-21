export type Event = {
  videoId: number;
  eventUUID: string;
  eventCodeName: string;
  videoThumbnailUrl: string;
  appearedTime: string;
  exitTime: string;
}

export type Video = {
  videoUrl: string,
  summary: string,
  eventUUID: string,
  appearedTime: string,
  exitTime: string,
  eventCodeName: string,
  eventRisk: string
}