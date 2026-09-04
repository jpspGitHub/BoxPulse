import type { ReactNode } from "react";
import { Pressable, StyleSheet, Text, type StyleProp, type ViewStyle } from "react-native";

import { colors } from "../../constants/theme";

export function Button({
  label,
  onPress,
  disabled,
  variant = "primary",
  style,
  icon
}: {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  variant?: "primary" | "secondary" | "danger";
  style?: StyleProp<ViewStyle>;
  icon?: ReactNode;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        variant === "secondary" ? styles.secondary : null,
        variant === "danger" ? styles.danger : null,
        disabled ? styles.disabled : null,
        pressed && !disabled ? styles.pressed : null,
        style
      ]}
    >
      {icon}
      <Text
        style={[
          styles.text,
          variant === "secondary" ? styles.secondaryText : null,
          variant === "danger" ? styles.dangerText : null
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: colors.primary,
    borderRadius: 8,
    flexDirection: "row",
    gap: 8,
    justifyContent: "center",
    minHeight: 64,
    paddingHorizontal: 18,
    paddingVertical: 14
  },
  secondary: {
    backgroundColor: "transparent",
    borderColor: colors.accent,
    borderWidth: 2
  },
  danger: {
    backgroundColor: colors.dangerSoft,
    borderColor: "#7a3440",
    borderWidth: 1
  },
  disabled: {
    opacity: 0.45
  },
  pressed: {
    opacity: 0.82
  },
  text: {
    color: "#ffffff",
    fontSize: 28,
    fontWeight: "900",
    letterSpacing: 0,
    textTransform: "uppercase"
  },
  secondaryText: {
    color: colors.accent
  },
  dangerText: {
    color: colors.danger
  }
});
