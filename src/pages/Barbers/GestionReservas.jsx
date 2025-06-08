import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavbarBarber from '../../Components/NavbarBarber';

export default function GestionReservas() {
    const [reservas, setReservas] = useState([]);
    const [servicios, setServicios] = useState([]);
    const [clientes, setClientes] = useState([]);
    const [isLoadingFinal, setIsLoadingFinal] = useState(false);
    const [isLoadingCancel, setIsLoadingCancel] = useState(false);
    const [isLoadingAccept, setIsLoadingAccept] = useState(false);
    const [finalizedReservations, setFinalizedReservations] = useState([]);
    const [cancelTimers, setCancelTimers] = useState({});
    const [Barber, setBarber] = useState({});

    const token = localStorage.getItem('token');
    const tokenDecoded = token ? JSON.parse(atob(token.split('.')[1])) : null;
    const id = tokenDecoded.id;
    const usuario = JSON.parse(atob(token.split(".")[1]));
    const email = usuario.email;

    useEffect(() => {
        axios.get(`http://localhost:8080/GetReservas/barbero/${id}`)
            .then(res => setReservas(res.data))
            .catch(err => console.error('Error al obtener reservas:', err));

        axios.get(`http://localhost:8080/traerUsuario/${email}`)
            .then(res => setBarber(res.data[0]))
            .catch(err => console.error('Error al obtener datos del barbero:', err));

        axios.get('http://localhost:8080/GetServicios')
            .then(res => setServicios(res.data))
            .catch(err => console.error('Error al obtener servicios:', err));

        axios.get('http://localhost:8080/GetClientes')
            .then(res => setClientes(res.data))
            .catch(err => console.error('Error al obtener clientes:', err));
    }, []);

    const handleAccept = (id) => {
        setIsLoadingAccept(true);
        axios.patch(`http://localhost:8080/UpdateReservasEstado/${id}`, { estado: 'Aceptada' })
            .then(() => {
                setReservas(prev =>
                    prev.map(res => res.id_reserva === id ? { ...res, estado: 'Aceptada' } : res)
                );
                if (cancelTimers[id]) {
                    clearTimeout(cancelTimers[id]);
                    setCancelTimers(prev => {
                        const updated = { ...prev };
                        delete updated[id];
                        return updated;
                    });
                }
            })
            .catch(err => console.error('Error al aceptar reserva:', err))
            .finally(() => setIsLoadingAccept(false));
    };

    const handleCancel = (id) => {
        setIsLoadingCancel(true);
        axios.patch(`http://localhost:8080/UpdateReservasEstado/${id}`, { estado: 'Cancelada' })
            .then(() => {
                setReservas(prev =>
                    prev.map(res => res.id_reserva === id ? { ...res, estado: 'Cancelada' } : res)
                );
                const timer = setTimeout(() => handleDelete(id), 60 * 60 * 1000);
                setCancelTimers(prev => ({ ...prev, [id]: timer }));
            })
            .catch(err => console.error('Error al cancelar reserva:', err))
            .finally(() => setIsLoadingCancel(false));
    };

    const handleFinalize = (id) => {
        setIsLoadingFinal(true);
        axios.patch(`http://localhost:8080/UpdateReservasEstado/${id}`, { estado: 'finalizada' })
            .then(() => {
                setReservas(prev =>
                    prev.map(res => res.id_reserva === id ? { ...res, estado: 'finalizada' } : res)
                );
                setFinalizedReservations(prev => [...prev, id]);
            })
            .catch(err => console.error('Error al finalizar reserva:', err))
            .finally(() => setIsLoadingFinal(false));
    };

    const handleDelete = (id) => {
        axios.delete(`http://localhost:8080/DeleteReserva/${id}`)
            .then(() => {
                setReservas(prev => prev.filter(res => res.id_reserva !== id));
                if (cancelTimers[id]) {
                    clearTimeout(cancelTimers[id]);
                    setCancelTimers(prev => {
                        const updated = { ...prev };
                        delete updated[id];
                        return updated;
                    });
                }
            })
            .catch(err => console.error('Error al eliminar reserva:', err));
    };

    const getServiceName = (id) => {
        const servicio = servicios.find(s => s.id_tipo_servicio === id);
        return servicio ? servicio.nombre : 'Desconocido';
    };

    const getClientInfo = (id) => {
        const cliente = clientes.find(c => c.id_usuario === id);
        return cliente
            ? {
                nombre: cliente.nombre_usuario,
                imagen: (
                    <img
                        src={`http://localhost:8080/perfil/${cliente.Foto}`}
                        alt="Foto de Perfil"
                        className="img-fluid rounded-circle"
                        style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                    />
                )
            }
            : { nombre: 'Desconocido', imagen: null };
    };

    const getEstadoColor = (estado) => {
        switch (estado) {
            case 'Pendiente':
                return 'text-primary';
            case 'Aceptada':
                return 'text-success';
            case 'Cancelada':
                return 'text-warning';
            case 'finalizada':
                return 'text-secondary';
            default:
                return 'text-light';
        }
    };

    return (
        <div className="text-white mb-5">
            <NavbarBarber />
            <div className="text-center mt-5 pt-5 ">
                <h2 className="fw-bold text-light display-5 anton">
                    HOLA <span className="text-warning">{Barber.nombre_usuario}</span>,{' '}
                    {reservas.length > 0
                        ? 'TIENES LAS SIGUIENTES RESERVAS PENDIENTES'
                        : 'TODO TRANQUILO, NO TIENES RESERVAS'}
                </h2>

                {isLoadingFinal && (
                    <div className="text-center mt-5 fs-4 UnifrakturMaguntia text-danger">
                        Finalizando...
                    </div>
                )}
                {isLoadingCancel && (
                    <div className="text-center mt-5 fs-4 UnifrakturMaguntia text-warning">
                        Cancelando...
                    </div>
                )}
                {isLoadingAccept && (
                    <div className="text-center mt-5 fs-4 UnifrakturMaguntia text-success">
                        Aceptando...
                    </div>
                )}

                <div className="container-fluid mt-5">
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 px-4">
                        {reservas.map((reserva) => {
                            const cliente = getClientInfo(reserva.cliente_id);
                            return (
                                <div className="col" key={reserva.id_reserva}>
                                    <div className="card bg-dark text-white shadow rounded-4 p-3 h-100">
                                        <div className="text-center">{cliente.imagen}</div>
                                        <div className="mt-4">
                                            <p><strong className="text-warning">Cliente:</strong> {cliente.nombre}</p>
                                            <p><strong className="text-warning">Servicio:</strong> {getServiceName(reserva.servicio)}</p>
                                            <p><strong className="text-warning">Observaciones:</strong> {reserva.observacion?.trim() || 'Sin observaciones'}</p>
                                            <p><strong className="text-warning">Fecha y Hora:</strong> {new Date(reserva.fecha).toLocaleString()}</p>
                                            <p>
                                                <strong className="text-warning">Estado:</strong>{' '}
                                                <span className={`fw-bold ${getEstadoColor(reserva.estado)}`}>
                                                    {reserva.estado}
                                                </span>
                                            </p>
                                        </div>

                                        <div className="mt-4 d-flex justify-content-center flex-wrap gap-2">
                                            {finalizedReservations.includes(reserva.id_reserva) ? (
                                                <button className="btn btn-danger" onClick={() => handleDelete(reserva.id_reserva)}>
                                                    Eliminar
                                                </button>
                                            ) : (
                                                <>
                                                    <button className="btn btn-success" onClick={() => handleAccept(reserva.id_reserva)}>
                                                        Aceptar
                                                    </button>
                                                    <button className="btn btn-danger" onClick={() => handleFinalize(reserva.id_reserva)}>
                                                        {isLoadingFinal ? 'Finalizando...' : 'Finalizar'}
                                                    </button>
                                                    <button className="btn btn-warning" onClick={() => handleCancel(reserva.id_reserva)}>
                                                        Cancelar
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
