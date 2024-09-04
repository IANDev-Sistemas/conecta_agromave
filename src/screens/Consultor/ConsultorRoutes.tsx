import { consultores } from "@/dummydata";
import apiPublic from "@/src/api/api";
import { tKeyGenerator } from "@/src/helpers/tKeyGenerator";

export const getConsultores = async (
  codCliente: number | undefined,
  codPropriedade: number | undefined
) => {
  const tKey = tKeyGenerator();

  try {
    const response = await apiPublic.get("/odwctrl", {
      params: {
        action: "execTarefa",
        apelido: "CNTAGROMAVE-api-rotas",
        tKey: tKey,
        scriptFunction: "getConsultant",
        codCliente: codCliente,
        codPropriedade: codPropriedade,
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
