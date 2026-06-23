import { useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { router } from "expo-router";
import { colors } from "../../src/constants/colors";
import { AppButton } from "../../src/components/ui/AppButton";
import { useHabitStore } from "../../src/store/habitStore";

const palette = ["#2563EB", "#16A34A", "#F59E0B", "#EF4444", "#7C3AED"];

export default function CreateHabitScreen() {
  const addHabit = useHabitStore((state) => state.addHabit);
  const [title, setTitle] = useState("");
  const [color, setColor] = useState(palette[0]);

  function submit() {
    if (title.trim().length < 3) {
      Alert.alert("Invalid title", "Habit title must be at least 3 characters.");
      return;
    }

    addHabit({ title: title.trim(), color, icon: "repeat", targetCount: 1 });
    router.back();
  }

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.title}>New Habit</Text>

      <Text style={styles.label}>Title</Text>
      <TextInput value={title} onChangeText={setTitle} placeholder="Example: Read 20 minutes" style={styles.input} />

      <Text style={styles.label}>Color</Text>
      <View style={styles.palette}>
        {palette.map((item) => (
          <AppButton key={item} title="" onPress={() => setColor(item)} variant={color === item ? "primary" : "ghost"} style={[styles.swatch, { backgroundColor: item }]} />
        ))}
      </View>

      <View style={styles.actions}>
        <AppButton title="Save Habit" onPress={submit} />
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
  palette: { flexDirection: "row", gap: 10 },
  swatch: { width: 48, height: 48, paddingHorizontal: 0 },
  actions: { gap: 10, marginTop: 24 }
});
