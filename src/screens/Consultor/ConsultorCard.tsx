// components/Consultor.tsx
import React from "react";
import { View, Text } from "react-native";
import { DirectboxReceive, User, Whatsapp } from "iconsax-react-native";
import { Avatar, Divider } from "@rneui/themed";

interface ConsultorProps {
  tipo: string;
  nome: string;
  contato: string;
  email: string;
}

const ConsultorCard: React.FC<ConsultorProps> = ({
  tipo,
  nome,
  contato,
  email,
}) => {
  return (
    <View
      style={{
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
      }}
      className=" flex-col mt-5 w-11/12 rounded-xl border-background border-1 bg-white  pb-8 pt-4 px-3 gap-4 text-left"
    >
      <Text className="text-lg font-bold">{tipo}</Text>
      <View className="flex-row gap-4">
        <View className="gap-4 ">
          <View className="ml-4">
            <Avatar
              size={120}
              source={{ uri: "https://randomuser.me/api/portraits/men/36.jpg" }}
              avatarStyle={{ borderRadius: 12, paddingLeft: 10 }}
            />
          </View>
        </View>
        <View className="items-center gap-4">
          <Text className="text-lg font-bold">{nome}</Text>
          <View className="flex-row items-center gap-2">
            <Whatsapp size={30} color="black" />
            <Text className="text-md font-bold">{contato}</Text>
          </View>
          <View className="flex-row items-center gap-2">
            <DirectboxReceive size={30} color="black" />
            <Text className="text-md font-bold">{email}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ConsultorCard;
