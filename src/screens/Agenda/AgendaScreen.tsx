import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  FlatList,
  Pressable,
  TouchableOpacity,
} from "react-native";
import moment from "moment";
import "moment/locale/pt-br";
import Header from "../../components/Header";
import DatePicker from "@/src/components/inputs/DatePicker";
import { AddCircle } from "iconsax-react-native";

const weekDays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

type Appointment = {
  time: string;
  type: string;
  description: string;
};

// Definindo o tipo do objeto appointments, onde as chaves são strings (datas) e os valores são arrays de Appointment
type Appointments = {
  [date: string]: Appointment[];
};

// Exemplo de objeto com os agendamentos
const appointments: Appointments = {
  "2024-08-16": [
    {
      time: "14:00",
      type: "Visita Técnica",
      description: "Revisão de sistema",
    },
    {
      time: "16:00",
      type: "Consulta",
      description: "Consulta médica",
    },
  ],
  "2024-08-18": [
    {
      time: "09:00",
      type: "Reunião",
      description: "Discussão de projeto",
    },
  ],
};

const AgendaScreen: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [days, setDays] = useState<string[]>([]);
  const [loadingMore, setLoadingMore] = useState(false);
  const [showOnlyEvents, setShowOnlyEvents] = useState(false); // Estado do filtro
  const flatListRef = useRef<FlatList>(null); 

  useEffect(() => {
    loadInitialDays(); 
  }, []);

  const loadInitialDays = () => {
    const initialDays = generateDays(new Date(), 14, []); 
    setDays(initialDays);
  };

  const generateDays = (startDate: Date, numberOfDays: number, existingDays: string[]): string[] => {
    const newDays = [];
    for (let i = 0; i < numberOfDays; i++) {
      const day = moment(startDate).add(i, "days").format("YYYY-MM-DD");
      if (!existingDays.includes(day)) { 
        newDays.push(day);
      }
    }
    return newDays;
  };

  const loadMoreDays = () => {
    if (loadingMore) return;

    setLoadingMore(true);
    const lastDay = moment(days[days.length - 1]).toDate(); 
    const moreDays = generateDays(lastDay, 14, days); 

    setTimeout(() => {
      setDays((prevDays) => [...prevDays, ...moreDays]);
      setLoadingMore(false);
    }, 500);
  };

  const handleDateChange = (date: Date | null) => {
    if (date) {
      const selectedDay = moment(date).format("YYYY-MM-DD");

      setDays((prevDays) => {
        const updatedDays = prevDays.filter((day) => day !== selectedDay);
        return [selectedDay, ...updatedDays]; 
      });

      setSelectedDate(date); 

      flatListRef.current?.scrollToOffset({ animated: true, offset: 0 });
    }
  };

  const toggleFilter = () => {
    setShowOnlyEvents((prev) => !prev);
  };

  const filteredDays = showOnlyEvents
    ? days.filter((day) => appointments[day])
    : days;

  const renderAppointmentItem = (appointment: Appointment) => (
    <View
      key={appointment.time}
      style={{
        backgroundColor: "#d0f0d0",
        width: 250,
        padding: 10,
        borderRadius: 15,
        marginBottom: 10, 
      }}
    >
      <Text style={{ fontWeight: "bold" }}>{appointment.time}</Text>
      <Text>{appointment.type}</Text>
      <Text>{appointment.description}</Text>
    </View>
  );

  const renderDayItem = ({ item }: { item: string }) => {
    const dayOfMonth = moment(item).format("DD");
    const dayOfWeek = weekDays[moment(item).day()];
    const isLastDayOfMonth = moment(item).isSame(moment(item).endOf('month'), 'day');
    const monthName = moment(item).format("MMMM"); 

    
    const dayAppointments = appointments[item];

    return (
      <View key={item} style={{ width: '100%' }}>
        <Pressable style={{ marginVertical: 10, alignItems: "flex-start", display: 'flex', flexDirection: 'row', gap: 10, paddingHorizontal: 10 }}>
          <View style={{ alignItems: "center", width: 80, marginTop:7 }}>
            <Text style={{ fontSize: 24, fontWeight: "bold" }}>{dayOfMonth}</Text>
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>{dayOfWeek}</Text>
          </View>
          <View>
            {dayAppointments ? (
              dayAppointments.map((appointment) => renderAppointmentItem(appointment))
            ) : (
              <View style={{ backgroundColor: "#f0f0f0", width: 250, height: 60, borderRadius: 15 }}></View>
            )}
          </View>
        </Pressable>
        {isLastDayOfMonth && (
          <Text style={{ textAlign: 'center', fontSize: 18, fontWeight: 'bold', marginVertical: 20 }}>
            {monthName.charAt(0).toUpperCase() + monthName.slice(1)}
          </Text>
        )}
      </View>
    );
  };

  return (
    <View style={{ flex: 1, marginTop: 90, backgroundColor: "#fff" }}>
      <Header title="Agenda">
        <View style={{ flexDirection: "column", width: "100%", gap: 10, justifyContent: 'flex-start', alignItems: "flex-start" }}>
          <TouchableOpacity
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 7,
              backgroundColor: "#023A5D",
              padding: 6,
              width: "50%",
              borderRadius: 16,
              justifyContent: "center",
            }}
          >
            <AddCircle size={20} color="white" />
            <Text style={{ color: "white", fontWeight: "bold" }}>Agendar Visita</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={toggleFilter}
            style={{
              backgroundColor: "#4CAF50",
              padding: 8,
              borderRadius: 16,
              marginTop: 10,
            }}
          >
            <Text style={{ color: "white", fontWeight: "bold" }}>
              {showOnlyEvents ? "Todos os dias" : "Apenas dias com eventos"}
            </Text>
          </TouchableOpacity>

          <Text style={{ color: "black", fontWeight: "bold" }}>Período</Text>
          <DatePicker
            label="Selecionar Data"
            value={selectedDate}
            onChange={handleDateChange}
          />
          
        </View>
      </Header>
      <FlatList
        ref={flatListRef}
        data={filteredDays}
        renderItem={renderDayItem}
        keyExtractor={(item) => item}
        onEndReached={loadMoreDays}
        onEndReachedThreshold={0.1}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default AgendaScreen;
