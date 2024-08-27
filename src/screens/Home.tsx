import React from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import IconButton from "../components/buttons/IconButton";
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
import { Divider } from "@rneui/themed";

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

const Home = () => {
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <ScrollView
          contentContainerStyle={styles.scrollViewContent}
          style={styles.scrollView}
        >
          <Pressable style={styles.pressableContainer}>
            <View style={styles.row}>
              <IconButton
                label={"Pedidos"}
                onClick={() => {}}
                icon={<ShoppingBag color={"#023A5D"} />}
                ativo={false}
                badgeValue={"4"}
              />
              <IconButton
                label={"Contratos"}
                onClick={() => {}}
                icon={<DocumentText1 color={"#023A5D"} />}
                ativo={false}
              />
              <IconButton
                label={"Notas"}
                onClick={() => {}}
                icon={<ReceiptText color={"#023A5D"} />}
                ativo={false}
              />
            </View>
            <View style={styles.column}>
              <HomeCard icon={<ShoppingBag color={"#023A5D"} />} title="Pedidos" />
              <HomeCard icon={<ShoppingBag color={"#023A5D"} />} title="Pedidos" />
            </View>
            <View style={styles.row}>
              <IconButton
                label={"Pedidos"}
                onClick={() => {}}
                icon={<ShoppingBag color={"#023A5D"} />}
                ativo={false}
                badgeValue={"4"}
              />
              <IconButton
                label={"Contratos"}
                onClick={() => {}}
                icon={<DocumentText1 color={"#023A5D"} />}
                ativo={false}
              />
              <IconButton
                label={"Notas"}
                onClick={() => {}}
                icon={<ReceiptText color={"#023A5D"} />}
                ativo={false}
              />
              <IconButton
                label={"Cliente"}
                onClick={() => {}}
                icon={<ProfileCircle color={"#023A5D"} />}
                ativo={false}
              />
            </View>
            <View style={styles.row}>
              <IconButton
                label={"Propriedades"}
                onClick={() => {}}
                icon={<House color={"#023A5D"} />}
                ativo={false}
              />
              <IconButton
                label={"Visitas"}
                onClick={() => {}}
                icon={<Routing color={"#023A5D"} />}
                ativo={false}
                badgeValue={"4"}
              />
              <IconButton
                label={"Financeiro"}
                onClick={() => {}}
                icon={<CardPos color={"#023A5D"} />}
                ativo={false}
              />
              <IconButton
                label={"Agenda"}
                onClick={() => {}}
                icon={<Calendar color={"#023A5D"} />}
                ativo={false}
              />
            </View>
            <View style={styles.row}>
              <IconButton
                label={"Consultor"}
                onClick={() => {}}
                icon={<Profile2User color={"#023A5D"} />}
                ativo={false}
              />
              <IconButton
                label={"Eventos"}
                onClick={() => {}}
                icon={<Calendar1 color={"#023A5D"} />}
                ativo={false}
              />
              <IconButton
                label={"Notificações"}
                onClick={() => {}}
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
    gap: 10,
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
