from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import os
from datetime import datetime

# Importar módulos personalizados
from ocr_processor import OCRProcessor
from excel_generator import ExcelGenerator
from word_generator import WordGenerator

load_dotenv()

app = Flask(__name__)
CORS(app)

# Inicializar procesadores
ocr = OCRProcessor()
excel_gen = ExcelGenerator()
word_gen = WordGenerator()

# Base de datos en memoria (usar SQLAlchemy en producción)
registros = []

@app.route('/api/health', methods=['GET'])
def health():
    return jsonify({"status": "OK", "timestamp": datetime.now().isoformat()})

@app.route('/api/upload-fotos', methods=['POST'])
def upload_fotos():
    """Recibe dos fotos y extrae datos con OCR"""
    try:
        if 'foto1' not in request.files or 'foto2' not in request.files:
            return jsonify({"error": "Se requieren dos fotos"}), 400
        
        foto1 = request.files['foto1']
        foto2 = request.files['foto2']
        tipo_informe = request.form.get('tipo_informe', 'control_ingresos')
        
        # Procesar fotos con OCR
        datos_foto1 = ocr.procesar_comprobante(foto1)
        datos_foto2 = ocr.procesar_documento(foto2)
        
        # Combinar datos
        registro = {
            "id": len(registros) + 1,
            "tipo_informe": tipo_informe,
            "fecha_creacion": datetime.now().isoformat(),
            "comprobante": datos_foto1,
            "documento": datos_foto2
        }
        
        registros.append(registro)
        
        return jsonify({
            "success": True,
            "mensaje": "Datos extraídos correctamente",
            "datos": registro
        }), 200
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/registros', methods=['GET'])
def get_registros():
    """Obtiene todos los registros"""
    return jsonify(registros), 200

@app.route('/api/registros/<tipo>', methods=['GET'])
def get_registros_por_tipo(tipo):
    """Obtiene registros por tipo"""
    filtrados = [r for r in registros if r['tipo_informe'] == tipo]
    return jsonify(filtrados), 200

@app.route('/api/generar-excel', methods=['POST'])
def generar_excel():
    """Genera archivo Excel con datos"""
    try:
        tipo = request.json.get('tipo', 'todos')
        archivo = excel_gen.generar(registros, tipo)
        return jsonify({
            "success": True,
            "archivo": archivo,
            "mensaje": "Excel generado correctamente"
        }), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/generar-word', methods=['POST'])
def generar_word():
    """Genera documento Word con informe"""
    try:
        id_registro = request.json.get('id_registro')
        registro = next((r for r in registros if r['id'] == id_registro), None)
        
        if not registro:
            return jsonify({"error": "Registro no encontrado"}), 404
        
        archivo = word_gen.generar(registro)
        return jsonify({
            "success": True,
            "archivo": archivo,
            "mensaje": "Informe Word generado correctamente"
        }), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
