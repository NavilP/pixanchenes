import { Stack, Tabs } from "expo-router";
import "./global.css"
import { HeaderShownContext } from "@react-navigation/elements";

export default function RootLayout() {
  return (
    <Tabs>
      <Tabs.Screen 
        name='index'
        options={{
          title: 'Home',
          headerShown: false
        }}
      />
    </Tabs>
  );
}
