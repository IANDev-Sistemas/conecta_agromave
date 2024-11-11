import React, { useState, useEffect } from "react";
import { View, ScrollView, Pressable, StyleSheet, Text, ActivityIndicator } from "react-native";
import Header from "@/src/components/general/Header";
import CustomDropdown from "@/src/components/inputs/Dropdown";
import VisitasCard from "./VisitasCard";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { useFazenda } from "@/src/contexts/FazendaContext"; 
import { getVisitas } from "./VisitasRoute";
import { useAuth } from "@/src/contexts/AuthContext";
import Background from "@/src/components/general/Background";

interface Fazenda {
  codigo: number;
  nome: string;
  cidade: string;
  uf: string;
  area: number;
}

type RouteParams = {
  params: {
    selectedFazenda?: number;
  };
};

const Visitas = () => {
  const { fazendas } = useFazenda();
  const route = useRoute<RouteProp<RouteParams, "params">>();
  const navigation = useNavigation();

  // Atualize para armazenar o nome e o código da fazenda selecionada
  const [selectedFazenda, setSelectedFazenda] = useState<number | null>(null);
  const [selectedFazendaNome, setSelectedFazendaNome] = useState<string>("");

  const [visitasData, setVisitasData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (route.params?.selectedFazenda !== undefined) {
      const fazenda = fazendas.find(f => f.codigo === route.params.selectedFazenda);
      if (fazenda) {
        setSelectedFazenda(fazenda.codigo);
        setSelectedFazendaNome(fazenda.nome);
      }
    }
  }, [route.params?.selectedFazenda, fazendas]);

  const { authState } = useAuth();

  useEffect(() => {
    const fetchVisitas = async () => {
      if (selectedFazenda) {
        setLoading(true);
        try {
          const codCliente = authState?.usuario?.codigo;
          const response = await getVisitas(codCliente, selectedFazendaNome);
          setVisitasData(response);
        } catch (error) {
          console.error("Erro ao buscar as visitas:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchVisitas();
  }, [selectedFazenda]);

  return (
    <Background>
      <View style={styles.headerContainer}>
        <Header title="Visitas">
          <View style={styles.dropdownContainer}>
            <CustomDropdown
              label="Propriedades"
              onChange={(value) => {
                const fazenda = fazendas.find(f => f.codigo === Number(value));
                if (fazenda) {
                  setSelectedFazenda(fazenda.codigo);
                  setSelectedFazendaNome(fazenda.nome);
                }
              }}
              value={selectedFazenda}
              list={fazendas.map((fazenda) => ({
                key: fazenda.codigo,
                name: fazenda.nome,
              }))}
              placeholder="Selecione a propriedade"
            />
          </View>
        </Header>

        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#007E34" />
            <Text>Carregando visitas...</Text>
          </View>
        ) : (
          <ScrollView contentContainerStyle={styles.scrollViewContent} style={styles.scrollView}>
            <Pressable style={styles.pressable}>
              {visitasData.length > 0 ? (
                visitasData.map((visita, index) => (
                  <VisitasCard key={index} {...visita} />
                ))
              ) : (
                <View style={styles.loadingContainer}>
                  <Text>Nenhuma visita encontrada para esta fazenda.</Text>
                </View>
              )}
            </Pressable>
          </ScrollView>
        )}
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "white",
  },
  headerContainer: {
    marginTop: 90,
    height: "100%",
    alignItems: "center",
    width: "100%",
  },
  loadingContainer: {
    marginTop: 150,
    justifyContent: "center",
    alignItems: "center",
  },
  dropdownContainer: {
    flexDirection: "column",
    marginTop: 20,
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
