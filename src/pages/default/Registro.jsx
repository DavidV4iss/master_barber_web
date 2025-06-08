import 'bootstrap/scss/bootstrap.scss'
import React from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import API from '../../api/api'


export default function Registro() {

    const [user, setUser] = useState({
        nombre_usuario: "",
        email: "",
        nit: "",
        telefono: "",
        contraseña: "",
        confirmar_contraseña: ""

    });


    const navigate = useNavigate()

    const handleChange = (e) => {
        setUser(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await API.post("/registrar", user);
            if (res.status === 200) {
                Swal.fire({
                    title: 'Cuenta creada',
                    text: 'Cuenta creada correctamente',
                    icon: 'success',
                    iconColor: "#1bf30b",
                    confirmButtonColor: "#DC3545",
                    confirmButtonText: 'Continuar',
                    customClass: {
                        popup: "dark-theme-popup bg-dark antonparabackend ",
                    },
                });
                navigate("/login");
            }
        } catch (error) {
            console.log(error);
            if (error.response) {
                Swal.fire({
                    title: error.response.data || 'Credenciales incorrectas',
                    icon: 'error',
                    confirmButtonText: 'Intentar de nuevo',
                    cuestomClass: {
                        popup: "dark-theme-popup bg-dark antonparabackend ",
                    }
                });
            }
        }
    }
    return (
        <div className="Registro">
            <div className="min-vh-100 align-content-center mx-5 justify-content-end">
                <div className='container px-3 p-sm-5 border border-4 border-white border table-responsive border rounded-4 bg-dark.bg-gradient'>
                    <div className="row justify-content-center align-items-center">
                        <a href="/">
                            <i className="bi bi-arrow-left-circle-fill text-white fs-3 zoomhover2"></i>
                        </a>
                        <div className="col-12 col-sm-6 bi-text-center mt-5">
                            <img src="/LOGO.png" alt="" className='img-fluid' />
                        </div>
                        <div className="col-12 col-sm-6">
                            <h1 className='text-white text-center anton mb-4'>¡Registrate Aqui!</h1>

                            <form className='row g-1' onSubmit={handleSubmit}>
                                <label for="validationCustom01" className="texto form-label text-white antonparabackend" htmlFor="floatingInput" >Nombre de usuario</label>
                                <div className="input-group mb-3 ">
                                    <span className="input-group-text" id="basic-addon2"><i className="bi bi-person"></i></span>
                                    <input required type="text" className="form-control" name='nombre_usuario' placeholder="Introduce tu nombre de usuario" aria-label="Recipient's username" aria-describedby="basic-addon2" onChange={handleChange}
                                    />
                                </div>

                                <label for="validationCustom01" className="texto form-label text-white antonparabackend">Correo electronico</label>
                                <div className="input-group mb-3">
                                    <span className="input-group-text" id="basic-addon2"><i className="bi bi-envelope"></i></span>
                                    <input required type="email" className="form-control" name='email' placeholder="Ej: pepitoperez@gmail.com" aria-label="Recipient's username" aria-describedby="basic-addon2" onChange={handleChange}
                                    />
                                </div>

                                <label for="validationCustom01" className="texto form-label text-white antonparabackend">Numero de identificacion</label>
                                <div className="input-group mb-3 ">
                                    <span className="input-group-text"><i className="bi bi-person-vcard"></i></span>
                                    <input required type="text" className="form-control" name='nit' placeholder='Introduce tu numero de identificacion' aria-label="Amount (to the nearest dollar)" onChange={handleChange}
                                    />
                                </div>

                                <label for="validationCustom01" className="texto form-label text-white antonparabackend">Telefono</label>
                                <div className="input-group mb-3">
                                    <span className="input-group-text"><i className="bi bi-telephone-plus"></i></span>
                                    <input required type="text" className="form-control" name='telefono' placeholder='Introduce tu numero de celular' aria-label="Amount (to the nearest dollar)" onChange={handleChange}
                                    />
                                </div>

                                <label for="validationCustom01" className="texto form-label antonparabackend text-white">Contraseña</label>
                                <div className="input-group mb-3">
                                    <span className="input-group-text"><i className="bi bi-file-lock"></i></span>
                                    <input required type="password" className="form-control" name='contraseña' placeholder='Crea tu contraseña' aria-label="Amount (to the nearest dollar)" onChange={handleChange}
                                    />
                                </div>

                                <label for="validationCustom01" className="texto form-label text-white antonparabackend">Confima tu contraseña</label>
                                <div className="input-group mb-3">
                                    <span className="input-group-text"><i className="bi bi-file-lock"></i></span>
                                    <input required type="password" className="form-control" name='confirmar_contraseña' placeholder='Confirma tu contraseña' aria-label="Amount (to the nearest dollar)" onChange={handleChange}
                                    />
                                </div>

                                <div class="col-12 col-sm-7 ">
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" value="" id="invalidCheck" required />

                                        <label class="form-check-label text-white " for="invalidCheck">
                                            <a className="text-decoration-none bebas text-white"> Acepta Nuestros  </a>
                                            <br className='d-block d-sm-none' />
                                            <a className="link-offset-1 text-decoration-none bebas" href="./Terminosycondiciones" data-bs-toggle="modal" data-bs-target="#exampleModal"> Terminos Y Condiciones </a>

                                            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                <div class="modal-dialog">
                                                    <div class="modal-content bg-dark">
                                                        <div class="modal-header">
                                                            <h1 class="modal-title fs-2 bebas text-warning" id="exampleModalLabel">Terminos Y Condiciones</h1>
                                                            <button type="button" class="btn-close bg-white" data-bs-dismiss="modal" aria-label="Close"></button>
                                                        </div>
                                                        <div class="modal-body">
                                                            <p> Autorizo en forma previa, expresa e informada, como Titular de los datos personales comunicados a Colombiana de Comercio S.A. (la “Compañía”), con NIT. 890.900.943-1, así como a todas sus Unidades de Negocio enunciadas en su Política de Privacidad, el tratamiento de mis datos personales para: (i) cumplir y hacer cumplir las obligaciones entre la Compañía y el titular del dato, tales como de garantía, servicio posventa, gestión de cobranza, entre otras; a través de la información de contacto que comunico, los cuales incluyen, pero sin limitarse, correo electrónico, número celular, entre otros (ii) comunicar información publicitaria y de mercadeo sobre los productos y servicios que ofrece, intermedia o comercializa la Compañía, a través de medios físicos, digitales y de nuevas tecnologías de la información, tales como redes sociales, mensajería instantánea, correo electrónico, mensajes de texto (SMS y/o MMS), aplicaciones web y/o plataformas virtuales asociadas a los datos personales que comunico; (iii) evaluar preferencias, experiencias sobre productos y hábitos de consumo; (iv) entregar información a fabricantes y/o importadores sobre los productos adquiridos para análisis de calidad; (v) fidelizar clientes; (vi) realizar acciones de inteligencia de negocios, prospectiva de clientes y tendencias de mercado.

                                                                Los datos personales serán gestionados de forma segura y algunos tratamientos podrán ser realizados de manera directa o a través de encargados, quienes podrán estar domiciliados dentro o fuera de Colombia, en Europa y en países tales como los Estados Unidos, entre otros. El tratamiento de los datos personales por parte de la Compañía se realizará dando cumplimiento a la Política de Privacidad y Protección de Datos personales, publicada en www.alkosto.com.

                                                                El titular de los datos personales tiene derecho a (i) conocer, actualizar y rectificar sus datos sobre información parcial, inexacta, incompleta, fraccionada o que induzca al error; (ii) solicitar prueba de esta autorización; (iii) ser informado(a) sobre el Tratamiento dado a sus datos; (iv) presentar quejas a la Superintendencia de Industria y Comercio; (v) revocar la autorización y solicitar la supresión de los datos suministrados en los términos de la Ley 1581 de 2012; (vi) acceder gratuitamente a los datos objeto de Tratamiento. Estos derechos podrán ser ejercidos a través de los siguientes canales: (i) Calle 11 N° 31 A – 42, Bogotá; (ii) datos.personales@corbeta.com.co.

                                                                Asimismo, declaro que en caso tal de encontrarme suministrando información de un tercero, he obtenido de manera previa su consentimiento para la comunicación de sus datos personales a la Compañía. </p>
                                                        </div>
                                                        <div class="modal-footer">
                                                            <button type="button" class="text-white border-2 btn btn-outline-warning" data-bs-dismiss="modal">Acepto El Tratamiento De Datos</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </label>
                                        <div class="invalid-feedback">
                                            Debes aceptar antes de enviar
                                        </div>
                                    </div>
                                </div>

                                <div className='col-12 col-sm-5 text-end bebas '>
                                    <p className='text-white text-center '>¿Ya tienes cuenta? <br className='d-block d-sm-none' /><a className="link-offset-1 text-decoration-none" href="./login"> Inicia sesion</a></p>

                                </div>
                                <div className=' text-center mt-2'>
                                    <button type="submit" className="btn btn-outline-warning antonparabackend">Continuar</button>
                                </div>



                            </form>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}