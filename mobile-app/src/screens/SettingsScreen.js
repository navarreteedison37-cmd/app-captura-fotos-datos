import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Card, Paragraph, Title, TextInput, Button, Switch } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SettingsScreen = () => {
  const [serverUrl, setServerUrl] = useState('http://localhost:5000');
  const [autoSync, setAutoSync] = useState(true);
  const [offline, setOffline] = useState(false);

  const guardarConfiguracion = async () => {
    await AsyncStorage.setItem('serverUrl', serverUrl);
    await AsyncStorage.setItem('autoSync', autoSync.toString());
    alert('✅ Configuración guardada');
  };

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title>Configuración del Servidor</Title>
          <TextInput
            label="URL del Servidor"
            value={serverUrl}
            onChangeText={setServerUrl}
            mode="outlined"
            style={styles.input}
          />
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Title>Sincronización</Title>
          <View style={styles.switchRow}>
            <Paragraph>Sincronizar automáticamente</Paragraph>
            <Switch value={autoSync} onValueChange={setAutoSync} />
          </View>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Title>Modo Offline</Title>
          <View style={styles.switchRow}>
            <Paragraph>Modo offline (guardar localmente)</Paragraph>
            <Switch value={offline} onValueChange={setOffline} />
          </View>
        </Card.Content>
      </Card>

      <Button
        mode="contained"
        onPress={guardarConfiguracion}
        style={styles.button}
      >
        💾 Guardar Configuración
      </Button>

      <Card style={styles.infoCard}>
        <Card.Content>
          <Title>Información</Title>
          <Paragraph>Versión: 1.0.0</Paragraph>
          <Paragraph>Desarrollador: Tu Nombre</Paragraph>
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 10,
  },
  card: {
    marginBottom: 10,
  },
  input: {
    marginTop: 10,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  button: {
    marginVertical: 10,
  },
  infoCard: {
    marginTop: 20,
  },
});

export default SettingsScreen;
