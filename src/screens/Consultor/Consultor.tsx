import { consultores, fazendas } from '@/dummydata';
import Header from '@/src/components/general/Header';
import CustomDropdown from '@/src/components/inputs/Dropdown';
import { BottomTabsTypes } from '@/src/navigation/BottomTabs';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native';
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
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Header title="Consultores">
          <View style={styles.dropdownContainer}>
            <CustomDropdown
              label="Propriedade"
              onChange={(value) => setSelectedFazenda(Number(value))} // Converte o valor para número
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
            contentContainerStyle={styles.scrollViewContent}
            style={{ width: "100%" }}
          >
            <Pressable style={styles.pressableContainer}>
              <View style={styles.consultoresHeader}>
                <Text style={styles.consultoresTitle}>Consultores</Text>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  innerContainer: {
    marginTop: 100,
    alignItems: 'center',
    width: '100%',
  },
  dropdownContainer: {
    flexDirection: 'column',
    width: '66%',
    gap: 20,
  },
  scrollViewContent: {
    paddingBottom: 20,
  },
  pressableContainer: {
    width: '100%',
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  consultoresHeader: {
    textAlign: 'left',
    width: '100%',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  consultoresTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'left',
  },
});

export default Consultor;
