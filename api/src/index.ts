import cors from "cors";
import express from "express";
import { z } from "zod";

const envSchema = z.object({
  PORT: z.coerce.number().int().positive().default(3001),
  BOXPULSE_VERBOSE_LOGS: z
    .enum(["true", "false"])
    .default("false")
    .transform((value) => value === "true")
});

const env = envSchema.parse(process.env);
const app = express();

app.use(cors());
app.use(express.json());

const healthResponse = { status: "ok" } as const;

app.get("/health", (_request, response) => {
  response.json(healthResponse);
});

app.get("/api/v1/health", (_request, response) => {
  response.json(healthResponse);
});

app.listen(env.PORT, "0.0.0.0", () => {
  if (env.BOXPULSE_VERBOSE_LOGS) {
    console.info(`BoxPulse API listening on port ${env.PORT}`);
  }
});
