import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Alert,
  Animated,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity
} from "react-native";
import { PerfilContext } from "./context/PerfilContext"; // Importa el contexto de perfil

export default function Login() {
  // Estados locales para el correo y la contraseña
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Se obtiene la función setCorreo desde el contexto global
  const { setCorreo } = useContext(PerfilContext);

  // Variables de animación
  const fadeAnim = useRef(new Animated.Value(0)).current; // Controla la opacidad
  const translateY = useRef(new Animated.Value(50)).current; // Controla el desplazamiento vertical

  // Efecto para ejecutar la animación al montar el componente
  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(translateY, {
        toValue: 0,
        bounciness: 15,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, translateY]);

  // Función para validar el formato del correo electrónico
  const validarEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // Función principal del inicio de sesión
  const handleLogin = () => {
    // Validar que ambos campos estén completos
    if (!email || !password) {
      Alert.alert("Campos vacíos", "Por favor completa ambos campos.");
      return;
    }

    // Validar el formato del correo
    if (!validarEmail(email)) {
      Alert.alert("Correo inválido", "Ingresa un correo válido con @ y dominio.");
      return;
    }

    // Validar contraseña simple (en un caso real se verificaría en servidor)
    if (password !== "1234") {
      Alert.alert("Contraseña incorrecta", "Intenta nuevamente.");
      return;
    }

    // Guarda el correo en el contexto global para su uso en toda la aplicación
    setCorreo(email);

    // Navega a la pantalla principal (home)
    router.push("/home");
  };

  // Renderizado de la interfaz del formulario de login
  return (
    <LinearGradient
      colors={["#2563eb", "#3b82f6", "#06b6d4"]}
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ width: "100%", alignItems: "center" }}
      >
        {/* Contenedor con animación de entrada */}
        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{ translateY }],
            width: "85%",
            backgroundColor: "rgba(255,255,255,0.95)",
            borderRadius: 20,
            paddingVertical: 30,
            paddingHorizontal: 20,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.25,
            shadowRadius: 6,
            elevation: 5,
            alignItems: "center",
          }}
        >
          {/* Título de bienvenida */}
          <Text
            style={{
              fontSize: 26,
              fontWeight: "bold",
              color: "#1e3a8a",
              textAlign: "center",
              marginBottom: 25,
            }}
          >
            Bienvenido a Mi ToDo App
          </Text>

          {/* Campo de entrada para el correo */}
          <TextInput
            style={{
              backgroundColor: "#f1f5f9",
              borderRadius: 15,
              paddingHorizontal: 15,
              paddingVertical: 12,
              marginBottom: 15,
              borderWidth: 1,
              borderColor: "#e2e8f0",
              color: "#111827",
              width: "100%",
            }}
            placeholder="Correo electrónico"
            placeholderTextColor="#6b7280"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />

          {/* Campo de entrada para la contraseña */}
          <TextInput
            style={{
              backgroundColor: "#f1f5f9",
              borderRadius: 15,
              paddingHorizontal: 15,
              paddingVertical: 12,
              marginBottom: 20,
              borderWidth: 1,
              borderColor: "#e2e8f0",
              color: "#111827",
              width: "100%",
            }}
            placeholder="Contraseña"
            placeholderTextColor="#6b7280"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          {/* Botón de inicio de sesión */}
          <TouchableOpacity
            onPress={handleLogin}
            style={{
              backgroundColor: "#2563eb",
              borderRadius: 15,
              paddingVertical: 14,
              alignItems: "center",
              width: "100%",
            }}
            activeOpacity={0.8}
          >
            <Text
              style={{
                color: "white",
                fontSize: 16,
                fontWeight: "600",
              }}
            >
              Iniciar sesión
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}
