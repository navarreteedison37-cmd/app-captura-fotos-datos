import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Card, Paragraph, Title } from 'react-native-paper';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title>Captura de Fotos y Datos</Title>
          <Paragraph>
            Aplicación para capturar fotos, extraer datos con OCR y generar reportes.
          </Paragraph>
        </Card.Content>
      </Card>

      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          onPress={() => navigation.navigate('Captura')}
          style={styles.button}
          labelStyle={styles.buttonLabel}
        >
          📸 Iniciar Captura
        </Button>

        <Button
          mode="outlined"
          onPress={() => navigation.navigate('Historial')}
          style={styles.button}
          labelStyle={styles.buttonLabel}
        >
          📋 Ver Historial
        </Button>

        <Button
          mode="outlined"
          onPress={() => navigation.navigate('Configuracion')}
          style={styles.button}
          labelStyle={styles.buttonLabel}
        >
          ⚙️ Configuración
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
    justifyContent: 'space-around',
  },
  card: {
    marginBottom: 20,
    elevation: 3,
  },
  buttonContainer: {
    gap: 12,
  },
  button: {
    paddingVertical: 8,
  },
  buttonLabel: {
    fontSize: 16,
  },
});

export default HomeScreen;
