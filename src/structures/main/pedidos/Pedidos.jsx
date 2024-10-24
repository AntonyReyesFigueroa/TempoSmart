'use client'

import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import Cart from './Cart'; // Importa el componente del carrito
import Product from './Product'; // Importa el componente del producto

const API_PRODUCTS = process.env.NEXT_PUBLIC_API_PRODUCTOS;

export default function Pedidos() {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('Todo');
    const [searchTerm, setSearchTerm] = useState('');

    // Cargar productos al cargar el componente
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch(API_PRODUCTS);
                const data = await res.json();
                setProducts(data);
                setFilteredProducts(data); // Inicialmente, todos los productos se muestran
            } catch (error) {
                console.error('Error al cargar los productos', error);
            }
        };
        fetchProducts();
    }, []);

    // Filtrar productos según la búsqueda y la categoría
    useEffect(() => {
        let newFilteredProducts = products;

        if (selectedCategory !== 'Todo') {
            newFilteredProducts = newFilteredProducts.filter(product => product.categoria === selectedCategory);
        }

        if (searchTerm) {
            newFilteredProducts = newFilteredProducts.filter(product => product.nombre.toLowerCase().includes(searchTerm.toLowerCase()));
        }

        setFilteredProducts(newFilteredProducts);
    }, [products, selectedCategory, searchTerm]);

    // Añadir productos al carrito
    const addToCart = (product, quantity) => {
        const updatedCart = [...cart];
        const existingProduct = updatedCart.find(item => item.id === product.id);

        if (existingProduct) {
            existingProduct.cantidad += quantity; // Aumenta la cantidad si ya existe
        } else {
            updatedCart.push({ ...product, cantidad: quantity });
        }

        setCart(updatedCart);
        Swal.fire('Añadido', 'Producto añadido al carrito', 'success');
    };

    // Guardar pedidos en la API (a implementar según tu lógica)
    const saveOrders = async () => {
        // Aquí puedes implementar la lógica para guardar los pedidos en la API
        console.log('Guardando pedidos', cart);
    };

    return (
        <div className="flex">
            {/* Panel de Productos */}
            <div className="w-3/4 p-4">
                <h2 className="text-2xl font-bold mb-4">Productos</h2>

                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Buscar..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="px-2 py-1 border border-gray-300 rounded"
                    />
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="px-2 py-1 border border-gray-300 rounded ml-2"
                    >
                        <option value="Todo">Todo</option>
                        <option value="Snacks">Snacks</option>
                        <option value="Jugos">Jugos</option>
                        <option value="Bebidas">Bebidas</option>
                        <option value="Otras Bebidas">Otras Bebidas</option>
                        <option value="Sandwiches">Sandwiches</option>
                        <option value="Menú">Menú</option>
                        <option value="A la carta">A la carta</option>
                    </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {filteredProducts.map(product => (
                        <Product key={product.id} product={product} addToCart={addToCart} />
                    ))}
                </div>
            </div>

            {/* Carrito de Compras */}
            <div className="w-1/4 p-4 bg-gray-200">
                <h2 className="text-2xl font-bold mb-4">Carrito</h2>
                <Cart cart={cart} saveOrders={saveOrders} />
            </div>
        </div>
    );
}
