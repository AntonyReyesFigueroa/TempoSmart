'use client';

import React from 'react';

const Contacto = () => {
    const handleCall = () => {
        window.open('tel:+1234567890'); // Cambia el número por el tuyo
    };

    const handleEmail = () => {
        window.open('mailto:example@example.com'); // Cambia el correo por el tuyo
    };

    const handleYape = () => {
        // Agregar lógica para Yape si es necesario
        alert('Escanea el código de Yape para realizar el pago.');
    };

    return (
        <div className="container mx-auto p-4 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-brown-700">Contacto Profesional</h2>

            <div className="mb-4">
                <h3 className="font-semibold">Llamadas</h3>
                <button onClick={handleCall} className="text-blue-500 hover:underline">
                    Llamar +1234567890
                </button>
            </div>

            <div className="mb-4">
                <h3 className="font-semibold">Correo Electrónico</h3>
                <button onClick={handleEmail} className="text-blue-500 hover:underline">
                    Enviar Correo
                </button>
            </div>

            <div className="mb-4">
                <h3 className="font-semibold">Pagos con Yape</h3>
                <button onClick={handleYape} className="text-blue-500 hover:underline">
                    Realizar Pago con Yape
                </button>
            </div>

            <div className="mb-4">
                <h3 className="font-semibold">Redes Sociales</h3>
                <div className="flex space-x-4">
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                        Facebook
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                        Twitter
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                        Instagram
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Contacto;
