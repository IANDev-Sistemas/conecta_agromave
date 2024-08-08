import React, { useState } from "react";
import { View, Text, Pressable } from "react-native";
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
  verificationCode:string;
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
  validateCode
}) => {
  const { authState } = useAuth();
  const [passwordCriteria, setPasswordCriteria] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    specialChar: false
  });

  const handlePasswordChange = (text: string) => {
    setNewPassword(text);
    setPasswordCriteria({
      length: text.length >= 6 && text.length <= 128,
      uppercase: /[A-Z]/.test(text),
      lowercase: /[a-z]/.test(text),
      specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(text)
    });
  };

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
      {authState?.status === 'needupdate' && (
        <>
          <Text className="text-black text-lg font-bold px-3">Código de Verificação</Text>
          <VerificationCodeInput onCodeFilled={setVerificationCode} />
          <View className='w-full p-2'>
            <Text className='text-left color-bordo'>{msg}</Text>
          </View>
          <LoginButton disabled={verificationCode.length > 5  ? false : true}  label="Validar" onClick={validateCode} />
        </>
      )}
      {authState?.status === 'changePassword' && <>
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
        <View className='w-full p-2'>
          <Text className='text-left color-bordo'>{msg}</Text>
        </View>
        <View className='w-full px-2'>
          <Text className={`text-left ${passwordCriteria.length ? 'text-green-500' : 'color-bordo'}`}>6 a 128 caracteres</Text>
          <Text className={`text-left ${passwordCriteria.uppercase ? 'text-green-500' : 'color-bordo'}`}>1 ou mais letras maiúsculas</Text>
          <Text className={`text-left ${passwordCriteria.lowercase ? 'text-green-500' : 'color-bordo'}`}>1 ou mais letras minúsculas</Text>
          <Text className={`text-left ${passwordCriteria.specialChar ? 'text-green-500' : 'color-bordo'}`}>1 ou mais caracteres especiais</Text>
        </View>
        <LoginButton label="Alterar Senha" onClick={changePassword} />
      </>}
    </View>
  );
};

export default ChangePasswordComponent;
