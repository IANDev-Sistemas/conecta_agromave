import React, { ReactNode } from "react";
import { View, ImageBackground, StyleSheet } from "react-native";

interface BackgroundProps {
  children: ReactNode; // Define o tipo de 'children' corretamente
}

const Background: React.FC<BackgroundProps> = ({ children }) => {
  return (
    <ImageBackground
      source={require("../../../assets/images/background.png")}
      style={styles.background}
    >
      <View style={styles.overlay} />
      <View style={styles.content}>{children}</View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover", // Garante que a imagem cubra a tela
  },
  overlay: {
    ...StyleSheet.absoluteFillObject, // Preenche toda a tela
    backgroundColor: "rgba(255, 255, 255, 0.4)", // Fundo branco com 40% de opacidade
  },
  content: {
    flex: 1,
    zIndex: 1, // Garante que o conteúdo fique acima da camada de opacidade
  },
});

export default Background;
