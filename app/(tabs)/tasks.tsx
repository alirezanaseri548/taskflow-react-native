import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Link } from "expo-router";
import { colors } from "../../src/constants/colors";
import { AppButton } from "../../src/components/ui/AppButton";
import { TaskItem } from "../../src/components/TaskItem";
import { useTaskStore } from "../../src/store/taskStore";

export default function TasksScreen() {
  const tasks = useTaskStore((state) => state.tasks);
  const toggleTask = useTaskStore((state) => state.toggleTask);
  const deleteTask = useTaskStore((state) => state.deleteTask);

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>Tasks</Text>
        <Text style={styles.subtitle}>Manage your daily work with offline storage.</Text>
      </View>

      <Link href="/tasks/create" asChild>
        <AppButton title="Create New Task" onPress={() => {}} />
      </Link>

      <View style={styles.list}>
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} onToggle={() => toggleTask(task.id)} onDelete={() => deleteTask(task.id)} />
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
