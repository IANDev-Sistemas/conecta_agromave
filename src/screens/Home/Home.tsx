import React, { useState, useCallback } from "react";
import { 
  View, 
  ScrollView, 
  Pressable, 
  StyleSheet, 
  Dimensions, 
  Linking, 
  Text, 
  ImageBackground 
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import WeatherCard from "./WeatherCard";
import CotacaoCard from "./CotacaoCard";
import { WebView } from "react-native-webview";

const previsao = {
  temperatura: 24,
  chuva: 0,
  chuvaPer: 0,
  vento: 11,
  ventoDir: "SE",
};

async function getCotacao(codigo) {
  const url = `https://api.bcb.gov.br/dados/serie/bcdata.sgs.${codigo}/dados/ultimos/2?formato=json`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Erro ao buscar a cotação: ${response.statusText}`);
    }
    const data = await response.json();
    const valorAtual = parseFloat(data[0].valor);
    const valorAnterior = parseFloat(data[1].valor);
    const variacao = ((valorAtual - valorAnterior) / valorAnterior) * 100;
    return { valor: valorAtual, variacao };
  } catch (error) {
    console.error("Erro:", error);
    return null;
  }
}

const Home = () => {
  const [cotacoes, setCotacoes] = useState([
    { nome: "Dolar", valor: 0, percentual: 0 },
    { nome: "Euro", valor: 0, percentual: 0 },
  ]);

  useFocusEffect(
    useCallback(() => {
      const fetchCotacoes = async () => {
        const dolar = await getCotacao(10813);
        const euro = await getCotacao(21619);

        if (dolar && euro) {
          setCotacoes([
            { nome: "Dolar", valor: dolar.valor, percentual: dolar.variacao },
            { nome: "Euro", valor: euro.valor, percentual: euro.variacao },
          ]);
        }
      };

      fetchCotacoes();
    }, [])
  );

  const handleLinkPress = (event) => {
    const { url } = event;
    if (url.startsWith("http")) {
      Linking.openURL(url);
      return false; // Impede a navegação na WebView
    }
    return true;
  };

  return (
    <ImageBackground
      source={require("../../../assets/images/background.png")}
      style={styles.background}
    >
      {/* Camada de opacidade */}
      <View style={styles.overlay} />

      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <ScrollView contentContainerStyle={styles.scrollViewContent} style={styles.scrollView}>
            <Pressable style={styles.pressableContainer}>
              <View style={styles.column}>
                <WeatherCard previsao={previsao} cidade="Cidade" uf="UF" />
                <CotacaoCard cotacoes={cotacoes} />
                <View style={styles.webViewContainer}>
                  <Text style={styles.cardTitle}>Notícias</Text>
                  <WebView
                    originWhitelist={["*"]}
                    source={{
                      html: `
                        <html>
                          <head>
                            <meta name="viewport" content="width=device-width, initial-scale=1.0">
                          </head>
                          <body style="margin:0;padding: 0 4px 0 4px; gap:100px; display:flex">
                            <script type="text/javascript" src="https://www.noticiasagricolas.com.br/widget/noticias.js.php?subsecao=2,80,4,40,13,97,15,148,154,32,101,108,111,114,116,117,120&largura=350px&altura=850px&fonte=Arial%2C%20Helvetica%2C%20sans-serif&tamanho=11pt&cortexto=333333&corlink=006666&qtd=15&output=js"></script>
                          </body>
                        </html>
                      `,
                    }}
                    style={{ width: 340, height: 800, padding:10 }}
                    onShouldStartLoadWithRequest={handleLinkPress}
                  />
                </View>
              </View>
            </Pressable>
          </ScrollView>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover", // Garante que a imagem cubra a tela
  },
  overlay: {
    ...StyleSheet.absoluteFillObject, // Preenche toda a tela
    backgroundColor: "rgba(255, 255, 255, 0.6)",// Fundo preto com opacidade de 40%
  },
  container: {
    flex: 1,
    backgroundColor: "transparent",
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
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
  },
  pressableContainer: {
    width: "100%",
    paddingHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  column: {
    flexDirection: "column",
    gap: 20,
    width: "100%",
    paddingHorizontal: 16,
    marginTop: 16,
  },
  webViewContainer: {
    marginTop: 20,
    width: Dimensions.get("window").width - 32,
    height: 800,
    overflow: "hidden",
  },
});

export default Home;
