# Aplicación Móvil - APK

## 📱 Instalación de la APK

### Opción 1: Descargar APK Compilada
1. Ve a la carpeta `/mobile-app/build/app/outputs/bundle/release/`
2. Descarga el archivo `.apk`
3. Transfiere a tu celular Android
4. Instala (requiere permitir instalación desde fuentes desconocidas)

### Opción 2: Compilar desde el código
```bash
cd mobile-app
npm install
npm run build:apk
```

## 🎯 Características
- ✅ Captura de fotos
- ✅ Extracción de datos con OCR
- ✅ Selección de tipo de informe
- ✅ Envío de datos a servidor
- ✅ Visualización de resultados

## 🔧 Requisitos
- Android 8.0 o superior
- Permisos de cámara
- Conexión a internet

## 📸 Flujo de Uso

1. **Abrir App** → Pantalla principal
2. **Capturar Foto 1** → Comprobante
3. **Capturar Foto 2** → Documento
4. **Seleccionar Tipo**
   - Inspección Laboral
   - Control de Ingresos
5. **Revisar Datos** → Datos extraídos por OCR
6. **Guardar/Enviar** → Envía al servidor
7. **��xito** → Confirmación
