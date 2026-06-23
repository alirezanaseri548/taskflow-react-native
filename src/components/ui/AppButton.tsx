import { ReactNode } from "react";
import { StyleSheet, Text, TouchableOpacity, ViewStyle } from "react-native";
import { colors } from "../../constants/colors";

type Props = {
  title: string;
  onPress: () => void;
  children?: ReactNode;
  variant?: "primary" | "ghost" | "danger";
  style?: ViewStyle;
};

export function AppButton({ title, onPress, children, variant = "primary", style }: Props) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.button,
        variant === "primary" && styles.primary,
        variant === "ghost" && styles.ghost,
        variant === "danger" && styles.danger,
        style
      ]}
      activeOpacity={0.8}
    >
      {children}
      <Text style={[styles.text, variant === "ghost" && styles.ghostText]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: 46,
    borderRadius: 8,
    paddingHorizontal: 16,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8
  },
  primary: {
    backgroundColor: colors.primary
  },
  danger: {
    backgroundColor: colors.danger
  },
  ghost: {
    backgroundColor: colors.surfaceMuted
  },
  text: {
    color: "#FFFFFF",
    fontWeight: "800"
  },
  ghostText: {
    color: colors.text
  }
});
