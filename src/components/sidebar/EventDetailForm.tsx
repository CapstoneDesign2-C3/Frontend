type Event = {
  id: number;
  object_id: number;
  title: string;
  thumbnailUrl: string;
  videoUrl: string;
  desc: string;
  time: string;
  latitudeY: number;
  longitudeX: number;
};

type Object = {
  id: number,
  categoryName: string,
  cropImageUrl: string,
  alias: string | null,
  feature: string
};

interface EventDetailFormProps {
  event: Event;
  object: Object;
}

function EventDetailForm({event, object}: EventDetailFormProps) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">{event.title}</h2>
      <div className="flex flex-col items-center justify-center text-center">
        <video
          src={event.videoUrl}
          controls
          autoPlay
          className="w-200 h-80 rounded mb-2 bg-black"/>
      </div>
      <h2 className="text-l mb-2">{object.alias ?? "이름 없음"}</h2>
      <div className="flex">
        <div>
          <img src={object.cropImageUrl} alt={object.alias ?? "이름 없음"} className="w-[100px] h-[100px] object-cover rounded mb-2" />
          <h2 className="text-xs mb-2">출현 | {event.time}</h2>
          <h2 className="text-xs mb-2">퇴장 | {event.time}</h2>
        </div>
        <div className="w-full">
          <h2 className="text-s font-semibold mb-2">상황 요약</h2>
          <div className="border rounded bg-white p-4 max-h-[50%] w-full text-sm mb-2 flex overflow-y-auto">
            {event.desc}
          </div>
          <h2 className="text-xs mb-2">클래스 | {object.categoryName}</h2>
          <h2 className="text-xs mb-2">특징 | {object.feature}</h2>
        </div>
      </div>
    </div>
  );
}

export default EventDetailForm;