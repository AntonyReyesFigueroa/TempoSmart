'use client';

import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const API_URL = process.env.NEXT_PUBLIC_API_USER;

export default function AdminReservations() {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await fetch(API_URL);
                const data = await res.json();
                // Filtrar usuarios con pedidos
                const usersWithOrders = data.filter(user => user.pedido.length > 0);
                setUsers(usersWithOrders);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    const updateOrder = async (userId, updatedData) => {
        try {
            const res = await fetch(`${API_URL}/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedData),
            });

            if (res.ok) {
                const updatedUser = await res.json();
                setUsers(prevUsers =>
                    prevUsers.map(user => (user.id === userId ? updatedUser : user))
                );
                Swal.fire('Actualizado', 'El pedido ha sido actualizado', 'success');
            } else {
                Swal.fire('Error', 'No se pudo actualizar el pedido', 'error');
            }
        } catch (error) {
            console.error('Error updating order:', error);
        }
    };

    // Función para eliminar un pedido individualmente
    const deleteOrder = async (userId, order) => {
        try {
            const userToUpdate = users.find(user => user.id === userId);
            const updatedOrders = userToUpdate.pedido.filter(p => p.fecha !== order.fecha || p.hora !== order.hora);
            const res = await fetch(`${API_URL}/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...userToUpdate, pedido: updatedOrders }),
            });

            if (res.ok) {
                const updatedUser = await res.json();
                setUsers(prevUsers =>
                    prevUsers.map(user => (user.id === userId ? updatedUser : user))
                );
                Swal.fire('Eliminado', 'El pedido ha sido eliminado', 'success');
            } else {
                Swal.fire('Error', 'No se pudo eliminar el pedido', 'error');
            }
        } catch (error) {
            console.error('Error deleting order:', error);
        }
    };

    // Función para filtrar usuarios por nombre o código
    const filteredUsers = users.filter(user =>
        user.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.codEstudiante.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-4">
            <h1 className="text-3xl font-bold mb-4">Reservas</h1>
            <input
                type="text"
                placeholder="Buscar por nombre o código..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="mb-4 p-2 border border-gray-300 rounded"
            />
            {filteredUsers.length === 0 ? (
                <p>No hay usuarios con pedidos.</p>
            ) : (
                filteredUsers.map(user => (
                    <div key={user.id} className="border rounded-lg shadow-lg p-4 bg-white mb-4">
                        <h2 className="font-bold text-xl">{user.nombre} (COD: {user.codEstudiante})</h2>
                        <h2 className="font-bold text-lg">Carrera: {user.carrera}</h2>
                        {user.pedido.map(order => {
                            let orderClass = "p-4 my-2 rounded-lg transition-transform duration-300 ";

                            // Determinar el color de fondo según el estado y cancelado
                            if (order.estado === 'Entregado' && order.cancelado === 'Sí') {
                                orderClass += "bg-blue-200 border border-blue-500"; // Color azul
                            } else if (order.estado === 'Sin entregar' && order.cancelado === 'Sí') {
                                orderClass += "bg-yellow-200 border border-yellow-500"; // Color amarillo
                            } else if (order.estado === 'Sin entregar' && order.cancelado === 'No') {
                                orderClass += "bg-red-200 border border-red-500"; // Color rojo
                            } else if (order.estado === 'Entregado' && order.cancelado === 'No') {
                                orderClass += "bg-yellow-200 border border-yellow-500"; // Color amarillo
                            }

                            return (
                                <div key={`${order.fecha}-${order.hora}`} className={orderClass}>
                                    <p><strong>Pedido:</strong> {order.fecha} a las {order.hora}</p>
                                    <p><strong>Total:</strong> s/{order.precioTotal}</p>
                                    <p><strong>Estado:</strong>
                                        <select
                                            value={order.estado}
                                            onChange={e => updateOrder(user.id, { ...user, pedido: user.pedido.map(o => o.fecha === order.fecha && o.hora === order.hora ? { ...o, estado: e.target.value } : o) })}
                                            className="ml-2 p-1 border rounded"
                                        >
                                            <option value="Sin entregar">Sin entregar</option>
                                            <option value="Entregado">Entregado</option>
                                        </select>
                                    </p>
                                    <p><strong>Cancelado:</strong>
                                        <select
                                            value={order.cancelado}
                                            onChange={e => updateOrder(user.id, { ...user, pedido: user.pedido.map(o => o.fecha === order.fecha && o.hora === order.hora ? { ...o, cancelado: e.target.value } : o) })}
                                            className="ml-2 p-1 border rounded"
                                        >
                                            <option value="No">No</option>
                                            <option value="Sí">Sí</option>
                                        </select>
                                    </p>
                                    <p><strong>Consumo:</strong> {order.consumo.map(item => `${item.producto} (x${item.cantidad})`).join(', ')}</p>
                                    <button
                                        onClick={() => deleteOrder(user.id, order)}
                                        className="mt-2 bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 transition duration-300"
                                    >
                                        Eliminar Pedido
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                ))
            )}
        </div>
    );
}
