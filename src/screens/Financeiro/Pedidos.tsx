import React, { useState } from "react";
import { View, Text, ScrollView, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Certifique-se de ter instalado o pacote expo-vector-icons
import FinanceiroCard from "./FinanceiroCard";
import ResumoCard from "./ResumoCard";

const Pedidos = () => {
  const [content, setContent] = useState<string>("");

  const handleBackPress = () => {
    setContent(""); // Reseta o estado para mostrar todos os botões
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Pressable style={styles.pressableContainer}>
          {content === "" ? (
            <View style={styles.financeiroCardsContainer}>
              <FinanceiroCard
                onPress={() => setContent("aPagar")}
                value="R$600.000.000,00"
                title="Pedidos"
              />
              <FinanceiroCard
                onPress={() => setContent("vencido")}
                value="R$ 2.500.000,00"
                title="Pedidos à Faturar"
              />
              <FinanceiroCard
                onPress={() => setContent("aVencer")}
                value="R$ 597.500.000,00"
                title="Pedidos Faturados"
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
                {content === "aPagar" && (
                  <FinanceiroCard
                    onPress={() => setContent("aPagar")}
                    value="R$600.000.000,00"
                    title="Pedidos"
                  />
                )}
                {content === "vencido" && (
                  <FinanceiroCard
                    onPress={() => setContent("vencido")}
                    value="R$ 2.500.000,00"
                    title="Pedidos à Faturar"
                  />
                )}
                {content === "aVencer" && (
                  <FinanceiroCard
                    onPress={() => setContent("aVencer")}
                    value="R$ 597.500.000,00"
                    title="Pedidos Faturados"
                  />
                )}
              </View>

              <View style={styles.resumoContainer}>
                <Text style={styles.resumoTitle}>Resumo</Text>
                <ResumoCard />
                <ResumoCard />
                <ResumoCard />
                <ResumoCard />
              </View>
            </>
          )}
        </Pressable>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flex: 1,
    backgroundColor: "white",
  },
  scrollViewContent: {
    paddingBottom: 100,
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

export default Pedidos;
