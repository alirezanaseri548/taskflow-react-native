import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="tasks/create" options={{ presentation: "modal" }} />
        <Stack.Screen name="habits/create" options={{ presentation: "modal" }} />
      </Stack>
    </>
  );
}
