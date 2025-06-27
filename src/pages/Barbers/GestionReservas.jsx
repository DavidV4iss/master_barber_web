import React, { useState, useEffect } from 'react';
import NavbarBarber from '../../Components/NavbarBarber';
import API from '../../api/api';
import { CheckCircle, XCircle, Clock, Trash2 } from 'lucide-react';

const API_URL = process.env.API_URL || "http://localhost:8080";

export default function GestionReservas() {
    const [reservas, setReservas] = useState([]);
    const [servicios, setServicios] = useState([]);
    const [clientes, setClientes] = useState([]);
    const [loadingAction, setLoadingAction] = useState(null);
    const [Barber, setBarber] = useState({});
    const [cancelTimers, setCancelTimers] = useState({});
    const [finalizedReservations, setFinalizedReservations] = useState([]);

    const token = localStorage.getItem('token');
    const tokenDecoded = token ? JSON.parse(atob(token.split('.')[1])) : null;
    const id = tokenDecoded.id;
    const email = tokenDecoded.email;

    useEffect(() => {
        API.get(`/GetReservas/barbero/${id}`).then(res => setReservas(res.data));
        API.get(`/traerUsuario/${email}`).then(res => setBarber(res.data[0]));
        API.get('/GetServicios').then(res => setServicios(res.data));
        API.get('/GetClientes').then(res => setClientes(res.data));
    }, []);

    const handleUpdateEstado = (id, nuevoEstado) => {
        setLoadingAction(id + nuevoEstado);
        API.patch(`/UpdateReservasEstado/${id}`, { estado: nuevoEstado })
            .then(() => {
                setReservas(prev => prev.map(r =>
                    r.id_reserva === id ? { ...r, estado: nuevoEstado } : r
                ));
                if (nuevoEstado === 'Cancelada') {
                    const timer = setTimeout(() => handleDelete(id), 60 * 60 * 1000);
                    setCancelTimers(prev => ({ ...prev, [id]: timer }));
                }
                if (nuevoEstado === 'finalizada') setFinalizedReservations(prev => [...prev, id]);
            })
            .finally(() => setLoadingAction(null));
    };

    const handleDelete = (id) => {
        API.delete(`/DeleteReserva/${id}`).then(() => {
            setReservas(prev => prev.filter(r => r.id_reserva !== id));
            clearTimeout(cancelTimers[id]);
        });
    };

    const getServiceName = (id) => servicios.find(s => s.id_tipo_servicio === id)?.nombre || 'Servicio desconocido';

    const getClientInfo = (id) => {
        const cliente = clientes.find(c => c.id_usuario === id);
        return cliente ? {
            nombre: cliente.nombre_usuario,
            foto: `${API_URL}/perfil/${cliente.Foto}`
        } : { nombre: 'Cliente desconocido', foto: '' };
    };

    const getEstadoClass = (estado) => {
        switch (estado) {
            case 'Pendiente': return 'estado-pendiente';
            case 'Aceptada': return 'estado-aceptada';
            case 'Cancelada': return 'estado-cancelada';
            case 'finalizada': return 'estado-finalizada';
            default: return '';
        }
    };

    return (
        <div className="gestion-reservas">
                <NavbarBarber />
            <div className="container">
                <h2 className="mt-5 cesar">Hola <span className="cesar">{Barber.nombre_usuario}</span> 👋</h2>
                <div className="row g-4">
                    {reservas.length === 0 ? (
                        <div className="text-center w-100 fs-4 cesar mt-5 fs-3 fw-bold text-danger">No tienes reservas pendientes.</div>
                    ) : reservas.map(reserva => {
                        const cliente = getClientInfo(reserva.cliente_id);
                        const isLoading = loadingAction?.startsWith(reserva.id_reserva.toString());

                        return (
                            <div className="col-12 col-md-6 col-lg-4" key={reserva.id_reserva}>
                                <div className="card reserva-card h-100">
                                    <div className="card-body d-flex flex-column">
                                        <div className="text-center mb-3">
                                            {cliente.foto && (
                                                <img src={cliente.foto} alt="Cliente" className="cliente-img" />
                                            )}
                                            <h5 className="mt-2 cesar">{cliente.nombre}</h5>
                                        </div>

                                        <p><strong className='cesar'>Servicio:</strong> {getServiceName(reserva.servicio)}</p>
                                        <p><strong className='cesar'>Observación:</strong> {reserva.observacion?.trim() || 'Sin observaciones'}</p>
                                        <p><strong className='cesar'>Fecha:</strong> {new Date(reserva.fecha).toLocaleString()}</p>
                                        <p>
                                            <strong className='cesar'>Estado:</strong>{' '}
                                            <span className={`estado-badge ${getEstadoClass(reserva.estado)}`}>
                                                {reserva.estado}
                                            </span>
                                        </p>

                                        <div className="mt-auto d-flex flex-wrap gap-2 justify-content-center">
                                            {finalizedReservations.includes(reserva.id_reserva) ? (
                                                <button className="btn btn-danger reserva-btn" onClick={() => handleDelete(reserva.id_reserva)}>
                                                    <Trash2 size={16} /> Eliminar
                                                </button>
                                            ) : (
                                                <>
                                                    <button className="btn btn-success reserva-btn" disabled={isLoading} onClick={() => handleUpdateEstado(reserva.id_reserva, 'Aceptada')}>
                                                        <CheckCircle size={16} /> Aceptar
                                                    </button>
                                                    <button className="btn btn-secondary reserva-btn" disabled={isLoading} onClick={() => handleUpdateEstado(reserva.id_reserva, 'finalizada')}>
                                                        <Clock size={16} /> Finalizar
                                                    </button>
                                                    <button className="btn btn-warning text-dark reserva-btn" disabled={isLoading} onClick={() => handleUpdateEstado(reserva.id_reserva, 'Cancelada')}>
                                                        <XCircle size={16} /> Cancelar
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
