import { 
  View, 
  Text, 
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import { useEffect, useState } from 'react';
import { router } from 'expo-router';
import { useAuth } from '@/src/providers/AuthProviders';

export default function HomeScreen() {
  const { session, signOut, loading } = useAuth();
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && !session) {
      router.replace('/login');
    }
    
    if (session?.user?.email) {
      const email = session.user.email;
      const extractedUsername = email.split('@')[0];
      setUsername(extractedUsername);
    }
  }, [session, loading]);

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#6200EE" />
        <Text className="text-lg">Cargando...</Text>
      </View>
    );
  }
  
  if (!session) {
    return null;
  }

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  const navigateToAgregarPersona = () => {
    router.push('/add_persona');
  };

  return (
    <View className="flex-1 items-center justify-center p-4">
      <View className="bg-white rounded-lg p-6 w-full max-w-md shadow-md">
        <Text className="text-3xl font-bold text-primary mb-4">Bienvenido</Text>
        
        {username && (
          <Text className="text-xl mb-6">
            Hola, <Text className="font-bold">{username}</Text>
          </Text>
        )}
        
        <Text className="text-base">
          Has iniciado sesión correctamente en la aplicación.
        </Text>
        <Text className="text-base mb-8">
          Por ahora esta es una pantalla de prueba.
        </Text>

        <TouchableOpacity 
          onPress={navigateToAgregarPersona}
          className="bg-white rounded-lg p-6 mb-5 w-full max-w-md shadow-md flex-row items-center justify-between"
        >
          <View>
            <Text className="text-xl font-bold text-primary mb-2">Agregar Persona</Text>
            <Text className="text-gray-600">Registrar una nueva persona en el sistema</Text>
          </View>
        </TouchableOpacity>
        
        <TouchableOpacity
          onPress={handleSignOut}
          className="bg-primary rounded-full py-3 px-6 items-center"
        >
          <Text className="text-white font-bold text-lg">Cerrar Sesión</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}