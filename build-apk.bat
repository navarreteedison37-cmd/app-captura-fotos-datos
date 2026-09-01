@echo off
REM Script para compilar APK en Windows

echo =====================================
echo Compilador de APK - Captura Fotos
echo =====================================
echo.

REM Verificar Node.js
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo Error: Node.js no esta instalado
    echo Descarga desde: https://nodejs.org/
    pause
    exit /b 1
)

echo OK: Node.js instalado

REM Verificar EAS CLI
where eas >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo Instalando EAS CLI...
    call npm install -g eas-cli
)

echo OK: EAS CLI listo
echo.

REM Ir a carpeta
cd mobile-app

echo Instalando dependencias...
call npm install

echo.
echo Compilando APK...
echo Esto puede tomar 5-10 minutos...
echo.

REM Compilar
call eas build --platform android --profile preview

echo.
echo OK: Compilacion completada!
echo Descarga tu APK desde el enlace que aparece arriba
echo.
pause
