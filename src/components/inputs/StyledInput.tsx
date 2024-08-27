import React from "react";
import { TextInput, View, TextInputProps, StyleSheet } from "react-native";

type SearchInputProps = TextInputProps & {
  icon?: React.ReactNode;
  placeholder?: string;
  multiline?: boolean;
};

const StyledInput = ({
  icon,
  placeholder,
  multiline,
  ...props
}: SearchInputProps) => {
  return (
    <View style={styles.container}>
      <TextInput
        multiline={multiline ? true : false}
        placeholder={placeholder}
        placeholderTextColor="#ADADAD" // Estilo do placeholder
        style={styles.input} // Estilo adicional com StyleSheet
        {...props}
      />
      {icon && <View style={styles.icon}>{icon}</View>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E5E7EB", // Cor de fundo cinza claro
    borderRadius: 25, // Bordas arredondadas
    paddingVertical: 8,
    paddingHorizontal: 16,
    width: "100%",
  },
  input: {
    flex: 1,
    color: "#424141",
    minHeight: 40,
  },
  icon: {
    marginLeft: 8,
  },
});

export default StyledInput;
