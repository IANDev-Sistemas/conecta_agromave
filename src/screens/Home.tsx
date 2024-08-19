import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  TouchableOpacity,
} from "react-native";
import IconButton from "../components/buttons/IconButton";
import {
  Calendar,
  Calendar1,
  Calendar2,
  CardPos,
  DocumentText1,
  House,
  Profile2User,
  ProfileCircle,
  ReceiptText,
  Routing,
  ShoppingBag,
  SmsNotification,
  Wallet,
} from "iconsax-react-native";
import { Divider } from "@rneui/themed";

interface HomeCardProps {
  title: string;
  icon: React.ReactNode;
}

const HomeCard: React.FC<HomeCardProps> = ({ title, icon }) => {
  return (
    <TouchableOpacity>
      <View
        className="w-full h-36 bg-white rounded-lg"
        style={{
          shadowColor: "000",
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.3,
          shadowRadius: 2,
        }}
      >
        <View className="flex-row items-center gap-2 px-4 py-2">
          {icon}
          <Text className="text-lg font-semibold">{title}</Text>
        </View>
        <Divider width={2} color="#E7E7E7"></Divider>
      </View>
    </TouchableOpacity>
  );
};

const Home = () => {
  return (
    <View className="flex-1 h-full bg-white">
      <View className="flex-1 mt-28 items-center w-full h-full">
        <ScrollView contentContainerStyle={{paddingBottom:100}} style={{ width: "100%" }}>
          <Pressable
            style={{
              width: "100%",
              paddingHorizontal: 10,
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <View className="flex-row mt-10 w-full justify-evenly gap-4">
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
            <View className="w-full flex-col gap-10 px-4 mt-16">
              <HomeCard
                icon={<ShoppingBag color={"#023A5D"} />}
                title="Pedidos"
              />
              <HomeCard
                icon={<ShoppingBag color={"#023A5D"} />}
                title="Pedidos"
              />
            </View>
            <View className="flex-row mt-10 w-5/6 justify-evenly gap-4">
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
            <View className="flex-row mt-5 w-5/6 justify-evenly gap-4">
              
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
            <View className="flex-row mt-5 w-5/6 justify-evenly gap-4">
              
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

export default Home;
