// FUNCIONES PARA TRABAJAR ARCHIVO JSON
import fs from 'fs';
import path from 'path';
import __dirname from '../utils.js';

// DIRECTORIO DEL ARCHIVO JSON
const filePath = path.join(__dirname, '/data/products.json');

// LEER PRODUCTOS
export function readProducts() {
    if (!fs.existsSync(filePath)) return [];
    const data = fs.readFileSync(filePath, 'utf-8');
    return data ? JSON.parse(data) : [];
}

// ESCRIBIR PRODUCTOS
export function writeProducts(products) {
    fs.writeFileSync(filePath, JSON.stringify(products, null, 2))   
}