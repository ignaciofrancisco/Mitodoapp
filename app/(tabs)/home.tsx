import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useContext } from "react";
import {
  Alert,
  Animated,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { PerfilContext } from "../context/PerfilContext";
import { Tarea, TareasContext } from "../context/TareasContext";

// Pantalla principal donde se listan las tareas creadas
export default function Home() {
  const { tareas, eliminarTarea } = useContext(TareasContext); // Acceso al contexto de tareas
  const { correo } = useContext(PerfilContext); // Acceso al contexto de perfil del usuario

  // Muestra alerta de confirmación antes de eliminar una tarea
  const handleEliminar = (id: string) => {
    Alert.alert("Eliminar tarea", "¿Seguro que deseas eliminar esta tarea?", [
      { text: "Cancelar", style: "cancel" },
      { text: "Eliminar", style: "destructive", onPress: () => eliminarTarea(id) },
    ]);
  };

  // Renderiza cada tarea dentro de la lista
  const renderTarea = ({ item }: { item: Tarea }) => (
    <Animated.View
      style={{
        backgroundColor: "rgba(255,255,255,0.95)",
        borderRadius: 16,
        marginVertical: 8,
        marginHorizontal: 16,
        padding: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 4,
      }}
    >
      <Text style={{ fontSize: 18, fontWeight: "bold", color: "#1e3a8a" }}>
        {item.titulo}
      </Text>
      <Text style={{ color: "#374151", marginVertical: 6 }}>{item.descripcion}</Text>

      <TouchableOpacity
        onPress={() => handleEliminar(item.id)}
        style={{
          backgroundColor: "#ef4444",
          alignSelf: "flex-start",
          paddingHorizontal: 14,
          paddingVertical: 6,
          borderRadius: 12,
          marginTop: 6,
        }}
      >
        <Text style={{ color: "white", fontWeight: "600" }}>Eliminar</Text>
      </TouchableOpacity>
    </Animated.View>
  );

  return (
    <LinearGradient
      colors={["#2563eb", "#3b82f6", "#06b6d4"]}
      style={{ flex: 1, paddingTop: 60 }}
    >
      {/* Encabezado con saludo y título */}
      <View style={{ marginBottom: 20 }}>
        <Text
          style={{
            fontSize: 22,
            textAlign: "center",
            color: "white",
            fontWeight: "600",
            opacity: 0.9,
          }}
        >
          Bienvenido {correo || "usuario@correo.com"}
        </Text>

        <Text
          style={{
            fontSize: 30,
            fontWeight: "bold",
            textAlign: "center",
            color: "white",
            marginTop: 6,
            letterSpacing: 0.5,
          }}
        >
          Mis Tareas
        </Text>
      </View>

      {/* Listado de tareas */}
      <FlatList
        data={tareas}
        keyExtractor={(item) => item.id}
        renderItem={renderTarea}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
        ListEmptyComponent={() => (
          <Text
            style={{
              color: "white",
              textAlign: "center",
              fontSize: 16,
              opacity: 0.8,
              marginTop: 40,
            }}
          >
            No tienes tareas aún. Agrega una nueva.
          </Text>
        )}
      />

      {/* Botón flotante para agregar una nueva tarea */}
      <TouchableOpacity
        onPress={() => router.push("/formularioTarea")}
        activeOpacity={0.8}
        style={{
          position: "absolute",
          bottom: 30,
          right: 25,
          backgroundColor: "#1e40af",
          borderRadius: 50,
          width: 65,
          height: 65,
          justifyContent: "center",
          alignItems: "center",
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 6,
          elevation: 8,
        }}
      >
        <Ionicons name="add" size={36} color="white" />
      </TouchableOpacity>
    </LinearGradient>
  );
}
