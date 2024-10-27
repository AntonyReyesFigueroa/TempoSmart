'use client';

import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

const API_URL = process.env.NEXT_PUBLIC_API_USER;

export default function StudentReservations() {
    const [student, setStudent] = useState(null);
    const userId = Cookies.get('id'); // Suponiendo que tienes la cookie de ID

    useEffect(() => {
        const fetchStudentData = async () => {
            try {
                const response = await fetch(`${API_URL}/${userId}`);
                const data = await response.json();
                setStudent(data);
            } catch (error) {
                console.error('Error fetching student data:', error);
            }
        };

        fetchStudentData();
    }, [userId]);

    return (
        <div className="p-4">
            {student ? (
                <div className="border p-4 rounded shadow-lg mb-4 bg-gray-50">
                    <h2 className="font-bold text-xl mb-2">{student.nombre} ({student.codEstudiante})</h2>
                    {student.pedido.length > 0 ? (
                        student.pedido.map((order, index) => {
                            let orderClass = "border-l-4 p-2 my-2 transition-transform duration-300 ";
                            let backgroundColor = "";
                            let textColor = "text-black";

                            // Determinar el color de fondo y borde según el estado y cancelado
                            if (order.estado === 'Entregado' && order.cancelado === 'Sí') {
                                orderClass += "border-blue-500 bg-blue-100"; // Azul
                            } else if (order.estado === 'Sin entregar' && order.cancelado === 'Sí') {
                                orderClass += "border-yellow-500 bg-yellow-100"; // Amarillo
                            } else if (order.estado === 'Sin entregar' && order.cancelado === 'No') {
                                orderClass += "border-red-500 bg-red-100"; // Rojo
                            } else if (order.estado === 'Entregado' && order.cancelado === 'No') {
                                orderClass += "border-yellow-500 bg-yellow-100"; // Amarillo
                            }

                            return (
                                <div key={index} className={orderClass}>
                                    <p className={textColor}><strong>Pedido:</strong> {order.fecha} a las {order.hora}</p>
                                    <p className={textColor}><strong>Total:</strong> s/{order.precioTotal}</p>
                                    <p className={textColor}><strong>Estado:</strong> {order.estado}</p>
                                    <p className={textColor}><strong>Cancelado:</strong> {order.cancelado}</p>
                                    <p className={textColor}><strong>Consumo:</strong> {order.consumo.map(item => `${item.producto} (x${item.cantidad})`).join(', ')}</p>
                                </div>
                            );
                        })
                    ) : (
                        <p className="text-red-600">No hay pedidos para este estudiante.</p>
                    )}
                </div>
            ) : (
                <p className="text-gray-600">Cargando información del estudiante...</p>
            )}
        </div>
    );
}
