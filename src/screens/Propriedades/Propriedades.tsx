import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Pressable,
  StyleSheet,
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
      setSelectedConsultores([]);
    }

    setSelectedFazenda(fazenda);
  };

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Header title="Propriedades">
          <View style={styles.dropdownContainer}>
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
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <Pressable style={styles.pressableContainer}>
              <FazendaCard fazenda={selectedFazenda} />
              <View style={styles.consultoresContainer}>
                <Text style={styles.consultoresTitle}>Consultores</Text>
                {selectedConsultores && selectedConsultores.length > 0 ? (
                  selectedConsultores.map((consultor, index) => (
                    <Consultor key={index} {...consultor} />
                  ))
                ) : (
                  <Text style={styles.noConsultoresText}>Nenhum consultor encontrado.</Text>
                )}
              </View>
              <TouchableOpacity
                style={styles.buttonContainer}
                onPress={() =>
                  navigation.navigate("Visitas", {
                    selectedFazenda: selectedFazenda?.codigo,
                  })
                }
              >
                <View style={styles.button}>
                  <Text style={styles.buttonText}>Visualizar Visitas</Text>
                </View>
              </TouchableOpacity>
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
    backgroundColor: "white",
  },
  innerContainer: {
    marginTop: 90,
    alignItems: "center",
    width: "100%",
  },
  dropdownContainer: {
    flexDirection: "column",
    width: "66%",
    gap: 20,
  },
  scrollViewContent: {
    width: "100%",
  },
  pressableContainer: {
    width: "100%",
    paddingHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  consultoresContainer: {
    textAlign: "left",
    marginLeft: 16,
    width: "100%",
    marginTop: 16,
  },
  consultoresTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  noConsultoresText: {
    color: "#606060",
  },
  buttonContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: "#023A5D",
    width: "100%",
    alignItems: "center",
    marginTop: 16,
  },
  buttonText: {
    fontWeight: "bold",
    color: "white",
  },
});

export default Propriedades;
