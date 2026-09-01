# 🛠️ Guía de Auditoría - APK Captura de Fotos

## ✅ Pre-Auditoría (Antes de probar)

### Seguridad
- [ ] Validación de permisos de cámara
- [ ] Almacenamiento seguro de configuración
- [ ] Sin datos sensibles en logs
- [ ] Protección contra acceso no autorizado a archivos

### Funcionalidad
- [ ] OCR extrae datos correctamente
- [ ] Excel se genera sin errores
- [ ] Word se llena automáticamente
- [ ] Timer de 15 minutos funciona
- [ ] Cambio de tipo de informe funciona

### Compatibilidad
- [ ] Funciona en Android 8.0+
- [ ] Diferentes resoluciones de pantalla
- [ ] Diferentes tamaños de foto
- [ ] Almacenamiento disponible

---

## 📝 Pruebas Funcionales

### Prueba 1: Instalación y Permisos
**Pasos:**
1. Descargar APK
2. Instalar en Android
3. Abrir aplicación
4. Permitir acceso a cámara

**Resultado esperado:** ✅ App abre sin errores

**Estado:** [ ] PASÓ [ ] FALLÓ

**Notas:** _________________________________

---

### Prueba 2: Configuración Inicial
**Pasos:**
1. Seleccionar "Control de Espectáculo"
2. Presionar "Confirmar"
3. Seleccionar archivo Word

**Resultado esperado:** ✅ Configuración se guarda

**Estado:** [ ] PASÓ [ ] FALLÓ

**Notas:** _________________________________

---

### Prueba 3: Capturar Foto 1
**Pasos:**
1. Abrir cámara
2. Tomar foto (Comprobante con número carta, fecha, hora)
3. Presionar "Tomar Foto"

**Resultado esperado:** ✅ Foto se captura y se guarda

**Estado:** [ ] PASÓ [ ] FALLÓ

**Notas:** _________________________________

---

### Prueba 4: Capturar Foto 2
**Pasos:**
1. Cámara abierta
2. Tomar foto (Documento con número acta, RUC, nombre)
3. Presionar "Tomar Foto"

**Resultado esperado:** ✅ Foto se captura y se procesa

**Estado:** [ ] PASÓ [ ] FALLÓ

**Notas:** _________________________________

---

### Prueba 5: Extracción OCR
**Pasos:**
1. Después de capturar foto 2
2. Esperar procesamiento
3. Verificar datos extraídos

**Resultado esperado:** ✅ Datos se extraen correctamente:
- Número de carta
- Recepción
- Vínculo
- Fecha
- Hora
- Número de acta
- RUC
- Nombre/Razón Social

**Estado:** [ ] PASÓ [ ] FALLÓ

**Notas:** _________________________________

---

### Prueba 6: Guardar en Excel
**Pasos:**
1. Después de procesar datos
2. Verificar carpeta CapturaDatos
3. Abrir archivo datos.xlsx

**Resultado esperado:** ✅ Excel contiene:
- Todas las columnas requeridas
- Datos en formato correcto
- Sin errores de formato

**Estado:** [ ] PASÓ [ ] FALLÓ

**Notas:** _________________________________

---

### Prueba 7: Timer de 15 Minutos
**Pasos:**
1. Capturar fotos
2. Esperar 15 minutos
3. Verificar que aparece modal de confirmación

**Resultado esperado:** ✅ Modal aparece después de 15 minutos

**Estado:** [ ] PASÓ [ ] FALLÓ

**Notas:** _________________________________

---

### Prueba 8: Generar Informe Word
**Pasos:**
1. Después de timer
2. Seleccionar tipo de informe
3. Presionar "Terminar y Generar Word"
4. Verificar carpeta informes/

**Resultado esperado:** ✅ Archivo Word se genera con:
- Todos los datos extraídos
- Formato correcto
- Sin errores

**Estado:** [ ] PASÓ [ ] FALLÓ

**Notas:** _________________________________

---

### Prueba 9: Continuar Capturando
**Pasos:**
1. Después de timer
2. Presionar "Continuar"
3. Capturar más fotos

**Resultado esperado:** ✅ Timer se reinicia y continúa captura

**Estado:** [ ] PASÓ [ ] FALLÓ

**Notas:** _________________________________

---

### Prueba 10: Múltiples Registros
**Pasos:**
1. Capturar 3+ juegos de fotos
2. Verificar Excel

**Resultado esperado:** ✅ Excel contiene todos los registros

**Estado:** [ ] PASÓ [ ] FALLÓ

**Notas:** _________________________________

---

## 🔒 Pruebas de Seguridad

### Prueba 11: Permisos de Cámara
**Pasos:**
1. Negar permiso de cámara
2. Intentar capturar foto

**Resultado esperado:** ✅ App maneja el rechazo gracefully

**Estado:** [ ] PASÓ [ ] FALLÓ

**Notas:** _________________________________

---

### Prueba 12: Almacenamiento Lleno
**Pasos:**
1. Llenar almacenamiento del celular
2. Intentar guardar datos

**Resultado esperado:** ✅ App muestra error claro

**Estado:** [ ] PASÓ [ ] FALLÓ

**Notas:** _________________________________

---

## 📊 Resumen de Resultados

| Prueba | Resultado | Observaciones |
|--------|-----------|---------------|
| 1. Instalación | [ ] ✅ [ ] ❌ | ______________ |
| 2. Configuración | [ ] ✅ [ ] ❌ | ______________ |
| 3. Foto 1 | [ ] ✅ [ ] ❌ | ______________ |
| 4. Foto 2 | [ ] ✅ [ ] ❌ | ______________ |
| 5. OCR | [ ] ✅ [ ] ❌ | ______________ |
| 6. Excel | [ ] ✅ [ ] ❌ | ______________ |
| 7. Timer | [ ] ✅ [ ] ❌ | ______________ |
| 8. Word | [ ] ✅ [ ] ❌ | ______________ |
| 9. Continuar | [ ] ✅ [ ] ❌ | ______________ |
| 10. Múltiples | [ ] ✅ [ ] ❌ | ______________ |
| 11. Seguridad | [ ] ✅ [ ] ❌ | ______________ |
| 12. Almacenamiento | [ ] ✅ [ ] ❌ | ______________ |

---

## 🎯 Conclusión

**Total Pruebas:** 12

**Aprobadas:** ___/12

**Tasa de Éxito:** _____%

**Estado General:** [ ] LISTO PARA PRODUCCIÓN [ ] NECESITA AJUSTES

**Auditor:** _________________ **Fecha:** _________

**Comentarios Finales:**

_____________________________________________________________

_____________________________________________________________

_____________________________________________________________
