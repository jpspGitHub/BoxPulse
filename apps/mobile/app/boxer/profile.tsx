import { StyleSheet, Text, TextInput, View } from "react-native";

import { Avatar, DataRow } from "../../components/cards/EntityRows";
import { AppScreen } from "../../components/layout/AppScreen";
import { BottomTabs, boxerTabs } from "../../components/layout/BottomTabs";
import { Button } from "../../components/ui/Button";
import { Surface } from "../../components/ui/Surface";
import { ScreenHeader, SectionTitle } from "../../components/ui/Typography";
import { colors } from "../../constants/theme";
import { findBoxer } from "../../mocks/mobile-data";

const currentBoxer = findBoxer("martin");

export default function BoxerProfileRoute() {
  return (
    <AppScreen footer={<BottomTabs items={boxerTabs} />}>
      <ScreenHeader
        eyebrow="Edit profile"
        title="Perfil"
        description="Update your fighter vitals."
      />
      <Surface>
        <View style={styles.identity}>
          <Avatar initials={currentBoxer.avatarInitials} />
          <View>
            <Text style={styles.name}>{currentBoxer.fullName}</Text>
            <Text style={styles.meta}>Update photo</Text>
          </View>
        </View>
      </Surface>
      <Surface>
        <SectionTitle>Datos basicos</SectionTitle>
        <TextInput value="Martin" style={styles.input} />
        <TextInput value="Rodriguez" style={styles.input} />
        <TextInput value="+598 99 000 111" style={styles.input} />
        <Button label="Guardar cambios" onPress={() => undefined} />
      </Surface>
      <Surface>
        <SectionTitle>Cuenta</SectionTitle>
        <DataRow title="Avatar" meta="Carga de imagen pendiente de backend/storage" badge="mock" />
        <Button label="Cambiar password" onPress={() => undefined} variant="secondary" />
      </Surface>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  identity: {
    alignItems: "center",
    flexDirection: "row",
    gap: 12
  },
  name: {
    color: colors.text,
    fontSize: 24,
    fontWeight: "900",
    textTransform: "uppercase"
  },
  meta: {
    color: colors.muted,
    fontSize: 14,
    marginTop: 4
  },
  input: {
    backgroundColor: "#190a08",
    borderColor: colors.border,
    borderRadius: 0,
    borderWidth: 0,
    borderBottomWidth: 2,
    color: colors.text,
    fontSize: 16,
    minHeight: 50,
    paddingHorizontal: 14
  }
});
