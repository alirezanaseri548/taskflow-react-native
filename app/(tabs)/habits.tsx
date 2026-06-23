import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Link } from "expo-router";
import { colors } from "../../src/constants/colors";
import { AppButton } from "../../src/components/ui/AppButton";
import { HabitItem } from "../../src/components/HabitItem";
import { useHabitStore } from "../../src/store/habitStore";

export default function HabitsScreen() {
  const habits = useHabitStore((state) => state.habits);
  const toggleToday = useHabitStore((state) => state.toggleToday);
  const deleteHabit = useHabitStore((state) => state.deleteHabit);

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>Habits</Text>
        <Text style={styles.subtitle}>Build small routines and track daily streaks.</Text>
      </View>

      <Link href="/habits/create" asChild>
        <AppButton title="Create New Habit" onPress={() => {}} />
      </Link>

      <View style={styles.list}>
        {habits.map((habit) => (
          <HabitItem key={habit.id} habit={habit} onToggle={() => toggleToday(habit.id)} onDelete={() => deleteHabit(habit.id)} />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { padding: 20, paddingTop: 62 },
  header: { marginBottom: 18 },
  title: { color: colors.text, fontSize: 30, fontWeight: "900" },
  subtitle: { color: colors.muted, marginTop: 6, lineHeight: 21 },
  list: { marginTop: 18 }
});
