import { consultores, fazendas } from '@/dummydata';
import Header from '@/src/components/Header';
import CustomDropdown from '@/src/components/inputs/Dropdown';
import { BottomTabsTypes } from '@/src/navigation/BottomTabs';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import ConsultorCard from './ConsultorCard';

interface Consultor {
  tipo: string;
  nome: string;
}

type RouteParams = {
  params: {
    selectedFazenda?: number;
  };
};

const Consultor = () => {
  const route = useRoute<RouteProp<RouteParams, "params">>();
  const [selectedFazenda, setSelectedFazenda] = useState<number>(
    route.params?.selectedFazenda || 0
  );

  useEffect(() => {
    if (route.params?.selectedFazenda !== undefined) {
      setSelectedFazenda(route.params.selectedFazenda);
    }
  }, [route.params?.selectedFazenda]);

  const filteredConsultores = consultores.filter(
    (consultor) => consultor.idFazenda == selectedFazenda
  );

  const navigation = useNavigation<BottomTabsTypes>();

  return (
    <View className="flex-1 h-full bg-white">
      <View className="flex-1 mt-28 items-center w-full h-full">
        <Header title="Consultores">
          <View className="flex-col w-2/3 gap-5">
            <CustomDropdown
              label="Propriedade"
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

        {selectedFazenda !== 0 && filteredConsultores.length > 0 && (
          <ScrollView
            contentContainerStyle={{}}
            style={{ width: "100%" }}
          >
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
              <View className="text-left w-full px-6 py-4">
                <Text className="text-xl font-bold text-left">Consultores</Text>
              </View>
              {filteredConsultores.map((consultor, index) => (
                <ConsultorCard key={index} {...consultor} />
              ))}
            </Pressable>
          </ScrollView>
        )}
      </View>
    </View>
  );
};

export default Consultor;
