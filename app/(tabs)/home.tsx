import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useContext } from "react";
import { Alert, Animated, FlatList, Text, TouchableOpacity, View } from "react-native";
import { PerfilContext } from "../context/PerfilContext";
import { Tarea, TareasContext } from "../context/TareasContext";

export default function Home() {
  const { tareas, eliminarTarea, toggleCompletada } = useContext(TareasContext);
  const { correo } = useContext(PerfilContext);

  const tareasUsuario = tareas.filter((t) => t.usuario === correo);

  const handleEliminar = (id: string) => {
    Alert.alert("Eliminar tarea", "¿Seguro que deseas eliminar esta tarea?", [
      { text: "Cancelar", style: "cancel" },
      { text: "Eliminar", style: "destructive", onPress: () => eliminarTarea(id) },
    ]);
  };

  const renderTarea = ({ item }: { item: Tarea }) => (
    <Animated.View
      style={{
        backgroundColor: item.completada ? "rgba(16,185,129,0.2)" : "rgba(255,255,255,0.95)",
        borderRadius: 16,
        marginVertical: 8,
        marginHorizontal: 16,
        padding: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 6,
        elevation: 4,
      }}
    >
      <TouchableOpacity onPress={() => router.push(`/formularioTarea?tareaId=${item.id}`)}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: "bold",
            color: "#1e3a8a",
            textDecorationLine: item.completada ? "line-through" : "none",
          }}
        >
          {item.titulo}
        </Text>
        <Text
          style={{
            color: "#374151",
            marginVertical: 6,
            textDecorationLine: item.completada ? "line-through" : "none",
          }}
        >
          {item.descripcion}
        </Text>
      </TouchableOpacity>

      <View style={{ flexDirection: "row", marginTop: 8 }}>
        <TouchableOpacity
          onPress={() => toggleCompletada(item.id)}
          style={{
            backgroundColor: item.completada ? "#10b981" : "#f59e0b",
            paddingHorizontal: 14,
            paddingVertical: 6,
            borderRadius: 12,
            marginRight: 8,
          }}
        >
          <Text style={{ color: "white", fontWeight: "600" }}>
            {item.completada ? "Completada" : "Pendiente"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleEliminar(item.id)}
          style={{
            backgroundColor: "#ef4444",
            paddingHorizontal: 14,
            paddingVertical: 6,
            borderRadius: 12,
          }}
        >
          <Text style={{ color: "white", fontWeight: "600" }}>Eliminar</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );

  return (
    <LinearGradient colors={["#2563eb", "#3b82f6", "#06b6d4"]} style={{ flex: 1, paddingTop: 60 }}>
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

      <FlatList
        data={tareasUsuario}
        keyExtractor={(item) => item.id}
        renderItem={renderTarea}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
        ListEmptyComponent={() => (
          <Text style={{ color: "white", textAlign: "center", fontSize: 16, opacity: 0.8, marginTop: 40 }}>
            No tienes tareas aún. Agrega una nueva.
          </Text>
        )}
      />

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
