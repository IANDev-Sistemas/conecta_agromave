import React from "react";
import { ThemeProvider } from "@rneui/themed";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { AuthProvider } from "../contexts/AuthContext";
import Router from "../navigation/Router";
import { FazendaProvider } from "../contexts/FazendaContext";
import  theme  from "../../GlobalStyle"; // Importando estilos globais // Certifique-se de ajustar o caminho

export default function Index() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider theme={theme}>
        <FazendaProvider>
          <AuthProvider>
            <Router />
          </AuthProvider>
        </FazendaProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
