/**
 * DECODIFICADOR DE CÓDIGOS DE BARRAS - VERSIÓN SIMPLIFICADA
 * 
 * Uso:
 * node solucion-decodificador.js
 * 
 * Luego ingresa los códigos como array JSON:
 * ["|*|", "|**|", "|* *|"]
 */

/**
 * Función principal que procesa códigos de barras y genera facturas
 * @param {string[]} barcodes - Array de códigos de barras
 */
function processBarcodes(barcodes) {
  // Catálogo de productos
  const catalog = {
    5: "Chicles", 8: "Refresco", 11: "Pan Integral", 12: "Galletas", 15: "Leche",
    19: "Harina", 20: "Azúcar", 22: "Jabón", 25: "Aceite", 28: "Sal",
    35: "Cereal", 45: "Café", 51: "Yogur", 60: "Pasta", 75: "Arroz",
    90: "Pollo", 229: "Carne de Res", 1029: "Huevos", 2744: "Mermelada"
  };

  /**
   * Decodifica un código de barras según las reglas especificadas
   */
  function decodeBarcode(barcode) {
    try {
      let accumulator = 0; // Siempre inicia en 0
      let i = 0;

      while (i < barcode.length) {
        const char = barcode[i];

        if (char === '|') {
          let barCount = 0;
          while (i < barcode.length && barcode[i] === '|') {
            barCount++;
            i++;
          }
          if (barCount >= 3) {
            accumulator = Math.pow(accumulator, barCount);
          } else if (barCount === 2) {
            accumulator *= 3;
          } else if (barCount === 1) {
            accumulator += 5;
          }
        } else if (char === '*') {
          let starCount = 0;
          while (i < barcode.length && barcode[i] === '*') {
            starCount++;
            i++;
          }
          if (starCount >= 3) {
            accumulator = Math.pow(accumulator, 2);
          } else if (starCount === 2) {
            accumulator *= 2;
          } else if (starCount === 1) {
            accumulator += 10;
          }
        } else if (char === ' ') {
          while (i < barcode.length && barcode[i] === ' ') {
            i++;
          }
          accumulator = Math.floor(accumulator / 2);
        } else {
          i++;
        }
      }
      return accumulator;
    } catch (error) {
      return null;
    }
  }

  const invoice = {};
  const errors = [];

  // Validación inicial
  if (!Array.isArray(barcodes)) {
    console.log('Error: El input debe ser un array de códigos de barras');
    return;
  }

  if (barcodes.length === 0) {
    console.log('Error: No se proporcionaron códigos de barras');
    return;
  }

  // Procesar cada código
  barcodes.forEach((barcode, index) => {
    try {
      // Validaciones básicas
      if (typeof barcode !== 'string') {
        errors.push(`Código ${index + 1}: "${barcode}" - No es una cadena de texto`);
        return;
      }

      if (barcode.length < 3) {
        errors.push(`Código ${index + 1}: "${barcode}" - Muy corto (mínimo 3 caracteres)`);
        return;
      }

      if (!barcode.startsWith('|') || !barcode.endsWith('|')) {
        errors.push(`Código ${index + 1}: "${barcode}" - Debe empezar y terminar con barras '|'`);
        return;
      }

      // Decodificar
      const decodedValue = decodeBarcode(barcode);
      
      if (decodedValue === null || typeof decodedValue !== 'number' || !Number.isFinite(decodedValue) || decodedValue < 0) {
        errors.push(`Código ${index + 1}: "${barcode}" - Error en decodificación`);
        return;
      }

      // Buscar en catálogo
      const productName = catalog[decodedValue];
      
      if (!productName) {
        errors.push(`Código ${index + 1}: "${barcode}" - Producto no encontrado en catálogo (precio: ${decodedValue})`);
        return;
      }

      // Agregar a factura
      if (invoice[productName]) {
        invoice[productName].quantity++;
        invoice[productName].subtotal = invoice[productName].price * invoice[productName].quantity;
      } else {
        invoice[productName] = {
          price: decodedValue,
          quantity: 1,
          subtotal: decodedValue
        };
      }

    } catch (error) {
      errors.push(`Código ${index + 1}: "${barcode}" - Error inesperado: ${error.message}`);
    }
  });

  // Mostrar resultados
  console.log('\n=== DECODIFICADOR DE CÓDIGOS DE BARRAS ===\n');
  
  if (Object.keys(invoice).length > 0) {
    console.log('FACTURA GENERADA:');
    console.log('Producto        Precio Unitario    Cantidad    Subtotal');
    console.log('---------------------------------------------------');
    
    let total = 0;
    for (const [productName, details] of Object.entries(invoice)) {
      console.log(`${productName.padEnd(15)} ${details.price.toString().padEnd(18)} ${details.quantity.toString().padEnd(11)} ${details.subtotal}`);
      total += details.subtotal;
    }
    
    console.log('---------------------------------------------------');
    console.log(`Total: ${total}`);
  } else {
    console.log('RESULTADO: No se generaron productos válidos');
  }
  
  if (errors.length > 0) {
    console.log('\nERRORES ENCONTRADOS:');
    errors.forEach((error, idx) => {
      console.log(`${idx + 1}. ${error}`);
    });
  }
}

// Interfaz de consola para Node.js
if (typeof window === 'undefined' && typeof require !== 'undefined') {
  const readline = require('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  console.log('=== DECODIFICADOR DE CÓDIGOS DE BARRAS ===');
  console.log('Ingresa un array de códigos de barras en formato JSON:');
  console.log('Ejemplo: ["|*|", "|**|", "|* *|"]');
  console.log('Presiona Ctrl+C para salir\n');

  function askForInput() {
    rl.question('Códigos de barras: ', (input) => {
      try {
        const barcodes = JSON.parse(input.trim());
        processBarcodes(barcodes);
      } catch (error) {
        console.log('Error: Formato JSON inválido. Ejemplo: ["|*|", "|**|"]');
      }
      console.log('\n' + '='.repeat(50) + '\n');
      askForInput();
    });
  }

  askForInput();
}
