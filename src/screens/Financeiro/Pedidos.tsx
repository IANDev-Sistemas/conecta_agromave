import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
  ActivityIndicator,
  LayoutAnimation,
  UIManager,
  Platform,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import FinanceiroCard from "./FinanceiroCard";
import PedidosCard from "./PedidosCard";
import AnaliticoCard from "./AnaliticoCard";
import { getPedidos } from "./FinanceiroRoutes";
import { useAuth } from "@/src/contexts/AuthContext";
import { formatCurrency } from "@/src/helpers/formatCurrency";

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

type PedidosProps = {
  tipoFiltro: string;
  grupoFiltro: string;
  safra: string;
  dataInicial: string;
  dataFinal: string;
};

interface Pedido {
  cidade: string;
  safra: string;
  produtos: Array<{
    produto: string;
    quantidadeproduto: number;
    quantidadefaturado: number;
    valor: number;
  }>;
  valor: number;
  condicaopgto:number;
  valorfaturar:number;
  seriepedido: string;
  numpedido: number;
  datapedido: string;
}

const Pedidos: React.FC<PedidosProps> = ({
  tipoFiltro,
  grupoFiltro,
  safra,
  dataInicial,
  dataFinal,
}) => {
  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [totalPedidos, setTotalPedidos] = useState<number>(0);
  const [totalFaturar, setTotalFaturar] = useState<number>(0);
  const [listaPedidos, setListaPedidos] = useState<Array<Pedido>>([]);
  const [listaFaturar, setListaFaturar] = useState<Array<Pedido>>([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [pedidoSelecionado, setPedidoSelecionado] = useState<Pedido | null>(null);

  const { authState } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      let response;

      try {
        const codCliente = authState?.usuario?.codigo;
        response = await getPedidos(
          codCliente,
          tipoFiltro,
          grupoFiltro,
          safra,
          dataInicial,
          dataFinal
        );
      } catch (error) {
        console.error("Erro ao buscar os pedidos:", error);
      } finally {
        setTotalPedidos(response?.pedidos.total || 0);
        setTotalFaturar(response?.faturar.total || 0);
        setListaPedidos(response?.pedidos.list || []);
        setListaFaturar(response?.faturar.list || []);
        setLoading(false);
      }
    };

    fetchData();
  }, [tipoFiltro,grupoFiltro, safra, dataInicial, dataFinal]);

  const handleCardPress = (contentType: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setContent(contentType);
  };

  const handleBackPress = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setContent("");
  };

  const handlePedidoSelecionado = (pedido: Pedido) => {
    setPedidoSelecionado(pedido);
    setModalVisible(true);  // Abre o modal
  };

  const renderPedidoCard = ({ item }: { item: Pedido }) => (
    <View style={{ marginVertical: 5, justifyContent: 'center', alignItems: 'center' }}>
      <PedidosCard pedido={item} onPress={() => handlePedidoSelecionado(item)} />
    </View>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007E34" />
          <Text>Carregando pedidos...</Text>
        </View>
      ) : (
        <ScrollView
          contentContainerStyle={styles.scrollViewContent}
          style={styles.scrollView}
        >
          <Pressable style={styles.pressableContainer}>
            {content === "" ? (
              <View style={styles.financeiroCardsContainer}>
                <FinanceiroCard
                  onPress={() => handleCardPress("totalPedidos")}
                  value={formatCurrency(totalPedidos)}
                  title="Total de Pedidos"
                />
                <FinanceiroCard
                  onPress={() => handleCardPress("aFaturar")}
                  value={formatCurrency(totalFaturar)}
                  title="Total à Faturar"
                />
              </View>
            ) : (
              <>
                <View style={styles.backButtonContainer}>
                  <Pressable onPress={handleBackPress} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="black" />
                    <Text style={styles.backButtonText}>Voltar</Text>
                  </Pressable>
                </View>

                <View style={styles.financeiroCardsContainer}>
                  {content === "totalPedidos" && (
                    <>
                      <FinanceiroCard
                        value={formatCurrency(totalPedidos)}
                        title="Total de Pedidos"
                        onPress={() => {}}
                      />
                      <FlatList
                        data={listaPedidos}
                        renderItem={renderPedidoCard}
                        keyExtractor={(item) => item.numpedido.toString()}
                        scrollEnabled={false}
                      />
                    </>
                  )}
                  {content === "aFaturar" && (
                    <>
                      <FinanceiroCard
                        value={formatCurrency(totalFaturar)}
                        title="Total à Faturar"
                        onPress={() => {}}
                      />
                      <FlatList
                        data={listaFaturar}
                        renderItem={renderPedidoCard}
                        keyExtractor={(item) => item.numpedido.toString()}
                        scrollEnabled={false}
                      />
                    </>
                  )}
                </View>
              </>
            )}
          </Pressable>
        </ScrollView>
      )}
      {pedidoSelecionado && (
        <AnaliticoCard
          pedido={pedidoSelecionado}
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

    flex: 1,
    paddingHorizontal: 16,
  },
  loadingContainer: {
    marginTop: 150,
    justifyContent: "center",
    alignItems: "center",
  },
  scrollViewContent: {
    paddingBottom: 100,
  },
  scrollView: {
    width: "100%",
  },
  pressableContainer: {
    width: "100%",
    paddingHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  financeiroCardsContainer: {
    width: "100%",
    gap: 20,
    padding: 0,
  },
  backButtonContainer: {
    width: "100%",
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  backButtonText: {
    marginLeft: 8,
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Pedidos;
