import React from "react";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { formatCurrency } from "@/src/helpers/formatCurrency";
import { formatDateString } from "@/src/helpers/formatDateString";

interface NotasCardProps {
  nota: {
    cidade: string;
    safra: string;
    valor: number;
    serienota: string;
    numnota: number;
    datapedido: string;
  };
  onPress: () => void;
}

const NotasCard: React.FC<NotasCardProps> = ({ nota, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.cardContainer}>
      <View style={styles.headerRow}>
        <Text style={styles.orderNumber}>Nota {nota.numnota}</Text>
      </View>
      <View style={styles.divider} />
      <View style={styles.infoRow}>
        <View style={styles.infoBlock}>
          <Text style={styles.label}>Cidade</Text>
          <Text style={styles.value}>{nota.cidade}</Text>
        </View>
        <View style={styles.infoBlock}>
          <Text style={styles.label}>Safra</Text>
          <Text style={styles.value}>{nota.safra}</Text>
        </View>
      </View>
      <View style={styles.infoRow}>
        <View style={styles.infoBlock}>
          <Text style={styles.label}>Valor Total</Text>
          <Text style={styles.value}>{formatCurrency(nota.valor)}</Text>
        </View>
        <View style={styles.infoBlock}>
          <Text style={styles.label}>Data do Pedido</Text>
          <Text style={styles.value}>{formatDateString(nota.datapedido)}</Text>
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
    alignItems: "flex-start",
    marginBottom: 12,
    flexWrap: "wrap",
  },
  orderNumber: {
    fontSize: 16,
    fontWeight: "600",
    color: "#238228",
    flexShrink: 1,
    textAlign: "right",
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

export default NotasCard;
