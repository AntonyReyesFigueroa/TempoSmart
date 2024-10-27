import Footer from '@/structures/footer/footer'
import Header from '@/structures/header/header'
import Contacto from '@/structures/main/contacto/contacto'
import React from 'react'

export default function PageContacto() {
    return (
        <div>
            <div className="flex flex-col min-h-screen">
                <Header />
                <div className="flex-grow">
                    <Contacto />
                </div>
                <Footer />
            </div>
        </div>
    )
}
