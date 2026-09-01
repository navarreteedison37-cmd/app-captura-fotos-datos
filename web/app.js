// Variables globales
let registros = [];
let foto1Data = null;
let foto2Data = null;
let tipoInformeActual = 'control_espectaculo';
let archivoWordActual = null;
let timerInterval = null;
let tiempoRestante = 900; // 15 minutos

// Inicializar cuando carga la página
document.addEventListener('DOMContentLoaded', () => {
    cargarRegistrosGuardados();
});

// Función para mostrar alertas
function mostrarAlerta(mensaje, tipo = 'success') {
    const alertBox = document.getElementById('alertBox');
    alertBox.textContent = mensaje;
    alertBox.className = `alert alert-${tipo}`;
    alertBox.style.display = 'block';
    
    setTimeout(() => {
        alertBox.style.display = 'none';
    }, 4000);
}

// Función para iniciar captura
function iniciarCaptura() {
    tipoInformeActual = document.querySelector('input[name="tipoInforme"]:checked').value;
    
    // Mostrar modal para seleccionar archivo Word
    const modal = document.getElementById('wordModal');
    modal.style.display = 'flex';
}

// Función para cargar archivo Word
function cargarArchivoWord(event) {
    const file = event.target.files[0];
    if (file) {
        archivoWordActual = file;
        document.getElementById('wordFileName').textContent = `✅ ${file.name} cargado`;
        
        setTimeout(() => {
            document.getElementById('wordModal').style.display = 'none';
            irAFoto1();
        }, 1000);
    }
}

// Función para ir a Foto 1
function irAFoto1() {
    document.getElementById('configSection').classList.add('section-hidden');
    document.getElementById('foto1Section').classList.remove('section-hidden');
    
    iniciarCamara('video');
    iniciarTimer();
}

// Función para iniciar cámara
function iniciarCamara(videoId) {
    const video = document.getElementById(videoId);
    
    navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }
    })
    .then(stream => {
        video.srcObject = stream;
    })
    .catch(error => {
        mostrarAlerta('❌ No se pudo acceder a la cámara. Asegúrate de permitir el acceso.', 'error');
        console.error('Error accediendo a la cámara:', error);
    });
}

// Función para tomar Foto 1
function tomarFoto1() {
    capturarFoto('video', (data) => {
        foto1Data = data;
        document.getElementById('foto1Preview').innerHTML = `
            <div style="margin-top: 20px;">
                <p style="color: #10b981; font-weight: bold; margin-bottom: 10px;">✅ Foto 1 capturada</p>
                <img src="${data}" class="photo-preview">
            </div>
        `;
        mostrarAlerta('✅ Foto 1 capturada correctamente', 'success');
        
        // Ir a Foto 2 después de 1 segundo
        setTimeout(() => {
            irAFoto2();
        }, 1000);
    });
}

// Función para capturar foto
function capturarFoto(videoId, callback) {
    const video = document.getElementById(videoId);
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0);
    
    const imageData = canvas.toDataURL('image/jpeg');
    callback(imageData);
}

// Función para ir a Foto 2
function irAFoto2() {
    document.getElementById('foto1Section').classList.add('section-hidden');
    document.getElementById('foto2Section').classList.remove('section-hidden');
    
    iniciarCamara('video2');
}

// Función para tomar Foto 2
function tomarFoto2() {
    capturarFoto('video2', (data) => {
        foto2Data = data;
        document.getElementById('foto2Preview').innerHTML = `
            <div style="margin-top: 20px;">
                <p style="color: #10b981; font-weight: bold; margin-bottom: 10px;">✅ Foto 2 capturada</p>
                <img src="${data}" class="photo-preview">
            </div>
        `;
        mostrarAlerta('✅ Foto 2 capturada correctamente', 'success');
        
        // Ir a ingresar datos después de 1 segundo
        setTimeout(() => {
            irADatos();
        }, 1000);
    });
}

// Función para ir a sección de datos
function irADatos() {
    document.getElementById('foto2Section').classList.add('section-hidden');
    document.getElementById('datosSection').classList.remove('section-hidden');
    
    // Detener cámaras
    document.getElementById('video').srcObject?.getTracks().forEach(track => track.stop());
    document.getElementById('video2').srcObject?.getTracks().forEach(track => track.stop());
}

// Función para iniciar timer
function iniciarTimer() {
    tiempoRestante = 900; // 15 minutos
    const timerDiv = document.getElementById('timer');
    timerDiv.style.display = 'block';
    
    if (timerInterval) clearInterval(timerInterval);
    
    timerInterval = setInterval(() => {
        tiempoRestante--;
        const minutos = Math.floor(tiempoRestante / 60);
        const segundos = tiempoRestante % 60;
        timerDiv.textContent = `⏱️ ${minutos}:${segundos.toString().padStart(2, '0')}`;
        
        if (tiempoRestante <= 300) {
            timerDiv.classList.add('warning');
        }
        
        if (tiempoRestante <= 0) {
            clearInterval(timerInterval);
            mostrarAlerta('⏰ ¡Tiempo completado! Presiona "Guardar y Continuar" para finalizar.', 'info');
        }
    }, 1000);
}

// Función para guardar datos
function guardarDatos() {
    const numeroCarta = document.getElementById('numeroCarta').value;
    const recepcion = document.getElementById('recepcion').value;
    const vinculo = document.getElementById('vinculo').value;
    const fecha = document.getElementById('fecha').value;
    const hora = document.getElementById('hora').value;
    const numeroActa = document.getElementById('numeroActa').value;
    const ruc = document.getElementById('ruc').value;
    const nombreEmpresa = document.getElementById('nombreEmpresa').value;
    
    if (!numeroCarta || !numeroActa || !ruc || !nombreEmpresa) {
        mostrarAlerta('❌ Por favor completa todos los campos requeridos', 'error');
        return;
    }
    
    const nuevoRegistro = {
        id: registros.length + 1,
        numeroCarta,
        recepcion,
        vinculo,
        fecha,
        hora,
        numeroActa,
        ruc,
        nombreEmpresa,
        tipoInforme: tipoInformeActual,
        fechaCreacion: new Date().toLocaleString()
    };
    
    registros.push(nuevoRegistro);
    guardarEnLocalStorage();
    
    mostrarAlerta('✅ Datos guardados exitosamente', 'success');
    
    // Limpiar formulario
    document.getElementById('numeroCarta').value = '';
    document.getElementById('recepcion').value = '';
    document.getElementById('vinculo').value = '';
    document.getElementById('fecha').value = '';
    document.getElementById('hora').value = '';
    document.getElementById('numeroActa').value = '';
    document.getElementById('ruc').value = '';
    document.getElementById('nombreEmpresa').value = '';
    
    // Mostrar registros
    mostrarRegistros();
}

// Función para mostrar registros
function mostrarRegistros() {
    document.getElementById('datosSection').classList.add('section-hidden');
    document.getElementById('registrosSection').classList.remove('section-hidden');
    
    const recordsList = document.getElementById('recordsList');
    recordsList.innerHTML = '';
    
    registros.forEach((registro, index) => {
        const html = `
            <div class="record-item">
                <h4>#${index + 1} - ${registro.tipoInforme === 'control_espectaculo' ? '🎭 Control de Espectáculo' : '🏢 Control de Inspección'}</h4>
                <p><strong>Empresa:</strong> ${registro.nombreEmpresa}</p>
                <p><strong>RUC:</strong> ${registro.ruc}</p>
                <p><strong>Fecha:</strong> ${registro.fecha} ${registro.hora}</p>
                <p><strong>Guardado:</strong> ${registro.fechaCreacion}</p>
            </div>
        `;
        recordsList.innerHTML += html;
    });
}

// Función para tomar otra foto
function tomarOtraFoto() {
    document.getElementById('numeroCarta').value = '';
    document.getElementById('recepcion').value = '';
    document.getElementById('vinculo').value = '';
    document.getElementById('fecha').value = '';
    document.getElementById('hora').value = '';
    document.getElementById('numeroActa').value = '';
    document.getElementById('ruc').value = '';
    document.getElementById('nombreEmpresa').value = '';
    
    irAFoto1();
}

// Función para volver al inicio
function volverAlInicio() {
    clearInterval(timerInterval);
    
    document.getElementById('configSection').classList.remove('section-hidden');
    document.getElementById('foto1Section').classList.add('section-hidden');
    document.getElementById('foto2Section').classList.add('section-hidden');
    document.getElementById('datosSection').classList.add('section-hidden');
    document.getElementById('registrosSection').classList.add('section-hidden');
    
    document.getElementById('video').srcObject?.getTracks().forEach(track => track.stop());
    document.getElementById('video2').srcObject?.getTracks().forEach(track => track.stop());
    
    registros = [];
    guardarEnLocalStorage();
}

// Función para nueva captura
function nuevaCaptura() {
    document.getElementById('registrosSection').classList.add('section-hidden');
    document.getElementById('datosSection').classList.remove('section-hidden');
    
    document.getElementById('numeroCarta').value = '';
    document.getElementById('recepcion').value = '';
    document.getElementById('vinculo').value = '';
    document.getElementById('fecha').value = '';
    document.getElementById('hora').value = '';
    document.getElementById('numeroActa').value = '';
    document.getElementById('ruc').value = '';
    document.getElementById('nombreEmpresa').value = '';
    
    tomarOtraFoto();
}

// Función para descargar Excel
function descargarExcel() {
    if (registros.length === 0) {
        mostrarAlerta('❌ No hay registros para descargar', 'error');
        return;
    }
    
    const data = [
        ['ID', 'Número Carta', 'Recepción', 'Vínculo', 'Fecha', 'Hora', 'Número Acta', 'RUC', 'Nombre/Razón Social', 'Tipo Informe', 'Fecha Creación']
    ];
    
    registros.forEach((registro, index) => {
        data.push([
            index + 1,
            registro.numeroCarta,
            registro.recepcion,
            registro.vinculo,
            registro.fecha,
            registro.hora,
            registro.numeroActa,
            registro.ruc,
            registro.nombreEmpresa,
            registro.tipoInforme,
            registro.fechaCreacion
        ]);
    });
    
    const ws = XLSX.utils.aoa_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Datos');
    
    const nombreArchivo = `datos_${new Date().toISOString().split('T')[0]}.xlsx`;
    XLSX.writeFile(wb, nombreArchivo);
    
    mostrarAlerta('✅ Excel descargado exitosamente', 'success');
}

// Función para descargar Word (placeholder)
function descargarWord() {
    if (registros.length === 0) {
        mostrarAlerta('❌ No hay registros para descargar', 'error');
        return;
    }
    
    // Si el usuario cargó un archivo Word, aquí se haría la modificación
    // Por ahora, generamos un documento simple
    
    let contenido = 'INFORME DE CONTROL\n\n';
    registros.forEach((registro, index) => {
        contenido += `\nREGISTRO #${index + 1}\n`;
        contenido += `Tipo de Informe: ${registro.tipoInforme === 'control_espectaculo' ? 'Control de Espectáculo' : 'Control de Inspección'}\n`;
        contenido += `Empresa: ${registro.nombreEmpresa}\n`;
        contenido += `RUC: ${registro.ruc}\n`;
        contenido += `Número de Carta: ${registro.numeroCarta}\n`;
        contenido += `Número de Acta: ${registro.numeroActa}\n`;
        contenido += `Fecha: ${registro.fecha} ${registro.hora}\n`;
        contenido += `---\n`;
    });
    
    const blob = new Blob([contenido], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `informe_${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
    
    mostrarAlerta('✅ Informe descargado exitosamente', 'success');
}

// Función para guardar en LocalStorage
function guardarEnLocalStorage() {
    localStorage.setItem('capturaDatos_registros', JSON.stringify(registros));
}

// Función para cargar registros guardados
function cargarRegistrosGuardados() {
    const datos = localStorage.getItem('capturaDatos_registros');
    if (datos) {
        registros = JSON.parse(datos);
    }
}
