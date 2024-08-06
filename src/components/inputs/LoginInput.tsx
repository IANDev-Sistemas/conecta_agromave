import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, KeyboardAvoidingView, KeyboardTypeOptions } from 'react-native';
import { Feather } from "@expo/vector-icons";

interface CustomInputProps {
  label: string;
  placeholder: string;
  isPassword?: boolean;
  type?: KeyboardTypeOptions;
  value: string;
  onChangeText: (text: string) => void;
}

const LoginInput: React.FC<CustomInputProps> = ({ label, placeholder, isPassword = false, type = 'default', value, onChangeText }) => {
  const [secureText, setSecureText] = useState(isPassword);

  const toggleSecureText = () => {
    setSecureText(!secureText);
  };

  return (
    <View className="my-2">
      <Text className="px-3 text-lg text-black mb-1 font-bold">{label}</Text>
      <View className="flex-row w-full items-center bg-transparent rounded-lg px-3 h-10 border-b-[1px] py-2 border-[#ADADAD]">
        <TextInput
          className="w-full flex-1 text-[#ADADAD]"
          placeholder={placeholder}
          placeholderTextColor="#AAA"
          secureTextEntry={secureText}
          keyboardType={type}
          value={value}
          onChangeText={onChangeText}
          autoComplete='off'
          textContentType='none'
        />
        {isPassword && (
          <Pressable onPress={toggleSecureText} className="">
            <Feather name={secureText ? "eye-off" : "eye"} size={20} color="#AAA" />
          </Pressable>
        )}
      </View>
    </View>
  );
};

export default LoginInput;
