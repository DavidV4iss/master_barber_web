import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Slider from "react-slick";
import { Modal, Button } from 'react-bootstrap';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Swal from 'sweetalert2';
import API from '../api/api';

export default function CalificacionesUser({ userId }) {
    const [calificaciones, setCalificaciones] = useState([]);
    const [usuarios, setUsuarios] = useState([]);
    const [show, setShow] = useState(false);
    const [selectedCalificacion, setSelectedCalificacion] = useState(null);

    useEffect(() => {
        const fetchCalificaciones = async () => {
            try {
                const res = await API.get(`/traerCalificacionesUsuario/${userId}`);

                setCalificaciones(res.data);
            } catch (err) {
                console.log("Error al obtener las calificaciones:", err);
            }
        };
        fetchCalificaciones();
    }, []);

    useEffect(() => {
        const fetchUsuarios = async () => {
            try {
                const res = await API.get("/traerUsuarios");
                setUsuarios(res.data);
            } catch (err) {
                console.log("Error al obtener los usuarios:", err);
            }
        };
        fetchUsuarios();
    }, []);

    const DeleteCalificacion = async (id) => {
        try {
            const confirm = await Swal.fire({
                title: '¿Estas seguro de borrar esta calificacion?',
                text: "No podrás revertir esta acción",
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sí, borrar',
                customClass: {
                    popup: "dark-theme-popup bg-dark antonparabackend ",
                },
            });
            if (!confirm.isConfirmed) {
                return;
            }
            const res = await API.delete(`/DeleteCalificaciones/${id}`);
            console.log(res);
            if (res.status === 200) {
                Swal.fire({
                    timer: 9000,
                    icon: 'success',
                    title: "Calificacion borrada",
                    customClass: {
                        popup: "dark-theme-popup bg-dark antonparabackend ",
                    },
                }).then(() => {
                    window.location.reload(0);
                })
            }
        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: 'error',
                title: 'Error al borrar',
                text: error.response.data,
                customClass: {
                    popup: "dark-theme-popup bg-dark antonparabackend ",
                },
            });
        }
    };

    const handleShow = (calificacion) => {
        setSelectedCalificacion(calificacion);
        setShow(true);
    };

    const handleClose = () => setShow(false);

    const settings = {
        infinite: calificaciones.length > 1,
        speed: 700,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        autoplay: calificaciones.length > 1,
        autoplaySpeed: 2000,
    };

    return (
        <div className='container text-white '>
            <Slider {...settings}>
                {calificaciones.map((calificacion) => {
                    const usuario = usuarios.find(u => u.id_usuario === calificacion.usuario_id);
                    const fotoUrl = usuario?.foto
                        ? `https://res.cloudinary.com/dnh1n2jbq/image/upload/${usuario.foto}`
                        : "https://cdn-icons-png.flaticon.com/512/149/149071.png";
                    return (
                        <div key={calificacion.id} className="d-flex justify-content-center mt-5 mb-3">
                            <div
                                className="card-calificaciones card bg-gradient-dark text-white"
                                onClick={() => handleShow(calificacion)}
                            >
                                <div className="card-body text-center">
                                    <img
                                        src={fotoUrl}
                                        className="img-fluid rounded-circle mb-3 shadow mx-auto d-block"
                                        style={{ width: "120px", height: "120px", objectFit: "cover", border: "4px solid #dc3545" }}
                                        onError={e => { e.target.src = "https://cdn-icons-png.flaticon.com/512/149/149071.png" }}
                                    />

                                    <h4 className="fw-bold text-danger">{usuario?.nombre_usuario}</h4>
                                    <p className="mt-3 text-light fs-5">{calificacion.comentario || "Sin comentario solo calificación"}</p>
                                    <div className="text-warning fs-4">{"⭐".repeat(calificacion.puntuacion)}</div>
                                </div>
                                <div className="card-footer mt-5 d-flex justify-content-center">
                                    <button
                                        className='btn btn-outline-danger'
                                        onClick={e => {
                                            e.stopPropagation();
                                            DeleteCalificacion(calificacion.id);
                                        }}
                                    >
                                        <i className="bi bi-trash-fill"></i>
                                    </button>
                                </div>
                            </div>

                        </div>

                    );
                })}
            </Slider>

            {selectedCalificacion && (
                <Modal show={show} onHide={handleClose} centered className='justify-content-center'>
                    <Modal.Header closeButton className='bg-dark text-white'>
                        <Modal.Title className='text-danger bebas'>
                            Calificación de {usuarios.find(user => user.id_usuario === selectedCalificacion.usuario_id)?.nombre_usuario}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className='bg-dark text-white text-center '>
                        <img
                            src={`https://res.cloudinary.com/dnh1n2jbq/image/upload/${usuarios.find(user => user.id_usuario === selectedCalificacion.usuario_id)?.foto}`}
                            className="img-fluid rounded-circle mb-3"
                            style={{ width: "90px", height: "90px", objectFit: "cover", border: "3px solid #dc3545" }}
                        />
                        <p className='mt-3 fs-5'>" {selectedCalificacion.comentario} "</p>
                        <p className='fs-4 text-warning'>{"⭐".repeat(selectedCalificacion.puntuacion)}</p>
                    </Modal.Body>
                    <Modal.Footer className='bg-dark'>
                        <Button variant="danger" className='bebas' onClick={handleClose}>
                            Cerrar
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}
        </div>
    );
}
