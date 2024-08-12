import React from "react";
import { View, Text } from "react-native";
import { Location } from "iconsax-react-native";

interface Consultor {
  tipo: string;
  nome: string;
}

interface Fazenda {
  id: number;
  nome: string;
  municipio: string;
  area: string;
  consultores: Consultor[];
}

interface FazendaProps {
  fazenda: Fazenda;
}

const FazendaCard: React.FC<FazendaProps> = ({ fazenda }) => {
  return (
    <View
      style={{
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
      }}
      className="mt-5 w-5/6 rounded-xl border-background border-1 bg-white items-center pb-8 pt-4 px-5 gap-3"
    >
      <Text className="text-xl font-bold mb-3">{fazenda.nome}</Text>
      <View className="text-left w-full flex-row items-center gap-2">
        <Location size={18} color="black" />
        <Text className="text-md font-medium">{fazenda.municipio}</Text>
      </View>
      <View className="text-left ml-14 w-full flex-row items-">
        <Text className="text-md font-medium">{fazenda.area}</Text>
      </View>
    </View>
  );
};

export default FazendaCard;