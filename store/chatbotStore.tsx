import { Message } from "@/utils/chatbotUtils";
import { create } from "zustand";

type ChatbotStore = {
  messages: Message[];
  addMessage: (message: Message) => void;
  initMessages: () => void;
  input: string;
  setInput: (input: string) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

const chatbotStore = create<ChatbotStore> ((set) => ({
  messages: [],
  addMessage: (message) => set(state => ({
    messages: [...state.messages, message]
  })),
  initMessages: () => set({ messages: [] }),
  input: "",
  setInput: (input) => (set({ input })),
  loading : false,
  setLoading: (loading) => (set({ loading })),
}))

export default chatbotStore;