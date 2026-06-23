import { ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors } from "../../constants/colors";

type Props = {
  title: string;
  value: string;
  tone?: "primary" | "success" | "warning" | "danger";
  children?: ReactNode;
};

export function StatCard({ title, value, tone = "primary", children }: Props) {
  const toneColor = colors[tone];

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={[styles.value, { color: toneColor }]}>{value}</Text>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: 14,
    minHeight: 92
  },
  title: {
    color: colors.muted,
    fontSize: 12,
    fontWeight: "600"
  },
  value: {
    marginTop: 8,
    fontSize: 24,
    fontWeight: "800"
  }
});

