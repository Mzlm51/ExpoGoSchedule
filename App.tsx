import { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function App() {
  const [currentWeek, setCurrentWeek] = useState(0);  // Generate Weekdays
  const [selectedDay, setSelectedDay] = useState(null); //generate Dropdown Menu to select classes

  const generateWeeks = (weekOffset) => {
    const today = new Date();

    // Make Monday = 0 and Sunday = 6
    const diffToMonday = today.getDay() === 0 ? 6 : 1 - today.getDay(); // If today is Sunday (0), then difference to Monday is 6
    const firstDayOfWeek = today.getDate() + (weekOffset * 7) - diffToMonday;
    const startOfWeek = new Date(today.setDate(firstDayOfWeek));

    let days = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      days.push({
        day: day.toLocaleString('en-US', { weekday: 'short' }),
        date: day.getDate(),
        booked: false,
      });
    }
    return days;
  };

  const daysOfWeek = generateWeeks(currentWeek);

  useEffect(() => {
    const today = new Date();
    const todayDate = today.getDate();
    const todayDay = daysOfWeek.find((day) => day.date === todayDate);
    setSelectedDay(todayDay);
  }, []);

  const handleDayPress = (day) => {
    if (!selectedDay || selectedDay.date !== day.date) {
      setSelectedDay(day);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Your Schedule</Text>
        </View>

        <View style={styles.weekNavigation}>
          <TouchableOpacity onPress={() => setCurrentWeek(currentWeek - 1)} style={styles.arrowButton}>
            <Icon name="chevron-left" size={20} color="#000" />
          </TouchableOpacity>

          <FlatList
            data={daysOfWeek}
            horizontal
            scrollEnabled={false}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={styles.listOfDays}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleDayPress(item)} style={styles.dayContainer}>
                <Text style={styles.day}>{item.day}</Text>
                <Text style={styles.date}>{item.date}</Text>
                {item.booked && <View style={styles.bookedPoint} />}
              </TouchableOpacity>
            )}
          />

          <TouchableOpacity onPress={() => setCurrentWeek(currentWeek + 1)} style={styles.arrowButton}>
            <Icon name="chevron-right" size={20} color="#000" />
          </TouchableOpacity>
        </View>
        
        <View style={styles.dropDownMenu}>
          {selectedDay && (
            <Text style={styles.dropdownText}>
              Details for {selectedDay.day} {selectedDay.date}
            </Text>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 0,
    justifyContent: 'flex-start',
  },
  header: {
    paddingTop: 10,
  },
  title: {
    fontSize: 32,
    paddingLeft: 10,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  listOfDays: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    flexGrow: 1,
  },
  dayContainer: {
    marginHorizontal: 10,
    alignItems: 'center',
  },
  day: {
    fontSize: 18,
  },
  date: {
    fontSize: 20,
    fontWeight: 'bold',
    alignItems: 'center',
  },
  bookedPoint: {
    width: 7,
    height: 7,
    borderRadius: 5,
    backgroundColor: 'grey',
  },
  weekNavigation: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrowButton: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  dropDownMenu: {
    flex: 1,
    margin: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    borderColor: '#ddd',
    borderWidth: 1,
      alignItems: 'center',
      justifyContent: 'center',
  },
  dropdownText: {
    fontSize: 16,
  },
});
