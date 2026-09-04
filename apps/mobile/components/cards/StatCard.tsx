import { StyleSheet, Text, View, type StyleProp, type ViewStyle } from "react-native";

import { colors } from "../../constants/theme";

export function StatCard({
  label,
  value,
  tone = "default",
  style
}: {
  label: string;
  value: string;
  tone?: "default" | "accent" | "success";
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <View
      style={[
        styles.card,
        tone === "accent" ? styles.accent : null,
        tone === "success" ? styles.success : null,
        style
      ]}
    >
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderColor: colors.borderCool,
    borderRadius: 8,
    borderWidth: 1,
    flex: 1,
    minWidth: 142,
    minHeight: 128,
    padding: 18
  },
  accent: {
    borderColor: colors.primary
  },
  success: {
    borderColor: colors.accent
  },
  value: {
    color: colors.text,
    fontSize: 48,
    fontWeight: "900",
    lineHeight: 54
  },
  label: {
    color: colors.subtext,
    fontSize: 14,
    fontWeight: "900",
    letterSpacing: 3,
    marginTop: 8,
    textTransform: "uppercase"
  }
});
