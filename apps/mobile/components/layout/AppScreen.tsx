import { StatusBar } from "expo-status-bar";
import type { ReactNode } from "react";
import { ScrollView, StyleSheet, Text, View, type StyleProp, type ViewStyle } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { colors, spacing } from "../../constants/theme";

export function AppScreen({
  children,
  footer,
  scroll = true,
  contentStyle,
  topBar
}: {
  children: ReactNode;
  footer?: ReactNode;
  scroll?: boolean;
  contentStyle?: StyleProp<ViewStyle>;
  topBar?: ReactNode;
}) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />
      {topBar ?? <RoundLabTopBar />}
      {scroll ? (
        <ScrollView
          contentContainerStyle={[
            styles.content,
            footer ? styles.contentWithFooter : null,
            contentStyle
          ]}
        >
          {children}
        </ScrollView>
      ) : (
        <View
          style={[
            styles.content,
            styles.flexContent,
            footer ? styles.contentWithFooter : null,
            contentStyle
          ]}
        >
          {children}
        </View>
      )}
      {footer}
    </SafeAreaView>
  );
}

export function RoundLabTopBar({
  left,
  right = "bell",
  title = "ROUNDLAB"
}: {
  left?: ReactNode;
  right?: ReactNode;
  title?: string;
}) {
  return (
    <View style={styles.topBar}>
      <View style={styles.topSlot}>
        {left ?? (
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>BP</Text>
          </View>
        )}
      </View>
      <Text style={styles.brand}>{title}</Text>
      <View style={styles.topSlot}>
        {typeof right === "string" ? (
          <Text style={styles.icon}>{right === "bell" ? "!" : right}</Text>
        ) : (
          right
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: colors.background,
    flex: 1
  },
  topBar: {
    alignItems: "center",
    backgroundColor: colors.background,
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    minHeight: 72,
    paddingHorizontal: spacing.screen
  },
  topSlot: {
    alignItems: "center",
    minWidth: 48
  },
  brand: {
    color: colors.primarySoft,
    fontSize: 36,
    fontWeight: "900",
    letterSpacing: 0,
    textTransform: "uppercase"
  },
  avatar: {
    alignItems: "center",
    backgroundColor: colors.surfaceRaised,
    borderColor: colors.border,
    borderRadius: 24,
    borderWidth: 2,
    height: 48,
    justifyContent: "center",
    width: 48
  },
  avatarText: {
    color: colors.text,
    fontSize: 14,
    fontWeight: "900"
  },
  icon: {
    color: colors.text,
    fontSize: 28,
    fontWeight: "900"
  },
  content: {
    gap: 24,
    padding: spacing.screen,
    paddingBottom: spacing.screen + 20
  },
  contentWithFooter: {
    paddingBottom: 118
  },
  flexContent: {
    flex: 1
  }
});
