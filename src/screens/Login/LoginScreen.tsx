import React, { useEffect, useRef, useState } from "react";
import { View, Animated, Easing, Dimensions, ImageBackground, StyleSheet } from "react-native";
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
    const result = await onLogin?.(cgc, password, checked);
    if (result?.error) {
      setMsg(result.msg);
    }
  };

  const sendEmail = async () => {
    const response =  await forgotPassword?.(cgc);

    if(response?.status === 'error')
      setMsg(response.msg);
  };

  const handlePasswordChange = async () => {
    setMsg("");
    if (newPassword !== newPasswordRepeat) {
      setMsg("Senhas não coincidem");
    } else {
      const result =  await changePassword?.(cgc, verificationCode, newPassword );
      if (result?.error) {
        setMsg(result.msg);
      }
    }
  };

  const toggleComponent = (newView: "login" | "recover" | "changePassword") => {
    setView(newView);
    setMsg("");
  };

  const validateCode = async () => {
    setMsg("");
    const result = await checkValidationCode?.(cgc, verificationCode);
    if(result.status === 'error')
      setMsg(result.msg);
    else{
      setNewPassword('');
      setNewPasswordRepeat('');
    }
  };

  useEffect(() => {
    if(authState?.status === "needupdate")
      toggleComponent("changePassword");
    if(authState?.status === "login")
      toggleComponent("login");
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
    <ImageBackground source={require("../../../assets/images/background.png")} style={styles.background}>
      <KeyboardAwareScrollView
        contentContainerStyle={{ flex: 1 }}
        resetScrollToCoords={{ x: 0, y: 0 }}
        scrollEnabled={true}
        extraScrollHeight={40}
      >
        <View style={styles.container}>
          <Animated.Image
            style={[styles.logo, { transform: [{ translateY: translationLogo }] }]}
            source={require("../../../assets/images/conecta_logo_new.png")}
          />
          <Animated.View
            style={[
              styles.animatedView,
              { transform: [{ translateY: translationView }], height: "65%" }
            ]}
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
                msg={msg}
                cgc={cgc}
                setCgc={setCgc}
                sendEmail={sendEmail}
                toggleComponent={() => toggleComponent("login")}
              />
            )}
            {view === "changePassword" && (
              <ChangePasswordComponent
                msg={msg}
                validateCode={validateCode}
                toggleComponent={() => toggleComponent("login")}
                changePassword={handlePasswordChange}
                newPassword={newPassword}
                setNewPassword={setNewPassword}
                newPasswordRepeat={newPasswordRepeat}
                setNewPasswordRepeat={setNewPasswordRepeat}
                setVerificationCode={setVerificationCode}
                verificationCode={verificationCode}
              />
            )}
          </Animated.View>
        </View>
      </KeyboardAwareScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 40,
  },
  logo: {
    position: 'absolute',
  },
  animatedView: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
});

export default LoginScreen;
