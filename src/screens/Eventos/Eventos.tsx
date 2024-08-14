import Header from "@/src/components/Header";
import StyledInput from "@/src/components/inputs/StyledInput";
import { SearchNormal1 } from "iconsax-react-native";
import Carousel from "react-native-reanimated-carousel";
import React, { useState } from "react";
import { View, Text, ScrollView, Pressable, Dimensions } from "react-native";
import DatePicker from "react-native-date-picker";
import { eventos } from "@/dummydata";
import EventoCard from "./EventosCard";
import EventosItem from "./EventosItem";
import { Button } from "@rneui/themed";

const Eventos = () => {
  const width = Dimensions.get("window").width;
  const [searchText, setSearchText] = useState("");
  const [filteredEvents, setFilteredEvents] = useState(eventos);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const handleSearch = (text: string) => {
    setSearchText(text);
    filterEvents(text, startDate, endDate);
  };

  const handleDateFilter = (start: Date | null, end: Date | null) => {
    setStartDate(start);
    setEndDate(end);
    filterEvents(searchText, start, end);
  };

  const filterEvents = (text: string, start: Date | null, end: Date | null) => {
    const filtered = eventos.filter((evento) => {
      const matchesText =
        evento.title.toLowerCase().includes(text.toLowerCase()) ||
        evento.location.toLowerCase().includes(text.toLowerCase());

      const eventDate = new Date(
        evento.date.split("/").reverse().join("-")
      );

      const matchesDate =
        (!start || eventDate >= start) && (!end || eventDate <= end);

      return matchesText && matchesDate;
    });

    setFilteredEvents(filtered);
  };

  const clearFilters = () => {
    setSearchText("");
    setStartDate(null);
    setEndDate(null);
    setFilteredEvents(eventos);
  };

  const highlightedEvents = eventos.filter(evento => evento.destaque === 'S');

  return (
    <View className="flex-1 h-full bg-white">
      <View className="flex-1 mt-28 items-center w-full h-full">
        <Header title="Eventos">
          <View className="flex-col w-2/3 gap-5">
            <StyledInput
              icon={<SearchNormal1 size={20} color="#ADADAD" />}
              placeholder="Buscar Eventos"
              value={searchText}
              onChange={(e) => handleSearch(e.nativeEvent.text)}
            />
            <View className="flex-row justify-between">
              <DatePicker
                mode="date"
                date={startDate || new Date()}
                onDateChange={(date) => handleDateFilter(date, endDate)}
              />
              <DatePicker
                mode="date"
                date={endDate || new Date()}
                onDateChange={(date) => handleDateFilter(startDate, date)}
              />
            </View>
            <Button title="Limpar Filtros" onPress={clearFilters} />
          </View>
        </Header>
        <ScrollView contentContainerStyle={{ paddingBottom: 100 }} style={{ width: "100%" }}>
          <Pressable
            style={{
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <View style={{ flex: 1 }}>
              {searchText === "" && !startDate && !endDate ? (
                <>
                  <Text className="font-bold text-xl py-4 px-8">
                    Eventos em destaque
                  </Text>
                  <Carousel
                    loop
                    width={width}
                    height={width / 1.4}
                    autoPlay={false}
                    data={highlightedEvents}
                    scrollAnimationDuration={1000}
                    mode="parallax"
                    modeConfig={{
                      parallaxScrollingScale: 0.9,
                      parallaxScrollingOffset: 50,
                    }}
                    renderItem={({ item }) => (
                      <EventoCard
                        title={item.title}
                        date={item.date}
                        location={item.location}
                        imageUrl={item.imageUrl}
                        description={item.description}
                        onRedirect={item.onRedirect}
                      />
                    )}
                  />
                </>
              ) : (
                <Text className="font-bold text-xl py-4 px-8 text-left mt-2">
                  Resultados da Busca
                </Text>
              )}
            </View>
            <View className="w-full justify-center items-center">
              {filteredEvents.map((evento, index) => (
                <EventosItem key={index} {...evento} />
              ))}
            </View>
          </Pressable>
        </ScrollView>
      </View>
    </View>
  );
};

export default Eventos;
