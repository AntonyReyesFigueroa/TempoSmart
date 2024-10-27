'use client';

import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import StudentReservations from './StudentReservations';
import AdminReservations from './AdminReservations';

const API_URL = process.env.NEXT_PUBLIC_API_USER;

export default function Reserva() {
    const [userType, setUserType] = useState(null);

    useEffect(() => {
        const userTypeCookie = Cookies.get('tipo_usuario');
        if (userTypeCookie) {
            setUserType(userTypeCookie);
        }
    }, []);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold text-center mb-4">Reservas</h1>
            {userType === 'administrador' ? (
                <AdminReservations />
            ) : userType === 'estudiante' ? (
                <StudentReservations />
            ) : (
                <div className="text-center text-gray-500">Por favor, inicia sesión para ver tus reservas.</div>
            )}
        </div>
    );
}
