import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Linking, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { User, Whatsapp } from "iconsax-react-native";
import { Divider } from "@rneui/themed";
import { BottomTabsTypes } from "@/src/navigation/BottomTabs"; // Assumindo que essa seja a tipagem de suas rotas

interface ConsultorProps {
  codigo: string;
  telefone: string | null;
  nr: number;
  nome: string;
  email: string | null;
  selectedFazenda: number; 
}

const Consultor: React.FC<ConsultorProps> = ({ nome, telefone, email, nr, selectedFazenda }) => {
  const navigation = useNavigation<BottomTabsTypes>(); // Use a tipagem correta para navegação

  const handleContact = () => {
    if (telefone) {
      const whatsappUrl = `https://wa.me/${telefone}`;
      Linking.openURL(whatsappUrl).catch(() =>
        Alert.alert("Erro", "Não foi possível abrir o WhatsApp.")
      );
    } else {
      Alert.alert("Contato Indisponível", "O telefone do consultor não está disponível.");
    }
  };

  const handleShowDetails = () => {
    navigation.navigate("Consultor", {
      selectedFazenda: selectedFazenda, // Passa o código da fazenda como parâmetro
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.tipo}>Consultor</Text>
      <View style={styles.row}>
        <View style={styles.consultorInfo}>
          <Text style={styles.nome}>{nome}</Text>
        </View>
        <Divider orientation="vertical" width={2} style={styles.divider} />
        <TouchableOpacity style={styles.iconButton} onPress={handleShowDetails}>
          <User size={22} color="black" />
          <Text style={styles.buttonText}>Dados</Text>
        </TouchableOpacity>
        <Divider orientation="vertical" width={2} style={styles.divider} />
        <TouchableOpacity style={styles.iconButton} onPress={handleContact}>
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
    elevation:10
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
