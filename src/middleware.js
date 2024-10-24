import { NextResponse } from 'next/server';

export function middleware(request) {
    // const userTypeCookie = request.cookies.get('tipo_usuario'); // Obtener el tipo de usuario de la cookie
    // const userType = userTypeCookie ? userTypeCookie.value : null; // Obtener el valor de la cookie
    // const requestedPath = request.nextUrl.pathname; // Ruta solicitada

    // // Permitir acceso a la ruta '/contacto' sin restricciones
    // if (requestedPath === '/contacto') {
    //     return NextResponse.next(); // Continúa con la solicitud
    // }

    // // Verificar acceso para Administrador
    // if (userType === 'administrador') {
    //     if (requestedPath === '/reservas' || requestedPath === '/agregar-productos') {
    //         return NextResponse.next(); // Permitir acceso a reservas y agregar productos
    //     }
    //     // Redirigir a login si intenta acceder a otra ruta
    //     return NextResponse.redirect(new URL('/login', request.url));
    // }

    // // Verificar acceso para Estudiante
    // if (userType === 'estudiante') {
    //     if (requestedPath === '/pedidos' || requestedPath === '/') {
    //         return NextResponse.next(); // Permitir acceso a pedidos y home
    //     }
    //     // Redirigir a login si intenta acceder a otra ruta
    //     return NextResponse.redirect(new URL('/login', request.url));
    // }

    // // Redirigir a login si no hay cookie de tipo de usuario
    // return NextResponse.redirect(new URL('/login', request.url));
}

// Configuración de rutas protegidas
export const config = {
    matcher: [
        // '/reservas',           // Reservas
        // '/agregar-productos',  // Agregar Productos
        // '/pedidos',            // Pedidos
        // '/contacto',           // Contacto
        // '/',                   // Ruta principal
    ],
};
