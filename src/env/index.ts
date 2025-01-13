import { z } from "zod";

const envSchema = z.object({
  VITE_CLERK_PUBLISHABLE_KEY: z.string(),
  VITE_MAP_STYLE: z.string().default("mapbox://styles/mapbox/standard"),
  VITE_MAPBOX_ACESS_TOKEN: z.string(),
});

export const env = envSchema.parse(import.meta.env);
