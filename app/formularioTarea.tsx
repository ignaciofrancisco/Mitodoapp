import * as ImagePicker from "expo-image-picker";
import { LinearGradient } from "expo-linear-gradient";
import * as Location from "expo-location";
import { router, useLocalSearchParams } from "expo-router"; // Corregido
import React, { useContext, useEffect, useState } from "react";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { PerfilContext } from "./context/PerfilContext";
import { TareasContext } from "./context/TareasContext";

export default function FormularioTarea() {
  const { agregarTarea, actualizarTarea, tareas } = useContext(TareasContext);
  const { correo } = useContext(PerfilContext);

  // Obtener parámetros de la ruta
  const { tareaId } = useLocalSearchParams<{ tareaId?: string }>();

  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [fotoUri, setFotoUri] = useState<string>();
  const [location, setLocation] = useState<{ lat: number; lon: number }>();

  // Cargar datos de la tarea si estamos editando
  useEffect(() => {
    if (tareaId) {
      const t = tareas.find((t) => t.id === tareaId);
      if (t) {
        setTitulo(t.titulo);
        setDescripcion(t.descripcion);
        setFotoUri(t.fotoUri);
        setLocation(t.location);
      }
    }
  }, [tareaId, tareas]);

  // Función para seleccionar foto
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
    });
    if (!result.canceled) setFotoUri(result.assets[0].uri);
  };

  // Función para obtener ubicación
  const getLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permiso denegado", "No se pudo obtener la ubicación.");
      return;
    }
    const loc = await Location.getCurrentPositionAsync({});
    setLocation({ lat: loc.coords.latitude, lon: loc.coords.longitude });
  };

  // Guardar o actualizar tarea
  const handleGuardar = () => {
    if (!titulo.trim() || !descripcion.trim()) {
      Alert.alert("Error", "Por favor completa todos los campos.");
      return;
    }

    if (tareaId) {
      actualizarTarea(tareaId, titulo, descripcion, fotoUri, location);
    } else {
      agregarTarea(titulo, descripcion, correo, fotoUri, location);
    }

    Alert.alert("Tarea guardada", "Tu tarea fue añadida con éxito.", [
      { text: "OK", onPress: () => router.push("/(tabs)/home") },
    ]);
  };

  return (
    <LinearGradient colors={["#2563eb", "#3b82f6", "#06b6d4"]} style={{ flex: 1 }}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 24, paddingTop: 60, paddingBottom: 40 }}
        >
          <Text
            style={{
              fontSize: 30,
              fontWeight: "bold",
              color: "white",
              textAlign: "center",
              marginBottom: 30,
            }}
          >
            {tareaId ? "Editar Tarea" : "Nueva Tarea"}
          </Text>

          <View style={{ backgroundColor: "rgba(255,255,255,0.9)", borderRadius: 16, padding: 16, marginBottom: 20 }}>
            <Text style={{ color: "#1e3a8a", fontWeight: "600", marginBottom: 6 }}>Título de la tarea</Text>
            <TextInput
              value={titulo}
              onChangeText={setTitulo}
              placeholder="Ej: Ir al gimnasio"
              style={{
                borderBottomWidth: 1,
                borderColor: "#60a5fa",
                paddingVertical: 8,
                fontSize: 16,
                color: "#1e3a8a",
              }}
              placeholderTextColor="#9ca3af"
            />
          </View>

          <View style={{ backgroundColor: "rgba(255,255,255,0.9)", borderRadius: 16, padding: 16, marginBottom: 20 }}>
            <Text style={{ color: "#1e3a8a", fontWeight: "600", marginBottom: 6 }}>Descripción</Text>
            <TextInput
              value={descripcion}
              onChangeText={setDescripcion}
              placeholder="Ej: Hacer 1 hora de entrenamiento"
              style={{
                borderBottomWidth: 1,
                borderColor: "#60a5fa",
                paddingVertical: 8,
                fontSize: 16,
                color: "#1e3a8a",
              }}
              multiline
              placeholderTextColor="#9ca3af"
            />
          </View>

          <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 20 }}>
            <TouchableOpacity
              onPress={pickImage}
              style={{ backgroundColor: "#1d4ed8", padding: 12, borderRadius: 12 }}
            >
              <Text style={{ color: "white" }}>Seleccionar Foto</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={getLocation}
              style={{ backgroundColor: "#1d4ed8", padding: 12, borderRadius: 12 }}
            >
              <Text style={{ color: "white" }}>Obtener Ubicación</Text>
            </TouchableOpacity>
          </View>

          {fotoUri && (
            <Image
              source={{ uri: fotoUri }}
              style={{ width: "100%", height: 200, borderRadius: 16, marginBottom: 10 }}
            />
          )}
          {location && (
            <Text style={{ color: "white", marginBottom: 20 }}>
              Lat: {location.lat.toFixed(4)}, Lon: {location.lon.toFixed(4)}
            </Text>
          )}

          <TouchableOpacity
            onPress={handleGuardar}
            style={{
              backgroundColor: "#1d4ed8",
              paddingVertical: 16,
              borderRadius: 16,
              alignItems: "center",
              marginBottom: 15,
            }}
          >
            <Text style={{ color: "white", fontWeight: "bold", fontSize: 18 }}>
              {tareaId ? "Actualizar Tarea" : "Guardar Tarea"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push("/(tabs)/home")}
            style={{ backgroundColor: "#1d4ed8", paddingVertical: 16, borderRadius: 16, alignItems: "center" }}
          >
            <Text style={{ color: "white", fontWeight: "600", fontSize: 18 }}>Volver</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}
