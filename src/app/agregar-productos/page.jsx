import Footer from '@/structures/footer/footer'
import Header from '@/structures/header/header'
import AgregarProductos from '@/structures/main/agregar-productos/agregar-productos'
import React from 'react'

export default function PageAgregarProductos() {
    return (
        <div>
            <div className="flex flex-col min-h-screen">
                <Header />
                <div className="flex-grow">
                    <AgregarProductos />
                </div>
                <Footer />
            </div>
        </div>
    )
}
