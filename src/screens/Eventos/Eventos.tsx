import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Animated,
  ScrollView,
  Dimensions,
} from "react-native";
import Header from "@/src/components/general/Header";
import StyledInput from "@/src/components/inputs/StyledInput";
import { SearchNormal1, ArrowDown2, ArrowUp2 } from "iconsax-react-native";
import LoginButton from "@/src/components/buttons/LoginButton";
import Carousel from "react-native-reanimated-carousel";
import EventoCard from "./EventosCard";
import EventosItem from "./EventosItem";
import { eventos } from "@/dummydata";
import DatePicker from "@/src/components/inputs/DatePicker";
import ButtonGeneral from "@/src/components/buttons/ButtonGeneral";

const Eventos = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [animationHeight] = useState(new Animated.Value(0)); // Valor inicial de altura
  const [searchText, setSearchText] = useState("");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [filteredEvents, setFilteredEvents] = useState(eventos);

  const toggleExpand = () => {
    if (isExpanded) {
      // Recolher campos
      Animated.timing(animationHeight, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else {
      // Expandir campos
      Animated.timing(animationHeight, {
        toValue: 180, // Altura desejada para os campos
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
    setIsExpanded(!isExpanded);
  };

  const handleSearch = (text: string) => {
    setSearchText(text);
    filterEvents(text, startDate, endDate);
  };

  const filterEvents = (text: string, start: Date | null, end: Date | null) => {
    const filtered = eventos.filter((evento) => {
      const matchesText =
        evento.title.toLowerCase().includes(text.toLowerCase()) ||
        evento.location.toLowerCase().includes(text.toLowerCase());

      const eventDate = new Date(evento.date.split("/").reverse().join("-"));
      const inDateRange =
        (!start || eventDate >= start) && (!end || eventDate <= end);

      return matchesText && inDateRange;
    });

    setFilteredEvents(filtered);
  };

  const clearFilters = () => {
    setSearchText("");
    setStartDate(null);
    setEndDate(null);
    setFilteredEvents(eventos);
  };

  const highlightedEvents = eventos.filter((evento) => evento.destaque === "S");

  const noFiltersApplied = searchText === "" && !startDate && !endDate;

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Header title="Eventos">
          <View style={styles.searchContainer}>
            <StyledInput
              icon={<SearchNormal1 size={20} color="#ADADAD" />}
              placeholder="Buscar Eventos"
              value={searchText}
              onChange={(e) => handleSearch(e.nativeEvent.text)}
            />
            <Pressable onPress={toggleExpand} style={styles.expandButton}>
              <Text style={styles.expandText}>Filtros</Text>
              {isExpanded ? <ArrowUp2 size={20} /> : <ArrowDown2 size={20} />}
            </Pressable>
          </View>

          <Animated.View
            style={{ height: animationHeight, overflow: "hidden" }}
          >
            <View style={styles.filterContainer}>
              <Text style={styles.label}>Período</Text>
              <View style={styles.datePickersContainer}>
                <DatePicker
                  label="Data Início"
                  value={startDate}
                  onChange={setStartDate}
                />
                <DatePicker
                  label="Data Fim"
                  value={endDate}
                  onChange={setEndDate}
                />
              </View>
              <ButtonGeneral label="Limpar Filtros" onClick={clearFilters} />
            </View>
          </Animated.View>
        </Header>

        <ScrollView
          contentContainerStyle={styles.scrollViewContent}
          style={styles.scrollView}
        >
          <Pressable style={styles.contentContainer}>
            <View style={styles.carouselContainer}>
              {noFiltersApplied ? (
                <>
                  <Text style={styles.sectionTitle}>Eventos em destaque</Text>
                  <Carousel
                    loop
                    width={Dimensions.get("window").width}
                    height={Dimensions.get("window").width / 1.4}
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
                <Text style={styles.sectionTitle}>Resultados da Busca</Text>
              )}
            </View>
            {noFiltersApplied && (
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Últimos</Text>
              </View>
            )}
            <View style={styles.eventsContainer}>
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
  searchContainer: {
    flexDirection: "row",
    width: "66%",
    gap: 10,
  },
  expandButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
  },
  expandText: {
    fontSize: 16,
    color: "#000",
    marginRight: 8,
  },
  filterContainer: {
    flexDirection: "column",
    width: "66%",
    marginTop: 16,
    gap: 10,
  },
  datePickersContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  label: {
    fontSize: 16,
    color: "#000",
    marginBottom: 8,
  },
  scrollViewContent: {
    paddingBottom: 100,
  },
  scrollView: {
    width: "100%",
  },
  contentContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  carouselContainer: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    paddingVertical: 16,
    paddingHorizontal: 32,
  },
  sectionHeader: {
    width: "100%",
    textAlign: "left",
  },
  eventsContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Eventos;
