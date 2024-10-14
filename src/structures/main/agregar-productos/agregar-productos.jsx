'use client';

import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import ComponentSubirImg from '@/components/subir-imagen';

const AgregarProductos = () => {
    const [productos, setProductos] = useState([]);
    const [formData, setFormData] = useState({
        nombre: '',
        precio: '',
        description: '',  // Nuevo campo descripción
        img: '/cafe.png',  // Imagen por defecto
    });
    const [message, setMessage] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentProducto, setCurrentProducto] = useState(null);

    const apiUrl = process.env.NEXT_PUBLIC_API_PRODUCTOS;

    // Manejar los cambios en los inputs
    const handleChange = (e) => {
        const { name, value } = e.target;

        // Limitar la cantidad de caracteres en nombre y descripción
        if (name === 'nombre' && value.length > 50) return;
        if (name === 'description' && value.length > 300) return;

        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Validar los campos del formulario
    const validarCampos = () => {
        if (formData.nombre.length < 3 || formData.nombre.length > 50) {
            Swal.fire('Error', 'El nombre debe tener entre 3 y 50 caracteres', 'error');
            return false;
        }

        if (formData.description.length < 5 || formData.description.length > 300) {
            Swal.fire('Error', 'La descripción debe tener entre 5 y 300 caracteres', 'error');
            return false;
        }

        const precioNumero = parseFloat(formData.precio);
        if (isNaN(precioNumero) || precioNumero <= 0 || precioNumero >= 100) {
            Swal.fire('Error', 'El precio debe ser un número entre 0 y 100', 'error');
            return false;
        }

        if (!formData.img) {
            Swal.fire('Error', 'Debes subir una imagen del producto', 'error');
            return false;
        }

        return true;
    };

    // Enviar el producto a la API de Google Apps Script
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validarCampos()) return;

        setMessage('Enviando...');

        try {
            // Convertir los datos del formulario a formato URL-encoded
            const formDataString = Object.keys(formData)
                .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(formData[key])}`)
                .join('&');

            const response = await fetch(apiUrl, {
                method: 'POST',
                body: formDataString,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                },
            });

            if (response.ok) {
                Swal.fire('Producto agregado', '', 'success');
                setMessage('Producto agregado exitosamente');
                setFormData({
                    nombre: '',
                    precio: '',
                    description: '',
                    img: '/cafe.png',  // Restablecer la imagen por defecto
                });
                setShowModal(false);  // Cerrar el modal
                fetchProductos();  // Refrescar la lista de productos
            } else {
                throw new Error('Error en el envío');
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage('Error al agregar el producto. Verifica la conexión o la URL.');
        }
    };

    // Función para obtener la lista de productos (GET)
    const fetchProductos = async () => {
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            setProductos(data);
        } catch (error) {
            console.error('Error al obtener los productos:', error);
            Swal.fire('Error', 'No se pudo obtener la lista de productos', 'error');
        }
    };

    useEffect(() => {
        fetchProductos();
    }, []);

    return (
        <div className="flex justify-center items-center min-h-screen ">
            <div className="w-full max-w-5xl">
                {/* Botón para abrir el modal */}
                <div className="flex justify-between items-center mb-6">
                    <button
                        onClick={() => setShowModal(true)}
                        className="bg-indigo-500 text-white px-6 py-3 rounded-lg hover:bg-indigo-600 transition duration-300 ease-in-out mt-10"
                    >
                        + Añadir Producto
                    </button>
                </div>

                {/* Modal para agregar/editar productos */}
                {showModal && (
                    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50 overflow-y-auto transition-opacity duration-300">
                        <div className="bg-white rounded-lg p-8 w-full max-w-lg space-y-6 h-auto max-h-screen overflow-y-auto">
                            <h2 className="text-2xl font-bold text-center">{isEditing ? 'Editar Producto' : 'Añadir Producto'}</h2>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                {/* Nombre del Producto */}
                                <div>
                                    <label className="block text-gray-700 font-semibold mb-2">Nombre del Producto:</label>
                                    <input
                                        type="text"
                                        name="nombre"
                                        value={formData.nombre}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-green-500 transition duration-300"
                                        required
                                    />
                                    <small className="text-gray-500">{formData.nombre.length}/50</small>
                                </div>

                                {/* Precio del Producto */}
                                <div>
                                    <label className="block text-gray-700 font-semibold mb-2">Precio (S/):</label>
                                    <input
                                        type="number"
                                        name="precio"
                                        value={formData.precio}
                                        onChange={handleChange}
                                        min="0"
                                        max="100"
                                        step="0.01"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-green-500 transition duration-300"
                                        required
                                    />
                                </div>

                                {/* Descripción del Producto */}
                                <div>
                                    <label className="block text-gray-700 font-semibold mb-2">Descripción:</label>
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-green-500 transition duration-300"
                                        required
                                    ></textarea>
                                    <small className="text-gray-500">{formData.description.length}/300</small>
                                </div>

                                {/* Subir imagen del Producto */}
                                <div>
                                    <ComponentSubirImg setGetUrlImage={(url) => setFormData({ ...formData, img: url })} getUrlImage={formData.img} />
                                </div>

                                {/* Botones de enviar y cancelar */}
                                <div className="flex justify-center space-x-4">
                                    <button
                                        type="submit"
                                        className="bg-indigo-500 text-white px-6 py-3 rounded-lg hover:bg-indigo-600 transition duration-300 ease-in-out"
                                    >
                                        {isEditing ? 'Actualizar' : 'Agregar'}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setShowModal(false);
                                            setFormData({
                                                nombre: '',
                                                precio: '',
                                                description: '',
                                                img: '/cafe.png',
                                            });
                                        }}
                                        className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition duration-300 ease-in-out"
                                    >
                                        Cancelar
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Lista de productos */}
                <div className="min-h-20 bg-gray-50 py-10 p-10">
                    <h2 className="text-3xl font-bold mb-6 text-center text-gray-800 font-serif tracking-wide">Lista de Productos</h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-6">
                        {productos.map((producto) => (
                            <div
                                key={producto.id}
                                className="bg-white shadow-lg rounded-lg p-6 flex flex-col justify-between hover:shadow-xl transition-shadow duration-300 ease-in-out max-w-sm mx-auto"
                            >
                                <div className="mb-4">
                                    <p className="text-xl font-semibold text-brown-700 text-center font-serif tracking-wide">{producto.nombre}</p>
                                    <div className="flex justify-center items-center mb-5">
                                        <img
                                            src={producto.img}
                                            alt={producto.nombre}
                                            className="rounded-md object-cover"
                                            style={{ width: '100%', height: '200px' }}
                                        />
                                    </div>

                                    <p className="text-gray-600 text-center">Descripción: {producto.description}</p>
                                    <p className="text-gray-600 text-center">Precio: S/{producto.precio}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AgregarProductos;

