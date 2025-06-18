import db from "../../db/db";
import { Product } from "./product.type";

// Crear tabla de productos
export const crearTablaProducto = async () => {
    try {
        await db.execAsync(`
      CREATE TABLE IF NOT EXISTS productos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT,
        precio REAL
      );
    `);
        console.log('Tabla productos creada exitosamente');
    } catch (error) {
        console.error('Error al crear tabla productos:', error);
        throw error;
    }
};

// Insertar producto
export const insertarProducto = async (nombre: string, precio: number) => {
    try {
        const result = await db.runAsync(
            'INSERT INTO productos (nombre, precio) VALUES (?, ?)',
            [nombre, precio]
        );
        console.log('Producto insertado con ID:', result.lastInsertRowId);
        return {
            success: true,
            insertId: result.lastInsertRowId,
            changes: result.changes
        };
    } catch (error) {
        console.error('Error al insertar producto:', error);
        return {
            success: false,
            error: error
        };
    }
};

// Obtener todos los productos
export const obtenerProductos = async () => {
    try {
        const result: Product[] = await db.getAllAsync('SELECT * FROM productos');
        return result;
    } catch (error) {
        console.error('Error al obtener productos:', error);
        throw error;
    }
};

// Obtener producto por ID
export const obtenerProductoPorId = async (id: number) => {
    try {
        const result = await db.getFirstAsync(
            'SELECT * FROM productos WHERE id = ?',
            [id]
        );
        return result;
    } catch (error) {
        console.error('Error al obtener producto por ID:', error);
        throw error;
    }
};

// Actualizar producto
export const actualizarProducto = async (id: number, nombre: string, precio: number) => {
    try {
        const result = await db.runAsync(
            'UPDATE productos SET nombre = ?, precio = ? WHERE id = ?',
            [nombre, precio, id]
        );
        return {
            success: true,
            changes: result.changes
        };
    } catch (error) {
        console.error('Error al actualizar producto:', error);
        return {
            success: false,
            error: error
        };
    }
};

// Eliminar producto
export const eliminarProducto = async (id: number) => {
    try {
        const result = await db.runAsync('DELETE FROM productos WHERE id = ?', [id]);
        return {
            success: true,
            changes: result.changes
        };
    } catch (error) {
        console.error('Error al eliminar producto:', error);
        return {
            success: false,
            error: error
        };
    }
};