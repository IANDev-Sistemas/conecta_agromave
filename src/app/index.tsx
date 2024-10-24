import React from "react";
import { ThemeProvider } from "@rneui/themed";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { AuthProvider } from "../contexts/AuthContext";
import Router from "../navigation/Router";
import { FazendaProvider } from "../contexts/FazendaContext";
import theme from "../../GlobalStyle"; // Importando estilos globais // Certifique-se de ajustar o caminho
import { SafraProvider } from "../contexts/SafraContext";
import { GrupoProvider } from "../contexts/GrupoContext";

export default function Index() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider theme={theme}>
      <GrupoProvider>
          <FazendaProvider>
            <SafraProvider>
              <AuthProvider>
                <Router />
              </AuthProvider>
            </SafraProvider>
          </FazendaProvider>
        </GrupoProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
