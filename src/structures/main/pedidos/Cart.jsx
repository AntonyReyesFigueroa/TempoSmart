'use client'

import Swal from 'sweetalert2';

export default function Cart({ cart, saveOrders }) {
    const totalPrice = cart.reduce((total, item) => total + item.precio * item.cantidad, 0);

    return (
        <div>
            {cart.length === 0 ? (
                <p>No hay productos en el carrito.</p>
            ) : (
                <>
                    <ul>
                        {cart.map(item => (
                            <li key={item.id} className="flex justify-between">
                                {item.nombre} - {item.cantidad} x ${item.precio}
                            </li>
                        ))}
                    </ul>
                    <h3 className="font-bold mt-4">Total: ${totalPrice}</h3>
                    <button onClick={saveOrders} className="mt-2 w-full bg-green-500 text-white py-1 rounded">
                        Confirmar Pedido
                    </button>
                </>
            )}
        </div>
    );
}
