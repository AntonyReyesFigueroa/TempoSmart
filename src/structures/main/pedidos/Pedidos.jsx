'use client'

import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import Cart from './Cart';
import Product from './Product';
import Cookies from 'js-cookie';

const API_PRODUCTS = process.env.NEXT_PUBLIC_API_PRODUCTOS;

export default function Pedidos() {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('Todo');
    const [searchTerm, setSearchTerm] = useState('');
    const [user, setUser] = useState()



    console.log(cart);
    const id = Cookies.get('id');
    console.log(id);



    const getUser = async (userId) => {
        const API_URL = process.env.NEXT_PUBLIC_API_USER;

        try {
            const response = await fetch(`${API_URL}/${userId}`);

            if (!response.ok) {
                throw new Error(`Error al obtener el usuario: ${response.statusText}`);
            }

            const userData = await response.json();
            return userData; // Devuelve los datos del usuario
        } catch (error) {
            console.error(error);
            return null; // Devuelve null en caso de error
        }
    };



    // Cargar productos al cargar el componente
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch(API_PRODUCTS);
                const data = await res.json();
                setProducts(data);
                setFilteredProducts(data);
                setUser()
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

    // Guardar pedidos en la API
    const saveOrders = async () => {
        console.log('Guardando pedidos', cart);
    };

    return (
        <div className="flex flex-col md:flex-row bg-gray-50 min-h-screen">
            {/* Carrito de Compras */}
            <div className="p-4 bg-gradient-to-r from-amber-900 to-amber-950 shadow-lg rounded-lg mb-4 md:mb-0 md:w-1/4">
                <Cart cart={cart} saveOrders={saveOrders} />
            </div>

            {/* Panel de Productos */}
            <div className="md:w-3/4 p-4">
                <h2 className="text-2xl font-bold mb-4 text-green-700">Productos</h2>

                <div className="mb-4 flex flex-col md:flex-row">
                    <input
                        type="text"
                        placeholder="Buscar..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="px-2 py-1 border border-gray-300 rounded ml-2 focus:outline-none focus:ring-2 focus:ring-green-500"
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
        </div>
    );
}
