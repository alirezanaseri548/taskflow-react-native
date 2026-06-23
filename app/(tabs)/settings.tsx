import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import { colors } from "../../src/constants/colors";
import { AppButton } from "../../src/components/ui/AppButton";
import { useTaskStore } from "../../src/store/taskStore";
import { useHabitStore } from "../../src/store/habitStore";

export default function SettingsScreen() {
  const clearTasks = useTaskStore((state) => state.clearTasks);
  const clearHabits = useHabitStore((state) => state.clearHabits);

  function resetData() {
    clearTasks();
    clearHabits();
    Alert.alert("Data cleared", "Offline tasks and habits were removed.");
  }

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Settings</Text>
      <Text style={styles.subtitle}>Offline-first configuration for TaskFlow.</Text>

      <View style={styles.panel}>
        <Text style={styles.label}>Storage</Text>
        <Text style={styles.text}>AsyncStorage persistence is enabled. Your data remains available after closing the app.</Text>
      </View>

      <View style={styles.panel}>
        <Text style={styles.label}>Backend</Text>
        <Text style={styles.text}>The project includes a service layer prepared for future Node.js or JSON API sync.</Text>
      </View>

      <AppButton title="Clear Offline Data" onPress={resetData} variant="danger" style={{ marginTop: 12 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { padding: 20, paddingTop: 62 },
  title: { color: colors.text, fontSize: 30, fontWeight: "900" },
  subtitle: { color: colors.muted, marginTop: 6, marginBottom: 18, lineHeight: 21 },
  panel: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: 16,
    marginBottom: 12
  },
  label: { color: colors.text, fontSize: 16, fontWeight: "900" },
  text: { color: colors.muted, marginTop: 8, lineHeight: 22 }
});
