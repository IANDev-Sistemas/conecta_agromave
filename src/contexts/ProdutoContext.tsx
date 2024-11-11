import React, { createContext, useContext, useState, ReactNode } from "react";
import apiPublic from "../api/api";
import { tKeyGenerator } from "../helpers/tKeyGenerator";

interface Produto {
  key: number;
  name: string;
}

interface ProdutoContextProps {
  produtos: Produto[];
  carregarProdutos:(codCliente: number | null | undefined) => Promise<void>;
}

const ProdutoContext = createContext<ProdutoContextProps | undefined>(undefined);

export const useProduto = () => {
  const context = useContext(ProdutoContext);
  if (!context) {
    throw new Error("useProduto deve ser usado dentro de um ProdutosProvider");
  }
  return context;
};

interface ProdutoProviderProps {
  children: ReactNode;
}

export const ProdutoProvider: React.FC<ProdutoProviderProps> = ({ children }) => {
  const [produtos, setProdutos] = useState<Produto[]>([]);

  const carregarProdutos = async  (codCliente: number | null | undefined) => {
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
          scriptFunction: "getProdutcs",
          codCliente: codCliente,
        },
      });
      if (response.data) {
        setProdutos(response.data);
      }
    } catch (error) {
      console.error("Erro ao carregar produtos:", error);
    }
  };

  const value = {
    produtos,
    carregarProdutos,
  };

  return (
    <ProdutoContext.Provider value={value}>
      {children}
    </ProdutoContext.Provider>
  );
};
