import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import { fazendas, visitas } from "@/dummydata";
import Header from "@/src/components/Header";
import CustomDropdown from "@/src/components/inputs/Dropdown";
import VisitasCard from "./VisitasCard";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";

interface Fazenda {
  id: number;
  nome: string;
  municipio: string;
  area: string;
}

type RouteParams = {
  params: {
    selectedFazenda?: number;
  };
};

const Visitas = () => {
  const route = useRoute<RouteProp<RouteParams, "params">>();
  const navigation = useNavigation();

  const [selectedFazenda, setSelectedFazenda] = useState<number>(
    route.params?.selectedFazenda || 0
  );

  useEffect(() => {
    if (route.params?.selectedFazenda !== undefined) {
      setSelectedFazenda(route.params.selectedFazenda);
    }
  }, [route.params?.selectedFazenda]);

  const filteredVisitas = visitas.filter(
    (visita) => visita.idFazenda === selectedFazenda
  );

  return (
    <View className="flex-1 w-full bg-white">
      <View className="mt-28 h-full items-center w-full">
        <Header title="Visitas">
          <View className="flex-col mt-5 w-2/3 gap-5">
            <CustomDropdown
              label="Propriedades"
              onChange={(value) => setSelectedFazenda(value)}
              value={selectedFazenda}
              list={fazendas.map((fazenda) => ({
                key: fazenda.id,
                name: fazenda.nome,
              }))}
              placeholder="Selecione a propriedade"
            />
          </View>
        </Header>
        <ScrollView
          contentContainerStyle={{ paddingBottom: 200 }}
          style={{ width: "100%" }}
        >
          <Pressable
            style={{
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {filteredVisitas.map((visita, index) => (
              <VisitasCard key={index} {...visita} />
            ))}
          </Pressable>
        </ScrollView>
      </View>
    </View>
  );
};

export default Visitas;
