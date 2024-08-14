import React, { useMemo, useState, useEffect } from "react";
import { TouchableOpacity, View, Text, Pressable } from "react-native";
import Header from "../../components/Header";
import { Agenda, LocaleConfig } from "react-native-calendars";
import moment from "moment";
import AgendaItem from "./AgendaItem";
import { AddCircle } from "iconsax-react-native";

LocaleConfig.locales['pt-br'] = {
  monthNames: [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
  ],
  monthNamesShort: [
    "Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez",
  ],
  dayNames: [
    "Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado",
  ],
  dayNamesShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
  today: "Hoje",
};
LocaleConfig.defaultLocale = "pt-br";

const AgendaScreen: React.FC = () => {
  const [filteredList, setFilteredList] = useState<{ [key: string]: any[] }>({});

  const dataAtual = useMemo(() => {
    return moment(new Date()).format("YYYY-MM-DD");
  }, []);

  const generateEmptyDatesForMonth = (date: string) => {
    const startOfMonth = moment(date).startOf("month");
    const endOfMonth = moment(date).endOf("month");
    const dates: { [key: string]: any[] } = {};

    for (let m = startOfMonth; m.isBefore(endOfMonth); m.add(1, "days")) {
      const formattedDate = m.format("YYYY-MM-DD");
      dates[formattedDate] = [];
    }

    return dates;
  };

  useEffect(() => {
    const emptyDates = generateEmptyDatesForMonth(dataAtual);
    setFilteredList(emptyDates);
  }, [dataAtual]);

  const renderItem = (item: any) => {
    return <AgendaItem item={item} onPress={() => {}} />;
  };

  const refreshList = () => {
    // Adicione a lógica para atualizar a lista aqui
  };

  return (
    <View className="flex-1 bg-white">
      <View className="flex-1 mt-28 items-center h-full w-full">
        <Header shadowOff title="Agenda">
          <TouchableOpacity
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 7,
              backgroundColor: "#F66E58",
              padding: 6,
              width: "50%",
              borderRadius: 16,
              justifyContent: "center",
            }}
          >
            <AddCircle size={20} color="white" />
            <Text className="text-white font-semibold">Agendar Visita</Text>
          </TouchableOpacity>
        </Header>
        <View className="flex-1 w-full">
          <Agenda
            items={filteredList}
            selected={dataAtual}
            refreshControl={null}
            showClosingKnob={true}
            refreshing={false}
            renderItem={renderItem}
            loadItemsForMonth={(day) => {
              const newItems = generateEmptyDatesForMonth(day.dateString);
              setFilteredList(prevItems => ({
                ...prevItems,
                ...newItems
              }));
            }}
            initialNumToRender={5}
            maxToRenderPerBatch={5}
            windowSize={10}
            theme={{
              backgroundColor: "#FFFFFF",
              todayBackgroundColor: "#F66E58",
              todayTextColor: "white",
              selectedDayBackgroundColor: "#E7E7E7",
              selectedDayTextColor: "#3B454F",
              selectedDotColor: "#E7E7E7",
              dotColor: "#E7E7E7",
              agendaDayNumColor: "#3B454F",
              agendaDayTextColor: "#3B454F",
              agendaTodayColor: "#F66E58",
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default AgendaScreen;
