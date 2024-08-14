// components/Propriedades.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Pressable,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { fazendas } from "../../../dummydata";
import CustomDropdown from "@/src/components/inputs/Dropdown";
import Header from "@/src/components/Header";
import FazendaCard from "./FazendaCard";
import { BottomTabsTypes } from "@/src/navigation/BottomTabs";
import Consultor from "./ConsultorCardFazenda";

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

const Propriedades: React.FC = () => {
  const [selectedFazenda, setSelectedFazenda] = useState<Fazenda | null>(null);
  const navigation = useNavigation<BottomTabsTypes>();

  const handleFazendaChange = (value: number) => {
    const fazenda = fazendas.find((f) => f.id === value) || null;
    setSelectedFazenda(fazenda);
  };

  return (
    <View className="flex-1 h-full bg-white">
      <View className="flex-1 mt-28 items-center w-full h-full">
        <Header title="Propriedades">
          <View className="flex-col w-2/3 gap-5">
            <CustomDropdown
              onChange={(value) => handleFazendaChange(value)}
              value={selectedFazenda ? selectedFazenda.id : ""}
              list={fazendas.map((fazenda) => ({
                key: fazenda.id,
                name: fazenda.nome,
              }))}
              placeholder="Selecione a propriedade"
            />
          </View>
        </Header>

        {selectedFazenda && (
          <ScrollView contentContainerStyle={{}} style={{ width: "100%" }}>
            <Pressable
              style={{
                width: "100%",
                paddingHorizontal: 10,
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <FazendaCard fazenda={selectedFazenda} />
              <View className="text-left ml-16  w-full flex-column mt-4">
                <Text className="text-lg font-bold">Consultores</Text>
                {selectedFazenda.consultores.map((consultor, index) => (
                  <Consultor key={index} {...consultor} />
                ))}
              </View>
              <TouchableOpacity
                style={{
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={() =>
                  navigation.navigate("Visitas", {
                    selectedFazenda: selectedFazenda?.id,
                  })
                }
              >
                <View
                  style={{ padding: 16 }}
                  className="rounded-xl bg-bordo w-full items-center mt-8"
                >
                  <Text className="font-bold text-white">
                    Visualizar Visitas
                  </Text>
                </View>
              </TouchableOpacity>
            </Pressable>
          </ScrollView>
        )}
      </View>
    </View>
  );
};

export default Propriedades;
