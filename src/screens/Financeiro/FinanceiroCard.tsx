import React from "react";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";

interface HomeCardProps {
  title: string;
  value: string;
  onPress: () => void;
}

const FinanceiroCard: React.FC<HomeCardProps> = ({ title, value, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.cardContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.value}>{value}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: "100%",
    height: 96,
    backgroundColor: "white",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  value: {
    fontSize: 24,
    fontWeight: "600",
    color: "#595959",
  },
});

export default FinanceiroCard;
