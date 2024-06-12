import { ClerkProvider } from "@clerk/clerk-expo"
import Constants from "expo-constants"
import { Stack } from "expo-router"
import "react-native-reanimated"
import * as SecureStore from "expo-secure-store"

const tokenCache = {
  async getToken(key: string) {
    try {
      return SecureStore.getItemAsync(key)
    } catch (err) {
      return null
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value)
    } catch (err) {
      return
    }
  },
}

export default function RootLayout() {
  return (
    <ClerkProvider
      tokenCache={tokenCache}
      publishableKey={Constants.expoConfig?.extra?.clerkPublishableKey}
    >
      <Stack screenOptions={{ headerShown: false }} />
    </ClerkProvider>
  )
}
