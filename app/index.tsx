import { useClerk, useOAuth, useSignIn, useUser } from "@clerk/clerk-expo"
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
  const [email, setEmail] = useState("")

  const handleOAuthSignIn = async () => {
    try {
      // startOAuthFlow() fails when the network is down
      const { createdSessionId } = await startOAuthFlow()
      console.log("startOAuthFlow succeeded") // Not printed when network is down
      if (!setActive) throw new Error("setActive is not defined")
      if (createdSessionId) {
        setActive({ session: createdSessionId })
        alert("Sign in successful!")
      }
    } catch (err) {
      alert(String(err))
    }
  }

  const handleCredentialedSignIn = async () => {
    try {
      if (!setActive) throw new Error("setActive is not defined")
      const { createdSessionId, supportedFirstFactors } = await signIn.create({
        identifier: email,
      })
      if (!supportedFirstFactors.length)
        // supportedFirstFactors is empty when the network is down
        throw new Error(
          "supportedFirstFactors is empty! " +
            JSON.stringify(supportedFirstFactors)
        )
      await setActive({ session: createdSessionId })
      alert("Sign in successful!")
    } catch (err) {
      alert(String(err))
    }
  }

  if (!isLoaded)
    return (
      <Flex fill center>
        <ActivityIndicator />
        <Text>Waiting for Clerk...</Text>
      </Flex>
    )

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }}>
        <VStack p={20} spacing={20}>
          <Text>
            Clerk publishable key: {String(clerk.publishableKey).slice(0, 20)}
            ...
          </Text>

          {!!user && (
            <VStack pv={20} spacing={20}>
              <Text>You are signed in as {user?.id}</Text>
              <Button onPress={clerk.signOut} title="Sign Out" />
            </VStack>
          )}

          {!user && (
            <VStack pv={20} spacing={20} shouldWrapChildren>
              <Button onPress={handleOAuthSignIn} title="Sign In with OAuth" />
              <HStack spacing={10} justify="evenly">
                <TextInput
                  value={email}
                  onChangeText={setEmail}
                  placeholder="Email"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  style={{ flex: 1, borderWidth: 1, padding: 5 }}
                />
                <Button onPress={handleCredentialedSignIn} title="Sign In" />
              </HStack>
            </VStack>
          )}

          <Text>
            <Text style={{ fontWeight: "bold" }}>Bug #1: </Text>
            Normally, OAuth sign in will work as expected. However, if the
            network is unavailable, startOAuthFlow() will fail with "Cannot read
            property 'toString' of null".
          </Text>

          <Text>
            <Text style={{ fontWeight: "bold" }}>Bug #2: </Text> Normally,
            creating a SignIn object with just an identifier will return a list
            of first factor strategies. However, if the network is down,
            supportedFirstFactors will be an empty array.
          </Text>

          <Text>
            In both cases, a "ClerkJS: Network error" message is printed to the
            console. However, there is no way to catch this error or surface the
            message to the user.
          </Text>
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
