import { router, usePathname } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { colors } from "../../constants/theme";

export type BottomTabItem = {
  href: string;
  label: string;
};

export function BottomTabs({ items }: { items: BottomTabItem[] }) {
  const pathname = usePathname();

  return (
    <View style={styles.tabs}>
      {items.map((item) => {
        const isActive = pathname === item.href;

        return (
          <Pressable
            accessibilityRole="button"
            key={item.href}
            onPress={() => router.push(item.href)}
            style={[styles.item, isActive ? styles.itemActive : null]}
          >
            <Text style={[styles.label, isActive ? styles.labelActive : null]}>{item.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

export const coachTabs: BottomTabItem[] = [
  { href: "/coach", label: "Inicio" },
  { href: "/coach/boxers", label: "Boxers" },
  { href: "/coach/programs", label: "Planes" }
];

export const boxerTabs: BottomTabItem[] = [
  { href: "/boxer", label: "Inicio" },
  { href: "/boxer/program", label: "Plan" },
  { href: "/boxer/history", label: "Historial" },
  { href: "/boxer/progress", label: "Progreso" },
  { href: "/boxer/profile", label: "Perfil" }
];

const styles = StyleSheet.create({
  tabs: {
    backgroundColor: colors.surfaceWarm,
    borderColor: colors.border,
    borderTopWidth: 1,
    bottom: 0,
    flexDirection: "row",
    gap: 8,
    left: 0,
    padding: 12,
    paddingBottom: 20,
    position: "absolute",
    right: 0
  },
  item: {
    alignItems: "center",
    borderRadius: 8,
    flex: 1,
    justifyContent: "center",
    minHeight: 70,
    paddingHorizontal: 4
  },
  itemActive: {
    backgroundColor: colors.primary
  },
  label: {
    color: colors.subtext,
    fontSize: 15,
    fontWeight: "900",
    letterSpacing: 2
  },
  labelActive: {
    color: colors.primaryDark
  }
});
