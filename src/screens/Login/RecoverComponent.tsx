import LoginButton from "@/src/components/buttons/LoginButton";
import LoginInput from "@/src/components/inputs/LoginInput";
import { applyMask, removeMask } from "@/src/helpers/mask";
import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { View, Text, Pressable } from "react-native";

interface RecoverProps {
  msg: string;
  cgc: string;
  setCgc: (text: string) => void;
  sendEmail: () => {};
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
    <View className="flex-1 w-10/12 gap-2 py-7">
      <View className="flex flex-row w-2/3 justify-between">
        <Pressable onPress={toggleComponent}>
          <AntDesign name="arrowleft" size={24} color="black" />
        </Pressable>
        <Text className="px-3 text-lg text-black mb-5 font-bold">
          Recuperação
        </Text>
      </View>
      <LoginInput
        label="CPF ou CNPJ"
        placeholder="Digite seu CPF ou CNPJ"
        type="number-pad"
        value={applyMask(cgc, "cgc")}
        onChangeText={handleCgcChange}
      />
      <View className="w-full p-1">
        <Text className="text-left color-bordo">{msg}</Text>
      </View>
      <LoginButton
        disabled={cgc.length > 10 ? false : true}
        label="Enviar E-mail de Recuperação"
        onClick={sendEmail}
      />
    </View>
  );
};

export default RecoverComponent;
