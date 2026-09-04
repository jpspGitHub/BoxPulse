import { StyleSheet, Text, View } from "react-native";

import { colors } from "../../constants/theme";
import { Badge, PressableSurface, Surface } from "../ui/Surface";

export function DataRow({
  title,
  meta,
  badge,
  onPress
}: {
  title: string;
  meta?: string;
  badge?: string;
  onPress?: () => void;
}) {
  const content = (
    <>
      <View style={styles.rowCopy}>
        <Text style={styles.rowTitle}>{title}</Text>
        {meta ? <Text style={styles.rowMeta}>{meta}</Text> : null}
      </View>
      {badge ? <Badge label={badge} tone="success" /> : null}
    </>
  );

  if (onPress) {
    return (
      <PressableSurface onPress={onPress} style={styles.row}>
        {content}
      </PressableSurface>
    );
  }

  return <Surface style={styles.row}>{content}</Surface>;
}

export function Avatar({ initials }: { initials: string }) {
  return (
    <View style={styles.avatar}>
      <Text style={styles.avatarText}>{initials}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  rowCopy: {
    flex: 1,
    paddingRight: 12
  },
  rowTitle: {
    color: colors.text,
    fontSize: 20,
    fontWeight: "900",
    letterSpacing: 1,
    textTransform: "uppercase"
  },
  rowMeta: {
    color: colors.subtext,
    fontSize: 16,
    fontWeight: "700",
    lineHeight: 22,
    marginTop: 4
  },
  avatar: {
    alignItems: "center",
    backgroundColor: colors.surfaceRaised,
    borderColor: colors.border,
    borderRadius: 22,
    borderWidth: 2,
    height: 44,
    justifyContent: "center",
    width: 44
  },
  avatarText: {
    color: colors.text,
    fontSize: 15,
    fontWeight: "900"
  }
});
