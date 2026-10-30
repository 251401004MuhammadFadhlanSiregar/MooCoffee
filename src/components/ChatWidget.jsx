/* eslint tailwindcss/no-custom-classname: off */
import { useRef, useState } from "react";
import "./ChatWidget.css";

const welcomeMessage = {
  role: "assistant",
  content:
    "Halo! Saya asisten Moo Coffee. Ada yang ingin kamu tahu tentang menu, promo, atau kedai kami?",
};

const suggestions = ["Bagaimana rasa Caramel Macchiato?", "Di mana lokasi kedainya?"];

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([welcomeMessage]);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef(null);

  const sendMessage = async (text = input) => {
    const content = text.trim();
    if (!content || isSending) return;

    const nextMessages = [...messages, { role: "user", content }];
    setMessages(nextMessages);
    setInput("");
    setError("");
    setIsSending(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages.slice(-11) }),
      });
      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          result.error ||
            `Chatbot gagal merespons (HTTP ${response.status}). Pastikan API tersedia di deployment Vercel.`,
        );
      }

      if (typeof result.reply !== "string" || !result.reply.trim()) {
        throw new Error("Chatbot belum memberikan jawaban. Silakan coba lagi.");
      }

      setMessages((current) => [
        ...current,
        { role: "assistant", content: result.reply.trim() },
      ]);
    } catch (requestError) {
      setError(requestError.message || "Koneksi bermasalah. Silakan coba lagi.");
    } finally {
      setIsSending(false);
      inputRef.current?.focus();
    }
  };

  return (
    <div className="chat-widget">
      {isOpen && (
        <section
          className="chat-panel"
          aria-label="Chat Moo Coffee"
          aria-describedby="chat-description"
        >
          <header className="chat-header">
            <div className="chat-header-copy">
              <span className="chat-kicker">MOO COFFEE</span>
              <h2>Teman ngobrolmu</h2>
              <p id="chat-description">Tanya menu, promo, atau info kedai.</p>
            </div>
            <button
              className="chat-minimize"
              type="button"
              aria-label="Minimalkan chatbot"
              onClick={() => setIsOpen(false)}
            >
              <span aria-hidden="true">−</span>
            </button>
          </header>

          <div className="chat-messages" aria-live="polite">
            {messages.map((message, index) => (
              <p
                className={`chat-message chat-message-${message.role}`}
                key={`${message.role}-${index}`}
              >
                {message.content}
              </p>
            ))}

            {messages.length === 1 && (
              <div className="chat-suggestions" aria-label="Contoh pertanyaan">
                {suggestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    disabled={isSending}
                    onClick={() => sendMessage(suggestion)}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}

            {isSending && (
              <p className="chat-status" role="status">
                Sedang menyiapkan jawaban…
              </p>
            )}
            {error && (
              <p className="chat-error" role="alert">
                {error}
              </p>
            )}
          </div>

          <form
            className="chat-form"
            onSubmit={(event) => {
              event.preventDefault();
              sendMessage();
            }}
          >
            <label className="chat-input-label" htmlFor="chat-input">
              Pesan
            </label>
            <input
              id="chat-input"
              ref={inputRef}
              type="text"
              maxLength={1000}
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Tulis pertanyaan..."
              disabled={isSending}
            />
            <button
              className="chat-send"
              type="submit"
              aria-label="Kirim pesan"
              disabled={!input.trim() || isSending}
            >
              <span aria-hidden="true">↑</span>
            </button>
          </form>
          <p className="chat-footnote">Jawaban berdasarkan informasi di website.</p>
        </section>
      )}

      <button
        className={`chat-launcher${isOpen ? " chat-launcher-open" : ""}`}
        type="button"
        aria-label={isOpen ? "Minimalkan chatbot" : "Buka chatbot"}
        aria-expanded={isOpen}
        onClick={() => setIsOpen((open) => !open)}
      >
        {isOpen ? (
          <span className="chat-launcher-close" aria-hidden="true">×</span>
        ) : (
          <>
            <span className="chat-launcher-mark" aria-hidden="true">K</span>
            <span className="chat-launcher-label">Tanya kami</span>
          </>
        )}
      </button>
    </div>
  );
}
