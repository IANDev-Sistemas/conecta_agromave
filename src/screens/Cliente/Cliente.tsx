import React from "react";
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
import Background from "@/src/components/general/Background";

const statusBarHeight = Constants.statusBarHeight;

const Cliente = () => {
  const navigation = useNavigation<BottomTabsTypes>();
  const { authState } = useAuth();

  const { usuario } = authState || {};
  const { nome, email, telefone, limite } = usuario || {};

  return (
    <Background>
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
            icon={{name: 'user', type: 'font-awesome'}}
            avatarStyle={styles.avatarStyle}
          />
          <Text style={styles.greetingText}>Olá, {nome}</Text>
          <CreditSlider maxCreditLimit={limite} currentCredit={limite / 2} />
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
                  value={email || ""}
                  onChangeText={() => {}}
                />
                <LoginInput
                  label="Celular"
                  placeholder=""
                  value={telefone || ""}
                  onChangeText={() => {}}
                />

                <LoginButton onClick={() => {}} label="Salvar Alterações" />
                <LoginButton onClick={() => {}} label="Alterar Senha" />
              </Pressable>
            </ScrollView>
          </View>
        </View>
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "transparent",
  },
  header: {
    position: "absolute",
    width: "100%",
    justifyContent: "center",
    backgroundColor: "white",
    paddingHorizontal: 40,
  },
  mainContent: {
    marginTop: 90,
    backgroundColor: "transparent",
    alignItems: "center",
  },
  innerContent: {
    marginTop: 20,
    alignItems: "center",
    gap: 20,
    width: "100%", 
  },
  avatarStyle: {
    borderColor: "#007E34",
    borderWidth: 2,
  },
  greetingText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 20,
    backgroundColor: "white", // Fundo branco
    paddingVertical: 10, // Espaçamento vertical
    paddingHorizontal: 15, // Espaçamento horizontal
    borderRadius: 16, // Bordas arredondadas
    borderWidth: 2, // Largura da borda
    borderColor: "#007E34", // Cor da borda
    color: "#007E34", // Cor do texto
    textAlign: "center", // Centraliza o texto
    overflow: "hidden", // Garante que o conteúdo fique dentro das bordas arredondadas
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
