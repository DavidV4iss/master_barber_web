import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'
import Swal from 'sweetalert2'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import API from "../../api/api";



export default function EnvEmail() {

    const navigate = useNavigate();
    const [user, setUser] = useState({
        email: ""
    });

    const handleChange = (e) => {
        setUser(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await API.post("/EnvEmail", user);
            if (res.status === 200) {
                Swal.fire({
                    timer: 9000,
                    title: 'El Codigo Fue Enviado A Tu Correo',
                    icon: 'success',
                    confirmButtonText: 'Continuar'
                });
                navigate("/Cambiarpasscod");
            }
        } catch (error) {
            console.log(error);
            if (error.response) {
                Swal.fire({
                    title: error.response.data || 'Algo salio mal Al Enviar El Codigo',
                    icon: 'error',
                    confirmButtonText: 'Intentar de nuevo'
                });
            }
        }
    };


    return (
        <div className="resetpass">
            <div className="min-vh-100 p-5 align-content-center mx-5 justify-content-end row table-responsive">
                <div className="container p-5 w-50 border border-4 border-white table-responsive border rounded-4 bg-dark.bg-gradient col-sm-12 col">
                    <div className="row">
                        <div className=" col col-sm-12">
                            <h2 className="text-center text-warning anton mb-4 display-6 col">Recupera tu contraseña</h2>
                        </div>
                        <form className='row g-1' onSubmit={handleSubmit}>
                            <h3 className="text-white text-center antonparabackend mb-2 p-2 col-sm-12 col">¡Se Enviara Un Codigo De Verificación A Tu Correo!</h3>
                            <div className="input-group mb-3 w-50 mx-auto mt-4 row ">
                                <input clas required type="email" className="form-control col col-sm-2" name='email' placeholder="Correo electronico" aria-label="Recipient's username" aria-describedby="basic-addon2"
                                    onChange={handleChange}
                                />
                            </div>

                            <div className=' text-center mt-4 mb-4 text-sm-center'>
                                <button type="submit" className="btn btn-outline-warning antonparabackend">Enviar Codigo</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}