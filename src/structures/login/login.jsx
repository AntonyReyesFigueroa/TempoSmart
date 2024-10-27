'use client';

import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import CrearEstudiante from './crear-estudiante';
import LoginAdministrador from './login-administrador';

const API_URL = process.env.NEXT_PUBLIC_API_USER;

export default function Login() {
    const [codEstudiante, setCodEstudiante] = useState('');
    const [password, setPassword] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [isAdminModal, setIsAdminModal] = useState(false);
    const [users, setUsers] = useState([]); // Almacena la información de todos los usuarios
    const router = useRouter();

    // Cargar la información de los usuarios al cargar la página
    const fetchUsers = async () => {
        try {
            const res = await fetch(API_URL);
            const data = await res.json();
            setUsers(data); // Guardar usuarios en el estado
        } catch (error) {
            console.error('Error al cargar los usuarios', error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    // Validación de ingreso para estudiantes
    const handleLogin = async (e) => {
        e.preventDefault();

        const user = users.find(
            (user) => user.codEstudiante === codEstudiante && user.password === password
        );

        if (user) {
            Swal.fire('Bienvenido', 'Ingreso exitoso', 'success');
            Cookies.set('tipo_usuario', 'estudiante');
            Cookies.set('id', user.id); // Guardar el ID del usuario en cookie
            router.push('/pedidos');
        } else {
            Swal.fire('Error', 'Contraseña o código de estudiante incorrecto. Vuelve a intentarlo.', 'error');
        }
    };

    // Recargar usuarios después de crear una cuenta
    const handleModalClose = () => {
        setShowModal(false);
        fetchUsers(); // Recargar usuarios al cerrar el modal
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-900">
            <div className="bg-gray-800 text-white p-8 rounded-lg w-full max-w-lg">
                <h2 className="text-3xl font-bold mb-4 text-center">Iniciar Sesión</h2>

                {/* Formulario de Estudiantes */}
                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="block text-sm">Código de Estudiante</label>
                        <input
                            type="text"
                            value={codEstudiante}
                            onChange={(e) => setCodEstudiante(e.target.value)}
                            className="w-full px-4 py-2 text-black rounded-lg"
                            placeholder="Ejemplo: N00402307"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm">Contraseña</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 text-black rounded-lg"
                            placeholder="Ingresa tu contraseña"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 w-full py-2 rounded-lg hover:bg-blue-600 transition duration-300"
                    >
                        Ingresar
                    </button>
                </form>

                {/* Opción para crear una cuenta */}
                <div className="mt-4 text-center">
                    <button
                        onClick={() => setShowModal(true)}
                        className="text-blue-400 underline"
                    >
                        Crear Cuenta
                    </button>
                </div>

                {/* Modal para crear cuenta de estudiante */}
                {showModal && (
                    <CrearEstudiante
                        setShowModal={handleModalClose}
                    />
                )}

                {/* Modal de administrador */}
                <div className="mt-4 text-center">
                    <button
                        onClick={() => setIsAdminModal(true)}
                        className="text-yellow-400 underline"
                    >
                        Ingresar como Administrador
                    </button>
                </div>

                {isAdminModal && (
                    <LoginAdministrador
                        setIsAdminModal={setIsAdminModal}
                    />
                )}
            </div>
        </div>
    );
}
