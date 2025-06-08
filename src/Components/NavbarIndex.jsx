import React from 'react'


export default function NavbarIndex() {
    return (
        <div className="">
            <nav class="navbar navbar-dark fixed-top mx-3 mt-3" >
                <div class="container-fluid">
                    <a class="navbar-brand" href="#"></a>
                    <button class="navbar-toggler bg-dark border border-white" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon "></span>
                    </button>
                    <div class="offcanvas offcanvas-end text-bg-dark bebas" tabindex="-1" id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel">
                        <div class="offcanvas-header">
                            <h5 class="offcanvas-title text-warning" id="offcanvasDarkNavbarLabel">Menu De Navegación</h5>
                            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        <div class="offcanvas-body">
                            <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
                                <li class="nav-item">
                                    <a class="nav-link active" aria-current="page" href="#home"><i class="bi bi-house-door-fill mx-3"></i>Home</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link active mt-3" href="#services" type='submit'><i class="bi bi-scissors mx-3"></i>Servicios</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link active mt-3" href="#prices"><i class="bi bi-tag mx-3"></i>Precios</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link active mt-3" href="#barbers"><i class="bi bi-people mx-3"></i>Nuestros Barberos</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link active mt-3" href="#shop"><i class="bi bi-cart mx-3"></i>¡¡Master Shop!!</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link active mt-3" href="#turno"><i class="bi bi-calendar mx-3"></i>¿Por Que Reservar Con Nosotros?</a>
                                </li>

                                <li class="nav-item">
                                    <a class="nav-link active mt-3" href="#ubicacion"><i class="bi bi-geo-alt mx-3"></i>Ubicacion</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link active mt-3" href="#calificaciones"><i class="bi bi-bookmark-heart mx-3"></i>Calificanos</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link active mt-3 bg-warning text-dark" href="../Registro"><i class="bi bi-arrow-right mx-3"></i>Crear Mi Cuenta</a>
                                </li>



                            </ul>

                        </div>
                        <footer class="bg-dark  text-white mt-5 mx-5 text-center">
                            <ul class="list-unstyled">
                                <li class="nav-item mt-4 mx-3 fs-5 text-decoration-none">
                                    <a href="https://www.instagram.com/"><i class="bi bi-instagram text-white"></i></a>
                                    <a href="https://www.facebook.com/"> <i class="bi bi-facebook mx-5"></i></a>
                                    <a href="https://x.com/?lang=es"><i class="bi bi-twitter-x text-white"></i></a>
                                </li>
                            </ul>
                        </footer>
                    </div>
                </div>
            </nav>
        </div>

    )
}