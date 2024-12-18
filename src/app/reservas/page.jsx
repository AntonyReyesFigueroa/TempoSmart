import Footer from '@/structures/footer/footer'
import Header from '@/structures/header/header'
import Reserva from '@/structures/main/reservas/reserva'
import React from 'react'
const API_URL = process.env.NEXT_PUBLIC_API_USER;

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
