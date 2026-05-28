import { StatusBar } from "expo-status-bar";
import { type ReactNode } from "react";
import { Pressable, Text, View, type StyleProp, type ViewStyle } from "react-native";

import { styles } from "../styles/mobile-styles";
import type { AppScreen } from "../types/navigation";

export function ScreenFrame({ children }: { children: ReactNode }) {
  return (
    <View style={styles.shell}>
      <StatusBar style="light" />
      {children}
    </View>
  );
}

export function Header({
  eyebrow,
  title,
  description,
  action
}: {
  eyebrow: string;
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <View style={styles.header}>
      <View style={styles.headerCopy}>
        <Text style={styles.eyebrow}>{eyebrow}</Text>
        <Text style={styles.title}>{title}</Text>
        {description ? <Text style={styles.description}>{description}</Text> : null}
      </View>
      {action}
    </View>
  );
}

export function PrimaryButton({
  label,
  onPress,
  disabled,
  variant = "primary",
  style
}: {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  variant?: "primary" | "secondary" | "danger";
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        variant === "secondary" && styles.secondaryButton,
        variant === "danger" && styles.dangerButton,
        disabled && styles.disabledButton,
        pressed && !disabled && styles.pressedButton,
        style
      ]}
    >
      <Text
        style={[
          styles.buttonText,
          variant === "secondary" && styles.secondaryButtonText,
          variant === "danger" && styles.dangerButtonText
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

export function StatCard({ label, value, tone }: { label: string; value: string; tone?: "warm" | "green" }) {
  return (
    <View
      style={[
        styles.statCard,
        tone === "warm" && styles.statCardWarm,
        tone === "green" && styles.statCardGreen
      ]}
    >
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

export function BottomNav({
  items,
  active,
  onSelect
}: {
  items: Array<{ key: AppScreen; label: string }>;
  active: AppScreen;
  onSelect: (screen: AppScreen) => void;
}) {
  return (
    <View style={styles.bottomNav}>
      {items.map((item) => (
        <Pressable
          accessibilityRole="button"
          key={item.key}
          onPress={() => onSelect(item.key)}
          style={[styles.navItem, active === item.key && styles.navItemActive]}
        >
          <Text style={[styles.navItemText, active === item.key && styles.navItemTextActive]}>
            {item.label}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}
