import React, { createContext, useContext, useState, ReactNode } from "react";
import apiPublic from "../api/api";
import { tKeyGenerator } from "../helpers/tKeyGenerator";

interface Grupo {
  key: number;
  name: string;
}

interface GrupoContextProps {
grupos: Grupo[];
  carregarGrupos: () => Promise<void>;
}

const GrupoContext = createContext<GrupoContextProps | undefined>(undefined);

export const useGrupo = () => {
  const context = useContext(GrupoContext);
  if (!context) {
    throw new Error("useGrupo deve ser usado dentro de um GruposProvider");
  }
  return context;
};

interface GrupoProviderProps {
  children: ReactNode;
}

export const GrupoProvider: React.FC<GrupoProviderProps> = ({ children }) => {
  const [grupos, setGrupos] = useState<Grupo[]>([]);

  const carregarGrupos = async () => {
    const tKey = tKeyGenerator();
    try {
      const response = await apiPublic.get("/odwctrl", {
        params: {
          action: "execTarefa",
          apelido: "CNTAGROMAVE-api-rotas",
          tKey: tKey,
          scriptFunction: "getGroups",
        },
      });
      if (response.data) {
        setGrupos(response.data);
      }
    } catch (error) {
      console.error("Erro ao carregar grupos:", error);
    }
  };

  const value = {
    grupos,
    carregarGrupos,
  };

  return (
    <GrupoContext.Provider value={value}>{children}</GrupoContext.Provider>
  );
};
