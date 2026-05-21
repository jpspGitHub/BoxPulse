"use client";

import { useEffect, useState } from "react";

const apiBaseUrl =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:3001/api/v1";

export default function Home() {
  const [apiStatus, setApiStatus] = useState("checking");

  useEffect(() => {
    const controller = new AbortController();

    fetch(`${apiBaseUrl}/health`, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Healthcheck failed");
        }

        return response.json() as Promise<{ status?: string }>;
      })
      .then((body) => setApiStatus(body.status ?? "unknown"))
      .catch(() => setApiStatus("unavailable"));

    return () => controller.abort();
  }, []);

  return (
    <main>
      <section className="status-panel" aria-label="BoxPulse web status">
        <h1>BoxPulse Web is running</h1>
        <p>API status: {apiStatus}</p>
      </section>
    </main>
  );
}
