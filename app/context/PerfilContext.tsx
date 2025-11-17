import React, { createContext, ReactNode, useState } from "react";

type PerfilContextType = {
  correo: string;
  setCorreo: (correo: string) => void;
};

export const PerfilContext = createContext<PerfilContextType>({
  correo: "",
  setCorreo: () => {},
});

export const PerfilProvider = ({ children }: { children: ReactNode }) => {
  const [correo, setCorreo] = useState("");

  return (
    <PerfilContext.Provider value={{ correo, setCorreo }}>
      {children}
    </PerfilContext.Provider>
  );
};

