import { useClerk } from "@clerk/clerk-expo"
import { SafeAreaView, Text } from "react-native"
import { VStack } from "react-native-flex-layout"

export default function HomeScreen() {
  const clerk = useClerk()

  return (
    <SafeAreaView>
      <VStack p={5} spacing={5}>
        <Text>
          Clerk publishable key: {String(clerk.publishableKey).slice(0, 20)}...
        </Text>
      </VStack>
    </SafeAreaView>
  )
}
