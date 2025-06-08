import React, { useState, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'


export default function Cambiarpasscod() {
    const navigate = useNavigate();


    const [user, setUser] = useState({
        newContrasena: "",
        confirmContra: "",
        verificaCode: ""
    });

    const [iNPU, setCode] = useState(new Array(6).fill(''));
    const inputRefs = useRef([]);


    const handleChange = (event) => {
        setUser(prev => ({ ...prev, [event.target.name]: event.target.value }));
    }

    const codeInput = (event, index) => {
        const { value } = event.target;
        const newCode = [...iNPU];

        if (/\d/.test(value) || value === "") {
            newCode[index] = value;
            setCode(newCode);

            if (value !== '') {
                if (inputRefs.current[index + 1]) {
                    inputRefs.current[index + 1].focus();
                }
            } else {
                if (inputRefs.current[index - 1]) {
                    inputRefs.current[index - 1].focus();
                }
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const verificaCode = iNPU.join('');
        try {
            const res = await axios.post(`http://localhost:8080/cambiarpasscod`, { ...user, verificaCode });
            if (res.status === 200) {
                Swal.fire({
                    timer: 9000,
                    title: 'Se a restablecido la contraseña exitosamente',
                    icon: 'success',
                    confirmButtonText: 'Continuar'
                });
                navigate("/Login");
            }
        } catch (error) {
            console.log(error);
            if (error.response) {
                Swal.fire({
                    title: error.response.data || 'Algo salió mal',
                    icon: 'error',
                    confirmButtonText: 'Intentar de nuevo'
                });
            }
        }
    };




    return (
        <div className="resetpass">
            <div className="min-vh-100 p-5 align-content-center mx-5 justify-content-end row">
                <div className="container p-5 w-50 border border-4 border-white table-responsive border rounded-4 bg-dark.bg-gradient">
                    <div className="row">
                        <div className="col col-lg-12">
                            <h1 className="text-center text-warning antonparabackend mb-4 col col-lg-12">Cambiar Contraseña</h1>
                        </div>
                        <form className='row g-1' onSubmit={handleSubmit}>
                            <div class="input-group mb-1 w-75 mx-auto col col-sm-12">
                                <span class="input-group-text bg-dark text-white"><i class="bi bi-lock"></i></span>
                                <div class="form-floating col col-sm-12">
                                    <input type="password" class="form-control col col-sm-12" placeholder="password" name="newContrasena" onChange={handleChange} required />
                                    <label for="floatingInputGroup1" className='antonpararecuperar col col-sm-12'>Nueva contraseña</label>
                                </div>
                            </div>
                            <div class="input-group mb-4 mt-2 w-75 mx-auto">
                                <span class="input-group-text bg-dark text-white"><i class="bi bi-lock"></i></span>
                                <div class="form-floating">
                                    <input type="password" class="form-control" placeholder="password" name="confirmContra" onChange={handleChange} required />
                                    <label for="floatingInputGroup1" className='antonpararecuperar'>Confrimar contraseña</label>
                                </div>
                            </div>

                            <h3 className='text-center text-white antonparabackend fs-5 mt-3 mb-2'>Ingresa aqui el codigo que recisbiste por correo</h3>
                            <div className="clase-codigo-verificacion">
                                {Array.from({ length: 6 }, (_, index) => (
                                    <input
                                        key={index}
                                        className="cuadros text-center text-white antonpararecuperar"
                                        type="text"
                                        name="verificaCode"
                                        maxLength={1}
                                        value={iNPU[index]}
                                        ref={(el) => (inputRefs.current[index] = el)}
                                        onChange={(e) => codeInput(e, index)}
                                    />
                                ))}
                            </div>

                            <div className=' text-center'>
                                <button type="submit" className="btn btn-outline-warning text-white border-2" >Verificar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
