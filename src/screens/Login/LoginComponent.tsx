import LoginButton from '@/src/components/buttons/LoginButton';
import LoginInput from '@/src/components/inputs/LoginInput';
import { CheckBox } from '@rneui/themed';
import Icon from 'react-native-vector-icons/FontAwesome';
import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { applyMask, removeMask } from '@/src/helpers/mask';

interface LoginProps {
  cgc: string;
  setCgc: (text: string) => void;
  password: string;
  setPassword: (text: string) => void;
  checked: boolean;
  setChecked: (checked: boolean) => void;
  handleLogin: () => {};
  toggleComponent: () => void;
  msg: string
}

const LoginComponent: React.FC<LoginProps> = ({
  cgc,
  setCgc,
  password,
  setPassword,
  checked,
  setChecked,
  handleLogin,
  toggleComponent,
  msg
}) => {

  const handleCgcChange = (text: string) => {
    const unmaskedValue = removeMask(text);
    setCgc(unmaskedValue);
  };

  return (
    <View className="flex-1 w-10/12 items-center gap-2 py-7">
      <Text className="px-3 text-lg text-black mb-2 font-bold">Login</Text>
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
      <View className="p-0 mt-5 flex-row w-full items-center justify-between">
        <CheckBox
          center
          title="Mantenha-me conectado"
          checked={checked}
          onPress={() => setChecked(!checked)}
          containerStyle={{ margin: 0, padding: 0, gap: 0 }}
          textStyle={{ fontSize: 12, fontWeight: '400', color: '#707070' }}
          checkedIcon={<Icon name="check-square" size={24} color="grey" />}
          uncheckedIcon={<Icon name="square-o" size={24} color="grey" />}
        />
        <Pressable onPress={toggleComponent}>
          <Text className="text-sm font-normal text-[#707070]">Esqueci a Senha</Text>
        </Pressable>
      </View>
      <View className='w-full p-2' >
      <Text className='text-left color-bordo'>{msg}</Text>
      </View>
      <LoginButton label="Login" onClick={handleLogin} />
    </View>
  );
};

export default LoginComponent;
