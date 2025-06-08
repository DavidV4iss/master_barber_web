import React, { useState, useEffect } from "react";
import NavbarIndex from '../../Components/NavbarIndex'
import CarrouselShop from '../../Components/CarrouselShop'
import CalificacionesAdmin from '../../Components/CalificacionesAdmin'
import Darkandlight from "../../Components/Dark and light";
import axios from 'axios'

export default function Index() {
    const [theme] = useState(() => {
        return localStorage.getItem("theme") || "light";
    });

    useEffect(() => {
        document.body.className = theme;
    }, [theme]);

    const [barberos, setBarberos] = useState([]);

    useEffect(() => {
        const fetchBarberos = async () => {
            try {
                const res = await axios.get("http://localhost:8080/GetBarberos");
                setBarberos(res.data);
            } catch (err) {
                console.log("Error al obtener los datos:", err);
            }
        }
        fetchBarberos()
    }, [])

    return (
        <div>
            <div><Darkandlight /></div>
            <NavbarIndex />

            <div className="img position-fixed top-50 start-50 translate-middle row h-100 col-1 col-sm-12"><img src="/LOGO.png" alt="" className='' /></div>
            <div className='container p-5 mt-5 table-responsive col col-sm-12' id='home'>

                <h1 className={`text-center display-1 anton fw-bold mt-5 pt-5 ${theme === "light" ? "dark" : "text-white"}`}>
                    <small>TE DAMOS LA BIENVENIDA A</small> <p>MASTER BARBER VIP</p>
                </h1>
                <p className="text-center  fs-4 mt-5 pt-5 text-light lobster fade-in">
                    Somos una barbería dedicada al cuidado masculino, ofreciendo cortes de cabello, afeitados clásicos y modernos, tratamientos capilares y un ambiente cómodo pensado para ti. Nuestro equipo de barberos profesionales combina técnica, estilo y atención personalizada para que salgas con tu mejor versión.
                </p>
                <h1 className="text-center antonparabackend fw-bold mt-5 pt-5">
                    <p>
                        <span className="text-danger">"DONDE LA BARBERIA </span>
                        <span className="text-warning">SE CONVIERTE EN ARTE"</span>

                    </p>

                </h1>


                <div className={`text-center mt-5 p-5 ${theme === "light" ? "dark" : "text-white"}`}>

                </div>

            </div>

            <div className="welcomeindex ">
                <div className="container-fluid">
                    <div className="row">
                        <div class="col-12 col-sm-5 d-none d-sm-block">
                            <img src="/MB1.JPG" alt="" className='img-fluid' />
                        </div>
                        <div class="col-12 col-sm-7 text-center p-5">
                            <h2 className='welcome-2 text-danger anton display-1'>Sobre Nosotros</h2>
                            <p className={`pt-5 ${theme === "light" ? "dark" : "text-white"}`}>
                                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                                Facere pariatur mollitia illo perspiciatis velit tempora fugiat neque ut,
                                dolorem laborum corrupti est officiis magni,
                                soluta nemo nobis eligendi repellat id!
                            </p>
                        </div>
                    </div>
                </div>
            </div>




            <div className="welcome container" id='services'>
                <h1 className={`text-center display-1 anton  ${theme === "light" ? "dark" : "text-white"}`}>NUESTROS SERVICIOS</h1>
                <p className={`mt-5 p-5 pt-5 text-center ${theme === "light" ? "dark" : "text-white"}`}>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Facere pariatur mollitia illo perspiciatis velit tempora fugiat neque ut,
                    dolorem laborum corrupti est officiis magni,
                    soluta nemo nobis eligendi repellat id!
                </p>
                <div className="row justify-content-center mt-5 pt-5 p-2 contenidol">
                    <div class="row">
                        <div class="col">
                            <div class="card bg-dark border border-end-0">
                                <div class="card-body">
                                    <div className="text-center">
                                        <img src="/corteBasico.jpg" class="img-fluid w-50 mt-4 rounded-3" alt="..." />
                                    </div>
                                    <h4 class="card-title text-danger text-center bebas mt-3">Corte Basico</h4>

                                    <div className="text-center row mx-3">
                                        <button type="button" class="btn btn-outline-danger mt-5 border border text-white" data-bs-toggle="offcanvas" data-bs-target="#staticBackdrop" aria-controls="staticBackdrop">Ver</button>
                                    </div>
                                </div>
                                <div class="offcanvas offcanvas-start bg-dark" data-bs-backdrop="static" tabindex="-1" id="staticBackdrop" aria-labelledby="staticBackdropLabel">
                                    <div class="offcanvas-header">
                                        <h5 class=" mt-5 pt-5 text-warning anton" id="staticBackdropLabel">Corte Basico</h5>
                                        <button type="button" class="btn-close mb-5 bg-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                                    </div>
                                    <div class="offcanvas-body text-white">
                                        <div>
                                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Amet ex eos pariatur voluptatibus porro nemo harum ducimus excepturi placeat sed illum, iusto dolore expedita minima, eaque nostrum. Rerum, architecto culpa.
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col w-50 mx-5">
                            <div class="card h-100 bg-dark border border-start-0">
                                <div className="text-center">
                                    <img src="/cortePremium.jpg" class="img-fluid w-50 mt-4 rounded-3" alt="..." />
                                </div>
                                <div class="card-body">
                                    <h4 class="card-title text-danger text-center bebas">Corte Premium</h4>

                                    <div className="text-center row mx-3">
                                        <button type="button" class="btn btn-outline-danger mt-5 border border text-white" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="staticBackdrop">Ver</button>
                                    </div>
                                </div>
                                <div class="offcanvas offcanvas-end bg-dark" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
                                    <div class="offcanvas-header">
                                        <h5 class="offcanvas-title text-warning anton mt-5 pt-5" id="offcanvasRightLabel">Corte Premium</h5>
                                        <button type="button" class="btn-close mb-5 bg-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                                    </div>
                                    <div class="offcanvas-body text-white">
                                        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consequuntur ratione itaque dicta, amet dolorem, ea repellat aut asperiores accusantium quasi explicabo eum ipsam inventore quia ullam culpa. Ad, ab culpa!</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>






            <div className="welcome" id='prices'>
                <div className="container-fluid mt-5 pt-5">
                    <div className="row">
                        <div class="col-12 col-sm-8 text-center p-5 pt-5 mt-5">
                            <h2 className={`display-5 anton  ${theme === "light" ? "dark" : "text-white"}`}>Lista de precios</h2>
                            <p className={`mt-5 ${theme === "light" ? "dark" : "text-white"}`}>
                                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                                Facere pariatur mollitia illo perspiciatis velit tempora fugiat neque ut,
                                dolorem laborum corrupti est officiis magni,
                                soluta nemo nobis eligendi repellat id!
                            </p>
                            <div className="mt-5 pt-5">
                                <div className="border-bottom d-flex justify-content-between mt-4">
                                    <p className={`mx-3 antonparabackend  ${theme === "light" ? "dark" : "text-white"}`}>Corte Basico</p>
                                    <p className='text-warning mx-3 antonparabackend'>20.000</p>
                                </div>
                                <div className="border-bottom d-flex justify-content-between mt-4">
                                    <p className={`mx-3 antonparabackend  ${theme === "light" ? "dark" : "text-white"}`}>Cejas</p>
                                    <p className='text-warning mx-3 antonparabackend'>5.000</p>
                                </div>
                                <div className="border-bottom d-flex justify-content-between mt-4">
                                    <p className={`mx-3 antonparabackend  ${theme === "light" ? "dark" : "text-white"}`}>Figuras</p>
                                    <p className='text-warning mx-3 antonparabackend'>5.000</p>
                                </div>
                                <div className="border-bottom d-flex justify-content-between mt-4">
                                    <p className={`mx-3 antonparabackend  ${theme === "light" ? "dark" : "text-white"}`}>Mascarillas</p>
                                    <p className='text-warning mx-3 antonparabackend'>25.0000</p>
                                </div>
                                <div className="border-bottom d-flex justify-content-between mt-4">
                                    <p className={`mx-3 antonparabackend  ${theme === "light" ? "dark" : "text-white"}`}>Barbas</p>
                                    <p className='text-warning mx-3 antonparabackend'>12.0000</p>
                                </div>
                                <div className="border-bottom d-flex justify-content-between mt-4">
                                    <p className={`mx-3 antonparabackend  ${theme === "light" ? "dark" : "text-white"}`}>Tintes</p>
                                    <p className='text-warning mx-3 antonparabackend'>Depende Del Tinte</p>
                                </div>
                                <div className="border-bottom d-flex justify-content-between mt-4">
                                    <p className={`mx-3 antonparabackend  ${theme === "light" ? "dark" : "text-white"}`}>Corte Premium</p>
                                    <p className='text-warning mx-3 antonparabackend'>55.000</p>
                                </div>
                            </div>

                        </div>
                        <div class="row col-sm-4 col">
                            <img src="/MB2.JPG" alt="" className="d-none d-sm-block" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="welcome" id='barbers'>
                <h1 className={`text-center display-1 anton  ${theme === "light" ? "dark" : "text-white"}`}>CONOCE A NUESTROS ESTILISTAS</h1>
                <p className={`mt-5 p-5 pt-5 text-center ${theme === "light" ? "dark" : "text-white"}`}>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Facere pariatur mollitia illo perspiciatis velit tempora fugiat neque ut,
                    dolorem laborum corrupti est officiis magni,
                    soluta nemo nobis eligendi repellat id!
                </p>
                <div className="container mt-5 pt-5">
                    <div class="row row-cols-1 row-cols-md-3">
                        {barberos.length === 0 && <p className='text-center text-danger'>No hay barberos para mostrar</p>}
                        {barberos.map((barbero) => (
                            <div className="col" key={barbero.id_usuario}>
                                <div class="card bg-dark mt-5">
                                    <img src={`http://localhost:8080/imagesBarbero/${barbero.Foto}`} class="card-img-top img-fluid" alt="..." />
                                    <div class="card-body">
                                        <h5 class="card-title text-danger text-center bebas fs-2 m-2">{barbero.nombre_usuario}</h5>
                                        <p class="card-text text-white text-center mt-3 m-3">{barbero.descripcion}</p>
                                    </div>

                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>


            <div className="welcome" id='shop'>
                <h1 className='text-center text-white display-1 bebas'>¡¡MASTER SHOP!!</h1>
                {length === 0 && <p className='text-center text-danger'>No hay productos para mostrar</p>}
                <CarrouselShop />
            </div>

            <div className='welcome' id='turno'>
                <h1 className={`text-center display-1 bebas ${theme === "light" ? "dark" : "text-white"}`}>¿PORQUE RESERVAR CON NOSOTROS?</h1>
                <div className="row col-12 col-sm-12">
                    <div className="container col border border mt-5 row col contenidol ">
                        <h1 className='bebas text-center text-white mt-2 border-bottom fs-1'>PROFESIONALES CERTIFICADOS ✅</h1>
                        <div className='row'>
                            <div className="col container text-white fs-4 mb-3 mx-4 mt-3 text-center    ">
                                Contamos con un equipo altamente capacitado y con experiencia comprobada para brindarte un servicio de calidad.
                            </div>
                        </div>
                    </div>
                    <div className="col border border mt-4 col mx-5 mt-5">
                        <h2 className='bebas text-center text-white mt-2 border-bottom fs-1'>EXPERIENCIA GARANTIZADA ⭐</h2>
                        <div className=' text-white fs-4 mb-3 mx-4 mt-4 text-center'>
                            Miles de clientes satisfechos nos respaldan. Tu satisfacción es nuestra prioridad.
                        </div>
                    </div>
                </div>
            </div>




            <div className="welcome" id='ubicacion'>
                <h1 className={`text-center display-1 antonparabackend  ${theme === "light" ? "dark" : "text-white"}`}>Donde Nos Puedes Ubicar</h1>
                <div className="container-fluid d-flex mt-5  justify-content-center">
                    <iframe class="map mt-5 mx-5" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3977.224597345888!2d-74.09438192628066!3d4.553574442918059!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f99e5c678c39f%3A0xe8d6bf03bd32ac11!2sMASTER%20BARBER%20VIP!5e0!3m2!1ses!2sco!4v1717791930339!5m2!1ses!2sco" height="560px" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                </div>
            </div>


            <div className={`antonparabackend text-center pt-5 mt-5 ${theme === "light" ? "dark" : "text-white"}`} id='calificaciones'>
                <h1 className="display-1">LO QUE PIENSAN NUESTRO CLIENTES</h1>
                <div className="mt-5 pt-5"><CalificacionesAdmin /></div>

            </div>


            <footer className="text-center text-light py-4 mt-5">
                <small>© {new Date().getFullYear()} Barbería VIP. Todos los derechos reservados.</small>
            </footer>

        </div >


    )
}