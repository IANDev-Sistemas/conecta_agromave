import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Pressable,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import CustomDropdown from "@/src/components/inputs/Dropdown";
import Header from "@/src/components/general/Header";
import FazendaCard from "./FazendaCard";
import { BottomTabsTypes } from "@/src/navigation/BottomTabs";
import Consultor from "./ConsultorCardFazenda";
import { useFazenda } from "@/src/contexts/FazendaContext";
import { consultores } from "@/dummydata";

interface Consultor {
  tipo: string;
  nome: string;
  contato: string;
  email: string;
}

interface Fazenda {
  codigo: number;
  nome: string;
  cidade: string;
  uf: string;
  area: number;
}

const Propriedades: React.FC = () => {
  const [selectedFazenda, setSelectedFazenda] = useState<Fazenda | null>(null);
  const [selectedConsultores, setSelectedConsultores] = useState<Consultor[]>([]);
  const navigation = useNavigation<BottomTabsTypes>();

  const { fazendas } = useFazenda();

  const getConsultoresByFazenda = (codigoFazenda: number) => {
    return consultores.filter((consultor) => consultor.idFazenda === codigoFazenda);
  };

  const handleFazendaChange = (value: number) => {
    const fazenda = fazendas.find((f) => f.codigo === value) || null;

    if (fazenda) {
      const consultoresFazenda = getConsultoresByFazenda(fazenda.codigo);
      setSelectedConsultores(consultoresFazenda);
    } else {
      setSelectedConsultores([]); // Limpar consultores se a fazenda não for encontrada
    }

    setSelectedFazenda(fazenda);
  };

  return (
    <View className="flex-1 h-full bg-white">
      <View className="flex-1 mt-28 items-center w-full h-full">
        <Header title="Propriedades">
          <View className="flex-col w-2/3 gap-5">
            <CustomDropdown
              onChange={(value) => handleFazendaChange(Number(value))}
              value={selectedFazenda ? selectedFazenda.codigo : ""}
              list={fazendas.map((fazenda) => ({
                key: fazenda.codigo,
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
              <View className="text-left ml-16 w-full flex-column mt-4">
                <Text className="text-lg font-bold">Consultores</Text>
                {selectedConsultores && selectedConsultores.length > 0 ? (
                  selectedConsultores.map((consultor, index) => (
                    <Consultor key={index} {...consultor} />
                  ))
                ) : (
                  <Text className="text-gray-600">Nenhum consultor encontrado.</Text>
                )}
              </View>
              <TouchableOpacity
                style={{
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={() =>
                  navigation.navigate("Visitas", {
                    selectedFazenda: selectedFazenda?.codigo,
                  })
                }
              >
                <View
                  style={{ padding: 16 }}
                  className="rounded-xl bg-principal w-full items-center mt-8"
                >
                  <Text className="font-bold text-white">Visualizar Visitas</Text>
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
