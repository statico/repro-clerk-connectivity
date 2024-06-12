import { useClerk } from "@clerk/clerk-expo"
import { SafeAreaView, Text, View } from "react-native"

export default function HomeScreen() {
  const clerk = useClerk()

  return (
    <SafeAreaView>
      <View style={{ padding: 5 }}>
        <Text>Hello, world! domain={clerk.publishableKey}</Text>
      </View>
    </SafeAreaView>
  )
}
