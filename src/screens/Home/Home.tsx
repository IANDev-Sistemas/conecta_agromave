import React, { useState, useCallback } from "react";
import {
  View,
  ScrollView,
  Pressable,
  StyleSheet,
} from "react-native";
import { useFocusEffect } from '@react-navigation/native';
import IconButton from "../../components/buttons/IconButton";
import {
  Calendar,
  Calendar1,
  CardPos,
  DocumentText1,
  House,
  Profile2User,
  ProfileCircle,
  ReceiptText,
  Routing,
  ShoppingBag,
  SmsNotification,
} from "iconsax-react-native";
import HomeCard from "./HomeCard";
import WeatherCard from "./WeatherCard";
import CotacaoCard from "./CotacaoCard";

const previsao = {
  temperatura: 24,
  chuva: 0,
  chuvaPer: 0,
  vento: 11,
  ventoDir: 'SE'
}

async function getCotacao(codigo: number): Promise<{ valor: number, variacao: number } | null> {
  const url = `https://api.bcb.gov.br/dados/serie/bcdata.sgs.${codigo}/dados/ultimos/2?formato=json`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Erro ao buscar a cotação: ${response.statusText}`);
    }
    const data: { valor: string }[] = await response.json();
    const valorAtual = parseFloat(data[0].valor);
    const valorAnterior = parseFloat(data[1].valor);
    const variacao = ((valorAtual - valorAnterior) / valorAnterior) * 100;
    return { valor: valorAtual, variacao };
  } catch (error) {
    console.error('Erro:', error);
    return null;
  }
}

const Home = () => {
  const [cotacoes, setCotacoes] = useState([
    { nome: 'Dolar', valor: 0, percentual: 0 },
    { nome: 'Euro', valor: 0, percentual: 0 },
  ]);

  useFocusEffect(
    useCallback(() => {
      const fetchCotacoes = async () => {
        const dolar = await getCotacao(10813); // Código do dólar
        const euro = await getCotacao(21619);  // Código do euro

        if (dolar && euro) {
          setCotacoes([
            { nome: 'Dolar', valor: dolar.valor, percentual: dolar.variacao },
            { nome: 'Euro', valor: euro.valor, percentual: euro.variacao },
          ]);
        }
      };

      fetchCotacoes();
    }, [])
  );

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <ScrollView
          contentContainerStyle={styles.scrollViewContent}
          style={styles.scrollView}
        >
          <Pressable style={styles.pressableContainer}>
            <View style={styles.column}>
              <WeatherCard previsao={previsao} cidade="Cidade" uf="UF" />
              <CotacaoCard cotacoes={cotacoes} />
            </View>
            <View style={styles.row}>
              <IconButton
                label={"Pedidos"}
                onClick={() => { }}
                icon={<ShoppingBag color={"#023A5D"} />}
                ativo={false}
                badgeValue={"4"}
              />
              <IconButton
                label={"Contratos"}
                onClick={() => { }}
                icon={<DocumentText1 color={"#023A5D"} />}
                ativo={false}
              />
              <IconButton
                label={"Notas"}
                onClick={() => { }}
                icon={<ReceiptText color={"#023A5D"} />}
                ativo={false}
              />
              <IconButton
                label={"Cliente"}
                onClick={() => { }}
                icon={<ProfileCircle color={"#023A5D"} />}
                ativo={false}
              />
            </View>
            <View style={styles.row}>
              <IconButton
                label={"Propriedades"}
                onClick={() => { }}
                icon={<House color={"#023A5D"} />}
                ativo={false}
              />
              <IconButton
                label={"Visitas"}
                onClick={() => { }}
                icon={<Routing color={"#023A5D"} />}
                ativo={false}
                badgeValue={"4"}
              />
              <IconButton
                label={"Financeiro"}
                onClick={() => { }}
                icon={<CardPos color={"#023A5D"} />}
                ativo={false}
              />
              <IconButton
                label={"Agenda"}
                onClick={() => { }}
                icon={<Calendar color={"#023A5D"} />}
                ativo={false}
              />
            </View>
            <View style={styles.row}>
              <IconButton
                label={"Consultor"}
                onClick={() => { }}
                icon={<Profile2User color={"#023A5D"} />}
                ativo={false}
              />
              <IconButton
                label={"Eventos"}
                onClick={() => { }}
                icon={<Calendar1 color={"#023A5D"} />}
                ativo={false}
              />
              <IconButton
                label={"Notificações"}
                onClick={() => { }}
                icon={<SmsNotification color={"#023A5D"} />}
                ativo={false}
              />
            </View>
          </Pressable>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  innerContainer: {
    flex: 1,
    marginTop: 100,
    alignItems: "center",
    width: "100%",
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
    flexDirection: "column",
  },
  row: {
    flexDirection: "row",
    marginTop: 10,
    width: "100%",
    justifyContent: "space-evenly",
    gap: 4,
  },
  column: {
    flexDirection: "column",
    gap: 20,
    width: "100%",
    paddingHorizontal: 16,
    marginTop: 16,
  },
  homeCard: {
    width: "100%",
    height: 144,
    backgroundColor: "white",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 10,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    padding: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
});

export default Home;
