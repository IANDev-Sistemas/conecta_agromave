import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Location } from "iconsax-react-native";

interface Fazenda {
  codigo: number;
  nome: string;
  cidade: string;
  uf: string;
  area: number;
}

interface FazendaProps {
  fazenda: Fazenda;
}

const FazendaCard: React.FC<FazendaProps> = ({ fazenda }) => {
  return (
    <View style={styles.cardContainer}>
      <Text style={styles.fazendaName}>{fazenda.nome}</Text>
      <View style={styles.locationRow}>
        <Location size={18} color="black" />
        <Text style={styles.locationText}>{`${fazenda.cidade} - ${fazenda.uf}`}</Text>
      </View>
      <View style={styles.areaRow}>
        <Text style={styles.areaText}>{`Área: ${fazenda.area} ha`}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginTop: 20,
    width: 270,
    borderRadius: 15,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 20,
    gap: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
  },
  fazendaName: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    gap: 8,
  },
  locationText: {
    fontSize: 16,
    fontWeight: "500",
  },
  areaRow: {
    marginLeft: 40,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  areaText: {
    fontSize: 16,
    fontWeight: "500",
  },
});

export default FazendaCard;
