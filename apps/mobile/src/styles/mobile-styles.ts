import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  shell: {
    backgroundColor: "#0b1118",
    flex: 1
  },
  content: {
    gap: 16,
    padding: 20,
    paddingBottom: 104
  },
  loginHero: {
    flex: 1,
    justifyContent: "flex-end",
    padding: 24
  },
  brand: {
    color: "#f7c948",
    fontSize: 18,
    fontWeight: "800",
    letterSpacing: 0,
    marginBottom: 18,
    textTransform: "uppercase"
  },
  loginTitle: {
    color: "#f8fafc",
    fontSize: 42,
    fontWeight: "900",
    lineHeight: 46,
    marginBottom: 12
  },
  loginText: {
    color: "#a9b7c6",
    fontSize: 17,
    lineHeight: 24
  },
  formPanel: {
    gap: 12,
    padding: 20,
    paddingBottom: 28
  },
  header: {
    alignItems: "flex-start",
    flexDirection: "row",
    gap: 16,
    justifyContent: "space-between"
  },
  headerCopy: {
    flex: 1
  },
  eyebrow: {
    color: "#f7c948",
    fontSize: 13,
    fontWeight: "800",
    letterSpacing: 0,
    marginBottom: 8,
    textTransform: "uppercase"
  },
  title: {
    color: "#f8fafc",
    fontSize: 32,
    fontWeight: "900",
    lineHeight: 36
  },
  description: {
    color: "#a9b7c6",
    fontSize: 16,
    lineHeight: 23,
    marginTop: 8
  },
  section: {
    backgroundColor: "#111b26",
    borderColor: "#26394b",
    borderRadius: 8,
    borderWidth: 1,
    gap: 12,
    padding: 16
  },
  sectionTitle: {
    color: "#f8fafc",
    fontSize: 18,
    fontWeight: "800"
  },
  statsGrid: {
    flexDirection: "row",
    gap: 12
  },
  configGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12
  },
  statCard: {
    backgroundColor: "#111b26",
    borderColor: "#26394b",
    borderRadius: 8,
    borderWidth: 1,
    flex: 1,
    minWidth: 140,
    padding: 16
  },
  statCardWarm: {
    borderColor: "#6b5220"
  },
  statCardGreen: {
    borderColor: "#1e5f48"
  },
  statValue: {
    color: "#f8fafc",
    fontSize: 30,
    fontWeight: "900",
    lineHeight: 34
  },
  statLabel: {
    color: "#a9b7c6",
    fontSize: 13,
    fontWeight: "700",
    marginTop: 8,
    textTransform: "uppercase"
  },
  listRow: {
    alignItems: "center",
    backgroundColor: "#0d151f",
    borderColor: "#26394b",
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: "row",
    gap: 12,
    justifyContent: "space-between",
    padding: 14
  },
  selectRow: {
    alignItems: "center",
    backgroundColor: "#0d151f",
    borderColor: "#26394b",
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: "row",
    gap: 12,
    justifyContent: "space-between",
    padding: 14
  },
  selectRowActive: {
    borderColor: "#f7c948",
    shadowColor: "#f7c948",
    shadowOpacity: 0.18,
    shadowRadius: 12
  },
  rowTitle: {
    color: "#f8fafc",
    fontSize: 16,
    fontWeight: "800"
  },
  rowMeta: {
    color: "#9baabc",
    fontSize: 14,
    lineHeight: 20,
    marginTop: 4
  },
  badge: {
    backgroundColor: "#173526",
    borderRadius: 999,
    color: "#83e6b7",
    fontSize: 12,
    fontWeight: "900",
    minWidth: 46,
    overflow: "hidden",
    paddingHorizontal: 10,
    paddingVertical: 6,
    textAlign: "center"
  },
  check: {
    borderColor: "#3a4f64",
    borderRadius: 18,
    borderWidth: 1,
    color: "#a9b7c6",
    fontSize: 20,
    fontWeight: "900",
    height: 36,
    lineHeight: 33,
    overflow: "hidden",
    textAlign: "center",
    width: 36
  },
  checkActive: {
    backgroundColor: "#f7c948",
    borderColor: "#f7c948",
    color: "#0b1118"
  },
  input: {
    backgroundColor: "#101a24",
    borderColor: "#304357",
    borderRadius: 8,
    borderWidth: 1,
    color: "#f8fafc",
    fontSize: 16,
    minHeight: 50,
    paddingHorizontal: 14,
    paddingVertical: 12
  },
  button: {
    alignItems: "center",
    backgroundColor: "#f7c948",
    borderRadius: 8,
    justifyContent: "center",
    minHeight: 54,
    paddingHorizontal: 18,
    paddingVertical: 14
  },
  secondaryButton: {
    backgroundColor: "transparent",
    borderColor: "#3a4f64",
    borderWidth: 1
  },
  dangerButton: {
    backgroundColor: "#3b1d22",
    borderColor: "#7f3842",
    borderWidth: 1
  },
  disabledButton: {
    opacity: 0.45
  },
  pressedButton: {
    opacity: 0.82
  },
  buttonText: {
    color: "#0b1118",
    fontSize: 17,
    fontWeight: "900"
  },
  secondaryButtonText: {
    color: "#d7dee7"
  },
  dangerButtonText: {
    color: "#ffb0b7"
  },
  actionsRow: {
    flexDirection: "row",
    gap: 12
  },
  splitButton: {
    flex: 1
  },
  tileGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12
  },
  tile: {
    backgroundColor: "#111b26",
    borderColor: "#26394b",
    borderRadius: 8,
    borderWidth: 1,
    minHeight: 82,
    padding: 14,
    width: "47%"
  },
  tileText: {
    color: "#f8fafc",
    fontSize: 16,
    fontWeight: "900"
  },
  modeCard: {
    backgroundColor: "#111b26",
    borderColor: "#26394b",
    borderRadius: 8,
    borderWidth: 1,
    gap: 8,
    padding: 18
  },
  modeTitle: {
    color: "#f8fafc",
    fontSize: 20,
    fontWeight: "900"
  },
  modeText: {
    color: "#a9b7c6",
    fontSize: 15,
    lineHeight: 22
  },
  timerPanel: {
    alignItems: "center",
    backgroundColor: "#111b26",
    borderColor: "#f7c948",
    borderRadius: 8,
    borderWidth: 1,
    padding: 28
  },
  timerState: {
    color: "#f7c948",
    fontSize: 14,
    fontWeight: "900",
    letterSpacing: 0
  },
  timer: {
    color: "#f8fafc",
    fontSize: 76,
    fontWeight: "900",
    lineHeight: 86
  },
  timerHint: {
    color: "#a9b7c6",
    fontSize: 16,
    fontWeight: "700"
  },
  bottomNav: {
    backgroundColor: "#0d151f",
    borderColor: "#26394b",
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
  navItem: {
    alignItems: "center",
    borderRadius: 8,
    flex: 1,
    minHeight: 46,
    justifyContent: "center",
    paddingHorizontal: 8
  },
  navItemActive: {
    backgroundColor: "#f7c948"
  },
  navItemText: {
    color: "#a9b7c6",
    fontSize: 12,
    fontWeight: "900"
  },
  navItemTextActive: {
    color: "#0b1118"
  },
  healthText: {
    bottom: 88,
    color: "#6f8193",
    fontSize: 11,
    position: "absolute",
    right: 14
  }
});
