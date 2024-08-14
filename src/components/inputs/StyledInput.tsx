import React from 'react';
import { TextInput, View, TextInputProps, StyleSheet } from 'react-native';

type SearchInputProps = TextInputProps & {
  icon?: React.ReactNode;
  placeholder?: string;
};

const StyledInput = ({ icon, placeholder, ...props }: SearchInputProps) => {
  return (
    <View className="flex flex-row items-center bg-gray-200 rounded-full py-2 px-4">
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="#ADADAD" // Estilo do placeholder
        style={styles.input} // Estilo adicional com StyleSheet
        {...props}
      />
      {icon && <View className="ml-2">{icon}</View>}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    width:"80%",
    color: '#ADADAD', // Cor do texto quando digitado
  },
});

export default StyledInput;
