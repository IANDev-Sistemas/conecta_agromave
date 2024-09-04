import React, { useState } from "react";
import { View, Text, ScrollView, Pressable, StyleSheet } from "react-native";
import FinanceiroCard from "./FinanceiroCard";
import ResumoCard from "./ResumoCard";
import { Ionicons } from "@expo/vector-icons";

const Contratos = () => {
  const [content, setContent] = useState<string>("");

  const handleBackPress = () => {
    setContent("");
  };

  return (
    <View style={styles.container}>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    backgroundColor: "white",
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
    padding: 20,
  },
  backButtonContainer: {
    width: "100%",
  },
  backButton: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 20,
  },
  backButtonText: {
    marginLeft: 8,
    fontSize: 18,
    fontWeight: "bold",
  },
  resumoContainer: {
    width: "100%",
    paddingHorizontal: 20,
    gap: 16,
  },
  resumoTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default Contratos;
