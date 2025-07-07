// Catálogo de productos
const catalog = {
  5: "Chicles",
  8: "Refresco",
  11: "Pan Integral",
  12: "Galletas",
  15: "Leche",
  19: "Harina",
  20: "Azúcar",
  22: "Jabón",
  25: "Aceite",
  28: "Sal",
  35: "Cereal",
  45: "Café",
  51: "Yogur",
  60: "Pasta",
  75: "Arroz",
  90: "Pollo",
  229: "Carne de Res",
  1029: "Huevos",
  2744: "Mermelada"
};

// Ejemplos de casos de prueba
const examples = {
  1: ["|*|", "|**|", "|* *|", "|** **|", "|***|", "|*||*|", "|** *|"],
  2: ["|* *|", "|**|", "|***|", "|*||*|", "|* * *|", "|** **|", "|****|"],
  3: ["|*|", "|**|", "|***|", "|****|", "|*****|", "|* **|", "|** **|"],
  4: ["|** *|", "|* * *|", "|** ** *|", "|*||*|", "|**|", "| *||| | *| |", "|**|**||"],
  5: ["|* **|", "|**|", "|* *|", "|****|", "|** **|", "|*|", "|*****|"]
};

/**
 * Función principal que procesa los códigos de barras
 * @param {string[]} barcodes - Array de códigos de barras
 * @returns {Object} - Objeto con factura y errores
 */
function processBarcodesArray(barcodes) {
  const invoice = {};
  const errors = [];

  // Validación inicial del input
  if (!Array.isArray(barcodes)) {
    errors.push('Error: El input debe ser un array de códigos de barras');
    return { invoice, errors };
  }

  if (barcodes.length === 0) {
    errors.push('Warning: No se proporcionaron códigos de barras');
    return { invoice, errors };
  }

  barcodes.forEach((barcode, index) => {
    try {
      // Validación de formato básico
      if (typeof barcode !== 'string') {
        const errorMsg = `Código ${index + 1}: "${barcode}" - No es una cadena de texto`;
        errors.push(errorMsg);
        return;
      }

      if (barcode.length < 3) {
        const errorMsg = `Código ${index + 1}: "${barcode}" - Muy corto (mínimo 3 caracteres)`;
        errors.push(errorMsg);
        return;
      }

      // Validación de barras de inicio y fin
      const startsWithBar = barcode.startsWith('|');
      const endsWithBar = barcode.endsWith('|');
      
      if (!startsWithBar || !endsWithBar) {
        const errorMsg = `Código ${index + 1}: "${barcode}" - Debe empezar y terminar con barras '|'`;
        errors.push(errorMsg);
        return;
      }

      // Decodificación
      const decodedValue = decodeBarcode(barcode);
      
      if (decodedValue === null || decodedValue === undefined) {
        const errorMsg = `Código ${index + 1}: "${barcode}" - Error en decodificación`;
        errors.push(errorMsg);
        return;
      }

      if (typeof decodedValue !== 'number' || !Number.isFinite(decodedValue)) {
        const errorMsg = `Código ${index + 1}: "${barcode}" - Valor decodificado inválido: ${decodedValue}`;
        errors.push(errorMsg);
        return;
      }

      if (decodedValue < 0) {
        const errorMsg = `Código ${index + 1}: "${barcode}" - Valor negativo: ${decodedValue}`;
        errors.push(errorMsg);
        return;
      }

      // Búsqueda en catálogo
      const productName = catalog[decodedValue];
      
      if (!productName) {
        const errorMsg = `Código ${index + 1}: "${barcode}" - Producto no encontrado en catálogo (precio: ${decodedValue})`;
        errors.push(errorMsg);
        return;
      }

      // Agregando/actualizando en factura
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
      const errorMsg = `Código ${index + 1}: "${barcode}" - Error inesperado: ${error.message}`;
      errors.push(errorMsg);
    }
  });

  return { invoice, errors };
}

/**
 * Decodifica un código de barras individual incluyendo las barras de los extremos
 * @param {string} barcode - Código de barras
 * @returns {number|null} - Valor decodificado o null si hay error
 */
function decodeBarcode(barcode) {
  try {
    // Procesar TODO el barcode incluyendo las barras de los extremos
    const content = barcode;
    
    // REGLA: Acumulador SIEMPRE empieza en 0
    let accumulator = 0;
    let i = 0;

    while (i < content.length) {
      const char = content[i];

      if (char === '|') {
        let barCount = 0;
        
        // Contar barras consecutivas
        while (i < content.length && content[i] === '|') {
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
        
        // Contar asteriscos consecutivos
        while (i < content.length && content[i] === '*') {
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
        // Saltar todos los espacios consecutivos
        while (i < content.length && content[i] === ' ') {
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

/**
 * Genera el formato de factura
 * @param {Object} invoice - Objeto con productos y detalles
 * @returns {string} - Factura formateada
 */
function generateInvoiceFormat(invoice) {
  if (Object.keys(invoice).length === 0) {
    return "No se encontraron productos válidos.";
  }

  let result = "Factura:\n";
  result += "Producto".padEnd(12) + "Precio Unitario".padEnd(19) + "Cantidad".padEnd(12) + "Subtotal\n";
  result += "-".repeat(51) + "\n";

  let total = 0;
  for (const [productName, details] of Object.entries(invoice)) {
    result += productName.padEnd(12) + 
              details.price.toString().padEnd(19) + 
              details.quantity.toString().padEnd(12) + 
              details.subtotal.toString() + "\n";
    total += details.subtotal;
  }

  result += "-".repeat(51) + "\n";
  result += `Total: ${total}`;

  return result.replace(/ /g, '&nbsp;');
}

/**
 * Función llamada desde la interfaz
 */
function processBarcodes() {
  const input = document.getElementById('barcodeInput').value.trim();
  
  if (!input) {
    alert('Por favor, ingresa códigos de barras');
    return;
  }

  try {
    // Intentar parsear como array JSON
    let barcodes;
    if (input.startsWith('[') && input.endsWith(']')) {
      barcodes = JSON.parse(input);
    } else {
      // Si no es JSON, dividir por líneas
      barcodes = input.split('\n').map(line => line.trim()).filter(line => line);
    }

    const result = processBarcodesArray(barcodes);
    
    // Generar factura formateada
    const invoiceText = generateInvoiceFormat(result.invoice);
    
    // Mostrar factura en la interfaz
    const invoiceDiv = document.getElementById('invoiceResult');
    if (Object.keys(result.invoice).length > 0) {
      invoiceDiv.innerHTML = `
        <h3>📋 Factura Generada</h3>
        <div class="invoice">${invoiceText}</div>
      `;
    } else {
      invoiceDiv.innerHTML = `
        <h3>📋 Factura</h3>
        <p>No se generaron productos válidos</p>
      `;
    }

    // Mostrar errores en la interfaz
    const errorDiv = document.getElementById('errorResult');
    if (result.errors.length > 0) {
      errorDiv.innerHTML = `
        <div class="error-list">
          <h4>⚠️ Errores encontrados:</h4>
          ${result.errors.map(error => `<div class="error-item">${error}</div>`).join('')}
        </div>
      `;
    } else {
      errorDiv.innerHTML = `
        <h4>✅ Sin errores</h4>
        <p>Todos los códigos fueron procesados correctamente</p>
      `;
    }

    // IMPRIMIR EN LA CONSOLA (VERSIÓN PRODUCCIÓN)
    console.clear();
    console.log('=== DECODIFICADOR DE CÓDIGOS DE BARRAS ===\n');
    
    if (Object.keys(result.invoice).length > 0) {
      console.log('FACTURA GENERADA:');
      console.log(invoiceText);
    } else {
      console.log('RESULTADO: No se generaron productos válidos');
    }
    
    if (result.errors.length > 0) {
      console.log('\nERRORES ENCONTRADOS:');
      result.errors.forEach((error, idx) => {
        console.log(`${idx + 1}. ${error}`);
      });
    }

  } catch (error) {
    alert('Error al procesar la entrada: ' + error.message);
  }
}

/**
 * Cargar ejemplo predefinido
 */
function loadExample(exampleNumber) {
  const example = examples[exampleNumber];
  if (example) {
    document.getElementById('barcodeInput').value = JSON.stringify(example);
  }
}

/**
 * Mostrar catálogo
 */
function displayCatalog() {
  const catalogDiv = document.getElementById('catalogDisplay');
  const catalogItems = Object.entries(catalog)
    .sort((a, b) => parseInt(a[0]) - parseInt(b[0]))
    .map(([price, product]) => `
      <div class="catalog-item">
        <div class="price">$${price}</div>
        <div class="product">${product}</div>
      </div>
    `).join('');
  
  catalogDiv.innerHTML = catalogItems;
}

// Inicializar al cargar la página
document.addEventListener('DOMContentLoaded', function() {
  displayCatalog();
});
