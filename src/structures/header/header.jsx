'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import Cookies from 'js-cookie';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userType, setUserType] = useState(null); // Agregamos el estado para el tipo de usuario
    const router = useRouter();

    // Verificar la cookie de sesión y tipo_usuario al cargar el componente
    useEffect(() => {
        const sessionCookie = Cookies.get('session');
        const userTypeCookie = Cookies.get('tipo_usuario');

        if (sessionCookie === 'conectado' && userTypeCookie) {
            setIsLoggedIn(true);
            setUserType(userTypeCookie);
        } else {
            setIsLoggedIn(false);
            setUserType(null);
        }
    }, []);

    // Manejar login y logout, además de eliminar las cookies correspondientes
    const handleLoginLogout = () => {
        const sessionCookie = Cookies.get('session');

        if (sessionCookie === 'conectado') {
            // Si está conectado, cerrar sesión
            Cookies.remove('session');
            Cookies.remove('tipo_usuario');
            setIsLoggedIn(false);
            setUserType(null);
            router.push('/login');
        } else {
            // Si no está conectado, iniciar sesión
            Cookies.set('session', 'conectado', { expires: 7 });
            router.push('/login'); // Redirigir a la página de login
        }
    };

    const headerRef = useRef(null);
    const isInView = useInView(headerRef);

    return (
        <>
            <motion.header
                ref={headerRef}
                initial={{ opacity: 0, y: -50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5 }}
                className="sticky top-0 left-0 w-full bg-white text-brown-700 shadow-lg z-50"
                style={{ height: '80px' }}
            >
                <div className="container mx-auto flex justify-between items-center p-4">
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={isInView ? { scale: 1, opacity: 1 } : {}}
                        transition={{ duration: 0.5 }}
                    >
                        <Link href="/">
                            <Image
                                src="/TempoSmart.png"
                                alt="TempoSmart Cafetería"
                                width={80}
                                height={80}
                                className='rounded-full object-cover'
                            />
                        </Link>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        <Link href="/" className="text-3xl font-serif mx-4 text-brown-800 font-bold">
                            TempoSmart
                        </Link>
                    </motion.div>

                    <motion.nav
                        className="hidden md:flex space-x-6 items-center"
                        initial={{ opacity: 0, x: 50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.6 }}
                    >
                        {/* Mostrar rutas según el tipo de usuario */}
                        {userType === 'administrador' && (
                            <>
                                <motion.div whileHover={{ scale: 1.05 }} transition={{ type: 'spring', stiffness: 200 }}>
                                    <Link href="/reservas" className="text-md font-light hover:text-brown-900">Reservas</Link>
                                </motion.div>

                                <motion.div whileHover={{ scale: 1.05 }} transition={{ type: 'spring', stiffness: 200 }}>
                                    <Link href="/agregar-productos" className="text-md font-light hover:text-brown-900">Agregar Productos</Link>
                                </motion.div>

                            </>
                        )}

                        {userType === 'estudiante' && (
                            <motion.div whileHover={{ scale: 1.05 }} transition={{ type: 'spring', stiffness: 200 }}>
                                <Link href="/pedidos" className="text-md font-light hover:text-brown-900">Pedidos</Link>
                            </motion.div>
                        )}

                        <motion.div whileHover={{ scale: 1.05 }} transition={{ type: 'spring', stiffness: 200 }}>
                            <Link href="/contacto" className="text-md font-light hover:text-brown-900">Contacto</Link>
                        </motion.div>

                        {/* Botón de iniciar/cerrar sesión */}
                        <motion.div>
                            <button
                                onClick={handleLoginLogout}
                                className={`px-4 py-2 ${isLoggedIn ? 'bg-red-500' : 'bg-green-500'} text-white rounded hover:bg-opacity-80`}
                            >
                                {isLoggedIn ? 'Cerrar Sesión' : 'Iniciar Sesión'}
                            </button>
                        </motion.div>
                    </motion.nav>
                </div>
            </motion.header>
        </>
    );
};

export default Header;
