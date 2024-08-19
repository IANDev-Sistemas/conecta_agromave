import IconButton from "@/src/components/buttons/IconButton";
import Header from "@/src/components/general/Header";
import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import {
  DocumentText1,
  ReceiptText,
  ShoppingBag,
  Wallet,
} from "iconsax-react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import FinanceiroCard from "./FinanceiroCard";

type RouteParams = {
  params: {
    content?: string;
  };
};

const Financeiro = () => {
  const route = useRoute<RouteProp<RouteParams, "params">>();
  const [content, setContent] = useState<string>(
    route.params?.content || "financeiro"
  );

  useEffect(() => {
    if (route.params?.content) {
      setContent(route.params.content);
    }
  }, [route.params?.content]);

  return (
    <View className="flex-1 h-full bg-white">
      <View className="flex-1 mt-28 items-center w-full h-full">
        <Header title="Meu Financeiro">
          <View className="flex-row w-full justify-evenly gap-4">
            <IconButton
              label={"Visão Geral"}
              onClick={() => setContent("financeiro")}
              icon={
                <Wallet color={content == "financeiro" ? "#fff" : "#023A5D"} />
              }
              ativo={content == "financeiro" ? true : false}
            />
            <IconButton
              label={"Pedidos"}
              onClick={() => setContent("pedidos")}
              icon={
                <ShoppingBag
                  color={content == "pedidos" ? "#fff" : "#023A5D"}
                />
              }
              ativo={content == "pedidos" ? true : false}
            />
            <IconButton
              label={"Contratos"}
              onClick={() => setContent("contratos")}
              icon={
                <DocumentText1
                  color={content == "contratos" ? "#fff" : "#023A5D"}
                />
              }
              ativo={content == "contratos" ? true : false}
            />
            <IconButton
              label={"Notas"}
              onClick={() => setContent("notas")}
              icon={
                <ReceiptText color={content == "notas" ? "#fff" : "#023A5D"} />
              }
              ativo={content == "notas" ? true : false}
            />
          </View>
        </Header>
        <ScrollView contentContainerStyle={{}} style={{ width: "100%" }}>
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
            <View className="w-full gap-5 p-5">
              <FinanceiroCard value="R$10.000,00" title="Total a Pagar" />
              <FinanceiroCard value="R$ 5.500,00" title="Total Vencido" />
              <FinanceiroCard value="R$ 5.000,00" title="Total à Vencer" />
            </View>
          </Pressable>
        </ScrollView>
      </View>
    </View>
  );
};

export default Financeiro;
