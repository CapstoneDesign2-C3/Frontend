export type Video = {
  detectionId : number,
  cameraScenery : string,
  detectionCropImg : string,
  appearedTime : string,
  exitTime : string,
}

export type VideoDetail = {
  videoUrl: string,
  detectedObjectUUID: string,
  detectedObjectAlias: string,
  detectedObjectCropImg: string,
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