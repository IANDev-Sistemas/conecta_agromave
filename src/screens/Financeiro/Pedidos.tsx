import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
} from "react-native";
import FinanceiroCard from "./FinanceiroCard";
import PedidosCard from "./PedidosCard";
import { getPedidos } from "./FinanceiroRoutes";
import { useAuth } from "@/src/contexts/AuthContext";
import { formatCurrency } from "@/src/helpers/formatCurrency";

type PedidosProps = {
  tipoFiltro: string;
  safra: string;
  dataInicial: string;
  dataFinal: string;
};

interface Pedido {
  cidade: string;
  produto: string;
  safra: string;
  valor: number;
  valorpedido: number;
  seriepedido: string;
  numpedido: number;
  datapedido: string;
  quantidadeproduto: number;
}

const Pedidos: React.FC<PedidosProps> = ({
  tipoFiltro,
  safra,
  dataInicial,
  dataFinal,
}) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [totalPedidos, setTotalPedidos] = useState<number>(0);
  const [listaPedidos, setListaPedidos] = useState<Array<Pedido>>([]);

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
          safra,
          dataInicial,
          dataFinal
        );
      } catch (error) {
        console.error("Erro ao buscar os pedidos:", error);
      } finally {
        setTotalPedidos(response.total || 0);
        setListaPedidos(response.list || []);
        setLoading(false);
      }
    };

    fetchData();
  }, [tipoFiltro, safra, dataInicial, dataFinal]);

  const renderPedidoCard = ({ item }: { item: Pedido }) => (
    <PedidosCard pedido={item} />
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text>Carregando pedidos...</Text>
        </View>
      ) : (
        <>
          <View style={styles.financeiroCardContainer}>
            <FinanceiroCard
              value={formatCurrency(totalPedidos)}
              title="Total de Pedidos"
              onPress={() => {}}
            />
          </View>
          <FlatList
            data={listaPedidos}
            renderItem={renderPedidoCard}
            keyExtractor={(item, index) => item.numpedido.toString() + index.toString()}
            contentContainerStyle={styles.flatListContent}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    backgroundColor: "white",
    flex: 1, // Ocupa toda a altura disponível
    paddingHorizontal: 16,
  },
  loadingContainer: {
    marginTop: 150,
    justifyContent: "center",
    alignItems: "center",
  },
  financeiroCardContainer: {
    marginBottom: 20, // Espaço abaixo do FinanceiroCard
  },
  flatListContent: {
    paddingBottom: 20, // Espaço na parte inferior da lista
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Pedidos;
