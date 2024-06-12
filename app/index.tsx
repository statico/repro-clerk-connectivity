import { useClerk } from "@clerk/clerk-expo"
import { SafeAreaView, Text, TouchableOpacity } from "react-native"
import { Flex, VStack } from "react-native-flex-layout"

export default function HomeScreen() {
  const clerk = useClerk()

  return (
    <SafeAreaView>
      <VStack p={20} spacing={5}>
        <Text>
          Clerk publishable key: {String(clerk.publishableKey).slice(0, 20)}...
        </Text>
        <Text>
          State: {clerk.user ? `signed in as ${clerk.user.id}` : "signed out"}
        </Text>
        <Button onPress={clerk.signOut} title="Sign Out" />
      </VStack>
    </SafeAreaView>
  )
}

const Button = ({ onPress, title }: { onPress: () => void; title: string }) => (
  <TouchableOpacity onPress={onPress}>
    <Flex items="center" justify="center" p={5} bg="blue" radius={5}>
      <Text style={{ color: "white" }}>{title}</Text>
    </Flex>
  </TouchableOpacity>
)
