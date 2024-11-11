import IconButton from "@/src/components/buttons/IconButton";
import Header from "@/src/components/general/Header";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { ReceiptText, ShoppingBag, Wallet } from "iconsax-react-native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import FinanceiroGeral from "./FinanceiroGeral";
import { BottomTabsTypes } from "@/src/navigation/BottomTabs";
import Pedidos from "./Pedidos";
import CustomDropdown from "@/src/components/inputs/Dropdown";
import Label from "@/src/components/general/Label";
import DatePicker from "@/src/components/inputs/DatePicker";
import ButtonGeneral from "@/src/components/buttons/ButtonGeneral";
import { formatDate } from "@/src/helpers/formDate";
import { useSafra } from "@/src/contexts/SafraContext";
import Notas from "./Notas";
import { useGrupo } from "@/src/contexts/GrupoContext";
import { useProduto } from "@/src/contexts/ProdutoContext";
import Background from "@/src/components/general/Background";

type RouteParams = {
  params: {
    content?: string;
  };
};

type Safra = {
  key: number;
  name: string;
};
type Grupo = {
  key: number;
  name: string;
};
type Produto = {
  key: number;
  name: string;
};

const Financeiro = () => {
  const { safras } = useSafra();
  const { grupos } = useGrupo();
  const { produtos } = useProduto();
  const route = useRoute<RouteProp<RouteParams, "params">>();

  const [content, setContent] = useState<string>(route.params?.content || "financeiro");
  const [dataInicial, setDataInicial] = useState<Date | null>(
    () => new Date(new Date().getFullYear(), new Date().getMonth(), 1)
  );
  const [dataFinal, setDataFinal] = useState<Date | null>(new Date());
  const [tipoFiltro, setTipoFiltro] = useState<string>("S");
  const [tipoFiltroProduto, setTipoFiltroProduto] = useState<string>("G");

  // Verifica se os contextos estão carregados antes de acessar os valores
  const initialSafra = safras && safras.length > 0 ? safras[0].name : '';
  const initialGrupo = grupos && grupos.length > 0 ? grupos[0].name : '';

  const [safra, setSafra] = useState<string>(initialSafra);
  const [grupo, setGrupo] = useState<string>(initialGrupo);
  const [produto, setProduto] = useState<string>();

  const [safraSelected, setSafraSelected] = useState<Safra | null>(safras ? safras[0] : null);
  const [grupoSelected, setGruposSelected] = useState<Grupo | null>(grupos ? grupos[0] : null);
  const [produtoSelected, setProdutoSelected] = useState<Produto | null>();

  const navigation = useNavigation<BottomTabsTypes>();

  useEffect(() => {
    if (route.params?.content) {
      setContent(route.params.content);
    }
  }, [route.params?.content]);

  // Renderiza um componente de carregamento se os dados ainda não estão disponíveis
  if (!safras || !grupos || !produtos) {
    return <Text>Carregando...</Text>;
  }

  return (
    <Background>
      <View style={styles.innerContainer}>
        <Header title="Meu Financeiro">
          <View style={styles.iconButtonsContainer}>
            <IconButton
              label={"Visão Geral"}
              onClick={() =>
                navigation.navigate("Financeiro", { content: "financeiro" })
              }
              icon={
                <Wallet color={content == "financeiro" ? "#fff" : "#007E34"} />
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
                  color={content == "pedidos" ? "#fff" : "#007E34"}
                />
              }
              ativo={content == "pedidos"}
            />
            <IconButton
              label={"Notas"}
              onClick={() => navigation.navigate("Notas", { content: "notas" })}
              icon={
                <ReceiptText color={content == "notas" ? "#fff" : "#007E34"} />
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
              {content == "pedidos" && (
                <View style={{ marginTop: 15 }}>
                  <ButtonGeneral
                    onClick={() =>
                      setTipoFiltroProduto(tipoFiltroProduto == "G" ? "P" : "G")
                    }
                    label={tipoFiltroProduto == "G" ? "Grupo" : "Produto"}
                  />
                </View>
              )}
            </View>

            <View style={styles.dropdownContainer}>
              {tipoFiltro == "S" && (
                <>
                  <Text style={styles.filterLabel}>Safras</Text>
                  <CustomDropdown
                    onChange={(key) => {
                      const selectedSafra = safras.find((s) => s.key === key);
                      if (selectedSafra) setSafra(selectedSafra.name);
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
              {content == "pedidos" && (
                <>
                  {tipoFiltroProduto == "G" && (
                    <>
                      <Text style={styles.filterLabel}>Grupo de Produtos</Text>
                      <CustomDropdown
                        onChange={(key) => {
                          const selectedGrupo = grupos.find(
                            (g) => g.key === key
                          );
                          if (selectedGrupo) setGrupo(selectedGrupo.name);
                        }}
                        value={grupoSelected}
                        list={grupos}
                      />
                    </>
                  )}
                  {tipoFiltroProduto == "P" && (
                    <>
                      <Text style={styles.filterLabel}>Produto</Text>
                      <CustomDropdown
                        search={true}
                        searchField="name"
                        clearable={true}
                        onChange={(key) => {
                          const selectedProduto = produtos.find((p) => p.key === key);
                          setProduto(selectedProduto ? selectedProduto.name : '');
                          setProdutoSelected(selectedProduto);
                        }}
                        placeholder="Selecione um produto"
                        value={produtoSelected}
                        list={produtos}
                      />
                    </>
                  )}
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
              grupoFiltro={grupo}
              produto={produto || ""}
              tipoFiltroProduto={tipoFiltroProduto}
              safra={safra}
              dataInicial={formatDate(dataInicial)}
              dataFinal={formatDate(dataFinal)}
            />
          )}
          {content == "notas" && (
            <Notas
              tipoFiltro={tipoFiltro}
              safra={safra}
              dataInicial={formatDate(dataInicial)}
              dataFinal={formatDate(dataFinal)}
            />
          )}
        </View>
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  innerContainer: {
    flex: 1,
    marginTop: 90,
    alignItems: "center",
    width: "100%",
  },
  iconButtonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 40,
    width: "100%",
    marginLeft: -10,
  },
  filterContainer: {
    flexDirection: "row",
    gap: 12,
    marginTop: 10,
    width: "100%",
  },
  filterTypeContainer: {
    width: "33%",
    gap: 8,
  },
  dropdownContainer: {
    flexDirection: "column",
    width: "60%",
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
  switchButton: {
    marginTop: 8,
  },
});

export default Financeiro;
