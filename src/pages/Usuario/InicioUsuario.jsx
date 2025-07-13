import React, { useState, useEffect } from 'react';
import NavbarUserIndex from '../../Components/NavbarUserIndex';
import Swal from 'sweetalert2';
import Rating from 'react-rating-stars-component';
import ReservaCliente from './ReservaCliente';
import CalificacionesUser from '../../Components/CalificacionesUser';
import 'animate.css';
import API from '../../api/api';
import NotaVoz from './NotaVoz';

export default function InicioUsuario() {
  const [user, setUser] = useState({});
  const [mostrarReserva, setMostrarReserva] = useState(false);

  const token = localStorage.getItem("token");
  const usuario = JSON.parse(atob(token.split(".")[1]));
  const email = usuario.email;
  const id = usuario.id;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await API.get(`/traerUsuario/${email}`);
        setUser(res.data[0]);
      } catch (err) {
        console.log("Error al obtener los datos:", err);
      }
    };
    fetchUser();
  }, [email]);


  const [ultimaReserva, setUltimaReserva] = useState(null);

  useEffect(() => {
    const fetchUltimaReserva = async () => {
      try {
        const res = await API.get(`/GetReservasCliente/${id}`);
        const reservas = res.data;

        if (reservas.length > 0) {
          const ultima = reservas.sort((a, b) => new Date(b.fecha) - new Date(a.fecha))[0];
          setUltimaReserva(ultima);
        }
      } catch (err) {
        console.log("Error al obtener reservas:", err);
      }
    };

    if (id) {
      fetchUltimaReserva();
    }
  }, [id]);


  const [nuevaCalificacion, setNuevaCalificacion] = useState({
    id: id,
    puntuacion: 0,
    comentario: ""
  });

  const handleChange = (e) => {
    setNuevaCalificacion(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleRatingChange = (newRating) => {
    setNuevaCalificacion(prev => ({ ...prev, puntuacion: newRating }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/Createcalificaciones", nuevaCalificacion);
      if (res.status === 200) {
        Swal.fire({
          title: "Calificación enviada",
          text: "GRACIAS POR TU CALIFICACIÓN",
          icon: "success",
          iconColor: "#1bf30b",
          confirmButtonColor: "#DC3545",
          confirmButtonText: "Continuar",
          customClass: {
            popup: "dark-theme-popup bg-dark antonparabackend",
          },
          timer: 9000,
        });
        window.location.reload();
      }
    } catch (error) {
      Swal.fire({
        title: "Error al enviar la calificación",
        text: "Por favor, intenta nuevamente",
        icon: "error",
        iconColor: "#1bf30b",
        confirmButtonColor: "#DC3545",
        confirmButtonText: "Continuar",
        customClass: {
          popup: "dark-theme-popup bg-dark antonparabackend",
        },
      });
    }
  };

  return (
    <div>
      <NavbarUserIndex />

      <div className=" py-5 text-white welcomeindex2" id="homeuser">
        <div className=" container row mb-5 g-5 gx-5 contenido mt-5 pt-5">
          <div className="col-12 col-md-6 mb-4 mb-md-0">
            <h1 className="display-1 anton fw-bold">
              Bienvenido, <span className="text-danger">{user.nombre_usuario}</span>
            </h1>
            <p className="mt-4 lead text-light">
              ¡Nos alegra verte de nuevo! Reserva tu cita fácilmente, califica nuestro servicio y disfruta de la mejor experiencia en barbería.
            </p>
          </div>

         {/* {ultimaReserva && <NotaVoz reservaId={ultimaReserva.id_reserva} />} */}



          <div className="col-12 col-md-6 text-center mb-4 mb-md-0">
            <div className="p-4 bg-dark rounded shadow text-center">
              <i className="bi bi-question-circle display-1 mb-4"></i>
              <h3 className="text-white fw-bold mb-4 bebas mt-3">¿Listo para un nuevo look?</h3>
              {!mostrarReserva ? (
                <button
                  className="btn btn-warning btn-lg fw-bold text-dark shadow-lg animate__animated animate__pulse"
                  onClick={() => setMostrarReserva(true)}
                >
                  <i className="bi bi-arrow-right mx-2"></i>Ir a Reservar
                </button>
              ) : (
                <ReservaCliente />
              )}
            </div>
          </div>
        </div>

        <div className="row welcome mx-5">
          <div className="col-12 col-md-6 g-5">
            <h2 className="antonparabackend fw-bold d-flex justify-content-center">
              <span className="text-danger">CALIFICACIONES</span>
              <span className="text-light"> || </span>
              <span className="text-warning">VIP</span>
            </h2>

            <form onSubmit={handleSubmit} className="text-white">
              <div className="mb-4 mx-5 d-flex justify-content-center">
                <Rating
                  count={5}
                  value={nuevaCalificacion.puntuacion}
                  onChange={handleRatingChange}
                  size={60}
                  activeColor="#ffd700"
                  name="puntuacion"
                />
              </div>
              <div className="mb-3  d-flex justify-content-center">
                <textarea
                  name="comentario"
                  className="form-control border-light shadow w-50 text-center"
                  value={nuevaCalificacion.comentario}
                  onChange={handleChange}
                  rows={4}
                  placeholder="¿Qué te pareció el servicio?"
                />
              </div>
              <div className="d-flex justify-content-center">
                <button type="submit" className="btn btn-danger">
                  Enviar Calificación
                </button>
              </div>
            </form>
          </div>

          <div className="col-12 col-md-6">
            <CalificacionesUser userId={id} />
          </div>
        </div>
      </div>

      <footer className="text-center text-light py-4">
        <small>© {new Date().getFullYear()} Barbería VIP. Todos los derechos reservados.</small>
      </footer>
    </div>
  );
}