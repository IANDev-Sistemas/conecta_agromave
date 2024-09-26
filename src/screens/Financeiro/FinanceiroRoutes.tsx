import apiPublic from "@/src/api/api";
import { tKeyGenerator } from "@/src/helpers/tKeyGenerator";

export const getFinanceiro = async (
  codCliente: number | undefined,
  tipoFiltro: string,
  safra: string,
  dataInicial: string,
  dataFinal: string
) => {
  const tKey = tKeyGenerator();

  console.log(tKey)
  try {
    const response = await apiPublic.get("/odwctrl", {
      params: {
        action: "execTarefa",
        apelido: "CNTAGROMAVE-api-rotas",
        tKey: tKey,
        scriptFunction: "getFinance",
        codCliente: codCliente,
        tipoFiltro: tipoFiltro,
        safra: safra,
        dataInicial: dataInicial,
        dataFinal: dataFinal,
      },
    });
  
    return response.data;

  } catch (error) {
    console.error("Error during finance get:", error);
    return {
      error: true,
      msg: "Invalid details",
    };
  }
};
export const getPedidos = async (
  codCliente: number | undefined,
  tipoFiltro: string,
  safra: string,
  dataInicial: string,
  dataFinal: string
) => {
  const tKey = tKeyGenerator();

  try {
    const response = await apiPublic.get("/odwctrl", {
      params: {
        action: "execTarefa",
        apelido: "CNTAGROMAVE-api-rotas",
        tKey: tKey,
        scriptFunction: "getOrder",
        codCliente: codCliente,
        tipoFiltro: tipoFiltro,
        safra: safra,
        dataInicial: dataInicial,
        dataFinal: dataFinal,
      },
    });
  
    return response.data;

  } catch (error) {
    console.error("Error during finance get:", error);
    return {
      error: true,
      msg: "Invalid details",
    };
  }
};

export const getNotas = async (
  codCliente: number | undefined,
  tipoFiltro: string,
  safra: string,
  dataInicial: string,
  dataFinal: string
) => {
  const tKey = tKeyGenerator();

  try {
    const response = await apiPublic.get("/odwctrl", {
      params: {
        action: "execTarefa",
        apelido: "CNTAGROMAVE-api-rotas",
        tKey: tKey,
        scriptFunction: "getInvoice",
        codCliente: codCliente,
        tipoFiltro: tipoFiltro,
        safra: safra,
        dataInicial: dataInicial,
        dataFinal: dataFinal,
      },
    });

    return response.data;

  } catch (error) {
    console.error("Error during finance get:", error);
    return {
      error: true,
      msg: "Invalid details",
    };
  }
};