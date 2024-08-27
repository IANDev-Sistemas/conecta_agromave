import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, KeyboardTypeOptions } from 'react-native';
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
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
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
          <Pressable onPress={toggleSecureText} style={styles.icon}>
            <Feather name={secureText ? "eye-off" : "eye"} size={20} color="#AAA" />
          </Pressable>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    width: "100%",
  },
  label: {
    paddingHorizontal: 12,
    fontSize: 18,
    color: 'black',
    marginBottom: 4,
    fontWeight: 'bold',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 40,
    borderBottomWidth: 1,
    borderColor: '#ADADAD',
    paddingVertical: 8,
  },
  input: {
    flex: 1,
    color: '#424141',
  },
  icon: {
    paddingLeft: 8,
  },
});

export default LoginInput;
