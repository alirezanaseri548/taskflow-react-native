import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import type { Habit } from "../types/habit";
import { colors } from "../constants/colors";
import { habitStreak } from "../utils/progress";
import { todayKey } from "../utils/date";

type Props = {
  habit: Habit;
  onToggle: () => void;
  onDelete: () => void;
};

export function HabitItem({ habit, onToggle, onDelete }: Props) {
  const completed = habit.completedDates.includes(todayKey());

  return (
    <View style={styles.card}>
      <TouchableOpacity onPress={onToggle} style={[styles.iconWrap, { backgroundColor: habit.color }]}>
        <Ionicons name={completed ? "checkmark" : "ellipse-outline"} size={22} color="#FFFFFF" />
      </TouchableOpacity>

      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={1}>{habit.title}</Text>
        <Text style={styles.meta}>{habitStreak(habit)} day streak • {completed ? "Done today" : "Pending"}</Text>
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
  iconWrap: {
    width: 42,
    height: 42,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center"
  },
  content: {
    flex: 1
  },
  title: {
    color: colors.text,
    fontSize: 15,
    fontWeight: "800"
  },
  meta: {
    color: colors.muted,
    fontSize: 12,
    marginTop: 4
  },
  delete: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center"
  }
});
