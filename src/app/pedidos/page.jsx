import Footer from '@/structures/footer/footer'
import Header from '@/structures/header/header'
import Pedidos from '@/structures/main/pedidos/Pedidos'
import React from 'react'

export default function PagePedidos() {
    return (
        <div>
            <div className="flex flex-col min-h-screen">
                <Header />
                <div className="flex-grow">
                    <Pedidos />
                </div>
                <Footer />
            </div>
        </div>
    )
}
