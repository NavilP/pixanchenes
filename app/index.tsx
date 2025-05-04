import { 
  Text, 
  View, 
  TextInput,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import { useEffect, useState } from "react";

export default function Index() {
  const [keyboardOpen, setKeyboardOpen] = useState(false);
  useEffect(() => {
    const showSub = Keyboard.addListener("keyboardDidShow", () => setKeyboardOpen(true));
    const hideSub = Keyboard.addListener("keyboardDidHide", () => setKeyboardOpen(false));
    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);
  
  return (
    <View>
      {/* Header morado */}
      <View className="w-full h-1/3">
        {!keyboardOpen && (
          <View className="bg-primary h-[600px] w-[600px] rounded-full -z-10 absolute top-[-300px] left-1/2 -translate-x-[300px]" />
        )}

        <View className="absolute w-full text-center top-16 items-center">
          <Text className={`text-6xl font-bold ${keyboardOpen ? "text-primary" : "text-white"}`}>Iniciar</Text>
          <Text className={`text-6xl font-bold ${keyboardOpen ? "text-primary" : "text-white"}`}>Sesion</Text>
        </View>
      </View>

      {/* Credenciales */}
      <View className="w-full h-2/3 justify-between p-10 pb-52">
        <View>
          {/* Username */}
          <Text className="text-2xl mb-5">Nombre de Usuario</Text>
          <TextInput 
            placeholder="Escribe aqui"
            className="border border-0.5 border-inputborder rounded-full placeholder:text-inputborder px-5 py-4"
          />

          {/* Password */}
          <Text className="text-2xl mb-5">Contraseña</Text>
          <TextInput 
            placeholder="Escribe aqui"
            secureTextEntry
            className="border border-0.5 border-inputborder rounded-full placeholder:text-inputborder px-5 py-4"
          />
        </View>

        {/* Boton para iniciar sesion */}
        <View className="items-center w-full">
          <TouchableOpacity className="rounded-full bg-primary w-48 h-14 mt-10 items-center justify-center mb-5">
            <Text className="font-bold text-white text-xl">Iniciar Sesión</Text>
          </TouchableOpacity>
        </View>


        <TouchableOpacity>
          <Text className="underline text-lg">Olvide mi contraseña</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
