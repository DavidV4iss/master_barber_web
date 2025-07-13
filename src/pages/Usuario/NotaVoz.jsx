import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { FaMicrophone, FaStop, FaMicrophoneAlt, FaVolumeUp } from 'react-icons/fa';
import Swal from 'sweetalert2';
import API from '../../api/api';


const API_URL = process.env.API_URL || "http://localhost:8080";
const token = localStorage.getItem("token");
const usuario_id = token ? JSON.parse(atob(token.split('.')[1]))?.id : null;

const NotaVoz = ({ reservaId }) => {
    const [grabando, setGrabando] = useState(false);
    const [mediaRecorder, setMediaRecorder] = useState(null);
    const [notas, setNotas] = useState([]);
    const chunks = useRef([]);

    useEffect(() => {
        if (reservaId) fetchNotas();
    }, [reservaId]);

    const fetchNotas = async () => {
        try {
            const res = await axios.get(`${API_URL}/notasVoz/${reservaId}`);
            setNotas(res.data);
        } catch (err) {
            console.error('Error al obtener notas:', err);
        }
    };

    const startRecording = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const recorder = new MediaRecorder(stream);

        recorder.ondataavailable = (e) => chunks.current.push(e.data);
        recorder.onstop = async () => {
            const blob = new Blob(chunks.current, { type: 'audio/webm' });
            chunks.current = [];

            const formData = new FormData();
            formData.append('audio', blob, `nota-${Date.now()}.webm`);
            formData.append('usuario_id', usuario_id);
            formData.append('reserva_id', reservaId);

            await axios.post(`${API_URL}/uploadNotaVoz`, formData);
            fetchNotas();
        };

        recorder.start();
        setMediaRecorder(recorder);
        setGrabando(true);
    };

    const stopRecording = () => {
        mediaRecorder.stop();
        setGrabando(false);
    };

    const ultimaNota = notas.length > 0 ? notas[notas.length - 1] : null;

    const eliminarNota = async (id) => {
        try {
            const confirm = await Swal.fire({
                title: '¿Estas seguro de borrar esta nota de voz?',
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
            const res = await API.delete(`/deleteNotaVoz/${id}`);
            console.log(res);
            if (res.status === 200) {
                Swal.fire({
                    timer: 9000,
                    icon: 'success',
                    title: "Nota de voz borrada",
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


    return (
        <div className="mt-4 p-4 rounded bg-dark shadow-lg text-white border border-secondary">
            <h4 className="mb-3"><FaMicrophoneAlt className="text-danger me-2" />Notas de Voz</h4>

            <div className="text-center mb-4">
                <button
                    className={`btn btn-lg ${grabando ? 'btn-danger' : 'btn-success'} rounded-circle shadow`}
                    style={{ width: 80, height: 80 }}
                    onClick={grabando ? stopRecording : startRecording}
                >
                    {grabando ? <FaStop size={30} /> : <FaMicrophone size={30} />}
                </button>
                <p className="mt-2 fw-bold">
                    {grabando ? "🎙️ Grabando..." : "Presiona para grabar"}
                </p>
            </div>

            {ultimaNota && (
                <div className="bg-secondary bg-opacity-25 p-3 rounded mb-4">
                    <h6 className="text-warning"><FaVolumeUp className="me-2" />Última nota grabada</h6>
                    <div className="d-flex align-items-center justify-content-between">
                        <audio src={`${API_URL}/notasVoz/${ultimaNota.nombre_archivo}`} controls className="w-75" />
                        <button className="btn btn-sm btn-outline-danger ms-2" onClick={() => eliminarNota(ultimaNota.id)}>
                            🗑️
                        </button>
                    </div>

                    <p className="text-light small mt-1">
                        Grabada el: {new Date(ultimaNota.fecha).toLocaleString()}
                    </p>
                </div>
            )}

            <div>
                <h5 className="mb-3">Historial de Notas</h5>
                {notas
                    .slice(0, -1)
                    .reverse()
                    .map((nota) => (
                        <div key={nota.id} className="bg-secondary bg-opacity-10 rounded p-2 mb-2">
                            <div className="d-flex align-items-center justify-content-between">
                                <audio src={`${API_URL}/notasVoz/${nota.nombre_archivo}`} controls className="w-75" />
                                <button className="btn btn-sm btn-outline-danger ms-2" onClick={() => eliminarNota(nota.id)}>
                                    🗑️
                                </button>
                            </div>

                            <p className="small text-white-50 mt-1 mb-0">
                                {new Date(nota.fecha).toLocaleString()}
                            </p>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default NotaVoz;
