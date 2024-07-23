import React from 'react';
import { View, Text, Pressable, } from 'react-native';

interface CustomInputProps {
  label: string;
  onClick: () => void;
}

const LoginButton: React.FC<CustomInputProps> = ({ label, onClick }) => {

  return (
        <Pressable className='mt-5 w-full justify-center items-center h-[50px] rounded-full bg-bordo' onPress={onClick}>
            <Text className="text-lg text-white font-bold">{label}</Text>
        </Pressable>
  );
};

export default LoginButton;
