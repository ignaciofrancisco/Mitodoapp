// Importamos las dependencias necesarias desde React
import React, { createContext, ReactNode, useState } from "react";

//  Definimos el tipo de una tarea
// Cada tarea tiene un id único, un título y una descripción
export type Tarea = {
  id: string;
  titulo: string;
  descripcion: string;
};

//  Definimos el tipo de datos que manejará nuestro contexto
// Contendrá la lista de tareas y dos funciones para manipularlas
type TareasContextType = {
  tareas: Tarea[]; // lista de tareas
  agregarTarea: (titulo: string, descripcion: string) => void; // función para agregar
  eliminarTarea: (id: string) => void; // función para eliminar
};

//  Creamos el contexto con valores por defecto (vacíos)
// Estos solo se usarán mientras no se renderice el provider
export const TareasContext = createContext<TareasContextType>({
  tareas: [],
  agregarTarea: () => {},
  eliminarTarea: () => {},
});

//  Componente Provider que envuelve la aplicación
// Este componente gestiona el estado global de las tareas
export const TareasProvider = ({ children }: { children: ReactNode }) => {
  // Estado inicial con dos tareas de ejemplo
  const [tareas, setTareas] = useState<Tarea[]>([
    { id: "1", titulo: "Comprar pan", descripcion: "Ir a la panadería a las 10 AM" },
    { id: "2", titulo: "Estudiar React Native", descripcion: "Repasar componentes y hooks" },
  ]);

  //  Función para agregar una nueva tarea
  const agregarTarea = (titulo: string, descripcion: string) => {
    // Generamos un id único usando la fecha actual
    const nuevaTarea = { id: Date.now().toString(), titulo, descripcion };

    // Actualizamos el estado agregando la nueva tarea al final del array
    setTareas((prev) => [...prev, nuevaTarea]);
  };

  //  Función para eliminar una tarea por su id
  const eliminarTarea = (id: string) => {
    // Filtramos todas las tareas excepto la que tiene el id indicado
    setTareas((prev) => prev.filter((t) => t.id !== id));
  };

  //  Retornamos el Provider
  // Envolvemos los children para que cualquier componente dentro de él
  // pueda acceder a las tareas y funciones del contexto
  return (
    <TareasContext.Provider value={{ tareas, agregarTarea, eliminarTarea }}>
      {children}
    </TareasContext.Provider>
  );
};
