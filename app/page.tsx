"use client";

import React, { useEffect, useState } from "react";
import Modal from "@/components/Modal";
import { Camera } from "@/utils/cameraUtils";
import axios from "axios";

type CameraFormProps = {
  onSubmit: (data: Omit<Camera, "cameraId">) => void;
  onCancel: () => void;
};

function CameraAddForm({ onSubmit, onCancel }: CameraFormProps) {
  const [form, setForm] = useState<Omit<Camera, "cameraId">>({
    cameraIP: "",
    cameraPort: 554,
    latitude: 0,
    longitude: 0,
    locationName: "",
    locationAddress: "",
    locationAddressDetail: "",
    rtspID: "",
    rtspPassword: "",
    streamPath: "",
    cameraName: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]:
        name === "cameraPort" ||
        name === "latitude" ||
        name === "longitude"
          ? Number(value)
          : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form className="space-y-3 max-h-[80vh] overflow-auto" onSubmit={handleSubmit}>
      <input
        name="cameraName"
        placeholder="카메라명"
        className="w-full border px-3 py-2 white-component"
        value={form.cameraName}
        onChange={handleChange}
        required
      />
      <input
        name="cameraIP"
        placeholder="IP"
        className="w-full border px-3 py-2 white-component"
        value={form.cameraIP}
        onChange={handleChange}
        required
      />
      <input
        name="cameraPort"
        placeholder="PORT"
        className="w-full border px-3 py-2 white-component"
        value={form.cameraPort}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="latitude"
        step="any"
        placeholder="위도"
        className="w-full border px-3 py-2 white-component"
        value={form.latitude}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="longitude"
        step="any"
        placeholder="경도"
        className="w-full border px-3 py-2 white-component"
        value={form.longitude}
        onChange={handleChange}
        required
      />
      <input
        name="locationName"
        placeholder="위치명"
        className="w-full border px-3 py-2 white-component"
        value={form.locationName}
        onChange={handleChange}
      />
      <input
        name="locationAddress"
        placeholder="주소 1"
        className="w-full border px-3 py-2 white-component"
        value={form.locationAddress}
        onChange={handleChange}
      />
      <input
        name="locationAddressDetail"
        placeholder="주소 2"
        className="w-full border px-3 py-2 white-component"
        value={form.locationAddressDetail}
        onChange={handleChange}
      />
      <input
        name="rtspID"
        placeholder="RTSP ID"
        className="w-full border px-3 py-2 white-component"
        value={form.rtspID}
        onChange={handleChange}
        required
      />
      <input
        name="rtspPassword"
        placeholder="RTSP PW"
        className="w-full border px-3 py-2 white-component"
        value={form.rtspPassword}
        onChange={handleChange}
        required
      />
      <input
        name="streamPath"
        placeholder="Stream Path"
        className="w-full border px-3 py-2 white-component"
        value={form.streamPath}
        onChange={handleChange}
        required
      />
      <div className="flex justify-end gap-3 mt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border rounded hover:bg-gray-100 text-black"
        >
          취소
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          저장
        </button>
      </div>
    </form>
  );
}

export default function CameraListPage() {
  const [cameras, setCameras] = useState<Camera[]>([]);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchCameras = async () => {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
      const res = await axios.get(`${backendUrl}/api/v1/camera/cameras`);
      setCameras(res.data);
    };
    fetchCameras();
  }, []);

  const handleAdd = async (data: Omit<Camera, "cameraId">) => {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    try {
      await axios.post(`${backendUrl}/api/v1/camera`, data, {
        headers: { "Content-Type": "application/json" },
      });
      setModalOpen(false);
      const res = await axios.get(`${backendUrl}/api/v1/camera/cameras`);
      setCameras(res.data);
    } catch (error) {
      alert("카메라 추가 중 오류가 발생했습니다.");
    }
  };

  const handleDelete = async (cameraId: number) => {
  if (!window.confirm("정말 이 카메라를 삭제하시겠습니까?")) {
      return;
    }
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    try {
      await axios.delete(`${backendUrl}/api/v1/camera/${cameraId}`);
      const res = await axios.get(`${backendUrl}/api/v1/camera/cameras`);
      setCameras(res.data);
    } catch (error) {
      alert("카메라 삭제 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto py-10 overflow-x-auto">
      <h1 className="text-2xl font-bold mb-6">카메라 목록</h1>
      <table className="min-w-[1000px] border">
        <thead>
          <tr>
            <th className="py-2 px-4 border">ID</th>
            <th className="py-2 px-4 border">이름</th>
            <th className="py-2 px-4 border">위치명</th>
            <th className="py-2 px-4 border">주소 1</th>
            <th className="py-2 px-4 border">주소 2</th>
            <th className="py-2 px-4 border">IP</th>
            <th className="py-2 px-4 border">PORT</th>
            <th className="py-2 px-4 border">위/경도</th>
            <th className="py-2 px-4 border">삭제</th>
          </tr>
        </thead>
        <tbody>
          {cameras.map((cam) => (
            <tr key={cam.cameraId} className="text-center border-t">
              <td className="py-2 px-4 border">{cam.cameraId}</td>
              <td className="py-2 px-4 border">{cam.cameraName}</td>
              <td className="py-2 px-4 border">{cam.locationName}</td>
              <td className="py-2 px-4 border">{cam.locationAddress}</td>
              <td className="py-2 px-4 border">{cam.locationAddressDetail}</td>
              <td className="py-2 px-4 border">{cam.cameraIP}</td>
              <td className="py-2 px-4 border">{cam.cameraPort}</td>
              <td className="py-2 px-4 border">
                {cam.latitude}, {cam.longitude}
              </td>
              <td className="py-2 px-4 border">
                <button
                  onClick={() => handleDelete(cam.cameraId)}
                  className="bg-red-500 px-3 py-1 rounded text-white hover:bg-red-600"
                >
                  삭제
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        onClick={() => setModalOpen(true)}
        className="mt-6 inline-block px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        카메라 추가
      </button>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <CameraAddForm onSubmit={handleAdd} onCancel={() => setModalOpen(false)} />
      </Modal>
    </div>
  );
}
