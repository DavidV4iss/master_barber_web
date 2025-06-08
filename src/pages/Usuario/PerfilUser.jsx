import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

export default function PerfilUser() {
  const navigate = useNavigate();

  const [user, setUser] = useState({});
  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  const token = localStorage.getItem("token");
  const usuario = JSON.parse(atob(token.split(".")[1]));
  const email = usuario.email;

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
        Swal.fire({
          title: "Error",
          text: "No se pudo cargar la información del perfil.",
          icon: "error",
          customClass: {
            popup: "dark-theme-popup bg-dark antonparabackend ",
          },
        });
      }
    };

    fetchUser();
  }, [email]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
      nombre_usuario: name === 'nombre' ? value : prevUser.nombre_usuario,
    }));
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setImagePreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleRestoreImage = () => {
    setFile(null);
    setImagePreview(user.Foto ? `http://localhost:8080/perfil/${user.Foto}` : "https://cdn-icons-png.flaticon.com/512/149/149071.png");
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    if (user.nombre && user.nombre.trim() !== "") {
      formData.append("nombre", user.nombre);
    }

    if (file) {
      formData.append("file", file);
    }

    if (!formData.has("nombre") && !formData.has("file")) {
      return Swal.fire({
        title: "Atención",
        text: "No se detectaron cambios para actualizar.",
        icon: "info",
        iconColor: "#DC3545",
        confirmButtonColor: "#DC3545",
        customClass: {
          popup: "dark-theme-popup bg-dark antonparabackend ",
        },
      });
    }

    setIsUpdating(true);

    try {
      await axios.post(
        `http://localhost:8080/actualizarUsuario/${email}`,
        formData
      );

      Swal.fire({
        position: "top-end",
        icon: "success",
        iconColor: "#1bf30b",
        title: "Perfil actualizado exitosamente.",
        showConfirmButton: false,
        timer: 2000,
        customClass: {
          popup: "dark-theme-popup bg-dark antonparabackend ",
        },
      });

      setFile(null);
      const res = await axios.get(`http://localhost:8080/traerUsuario/${email}`);
      setUser(res.data[0]);
      if (res.data[0].Foto) {
        setImagePreview(`http://localhost:8080/perfil/${res.data[0].Foto}`);
      } else {
        setImagePreview("https://cdn-icons-png.flaticon.com/512/149/149071.png");
      }
      setIsUpdating(false);

    } catch (err) {
      Swal.fire({
        title: "Error",
        text: "Hubo un problema al actualizar el perfil.",
        icon: "error",
        confirmButtonColor: "#DC3545",
        customClass: {
          popup: "dark-theme-popup bg-dark antonparabackend ",
        },
      });
      console.error(err);
    }
  };

  return (
    <div className="min-vh-100 align-content-center mx-5 justify-content-end">
      <div className="container p-sm-5 border border-2 shadow border-white rounded-4">
        <a href="/iniciousuario">
          <i className="bi bi-arrow-left-circle-fill text-white fs-2"></i>
        </a>
        <div className="row justify-content-center align-items-center">
          <div className="col col-lg-6 bi-text-lg-center">
            <img
              src={imagePreview}
              alt="Foto de Perfil"
              className="img-fluid rounded-circle contenido3 text-white zoomhover2 fade-in"
              style={{ width: "250px", height: "250px", objectFit: "cover", background: "#222" }}
              onError={(e) => (e.target.src = "https://cdn-icons-png.flaticon.com/512/149/149071.png")} />
          </div>
          <div className="col-12 col-lg-6 container">
            <h1 className="text-warning text-center anton mb-4">¡Perfil!</h1>

            <form onSubmit={handleClick} id="form" className="row g-1 mb-5">
              <div className="mb-1 row">
                <label
                  htmlFor="staticNombre"
                  className="col-sm-2 col-form-label text-white antonparabackend"
                >
                  Nombre:
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    onChange={handleChange}
                    readOnly
                    className="form-control-plaintext text-white antonparabackend"
                    id="staticEmail"
                    value={user.nombre_usuario || ""}
                  />
                </div>
              </div>
              <div className="form-floating mb-3 mx-2">
                <input
                  type="text"
                  className="form-control bg-dark text-white mt-2"
                  id="floatingInput"
                  placeholder="name@example.com"
                  onChange={handleChange}
                  name="nombre"
                />
                <label htmlFor="floatingInput" className="text-dark">
                  Nombre
                </label>
              </div>
              <div className="container row mt-3">
                <p className="text-white antonparabackend">
                  Actualizar Foto De Perfil
                </p>
                <div className="input-group">
                  <input
                    name="file"
                    accept="image/*"
                    type="file"
                    className="form-control bg-dark text-white"
                    id="inputGroupFile04"
                    aria-describedby="inputGroupFileAddon04"
                    aria-label="Upload"
                    onChange={handleFileChange}
                  />
                  <button
                    type="submit"
                    className="btn btn-outline-danger mx-1"
                    id="inputGroupFileAddon04"
                    disabled={isUpdating}
                  >
                    {isUpdating ? "Actualizando..." : "Actualizar"}
                  </button>

                  {file && (
                    <button
                      type="button"
                      className="btn btn-outline-warning mx-1"
                      onClick={handleRestoreImage}
                    >
                      Restaurar Imagen
                    </button>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
