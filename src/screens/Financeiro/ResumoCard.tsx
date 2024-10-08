import React from "react";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { Wallet2 } from "iconsax-react-native";
import { formatCurrency } from "@/src/helpers/formatCurrency";
import { formatDateString } from "@/src/helpers/formatDateString";

type ResumoCardProps = {
  conta: {
    filial: string;
    dataemissao: string;
    condicao: string;
    chave: string;
    valorparcela: number;
    documento: string;
    datavencimento: string;
    vencidos: string;
    da: number;
    valoraberto: number;
    status: string;
    valorpago: number;
  };
};

const ResumoCard: React.FC<ResumoCardProps> = ({ conta }) => {
  return (
    <TouchableOpacity style={styles.cardContainer}>
      <View style={styles.headerRow}>
        <Wallet2 size={24} color="#238228" />
        <Text style={styles.titleText}>Pagamento</Text>
        <Text style={styles.orderNumber}>Nota: {conta.documento}</Text>
      </View>
      <View style={styles.divider} />
      <View style={styles.infoRow}>
        <View style={styles.infoBlock}>
          <Text style={styles.label}>Filial</Text>
          <Text style={styles.value}>{conta.filial}</Text>
        </View>
        <View style={styles.infoBlock}>
          <Text style={styles.label}>Data</Text>
          <Text style={styles.value}>{formatDateString(conta.dataemissao)}</Text>
        </View>
      </View>
      <View style={styles.infoRow}>
        <View style={styles.infoBlock}>
          <Text style={styles.label}>Vencimento</Text>
          <Text style={styles.value}>{formatDateString(conta.datavencimento)}</Text>
        </View>
        <View style={styles.infoBlock}>
          <Text style={styles.label}>Valor</Text>
          <Text style={styles.value}>{formatCurrency(conta.valorparcela)}</Text>
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
    alignItems: "center",
    marginBottom: 12,
    flexWrap: "wrap",
  },
  titleText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333333",
    flex: 1,
    marginLeft: 8, // Espaçamento entre o ícone e o texto
    flexWrap: "wrap",
  },
  orderNumber: {
    fontSize: 14,
    fontWeight: "600",
    color: "#238228",
    flexShrink: 1,
    flexWrap: "wrap",
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

export default ResumoCard;
