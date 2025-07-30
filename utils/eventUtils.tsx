export type Event = {
  videoId: number;
  eventId: number;
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

export type Camera = {
  cameraId: number;
  cameraScenery: string;
  cameraLatitude: number;
  cameraLongitude: number;
  videos: any[];
};

export type EventCode = {
  eventCodeId: number;
  eventCodeName: string;
};