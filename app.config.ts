import dotenv from "dotenv"
import { ExpoConfig } from "expo/config"

dotenv.config()

const config: ExpoConfig = {
  name: "repro-clerk-connectivity",
  slug: "repro-clerk-connectivity",
  version: "1.0.0",
  scheme: "myapp",
  plugins: ["expo-router", "expo-secure-store"],
  experiments: {
    typedRoutes: true,
  },
  extra: {
    clerkPublishableKey: process.env.CLERK_PUBLISHABLE_KEY,
  },
}

export default config
