export type Message = {
  role: string;
  text: string;
}

export function buildRequestData(messages: Message[]) {
  const data = [];
  for (let i = 0; i < messages.length; i++) {
    if (messages[i].role === "user") {
      // 다음 메시지가 bot인 경우 answer로 세팅, 없거나 user면 빈 문자열
      const next = messages[i + 1];
      data.push({
        question: messages[i].text,
        answer:
          next && next.role === "bot"
            ? next.text
            : ""
      });
    }
  }
  return { data };
}