//  Importaciones principales
import { LinearGradient } from "expo-linear-gradient"; // Fondo con degradado
import { router } from "expo-router"; // Navegación entre pantallas
import React, { useContext, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { TareasContext } from "./context/TareasContext"; // Contexto global de tareas

//  Componente principal del formulario para agregar una tarea
export default function FormularioTarea() {
  // Obtenemos la función agregarTarea desde el contexto
  const { agregarTarea } = useContext(TareasContext);

  // Estados locales para los campos del formulario
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");

  //  Función que maneja el guardado de la tarea
  const handleGuardar = () => {
    // Validación: no permitir campos vacíos
    if (!titulo.trim() || !descripcion.trim()) {
      Alert.alert("Error", "Por favor completa todos los campos.");
      return;
    }

    // Llamamos a la función del contexto para agregar la nueva tarea
    agregarTarea(titulo, descripcion);

    // Mostramos confirmación y redirigimos a la pantalla principal (home)
    Alert.alert("Tarea guardada", "Tu tarea fue añadida con éxito.", [
      {
        text: "OK",
        onPress: () => router.push("/(tabs)/home"),
      },
    ]);
  };

  //  Render del formulario
  return (
    // Fondo con degradado
    <LinearGradient
      colors={["#2563eb", "#3b82f6", "#06b6d4"]}
      style={{ flex: 1 }}
    >
      {/* Evita que el teclado cubra los inputs */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        {/* Permite hacer scroll si el contenido sobrepasa la pantalla */}
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            paddingHorizontal: 24,
            paddingTop: 60,
            paddingBottom: 40,
          }}
        >
          {/*  Título principal del formulario */}
          <Text
            style={{
              fontSize: 30,
              fontWeight: "bold",
              color: "white",
              textAlign: "center",
              marginBottom: 30,
            }}
          >
            Nueva Tarea
          </Text>

          {/*  Campo de texto para el título de la tarea */}
          <View
            style={{
              backgroundColor: "rgba(255,255,255,0.9)",
              borderRadius: 16,
              padding: 16,
              marginBottom: 20,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.2,
              shadowRadius: 6,
              elevation: 4,
            }}
          >
            <Text style={{ color: "#1e3a8a", fontWeight: "600", marginBottom: 6 }}>
              Título de la tarea
            </Text>
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

          {/*  Campo de texto para la descripción */}
          <View
            style={{
              backgroundColor: "rgba(255,255,255,0.9)",
              borderRadius: 16,
              padding: 16,
              marginBottom: 20,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.2,
              shadowRadius: 6,
              elevation: 4,
            }}
          >
            <Text style={{ color: "#1e3a8a", fontWeight: "600", marginBottom: 6 }}>
              Descripción
            </Text>
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

          {/*  Botón para guardar la tarea */}
          <TouchableOpacity
            onPress={handleGuardar}
            activeOpacity={0.8}
            style={{
              backgroundColor: "#1d4ed8",
              paddingVertical: 16,
              borderRadius: 16,
              alignItems: "center",
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 6,
              elevation: 6,
              marginBottom: 15,
            }}
          >
            <Text
              style={{
                color: "white",
                fontWeight: "bold",
                fontSize: 18,
                letterSpacing: 0.5,
              }}
            >
              Guardar Tarea
            </Text>
          </TouchableOpacity>

          {/*  Botón para volver sin guardar */}
          <TouchableOpacity
            onPress={() => router.push("/(tabs)/home")}
            activeOpacity={0.8}
            style={{
              backgroundColor: "#1d4ed8",
              paddingVertical: 16,
              borderRadius: 16,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: "white",
                fontWeight: "600",
                fontSize: 18,
              }}
            >
              Volver
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

