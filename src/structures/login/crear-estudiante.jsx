'use client';

import { useState } from 'react';
import Swal from 'sweetalert2';
import ComponentSubirImg from '@/components/subir-imagen';

const API_URL = process.env.NEXT_PUBLIC_API_USER;

const carreras = [
    "ADMINISTRACIÓN", "ADMINISTRACIÓN BANCARIA Y FINANCIERA", "ADMINISTRACIÓN Y GESTIÓN COMERCIAL",
    "ADMINISTRACIÓN Y GESTIÓN DEL TALENTO HUMANO", "ADMINISTRACIÓN Y GESTIÓN PÚBLICA", "ADMINISTRACIÓN Y MARKETING",
    "ADMINISTRACIÓN Y NEGOCIOS INTERNACIONALES", "ADMINISTRACIÓN Y SERVICIOS TURÍSTICOS", "ARQUITECTURA Y DISEÑO DE INTERIORES",
    "ARQUITECTURA Y URBANISMO", "COMUNICACIÓN", "COMUNICACIÓN AUDIOVISUAL EN MEDIOS DIGITALES", "COMUNICACIÓN CORPORATIVA",
    "COMUNICACIÓN Y DISEÑO GRÁFICO", "COMUNICACIÓN Y PERIODISMO", "COMUNICACIÓN Y PUBLICIDAD", "CONTABILIDAD Y FINANZAS",
    "DERECHO", "DISEÑO INDUSTRIAL", "ECONOMÍA", "ECONOMÍA Y NEGOCIOS INTERNACIONALES", "EDUCACIÓN Y GESTIÓN DEL APRENDIZAJE",
    "ENFERMERÍA", "GASTRONOMÍA Y GESTIÓN DE RESTAURANTES", "INGENIERÍA AGROINDUSTRIAL", "INGENIERÍA AMBIENTAL", "INGENIERÍA CIVIL",
    "INGENIERÍA DE MINAS", "INGENIERÍA DE SISTEMAS COMPUTACIONALES", "INGENIERÍA ELECTRÓNICA", "INGENIERÍA EMPRESARIAL",
    "INGENIERÍA GEOLÓGICA", "INGENIERÍA INDUSTRIAL", "INGENIERÍA LOGÍSTICA Y DE TRANSPORTE", "INGENIERÍA MECATRÓNICA",
    "NUTRICIÓN Y DIETÉTICA", "OBSTETRICIA", "PSICOLOGÍA", "TERAPIA FÍSICA Y REHABILITACIÓN"
];

export default function CrearEstudiante({ setShowModal }) {
    const [getUrlImage, setGetUrlImage] = useState('/user.png'); // Imagen por defecto
    const [newStudent, setNewStudent] = useState({
        codEstudiante: '',
        password: '',
        nombre: '',
        carrera: '',
        img: '/user.png',
    });

    // Crear cuenta de estudiante
    const handleCreateAccount = async (e) => {
        e.preventDefault();
        const { codEstudiante, password, nombre, carrera } = newStudent;

        // Validar los campos
        if (codEstudiante.length !== 9 || !/N\d{8}/.test(codEstudiante)) {
            Swal.fire('Error', 'El código de estudiante debe tener 9 caracteres y el formato N00402307', 'error');
            return;
        }

        if (password === codEstudiante) {
            Swal.fire('Error', 'La contraseña no puede ser igual al código de estudiante', 'error');
            return;
        }

        if (nombre.length < 10 || nombre.length > 100) {
            Swal.fire('Error', 'El nombre debe tener entre 10 y 100 caracteres', 'error');
            return;
        }

        if (!carrera) {
            Swal.fire('Error', 'Debe seleccionar una carrera', 'error');
            return;
        }

        // Enviar datos a la API
        try {
            const res = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...newStudent, img: getUrlImage }),
            });

            if (res.ok) {
                Swal.fire('Cuenta Creada', 'Tu cuenta se ha creado exitosamente', 'success');
                setShowModal(false); // Cerrar el modal
            }
        } catch (error) {
            console.error('Error al crear la cuenta', error);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white text-black p-6 rounded-lg w-full max-w-md">
                <h2 className="text-xl font-bold mb-4">Crear Cuenta</h2>
                <form onSubmit={handleCreateAccount} className="space-y-4">
                    <div>
                        <label>Código de Estudiante</label>
                        <input
                            type="text"
                            value={newStudent.codEstudiante}
                            onChange={(e) => setNewStudent({ ...newStudent, codEstudiante: e.target.value })}
                            className="w-full px-4 py-2 rounded-lg"
                            placeholder="Ejemplo: N00402307"
                            required
                        />
                    </div>
                    <div>
                        <label>Contraseña</label>
                        <input
                            type="password"
                            value={newStudent.password}
                            onChange={(e) => setNewStudent({ ...newStudent, password: e.target.value })}
                            className="w-full px-4 py-2 rounded-lg"
                            required
                        />
                    </div>
                    <div>
                        <label>Nombre Completo</label>
                        <input
                            type="text"
                            value={newStudent.nombre}
                            onChange={(e) => setNewStudent({ ...newStudent, nombre: e.target.value })}
                            className="w-full px-4 py-2 rounded-lg"
                            required
                        />
                    </div>
                    <div>
                        <label>Carrera</label>
                        <select
                            value={newStudent.carrera}
                            onChange={(e) => setNewStudent({ ...newStudent, carrera: e.target.value })}
                            className="w-full px-4 py-2 rounded-lg"
                            required
                        >
                            <option value="">Selecciona una carrera</option>
                            {carreras.map((carrera) => (
                                <option key={carrera} value={carrera}>
                                    {carrera}
                                </option>
                            ))}
                        </select>
                    </div>
                    <ComponentSubirImg setGetUrlImage={setGetUrlImage} getUrlImage={getUrlImage} />
                    <div className="flex justify-between">
                        <button
                            type="submit"
                            className="bg-green-500 w-full py-2 rounded-lg hover:bg-green-600 transition duration-300"
                        >
                            Crear Cuenta
                        </button>
                        <button
                            type="button"
                            onClick={() => setShowModal(false)}
                            className="ml-2 bg-red-500 w-full py-2 rounded-lg hover:bg-red-600 transition duration-300"
                        >
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
