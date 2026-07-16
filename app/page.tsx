"use client";

import { useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("");
  const [answer, setAnswer] = useState("");

  async function send() {
    if (!message.trim()) return;

    try {
      const res = await fetch(
        process.env.NEXT_PUBLIC_API_URL + "/chat",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message,
          }),
        }
      );

      const data = await res.json();

      setAnswer(data.answer);
    } catch (err) {
      setAnswer("サーバーへ接続できませんでした。");
      console.error(err);
    }
  }

  return (
    <main className="max-w-2xl mx-auto mt-20 p-4">
      <h1 className="text-3xl font-bold mb-6">
        学内AIコンシェルジュ
      </h1>

      <textarea
        className="w-full border rounded p-3"
        rows={4}
        placeholder="質問を入力..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <button
        className="mt-4 px-5 py-2 bg-blue-600 text-white rounded"
        onClick={send}
      >
        送信
      </button>

      <div className="mt-8 border rounded p-4 min-h-32">
        <h2 className="font-bold mb-2">回答</h2>
        <p>{answer}</p>
      </div>
    </main>
  );
}
