"use client";

import { useRef, useEffect } from "react";
import axios from "axios";
import chatbotStore from "@/store/chatbotStore";
import { buildRequestData } from "@/utils/chatbotUtils";

function chatbot() {
  const messages = chatbotStore(state => state.messages);
  const addMessage = chatbotStore(state => state.addMessage);
  const initMessages = chatbotStore(state => state.initMessages);
  const input = chatbotStore(state => state.input);
  const setInput = chatbotStore(state => state.setInput);
  const loading = chatbotStore(state => state.loading);
  const setLoading = chatbotStore(state => state.setLoading);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = { role: "user", text: input };
    addMessage(userMsg);
    setInput("");
    setLoading(true);

    const data = buildRequestData(messages);
    // TODO : 실제 llm 주소로 변경해야함.
    try {
      const response = await axios.post("/llm", {
        data
      });
      const botMsg = {
        role: "bot",
        text: response.data.response.answer || "죄송합니다. 답변을 찾지 못했습니다."
      };
      addMessage(botMsg);
    } catch (error) {
      addMessage({ role: "bot", text: "현재 답변이 불가능한 상태입니다." });
    }
    setLoading(false);
  };

  const handleKeyDown = (e: any) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleReset = () => {
    initMessages();
    setInput("");
  };

  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex-1 overflow-y-auto p-3 border rounded bg-slate-50 mb-2">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={
              msg.role === "user"
                ? "text-left flex justify-end mb-2"
                : "text-left flex justify-start mb-2"
            }
          >
            <div
              className={
                msg.role === "user"
                  ? "inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-lg max-w-xs"
                  : "inline-block bg-gray-200 text-gray-800 px-3 py-1 rounded-lg max-w-xs"
              }
            >
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      {/* 입력창 */}
      <form
        className="flex gap-2"
        onSubmit={e => {
          e.preventDefault();
          handleSend();
        }}
      >
        <input
          type="text"
          className="flex-1 border rounded px-2 py-1"
          placeholder="질문을 입력하세요..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={loading}
        />
        <button
          type="button"
          className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-40"
          disabled={loading}
          onClick={() => handleReset()}
        >
          리셋
        </button>
        <button
          type="submit"
          className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-40"
          disabled={!input.trim() || loading}
        >
          보내기
        </button>
      </form>
    </div>
  );
}


export default chatbot;