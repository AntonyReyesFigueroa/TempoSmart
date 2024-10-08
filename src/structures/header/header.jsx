'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import Cookies from 'js-cookie'

const Header = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    // Check if the user is logged in based on cookie
    useEffect(() => {
        const sessionCookie = Cookies.get('session');
        if (sessionCookie) {
            setIsLoggedIn(true);
        }
    }, []);

    const handleLogin = () => {
        Cookies.set('session', 'active', { expires: 7 });  // Set a cookie that expires in 7 days
        setIsLoggedIn(true);
    };

    const handleLogout = () => {
        Cookies.remove('session');  // Remove the cookie
        setIsLoggedIn(false);
    };

    // Reference for animations when the header comes into view
    const headerRef = useRef(null);
    const isInView = useInView(headerRef);

    return (
        <>
            {/* Header */}
            <motion.header
                ref={headerRef}
                initial={{ opacity: 0, y: -50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}} // Header animates when in view
                transition={{ duration: 0.5 }}
                className="sticky top-0 left-0 w-full bg-white text-brown-700 shadow-lg z-50"
                style={{ height: '80px' }}  // Asegura que ocupe espacio
            >
                <div className="container mx-auto flex justify-between items-center p-4">
                    {/* Logo */}
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={isInView ? { scale: 1, opacity: 1 } : {}}
                        transition={{ duration: 0.5 }}
                    >
                        <Link href="/">
                            <Image
                                src="/TempoSmart.png" // Ruta del logo en alta resolución
                                alt="TempoSmart Cafetería"
                                width={80}
                                height={80}
                                className='rounded-full object-cover'
                            />
                        </Link>
                    </motion.div>

                    {/* Title */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        <Link href="/" className="text-3xl font-serif mx-4 text-brown-800 font-bold">
                            TempoSmart
                        </Link>
                    </motion.div>

                    {/* Menu for desktop */}
                    <motion.nav
                        className="hidden md:flex space-x-6 items-center"
                        initial={{ opacity: 0, x: 50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.6 }}
                    >
                        <motion.div
                            whileHover={{ scale: 1.05, color: '#4E342E' }}
                            transition={{ type: "spring", stiffness: 200 }}
                        >
                            <Link href="/reservas" className="text-md font-light text-brown-700 hover:text-brown-900 transition duration-300 ease-in-out">Reservas</Link>
                        </motion.div>

                        <motion.div
                            whileHover={{ scale: 1.05, color: '#4E342E' }}
                            transition={{ type: "spring", stiffness: 200 }}
                        >
                            <Link href="/pedidos" className="text-md font-light text-brown-700 hover:text-brown-900 transition duration-300 ease-in-out">Pedidos</Link>
                        </motion.div>

                        <motion.div
                            whileHover={{ scale: 1.05, color: '#4E342E' }}
                            transition={{ type: "spring", stiffness: 200 }}
                        >
                            <Link href="/agregar-productos" className="text-md font-light text-brown-700 hover:text-brown-900 transition duration-300 ease-in-out">Agregar Productos</Link>
                        </motion.div>

                        <motion.div
                            whileHover={{ scale: 1.05, color: '#4E342E' }}
                            transition={{ type: "spring", stiffness: 200 }}
                        >
                            <Link href="/contacto" className="text-md font-light text-brown-700 hover:text-brown-900 transition duration-300 ease-in-out">Contacto</Link>
                        </motion.div>

                        {/* Login/Logout Button for desktop */}
                        <motion.div>
                            {isLoggedIn ? (
                                <button
                                    onClick={handleLogout}
                                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-400 transition duration-300"
                                >
                                    Cerrar Sesión
                                </button>
                            ) : (
                                <button
                                    onClick={handleLogin}
                                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-400 transition duration-300"
                                >
                                    Iniciar Sesión
                                </button>
                            )}
                        </motion.div>
                    </motion.nav>

                    {/* Hamburger Menu for mobile */}
                    <motion.button
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.5, delay: 0.9 }}
                        className="md:hidden"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                            />
                        </svg>
                    </motion.button>
                </div>

                {/* Mobile Menu */}
                {isOpen && (
                    <motion.nav
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="md:hidden bg-white text-brown-700"
                    >
                        <ul className="space-y-4 p-4">
                            <li><Link href="/reservas" className="hover:text-brown-900 transition duration-300 ease-in-out">Reservas</Link></li>
                            <li><Link href="/pedidos" className="hover:text-brown-900 transition duration-300 ease-in-out">Pedidos</Link></li>
                            <li><Link href="/agregar-productos" className="hover:text-brown-900 transition duration-300 ease-in-out">Agregar Productos</Link></li>
                            <li><Link href="/contacto" className="hover:text-brown-900 transition duration-300 ease-in-out">Contacto</Link></li>

                            {/* Login/Logout Button in mobile menu */}
                            <li>
                                {isLoggedIn ? (
                                    <button
                                        onClick={handleLogout}
                                        className="w-full text-left px-4 py-2 bg-red-500 text-white rounded hover:bg-red-400 transition duration-300"
                                    >
                                        Cerrar Sesión
                                    </button>
                                ) : (
                                    <button
                                        onClick={handleLogin}
                                        className="w-full text-left px-4 py-2 text-center bg-green-500 text-white rounded hover:bg-green-400 transition duration-300"
                                    >
                                        Iniciar Sesión
                                    </button>
                                )}
                            </li>
                        </ul>
                    </motion.nav>
                )}
            </motion.header>
        </>
    )
}

export default Header
