import Header from "@/src/components/general/Header";
import CustomDropdown from "@/src/components/inputs/Dropdown";
import { BottomTabsTypes } from "@/src/navigation/BottomTabs";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import ConsultorCard from "./ConsultorCard";
import { useFazenda } from "@/src/contexts/FazendaContext";
import { getConsultores } from "./ConsultorRoutes";
import { useAuth } from "@/src/contexts/AuthContext";

interface Consultor {
  codigo: string;
  telefone: string | null;
  nr: number;
  nome: string;
  email: string | null;
}

type RouteParams = {
  params: {
    selectedFazenda?: number;
  };
};

const ConsultorScreen = () => {
  const route = useRoute<RouteProp<RouteParams, "params">>();
  const { fazendas } = useFazenda();
  const [selectedFazenda, setSelectedFazenda] = useState<number>(
    route.params?.selectedFazenda || fazendas[0].codigo
  );
  const [consultores, setConsultores] = useState<Consultor[]>([]);
  const [loading, setLoading] = useState<boolean>(true);


  const { authState } = useAuth();

  useEffect(() => {
    if (route.params?.selectedFazenda !== undefined) {
      setSelectedFazenda(route.params.selectedFazenda);
    }
  }, [route.params?.selectedFazenda]);

  useEffect(() => {
    const fetchConsultores = async () => {
      setLoading(true);

      try {
        if (selectedFazenda) {
          const codCliente = authState?.usuario?.codigo;
          const response = await getConsultores(codCliente, selectedFazenda);
          setConsultores(response);
        }
      }
      catch(error){
        console.error("Erro ao buscar os dados dos consultores:", error);
      }
      finally{
        setLoading(false)
      }
    };

    fetchConsultores();
  }, [selectedFazenda]);

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
            <Text>Carregando dados financeiros...</Text>
          </View>
        ) : (
          selectedFazenda !== 0 &&
          consultores.length > 0 && (
            <ScrollView
              contentContainerStyle={styles.scrollViewContent}
              style={{ width: "100%" }}
            >
              <Pressable style={styles.pressableContainer}>
                <View style={styles.consultoresHeader}>
                  <Text style={styles.consultoresTitle}>Consultores</Text>
                </View>
                {consultores.map((consultor, index) => (
                  <ConsultorCard key={index} {...consultor} />
                ))}
              </Pressable>
            </ScrollView>
          )
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
  loadingContainer: {
    marginTop:150,
    justifyContent: "center",
    alignItems: "center",
  },
  innerContainer: {
    marginTop: 100,
    alignItems: "center",
    width: "100%",
  },
  dropdownContainer: {
    flexDirection: "column",
    width: "66%",
    gap: 20,
  },
  scrollViewContent: {
    paddingBottom: 20,
  },
  pressableContainer: {
    width: "100%",
    paddingHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  consultoresHeader: {
    textAlign: "left",
    width: "100%",
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  consultoresTitle: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "left",
  },
});

export default ConsultorScreen;
