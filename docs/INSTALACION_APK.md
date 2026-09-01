# 🚀 GUÍA PARA COMPILAR Y DESCARGAR EL APK

## Opción 1: Descargar APK Compilada (MÁS FÁCIL)

### Paso 1: Descarga directa
Ve a: **Releases** en el repositorio
- URL: https://github.com/navarreteedison37-cmd/app-captura-fotos-datos/releases
- Descarga: `app-captura-fotos-v1.0.0.apk`
- Transfiere a tu celular Android
- Instala (permite instalación desde fuentes desconocidas)

---

## Opción 2: Compilar localmente (Si quieres modificar)

### Paso 1: Requisitos previos
Instala en tu PC:
1. **Node.js** (https://nodejs.org/)
2. **Git** (https://git-scm.com/)
3. **Expo CLI**: 
   ```bash
   npm install -g eas-cli expo-cli
   ```

### Paso 2: Descargar el código
```bash
git clone https://github.com/navarreteedison37-cmd/app-captura-fotos-datos.git
cd app-captura-fotos-datos/mobile-app
```

### Paso 3: Instalar dependencias
```bash
npm install
```

### Paso 4: Compilar APK

**Con Expo (Recomendado):**
```bash
eas build --platform android --profile preview
```

O sin login:
```bash
expo build:android --type apk
```

### Paso 5: Descargar APK
- La compilación se hará en la nube
- Recibirás un enlace de descarga
- Descarga el archivo `.apk`
- Transfiere a tu celular
- ¡Instala!

---

## Opción 3: Con Android Studio (Más avanzado)

```bash
cd app-captura-fotos-datos/mobile-app
npm install
rm -rf android  # Solo si necesitas regenerar
expo prebuild --clean
cd android
./gradlew assembleRelease
```

El APK estará en: `android/app/build/outputs/apk/release/app-release.apk`

---

## 📱 Instalación en tu Celular

### Android
1. Conecta el celular por USB
2. En Configuración → Seguridad → Activa "Orígenes desconocidos"
3. Copia el `.apk` al celular
4. Toca el archivo y elige "Instalar"
5. ¡Listo!

O manualmente:
```bash
adb install app-captura-fotos-v1.0.0.apk
```

---

## ✅ Verificar que funciona

1. Abre la APP
2. Selecciona: "Control de Espectáculo" o "Control de Inspección Laboral"
3. Selecciona tu archivo Word (plantilla)
4. ¡Comienza a capturar fotos!

---

## 🔧 Solucionar Problemas

**"No se instala el APK"**
- Activa "Orígenes desconocidos" en Seguridad
- Elimina versiones antiguas primero

**"No accede a la cámara"**
- Ve a: Configuración → Aplicaciones → Permisos → Cámara
- Activa el permiso

**"No guarda archivos"**
- Verifica que tengas almacenamiento disponible
- Ve a: Configuración → Almacenamiento

---

## 📞 ¿Necesitas Ayuda?

Si algo falla, escribe los errores que ves en la terminal y te ayudo a resolverlos.
