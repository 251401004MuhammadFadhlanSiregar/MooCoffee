import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";
import tailwindcss from "@tailwindcss/vite";
import chatHandler from "./api/chat.js";

function localChatApi() {
  return {
    name: "local-chat-api",
    configureServer(server) {
      server.middlewares.use("/api/chat", async (request, response, next) => {
        const chunks = [];
        let bodySize = 0;

        try {
          for await (const chunk of request) {
            bodySize += chunk.length;
            if (bodySize > 32_000) {
              response.statusCode = 413;
              response.setHeader("Content-Type", "application/json");
              response.end(JSON.stringify({ error: "Pesan terlalu besar." }));
              return;
            }
            chunks.push(chunk);
          }

          let body;
          try {
            body = JSON.parse(globalThis.Buffer.concat(chunks).toString("utf8"));
          } catch {
            response.statusCode = 400;
            response.setHeader("Content-Type", "application/json");
            response.end(JSON.stringify({ error: "Format request tidak valid." }));
            return;
          }

          const apiResponse = {
            status(statusCode) {
              response.statusCode = statusCode;
              return this;
            },
            setHeader(name, value) {
              response.setHeader(name, value);
            },
            json(payload) {
              response.setHeader("Content-Type", "application/json");
              response.end(JSON.stringify(payload));
            },
          };

          await chatHandler({ method: request.method, body }, apiResponse);
        } catch (error) {
          next(error);
        }
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  Object.assign(
    globalThis.process.env,
    loadEnv(mode, globalThis.process.cwd(), ""),
  );

  return {
    plugins: [react(), tailwindcss(), localChatApi()],
  };
});
