import React, { useState, useEffect } from 'react';
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import axios from 'axios';



export default function NavbarAdmin() {
  const navigate = useNavigate();

  const [admin, setAdmin] = useState({});
  const [imagePreview, setImagePreview] = useState('');


  const token = localStorage.getItem("token");



  const usuario = JSON.parse(atob(token.split(".")[1]));
  const email = usuario.email;

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/traerUsuario/${email}`);
        setAdmin(res.data[0]);
        if (res.data[0].Foto) {
          setImagePreview(`http://localhost:8080/perfil/${res.data[0].Foto}`);
        }
      } catch (err) {
        console.log("Error al obtener los datos:", err);
      }
    };
    fetchAdmin();
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
          }
        });
      };
    });
  };
  return (

    <div className='navbar shadow'>
      <div className="container-fluid">
        <a className="navbar-brand text-warning anton fs-2 "><img src="LOGO.png" alt="" width="40" height="40" className="d-inline-block align-text-top mx-4 mt-1" />
          Master Barber</a>
        <div className="d-flex">
          <div className="container me-5">
            <div className="dropdown position-absolute top-0 end-0 me-3 pe-3" >
              <button className="btn dropdown-toggle text-white d-none d-sm-block" type="button" data-bs-toggle="dropdown" aria-expanded="false">

                <div className='d-none d-sm-block text-white fw-bold small'>{admin.nombre_usuario}</div>
                <img
                  src={imagePreview}
                  alt="Imagen de perfil"
                  className="img-fluid rounded-circle contenido3 "
                  style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                  onError={(e) => { e.target.src = 'https://cdn-icons-png.flaticon.com/512/149/149071.png'; }}
                />
              </button>
              <ul className="dropdown-menu dropdown-menu-end bg-dark">
                <li>
                  <a className="dropdown-item bebas text-danger" href="/PerfilAdmin">Perfil</a>
                </li>
                <li onClick={handleLogout}>
                  <div className="box-2">
                    <div className="btn btn-two text-white">
                      <i><i className="bi bi-box-arrow-right mx-1">
                      </i> Cerrar sesión</i>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>

        </div>
      </div>
    </div>

  );
}
