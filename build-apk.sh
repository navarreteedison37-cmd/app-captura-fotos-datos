#!/bin/bash

# Script para compilar APK automáticamente

echo "====================================="
echo "🚀 Compilador de APK - Captura Fotos"
echo "====================================="
echo ""

# Verificar Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js no está instalado"
    echo "Descarga desde: https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js instalado"

# Verificar EAS CLI
if ! command -v eas &> /dev/null; then
    echo "📦 Instalando EAS CLI..."
    npm install -g eas-cli
fi

echo "✅ EAS CLI listo"
echo ""

# Ir a carpeta mobile-app
cd mobile-app

echo "📥 Instalando dependencias..."
npm install

echo ""
echo "📱 Compilando APK..."
echo "Esto puede tomar 5-10 minutos..."
echo ""

# Compilar
eas build --platform android --profile preview

echo ""
echo "✅ ¡Compilación completada!"
echo "📥 Descarga tu APK desde el enlace que aparece arriba"
echo ""
