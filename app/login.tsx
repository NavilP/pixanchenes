import { useEffect, useState } from "react";
import {
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  TouchableWithoutFeedback,
  ActivityIndicator
} from "react-native";
import { router } from 'expo-router';
import { useAuth } from '@/src/providers/AuthProviders';

export default function LoginScreen() {
  const { session, signIn } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [keyboardOpen, setKeyboardOpen] = useState(false);

  useEffect(() => {
    if (session) {
      router.replace('/');
    }
  }, [session]);

  useEffect(() => {
    const showSub = Keyboard.addListener("keyboardDidShow", () => setKeyboardOpen(true));
    const hideSub = Keyboard.addListener("keyboardDidHide", () => setKeyboardOpen(false));
    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  const handleSignIn = async () => {
    if (!username.trim() || !password.trim()) {
      Alert.alert('Error', 'Por favor ingresa un nombre de usuario y contraseña');
      return;
    }

    try {
      setLoading(true);
      const email = `${username.trim()}@pixanchenes.com`;
      await signIn(email, password);
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      Alert.alert(
        'Error al iniciar sesión',
        'Por favor verifica tus credenciales e intenta nuevamente'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    Alert.alert('Recuperar contraseña', 'Función en desarrollo');
  };
  
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
              autoCapitalize="none"
              autoCorrect={false}
              value={username}
              onChangeText={setUsername}
              className="border border-0.5 border-inputborder rounded-full placeholder:text-inputborder px-5 py-4"
            />

            {/* Password */}
            <Text className="text-2xl mb-5">Contraseña</Text>
            <TextInput 
              placeholder="Escribe aqui"
              secureTextEntry
              autoCorrect={false}
              value={password}
              onChangeText={setPassword}
              className="border border-0.5 border-inputborder rounded-full placeholder:text-inputborder px-5 py-4"
            />
          </View>

          {/* Boton para iniciar sesion */}
          <View className="items-center w-full">
            <TouchableOpacity 
              onPress={handleSignIn}
              disabled={loading}
              className="rounded-full bg-primary w-48 h-14 mt-10 items-center justify-center mb-5">
              {loading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text className="font-bold text-white text-xl">Iniciar Sesión</Text>
              )}
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={handleForgotPassword}>
            <Text className="underline text-lg">Olvide mi contraseña</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}