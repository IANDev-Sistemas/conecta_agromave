import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Animated,
  Easing,
  Dimensions,
  Pressable,
} from "react-native";
import { useAuth } from "../../contexts/AuthContext";
import LoginInput from "@/src/components/inputs/LoginInput";
import LoginButton from "@/src/components/buttons/LoginButton";
import { CheckBox } from "@rneui/themed";
import Icon from 'react-native-vector-icons/FontAwesome';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const { height } = Dimensions.get("window");

const LoginScreen = () => {
  const { onLogin } = useAuth();

  const [checked, setChecked] = useState<boolean>(false);
  const [cgc, setCgc] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const translationLogo = useRef(new Animated.Value(0)).current;
  const translationView = useRef(new Animated.Value(height)).current;

  const handleLogin = async () => {
    const result = await onLogin?.(cgc, password);
    if (result?.error) {
      alert(result.msg);
    } else {
      alert("Login Successful");
    }
  };

  useEffect(() => {
    Animated.parallel([
      Animated.timing(translationLogo, {
        toValue: -height * 0.25,
        delay: 1000,
        duration: 700,
        useNativeDriver: true,
        easing: Easing.ease,
      }),
      Animated.timing(translationView, {
        toValue: height * 0.1,
        delay: 1000,
        duration: 700,
        useNativeDriver: true,
        easing: Easing.ease,
      }),
    ]).start();
  }, [height, translationLogo, translationView]);

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{ flex: 1 }}
      resetScrollToCoords={{ x: 0, y: 0 }}
      scrollEnabled={true}
      extraScrollHeight={25}
    >
      <View className="flex-1 h-full justify-center items-center bg-bordo gap-10">
        <Animated.Image
          style={{ transform: [{ translateY: translationLogo }] }}
          source={require("../../../assets/images/conecta_logo.png")}
          className="absolute"
        />
        <Animated.View
          style={{
            transform: [{ translateY: translationView }],
            height: "60%",
          }}
          className="absolute bottom-0 w-full justify-center items-center bg-white rounded-t-3xl"
        >
          <View className="flex-1 w-10/12 items-center gap-2 py-7">
            <Text className="px-3 text-lg text-black mb-5 font-bold">
              Login
            </Text>
            <LoginInput
              label={"CPF ou CNPJ"}
              placeholder={"Digite seu CPF ou CNPJ"}
              type="number-pad"
              dataType="cgc"
              value={cgc}
              onChangeText={setCgc}
            />
            <LoginInput
              label={"Senha"}
              placeholder={"Digite sua senha"}
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
              <Pressable>
                <Text className="text-sm font-normal text-[#707070]">Esqueci a Senha</Text>
              </Pressable>
            </View>
            <LoginButton label={"Login"} onClick={handleLogin} />
          </View>
        </Animated.View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default LoginScreen;
