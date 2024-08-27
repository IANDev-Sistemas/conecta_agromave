import React from "react";
import { Divider } from "@rneui/themed";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { ReceiptText } from "iconsax-react-native";

const FinanceiroCard: React.FC = () => {
  return (
    <TouchableOpacity>
      <View style={styles.cardContainer}>
        <View style={styles.contentRow}>
          <View style={styles.textContainer}>
            <Text style={styles.boldText}>Filial</Text>
            <Text style={styles.semiBoldText}>Data: DD/MM/AAAA</Text>
            <Text style={styles.semiBoldText}>Data Vencimento: DD/MM/AAAA</Text>
          </View>
          <Divider orientation="vertical" width={2} />
          <View style={styles.iconContainer}>
            <ReceiptText size={24} color="black" />
            <Text style={styles.iconText}>Nota Fiscal</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: "100%",
    height: 112,
    backgroundColor: "white",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 10,
  },
  contentRow: {
    flexDirection: "row",
    height: "100%",
    gap: 16,
  },
  textContainer: {
    flexDirection: "column",
    gap: 8,
  },
  boldText: {
    fontWeight: "bold",
  },
  semiBoldText: {
    fontWeight: "600",
  },
  iconContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  iconText: {
    fontSize: 10,
    fontWeight: "bold",
  },
});

export default FinanceiroCard;
