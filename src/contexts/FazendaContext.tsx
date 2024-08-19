import React, { createContext, useContext, useState, ReactNode } from "react";
import apiPublic from "../api/api"; // Importe sua API
import { getHashSHA1 } from "../helpers/getHash";
import { tKeyGenerator } from "../helpers/tKeyGenerator";

interface Fazenda {
  codigo: number;
  nome: string;
  uf: string;
  cidade: string;
  area: number;
}

interface FazendaContextProps {
  fazendas: Fazenda[];
  carregarFazendas: (codCliente: number | null | undefined) => Promise<void>;
}

const FazendaContext = createContext<FazendaContextProps | undefined>(
  undefined
);

export const useFazenda = () => {
  const context = useContext(FazendaContext);
  if (!context) {
    throw new Error("useFazenda deve ser usado dentro de um FazendaProvider");
  }
  return context;
};

interface FazendaProviderProps {
  children: ReactNode;
}



export const FazendaProvider: React.FC<FazendaProviderProps> = ({
  children,
}) => {
  const [fazendas, setFazendas] = useState<Fazenda[]>([]);

  const carregarFazendas = async (codCliente: number | null | undefined) => {
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
          scriptFunction: "getProperty",
          codCliente: codCliente,
        },
      });
      if (response.data) {
        setFazendas(response.data);
      }
    } catch (error) {
      console.error("Erro ao carregar fazendas:", error);
    }
  };

  const value = {
    fazendas,
    carregarFazendas,
  };

  return (
    <FazendaContext.Provider value={value}>{children}</FazendaContext.Provider>
  );
};
