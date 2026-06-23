import { useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { router } from "expo-router";
import { colors } from "../../src/constants/colors";
import { AppButton } from "../../src/components/ui/AppButton";
import { useTaskStore } from "../../src/store/taskStore";
import type { TaskPriority } from "../../src/types/task";

export default function CreateTaskScreen() {
  const addTask = useTaskStore((state) => state.addTask);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Study");
  const [priority, setPriority] = useState<TaskPriority>("medium");

  function submit() {
    if (title.trim().length < 3) {
      Alert.alert("Invalid title", "Task title must be at least 3 characters.");
      return;
    }

    addTask({ title: title.trim(), category: category.trim() || "Personal", priority });
    router.back();
  }

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.title}>New Task</Text>

      <Text style={styles.label}>Title</Text>
      <TextInput value={title} onChangeText={setTitle} placeholder="Example: Finish React Native module" style={styles.input} />

      <Text style={styles.label}>Category</Text>
      <TextInput value={category} onChangeText={setCategory} placeholder="Study, Work, Personal" style={styles.input} />

      <Text style={styles.label}>Priority</Text>
      <View style={styles.row}>
        {(["low", "medium", "high"] as TaskPriority[]).map((item) => (
          <AppButton key={item} title={item} onPress={() => setPriority(item)} variant={priority === item ? "primary" : "ghost"} style={styles.segment} />
        ))}
      </View>

      <View style={styles.actions}>
        <AppButton title="Save Task" onPress={submit} />
        <AppButton title="Cancel" onPress={() => router.back()} variant="ghost" />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { padding: 20, paddingTop: 62 },
  title: { color: colors.text, fontSize: 30, fontWeight: "900", marginBottom: 20 },
  label: { color: colors.text, fontWeight: "800", marginBottom: 8, marginTop: 12 },
  input: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    minHeight: 48,
    paddingHorizontal: 14,
    color: colors.text
  },
  row: { flexDirection: "row", gap: 8 },
  segment: { flex: 1 },
  actions: { gap: 10, marginTop: 24 }
});
