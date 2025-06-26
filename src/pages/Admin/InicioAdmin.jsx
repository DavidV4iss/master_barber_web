import React, { useEffect, useState } from 'react';
import SidebarAdmin from '../../Components/SidebarAdmin'
import NavbarAdmin from '../../Components/NavbarAdmin'
import 'animate.css';
import calificacionesAdmin from '../../Components/calificacionesAdmin';
import API from '../../api/api';
import CalificacionesAdmin from '../../Components/calificacionesAdmin';
const API_URL = process.env.API_URL || "http://localhost:8080";

export default function InicioAdmin() {

    const [barberos, setBarberos] = useState([]);

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

    return (
        <div className='bg-dark'>
            <NavbarAdmin />
            <SidebarAdmin />
            <div className='contenido p-5 mt-5'>
                <p className='text-center text-white display-3 bebas mx-3'>MASTER <span className='text-danger'>BARBER</span>| INICIO </p>
                <div className="row">
                    <div className="container col border border mt-5 row col contenidol">
                        <h1 className='bebas text-center text-white mt-2 border-bottom fs-1'>MENUUUUUU</h1>
                        <div className='row'>
                            <div className="col container mx-2">
                                <p className='mx-4  text-white antonparabackend mt-2 col'>links ayudas</p>
                                <p><a href="GestionarBarberos" className="link-warning link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover mx-4 bebas">GESTION BARBEROS</a></p>
                                <p><a href="Inventario" className="link-warning link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover mx-4 bebas">INVENTARIO</a></p>
                                <p><a href="Gestiondeinventario" className="link-warning link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover mx-4 bebas">GESTION INVENTARIO</a></p>
                            </div>
                            <div className="col zoomhover2">
                                <img src="LOGO.png" alt="" width="100%" height="90%" className="d-inline-block align-text-top mx-3 mt-1" />
                            </div>
                        </div>
                    </div>
                    <div className=" col border border mt-4 col mx-5 mt-5">
                        <h2 className='bebas text-center text-white mt-2 border-bottom fs-1'>BARBEROS ACTUALES</h2>
                        <div className='text-white  fs-5 mx-4 mt-3'>
                            {barberos.length === 0 ? (
                                <div className="mt-3 fw-bold text-danger text-center mt-5 pt-5">No hay barberos para mostrar.</div>
                            ) : (
                                barberos.map((barbero) => (
                                    <div className="mt-3 fw-bold" key={barbero.id || barbero.nombre_usuario}>
                                        <li>{barbero.nombre_usuario + " - " + barbero.descripcion}</li>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                </div>
                <div className="container my-5">
                    <div className="border border-light rounded-2 shadow-lg p-5 mx-auto" style={{ maxWidth: "95%" }}>
                        <h2 className='bebas text-center text-white fs-1 pb-3 border-bottom border-light'>
                            CALIFICACIONES A LA BARBERÍA
                        </h2>
                        <div className="text-white mx-4 mt-4">
                            <CalificacionesAdmin />
                        </div>
                    </div>
                </div>

            </div>
        </div>

    )
}
