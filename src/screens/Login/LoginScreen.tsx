import React, { useEffect, useRef, useState } from "react";
import { View, Animated, Easing, Dimensions } from "react-native";
import { useAuth } from "../../contexts/AuthContext";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import LoginComponent from "./LoginComponent";
import RecoverComponent from "./RecoverComponent";
import ChangePasswordComponent from "./ChangePasswordComponent";

const { height } = Dimensions.get("window");

const LoginScreen = () => {
  const { authState, onLogin, checkValidationCode, forgotPassword, changePassword } = useAuth();

  const [checked, setChecked] = useState<boolean>(false);
  const [cgc, setCgc] = useState<string>("");
  const [msg, setMsg] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [newPasswordRepeat, setNewPasswordRepeat] = useState<string>("");
  const [verificationCode, setVerificationCode] = useState<string>("");
  const [view, setView] = useState<"login" | "recover" | "changePassword">("login");
  const translationLogo = useRef(new Animated.Value(0)).current;
  const translationView = useRef(new Animated.Value(height)).current;

  const handleLogin = async () => {
    setMsg("")
    const result = await onLogin?.(cgc, password, checked);
    console.log(result);
    if (result?.error) {
      setMsg(result.msg);
    }
  };

  const sendEmail = async () => {
    const response =  await forgotPassword?.(cgc);

    setView("changePassword"); 
  };

  const handlePasswordChange = async () => {
    if (newPassword !== newPasswordRepeat) {
      alert("As senhas não coincidem");
      return;
    }
    await changePassword?.(cgc, verificationCode, newPassword );
  };

  const toggleComponent = (newView: "login" | "recover" | "changePassword") => {
    setView(newView);
  };

  const validateCode = async () => {
    const result = await checkValidationCode?.(cgc, verificationCode)
    if (result?.error) {
      alert(result.msg);
    }
  }

  useEffect(() => {
    if(authState?.status === "needupdate")
      toggleComponent("changePassword")
    if(authState?.status === "login")
      toggleComponent("login")
  }, [authState]);

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
      extraScrollHeight={40}
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
          {view === "login" && (
            <LoginComponent
              msg={msg}
              cgc={cgc}
              setCgc={setCgc}
              password={password}
              setPassword={setPassword}
              checked={checked}
              setChecked={setChecked}
              handleLogin={handleLogin}
              toggleComponent={() => toggleComponent("recover")}
            />
          )}
          {view === "recover" && (
            <RecoverComponent
              cgc={cgc}
              setCgc={setCgc}
              sendEmail={sendEmail}
              toggleComponent={() => toggleComponent("login")}
            />
          )}
          {view === "changePassword" && (
            <ChangePasswordComponent
              validateCode={validateCode}
              toggleComponent={() => toggleComponent("login")}
              changePassword={handlePasswordChange}
              newPassword={newPassword}
              setNewPassword={setNewPassword}
              newPasswordRepeat={newPasswordRepeat}
              setNewPasswordRepeat={setNewPasswordRepeat}
              setVerificationCode={setVerificationCode}
            />
          )}
        </Animated.View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default LoginScreen;
