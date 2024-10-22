'use client';

import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import ComponentSubirImg from '@/components/subir-imagen';

const API_URL = process.env.NEXT_PUBLIC_API_PRODUCTOS;

const AgregarProductos = () => {
    const [productos, setProductos] = useState([]);
    const [formData, setFormData] = useState({
        nombre: '',
        precio: '',
        description: '',
        categoria: '',
        img: '/cafe.png', // Imagen por defecto
    });
    const [isEditing, setIsEditing] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [uploadingImage, setUploadingImage] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    // Cargar los productos al montar el componente
    useEffect(() => {
        cargarProductos();
    }, []);

    const cargarProductos = async () => {
        setLoading(true);
        try {
            const response = await fetch(API_URL);
            const data = await response.json();
            // Ordenamos los productos por ID de manera descendente
            setProductos(data.sort((a, b) => b.id - a.id));
        } catch (error) {
            console.error('Error al cargar productos:', error);
            Swal.fire('Error', 'Hubo un problema al cargar los productos.', 'error');
        }
        setLoading(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEditing) {
                // Actualizamos el producto en el servidor
                await fetch(`${API_URL}/${formData.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });
                Swal.fire('Producto Actualizado', 'El producto ha sido actualizado correctamente', 'success');
                // Actualizamos el producto directamente en el estado
                setProductos((prevProductos) =>
                    prevProductos.map((producto) =>
                        producto.id === formData.id ? { ...producto, ...formData } : producto
                    )
                );
            } else {
                // Agregamos un nuevo producto
                const response = await fetch(API_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });
                const nuevoProducto = await response.json();
                Swal.fire('Producto Agregado', 'El producto ha sido agregado correctamente', 'success');
                setProductos([nuevoProducto, ...productos]); // Añadir el nuevo producto al inicio
            }
            setShowModal(false);
            resetForm();
        } catch (error) {
            console.error('Error al agregar/editar producto:', error);
            Swal.fire('Error', 'Hubo un problema al guardar el producto.', 'error');
        }
    };

    const eliminarProducto = async (id) => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: 'No podrás revertir esto',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminarlo!',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
                    Swal.fire('Eliminado', 'El producto ha sido eliminado.', 'success');
                    setProductos(productos.filter((producto) => producto.id !== id));
                } catch (error) {
                    console.error('Error al eliminar producto:', error);
                    Swal.fire('Error', 'Hubo un problema al eliminar el producto.', 'error');
                }
            }
        });
    };

    const resetForm = () => {
        setFormData({
            nombre: '',
            precio: '',
            description: '',
            categoria: '',
            img: '/cafe.png', // Reinicia la imagen a la predeterminada
        });
        setIsEditing(false);
    };

    // Función para gestionar la subida de imagen
    const handleImageUpload = (url) => {
        setFormData({ ...formData, img: url });
        setUploadingImage(false); // Desactiva el estado de "cargando" una vez que se ha subido
    };

    // Filtrar productos basados en la búsqueda
    const productosFiltrados = productos.filter((producto) =>
        producto.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        producto.precio.toString().includes(searchTerm) ||
        producto.categoria.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="flex justify-center items-center">
            <div className="w-full max-w-5xl">
                <div className="flex justify-between items-center mb-6">
                    <button
                        onClick={() => {
                            resetForm();
                            setShowModal(true);
                        }}
                        className="bg-indigo-500 text-white px-6 py-3 rounded-lg hover:bg-indigo-600 transition duration-300 ease-in-out mt-10"
                    >
                        + Añadir Producto
                    </button>
                </div>

                {/* Buscador */}
                <div className="flex justify-center my-4">
                    <input
                        type="text"
                        placeholder="Buscar por nombre, precio o categoría"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full max-w-xl px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 bg-gray-100 text-black"
                    />
                </div>

                {showModal && (
                    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50 overflow-y-auto transition-opacity duration-300">
                        <div className="bg-white rounded-lg p-8 w-full max-w-lg space-y-6 h-auto max-h-screen overflow-y-auto">
                            <h2 className="text-2xl font-bold text-center">
                                {isEditing ? 'Editar Producto' : 'Añadir Producto'}
                            </h2>
                            <form onSubmit={handleSubmit} className="space-y-4">
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
                                </div>

                                <div>
                                    <label className="block text-gray-700 font-semibold mb-2">Precio (S/):</label>
                                    <input
                                        type="number"
                                        name="precio"
                                        value={formData.precio}
                                        onChange={handleChange}
                                        min="0"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-green-500 transition duration-300"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-gray-700 font-semibold mb-2">Descripción:</label>
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-green-500 transition duration-300"
                                        required
                                    ></textarea>
                                </div>

                                <div>
                                    <label className="block text-gray-700 font-semibold mb-2">Categoría:</label>
                                    <select
                                        name="categoria"
                                        value={formData.categoria}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-green-500 transition duration-300"
                                        required
                                    >
                                        <option value="">Selecciona una categoría</option>
                                        <option value="Snacks">Snacks</option>
                                        <option value="Jugos">Jugos</option>
                                        <option value="Bebidas">Bebidas</option>
                                        <option value="Otras Bebidas">Otras Bebidas</option>
                                        <option value="Sandwiches">Sandwiches</option>
                                        <option value="Menú">Menú</option>
                                        <option value="A la carta">A la carta</option>
                                    </select>
                                </div>

                                <div>
                                    {uploadingImage ? (
                                        <p>Cargando imagen...</p>
                                    ) : (
                                        <ComponentSubirImg
                                            setGetUrlImage={(url) => handleImageUpload(url)}
                                            getUrlImage={formData.img}
                                            setUploading={setUploadingImage} // Esto activará el estado de "subiendo"
                                        />
                                    )}
                                </div>

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
                                            resetForm();
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

                <div className="min-h-20 bg-gray-50 py-10 p-10">
                    <h2 className="text-3xl font-bold mb-6 text-center text-gray-800 font-serif tracking-wide">
                        Lista de Productos
                    </h2>

                    {loading ? (
                        <div className="flex justify-center items-center">
                            <p className="text-xl font-semibold text-gray-700">Cargando...</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-6">
                            {productosFiltrados.map((producto) => (
                                <div
                                    key={producto.id}
                                    className="bg-white shadow-lg rounded-lg p-6 flex flex-col justify-between hover:shadow-xl transition-shadow duration-300 ease-in-out max-w-sm mx-auto"
                                >
                                    <div className="mb-4">
                                        <p className="text-xl font-semibold text-brown-700 text-center font-serif tracking-wide">
                                            {producto.nombre}
                                        </p>
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
                                        <p className="text-gray-600 text-center">Categoría: {producto.categoria}</p>
                                    </div>
                                    <div className="flex justify-center space-x-4">
                                        <button
                                            onClick={() => {
                                                setFormData(producto);
                                                setIsEditing(true);
                                                setShowModal(true);
                                            }}
                                            className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition duration-300"
                                        >
                                            Editar
                                        </button>
                                        <button
                                            onClick={() => eliminarProducto(producto.id)}
                                            className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition duration-300"
                                        >
                                            Eliminar
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AgregarProductos;
