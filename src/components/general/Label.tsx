import React from "react";
import { Text, StyleSheet, TextStyle } from "react-native";

interface LabelProps {
  children?: React.ReactNode;
  size: string;
  weight: string;
}

const Label = ({ children, size, weight }: LabelProps) => {
  // Mapeia os valores de `size` e `weight` para estilos do React Native
  const textStyle: TextStyle = {
    fontSize: getSize(size),
    fontWeight: getWeight(weight),
    marginBottom: 8, // Substitui o `mb-2` do Tailwind
  };

  return <Text style={textStyle}>{children}</Text>;
};

// Função utilitária para converter o valor de `size` em pixels
const getSize = (size: string): number => {
  switch (size) {
    case "xs":
      return 12;
    case "sm":
      return 14;
    case "base":
      return 16;
    case "lg":
      return 18;
    case "xl":
      return 20;
    case "2xl":
      return 24;
    default:
      return 16; // Tamanho padrão
  }
};

// Função utilitária para converter o valor de `weight` em pesos de fonte válidos
const getWeight = (weight: string): TextStyle["fontWeight"] => {
  switch (weight) {
    case "thin":
      return "100";
    case "extralight":
      return "200";
    case "light":
      return "300";
    case "normal":
      return "400";
    case "medium":
      return "500";
    case "semibold":
      return "600";
    case "bold":
      return "700";
    case "extrabold":
      return "800";
    case "black":
      return "900";
    default:
      return "400"; // Peso padrão
  }
};

export default Label;
