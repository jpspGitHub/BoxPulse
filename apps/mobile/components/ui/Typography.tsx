import type { ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";

import { colors } from "../../constants/theme";

export function ScreenHeader({
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

export function SectionTitle({ children }: { children: ReactNode }) {
  return <Text style={styles.sectionTitle}>{children}</Text>;
}

const styles = StyleSheet.create({
  header: {
    alignItems: "flex-start",
    flexDirection: "row",
    gap: 14,
    justifyContent: "space-between"
  },
  headerCopy: {
    flex: 1
  },
  eyebrow: {
    color: colors.accent,
    fontSize: 12,
    fontWeight: "900",
    letterSpacing: 0,
    marginBottom: 8,
    textTransform: "uppercase"
  },
  title: {
    color: colors.text,
    fontSize: 32,
    fontWeight: "900",
    lineHeight: 36
  },
  description: {
    color: colors.subtext,
    fontSize: 16,
    lineHeight: 23,
    marginTop: 8
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: "900"
  }
});

