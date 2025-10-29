// Importamos las funciones necesarias desde React
import React, { createContext, ReactNode, useState } from "react";

//  Definimos el tipo del contexto
// Este contexto guardará un "correo" y una función para actualizarlo
type PerfilContextType = {
  correo: string; // valor actual del correo del usuario
  setCorreo: (correo: string) => void; // función para cambiar ese valor
};

//  Creamos el contexto con valores iniciales por defecto
// Estos valores se usarán solo mientras no se renderice el Provider
export const PerfilContext = createContext<PerfilContextType>({
  correo: "", // valor inicial vacío
  setCorreo: () => {}, // función vacía por defecto
});

//  Creamos el componente Provider
// Este será el encargado de proporcionar el estado "correo" a toda la app
export const PerfilProvider = ({ children }: { children: ReactNode }) => {
  // Estado que almacena el correo del usuario
  const [correo, setCorreo] = useState("");

  //  Retornamos el Provider
  // Pasamos el valor actual del correo y la función setCorreo
  // para que cualquier componente hijo pueda acceder o modificarlo
  return (
    <PerfilContext.Provider value={{ correo, setCorreo }}>
      {children}
    </PerfilContext.Provider>
  );
};

