import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, ReactNode, useEffect, useState } from "react";

export type Tarea = {
  id: string;
  titulo: string;
  descripcion: string;
  usuario: string;
  completada: boolean;
  fotoUri?: string;
  location?: { lat: number; lon: number };
};

type TareasContextType = {
  tareas: Tarea[];
  agregarTarea: (
    titulo: string,
    descripcion: string,
    usuario: string,
    fotoUri?: string,
    location?: { lat: number; lon: number }
  ) => void;
  eliminarTarea: (id: string) => void;
  toggleCompletada: (id: string) => void;
  actualizarTarea: (
    id: string,
    titulo: string,
    descripcion: string,
    fotoUri?: string,
    location?: { lat: number; lon: number }
  ) => void;
};

export const TareasContext = createContext<TareasContextType>({
  tareas: [],
  agregarTarea: () => {},
  eliminarTarea: () => {},
  toggleCompletada: () => {},
  actualizarTarea: () => {},
});

export const TareasProvider = ({ children }: { children: ReactNode }) => {
  const [tareas, setTareas] = useState<Tarea[]>([]);

  useEffect(() => {
    const cargarTareas = async () => {
      const json = await AsyncStorage.getItem("@tareas");
      if (json) setTareas(JSON.parse(json));
    };
    cargarTareas();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem("@tareas", JSON.stringify(tareas));
  }, [tareas]);

  const agregarTarea = (
    titulo: string,
    descripcion: string,
    usuario: string,
    fotoUri?: string,
    location?: { lat: number; lon: number }
  ) => {
    const nuevaTarea: Tarea = {
      id: Date.now().toString(),
      titulo,
      descripcion,
      usuario,
      completada: false,
      fotoUri,
      location,
    };
    setTareas(prev => [...prev, nuevaTarea]);
  };

  const eliminarTarea = (id: string) => {
    setTareas(prev => prev.filter(t => t.id !== id));
  };

  const toggleCompletada = (id: string) => {
    setTareas(prev =>
      prev.map(t => (t.id === id ? { ...t, completada: !t.completada } : t))
    );
  };

  const actualizarTarea = (
    id: string,
    titulo: string,
    descripcion: string,
    fotoUri?: string,
    location?: { lat: number; lon: number }
  ) => {
    setTareas(prev =>
      prev.map(t =>
        t.id === id ? { ...t, titulo, descripcion, fotoUri, location } : t
      )
    );
  };

  return (
    <TareasContext.Provider value={{ tareas, agregarTarea, eliminarTarea, toggleCompletada, actualizarTarea }}>
      {children}
    </TareasContext.Provider>
  );
};
