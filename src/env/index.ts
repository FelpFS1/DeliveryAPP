import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  VITE_CLERK_PUBLISHABLE_KEY: z.string(),
  MAP_STYLE: z.string().default("mapbox://styles/mapbox/standard"),
  MAPBOX_ACESS_TOKEN: z.string(),
});

const env = envSchema.parse(process.env);

export default env;
