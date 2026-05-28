import { BOXPULSE_APP_NAME } from "@boxpulse/shared/constants";
import { useState } from "react";
import { Text, TextInput, View } from "react-native";

import { PrimaryButton, ScreenFrame } from "../components/ui";
import { styles } from "../styles/mobile-styles";

export function LoginScreen({ onContinue }: { onContinue: () => void }) {
  const [email, setEmail] = useState("coach@boxpulse.app");
  const [password, setPassword] = useState("boxpulse");

  return (
    <ScreenFrame>
      <View style={styles.loginHero}>
        <Text style={styles.brand}>{BOXPULSE_APP_NAME}</Text>
        <Text style={styles.loginTitle}>Entrenamientos claros, progreso visible.</Text>
        <Text style={styles.loginText}>Acceso de validacion para recorrer las pantallas del MVP.</Text>
      </View>
      <View style={styles.formPanel}>
        <TextInput
          autoCapitalize="none"
          inputMode="email"
          onChangeText={setEmail}
          placeholder="Email"
          placeholderTextColor="#7f8fa2"
          style={styles.input}
          value={email}
        />
        <TextInput
          onChangeText={setPassword}
          placeholder="Password"
          placeholderTextColor="#7f8fa2"
          secureTextEntry
          style={styles.input}
          value={password}
        />
        <PrimaryButton label="Ingresar" onPress={onContinue} />
      </View>
    </ScreenFrame>
  );
}
