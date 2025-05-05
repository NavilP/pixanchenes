import { Stack } from "expo-router";
import "./global.css"
import AuthProvider from "@/src/providers/AuthProviders";
import { View } from "react-native";

export default function RootLayout() {
  return (
    <AuthProvider>
      <View className="flex-1">
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: {
              backgroundColor: "#ffffff",
            },
            statusBarHidden: false,
            statusBarTranslucent: false,
          }}
        >
          <Stack.Screen
            name="index"
            options={{
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="login"
            options={{
              headerShown: false,
              headerBackTitle: "Volver",
              headerStyle: {
                backgroundColor: "#ffffff",
              },
              headerTintColor: "#000000",
              statusBarBackgroundColor: "#ffffff",
            }}
          />

          <Stack.Screen
            name="add_persona"
            options={{
              headerShown: false,
              presentation: "card",
              animation: "slide_from_right",
            }}
          />
        </Stack>
      </View>
    </AuthProvider>
  );
}