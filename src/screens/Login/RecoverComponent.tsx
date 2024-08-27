import LoginButton from "@/src/components/buttons/LoginButton";
import LoginInput from "@/src/components/inputs/LoginInput";
import { applyMask, removeMask } from "@/src/helpers/mask";
import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";

interface RecoverProps {
  msg: string;
  cgc: string;
  setCgc: (text: string) => void;
  sendEmail: () => void;
  toggleComponent: () => void;
}

const RecoverComponent: React.FC<RecoverProps> = ({
  msg,
  cgc,
  setCgc,
  sendEmail,
  toggleComponent,
}) => {
  const handleCgcChange = (text: string) => {
    const unmaskedValue = removeMask(text);
    setCgc(unmaskedValue);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={toggleComponent}>
          <AntDesign name="arrowleft" size={24} color="black" />
        </Pressable>
        <Text style={styles.title}>Recuperação</Text>
      </View>
      <LoginInput
        label="CPF ou CNPJ"
        placeholder="Digite seu CPF ou CNPJ"
        type="number-pad"
        value={applyMask(cgc, "cgc")}
        onChangeText={handleCgcChange}
      />
      <View style={styles.messageContainer}>
        <Text style={styles.message}>{msg}</Text>
      </View>
      <LoginButton
        disabled={cgc.length > 10 ? false : true}
        label="Enviar E-mail de Recuperação"
        onClick={sendEmail}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "83%",
    paddingVertical: 20,
    gap: 8,
  },
  header: {
    flexDirection: "row",
    width: "66%",
    justifyContent: "space-between",
  },
  title: {
    paddingHorizontal: 12,
    fontSize: 18,
    color: "black",
    marginBottom: 20,
    fontWeight: "bold",
  },
  messageContainer: {
    width: "100%",
    padding: 4,
  },
  message: {
    color: "#8B0000", // Bordo color
    textAlign: "left",
  },
});

export default RecoverComponent;
