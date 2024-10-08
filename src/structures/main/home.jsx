'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { FaShoppingCart } from 'react-icons/fa'
import Link from 'next/link'

const Home = () => {
    return (
        <div className="bg-[#3E2723] text-white min-h-screen">
            {/* Hero Section */}
            <section className="relative h-screen flex flex-col justify-center items-center text-center px-4 md:px-0">
                {/* Logo TempoSmart */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1 }}
                >
                    <Image
                        src="/cafe.png" // Ruta del ícono TempoSmart
                        alt="TempoSmart"
                        width={200}  // Ajusta el tamaño del ícono según necesites
                        height={200}
                        className="rounded-full mb-6"
                    />
                </motion.div>

                <motion.h1
                    className="text-4xl md:text-6xl font-bold mb-6"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                >
                    ¡Bienvenidos a <span className="text-yellow-400">TempoSmart</span>!
                </motion.h1>
                <motion.p
                    className="text-lg md:text-xl mb-12"
                    initial={{ opacity: 0, x: -100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1 }}
                >
                    Saborea el mejor café y nuestros deliciosos postres.
                </motion.p>

                {/* Botón de comprar */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                >
                    <Link href="/pedidos">
                        <button className="px-6 py-3 bg-yellow-400 text-brown-800 rounded-lg text-lg font-semibold shadow-lg hover:bg-yellow-300 hover:scale-105 transition-transform duration-300">
                            ¡Compra Aquí! <FaShoppingCart className="inline-block ml-2" />
                        </button>
                    </Link>
                </motion.div>
            </section>

            {/* Sección de Productos */}
            <section className="py-5 px-4 md:px-0">
                <div className="container mx-auto">
                    <h2 className="text-4xl font-bold text-center mb-12 text-yellow-400">Nuestros Productos</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {/* Producto 1 */}
                        <motion.div
                            className="bg-white text-black p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300"
                            whileHover={{ scale: 1.05 }}
                        >
                            <Image
                                src="/cafe1.jpg" // Cambia por la ruta de tu imagen
                                alt="Café Espresso"
                                width={300}
                                height={200}
                                className="rounded-lg mb-4 mt-4 m-auto"
                            />
                            <h3 className="text-2xl font-semibold">Café Espresso</h3>
                            <p className="text-gray-700">Un delicioso café para comenzar el día.</p>
                            <Link href="/pedidos">
                                <button className="mt-4 px-4 py-2 bg-yellow-400 text-brown-800 rounded hover:bg-yellow-300 transition duration-300">
                                    Comprar Aquí
                                </button>
                            </Link>
                        </motion.div>

                        {/* Producto 2 */}
                        <motion.div
                            className="bg-white text-black p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300"
                            whileHover={{ scale: 1.05 }}
                        >
                            <Image
                                src="/cafe2.jpg" // Cambia por la ruta de tu imagen
                                alt="Latte Vainilla"
                                width={300}
                                height={200}
                                className="rounded-lg mb-4  mt-4 m-auto"
                            />
                            <h3 className="text-2xl font-semibold">Latte Vainilla</h3>
                            <p className="text-gray-700">Disfruta del toque suave y dulce de la vainilla.</p>
                            <Link href="/pedidos">
                                <button className="mt-4 px-4 py-2 bg-yellow-400 text-brown-800 rounded hover:bg-yellow-300 transition duration-300">
                                    Comprar Aquí
                                </button>
                            </Link>
                        </motion.div>

                        {/* Producto 3 */}
                        <motion.div
                            className="bg-white text-black p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300"
                            whileHover={{ scale: 1.05 }}
                        >
                            <Image
                                src="/postre1.jpg" // Cambia por la ruta de tu imagen
                                alt="Postre Tres Leches"
                                width={300}
                                height={200}
                                className="rounded-lg mb-4  mt-4 m-auto"
                            />
                            <h3 className="text-2xl font-semibold">Postre Tres Leches</h3>
                            <p className="text-gray-700">Un clásico dulce que siempre encanta.</p>
                            <Link href="/pedidos">
                                <button className="mt-4 px-4 py-2 bg-yellow-400 text-brown-800 rounded hover:bg-yellow-300 transition duration-300">
                                    Comprar Aquí
                                </button>
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Home
