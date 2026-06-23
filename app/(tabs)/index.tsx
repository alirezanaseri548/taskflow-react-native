import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Link } from "expo-router";
import { colors } from "../../src/constants/colors";
import { StatCard } from "../../src/components/ui/StatCard";
import { AppButton } from "../../src/components/ui/AppButton";
import { useTaskStore } from "../../src/store/taskStore";
import { useHabitStore } from "../../src/store/habitStore";
import { completedHabitsToday, taskCompletionRate } from "../../src/utils/progress";
import { readableDate } from "../../src/utils/date";

export default function DashboardScreen() {
  const tasks = useTaskStore((state) => state.tasks);
  const habits = useHabitStore((state) => state.habits);
  const completedTasks = tasks.filter((task) => task.status === "completed").length;

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.kicker}>{readableDate()}</Text>
        <Text style={styles.title}>TaskFlow</Text>
        <Text style={styles.subtitle}>Plan your day, track habits, and keep your progress offline.</Text>
      </View>

      <View style={styles.grid}>
        <StatCard title="Tasks" value={`${completedTasks}/${tasks.length}`} tone="primary" />
        <StatCard title="Progress" value={`${taskCompletionRate(tasks)}%`} tone="success" />
      </View>

      <View style={styles.grid}>
        <StatCard title="Habits Done" value={`${completedHabitsToday(habits)}/${habits.length}`} tone="warning" />
        <StatCard title="Offline" value="Ready" tone="danger" />
      </View>

      <View style={styles.actions}>
        <Link href="/tasks/create" asChild>
          <AppButton title="Add Task" onPress={() => {}} />
        </Link>
        <Link href="/habits/create" asChild>
          <AppButton title="Add Habit" onPress={() => {}} variant="ghost" />
        </Link>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background
  },
  content: {
    padding: 20,
    paddingTop: 62
  },
  header: {
    marginBottom: 20
  },
  kicker: {
    color: colors.primary,
    fontWeight: "800",
    marginBottom: 8
  },
  title: {
    color: colors.text,
    fontSize: 34,
    fontWeight: "900"
  },
  subtitle: {
    color: colors.muted,
    fontSize: 15,
    lineHeight: 22,
    marginTop: 8
  },
  grid: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 12
  },
  actions: {
    gap: 10,
    marginTop: 10
  }
});
