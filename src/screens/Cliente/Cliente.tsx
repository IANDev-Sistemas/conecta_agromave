import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Pressable,
  StyleSheet,
} from "react-native";
import Constants from "expo-constants";
import { ArrowLeft2 } from "iconsax-react-native";
import { useNavigation } from "@react-navigation/native";
import { BottomTabsTypes } from "../../navigation/BottomTabs";
import { Avatar } from "@rneui/themed";
import { useAuth } from "../../contexts/AuthContext";
import CreditSlider from "./CreditSlider"; // Certifique-se de que o caminho está correto
import LoginInput from "@/src/components/inputs/LoginInput";
import LoginButton from "@/src/components/buttons/LoginButton";

const statusBarHeight = Constants.statusBarHeight;

const Cliente = () => {
  const [currentCredit, setCurrentCredit] = useState<number>(0);
  const [email, setEmail] = useState<string>("email@email.com");
  const [celular, setCelular] = useState<string>("(41)99999-9999");
  const navigation = useNavigation<BottomTabsTypes>();
  const { authState } = useAuth();
  return (
    <View style={styles.container}>
      <View
        style={[
          styles.header,
          { paddingTop: statusBarHeight, paddingVertical: 20 },
        ]}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeft2 size="30" color="white" />
        </TouchableOpacity>
      </View>
      <View style={styles.mainContent}>
        <View style={styles.innerContent}>
          <Avatar
            size={90}
            rounded
            source={{ uri: "https://randomuser.me/api/portraits/men/36.jpg" }}
            avatarStyle={styles.avatarStyle}
          />
          <Text style={styles.greetingText}>
            {" "}
            Olá, {authState?.usuario?.nome}{" "}
          </Text>
          <CreditSlider
            maxCreditLimit={1000}
            currentCredit={currentCredit}
            setCurrentCredit={setCurrentCredit}
          />
          <View style={styles.formContainer}>
            <ScrollView
              contentContainerStyle={{ paddingBottom: 20 }}
              style={{ width: "100%", height: "100%" }}
            >
              <Pressable style={styles.formPressable}>
                <Text style={styles.formTitle}>Dados</Text>

                <LoginInput
                  label="Email"
                  placeholder="Digite seu email"
                  value={
                    authState?.usuario?.email ? authState?.usuario?.email : ""
                  }
                  onChangeText={setEmail}
                />
                <LoginInput
                  label="Celular"
                  placeholder=""
                  value={
                    authState?.usuario?.telefone
                      ? authState?.usuario?.telefone
                      : ""
                  }
                  onChangeText={setCelular}
                />

                <LoginButton onClick={() => {}} label="Salvar Alterações" />
                <LoginButton onClick={() => {}} label="Alterar Senha" />
              </Pressable>
            </ScrollView>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "white",
  },
  header: {
    position: "absolute",
    width: "100%",
    justifyContent: "center",
    backgroundColor: "#023A5D",
    paddingHorizontal: 40,
  },
  mainContent: {
    marginTop: 100,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: "#E7E7E7",
    alignItems: "center",
  },
  innerContent: {
    marginTop: 20,
    alignItems: "center",
    gap: 20,
    width: "100%",
  },
  avatarStyle: {
    borderColor: "#023A5D",
    borderWidth: 2,
  },
  greetingText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#023A5D",
  },
  formContainer: {
    backgroundColor: "white",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    width: "100%",
    paddingBottom: 20,
  },
  formPressable: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    padding: 12,
  },
  formTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
  },
});

export default Cliente;
