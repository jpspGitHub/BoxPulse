import { router } from "expo-router";
import { StyleSheet, Text, TextInput, View } from "react-native";

import { AppScreen } from "../components/layout/AppScreen";
import { Button } from "../components/ui/Button";
import { colors } from "../constants/theme";

export default function LoginRoute() {
  return (
    <AppScreen scroll={false} contentStyle={styles.screen}>
      <View style={styles.hero}>
        <Text style={styles.brand}>BoxPulse</Text>
        <Text style={styles.title}>Entrenar y registrar en el gimnasio.</Text>
        <Text style={styles.copy}>
          Login mock para navegar los flujos mobile del MVP como coach o boxer.
        </Text>
      </View>
      <View style={styles.form}>
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
        <Button label="Entrar como coach" onPress={() => router.replace("/coach")} />
        <Button label="Entrar como boxer" onPress={() => router.replace("/boxer")} variant="secondary" />
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  screen: {
    justifyContent: "space-between"
  },
  hero: {
    flex: 1,
    justifyContent: "flex-end"
  },
  brand: {
    color: colors.accent,
    fontSize: 18,
    fontWeight: "900",
    letterSpacing: 0,
    marginBottom: 18,
    textTransform: "uppercase"
  },
  title: {
    color: colors.text,
    fontSize: 42,
    fontWeight: "900",
    lineHeight: 46,
    marginBottom: 12
  },
  copy: {
    color: colors.subtext,
    fontSize: 17,
    lineHeight: 24
  },
  form: {
    gap: 12
  },
  input: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    color: colors.text,
    fontSize: 16,
    minHeight: 52,
    paddingHorizontal: 14
  }
});

