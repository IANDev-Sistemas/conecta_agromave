import IconButton from "@/src/components/buttons/IconButton";
import Header from "@/src/components/general/Header";
import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Pressable, StyleSheet } from "react-native";
import {
  DocumentText1,
  ReceiptText,
  ShoppingBag,
  Wallet,
} from "iconsax-react-native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import FinanceiroCard from "./FinanceiroCard";
import FinanceiroGeral from "./FinanceiroGeral";
import { BottomTabsTypes } from "@/src/navigation/BottomTabs";
import Pedidos from "./Pedidos";
import Contratos from "./Contratos";
import CustomDropdown from "@/src/components/inputs/Dropdown";
import Label from "@/src/components/general/Label";
import TimePicker from "@/src/components/inputs/TimePicker";
import DatePicker from "@/src/components/inputs/DatePicker";
import ButtonGeneral from "@/src/components/buttons/ButtonGeneral";
import { formatDate } from "@/src/helpers/formDate";
import { useSafra } from "@/src/contexts/SafraContext";

type RouteParams = {
  params: {
    content?: string;
  };
};

type Safra = {
  key: number;
  name: string;
};

const Financeiro = () => {
  const { safras } = useSafra();
  const route = useRoute<RouteProp<RouteParams, "params">>();
  const [content, setContent] = useState<string>(
    route.params?.content || "financeiro"
  );
  const [dataInicial, setDataInicial] = useState<Date | null>(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1); // Primeiro dia do mês atual
  });
  const [dataFinal, setDataFinal] = useState<Date | null>(new Date());
  const [tipoFiltro, setTipoFiltro] = useState<string>("S");
  const [safra, setSafra] = useState<string>(safras[0].name);
  const [safraSelected, setSafraSelected] = useState<Safra | null>(safras[0]);

  useEffect(() => {
    if (route.params?.content) {
      setContent(route.params.content);
    }
  }, [route.params?.content]);

  const navigation = useNavigation<BottomTabsTypes>();

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Header title="Meu Financeiro">
          <View style={styles.iconButtonsContainer}>
            <IconButton
              label={"Visão Geral"}
              onClick={() =>
                navigation.navigate("Financeiro", { content: "financeiro" })
              }
              icon={
                <Wallet color={content == "financeiro" ? "#fff" : "#023A5D"} />
              }
              ativo={content == "financeiro"}
            />
            <IconButton
              label={"Pedidos"}
              onClick={() =>
                navigation.navigate("Pedidos", { content: "pedidos" })
              }
              icon={
                <ShoppingBag
                  color={content == "pedidos" ? "#fff" : "#023A5D"}
                />
              }
              ativo={content == "pedidos"}
            />
            <IconButton
              label={"Contratos"}
              onClick={() =>
                navigation.navigate("Contratos", { content: "contratos" })
              }
              icon={
                <DocumentText1
                  color={content == "contratos" ? "#fff" : "#023A5D"}
                />
              }
              ativo={content == "contratos"}
            />
            <IconButton
              label={"Notas"}
              onClick={() => navigation.navigate("Notas", { content: "notas" })}
              icon={
                <ReceiptText color={content == "notas" ? "#fff" : "#023A5D"} />
              }
              ativo={content == "notas"}
            />
          </View>
          <View style={styles.filterContainer}>
            <View style={styles.filterTypeContainer}>
              <Text style={styles.filterLabel}>Tipo de Filtro</Text>
              <ButtonGeneral
                onClick={() => setTipoFiltro(tipoFiltro == "S" ? "P" : "S")}
                label={tipoFiltro == "S" ? "Safras" : "Período"}
              />
            </View>
            <View style={styles.dropdownContainer}>
              {tipoFiltro == "S" && (
                <>
                  <Text style={styles.filterLabel}>Safras</Text>
                  <CustomDropdown
                    onChange={(key) => {
                      const selectedSafra = safras.find(
                        (safra) => safra.key === key
                      );
                      if (selectedSafra) {
                        setSafra(selectedSafra.name);
                      }
                    }}
                    value={safraSelected}
                    list={safras}
                  />
                </>
              )}
              {tipoFiltro == "P" && (
                <>
                  <Label size="md" weight="semibold">
                    Período
                  </Label>
                  <View style={styles.datePickersContainer}>
                    <DatePicker
                      label="Selecionar Data"
                      value={dataInicial}
                      onChange={setDataInicial}
                    />
                    <Text style={styles.toLabel}>á</Text>
                    <DatePicker
                      label="Selecionar Data"
                      value={dataFinal}
                      onChange={setDataFinal}
                    />
                  </View>
                </>
              )}
            </View>
          </View>
        </Header>
        <View style={styles.contentContainer}>
          {content == "financeiro" && (
            <FinanceiroGeral
              tipoFiltro={tipoFiltro}
              safra={safra}
              dataInicial={formatDate(dataInicial)}
              dataFinal={formatDate(dataFinal)}
            />
          )}
          {content == "pedidos" && (
            <Pedidos
              tipoFiltro={tipoFiltro}
              safra={safra}
              dataInicial={formatDate(dataInicial)}
              dataFinal={formatDate(dataFinal)}
            />
          )}
        </View>
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
  iconButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    gap: 16,
    width: "100%",
  },
  filterContainer: {
    flexDirection: "row",
    gap: 16,
    marginTop: 10,
    width: "100%",
  },
  filterTypeContainer: {
    justifyContent: "center",
    width: "33%",
  },
  dropdownContainer: {
    flexDirection: "column",
    width: "50%",
    gap: 8,
  },
  filterLabel: {
    fontSize: 16,
    fontWeight: "600",
  },
  datePickersContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 8,
  },
  toLabel: {
    fontSize: 16,
    fontWeight: "600",
  },
  contentContainer: {
    flex: 1,
    width: "100%",
  },
});

export default Financeiro;
