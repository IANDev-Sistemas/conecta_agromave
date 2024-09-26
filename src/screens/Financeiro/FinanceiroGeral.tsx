import React, { useEffect, useState } from "react";
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
import ResumoCard from "./ResumoCard";
import { getFinanceiro } from "./FinanceiroRoutes";
import { useAuth } from "@/src/contexts/AuthContext";
import { formatCurrency } from "@/src/helpers/formatCurrency";
import { useSafra } from "@/src/contexts/SafraContext";

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

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
  const [loading, setLoading] = useState<boolean>(true);
  const [totalContasVencer, setTotalContasVencer] = useState<number>(0);
  const [totalContasPago, setTotalContasPago] = useState<number>(0);
  const [totalContasVencido, setTotalContasVencido] = useState<number>(0);
  const [listContasVencer, setListContasVencer] = useState<Array<Conta>>([]);
  const [listContasPago, setListContasPago] = useState<Array<Conta>>([]);
  const [listContasVencido, setListContasVencido] = useState<Array<Conta>>([]);

  const { authState } = useAuth();


  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
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

        setLoading(false);
      }
    };

    fetchData();
  }, [tipoFiltro, safra, dataInicial, dataFinal]);



  const handleCardPress = (contentType: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setContent(contentType);
  };

  const handleBackPress = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setContent("");
  };

  const renderResumoCard = ({ item }: { item: Conta }) => (
    <View style={{marginVertical:5, justifyContent:'center', alignItems:'center'}}>
      <ResumoCard conta={item} />
    </View>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007E34" />
          <Text>Carregando dados financeiros...</Text>
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
                  onPress={() => handleCardPress("aPagar")}
                  value={formatCurrency(totalContasVencer)}
                  title="Total à Vencer"
                />
                <FinanceiroCard
                  onPress={() => handleCardPress("pago")}
                  value={formatCurrency(totalContasPago)}
                  title="Total Pago"
                />
                <FinanceiroCard
                  onPress={() => handleCardPress("vencido")}
                  value={formatCurrency(totalContasVencido)}
                  title="Total Vencido"
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
                    <>
                      <FinanceiroCard
                        value={formatCurrency(totalContasVencer)}
                        title="Total à Vencer"
                        onPress={() => {}}
                      />
                      <FlatList
                        data={listContasVencer}
                        renderItem={renderResumoCard}
                        keyExtractor={(item, index) => item.chave + index.toString()}
                        scrollEnabled={false}
                      />
                    </>
                  )}
                  {content === "pago" && (
                    <>
                      <FinanceiroCard
                        value={formatCurrency(totalContasPago)}
                        title="Total Pago"
                        onPress={() => {}}
                      />
                      <FlatList
                        data={listContasPago}
                        renderItem={renderResumoCard}
                        keyExtractor={(item, index) => item.chave + index.toString()}
                        scrollEnabled={false}
                      />
                    </>
                  )}
                  {content === "vencido" && (
                    <>
                      <FinanceiroCard
                        value={formatCurrency(totalContasVencido)}
                        title="Total Vencido"
                        onPress={() => {}}
                      />
                      <FlatList
                        data={listContasVencido}
                        renderItem={renderResumoCard}
                        keyExtractor={(item, index) => item.chave + index.toString()}
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flex: 1,
    backgroundColor: "white",
  },
  loadingContainer: {
    marginTop:150,
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
