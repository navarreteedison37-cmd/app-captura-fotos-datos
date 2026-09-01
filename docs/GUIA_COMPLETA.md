# Guía Completa de la Aplicación

## 📋 Índice
1. [Requisitos](#requisitos)
2. [Instalación](#instalación)
3. [Estructura de Datos](#estructura-de-datos)
4. [Uso de la Aplicación](#uso-de-la-aplicación)
5. [Generación de Reportes](#generación-de-reportes)
6. [Auditoría](#auditoría)

## Requisitos

### Para Desarrolladores
- Python 3.9+
- Node.js 16+
- Android Studio (para compilar APK)
- Git

### Para Usuarios
- Celular Android 8.0+
- Cámara
- Almacenamiento disponible

## Instalación

### 1. Backend
```bash
cd backend
pip install -r requirements.txt
python app.py
```

### 2. Frontend Web
```bash
cd frontend
npm install
npm start
```

### 3. Aplicación Móvil
Ver `/mobile-app/README.md`

## Estructura de Datos

### Primera Foto (Comprobante)
- ✅ Número de carta
- ✅ Recepción
- ✅ Vínculo
- ✅ Fecha
- ✅ Hora

### Segunda Foto (Documento)
- ✅ Número de acta
- ✅ RUC
- ✅ Nombre o Razón Social

### Hojas de Cálculo
1. **Inspección Laboral** - Contiene datos de inspecciones
2. **Control de Ingresos** - Contiene datos de ingresos

## Uso de la Aplicación

### Desde el Celular (APK)
1. Descargar e instalar la APK
2. Abrir la aplicación
3. Tomar primera foto (comprobante)
4. Tomar segunda foto (documento)
5. Seleccionar tipo: Inspección Laboral o Control de Ingresos
6. Revisar datos extraídos
7. Guardar/Enviar

### Desde la Web
1. Acceder a `http://localhost:3000`
2. Ver datos en tablas (Excel)
3. Descargar reportes
4. Generar informes Word

## Generación de Reportes

### Excel
- Dos hojas: Inspección Laboral y Control de Ingresos
- Datos extraídos automáticamente
- Formato profesional

### Word
- Plantilla predefinida
- Datos completados automáticamente
- Opción de elegir tipo de informe

## Auditoría
Ver `/docs/AUDITORIA.md`
