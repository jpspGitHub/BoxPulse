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
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    flex: 1,
    minWidth: 142,
    padding: 16
  },
  accent: {
    borderColor: "#755c21"
  },
  success: {
    borderColor: "#1d6448"
  },
  value: {
    color: colors.text,
    fontSize: 30,
    fontWeight: "900",
    lineHeight: 34
  },
  label: {
    color: colors.muted,
    fontSize: 12,
    fontWeight: "900",
    marginTop: 8,
    textTransform: "uppercase"
  }
});

