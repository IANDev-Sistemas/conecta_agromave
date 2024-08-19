import React from "react";
import { Text } from "react-native";

interface LabelProps {
  children?: React.ReactNode;
  size: string;
  weight: string;
}

const Label = ({ children, size, weight }: LabelProps) => {
  return <Text className={`text-${size} font-${weight} mb-2 `}>{children}</Text>;
};

export default Label;
