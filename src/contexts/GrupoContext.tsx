import React, { createContext, useContext, useState, ReactNode } from "react";
import apiPublic from "../api/api";
import { tKeyGenerator } from "../helpers/tKeyGenerator";

interface Grupo {
  key: number;
  name: string;
}

interface GrupoContextProps {
grupos: Grupo[];
  carregarGrupos: (codCliente: number | null | undefined) => Promise<void>;
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

  const carregarGrupos = async (codCliente: number | null | undefined) => {
    const tKey = tKeyGenerator();

    if (!codCliente) {
      console.error("Código do cliente não fornecido.");
      return;
    }

    try {
      const response = await apiPublic.get("/odwctrl", {
        params: {
          action: "execTarefa",
          apelido: "CNTAGROMAVE-api-rotas",
          tKey: tKey,
          scriptFunction: "getGroups",
          codCliente: codCliente,
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
