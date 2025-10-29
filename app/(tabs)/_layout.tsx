import { Tabs } from "expo-router";

// Componente que define un layout basado en pestañas (Tabs)
export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,               // Oculta la barra superior de navegación
        tabBarStyle: { display: "none" }, // Oculta la barra inferior de pestañas para no mostrarla visualmente
      }}
    >
      {/* Pantalla principal o inicio */}
      <Tabs.Screen
        name="home"
        options={{
          title: "",         // No se muestra título en la pestaña
          tabBarLabel: "",   // No se muestra texto en la barra inferior
        }}
      />

      {/* Pantalla de perfil del usuario */}
      <Tabs.Screen
        name="perfil"
        options={{
          title: "",         // No se muestra título en la pestaña
          tabBarLabel: "",   // No se muestra texto en la barra inferior
        }}
      />
    </Tabs>
  );
}
