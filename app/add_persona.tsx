import { View, Text, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import Ionicons from '@react-native-vector-icons/ionicons';

export default function AgregarPersonaScreen() {
  const handleBack = () => {
    router.back();
  };

  return (
    <View className="flex-1 bg-white">
      {/* Header con botón de regresar */}
      <View className="bg-primary p-4 pt-12 flex-row items-center">
        <TouchableOpacity onPress={handleBack} className="mr-4">
          <Ionicons name="arrow-back" color={"#FFFFFF"} size={20} />
        </TouchableOpacity>
        <Text className="text-white text-xl font-bold">Agregar Persona</Text>
      </View>


      <View className="flex-1 items-center justify-center p-4">
        <View className="bg-white rounded-lg p-6 w-full max-w-md shadow-md">
          <Text className="text-3xl font-bold text-primary mb-4">Agregar Persona</Text>
          
          <Text className="text-gray-500 italic">
            Por ahora, esta es solo una pantalla de muestra.
          </Text>
        </View>
      </View>
    </View>
  );
}