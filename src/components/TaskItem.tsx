import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import type { Task } from "../types/task";
import { colors } from "../constants/colors";

type Props = {
  task: Task;
  onToggle: () => void;
  onDelete: () => void;
};

export function TaskItem({ task, onToggle, onDelete }: Props) {
  const done = task.status === "completed";

  return (
    <View style={styles.card}>
      <TouchableOpacity onPress={onToggle} style={[styles.check, done && styles.checkDone]}>
        {done ? <Ionicons name="checkmark" size={18} color="#FFFFFF" /> : null}
      </TouchableOpacity>

      <View style={styles.content}>
        <Text style={[styles.title, done && styles.done]} numberOfLines={1}>{task.title}</Text>
        <Text style={styles.meta}>{task.category} â€¢ {task.priority} â€¢ {task.dueDate}</Text>
      </View>

      <TouchableOpacity onPress={onDelete} style={styles.delete}>
        <Ionicons name="trash-outline" size={20} color={colors.danger} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 10
  },
  check: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center"
  },
  checkDone: {
    backgroundColor: colors.success,
    borderColor: colors.success
  },
  content: {
    flex: 1
  },
  title: {
    color: colors.text,
    fontSize: 15,
    fontWeight: "800"
  },
  done: {
    color: colors.muted,
    textDecorationLine: "line-through"
  },
  meta: {
    color: colors.muted,
    fontSize: 12,
    marginTop: 4,
    textTransform: "capitalize"
  },
  delete: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center"
  }
});
