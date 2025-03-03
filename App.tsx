import { SafeAreaView, StyleSheet, Text, View, FlatList } from 'react-native';

export default function App() {

  // List the days of the week with correct object syntax
  const daysOfWeek = [
    { day: "Mon", date: 0, booked: true},
    { day: "Tue", date: 0, booked: false },
    { day: "Wed", date: 0, booked: false },
    { day: "Thu", date: 0, booked: false },
    { day: "Fri", date: 0, booked: false },
    { day: "Sat", date: 0, booked: false },
    { day: "Sun", date: 0, booked: false }
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Your Schedule</Text>
        </View>

        <FlatList
          data={daysOfWeek}
          horizontal
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.listOfDays}
          renderItem={({ item }) => (
            <View style={styles.dayContainer}>
              <Text style={styles.day}>{item.day}</Text>
              <Text style={styles.date}>{item.date}</Text>
              {item.booked && <View style={styles.bookedPoint}/>}
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 20,
  },
  header: {
    paddingTop: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 10,
  },
  listOfDays: {
    justifyContent: "space-evenly", 
    alignItems: "flex-start",
  },
  dayContainer: {
    marginHorizontal: 10,
    alignItems: "center",
  },
  day: {
    fontSize: 20,
  },
  date: {
    fontSize: 20, 
    fontWeight: "bold",
    alignItems: "center",
  },
  bookedPoint: {
    width: 7,
    height: 7,
    borderRadius: 5,
    backgroundColor: "grey",
  }
});
