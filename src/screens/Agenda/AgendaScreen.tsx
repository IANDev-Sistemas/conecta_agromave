import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  FlatList,
  Pressable,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import moment from "moment";
import "moment/locale/pt-br";
import Header from "../../components/general/Header";
import DatePicker from "@/src/components/inputs/DatePicker";
import { AddCircle } from "iconsax-react-native";
import NovaProgModal from "./NovaProgModal";
import { getAgenda } from "./AgentaRoutes";
import { useAuth } from "@/src/contexts/AuthContext";

const weekDays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

type Appointment = {
  hour: string;
  user_name: string;
  farm_name: string;
  type_name: string | null;
};


type Appointments = {
  [date: string]: Appointment[];
};


const AgendaScreen: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [days, setDays] = useState<string[]>([]);
  const [loadingMore, setLoadingMore] = useState(false);
  const [appointments, setAppointments] = useState<Array<Appointments>>([]);;
  const [showOnlyEvents, setShowOnlyEvents] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  
  const loadInitialDays = () => {
    const initialDays = generateDays(new Date(), 14, []);
    setDays(initialDays);
  };
  
  useEffect(() => {
    loadInitialDays();
  }, []);
  const { authState } = useAuth();

  useEffect(() => {
    const fetchAgenda = async () => {
  
      try {
        const codCliente = authState?.usuario?.codigo;
        const response = await getAgenda(codCliente);
        setAppointments(response);
        
      } catch (error) {
        console.error("Erro ao buscar as visitas:", error);
      } 
    };

    fetchAgenda();
  }, []);

  const generateDays = (
    startDate: Date,
    numberOfDays: number,
    existingDays: string[]
  ): string[] => {
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
        let updatedDays = [...prevDays];
        const firstDay = moment(updatedDays[0]);
        const lastDay = moment(updatedDays[updatedDays.length - 1]);

        // Se o dia selecionado for antes do primeiro dia da lista atual
        if (moment(date).isBefore(firstDay)) {
          const daysToAdd = firstDay.diff(date, "days");
          const newDays = generateDays(moment(date).toDate(), daysToAdd + 1, updatedDays);
          updatedDays = [...newDays, ...updatedDays];
        }
        // Se o dia selecionado for após o último dia da lista atual
        else if (moment(date).isAfter(lastDay)) {
          const daysToAdd = moment(date).diff(lastDay, "days");
          const newDays = generateDays(lastDay.add(1, "day").toDate(), daysToAdd, updatedDays);
          updatedDays = [...updatedDays, ...newDays];
        }

        // Se o dia selecionado não estiver na lista, adicione-o
        if (!updatedDays.includes(selectedDay)) {
          updatedDays = [selectedDay, ...updatedDays];
        }

        return updatedDays;
      });

      setSelectedDate(date);

      // Scroll para o dia selecionado
      const index = days.indexOf(selectedDay);
      if (index !== -1) {
        flatListRef.current?.scrollToIndex({ animated: true, index });
      }
    }
  };

  const toggleFilter = () => {
    setShowOnlyEvents((prev) => !prev);
  };

  const filteredDays = showOnlyEvents
  ? days.filter((day) => {
      const dayAppointments = appointments.find((app) => app.date === day)?.visitas || [];
      return dayAppointments.length > 0;
    })
  : days;

  const renderAppointmentItem = (appointment: Appointment) => (
    <View style={styles.appointmentItem}>
      <Text style={styles.appointmentTime}>{moment(appointment.hour, "HH:mm:ss").format("HH:mm")}</Text>
      <Text>{appointment.type_name}</Text>
      <Text>{appointment.user_name}</Text>
      <Text>{appointment.farm_name}</Text>
    </View>
  );

  const renderDayItem = ({ item }: { item: string }) => {
    const dayOfMonth = moment(item).format("DD");
    const dayOfWeek = weekDays[moment(item).day()];
    
    // Verifica se é o primeiro dia do mês
    const isFirstDayOfMonth = moment(item).date() === 1;
    const monthName = moment(item).format("MMMM");
  
    // Filtrar os appointments para o dia atual
    const dayAppointments = appointments.find((app) => app.date === item)?.visitas || [];
  
    return (
      <View key={item} style={styles.dayContainer}>
        {/* Renderiza o nome do mês antes do primeiro dia */}
        {isFirstDayOfMonth && (
          <Text style={styles.monthName}>
            {monthName.charAt(0).toUpperCase() + monthName.slice(1)}
          </Text>
        )}
  
        <Pressable style={styles.dayPressable}>
          <View style={styles.dayInfo}>
            <Text style={styles.dayOfMonth}>{dayOfMonth}</Text>
            <Text style={styles.dayOfWeek}>{dayOfWeek}</Text>
          </View>
          <View>
            {dayAppointments.length > 0 ? (
              dayAppointments.map((appointment) =>
                renderAppointmentItem(appointment)
              )
            ) : (
              <View style={styles.emptyAppointment}></View>
            )}
          </View>
        </Pressable>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Header title="Agenda">
        <View style={styles.headerActions}>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => setShowModal(true)}
          >
            <AddCircle size={20} color="white" />
            <Text style={styles.addButtonText}>Agendar Visita</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={toggleFilter}
            style={styles.filterButton}
          >
            <Text style={styles.filterButtonText}>
              {showOnlyEvents ? "Todos os dias" : "Apenas dias com eventos"}
            </Text>
          </TouchableOpacity>

          <Text style={styles.periodText}>Período</Text>
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
      {showModal && (
        <NovaProgModal
          onChange={() => {}}
          onClose={() => setShowModal(false)}
          onRedirect={() => {}}
          visible={showModal}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 90,
    backgroundColor: "#fff",
  },
  headerActions: {
    flexDirection: "column",
    width: "100%",
    gap: 10,
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  addButton: {
    flexDirection: "row",
    gap: 7,
    backgroundColor: "#007E34",
    padding: 6,
    width: "50%",
    borderRadius: 16,
    justifyContent: "center",
  },
  addButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  filterButton: {
    backgroundColor: "#4CAF50",
    padding: 8,
    borderRadius: 16,
    marginTop: 10,
  },
  filterButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  periodText: {
    color: "black",
    fontWeight: "bold",
  },
  dayContainer: {
    width: "100%",
  },
  dayPressable: {
    marginVertical: 10,
    flexDirection: "row",
    gap: 10,
    paddingHorizontal: 10,
    alignItems: "flex-start",
  },
  dayInfo: {
    alignItems: "center",
    width: 80,
    marginTop: 7,
  },
  dayOfMonth: {
    fontSize: 24,
    fontWeight: "bold",
  },
  dayOfWeek: {
    fontSize: 16,
    fontWeight: "bold",
  },
  emptyAppointment: {
    backgroundColor: "#f0f0f0",
    width: 250,
    height: 60,
    borderRadius: 15,
  },
  appointmentItem: {
    backgroundColor: "#d0f0d0",
    width: 250,
    padding: 10,
    borderRadius: 15,
    marginBottom: 10,
  },
  appointmentTime: {
    fontWeight: "bold",
  },
  monthName: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 20,
  },
});

export default AgendaScreen;
