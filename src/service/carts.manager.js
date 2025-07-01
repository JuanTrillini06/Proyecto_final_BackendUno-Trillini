// FUNCIONES PARA TRABAJAR ARCHIVO JSON
import fs from 'fs';
import path from 'path';

import __dirname from '../utils.js';

// DIRECTORIO DEL ARCHIVO JSON
const filePath = path.join(__dirname, '/data/carts.json');

// LEER PRODUCTOS
export function readCarts() {
    if (!fs.existsSync(filePath)) return [];
    const data = fs.readFileSync(filePath, 'utf-8');
    return data ? JSON.parse(data) : [];
}

// ESCRIBIR PRODUCTOS
export function writeCarts(carts) {
    fs.writeFileSync(filePath, JSON.stringify(carts, null, 2));
}