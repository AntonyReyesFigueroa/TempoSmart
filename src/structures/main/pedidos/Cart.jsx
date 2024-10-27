'use client';

const API_URL = process.env.NEXT_PUBLIC_API_USER;

// Función para actualizar el usuario en la API
const updateUser = async (userId, userData) => {
    try {
        const response = await fetch(`${API_URL}/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        if (!response.ok) {
            throw new Error(`Error al actualizar el usuario: ${response.statusText}`);
        }

        const updatedUser = await response.json();
        return updatedUser; // Devuelve los datos actualizados del usuario
    } catch (error) {
        console.error(error);
        return null; // Devuelve null en caso de error
    }
};

export default function Cart({ cart, user, setCart }) {
    const totalPrice = cart.reduce((total, item) => total + item.precio * item.cantidad, 0);

    const handleConfirmOrder = async () => {
        const userId = user.id; // Obtén el ID del usuario

        // Prepara los datos para actualizar
        const updatedUserData = {
            ...user,
            pedido: [...user.pedido, { // Agrega el nuevo pedido al arreglo existente
                fecha: new Date().toLocaleDateString(),
                hora: new Date().toLocaleTimeString(),
                precioTotal: totalPrice,
                estado: 'Sin entregar',
                cancelado: 'No',
                consumo: cart.map(item => ({
                    producto: item.nombre,
                    cantidad: item.cantidad,
                    precio: item.precio,
                })),
            }],
        };

        const updatedUser = await updateUser(userId, updatedUserData);

        if (updatedUser) {
            // console.log('Usuario actualizado con éxito', updatedUser);
            setCart([]); // Limpiar el carrito después de confirmar el pedido
        } else {
            console.error('No se pudo actualizar el usuario.');
        }
    };

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
                        onClick={handleConfirmOrder}
                        className="mt-2 w-full bg-blue-800 text-white py-2 rounded hover:bg-blue-700 transition duration-300"
                    >
                        Confirmar Pedido
                    </button>
                </>
            )}
        </div>
    );
}
