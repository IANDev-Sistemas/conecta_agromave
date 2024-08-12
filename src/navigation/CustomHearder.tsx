import React from "react";
import { View, Pressable, Text } from "react-native";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { Divider } from "@rneui/themed";
import { useAuth } from "../contexts/AuthContext";
import Constants from "expo-constants";
import { expo } from "../../app.json";
import { ProfileCircle } from "iconsax-react-native";

const statusBarHeight = Constants.statusBarHeight;

const CustomHeader = ({
  setCardVisible,
  cardVisible,
}: {
  setCardVisible: any;
  cardVisible: boolean;
}) => {
  const {authState, onLogout } = useAuth();

  const toggleCardVisibility = () => {
    setCardVisible(!cardVisible);
  };

  return (
    <View>
      <View
        className="absolute w-full flex justify-center bg-bordo px-10"
        style={{ paddingTop: statusBarHeight, paddingVertical: 20 }}
      >
        <Pressable className="flex-row w-100 items-center gap-5" onPress={toggleCardVisibility}>
          <ProfileCircle size={30} color="white" variant="Bold" />
          <Text className="font-bold text-white" >Olá, {authState?.usuario?.nomeUsuario}</Text>
        </Pressable>
      </View>

      {cardVisible && (
        <View
          className="absolute py-2 w-1/2 flex justify-center bg-white rounded-lg"
          style={{
            top: statusBarHeight + 40,
            marginHorizontal: 10,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.8,
            shadowRadius: 2,
            elevation: 50,
          }}
        >
          <View className="flex-row gap-3 justify-center items-center py-4">
            <FontAwesome name="cog" size={24} color="#8B0000" />
            <Text className="text-lg text-[#49454F] font-bold">
              Configurações
            </Text>
          </View>
          <Divider />
          <Text className="text-lg text-[#49454F] text-center my-4 font-bold" >Versão {expo.version}</Text>
          <Pressable
            className="bg-[#8B0000] rounded-full p-2 gap-2  mx-4 my-2 flex flex-row items-center justify-center"
            onPress={onLogout}
          >
            <MaterialIcons name="logout" size={24} color="white" />
            <Text className="text-white  font-bold">Sair</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
};

export default CustomHeader;
