import React from "react";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { formatCurrency } from "@/src/helpers/formatCurrency";
import { formatDateString } from "@/src/helpers/formatDateString";

type PedidoCardProps = {
  pedido: {
    cidade: string;
    produto: string;
    safra: string;
    valor: number;
    valorpedido: number;
    seriepedido: string;
    numpedido: number;
    datapedido: string;
    quantidadeproduto: number;
  };
};

const PedidosCard: React.FC<PedidoCardProps> = ({ pedido }) => {
  return (
    <TouchableOpacity style={styles.cardContainer}>
      <View style={styles.headerRow}>
        <Text style={styles.titleText}>{pedido.produto}</Text>
        <Text style={styles.orderNumber}>#{pedido.numpedido}</Text>
      </View>
      <View style={styles.divider} />
      <View style={styles.infoRow}>
        <View style={styles.infoBlock}>
          <Text style={styles.label}>Cidade</Text>
          <Text style={styles.value}>{pedido.cidade}</Text>
        </View>
        <View style={styles.infoBlock}>
          <Text style={styles.label}>Safra</Text>
          <Text style={styles.value}>{pedido.safra}</Text>
        </View>
      </View>
      <View style={styles.infoRow}>
        <View style={styles.infoBlock}>
          <Text style={styles.label}>Valor</Text>
          <Text style={styles.value}>{formatCurrency(pedido.valor)}</Text>
        </View>
        <View style={styles.infoBlock}>
          <Text style={styles.label}>Data do Pedido</Text>
          <Text style={styles.value}>{pedido.datapedido}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: "90%",
    backgroundColor: "#ffffff",
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 16,
    shadowColor: "rgba(0, 0, 0, 0.1)",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 8,
    elevation: 6,
    marginBottom: 16,
    borderLeftWidth: 6,
    borderColor: "#238228",
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start", // Alinha ao topo para suportar múltiplas linhas
    marginBottom: 12,
    flexWrap: "wrap", // Permite quebrar as linhas, se necessário
  },
  titleText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333333", // Permite que o título ocupe o espaço disponível
    marginRight: 10, // Espaçamento entre o título e o número do pedido
    flexWrap: "wrap", // Permite que o texto quebre linhas
  },
  orderNumber: {
    fontSize: 14,
    fontWeight: "600",
    color: "#238228",
    flexShrink: 1, // Permite que o número do pedido encolha se necessário
    flexWrap: "wrap", // Permite que o número do pedido quebre linhas
    textAlign: "right", // Alinha o número do pedido à direita
  },
  divider: {
    height: 1,
    backgroundColor: "#E0E0E0",
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  infoBlock: {
    width: "48%",
  },
  label: {
    fontSize: 12,
    color: "#666666",
    marginBottom: 4,
    textTransform: "uppercase",
    fontWeight: "600",
  },
  value: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333333",
  },
});

export default PedidosCard;
