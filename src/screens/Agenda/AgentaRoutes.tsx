import apiPublic from "@/src/api/api";
import { tKeyGenerator } from "@/src/helpers/tKeyGenerator";

export const getAgenda = async (
  codCliente: number | undefined,
) => {
  const tKey = tKeyGenerator();

  try {
    const response = await apiPublic.get("/odwctrl", {
      params: {
        action: "execTarefa",
        apelido: "CNTAGROMAVE-api-rotas",
        tKey: tKey,
        scriptFunction: "getAgenda",
        codCliente: codCliente,
      },
    });

    return response.data
    
  } catch (error) {
    console.error("Error during finance get:", error);
    return {
      error: true,
      msg: "Invalid details",
    };
  }
};