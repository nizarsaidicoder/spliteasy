import { Stack } from "expo-router";
import { StyleSheet } from "react-native";

import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useColorScheme } from "react-native";
import { TamaguiProvider } from "tamagui";

import { tamaguiConfig } from "../tamagui.config";

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <TamaguiProvider config={tamaguiConfig} defaultTheme={colorScheme!}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack
          screenOptions={{
            headerTitleAlign: "center",
            headerStyle: styles.header,
            headerTintColor: "#ffffff",
            headerShadowVisible: false,
          }}
        >
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="login" options={{ title: "Connexion" }} />
          <Stack.Screen name="signup" options={{ title: "Inscription" }} />
          <Stack.Screen name="+not-found" options={{ headerShown: false }} />
        </Stack>
      </ThemeProvider>
    </TamaguiProvider>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#FEBB1B",
    boxShadow: "none",
    elevation: 0,
    borderBottomWidth: 0,
  },
});

