'use client'

import { useState } from 'react';

export default function Product({ product, addToCart }) {
    const [quantity, setQuantity] = useState(1);

    return (
        <div className="border border-gray-300 rounded-lg p-4 hover:shadow-lg transition-shadow duration-300 bg-white">
            <img src={product.img} alt={product.nombre} className="w-full h-40 object-cover mb-2 rounded" />
            <h3 className="font-semibold text-lg">{product.nombre}</h3>
            <p className="text-green-600 font-bold">Precio: s/ {product.precio}</p>
            <p className="text-gray-600">Categoría: {product.categoria}</p>
            <div className="flex items-center mt-2">
                <button
                    onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
                    className="px-2 py-1 border border-green-500 text-green-500 rounded hover:bg-green-500 hover:text-white transition duration-300"
                >
                    -
                </button>
                <span className="mx-2">{quantity}</span>
                <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-2 py-1 border border-green-500 text-green-500 rounded hover:bg-green-500 hover:text-white transition duration-300"
                >
                    +
                </button>
            </div>
            <button
                onClick={() => addToCart(product, quantity)}
                className="mt-2 w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition duration-300"
            >
                Añadir al Carrito
            </button>
        </div>
    );
}
