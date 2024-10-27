'use client';

import { useState } from 'react';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

export default function LoginAdministrador({ setIsAdminModal }) {
    const [adminUser, setAdminUser] = useState('');
    const [adminPassword, setAdminPassword] = useState('');
    const router = useRouter();

    const handleAdminLogin = (e) => {
        e.preventDefault();

        const adminAccounts = [
            { user: 'antonyreyes', password: 'qwert' },
            { user: 'esmeupn', password: 'esmeupn@' },
            { user: 'admin071213', password: '071213@' },
        ];

        const isAdmin = adminAccounts.some(
            (account) => account.user === adminUser && account.password === adminPassword
        );

        if (isAdmin) {
            Swal.fire('Bienvenido', 'Ingreso exitoso como administrador', 'success');
            Cookies.set('tipo_usuario', 'administrador');
            setIsAdminModal(false); // Cerrar el modal de administrador
            router.push('/agregar-productos'); // Redirigir a la página de reservas
        } else {
            Swal.fire('Error', 'Ingreso denegado. Verifica tu usuario y contraseña.', 'error');
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white text-black p-8 rounded-lg w-full max-w-md shadow-lg">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Modo Administrador</h2>
                <form onSubmit={handleAdminLogin} className="space-y-6">
                    <div>
                        <label className="block text-lg font-semibold text-gray-700 mb-2">Usuario</label>
                        <input
                            type="text"
                            value={adminUser}
                            onChange={(e) => setAdminUser(e.target.value)}
                            className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-gray-700"
                            placeholder="Ingresa tu usuario"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-lg font-semibold text-gray-700 mb-2">Contraseña</label>
                        <input
                            type="password"
                            value={adminPassword}
                            onChange={(e) => setAdminPassword(e.target.value)}
                            className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-gray-700"
                            placeholder="Ingresa tu contraseña"
                            required
                        />
                    </div>
                    <div className="flex justify-between items-center mt-4">
                        <button
                            type="submit"
                            className="w-1/2 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-all duration-300"
                        >
                            Ingresar
                        </button>
                        <button
                            type="button"
                            onClick={() => setIsAdminModal(false)}
                            className="w-1/2 bg-red-500 text-white py-2 ml-4 rounded-lg hover:bg-red-600 transition-all duration-300"
                        >
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
