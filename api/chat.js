import knowledge from "../src/data/chatbot-knowledge.json" with { type: "json" };

const MAX_MESSAGES = 11;
const MAX_MESSAGE_LENGTH = 1000;

export default async function handler(request, response) {
  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    return response.status(405).json({ error: "Metode request tidak didukung." });
  }

  const apiKey = globalThis.process.env.AI_API_KEY;
  const model = globalThis.process.env.AI_MODEL || "qwen/qwen3.8-27b";
  if (!apiKey) {
    return response.status(503).json({
      error: "Chatbot belum dikonfigurasi. Tambahkan AI_API_KEY di Environment Variables Vercel, lalu redeploy.",
    });
  }

  const messages = request.body?.messages;
  if (
    !Array.isArray(messages) ||
    messages.length === 0 ||
    messages.length > MAX_MESSAGES ||
    messages.some(
      (message) =>
        !message ||
        !["user", "assistant"].includes(message.role) ||
        typeof message.content !== "string" ||
        message.content.trim().length === 0 ||
        message.content.length > MAX_MESSAGE_LENGTH,
    )
  ) {
    return response.status(400).json({ error: "Format pesan tidak valid." });
  }

  const apiUrl = getChatCompletionsUrl(
    globalThis.process.env.AI_API_URL ||
      "https://api.groq.com/openai/v1/chat/completions",
  );
  const systemMessage = {
    role: "system",
    content: [
      "Kamu adalah asisten ramah Kopi Ruang Kita. Jawab dalam bahasa Indonesia dengan singkat dan sopan.",
      "Gunakan hanya fakta pada data berikut. Jangan mengarang bahan, rasa, fasilitas, harga, promo, atau informasi lain.",
      "Jika informasi tidak tersedia, katakan bahwa informasinya belum tercantum dan arahkan pengunjung untuk menghubungi kedai.",
      "Data website:",
      JSON.stringify(knowledge),
    ].join("\n"),
  };

  try {
    const upstream = await fetch(apiUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        messages: [systemMessage, ...messages],
        max_tokens: 300,
        temperature: 0.3,
      }),
      signal: AbortSignal.timeout(20000),
    });

    if (!upstream.ok) {
      console.error("AI provider request failed with status:", upstream.status);
      return response.status(502).json({
        error: getProviderErrorMessage(upstream.status),
      });
    }

    const result = await upstream.json();
    const reply = result.choices?.[0]?.message?.content;
    if (typeof reply !== "string" || !reply.trim()) {
      console.error("AI provider returned an empty or invalid reply.");
      return response.status(502).json({
        error: "Layanan AI memberikan jawaban yang tidak valid. Silakan coba lagi.",
      });
    }

    return response.status(200).json({ reply: reply.trim() });
  } catch (error) {
    console.error("AI provider request error:", error);
    return response.status(502).json({
      error: "Tidak dapat terhubung ke layanan AI. Silakan coba lagi nanti.",
    });
  }
}

function getChatCompletionsUrl(configuredUrl) {
  const url = new URL(configuredUrl);
  const path = url.pathname.replace(/\/+$/, "");

  if (path.endsWith("/chat/completions")) {
    url.pathname = path;
  } else if (path.endsWith("/v1")) {
    url.pathname = `${path}/chat/completions`;
  } else {
    url.pathname = `${path}/v1/chat/completions`;
  }

  return url.toString();
}

function getProviderErrorMessage(status) {
  if (status === 401) {
    return "Groq menolak AI_API_KEY (HTTP 401). Periksa apakah key aktif. Di Vercel, perbarui AI_API_KEY lalu redeploy.";
  }
  if (status === 403) {
    return "Groq menolak akses untuk API key ini (HTTP 403). Periksa status key dan izin project di Groq Console.";
  }
  if (status === 404) {
    return "Endpoint atau model tidak ditemukan. Periksa AI_API_URL dan AI_MODEL di dashboard provider.";
  }
  if (status === 429) {
    return "Batas penggunaan API tercapai. Periksa kuota atau billing provider.";
  }
  return `Layanan AI mengembalikan error (HTTP ${status}). Periksa konfigurasi provider lalu coba lagi.`;
}
