// components/Consultor.tsx
import React from "react";
import { View, Text } from "react-native";
import { User, Whatsapp } from "iconsax-react-native";
import { Divider } from "@rneui/themed";

interface ConsultorProps {
  tipo: string;
  nome: string;
}

const Consultor: React.FC<ConsultorProps> = ({ tipo, nome }) => {
  return (
    <View
      style={{
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
      }}
      className=" flex-row mt-5 w-5/6 rounded-xl border-background border-1 bg-white items-center pb-8 pt-4 px-3 gap-3"
    >
      <View className="gap-2 w-2/5 ">
        <Text className="text-md font-medium">{tipo}</Text>
        <Text className="text-md font-bold flex-wrap ">{nome}</Text>
      </View>
      <Divider orientation="vertical" width={2} style={{ height: "80%", backgroundColor: "#000" }} />
      <View className="items-center w-1/5 gap-2">
        <User size={22} color="black" />
        <Text className="text-md font-medium">Dados</Text>
      </View>
      <Divider orientation="vertical" width={2} style={{ height: "80%", backgroundColor: "#000" }} />
      <View className="items-center w-1/5 gap-2">
        <Whatsapp size={22} color="black" />
        <Text className="text-md font-medium">Contato</Text>
      </View>
    </View>
  );
};

export default Consultor;
