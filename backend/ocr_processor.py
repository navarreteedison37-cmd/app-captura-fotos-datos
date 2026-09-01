import pytesseract
from PIL import Image
import io
import re
from datetime import datetime

class OCRProcessor:
    """Procesa imágenes y extrae datos con OCR"""
    
    def __init__(self):
        self.config = r'--oem 3 --psm 6'
    
    def procesar_comprobante(self, foto):
        """Extrae datos de la primera foto (comprobante)"""
        try:
            # Leer imagen
            imagen = Image.open(io.BytesIO(foto.read()))
            
            # Realizar OCR
            texto = pytesseract.image_to_string(imagen, config=self.config, lang='spa')
            
            # Extraer datos específicos
            datos = {
                "numero_carta": self._extraer_numero_carta(texto),
                "recepcion": self._extraer_recepcion(texto),
                "vinculo": self._extraer_vinculo(texto),
                "fecha": self._extraer_fecha(texto),
                "hora": self._extraer_hora(texto),
                "texto_completo": texto
            }
            
            return datos
        except Exception as e:
            return {"error": str(e)}
    
    def procesar_documento(self, foto):
        """Extrae datos de la segunda foto (documento)"""
        try:
            # Leer imagen
            imagen = Image.open(io.BytesIO(foto.read()))
            
            # Realizar OCR
            texto = pytesseract.image_to_string(imagen, config=self.config, lang='spa')
            
            # Extraer datos específicos
            datos = {
                "numero_acta": self._extraer_numero_acta(texto),
                "ruc": self._extraer_ruc(texto),
                "nombre_razon_social": self._extraer_nombre(texto),
                "texto_completo": texto
            }
            
            return datos
        except Exception as e:
            return {"error": str(e)}
    
    def _extraer_numero_carta(self, texto):
        """Extrae número de carta"""
        patron = r'carta\s*[#No.]*\s*([\w-]+)'
        match = re.search(patron, texto, re.IGNORECASE)
        return match.group(1) if match else "No encontrado"
    
    def _extraer_recepcion(self, texto):
        """Extrae recepción"""
        patron = r'recep[ci]*[ó o]n\s*[:#]*\s*(.+?)(?=\n|$)'
        match = re.search(patron, texto, re.IGNORECASE)
        return match.group(1) if match else "No encontrado"
    
    def _extraer_vinculo(self, texto):
        """Extrae vínculo"""
        patron = r'v[íi]nculo\s*[:#]*\s*([\w-]+)'
        match = re.search(patron, texto, re.IGNORECASE)
        return match.group(1) if match else "No encontrado"
    
    def _extraer_fecha(self, texto):
        """Extrae fecha"""
        patron = r'(\d{1,2}[/-]\d{1,2}[/-]\d{2,4})'
        match = re.search(patron, texto)
        return match.group(1) if match else "No encontrado"
    
    def _extraer_hora(self, texto):
        """Extrae hora"""
        patron = r'(\d{1,2}:\d{2}(?::\d{2})?(?:\s*[AP]M)?)'
        match = re.search(patron, texto, re.IGNORECASE)
        return match.group(1) if match else "No encontrado"
    
    def _extraer_numero_acta(self, texto):
        """Extrae número de acta"""
        patron = r'acta\s*[#No.]*\s*([\w-]+)'
        match = re.search(patron, texto, re.IGNORECASE)
        return match.group(1) if match else "No encontrado"
    
    def _extraer_ruc(self, texto):
        """Extrae RUC"""
        patron = r'ruc\s*[:#]*\s*([\d-]+)'
        match = re.search(patron, texto, re.IGNORECASE)
        return match.group(1) if match else "No encontrado"
    
    def _extraer_nombre(self, texto):
        """Extrae nombre o razón social"""
        # Buscar línea con nombre/empresa
        patron = r'(?:nombre|empresa|raz[óo]n social)\s*[:#]*\s*(.+?)(?=\n|$)'
        match = re.search(patron, texto, re.IGNORECASE)
        if match:
            return match.group(1).strip()
        # Si no encuentra patrón, retorna primeras líneas no vacías
        lineas = [l.strip() for l in texto.split('\n') if l.strip()]
        return lineas[0] if lineas else "No encontrado"
