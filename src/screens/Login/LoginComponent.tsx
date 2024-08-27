import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { CheckBox } from '@rneui/themed';
import Icon from 'react-native-vector-icons/FontAwesome';
import LoginButton from '@/src/components/buttons/LoginButton';
import LoginInput from '@/src/components/inputs/LoginInput';
import { applyMask, removeMask } from '@/src/helpers/mask';

interface LoginProps {
  msg: string;
  cgc: string;
  setCgc: (text: string) => void;
  password: string;
  setPassword: (text: string) => void;
  checked: boolean;
  setChecked: (checked: boolean) => void;
  handleLogin: () => {};
  toggleComponent: () => void;
}

const LoginComponent: React.FC<LoginProps> = ({
  msg,
  cgc,
  setCgc,
  password,
  setPassword,
  checked,
  setChecked,
  handleLogin,
  toggleComponent,
}) => {
  const handleCgcChange = (text: string) => {
    const unmaskedValue = removeMask(text);
    setCgc(unmaskedValue);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <LoginInput
        label="CPF ou CNPJ"
        placeholder="Digite seu CPF ou CNPJ"
        type="number-pad"
        value={applyMask(cgc, 'cgc')}
        onChangeText={handleCgcChange}
      />
      <LoginInput
        label="Senha"
        placeholder="Digite sua senha"
        isPassword
        value={password}
        onChangeText={setPassword}
      />
      <View style={styles.checkboxContainer}>
        <CheckBox
          center
          title="Mantenha-me conectado"
          checked={checked}
          onPress={() => setChecked(!checked)}
          containerStyle={styles.checkbox}
          textStyle={styles.checkboxText}
          checkedIcon={<Icon name="check-square" size={24} color="grey" />}
          uncheckedIcon={<Icon name="square-o" size={24} color="grey" />}
        />
        <Pressable onPress={toggleComponent}>
          <Text style={styles.forgotPasswordText}>Esqueci a Senha</Text>
        </Pressable>
      </View>
      <View style={styles.messageContainer}>
        <Text style={styles.errorMessage}>{msg}</Text>
      </View>
      <LoginButton label="Login" onClick={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '83%',
    alignItems: 'center',
    paddingVertical: 28,
    gap: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 8,
    paddingHorizontal: 12,
  },
  checkboxContainer: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  checkbox: {
    margin: 0,
    padding: 0,
  },
  checkboxText: {
    fontSize: 12,
    fontWeight: '400',
    color: '#707070',
  },
  forgotPasswordText: {
    fontSize: 14,
    color: '#707070',
  },
  messageContainer: {
    width: '100%',
    padding: 8,
  },
  errorMessage: {
    color: '#8B0000',
  },
});

export default LoginComponent;
