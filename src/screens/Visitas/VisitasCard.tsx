import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { AttachSquare } from "iconsax-react-native";

interface VisitasProps {
  consultor: string;
  data: string;
  tipo: string;
  link: string;
}

const VisitasCard: React.FC<VisitasProps> = ({ consultor, data, tipo }) => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.textContainer}>
        <View style={styles.columnContainer}>
          <Text style={styles.text}>Consultor: {consultor}</Text>
          <Text style={styles.text}>Tipo da vistoria: {tipo}</Text>
          <Text style={styles.text}>Data: {data}</Text>
        </View>
      </View>
      <View style={styles.iconContainer}>
        <TouchableOpacity>
          <AttachSquare size={35} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: "row",
    marginTop: 20,
    width: "91.66%", // equivalente a 11/12
    borderRadius: 15,
    borderColor: "#E0E0E0", // substituto para a cor "border-background"
    borderWidth: 1,
    backgroundColor: "white",
    alignItems: "center",
    paddingBottom: 20,
    paddingTop: 10,
    paddingHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
  },
  textContainer: {
    flexDirection: "row",
    width: "80%",
  },
  columnContainer: {
    flexDirection: "column",
  },
  text: {
    fontSize: 16,
    fontWeight: "500",
    flexWrap: "wrap",
  },
  iconContainer: {
    marginLeft: 10,
  },
});

export default VisitasCard;
