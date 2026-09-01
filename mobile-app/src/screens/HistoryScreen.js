import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Alert } from 'react-native';
import { Card, Paragraph, Title, Button, ActivityIndicator } from 'react-native-paper';
import axios from 'axios';

const HistoryScreen = ({ navigation }) => {
  const [registros, setRegistros] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = 'http://localhost:5000';

  useEffect(() => {
    cargarRegistros();
  }, []);

  const cargarRegistros = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/registros`);
      setRegistros(response.data);
    } catch (error) {
      Alert.alert('❌ Error', 'No se pudieron cargar los registros');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={registros}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Card.Content>
              <Title>Registro #{item.id}</Title>
              <Paragraph>
                Tipo: {item.tipo_informe === 'inspeccion_laboral' ? '🏢 Inspección Laboral' : '💰 Control de Ingresos'}
              </Paragraph>
              <Paragraph>
                Fecha: {new Date(item.fecha_creacion).toLocaleDateString()}
              </Paragraph>
              <Paragraph>
                Nombre: {item.documento.nombre_razon_social}
              </Paragraph>
              <Paragraph>
                RUC: {item.documento.ruc}
              </Paragraph>
            </Card.Content>
            <Card.Actions>
              <Button onPress={() => Alert.alert('Detalles', JSON.stringify(item, null, 2))}>
                Ver Detalles
              </Button>
            </Card.Actions>
          </Card>
        )}
        refreshing={loading}
        onRefresh={cargarRegistros}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    margin: 10,
  },
});

export default HistoryScreen;
