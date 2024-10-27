import React from 'react';

export default function OrderCard({ order }) {
    const { fecha, hora, precioTotal, estado, cancelado, consumo } = order;

    // Definir color según el estado
    const getStatusColor = () => {
        if (estado === 'Sin entregar' || cancelado === 'No') return 'bg-red-500';
        if (estado === 'Entregado' && cancelado === 'Si') return 'bg-blue-500';
        if (cancelado === 'Si') return 'bg-yellow-500';
        return '';
    };

    return (
        <div className={`p-4 rounded shadow mb-2 ${getStatusColor()}`}>
            <h3 className="font-semibold">Pedido: {fecha} a las {hora}</h3>
            <p>Total: s/{precioTotal}</p>
            <p>Estado: {estado}</p>
            <p>Cancelado: {cancelado}</p>
            <h4>Consumo:</h4>
            <ul>
                {consumo.map((item, index) => (
                    <li key={index}>{item.producto} - Cantidad: {item.cantidad} a s/{item.precio}</li>
                ))}
            </ul>
        </div>
    );
}
