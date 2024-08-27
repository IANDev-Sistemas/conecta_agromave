import React, { useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import LoginInput from "@/src/components/inputs/LoginInput";
import LoginButton from "@/src/components/buttons/LoginButton";
import VerificationCodeInput from "./VerificationCodeInput";
import { useAuth } from "@/src/contexts/AuthContext";

interface ChangePasswordProps {
  msg: string;
  toggleComponent: () => void;
  changePassword: () => void;
  newPassword: string;
  setNewPassword: (text: string) => void;
  newPasswordRepeat: string;
  setNewPasswordRepeat: (text: string) => void;
  setVerificationCode: (text: string) => void;
  verificationCode: string;
  validateCode: () => void;
}

const ChangePasswordComponent: React.FC<ChangePasswordProps> = ({
  msg,
  toggleComponent,
  changePassword,
  newPassword,
  setNewPassword,
  newPasswordRepeat,
  setNewPasswordRepeat,
  setVerificationCode,
  verificationCode,
  validateCode,
}) => {
  const { authState } = useAuth();
  const [passwordCriteria, setPasswordCriteria] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    specialChar: false,
  });

  const handlePasswordChange = (text: string) => {
    setNewPassword(text);
    setPasswordCriteria({
      length: text.length >= 6 && text.length <= 128,
      uppercase: /[A-Z]/.test(text),
      lowercase: /[a-z]/.test(text),
      specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(text),
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={toggleComponent}>
          <AntDesign name="arrowleft" size={24} color="black" />
        </Pressable>
        <Text style={styles.headerText}>Alterar Senha</Text>
      </View>
      {authState?.status === "needupdate" && (
        <>
          <Text style={styles.label}>Código de Verificação</Text>
          <VerificationCodeInput onCodeFilled={setVerificationCode} />
          <View style={styles.messageContainer}>
            <Text style={styles.errorMessage}>{msg}</Text>
          </View>
          <LoginButton
            disabled={verificationCode.length > 5 ? false : true}
            label="Validar"
            onClick={validateCode}
          />
        </>
      )}
      {authState?.status === "changePassword" && (
        <>
          <LoginInput
            label="Nova Senha"
            placeholder="Digite sua nova senha"
            isPassword
            value={newPassword}
            onChangeText={handlePasswordChange}
          />
          <LoginInput
            label="Repita a Senha"
            placeholder="Digite sua nova senha"
            isPassword
            value={newPasswordRepeat}
            onChangeText={setNewPasswordRepeat}
          />
          <View style={styles.messageContainer}>
            <Text style={styles.errorMessage}>{msg}</Text>
          </View>
          <View style={styles.criteriaContainer}>
            <Text style={[styles.criteriaText, passwordCriteria.length && styles.validCriteria]}>
              6 a 128 caracteres
            </Text>
            <Text style={[styles.criteriaText, passwordCriteria.uppercase && styles.validCriteria]}>
              1 ou mais letras maiúsculas
            </Text>
            <Text style={[styles.criteriaText, passwordCriteria.lowercase && styles.validCriteria]}>
              1 ou mais letras minúsculas
            </Text>
            <Text style={[styles.criteriaText, passwordCriteria.specialChar && styles.validCriteria]}>
              1 ou mais caracteres especiais
            </Text>
          </View>
          <LoginButton label="Alterar Senha" onClick={changePassword} />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "83%",
    paddingVertical: 28,
    gap: 8,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "66%",
  },
  headerText: {
    paddingHorizontal: 12,
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    color: "black",
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
    paddingHorizontal: 12,
  },
  messageContainer: {
    width: "100%",
    padding: 8,
  },
  errorMessage: {
    textAlign: "left",
    color: "#8B0000",
  },
  criteriaContainer: {
    width: "100%",
    paddingHorizontal: 8,
  },
  criteriaText: {
    textAlign: "left",
    color: "#8B0000",
  },
  validCriteria: {
    color: "#32CD32",
  },
});

export default ChangePasswordComponent;
