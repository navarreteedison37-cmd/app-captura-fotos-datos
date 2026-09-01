import React, { useState, useRef } from 'react';
import { View, StyleSheet, Alert, ScrollView } from 'react-native';
import { Button, Card, Paragraph, Title, RadioButton, ActivityIndicator } from 'react-native-paper';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as FileSystem from 'expo-file-system';
import axios from 'axios';

const CaptureScreen = ({ navigation }) => {
  const [permission, requestPermission] = useCameraPermissions();
  const [foto1, setFoto1] = useState(null);
  const [foto2, setFoto2] = useState(null);
  const [tipo, setTipo] = useState('control_ingresos');
  const [paso, setPaso] = useState(1); // 1: Foto1, 2: Foto2, 3: Seleccionar tipo
  const [loading, setLoading] = useState(false);
  const cameraRef = useRef(null);

  const API_URL = 'http://localhost:5000';

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Paragraph>Se requieren permisos de cámara</Paragraph>
        <Button onPress={requestPermission}>Permitir</Button>
      </View>
    );
  }

  const tomarFoto = async () => {
    if (cameraRef.current) {
      try {
        const foto = await cameraRef.current.takePictureAsync();
        if (paso === 1) {
          setFoto1(foto);
          setPaso(2);
          Alert.alert('✅ Foto 1 Capturada', 'Ahora captura la segunda foto');
        } else if (paso === 2) {
          setFoto2(foto);
          setPaso(3);
          Alert.alert('✅ Foto 2 Capturada', 'Selecciona el tipo de informe');
        }
      } catch (error) {
        Alert.alert('❌ Error', 'No se pudo capturar la foto');
      }
    }
  };

  const enviarDatos = async () => {
    if (!foto1 || !foto2) {
      Alert.alert('❌ Error', 'Se requieren ambas fotos');
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('foto1', {
        uri: foto1.uri,
        type: 'image/jpeg',
        name: 'foto1.jpg',
      });
      formData.append('foto2', {
        uri: foto2.uri,
        type: 'image/jpeg',
        name: 'foto2.jpg',
      });
      formData.append('tipo_informe', tipo);

      const response = await axios.post(
        `${API_URL}/api/upload-fotos`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      Alert.alert('✅ Éxito', 'Datos guardados correctamente', [
        {
          text: 'OK',
          onPress: () => {
            setFoto1(null);
            setFoto2(null);
            setPaso(1);
            navigation.navigate('Home');
          },
        },
      ]);
    } catch (error) {
      Alert.alert('❌ Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {paso < 3 ? (
        <>
          <CameraView style={styles.camera} ref={cameraRef} />
          <View style={styles.controls}>
            <Title>Paso {paso}: Captura Foto {paso}</Title>
            <Button
              mode="contained"
              onPress={tomarFoto}
              style={styles.captureButton}
            >
              📸 Tomar Foto
            </Button>
          </View>
        </>
      ) : (
        <ScrollView style={styles.selectionContainer}>
          <Card>
            <Card.Content>
              <Title>Selecciona Tipo de Informe</Title>
              <Paragraph>¿Cuál es el tipo de informe?</Paragraph>
            </Card.Content>
          </Card>

          <View style={styles.radioGroup}>
            <View style={styles.radioItem}>
              <RadioButton
                value="inspeccion_laboral"
                status={tipo === 'inspeccion_laboral' ? 'checked' : 'unchecked'}
                onPress={() => setTipo('inspeccion_laboral')}
              />
              <Paragraph>Inspección Laboral</Paragraph>
            </View>

            <View style={styles.radioItem}>
              <RadioButton
                value="control_ingresos"
                status={tipo === 'control_ingresos' ? 'checked' : 'unchecked'}
                onPress={() => setTipo('control_ingresos')}
              />
              <Paragraph>Control de Ingresos</Paragraph>
            </View>
          </View>

          <Button
            mode="contained"
            onPress={enviarDatos}
            style={styles.submitButton}
            disabled={loading}
          >
            {loading ? <ActivityIndicator color="#fff" /> : '✅ Guardar y Enviar'}
          </Button>

          <Button
            mode="outlined"
            onPress={() => {
              setFoto1(null);
              setFoto2(null);
              setPaso(1);
            }}
            style={styles.resetButton}
          >
            🔄 Reiniciar
          </Button>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  controls: {
    padding: 20,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  captureButton: {
    marginTop: 10,
  },
  selectionContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  radioGroup: {
    marginVertical: 20,
  },
  radioItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  submitButton: {
    marginTop: 20,
  },
  resetButton: {
    marginTop: 10,
    marginBottom: 20,
  },
});

export default CaptureScreen;
