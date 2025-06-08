import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";


export default function NavbarBarber() {

  const navigate = useNavigate();

  const [barber, setBarber] = useState({});
  const [imagePreview, setImagePreview] = useState("");


  const token = localStorage.getItem("token");



  const usuario = JSON.parse(atob(token.split(".")[1]));
  const email = usuario.email;

  useEffect(() => {
    const fetchBarber = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/traerUsuario/${email}`);
        setBarber(res.data[0]);
        if (res.data[0].Foto) {
          setImagePreview(`http://localhost:8080/imagesBarbero/${res.data[0].Foto}`);
        }
      } catch (err) {
        console.log("Error al obtener los datos:", err);
      }
    };
    fetchBarber();
  }, [email]);


  const handleLogout = () => {
    Swal.fire({
      title: "¿Estas seguro que deseas cerrar sesion?",
      text: "Tu sesión será cerrada.",
      imageUrl: "/LOGO.png",
      imageWidth: 200,
      imageHeight: 200,
      showCancelButton: true,
      confirmButtonColor: "#DC3545",
      cancelButtonColor: "",
      confirmButtonText: "Sí, cerrar sesión",
      cancelButtonText: "Cancelar",
      customClass: {
        popup: "dark-theme-popup bg-dark antonparabackend ",
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
            popup: "dark-theme-popup bg-dark antonparabackend ",
          },
        });
      }
    });
  };
  return (
    <div className="navbar shadow">
      <div class="container-fluid">
        <a class="navbar-brand text-danger zoomhover2 anton fs-2 mx-4">
          Master Barber
        </a>
        <div class="d-flex ">
          <div class="dropdown position-absolute top-0 end-0 me-3 pe-3">
            <button
              class="btn dropdown-toggle text-white d-none d-sm-block"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <div className="d-none d-sm-block text-white fw-bold small ">
                {barber.nombre_usuario}
              </div>
              <img
                src={`http://localhost:8080/imagesBarbero/${barber.Foto}`}
                alt="Imagen de perfil"
                className="img-fluid rounded-circle contenido3 "
                style={{ width: "40px", height: "40px", objectFit: "cover" }}
              />
            </button>
            <ul class="dropdown-menu dropdown-menu-end bg-dark">
              <li>
                <a class="dropdown-item bebas text-danger" href="/PerfilBarber">
                  Perfil
                </a>
              </li>
              <li onClick={handleLogout}>
                <div class="box-2">
                  <div class="btn btn-two text-white">
                    <i><i class="bi bi-box-arrow-right mx-1">
                    </i> Cerrar sesión</i>
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