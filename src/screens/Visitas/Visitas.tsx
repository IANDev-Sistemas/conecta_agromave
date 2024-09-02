import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, Pressable, StyleSheet } from "react-native";
import { fazendas, visitas } from "@/dummydata";
import Header from "@/src/components/general/Header";
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
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Header title="Visitas">
          <View style={styles.dropdownContainer}>
            <CustomDropdown
              label="Propriedades"
              onChange={(value) => setSelectedFazenda(Number(value))}
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
          contentContainerStyle={styles.scrollViewContent}
          style={styles.scrollView}
        >
          <Pressable style={styles.pressable}>
            {filteredVisitas.map((visita, index) => (
              <VisitasCard key={index} {...visita} />
            ))}
          </Pressable>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "white",
  },
  headerContainer: {
    marginTop: 100,
    height: "100%",
    alignItems: "center",
    width: "100%",
  },
  dropdownContainer: {
    flexDirection: "column",
    marginTop: 5,
    width: "66%",
    gap: 5,
  },
  scrollViewContent: {
    paddingBottom: 200,
  },
  scrollView: {
    width: "100%",
  },
  pressable: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
  },
});

export default Visitas;
