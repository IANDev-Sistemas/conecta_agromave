import React from "react";
import { View, Text, Pressable } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import LoginInput from "@/src/components/inputs/LoginInput";
import LoginButton from "@/src/components/buttons/LoginButton";
import VerificationCodeInput from "./VerificationCodeInput";
import { useAuth } from "@/src/contexts/AuthContext";



interface ChangePasswordProps {
  toggleComponent: () => void;
  changePassword: () => void;
  newPassword: string;
  setNewPassword: (text: string) => void;
  newPasswordRepeat: string;
  setNewPasswordRepeat: (text: string) => void;
  setVerificationCode: (text: string) => void;
  validateCode: () => void;
}

const ChangePasswordComponent: React.FC<ChangePasswordProps> = ({
  toggleComponent,
  changePassword,
  newPassword,
  setNewPassword,
  newPasswordRepeat,
  setNewPasswordRepeat,
  setVerificationCode,
  validateCode
}) => {
  const { authState } = useAuth();
  return (
    <View className="flex-1 w-10/12 gap-2 py-7">
      <View className="flex flex-row w-2/3 justify-between">
        <Pressable onPress={toggleComponent}>
          <AntDesign name="arrowleft" size={24} color="black" />
        </Pressable>
        <Text className="px-3 text-lg text-black mb-5 font-bold">
          Alterar Senha
        </Text>
      </View>
      { authState?.status ==='needupdate' &&
        (<>
          <Text className="text-black text-lg font-bold px-3">Código de Verificação</Text>
          <VerificationCodeInput onCodeFilled={setVerificationCode} />
          <LoginButton label="Validar" onClick={validateCode} />
        </>)
      }
        { authState?.status ==='changePassword' &&<>
      <LoginInput
        label="Nova Senha"
        placeholder="Digite sua nova senha"
        isPassword
        value={newPassword}
        onChangeText={setNewPassword}
      />
      <LoginInput
        label="Repita a Senha"
        placeholder="Digite sua nova senha"
        isPassword
        value={newPasswordRepeat}
        onChangeText={setNewPasswordRepeat}
      />
      <LoginButton label="Alterar Senha" onClick={changePassword} />
      </>}
    </View>
  );
};

export default ChangePasswordComponent;
