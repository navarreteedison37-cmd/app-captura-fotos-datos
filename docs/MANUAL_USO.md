# 📋 MANUAL DE USO - APK CAPTURA DE FOTOS

## 🎯 Flujo Principal

### 1️⃣ Primera Vez (Configuración)

Al abrir por primera vez:

```
┌─────────────────────────────┐
│  CONFIGURACIÓN INICIAL      │
├─────────────────────────────┤
│ Selecciona tipo de informe: │
│                             │
│ ○ Control de Espectáculo    │
│ ○ Control de Inspección Lab │
│                             │
│    [✅ Confirmar]           │
└─────────────────────────────┘
```

**Selecciona** cuál vas a usar normalmente.

---

### 2️⃣ Seleccionar Plantilla Word

```
┌─────────────────────────────┐
│  SELECCIONAR PLANTILLA      │
├─────────────────────────────┤
│ Elige el archivo Word donde │
│ se llenarán los datos       │
│                             │
│  [📂 Seleccionar Archivo]   │
│                             │
│  ✅ Archivo seleccionado    │
└─────────────────────────────┘
```

**Busca** en tus carpetas el archivo Word de plantilla.

---

### 3️⃣ Capturar Foto 1

```
┌─────────────────────────────┐
│    ⏱️  14:53  (Tiempo)      │
├─────────────────────────────┤
│                             │
│      [CÁMARA]               │
│                             │
│    📸 Tomar Foto            │
├─────────────────────────────┤
│ 📸 Foto 1: Comprobante      │
└─────────────────────────────┘
```

**Toma foto de:**
- ✅ Número de carta
- ✅ Recepción
- ✅ Vínculo
- ✅ Fecha
- ✅ Hora

---

### 4️⃣ Capturar Foto 2

```
┌─────────────────────────────┐
│    ⏱️  14:43  (Tiempo)      │
├─────────────────────────────┤
│                             │
│      [CÁMARA]               │
│                             │
│    📸 Tomar Foto            │
├─────────────────────────────┤
│ 📸 Foto 2: Documento        │
└─────────────────────────────┘
```

**Toma foto de:**
- ✅ Número de acta
- ✅ RUC
- ✅ Nombre o Razón Social

---

### 5️⃣ Datos Guardados

✅ Los datos se guardan automáticamente en:
- **Excel**: `CapturaDatos/datos.xlsx`
- **Registro**: Internamente en la app

Puedes continuar capturando más fotos.

---

### 6️⃣ Después de 15 Minutos

```
┌─────────────────────────────┐
│    ⏱️  TIEMPO COMPLETADO    │
├─────────────────────────────┤
│   Han pasado 15 minutos     │
│   ¿Continúas capturando?    │
│                             │
│ Selecciona el tipo:         │
│ ○ Control de Espectáculo    │
│ ○ Control de Inspección Lab │
│                             │
│ [✅ Terminar y Gen. Word]   │
│ [➕ Continuar]              │
└─────────────────────────────┘
```

**Opciones:**
- **Terminar**: Genera informe Word con todos los datos
- **Continuar**: Reinicia el contador de 15 minutos

---

### 7️⃣ Generar Informe Word

Al terminar:
- ✅ Se llena el archivo Word con los datos extraídos
- ✅ Se guarda automáticamente
- ✅ Puedes verlo en tu carpeta

**Archivo guardado en:**
```
CapturaDatos/informes/
  ├── informe_control_espectaculo_20240901_120000.docx
  └── informe_control_inspeccion_20240901_120000.docx
```

---

## 📊 Datos que se Extraen

### Foto 1 - Comprobante
| Campo | Descripción |
|-------|-------------|
| Número de Carta | Identificador del comprobante |
| Recepción | Estado de recepción |
| Vínculo | Número de vínculo |
| Fecha | Fecha del comprobante |
| Hora | Hora del comprobante |

### Foto 2 - Documento
| Campo | Descripción |
|-------|-------------|
| Número de Acta | Identificador del acta |
| RUC | Registro Único de Contribuyente |
| Nombre/Razón Social | Nombre de la empresa/persona |

---

## 💾 Dónde se Guardan los Datos

```
Carpeta Interna del Celular:
  └── CapturaDatos/
      ├── datos.xlsx (Excel con todos los registros)
      ├── config.json (Tu configuración)
      └── informes/
          ├── informe_*.docx (Informes Word generados)
          └── ...
```

### Exportar desde el celular:
1. Abre el **Administrador de Archivos**
2. Ve a: **Almacenamiento interno → CapturaDatos**
3. Selecciona el archivo
4. **Envía por email/WhatsApp/USB**

---

## ⚙️ Cambiar Configuración

¿Necesitas cambiar el tipo o el archivo Word?

**Opción 1:** Desinstala y reinstala la app
**Opción 2:** Ve a Configuración del celular → Aplicaciones → Captura Fotos → Almacenamiento → Limpiar datos

---

## ✅ Checklist de Uso

- [ ] APK instalada en el celular
- [ ] Permisos de cámara activados
- [ ] Plantilla Word seleccionada
- [ ] Primera foto capturada correctamente
- [ ] Segunda foto capturada correctamente
- [ ] Datos aparecen en Excel
- [ ] Informe Word se genera correctamente
- [ ] Archivos guardados en CapturaDatos/

---

## 🆘 Preguntas Frecuentes

**P: ¿Puedo cambiar de tipo de informe?**
R: Solo la primera vez. Después necesitas reinstalar la app.

**P: ¿Qué pasa si falta la conexión a internet?**
R: La app funciona sin internet. Solo necesita la cámara.

**P: ¿Dónde descargo las plantillas Word?**
R: En la carpeta de tu PC → Carpeta de Modelos → Control de Espectáculo o Control de Inspección

**P: ¿Puedo seguir capturando después de los 15 minutos?**
R: Sí, puedes seleccionar "Continuar" para más fotos.

**P: ¿Los datos se pierden si cierro la app?**
R: No, se guardan automáticamente en Excel.
