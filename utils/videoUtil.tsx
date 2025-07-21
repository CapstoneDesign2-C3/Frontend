export type Video = {
  detectionId : number,
  cameraScenery : string,
  thumbnailUrl : string,
  appearedTime : string,
  exitTime : string,
}

export type VideoDetail = {
  videoUrl: string,
  detectedObjectUUID: string,
  detectedObjectAlias: string,
  detectedObjectCropUrl: string,
  appearedTime: string,
  exitTime: string,
  categoryName: string,
  feature: string
};

export type VideoSummary = {
  videoId: number;
  thumbnailUrl: string;
  startTime: string;
  endTime: string;
};