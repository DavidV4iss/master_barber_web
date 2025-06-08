import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function NavbarUserIndex() {
  const navigate = useNavigate();

  const [user, setUser] = useState({});
  const [imagePreview, setImagePreview] = useState("");
  const [notificaciones, setNotificaciones] = useState([]);
  const token = localStorage.getItem("token");
  const usuario = JSON.parse(atob(token.split(".")[1]));
  const email = usuario.email;

  const showToast = (mensaje, notificacionesToast) => {
    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "info",
      title: mensaje,
      showConfirmButton: false,
      timer: 2050,
      timerProgressBar: true,
      background: "#343a40",
      color: "#fff",
      customClass: {
        popup: "swal2-toast-custom"
      },
      didOpen: (toast) => {
        toast.addEventListener('click', () => handleNotification(notificacionesToast));
      }
    });
  };


  const fetchNotificaciones = async (mostrarToastInicial = false) => {
    try {
      const res = await axios.get(`http://localhost:8080/GetNotificaciones/${user.id_usuario}`);
      if (mostrarToastInicial && res.data.length > 0) {
        const ultima = res.data[0];
        showToast(
          `🔔 ${ultima.mensaje.slice(0, 60)}${ultima.mensaje.length > 60 ? "..." : ""}`,
          res.data
        );
      }
      setNotificaciones(res.data);
    } catch (err) {
      console.error("Error al obtener las notificaciones:", err);
    }
  };

  useEffect(() => {
    if (user.id_usuario) {
      fetchNotificaciones(true);

      const interval = setInterval(async () => {
        try {
          const res = await axios.get(`http://localhost:8080/GetNotificaciones/${user.id_usuario}`);
          setNotificaciones(res.data);
        } catch (err) {
          console.error("Error al actualizar notificaciones:", err);
        }
      }, 15000);

      return () => clearInterval(interval);
    }
  }, [user.id_usuario]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/traerUsuario/${email}`);
        setUser(res.data[0]);
        if (res.data[0].Foto) {
          setImagePreview(`http://localhost:8080/perfil/${res.data[0].Foto}`);
        }
      } catch (err) {
        console.log("Error al obtener los datos:", err);
      }
    };
    fetchUser();
  }, [email]);

  const handleLogout = () => {
    Swal.fire({
      title: "¿Estas seguro que deseas cerrar sesión?",
      text: "Tu sesión será cerrada.",
      imageUrl: "/LOGO.png",
      imageWidth: 200,
      imageHeight: 200,
      showCancelButton: true,
      confirmButtonColor: "#DC3545",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Sí, cerrar sesión",
      customClass: {
        popup: "dark-theme-popup bg-dark antonparabackend",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("token");
        navigate("/login");

        Swal.fire({
          title: "Sesión Cerrada",
          text: "Has cerrado sesión correctamente.",
          icon: "success",
          iconColor: "#1bf30b",
          timer: 2000,
          showConfirmButton: false,
          customClass: {
            popup: "dark-theme-popup bg-dark antonparabackend",
          },
        });
      }
    });
  };

  const handleNotification = (notificacionesParam) => {
    const notifs = notificacionesParam || notificaciones;
    if (notifs.length === 0) {
      Swal.fire({
        position: "top-end",
        title: "🚫 SIN NOTIFICACIONES",
        text: "No tienes notificaciones nuevas por ahora.",
        confirmButtonColor: "#dc3545",
        customClass: {
          popup: "dark-theme-popup bg-dark antonparabackend",
          title: "text-uppercase text-warning",
        },
      });
    } else {
      Swal.fire({
        title: '<span class="text-warning">🔔 TUS NOTIFICACIONES</span>',
        html: `<div id="notification-list" class="notif-container"></div>`,
        confirmButtonText: "OK",
        confirmButtonColor: "#dc3545",
        customClass: {
          popup: "dark-theme-popup bg-dark antonparabackend text-white",
        },
        didOpen: () => {
          const container = document.getElementById("notification-list");
          notifs.forEach(notif => {
            const card = document.createElement("div");
            card.className = "notif-card animate__animated animate__fadeInUp";
            card.innerHTML = `
              <div class="notif-icon">
                <i class="bi bi-app-indicator"></i>
              </div>
              <div class="notif-content">
                <i class="notif-text">${notif.mensaje}</i>
              </div>
              <div class="notif-delete">
                <i class="bi bi-trash-fill" data-id="${notif.id_notificacion}" title="Eliminar"></i>
              </div>
            `;
            card.querySelector(".bi-trash-fill").addEventListener("click", () => {
              deleteNotification(notif.id_notificacion);
            });
            container.appendChild(card);
          });
        }
      });
    }
  };

  const handleNotificationClick = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/GetNotificaciones/${user.id_usuario}`);
      handleNotification(res.data);
      setNotificaciones(res.data);
    } catch (err) {
      console.error("Error al obtener las notificaciones:", err);
      handleNotification([]);
    }
  };

  const deleteNotification = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/DeleteNotificacion/${id}`);
      Swal.fire({
        title: "Notificación eliminada",
        text: "La notificación ha sido eliminada correctamente.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
        customClass: {
          popup: "dark-theme-popup bg-dark antonparabackend",
        },
      });
      fetchNotificaciones();
    } catch (err) {
      console.error("Error al eliminar la notificación:", err);
      Swal.fire({
        title: "Error",
        text: "No se pudo eliminar la notificación.",
        icon: "error",
        confirmButtonColor: "#DC3545",
        customClass: {
          popup: "dark-theme-popup bg-dark antonparabackend",
        },
      });
    }
  };

  return (
    <div className="navbar navbar-expand-md shadow border-bottom border-1">
      <div className="container-fluid justify-content-end">
        <button
          className="navbar-toggler bg-secondary"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#menu"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <p className='position-absolute top-0 start-50 translate-middle-x fw-bold mt-4 anton fs-5 text-uppercase text-danger'>
          ¡Bienvenido!
        </p>
        <div className="collapse navbar-collapse" id="menu">
          <button
            className="btn btn-dark mt-3 position-fixed top-0 end-0 translate-middle-x"
            onClick={handleNotificationClick}
          >
            <i className="bi bi-alarm-fill"></i>
            <span className="position-absolute top-0 start-100 translate-middle badge border border-light rounded-circle bg-danger p-2">
              {notificaciones.length > 0 ? notificaciones.length : ""}
            </span>
          </button>


          <div className="dropdown me-2 pe-5">
            <button
              className="btn dropdown-toggle text-white mx-2"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <img
                src={imagePreview}
                alt='Foto de Perfil'
                className="img-fluid rounded-circle contenido3 text-white zoomhover2 fade-in"
                style={{ width: "50px", height: "50px", objectFit: "cover" }}
                onError={e => { e.target.src = "https://cdn-icons-png.flaticon.com/512/149/149071.png"; }}
              />
            </button>
            <ul className="dropdown-menu dropdown-menu-start bg-dark">
              <li>
                <a className="dropdown-item bebas text-warning" href="/PerfilUser">
                  Perfil
                </a>
              </li>
              <li onClick={handleLogout}>
                <div className="box-2">
                  <div className="btn btn-two text-white">
                    <i className="bi bi-box-arrow-right mx-1"></i> Cerrar sesión
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}