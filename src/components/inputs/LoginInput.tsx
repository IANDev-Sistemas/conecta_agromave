import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, KeyboardAvoidingView, KeyboardTypeOptions } from 'react-native';
import { Feather } from "@expo/vector-icons";

interface CustomInputProps {
  label: string;
  placeholder: string;
  isPassword?: boolean;
  type?: KeyboardTypeOptions;
  dataType?: 'cgc';
  value: string;
  onChangeText: (text: string) => void;
}

const applyMask = (value: string, maskType: 'cgc' | undefined) => {
  if (maskType === 'cgc') {
    if (value.length <= 14) {
      return value
        .replace(/\D/g, '')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    } else {
      return value
        .replace(/\D/g, '')
        .replace(/(\d{2})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1/$2')
        .replace(/(\d{4})(\d{1,2})$/, '$1-$2');
    }
  }
  return value;
};

const LoginInput: React.FC<CustomInputProps> = ({ label, placeholder, isPassword = false, type = 'default', dataType, value, onChangeText }) => {
  const [secureText, setSecureText] = useState(isPassword);

  const handleChange = (text: string) => {
    const maskedText = applyMask(text, dataType);
    onChangeText(maskedText);
  };

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
          onChangeText={handleChange}
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
