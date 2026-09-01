import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Alert, Text, ScrollView, Dimensions } from 'react-native';
import { Button, Card, Paragraph, Title, RadioButton, ActivityIndicator, Modal, Portal } from 'react-native-paper';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as FileSystem from 'expo-file-system';
import * as DocumentPicker from 'expo-document-picker';
import XLSX from 'xlsx';
import { Document, Packer, Paragraph as DocxParagraph, Table, TableCell, TableRow } from 'docx';

const APP_DIR = `${FileSystem.documentDirectory}CapturaDatos`;
const EXCEL_FILE = `${APP_DIR}/datos.xlsx`;
const CONFIG_FILE = `${APP_DIR}/config.json`;

const App = () => {
  const [permission, requestPermission] = useCameraPermissions();
  const [paso, setPaso] = useState('configuracion'); // configuracion, foto1, foto2, esperar, seleccionar_tipo
  const [foto1, setFoto1] = useState(null);
  const [foto2, setFoto2] = useState(null);
  const [tipo, setTipo] = useState(null);
  const [tipoInforme, setTipoInforme] = useState(null);
  const [wordFile, setWordFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [registros, setRegistros] = useState([]);
  const [timerActivo, setTimerActivo] = useState(false);
  const [tiempoRestante, setTiempoRestante] = useState(900); // 15 minutos
  const [showModal, setShowModal] = useState(false);
  const cameraRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    inicializarApp();
  }, []);

  useEffect(() => {
    if (timerActivo && tiempoRestante > 0) {
      timerRef.current = setTimeout(() => {
        setTiempoRestante(tiempoRestante - 1);
      }, 1000);
    } else if (tiempoRestante === 0 && timerActivo) {
      setShowModal(true);
      setTimerActivo(false);
    }
    return () => clearTimeout(timerRef.current);
  }, [tiempoRestante, timerActivo]);

  const inicializarApp = async () => {
    try {
      // Crear carpeta si no existe
      const dirInfo = await FileSystem.getInfoAsync(APP_DIR);
      if (!dirInfo.exists) {
        await FileSystem.makeDirectoryAsync(APP_DIR, { intermediates: true });
      }

      // Leer configuración
      const configInfo = await FileSystem.getInfoAsync(CONFIG_FILE);
      if (configInfo.exists) {
        const configText = await FileSystem.readAsStringAsync(CONFIG_FILE);
        const config = JSON.parse(configText);
        setTipo(config.tipo);
        setWordFile(config.wordFile);
        setPaso('foto1');
        setTimerActivo(true);
      } else {
        setPaso('configuracion');
      }

      // Leer registros si existen
      const excelInfo = await FileSystem.getInfoAsync(EXCEL_FILE);
      if (excelInfo.exists) {
        const excelText = await FileSystem.readAsStringAsync(EXCEL_FILE);
        // Aquí parsear el Excel
      }
    } catch (error) {
      console.error('Error inicializando:', error);
    }
  };

  const seleccionarTipo = async (tipoSeleccionado) => {
    setTipo(tipoSeleccionado);
    try {
      await FileSystem.writeAsStringAsync(
        CONFIG_FILE,
        JSON.stringify({ tipo: tipoSeleccionado, wordFile })
      );
      setPaso('seleccionar-word');
    } catch (error) {
      Alert.alert('Error', 'No se pudo guardar la configuración');
    }
  };

  const seleccionarArchivoWord = async () => {
    try {
      const resultado = await DocumentPicker.getDocumentAsync({ type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
      if (resultado.assets && resultado.assets.length > 0) {
        const archivo = resultado.assets[0];
        setWordFile(archivo.uri);
        await FileSystem.writeAsStringAsync(
          CONFIG_FILE,
          JSON.stringify({ tipo, wordFile: archivo.uri })
        );
        Alert.alert('✅ Éxito', `Archivo seleccionado: ${archivo.name}`);
        setPaso('foto1');
        setTimerActivo(true);
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo seleccionar el archivo');
    }
  };

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Title>Permiso de Cámara Requerido</Title>
        <Button onPress={requestPermission}>Permitir Acceso a Cámara</Button>
      </View>
    );
  }

  const tomarFoto = async () => {
    if (cameraRef.current) {
      try {
        const foto = await cameraRef.current.takePictureAsync();
        if (paso === 'foto1') {
          setFoto1(foto);
          Alert.alert('✅ Foto 1 Capturada', 'Procede a capturar la segunda foto');
          setPaso('foto2');
        } else if (paso === 'foto2') {
          setFoto2(foto);
          Alert.alert('✅ Foto 2 Capturada', 'Procesando datos...');
          procesarFotos(foto1, foto);
        }
      } catch (error) {
        Alert.alert('❌ Error', 'No se pudo capturar la foto');
      }
    }
  };

  const procesarFotos = async (f1, f2) => {
    setLoading(true);
    try {
      // Aquí iría el OCR para extraer datos
      // Por ahora usamos datos de ejemplo
      const datosExtraidos = {
        numero_carta: 'CAR-2024-001',
        recepcion: 'Recibido',
        vinculo: 'VIN-001',
        fecha: new Date().toLocaleDateString(),
        hora: new Date().toLocaleTimeString(),
        numero_acta: 'ACT-2024-001',
        ruc: '20123456789',
        nombre_razon_social: 'EMPRESA EJEMPLO S.A.C.',
        tipo_informe: tipo,
        fecha_creacion: new Date().toISOString(),
      };

      // Guardar en Excel
      await guardarEnExcel(datosExtraidos);
      
      // Guardar en registros
      setRegistros([...registros, datosExtraidos]);

      Alert.alert('✅ Éxito', 'Datos guardados en Excel. Puedes continuar capturando.');
      setFoto1(null);
      setFoto2(null);
      setPaso('foto1');
      
      // Reiniciar timer
      setTiempoRestante(900);
    } catch (error) {
      Alert.alert('❌ Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  const guardarEnExcel = async (datos) => {
    try {
      let hojaData = [[
        'ID',
        'Número Carta',
        'Recepción',
        'Vínculo',
        'Fecha',
        'Hora',
        'Número Acta',
        'RUC',
        'Nombre/Razón Social',
        'Tipo Informe',
        'Fecha Creación',
      ]];

      hojaData.push([
        registros.length + 1,
        datos.numero_carta,
        datos.recepcion,
        datos.vinculo,
        datos.fecha,
        datos.hora,
        datos.numero_acta,
        datos.ruc,
        datos.nombre_razon_social,
        datos.tipo_informe,
        datos.fecha_creacion,
      ]);

      const workbook = XLSX.utils.book_new();
      const worksheet = XLSX.utils.aoa_to_sheet(hojaData);
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Datos');
      
      const wbout = XLSX.write(workbook, { type: 'base64' });
      await FileSystem.writeAsStringAsync(EXCEL_FILE, wbout, { encoding: FileSystem.EncodingType.Base64 });
    } catch (error) {
      throw new Error('Error guardando Excel: ' + error.message);
    }
  };

  const generarWordConDatos = async () => {
    try {
      setLoading(true);
      
      // Aquí se llenaría el archivo Word con los datos
      // Por ahora es un placeholder
      
      Alert.alert('✅ Éxito', 'Informe Word generado correctamente');
      setPaso('foto1');
      setTiempoRestante(900);
    } catch (error) {
      Alert.alert('❌ Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  const formatearTiempo = (segundos) => {
    const minutos = Math.floor(segundos / 60);
    const secs = segundos % 60;
    return `${minutos}:${secs.toString().padStart(2, '0')}`;
  };

  // PANTALLA: Configuración Inicial
  if (paso === 'configuracion') {
    return (
      <ScrollView style={styles.container}>
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.titulo}>📱 Configuración Inicial</Title>
            <Paragraph style={styles.subtitle}>Selecciona el tipo de informe que usarás</Paragraph>
          </Card.Content>
        </Card>

        <View style={styles.radioGroup}>
          <View style={styles.radioItem}>
            <RadioButton
              value="control_espectaculo"
              status={tipo === 'control_espectaculo' ? 'checked' : 'unchecked'}
              onPress={() => setTipo('control_espectaculo')}
            />
            <Paragraph>Control de Espectáculo</Paragraph>
          </View>

          <View style={styles.radioItem}>
            <RadioButton
              value="control_inspeccion"
              status={tipo === 'control_inspeccion' ? 'checked' : 'unchecked'}
              onPress={() => setTipo('control_inspeccion')}
            />
            <Paragraph>Control de Inspección Laboral</Paragraph>
          </View>
        </View>

        <Button
          mode="contained"
          onPress={() => seleccionarTipo(tipo)}
          style={styles.button}
          disabled={!tipo}
        >
          ✅ Confirmar y Continuar
        </Button>
      </ScrollView>
    );
  }

  // PANTALLA: Seleccionar Archivo Word
  if (paso === 'seleccionar-word') {
    return (
      <ScrollView style={styles.container}>
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.titulo}>📄 Seleccionar Plantilla Word</Title>
            <Paragraph style={styles.subtitle}>Elige el archivo Word donde se llenarán los datos</Paragraph>
            {tipo === 'control_espectaculo' && (
              <Paragraph>📌 Tipo: Control de Espectáculo</Paragraph>
            )}
            {tipo === 'control_inspeccion' && (
              <Paragraph>📌 Tipo: Control de Inspección Laboral</Paragraph>
            )}
          </Card.Content>
        </Card>

        <Button
          mode="contained"
          onPress={seleccionarArchivoWord}
          style={styles.button}
        >
          📂 Seleccionar Archivo Word
        </Button>

        {wordFile && (
          <Card style={styles.card}>
            <Card.Content>
              <Paragraph>✅ Archivo seleccionado correctamente</Paragraph>
            </Card.Content>
          </Card>
        )}
      </ScrollView>
    );
  }

  // PANTALLA: Capturar Fotos
  if (paso === 'foto1' || paso === 'foto2') {
    return (
      <View style={styles.container}>
        <View style={styles.timerContainer}>
          <Text style={styles.timerText}>⏱️ {formatearTiempo(tiempoRestante)}</Text>
        </View>
        
        <CameraView style={styles.camera} ref={cameraRef} />
        
        <View style={styles.controls}>
          <Title>📸 {paso === 'foto1' ? 'Foto 1: Comprobante' : 'Foto 2: Documento'}</Title>
          <Button
            mode="contained"
            onPress={tomarFoto}
            style={styles.captureButton}
            disabled={loading}
          >
            📸 Tomar Foto
          </Button>
        </View>

        <Portal>
          <Modal visible={showModal} onDismiss={() => setShowModal(false)}>
            <View style={styles.modalContent}>
              <Card style={styles.card}>
                <Card.Content>
                  <Title>⏰ Tiempo Completado</Title>
                  <Paragraph>Han pasado 15 minutos</Paragraph>
                  <Paragraph style={styles.subtitle}>¿Continúas capturando?</Paragraph>
                </Card.Content>
              </Card>

              <View style={styles.radioGroup}>
                <View style={styles.radioItem}>
                  <RadioButton
                    value="control_espectaculo"
                    status={tipoInforme === 'control_espectaculo' ? 'checked' : 'unchecked'}
                    onPress={() => setTipoInforme('control_espectaculo')}
                  />
                  <Paragraph>Control de Espectáculo</Paragraph>
                </View>

                <View style={styles.radioItem}>
                  <RadioButton
                    value="control_inspeccion"
                    status={tipoInforme === 'control_inspeccion' ? 'checked' : 'unchecked'}
                    onPress={() => setTipoInforme('control_inspeccion')}
                  />
                  <Paragraph>Control de Inspección Laboral</Paragraph>
                </View>
              </View>

              <View style={styles.buttonRow}>
                <Button
                  mode="contained"
                  onPress={() => {
                    setShowModal(false);
                    generarWordConDatos();
                  }}
                  style={styles.buttonModal}
                >
                  ✅ Terminar y Generar Word
                </Button>

                <Button
                  mode="outlined"
                  onPress={() => {
                    setShowModal(false);
                    setTiempoRestante(900);
                    setTimerActivo(true);
                  }}
                  style={styles.buttonModal}
                >
                  ➕ Continuar
                </Button>
              </View>
            </View>
          </Modal>
        </Portal>
      </View>
    );
  }

  return <View style={styles.container} />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  card: {
    margin: 10,
    elevation: 3,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
    marginTop: 8,
    color: '#666',
  },
  radioGroup: {
    marginVertical: 20,
    paddingHorizontal: 10,
  },
  radioItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  button: {
    marginHorizontal: 10,
    marginVertical: 10,
    paddingVertical: 8,
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
  timerContainer: {
    backgroundColor: '#FF6B6B',
    padding: 10,
    alignItems: 'center',
  },
  timerText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  modalContent: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 20,
  },
  buttonModal: {
    flex: 1,
  },
});

export default App;
