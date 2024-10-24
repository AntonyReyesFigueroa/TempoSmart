'use client'

import { useState } from 'react';

export default function Product({ product, addToCart }) {
    const [quantity, setQuantity] = useState(1);

    return (
        <div className="border border-gray-300 rounded p-4">
            <img src={product.img} alt={product.nombre} className="w-full h-32 object-cover mb-2 rounded" />
            <h3 className="font-semibold">{product.nombre}</h3>
            <p>Precio: ${product.precio}</p>
            <p>Categoría: {product.categoria}</p>
            <div className="flex items-center mt-2">
                <button onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)} className="px-2 py-1 border">-</button>
                <span className="mx-2">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="px-2 py-1 border">+</button>
            </div>
            <button onClick={() => addToCart(product, quantity)} className="mt-2 w-full bg-blue-500 text-white py-1 rounded">
                Añadir al Carrito
            </button>
        </div>
    );
}
