import type { ReactNode } from "react";
import { Pressable, StyleSheet, Text, View, type StyleProp, type ViewStyle } from "react-native";

import { colors } from "../../constants/theme";

export function Surface({
  children,
  style
}: {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
}) {
  return <View style={[styles.surface, style]}>{children}</View>;
}

export function PressableSurface({
  children,
  onPress,
  selected,
  style
}: {
  children: ReactNode;
  onPress: () => void;
  selected?: boolean;
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [
        styles.surface,
        styles.pressable,
        selected ? styles.selected : null,
        pressed ? styles.pressed : null,
        style
      ]}
    >
      {children}
    </Pressable>
  );
}

export function Badge({
  label,
  tone = "neutral"
}: {
  label: string;
  tone?: "neutral" | "success" | "accent";
}) {
  return (
    <Text
      style={[
        styles.badge,
        tone === "success" ? styles.badgeSuccess : null,
        tone === "accent" ? styles.badgeAccent : null
      ]}
    >
      {label}
    </Text>
  );
}

const styles = StyleSheet.create({
  surface: {
    backgroundColor: colors.surface,
    borderColor: colors.borderCool,
    borderRadius: 8,
    borderWidth: 1,
    gap: 16,
    padding: 18
  },
  pressable: {
    minHeight: 64
  },
  selected: {
    backgroundColor: colors.surfaceWarm,
    borderColor: colors.primary
  },
  pressed: {
    opacity: 0.84
  },
  badge: {
    alignSelf: "flex-start",
    backgroundColor: colors.infoSoft,
    borderRadius: 999,
    color: colors.info,
    fontSize: 12,
    fontWeight: "900",
    letterSpacing: 1,
    overflow: "hidden",
    paddingHorizontal: 10,
    paddingVertical: 6
  },
  badgeSuccess: {
    backgroundColor: colors.successSoft,
    color: colors.success
  },
  badgeAccent: {
    backgroundColor: colors.accentSoft,
    color: colors.accent
  }
});
