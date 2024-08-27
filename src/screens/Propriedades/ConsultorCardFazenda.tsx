import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { User, Whatsapp } from "iconsax-react-native";
import { Divider } from "@rneui/themed";

interface ConsultorProps {
  tipo: string;
  nome: string;
}

const Consultor: React.FC<ConsultorProps> = ({ tipo, nome }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.tipo}>{tipo}</Text>
      <View style={styles.row}>
        <View style={styles.consultorInfo}>
          <Text style={styles.nome}>{nome}</Text>
        </View>
        <Divider orientation="vertical" width={2} style={styles.divider} />
        <TouchableOpacity style={styles.iconButton}>
          <User size={22} color="black" />
          <Text style={styles.buttonText}>Dados</Text>
        </TouchableOpacity>
        <Divider orientation="vertical" width={2} style={styles.divider} />
        <TouchableOpacity style={styles.iconButton}>
          <Whatsapp size={22} color="black" />
          <Text style={styles.buttonText}>Contato</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    marginTop: 20,
    width: "83%",
    borderRadius: 15,
    backgroundColor: "#fff",
    paddingVertical: 16,
    paddingHorizontal: 12,
    gap: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
  },
  tipo: {
    fontSize: 14,
    fontWeight: "500",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  consultorInfo: {
    width: "40%",
    gap: 8,
  },
  nome: {
    fontSize: 16,
    fontWeight: "bold",
  },
  divider: {
    height: "80%",
    backgroundColor: "#000",
  },
  iconButton: {
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
    paddingHorizontal: 20,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "500",
  },
});

export default Consultor;
