import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Pressable,
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
    <View className="flex-1 w-full bg-white">
      <View
        className="absolute w-full flex justify-center bg-principal px-10 py-12"
        style={{ paddingTop: statusBarHeight, paddingVertical: 20 }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeft2 size="30" color="white" />
        </TouchableOpacity>
      </View>
      <View className="mt-28 rounded-t-3xl h-full items-center w-full bg-background">
        <View className="mt-10 items-center h-full gap-5 w-full">
          <Avatar
            size={90}
            rounded
            source={{ uri: "https://randomuser.me/api/portraits/men/36.jpg" }}
            avatarStyle={{ borderColor: "#023A5D", borderWidth: 2 }}
          />
          <Text className="text-2xl font-bold mb-4 text-principal">
            {" "}
            Olá, {authState?.usuario?.nome}{" "}
          </Text>
          <CreditSlider
            maxCreditLimit={1000}
            currentCredit={currentCredit}
            setCurrentCredit={setCurrentCredit}
          />
          <View className=" items-center justify-center gap-5 w-full h-full bg-white rounded-t-3xl">
            <ScrollView
              contentContainerStyle={{ paddingBottom: 500 }}
              style={{ width: "100%", height: "100%" }}
            >
              <Pressable
                style={{
                  width: "100%",
                  height: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                  display: "flex",
                  flexDirection: "column",
                  padding: 12,
                }}
              >
                <Text className="text-xl font-bold mt-4">Dados</Text>

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
                    authState?.usuario?.telefone ? authState?.usuario?.telefone : ""
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

export default Cliente;
