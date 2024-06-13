# repro-clerk-connectivity

Bug #1:
Normally, OAuth sign in will work as expected. However, if the
network is unavailable, startOAuthFlow() will fail with "Cannot read
property 'toString' of null".

Bug #2: Normally
creating a SignIn object with just an identifier will return a list
of first factor strategies. However, if the network is down,
supportedFirstFactors will be an empty array.

In both cases, a "ClerkJS: Network error" message is printed to the
console. However, there is no way to catch this error or surface the
message to the user.


![CleanShot 2024-06-12 at 17 28 05@2x](https://github.com/statico/repro-clerk-connectivity/assets/137158/667d252f-2a1f-4a2f-be5e-eaaad21b5587)

