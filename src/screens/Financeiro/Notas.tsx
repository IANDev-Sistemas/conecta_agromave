import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator, FlatList } from "react-native";
import { getNotas } from "./FinanceiroRoutes";
import { useAuth } from "@/src/contexts/AuthContext";
import NotasCard from "./NotasCard";
import AnaliticoNotasCard from "./AnaliticosNotasCard";

type NotasProps = {
  tipoFiltro: string;
  safra: string;
  dataInicial: string;
  dataFinal: string;
};

interface Nota {
  serienota: string;
  cidade: string;
  tipo: string;
  safra: string;
  produtos: Array<{
    produto: string;
    quantidadefaturado: number;
    valorfaturado: number;
  }>;
  valor: number;
  numnota: number;
  seriepedido: string;
  numpedido: number;
  datapedido: string;
}

const Notas: React.FC<NotasProps> = ({ tipoFiltro, safra, dataInicial, dataFinal }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [listaNotas, setListaNotas] = useState<Array<Nota>>([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [notaSelecionada, setNotaSelecionada] = useState<Nota | null>(null);

  const { authState } = useAuth();

  const handleCardPress = (nota: Nota) => {
    setNotaSelecionada(nota);
    setModalVisible(true);
  };

  const renderNotaCard = ({ item }: { item: Nota }) => (
    <NotasCard nota={item} onPress={() => handleCardPress(item)} />
  );

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      let response;

      try {
        const codCliente = authState?.usuario?.codigo;
        response = await getNotas(codCliente, tipoFiltro, safra, dataInicial, dataFinal);
      } catch (error) {
        console.error("Erro ao buscar as notas:", error);
      } finally {
        setListaNotas(response || []);
        setLoading(false);
      }
    };

    fetchData();
  }, [tipoFiltro, safra, dataInicial, dataFinal]);

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007E34" />
          <Text>Carregando notas...</Text>
        </View>
      ) : (
        <FlatList
          data={listaNotas}
          renderItem={renderNotaCard}
          keyExtractor={(item, index) => item.numnota.toString() + index.toString()}
          contentContainerStyle={styles.flatListContent}
        />
      )}
      {notaSelecionada && (
        <AnaliticoNotasCard
          nota={notaSelecionada}
          isVisible={modalVisible}
          onClose={() => setModalVisible(false)}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    backgroundColor: "white",
    flex: 1,
    paddingHorizontal: 16,
  },
  loadingContainer: {
    marginTop: 150,
    justifyContent: "center",
    alignItems: "center",
  },
  flatListContent: {
    paddingBottom: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Notas;
