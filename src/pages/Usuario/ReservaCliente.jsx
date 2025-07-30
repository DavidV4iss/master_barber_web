import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styled from 'styled-components';
import moment from 'moment';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import API from '../../api/api';
const API_URL = process.env.API_URL || "http://localhost:8080";


const StyledDatePicker = styled(DatePicker)`
  width: 100%;
  font-size: 16px;
  background-color: transparent;
  border: none;
  color: white;

  &:focus {
    outline: none;
    box-shadow: none;
  }
`;

const WhiteTextarea = styled.textarea`
  color: #fff !important;
  background-color: #212529 !important;
  border: 1px solid rgb(255, 255, 255);
  border-radius: 1rem;
  width: 100%;
  padding: 1rem;
  font-size: 1rem;
  resize: vertical;
  min-height: 80px;

  &::placeholder {
    color: #bbb;
    opacity: 1;
  }
`;

export default function Reserva() {
    const [service, setService] = useState('');
    const [date, setDate] = useState(new Date());
    const [barberoId, setBarberoId] = useState('');
    const [barberos, setBarberos] = useState([]);
    const [servicios, setServicios] = useState([]);
    const [currentStep, setCurrentStep] = useState(1);
    const [horasOcupadas, setHorasOcupadas] = useState([]);
    const [observacion, setObservacion] = useState('');
    const [loading, setLoading] = useState(false);

    const token = localStorage.getItem('token');
    const tokenDecoded = token ? JSON.parse(atob(token.split('.')[1])) : null;
    const id = tokenDecoded?.id || null;

    const nextStep = () => setCurrentStep((prev) => prev + 1);
    const prevStep = () => setCurrentStep((prev) => prev - 1);

    useEffect(() => {
        API.get('/GetBarberos')
            .then(res => setBarberos(res.data))
            .catch(err => console.error(err));

        if (barberoId) {
            API.get(`/GetReservas/barbero/${barberoId}`)
                .then(res => setHorasOcupadas(res.data.map(r => new Date(r.fecha))))
                .catch(err => console.error(err));
        }

        API.get('/GetServicios')
            .then(res => setServicios(res.data))
            .catch(err => console.error(err));
    }, [barberoId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (loading) return;
        setLoading(true);

        if (!service || !barberoId || !date) {
            Swal.fire({
                icon: 'error',
                title: 'Campos incompletos',
                text: 'Por favor, completa todos los pasos.',
                customClass: { popup: 'dark-theme-popup bg-dark antonparabackend' },
            });
            setLoading(false);
            return;
        }

        const formattedDate = moment(date).format('YYYY-MM-DD HH:mm:ss');

        try {
            await API.post('/CrearReservas', {
                cliente_id: id,
                barbero_id: barberoId,
                servicio: service,
                fecha: formattedDate,
                estado: 'Pendiente',
                observacion,
            });

            Swal.fire({
                icon: 'success',
                title: 'Reserva creada exitosamente',
                text: 'Espera la confirmación del barbero.',
                customClass: { popup: 'dark-theme-popup bg-dark antonparabackend' },
            });

            setService('');
            setBarberoId('');
            setDate(new Date());
            setObservacion('');
            setCurrentStep(1);
        } catch (err) {
            const msg = err.response?.data?.message || 'Hubo un problema. Inténtalo nuevamente.';
            Swal.fire({
                icon: 'error',
                title: 'Error al crear la reserva',
                text: msg,
                customClass: { popup: 'dark-theme-popup bg-dark antonparabackend' },
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='text-white text-center mt-5 rounded-4 container'>
            <form onSubmit={handleSubmit} className='fade-in'>

                {currentStep === 1 && (
                    <>
                        <h3 className='antonparabackend mt-5'>
                            <i className='fas fa-scissors me-2 text-danger'></i>Selecciona el servicio que deseas
                        </h3>
                        <div className='container-fluid w-75'>
                            <div className='row mt-5 mb-5 justify-content-center'>
                                {servicios.map((servicio, index) => {
                                    const isSelected = service === servicio.id_tipo_servicio;
                                    return (
                                        <div
                                            key={servicio.id_tipo_servicio}
                                            className={`col-12 col-sm-6 col-md-4 col-lg-6 mb-4 d-flex justify-content-end mx-auto card-hover`}
                                            onClick={() => setService(servicio.id_tipo_servicio)}
                                            style={{ cursor: 'pointer' }}
                                        >
                                            <div className={`card ${isSelected ? 'border border-3 border-warning shadow-lg selected-card' : 'border border-secondary'} bg-dark text-white rounded-4 w-100`}>
                                                <h5 className='card-title text-center fs-3 mt-3 text-warning UnifrakturMaguntia'>
                                                    {servicio.nombre}
                                                </h5>
                                                <div className='card-body'>
                                                    <img
                                                        src={index === 1 ? '/cortePremium.jpg' : '/corteBasico.jpg'}
                                                        className='card-img-top rounded-3'
                                                        alt={servicio.nombre}
                                                    />
                                                    <p className='text-light bebas fs-5 mt-4'>{servicio.descripcion_S}</p>
                                                    {isSelected && <span className='badge bg-success mt-2'>Seleccionado ✅</span>}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                        <button className='btn btn-warning px-4 py-2 shadow rounded-4 text-white' onClick={nextStep}>
                            Siguiente <i className='fas fa-arrow-right ms-2'></i>
                        </button>
                    </>
                )}

                {currentStep === 2 && (
                    <>
                        <h3 className='antonparabackend mt-5'>
                            <i className='fas fa-user-alt me-2 text-danger'></i>Selecciona tu barbero preferido
                        </h3>
                        <div className='mt-5 mb-5'>
                            <Swiper
                                slidesPerView={1}
                                spaceBetween={20}
                                pagination={{ clickable: true }}
                                breakpoints={{ 576: { slidesPerView: 1 }, 768: { slidesPerView: 2 }, 992: { slidesPerView: 3 } }}
                                modules={[Pagination]}
                                className='mySwiper'
                            >
                                {barberos.map((barbero) => {
                                    const isSelected = barberoId === barbero.id_usuario;
                                    return (
                                        <SwiperSlide key={barbero.id_barbero}>
                                            <div onClick={() => setBarberoId(barbero.id_usuario)} style={{ cursor: 'pointer' }}>
                                                <div className={`card ${isSelected ? 'border border-3 border-warning shadow-lg selected-card' : 'border border-secondary'} bg-dark text-white rounded-4 h-100`}>
                                                    <h5 className='card-title text-danger text-center bebas fs-4 mt-4'>
                                                        {barbero.nombre_usuario}
                                                    </h5>
                                                    <div className='card-body d-flex flex-column align-items-center text-center'>
                                                        <img
                                                            src={`${API_URL}/imagesBarbero/${barbero.foto}`}
                                                            className='card-img-top rounded-3 img-fluid'
                                                            alt={barbero.nombre_usuario}
                                                            style={{ maxHeight: '200px', objectFit: 'cover' }}
                                                        />
                                                        <p className='text-light bebas fs-6 mt-4'>{barbero.descripcion}</p>
                                                        {isSelected && <span className='badge bg-success mt-2'>Seleccionado ✅</span>}
                                                    </div>
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                    );
                                })}
                            </Swiper>
                        </div>
                        <button className='btn btn-danger me-3 px-4 py-2 rounded-4' onClick={prevStep}>
                            <i className='fas fa-arrow-left me-2'></i> Anterior
                        </button>
                        <button className='btn btn-warning px-4 py-2 rounded-4 text-white' onClick={nextStep}>
                            Siguiente <i className='fas fa-arrow-right ms-2'></i>
                        </button>
                    </>
                )}

                {currentStep === 3 && (
                    <>
                        <h3 className='antonparabackend mt-3 text-white'>Selecciona la fecha y hora</h3>
                        <div className='calendar-container mt-5 mb-4 container'>
                            <StyledDatePicker
                                selected={date}
                                onChange={(date) => setDate(date)}
                                showTimeSelect
                                timeFormat='hh:mm aa'
                                timeIntervals={60}
                                dateFormat="d 'de' MMMM 'de' yyyy hh:mm"
                                minDate={new Date()}
                                placeholderText='Selecciona una fecha y hora'
                                inline
                                timeCaption='Hora'
                                filterTime={(time) => {
                                    const selectedTime = new Date(time);
                                    const now = new Date();
                                    const isSameDay = selectedTime.toDateString() === now.toDateString();
                                    const isFutureTime = !isSameDay || selectedTime.getTime() > now.getTime();
                                    const hours = selectedTime.getHours();
                                    const isOcupada = horasOcupadas.some(h => h.getTime() === selectedTime.getTime());
                                    return hours >= 8 && hours <= 22 && isFutureTime && !isOcupada;
                                }}
                            />
                        </div>
                        <p className='mt-2 text-white bebas container fs-5'>
                            {date ? `Fecha y hora seleccionada: ${date.toLocaleString('es-ES', {
                                day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit'
                            })}` : 'Seleccione una fecha'}
                        </p>
                        <button className='btn btn-danger me-3' onClick={prevStep}>Anterior</button>
                        {service === 1 ? (
                            <button className='btn btn-warning text-white' onClick={nextStep}>Siguiente</button>
                        ) : (
                            <button type='submit' className='btn btn-success'>Confirmar reserva</button>
                        )}
                    </>
                )}

                {currentStep === 4 && (
                    <>
                        {service === 1 && (
                            <>
                                <h3 className='antonparabackend mt-3 text-white'>Observaciones adicionales <span className=' text-danger'>(opcional)</span></h3>
                                <div className='container mt-4'>
                                    <WhiteTextarea
                                        rows='3'
                                        placeholder='Si deseas añadirle algo a tu corte hasnoslo saber'
                                        value={observacion}
                                        onChange={(e) => setObservacion(e.target.value)}
                                    />
                                </div>
                            </>
                        )}
                        <button className='btn btn-danger me-3 mt-4' onClick={prevStep}>Anterior</button>
                        <button type='submit' className='btn btn-success mt-4'>Confirmar reserva</button>
                    </>
                )}
            </form>
        </div>
    );
}