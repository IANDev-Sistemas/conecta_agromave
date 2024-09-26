import React, { useEffect, useState } from "react";
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
import { useAuth } from "@/src/contexts/AuthContext";
import { getConsultores } from "../Consultor/ConsultorRoutes";

interface Consultor {
  codigo: string;
  telefone: string | null;
  nr: number;
  nome: string;
  email: string | null;
}

interface Fazenda {
  codigo: number;
  nome: string;
  cidade: string;
  uf: string;
  area: number;
}

const Propriedades: React.FC = () => {

  const { fazendas } = useFazenda();

  const [selectedFazenda, setSelectedFazenda] = useState<Fazenda | null>(fazendas[0]);
  const [selectedConsultores, setSelectedConsultores] = useState<Consultor[]>([]);
  const navigation = useNavigation<BottomTabsTypes>();
  const handleFazendaChange = (value: number) => {
    const fazenda = fazendas.find((f) => f.codigo === value) || null;

    setSelectedFazenda(fazenda);
  };

  const { authState } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      let response;

      try {
        const codCliente = authState?.usuario?.codigo;
        response = await getConsultores(codCliente, selectedFazenda?.codigo);
      } catch (error) {
        console.error("Erro ao buscar as notas:", error);
      } finally {
        setSelectedConsultores(response);
      }
    };

    fetchData();
  }, [selectedFazenda]);

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
                    <Consultor
                      selectedFazenda={selectedFazenda.codigo}
                      codigo={consultor.codigo}
                      telefone={consultor.telefone ? consultor.telefone : "Não informado"}
                      nr={consultor.nr}
                      nome={consultor.nome}
                      email={consultor.email ? consultor.email : "Não informado"}
                    />
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
    backgroundColor: "#007E34",
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
