import { Divider } from "@rneui/themed";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface HomeCardProps {
    title: string;
    icon: React.ReactNode;
  }
  
  const HomeCard: React.FC<HomeCardProps> = ({ title, icon }) => {
    return (
      <TouchableOpacity>
        <View style={styles.homeCard}>
          <View style={styles.cardContent}>
            {icon}
            <Text style={styles.cardTitle}>{title}</Text>
          </View>
          <Divider width={2} color="#E7E7E7"></Divider>
        </View>
      </TouchableOpacity>
    );
  };

  export default HomeCard;
  
  const styles = StyleSheet.create({
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