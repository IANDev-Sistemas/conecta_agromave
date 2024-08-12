// components/Consultor.tsx
import React from "react";
import { View, Text, Pressable, TouchableOpacity } from "react-native";
import { AttachSquare, User, Whatsapp } from "iconsax-react-native";
import { Divider } from "@rneui/themed";

interface VisitasProps {
  consultor: string;
  data: string;
  tipo: string;
  link: string;
}

const VisitasCard: React.FC<VisitasProps> = ({
  consultor,
  data,
  tipo,
  link,
}) => {
  return (
    <View
      style={{
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
      }}
      className=" flex-row mt-5  w-11/12 rounded-xl border-background border-1 bg-white items-center pb-8 pt-4 px-8 "
    >
      <View className="gap-2 w-4/5 flex-row ">
        <View className="gap-2  flex-col ">
          <Text className="text-md font-medium">Consultor: {consultor}</Text>
          <Text className="text-md font-medium flex-wrap ">
            Tipo da vistoria: {tipo}
          </Text>
          <Text className="text-md font-medium">Data: {data}</Text>
        </View>
      </View>
      <View className=" gap-2">
        <TouchableOpacity>
          <AttachSquare size={35} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default VisitasCard;
