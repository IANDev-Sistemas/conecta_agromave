import apiPublic from "@/src/api/api";
import { tKeyGenerator } from "@/src/helpers/tKeyGenerator";

export const getEvent = async (
) => {
  const tKey = tKeyGenerator();

  try {
    const response = await apiPublic.get("/odwctrl", {
      params: {
        action: "execTarefa",
        apelido: "CNTAGROMAVE-api-rotas",
        tKey: tKey,
        scriptFunction: "getEvent",
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