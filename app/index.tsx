import {
  SignedIn,
  SignedOut,
  useClerk,
  useOAuth,
  useSignIn,
  useUser,
} from "@clerk/clerk-expo"
import { useState } from "react"
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native"
import { Flex, HStack, VStack } from "react-native-flex-layout"

export default function HomeScreen() {
  const clerk = useClerk()
  const { user } = useUser()
  const { setActive, isLoaded, signIn } = useSignIn()
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" })

  const handleOAuthSignIn = async () => {
    try {
      const { createdSessionId } = await startOAuthFlow()
      if (!setActive) throw new Error("setActive is not defined")
      if (createdSessionId) setActive({ session: createdSessionId })
    } catch (err) {
      alert(JSON.stringify(err))
    }
  }

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleCredentialedSignIn = async () => {
    try {
      if (!setActive) throw new Error("setActive is not defined")
      const completeSignIn = await signIn.create({
        identifier: email,
        password,
      })
      await setActive({ session: completeSignIn.createdSessionId })
    } catch (err) {
      alert(JSON.stringify(err))
    }
  }

  if (!isLoaded) return <ActivityIndicator />

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }}>
        <VStack p={20}>
          <Text>
            Clerk publishable key: {String(clerk.publishableKey).slice(0, 20)}
            ...
          </Text>

          <SignedIn>
            <VStack pv={20} spacing={20}>
              <Text>You are signed in as {user?.id}</Text>
              <Button onPress={clerk.signOut} title="Sign Out" />
            </VStack>
          </SignedIn>

          <SignedOut>
            <VStack pv={20} spacing={20} shouldWrapChildren>
              <Button onPress={handleOAuthSignIn} title="Sign In with OAuth" />
              <HStack spacing={10} justify="evenly">
                <TextInput
                  value={email}
                  onChangeText={setEmail}
                  placeholder="Email"
                  keyboardType="email-address"
                  style={{ flex: 1, borderWidth: 1 }}
                />
                <TextInput
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Password"
                  secureTextEntry
                  style={{ flex: 1, borderWidth: 1 }}
                />
                <Button onPress={handleCredentialedSignIn} title="Sign In" />
              </HStack>
            </VStack>
          </SignedOut>
        </VStack>
      </ScrollView>
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
