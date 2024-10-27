import Footer from '@/structures/footer/footer'
import Header from '@/structures/header/header'
import Reserva from '@/structures/main/reservas/reserva'
import React from 'react'

export default function PageReservas() {
    return (
        <div>
            <div className="flex flex-col min-h-screen">
                <Header />
                <div className="flex-grow">
                    <Reserva />
                </div>
                <Footer />
            </div>
        </div>
    )
}
