import { Stack } from "expo-router";
import { PerfilProvider } from "./context/PerfilContext"; // Importa el proveedor del contexto de perfil
import { TareasProvider } from "./context/TareasContext"; // Importa el proveedor del contexto de tareas

// Componente principal que define la estructura general de navegación y los contextos globales
export default function Layout() {
  return (
    // Envolvemos toda la aplicación dentro del PerfilProvider para compartir el estado del correo
    <PerfilProvider>
      {/* También envolvemos dentro del TareasProvider para compartir el estado de las tareas */}
      <TareasProvider>
        {/* Stack de navegación de Expo Router */}
        <Stack
          screenOptions={{
            headerShown: false, // Oculta el encabezado superior en todas las pantallas
            contentStyle: { backgroundColor: "white" }, // Define el color de fondo por defecto
          }}
        >
          {/* Definición de las pantallas de la aplicación */}
          <Stack.Screen name="login" />            {/* Pantalla de inicio de sesión */}
          <Stack.Screen name="home" />             {/* Pantalla principal o lista de tareas */}
          <Stack.Screen name="formularioTarea" />  {/* Pantalla para agregar o editar tareas */}
        </Stack>
      </TareasProvider>
    </PerfilProvider>
  );
}


