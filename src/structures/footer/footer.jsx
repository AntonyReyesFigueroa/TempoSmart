import Link from 'next/link'
import { FaFacebookF, FaInstagram, FaTiktok, FaEnvelope, FaPhone } from 'react-icons/fa'

const Footer = () => {
    return (
        <footer className="bg-black text-white py-6 w-full">  {/* Marrón oscuro profundo */}
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Columna de contacto */}
                    <div className='m-auto'>
                        <h2 className="text-lg font-bold mb-4 text-center">Contáctanos</h2>
                        <div className="flex items-center space-x-2">
                            {/* Icono de Correo */}
                            <FaEnvelope size={24} />
                            <p>info@temposmart.com</p>
                        </div>
                        <div className="flex items-center space-x-2 mt-2">
                            {/* Icono de Teléfono */}
                            <FaPhone size={24} />
                            <p>+51 912 129 121</p>
                        </div>
                    </div>

                    {/* Columna de redes sociales */}
                    <div className='text-center'>
                        <h2 className="text-lg font-bold mb-4">Síguenos en</h2>
                        <div className="flex space-x-4 justify-center">
                            {/* Facebook */}
                            <a
                                href="https://www.facebook.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="transition-transform transform hover:scale-110 hover:text-brown-300"
                            >
                                <FaFacebookF size={30} />
                            </a>

                            {/* TikTok */}
                            <a
                                href="https://www.tiktok.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="transition-transform transform hover:scale-110 hover:text-brown-300"
                            >
                                <FaTiktok size={30} />
                            </a>

                            {/* Instagram */}
                            <a
                                href="https://www.instagram.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="transition-transform transform hover:scale-110 hover:text-brown-300"
                            >
                                <FaInstagram size={30} />
                            </a>
                        </div>
                    </div>

                    {/* Columna de información */}
                    <div className='text-center'>
                        <h2 className="text-lg font-bold mb-4">Sobre Nosotros</h2>
                        <Link href="/nosotros">
                            Aprende más sobre TempoSmart
                        </Link>
                    </div>
                </div>

                <div className="text-center mt-8">
                    <p>&copy; 2024 TempoSmart. Todos los derechos reservados.</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer
