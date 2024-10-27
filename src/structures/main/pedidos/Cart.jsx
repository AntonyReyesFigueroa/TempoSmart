'use client'

import Swal from 'sweetalert2';

export default function Cart({ cart, saveOrders }) {
    const totalPrice = cart.reduce((total, item) => total + item.precio * item.cantidad, 0);

    return (
        <div className="bg-white p-4 rounded-lg shadow-md">
            {cart.length === 0 ? (
                <p className="text-center text-gray-600">No hay productos en el carrito.</p>
            ) : (
                <>
                    <h3 className="font-bold text-lg mb-2">Productos en el Carrito</h3>
                    <ul className="max-h-64 overflow-y-auto">
                        {cart.map(item => (
                            <li key={item.id} className="flex justify-between py-2 border-b border-gray-300">
                                <span>{item.nombre} - {item.cantidad} x s/ {item.precio}</span>
                                <span>s/ {item.precio * item.cantidad}</span>
                            </li>
                        ))}
                    </ul>
                    <h3 className="font-bold mt-4">Total: s/{totalPrice}</h3>
                    <button
                        onClick={saveOrders}
                        className="mt-2 w-full bg-blue-800 text-white py-2 rounded hover:bg-blue-700 transition duration-300"
                    >
                        Confirmar Pedido
                    </button>
                </>
            )}
        </div>
    );
}
