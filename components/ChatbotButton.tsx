"use client"

import { useState } from "react";
import Modal from "./Modal";
import Chatbot from "@/components/Chatbot"

function chatbotButton(){
  const [modalOpen, setModalOpen] = useState(false);
  const handleClose = () => {
    setModalOpen(false);
  };

  return (
    <>
    <button
      aria-label="챗봇 열기"
      onClick={() => setModalOpen(true)}
      className="top-2 right-5 border border-gray-300 text-gray-500 bg-white shadow rounded-full w-8 h-8 flex items-center justify-center z-50 hover:border-gray-500 hover:text-black"
    >
    <svg
      width={18}
      height={18}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 8a3.5 3 0 0 1 3.5-3h1a3.5 3 0 0 1 3.5 3 3 3 0 0 1-2 3 3 4 0 0 0-2 4" />
      <path d="M12 19l0 .01" />
    </svg>
  </button>

    {modalOpen && (
      <Modal open={modalOpen} onClose={handleClose}>
        <Chatbot />
      </Modal>
    )}
  </>
  );
}

export default chatbotButton;