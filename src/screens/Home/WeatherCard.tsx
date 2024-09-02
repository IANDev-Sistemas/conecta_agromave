import { Divider } from "@rneui/themed";
import { Drop, Wind } from "iconsax-react-native";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface WeatherCardProps {
  cidade: string;
  uf: string;
  previsao: {
    temperatura: number;
    chuva: number;
    chuvaPer: number;
    vento: number;
    ventoDir: string;
  };
}

const WeatherCard: React.FC<WeatherCardProps> = ({ cidade, uf, previsao }) => {
  return (
    <TouchableOpacity>
      <View style={styles.homeCard}>
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>
            {cidade} - {uf}
          </Text>
          <Text >
            Clima Tempo
          </Text>
        </View>
        <View style={{display:"flex", flexDirection:"row", gap:20}}>

          <View style={styles.col}>
        <Text style={styles.temperatura}>{previsao.temperatura} °</Text>
            <View style={styles.row}>
              <Drop color={"black"} />
              <Text style={styles.cardTitle}>
                {previsao.chuva} mm - {previsao.chuvaPer}%
              </Text>
            </View>
            <View style={styles.row}>
              <Wind color={"black"} />
              <Text style={styles.cardTitle}>
                {previsao.ventoDir}- {previsao.vento}Km/h
              </Text>
            </View>
          </View>
          <View style={styles.colImage}>
            <Image source={require("../../../assets/images/rain-icon.png")}/>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default WeatherCard;

const styles = StyleSheet.create({
  homeCard: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 10,
    paddingBottom: 20,
  },

  cardContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    padding: 16,
    justifyContent:"space-between"
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  temperatura: {
    fontSize: 40,
    fontWeight: "500",
    marginLeft: 50,
    color: "#023A5D",
    marginBottom: 20,
  },
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 15,
    marginLeft: 16,
  },
  col: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    color: "#023A5D",
    gap: 10,
  },
  colImage: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    color: "#023A5D",
  },
});
