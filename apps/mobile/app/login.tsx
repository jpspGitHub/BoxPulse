import { router } from "expo-router";
import { StyleSheet, Text, TextInput, View } from "react-native";

import { AppScreen } from "../components/layout/AppScreen";
import { Button } from "../components/ui/Button";
import { colors } from "../constants/theme";

export default function LoginRoute() {
  return (
    <AppScreen scroll={false} contentStyle={styles.screen} topBar={<View />}>
      <View style={styles.hero}>
        <Text style={styles.icon}>拳</Text>
        <Text style={styles.brand}>RoundLab</Text>
        <Text style={styles.copy}>Entra al ring y sigue tu progreso.</Text>
      </View>
      <View style={styles.form}>
        <Text style={styles.formTitle}>Bienvenido a RoundLab</Text>
        <TextInput
          autoCapitalize="none"
          keyboardType="email-address"
          placeholder="email@boxpulse.app"
          placeholderTextColor={colors.muted}
          style={styles.input}
          value="coach@boxpulse.app"
          editable={false}
        />
        <TextInput
          placeholder="password"
          placeholderTextColor={colors.muted}
          secureTextEntry
          style={styles.input}
          value="••••••••"
          editable={false}
        />
        <Button label="Iniciar sesion" onPress={() => router.replace("/coach")} />
        <Button
          label="Entrar como boxer"
          onPress={() => router.replace("/boxer")}
          variant="secondary"
        />
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  screen: {
    justifyContent: "space-between",
    padding: 0
  },
  hero: {
    alignItems: "center",
    backgroundColor: colors.background,
    flex: 1,
    justifyContent: "flex-end",
    padding: 28,
    paddingBottom: 44
  },
  icon: {
    color: colors.primary,
    fontSize: 56,
    fontWeight: "900",
    marginBottom: 12
  },
  brand: {
    color: colors.primarySoft,
    fontSize: 42,
    fontWeight: "900",
    letterSpacing: 0,
    textTransform: "uppercase"
  },
  copy: {
    color: colors.subtext,
    fontSize: 17,
    fontWeight: "700",
    lineHeight: 24,
    marginTop: 8,
    textAlign: "center"
  },
  form: {
    backgroundColor: colors.background,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    gap: 14,
    padding: 20,
    paddingBottom: 28
  },
  formTitle: {
    color: colors.text,
    fontSize: 32,
    fontWeight: "900",
    marginBottom: 12,
    textAlign: "center",
    textTransform: "uppercase"
  },
  input: {
    backgroundColor: colors.surfaceWarm,
    borderColor: colors.border,
    borderRadius: 0,
    borderWidth: 0,
    borderBottomWidth: 2,
    color: colors.text,
    fontSize: 16,
    minHeight: 52,
    paddingHorizontal: 14
  }
});
