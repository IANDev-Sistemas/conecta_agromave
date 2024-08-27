import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Certifique-se de ter instalado o pacote expo-vector-icons
import FinanceiroCard from "./FinanceiroCard";
import ResumoCard from "./ResumoCard";
import { getFinanceiro } from "./FinanceiroRoutes";
import { useAuth } from "@/src/contexts/AuthContext";

type FinanceiroGeralProps = {
  tipoFiltro: string;
  safra: string;
  dataInicial: string;
  dataFinal: string;
};

interface Conta {
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
}

const FinanceiroGeral: React.FC<FinanceiroGeralProps> = ({
  tipoFiltro,
  safra,
  dataInicial,
  dataFinal,
}) => {
  const [content, setContent] = useState<string>("");
  const [totalContasVencer, setTotalContasVencer] = useState<number>(0);
  const [totalContasPago, setTotalContasPago] = useState<number>(0);
  const [totalContasVencido, setTotalContasVencido] = useState<number>(0);
  const [listContasVencer, setListContasVencer] = useState<Array<Conta>>([]);
  const [listContasPago, setListContasPago] = useState<Array<Conta>>([]);
  const [listContasVencido, setListContasVencido] = useState<Array<Conta>>([]);

  const handleBackPress = () => {
    setContent("");
  };

  const { authState } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      let response;

      try {
        const codCliente = authState?.usuario?.codigo;
        response = await getFinanceiro(
          codCliente,
          tipoFiltro,
          safra,
          dataInicial,
          dataFinal
        );
      } catch (error) {
        console.error("Erro ao buscar os dados financeiros:", error);
      } finally {
        if (response?.contasVencer) {
          setTotalContasVencer(response.contasVencer.total || 0);
          setListContasVencer(response.contasVencer.list || []);
        }

        if (response?.contasPago) {
          setTotalContasPago(response.contasPago.total || 0);
          setListContasPago(response.contasPago.list || []);
        }

        if (response?.contasVencido) {
          setTotalContasVencido(response.contasVencido.total || 0);
          setListContasVencido(response.contasVencido.list || []);
        }

        console.log("Operação concluída, código no finally executado.");
      }
    };

    fetchData();
  }, [tipoFiltro, safra, dataInicial, dataFinal]);

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        style={styles.scrollView}
      >
        <Pressable style={styles.pressableContainer}>
          {content === "" ? (
            <View style={styles.financeiroCardsContainer}>
              <FinanceiroCard
                onPress={() => setContent("aPagar")}
                value={`R$${totalContasVencer}`}
                title="Total à Vencer"
              />
              <FinanceiroCard
                onPress={() => setContent("aPagar")}
                value={`R$${totalContasPago}`}
                title="Total Pago"
              />
              <FinanceiroCard
                onPress={() => setContent("aVencer")}
                value={`R$${totalContasVencido}`}
                title="Total Vencido"
              />
            </View>
          ) : (
            <>
              <View style={styles.backButtonContainer}>
                <Pressable
                  onPress={handleBackPress}
                  style={styles.backButton}
                >
                  <Ionicons name="arrow-back" size={24} color="black" />
                  <Text style={styles.backButtonText}>Voltar</Text>
                </Pressable>
              </View>

              <View style={styles.financeiroCardsContainer}>
                {content === "aPagar" && (
                  <FinanceiroCard
                    onPress={() => setContent("aPagar")}
                    value="R$10.000,00"
                    title="Total a Pagar"
                  />
                )}
                {content === "vencido" && (
                  <FinanceiroCard
                    onPress={() => setContent("vencido")}
                    value="R$ 5.500,00"
                    title="Total Vencido"
                  />
                )}
                {content === "aVencer" && (
                  <FinanceiroCard
                    onPress={() => setContent("aVencer")}
                    value="R$ 5.000,00"
                    title="Total à Vencer"
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

export default FinanceiroGeral;
