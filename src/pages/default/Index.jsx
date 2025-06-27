import React, { useState, useEffect } from "react";
import NavbarIndex from '../../Components/NavbarIndex'
import CalificacionesAdmin from "../../Components/calificacionesAdmin";
import AOS from 'aos';
import 'aos/dist/aos.css';
import API from "../../api/api";
import Shop from "../../Components/Shop";
const API_URL = process.env.API_URL || "http://localhost:8080";

export default function Index() {
    const [barberos, setBarberos] = useState([]);
    const [niveles, setNiveles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [flipped, setFlipped] = useState([false, false, false]);

    useEffect(() => {
        const fetchBarberos = async () => {
            try {
                const res = await API.get("/GetBarberos");
                setBarberos(res.data);
            } catch (err) {
                console.log("Error al obtener los datos:", err);
            }
        }
        fetchBarberos()
    }, [])



    useEffect(() => {
        setTimeout(() => {
            setNiveles([
                {
                    titulo: "CORTE BÁSICO",
                    imagen: <img src="/Corte7.jpg" alt="Corte Básico" className="img-fluid" style={{
                        width: "200%", height: "250px", objectFit: "cover", borderTopLeftRadius: "12px", borderTopRightRadius: "12px"
                    }} />,
                    descripcion: "lorem"
                },
                {
                    titulo: "CORTE PREMIUM",
                    imagen: <img src="/Corte8.jpg" alt="Corte Premium" className="img-fluid" style={{
                        width: "200%", height: "250px", objectFit: "cover", borderTopLeftRadius: "12px", borderTopRightRadius: "12px"
                    }} />,
                    descripcion: "lorem2"
                },
            ]);
            setLoading(false);
        }, 2000);
    }, []);

    const toggleFlip = (index) => {
        setFlipped(prev => {
            const updated = [...prev];
            updated[index] = !updated[index];
            return updated;
        });
    };

    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, [])


    return (
        <div>
            <NavbarIndex />

            <div className="video-hero">
                <video src="/images/video2.mp4" autoPlay loop muted playsInline className="video-bg" />
                <div className="video-overlay "></div>

                <div className="hero-content container text-white mt-4">
                    <h1 className="display-1 cesar fw-bold ">
                        Descubre la <p> Excelencia en Estilo</p>MASTER BARBER VIP:
                    </h1>

                    <p className="fs-4 mt-5 lobster fade-in">
                        Somos una barbería dedicada al cuidado masculino, ofreciendo cortes de cabello, afeitados clásicos y modernos, tratamientos capilares y un ambiente cómodo pensado para ti. Nuestro equipo de barberos profesionales combina técnica, estilo y atención personalizada para que salgas con tu mejor versión.
                    </p>

                    <h1 className="antonparabackend fw-bold mt-5 pt-5">
                        <span className="text-danger">"DONDE LA BARBERIA </span>
                        <span className="text-warning">SE CONVIERTE EN ARTE"</span>
                    </h1>
                </div>
            </div>

            <div className="bg-dark shadow py-5  text-white">
                <div className="container mt-5 pt-5 ">
                    <div className="row align-items-center">
                        <div className="col-md-6 mb-4 mb-md-0">
                            <img
                                src="/Corte6.jpg"
                                alt="Corte profesional"
                                className="img-fluid shadow-lg mi-tarjeta"
                                style={{ maxWidth: "70%", height: "auto", borderRadius: "50%" }}
                                data-aos="fade-right"
                            />
                        </div>
                        <div className="col-md-6 mt-5 ">
                            <h2 className="text-white display-3 anton mb-4 text-center p-2"
                                data-aos="fade-left"

                                style={{
                                    background: 'linear-gradient(80deg,rgb(194, 158, 0),rgb(206, 202, 4))',
                                    border: 'none',
                                    borderRadius: '8px',
                                    color: 'white',
                                    boxShadow: '0 10px 12px rgba(0, 0, 0, 0.2)',
                                    transition: 'all 0.3s ease',

                                }}>Sobre Nosotros</h2>
                            <p className="lead text-white">
                                En <span className="text-warning fw-bold">Master Barber VIP</span>, transformamos cada corte en una obra de arte.
                                Contamos con más de 10 años de experiencia brindando estilo, precisión y atención personalizada a nuestros clientes.
                                Nuestro equipo de barberos profesionales está comprometido con la excelencia y el buen gusto en cada servicio.
                            </p>
                            <p className="text-secondary mt-3">
                                Más que una barbería, somos una comunidad donde la pasión por el detalle se refleja en cada estilo. ¡Te esperamos para vivir la experiencia!
                            </p>
                        </div>
                    </div>
                </div>





                <div className="welcome container" id='services'>
                    <h1 className="text-center display-1 anton"
                        style={{
                            background: 'linear-gradient(80deg,rgb(194, 158, 0),rgb(206, 202, 4))',
                            border: 'none',
                            borderRadius: '8px',
                            color: 'white',
                            boxShadow: '0 16px 12px rgba(0, 0, 0, 0.2)',
                            transition: 'all 0.3s ease',
                        }} data-aos="fade-down">NUESTROS SERVICIOS</h1>
                    <p className="mt-4 p-5 pt-4 text-center" data-aos="fade-up">
                        En nuestra barbería, ofrecemos una experiencia única que va más allá de un simple corte.
                        Disfruta de servicios personalizados como cortes clásicos y modernos, afeitados con toalla caliente,
                        arreglo de barba, colorimetría capilar y tratamientos capilares revitalizantes.
                        Cada servicio está pensado para realzar tu estilo y brindar una atención de primera calidad.
                        ¡Déjanos cuidar de tu imagen como te lo mereces!
                    </p>
                    <p className="text-center text-warning" data-aos="fade-up">TOCA ENa LA CARTA PARA MAS INFORMACION</p>
                    <div className='container'>
                        <div className='row g-5 mt-3 justify-content-center'>
                            {loading ? (
                                [1, 2].map(i => (
                                    <div className="col-md-4 d-flex justify-content-center" key={i} data-aos="zoom-in" data-aos-delay={i * 100}>
                                        <div className="card bg-dark text-white" aria-hidden="true" style={{ width: "100%", maxWidth: "400px" }}>
                                            <div className="text-center m-3">
                                                <div className="spinner-border text-info" role="status"></div>
                                                <p>loading...</p>
                                            </div>
                                            <div className="card-body">
                                                <h5 className="card-title placeholder-glow">
                                                    <span className="placeholder col-6"></span>
                                                </h5>
                                                <p className="card-text placeholder-glow">
                                                    <span className="placeholder col-7"></span>
                                                    <span className="placeholder col-4"></span>
                                                </p>
                                                <a className="btn btn-primary disabled placeholder col-6" aria-disabled="true"></a>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                niveles.map((nivel, i) => (
                                    <div className='col-md-4 d-flex justify-content-center' key={i} data-aos="zoom-in" data-aos-delay={i * 100}>
                                        <div className='card-container hover-effect mx-1' onClick={() => toggleFlip(i)} style={{
                                            height: "340px",
                                            width: "100%",
                                            maxWidth: "400px",
                                            cursor: "pointer"
                                        }}>
                                            <div className={`card-inner ${flipped[i] ? 'flipped' : ''} shadow rounded-4`}>

                                                <div
                                                    className='card-front d-flex flex-column justify-content-start align-items-center text-white rounded-4 p-0'
                                                    style={{
                                                        overflow: "hidden"
                                                    }}
                                                >
                                                    <div style={{
                                                        width: "100%",
                                                        height: "180px",
                                                        objectFit: "cover"
                                                    }}>{nivel.imagen}</div>

                                                    <div className="p-4 text-center">
                                                        <h5 className='text-warning cesar mt-5 pt-4'>{nivel.titulo}</h5>
                                                    </div>
                                                </div>
                                                { }
                                                <div className='card-back d-flex flex-column justify-content-center align-items-center text-white text-center px-3 rounded-4 bg-dark'>
                                                    <h5>{nivel.titulo}</h5>
                                                    <p className='mt-3'>{nivel.descripcion}</p>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>



                <div className="welcome barber-price-section py-5" id="prices">
                    <div className="container">
                        <div className="row ">

                            <div className="col-lg-5 mb-4 ps-lg-5" data-aos="fade-right">
                                <img
                                    src="/Corte4.jpg"
                                    alt="Barbería moderna"
                                    className="img-fluid rounded "
                                />
                            </div>

                            <div className="col-lg-7 ps-lg-5" data-aos="fade-left">
                                <h2 className="cesar display-4 mb-3 text-warning text-center">💈 Lista de Precios</h2>
                                <p className="lead mb-4 text-center">
                                    Servicios exclusivos con estilo, precisión y productos premium.
                                </p>

                                <div className="price-list">
                                    {[
                                        { icon: "✂️", name: "Corte Básico", price: "$20.000" },
                                        { icon: "🔍", name: "Cejas", price: "$5.000" },
                                        { icon: "🎨", name: "Figuras", price: "$5.000" },
                                        { icon: "🧖‍♂️", name: "Mascarillas", price: "$25.000" },
                                        { icon: "🧔", name: "Barbas", price: "$12.000" },
                                        { icon: "💇‍♂️", name: "Tintes", price: "Depende del tinte" },
                                        { icon: "👑", name: "Corte Premium", price: "$55.000" },
                                    ].map((item, i) => (
                                        <div
                                            key={i}
                                            className="price-item d-flex justify-content-between align-items-center mb-3 px-4 py-3"
                                            data-aos="zoom-in-up"
                                            data-aos-delay={i * 100}
                                        >
                                            <span>
                                                {item.icon} <strong>{item.name}</strong>
                                            </span>
                                            <span className="text-warning fw-bold">{item.price}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="position-relative welcome py-5">
                    <section>
                        <div className="overlay position-absolute top-0 start-0 w-100 h-100"></div>
                        <div className="position-relative z-1 container">
                            <h1 className="display-1 anton mb-4 text-center" data-aos="fade-down"
                                style={{
                                    background: 'linear-gradient(80deg,rgb(194, 158, 0),rgb(206, 202, 4))',
                                    border: 'none',
                                    borderRadius: '8px',
                                    color: 'white',
                                    boxShadow: '0 16px 12px rgba(0, 0, 0, 0.2)',
                                    transition: 'all 0.3s ease',
                                }}>
                                CONOCE A NUESTROS ESTILISTAS
                            </h1>

                            <p className="lead px-3 mx-auto" data-aos="fade-up" style={{ maxWidth: "800px" }}>
                                En nuestra barbería, el estilo y la personalidad se fusionan para darte una experiencia única.
                                Conoce a los artistas detrás de cada corte, cada estilo tiene un nombre y una historia.
                            </p>
                            <div className="text-center mb-5">
                                <div className="barber-tags d-inline-flex flex-wrap justify-content-center gap-3 mt-4" data-aos="fade-up">
                                    {["#Fade", "#Taper", "#OldSchool", "#CleanStyle", "#MasterBarber"].map((tag, i) => (
                                        <span key={i} className="badge rounded-pill text-dark fw-bold" style={{
                                            background: "linear-gradient(45deg, gold, white)",
                                            padding: "10px 20px",
                                            fontSize: "1rem",
                                        }}>
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div className="d-flex justify-content-center my-4" data-aos="fade">
                                <div className="divider-barber position-relative">
                                    <div className="barber-icon">✂️</div>
                                </div>
                            </div>


                        </div>
                    </section>

                    <section className="container my-5 py-5">
                        {barberos.length === 0 ? (
                            <p className="text-center text-light fs-5">😕 No hay barberos para mostrar.</p>
                        ) : (
                            <div className={`row g-5 justify-content-center ${barberos.length === 1 ? "row-cols-1" : "row-cols-1 row-cols-md-2 row-cols-lg-3"}`}>
                                {barberos.map((barbero, index) => (
                                    <div className="col d-flex justify-content-center" key={barbero.id_usuario} data-aos="zoom-in" data-aos-delay={index * 100}>
                                        <div
                                            className="card border-0 rounded-4 shadow bg-dark text-white barber-card"
                                            style={{ width: "100%", maxWidth: "360px", cursor: "pointer", overflow: "hidden", transition: "all 0.4s ease" }}
                                        >
                                            <img
                                                src={`${API_URL}/imagesBarbero/${barbero.Foto}`}
                                                alt={`Foto de ${barbero.nombre_usuario}`}
                                                className="img-fluid rounded-top"
                                                style={{ height: "360px", objectFit: "cover" }}
                                            />
                                            <div className="card-body text-center px-4 pb-3">
                                                <h5 className="text-danger cesar fs-3 mb-2">{barbero.nombre_usuario}</h5>
                                                <p className="card-text">{barbero.descripcion}</p>

                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </section>
                </div>





                <div className="welcome" id='shop'>
                    <Shop />
                </div>

                <div className="section-benefits py-5 welcome">
                    <div className="container text-center">
                        <h1 className="display-3 fw-bold text-uppercase bebas mb-5 p-3" data-aos="fade-up"
                            style={{
                                background: 'linear-gradient(80deg,rgb(194, 158, 0),rgb(206, 202, 4))',
                                border: 'none',
                                borderRadius: '8px',
                                color: 'white',
                                boxShadow: '0 16px 12px rgba(0, 0, 0, 0.2)',
                                transition: 'all 0.3s ease',
                            }}>
                            ¿Por qué reservar con nosotros?
                        </h1>

                        <div className="row justify-content-center g-5 pt-5 mt-3">

                            <div className="col-md-5" data-aos="zoom-in" data-aos-delay="100">
                                <div className="benefit-card text-white text-center p-4">
                                    <div className="benefit-icon mb-3">
                                        <i className="bi bi-person-check-fill"></i>
                                    </div>
                                    <h3 className="text-warning bebas mb-3">Profesionales Certificados</h3>
                                    <p className="fs-5">
                                        Barberos con experiencia, pasión y técnica, listos para darte el mejor corte y trato exclusivo.
                                    </p>
                                </div>
                            </div>

                            <div className="col-md-5" data-aos="zoom-in" data-aos-delay="200">
                                <div className="benefit-card text-white text-center p-4">
                                    <div className="benefit-icon mb-3">
                                        <i className="bi bi-emoji-smile-fill"></i>
                                    </div>
                                    <h3 className="text-warning bebas mb-3">Experiencia Garantizada</h3>
                                    <p className="fs-5">
                                        Más que un corte, una experiencia que te hará volver. ¡Comodidad, música y estilo asegurados!
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-5 pt-5" data-aos="fade-up" data-aos-delay="300">
                            <a href="#reservar" className="btn btn-warning btn-lg cta-pulse px-5 py-3 rounded-pill fw-bold ">
                                💈 Reserva tu cita ahora
                            </a>
                        </div>
                    </div>
                </div>




                <div className="antonparabackend text-center welcome" id='calificaciones'>
                    <h1 className="display-1">LO QUE PIENSAN NUESTRO CLIENTES</h1>
                    <div className="mt-5 pt-5"><CalificacionesAdmin /></div>

                </div>

                <div className="container welcome mb-5">
                    <h1 className='text-center mb-5 fw-bold bebas display-1'>¿DÓNDE NOS ENCUENTRAS?</h1>
                    <div className="row align-items-center justify-content-center gy-4 mt-5 ">
                        <div className="col-md-5">
                            <div className="ratio ratio-16x9 rounded-4 shadow">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3977.224597345888!2d-74.09438192628066!3d4.553574442918059!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f99e5c678c39f%3A0xe8d6bf03bd32ac11!2sMASTER%20BARBER%20VIP!5e0!3m2!1ses!2sco!4v1717791930339!5m2!1ses!2sco" height="560px" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" 
                                    className="border rounded-4"
                                    title="Ubicación MASTER BARBER VIP"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        </div>

                        <div className="col-md-6 text-center">
                            <h2 className='fw-bold mx-4 cesar'>¡Visítanos para tener el gusto de atenderte y asesorarte para sacar lo mejor de ti!</h2>
                        </div>
                    </div>
                </div>

                
            </div>

            {/* <a
                    href="https://wa.me/573001234567"
                    className="whatsapp-flotante"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Chatea por WhatsApp"
                >
                    <i className="bi bi-whatsapp"></i>
                    <span className="tooltip-wsp">¡Chatea con nosotros!</span>
                </a> */ }



            <div className="bg-light">
                <footer className=" pt-5 pb-3 mx-auto shadow-sm">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-2 text-center">
                                <img src="/LOGO.png" alt="Logo" style={{ width: "120px", cursor: "pointer" }} className="mb-3 hover-effect" />
                                <p className="fw-bold mb-1 text-warning cesar">MASTER BARBER VIP</p>
                                <p className="text-white" style={{ fontSize: "0.95rem" }}>
                                    Barberia comprometida con la calidad y cambios de imagen
                                </p>
                            </div>
                            <div className="col-md-3 mb-4 mt-5 mx-auto">
                                <h6 className="fw-bold mb-2 text-white cesar">Contacto</h6>
                                <p className="mb-1 text-white">Cra 4 Este #37b sur 38<br />Bogotá, Colombia</p>
                                <p className="mb-1 text-white">Tel: (123) 456-7890</p>
                                <p className="mb-1 text-white">Email: info@masterbarber.com</p>
                                <p className="d-block text-primary">Para quejas y reclamos</p>
                            </div>
                            <div className="col-md-3 mb-4 mt-5">
                                <h6 className="fw-bold mb-2 text-white cesar">Quiénes somos</h6>
                                <ul className="list-unstyled">
                                    <li><a href="#" className="text-white text-decoration-none">Nosotros</a></li>
                                    <li><a href="#" className="text-white text-decoration-none">Servicios</a></li>
                                    <li><a href="#" className="text-white text-decoration-none">Contacto</a></li>
                                    <li><a href="#" className="text-white text-decoration-none">Blog</a></li>
                                </ul>
                            </div>
                            <div className="col-md-2 mb-4 mt-5">
                                <h6 className="fw-bold mb-2 text-white cesar">Políticas</h6>
                                <ul className="list-unstyled">
                                    <li><a href="#" className="text-white text-decoration-none">Política de Privacidad</a></li>
                                    <li><a href="#" className="text-white text-decoration-none">Términos y Condiciones</a></li>
                                </ul>
                            </div>
                            <div className="d-flex gap-3 mx-4">
                                <a href="https://play.google.com/store" target="_blank" rel="noopener noreferrer">
                                    <img
                                        src="./play.png"
                                        alt="Descargar en Google Play"
                                        style={{ width: "140px", borderRadius: "8px", boxShadow: "0 2px 8px rgba(0,0,0,0.08)", transition: "transform 0.2s, box-shadow 0.2s" }}
                                        onMouseOver={e => { e.currentTarget.style.transform = "scale(1.05)"; e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.18)"; }}
                                        onMouseOut={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.08)"; }}
                                    />
                                </a>
                            </div>
                        </div>
                        <div className="row mt-4">
                            <div className="col-md-8 text-white cesar small">
                                © {new Date().getFullYear()} Master Barber VIP. Todos los derechos reservados.
                            </div>
                            <div className="col-md-4 text-end text-white small cesar">
                                Diseñado y desarrollado por <a href="#" className="text-decoration-none text-primary hover-link">Anonimo</a>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>

        </div >


    )
}