import React, { createContext, useContext, useState, ReactNode } from "react";
import apiPublic from "../api/api"; // Importe sua API
import { tKeyGenerator } from "../helpers/tKeyGenerator";

interface Safra {
  key: number;
  name: string;
}

interface SafraContextProps {
  safras: Safra[];
  carregarSafras: (codCliente: number | null | undefined) => Promise<void>;
}

const SafraContext = createContext<SafraContextProps | undefined>(undefined);

export const useSafra = () => {
  const context = useContext(SafraContext);
  if (!context) {
    throw new Error("useSafra deve ser usado dentro de um SafraProvider");
  }
  return context;
};

interface SafraProviderProps {
  children: ReactNode;
}

export const SafraProvider: React.FC<SafraProviderProps> = ({ children }) => {
  const [safras, setSafras] = useState<Safra[]>([]);

  const carregarSafras = async (codCliente: number | null | undefined) => {
    if (!codCliente) {
      console.error("Código do cliente não fornecido.");
      return;
    }

    const tKey = tKeyGenerator();
    try {
      const response = await apiPublic.get("/odwctrl", {
        params: {
          action: "execTarefa",
          apelido: "CNTAGROMAVE-api-rotas",
          tKey: tKey,
          scriptFunction: "getHarvest",
          codCliente: codCliente,
        },
      });
      if (response.data) {
        setSafras(response.data);
      }
    } catch (error) {
      console.error("Erro ao carregar safras:", error);
    }
  };

  const value = {
    safras,
    carregarSafras,
  };

  return (
    <SafraContext.Provider value={value}>{children}</SafraContext.Provider>
  );
};
