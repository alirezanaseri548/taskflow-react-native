import { ScrollView, StyleSheet, Text, View } from "react-native";
import { colors } from "../../src/constants/colors";
import { StatCard } from "../../src/components/ui/StatCard";
import { useTaskStore } from "../../src/store/taskStore";
import { useHabitStore } from "../../src/store/habitStore";
import { completedHabitsToday, taskCompletionRate } from "../../src/utils/progress";

export default function AnalyticsScreen() {
  const tasks = useTaskStore((state) => state.tasks);
  const habits = useHabitStore((state) => state.habits);
  const completedTasks = tasks.filter((task) => task.status === "completed").length;

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Analytics</Text>
      <Text style={styles.subtitle}>Simple offline insights from your current data.</Text>

      <View style={styles.grid}>
        <StatCard title="Task Rate" value={`${taskCompletionRate(tasks)}%`} tone="primary" />
        <StatCard title="Done Tasks" value={`${completedTasks}`} tone="success" />
      </View>

      <View style={styles.grid}>
        <StatCard title="Habits Today" value={`${completedHabitsToday(habits)}`} tone="warning" />
        <StatCard title="Total Habits" value={`${habits.length}`} tone="danger" />
      </View>

      <View style={styles.panel}>
        <Text style={styles.panelTitle}>Backend Ready</Text>
        <Text style={styles.panelText}>
          Data is currently stored offline with AsyncStorage. Later, the service layer can sync tasks and habits to a Node.js or JSON API backend.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { padding: 20, paddingTop: 62 },
  title: { color: colors.text, fontSize: 30, fontWeight: "900" },
  subtitle: { color: colors.muted, marginTop: 6, marginBottom: 18, lineHeight: 21 },
  grid: { flexDirection: "row", gap: 12, marginBottom: 12 },
  panel: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: 16,
    marginTop: 6
  },
  panelTitle: { color: colors.text, fontSize: 17, fontWeight: "900" },
  panelText: { color: colors.muted, marginTop: 8, lineHeight: 22 }
});
