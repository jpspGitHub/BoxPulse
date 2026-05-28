import { StatusBar } from "expo-status-bar";
import type { ReactNode } from "react";
import { ScrollView, StyleSheet, View, type StyleProp, type ViewStyle } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { colors, spacing } from "../../constants/theme";

export function AppScreen({
  children,
  footer,
  scroll = true,
  contentStyle
}: {
  children: ReactNode;
  footer?: ReactNode;
  scroll?: boolean;
  contentStyle?: StyleProp<ViewStyle>;
}) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />
      {scroll ? (
        <ScrollView contentContainerStyle={[styles.content, footer ? styles.contentWithFooter : null, contentStyle]}>
          {children}
        </ScrollView>
      ) : (
        <View style={[styles.content, styles.flexContent, footer ? styles.contentWithFooter : null, contentStyle]}>
          {children}
        </View>
      )}
      {footer}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: colors.background,
    flex: 1
  },
  content: {
    gap: spacing.section,
    padding: spacing.screen,
    paddingBottom: spacing.screen + 16
  },
  contentWithFooter: {
    paddingBottom: 104
  },
  flexContent: {
    flex: 1
  }
});

