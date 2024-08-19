import React from "react";
import { View, Pressable, Text, TouchableOpacity, Platform } from "react-native";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { Divider } from "@rneui/themed";
import { useAuth } from "../contexts/AuthContext";
import Constants from "expo-constants";
import { expo } from "../../app.json";
import { LogoutCurve, ProfileCircle } from "iconsax-react-native";
import { useNavigation } from "@react-navigation/native";
import { BottomTabsTypes } from "./BottomTabs";

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
  const navigation = useNavigation<BottomTabsTypes>();

  return (
    <View>
      <View
        className="absolute w-full flex justify-center bg-principal px-10"
        style={{ paddingTop: Platform.OS === 'ios' ? statusBarHeight : statusBarHeight+25 , paddingVertical: 20 }}
      >
        <Pressable className="flex-row w-100 items-center gap-5" onPress={toggleCardVisibility}>
          <ProfileCircle size={30} color="white" variant="Bold" />
          <Text className="font-bold text-white" >Olá, {authState?.usuario?.nome}</Text>
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
            <TouchableOpacity onPress={()=>navigation.navigate("Cliente")} style={{display:'flex', flexDirection:'row', gap:10}}>
            <ProfileCircle variant="Bold" size={24} color="#023A5D" />
            <Text className="text-lg text-[#49454F] font-bold">
              Cliente
            </Text>
            </TouchableOpacity>
          </View>
          <Divider />
          <Text className="text-lg text-[#49454F] text-center my-4 font-bold" >Versão {expo.version}</Text>
          <Pressable
            className="bg-principal rounded-full p-2 gap-2  mx-4 my-2 flex flex-row items-center justify-center"
            onPress={onLogout}
          >
            <LogoutCurve size={24} color="white" />
            <Text className="text-white  font-bold">Sair</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
};

export default CustomHeader;
