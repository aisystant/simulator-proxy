// simulator-proxy — прозрачный proxy simulator.aisystant.com → Railway.
// Поддерживает WebSocket (нужен Streamlit /_stcore/stream).
// WP-319 Ф7.

interface Env {
  UPSTREAM: string;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    url.hostname = env.UPSTREAM;
    url.protocol = "https:";

    const headers = new Headers(request.headers);
    headers.set("host", env.UPSTREAM);

    const proxyReq = new Request(url.toString(), {
      method: request.method,
      headers,
      body: request.body,
      redirect: "manual",
    });

    return fetch(proxyReq);
  },
};
