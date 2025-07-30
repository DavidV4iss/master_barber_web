import NavbarAdmin from '../../Components/NavbarAdmin';
import SidebarAdmin from '../../Components/SidebarAdmin';
import Swal from 'sweetalert2';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import API from '../../api/api';
const API_URL = process.env.API_URL || "http://localhost:8080";

export default function GestionarBarberos() {
  const [imagePreview, setImagePreview] = useState('');
  const [imagePreviewEdit, setImagePreviewEdit] = useState('');
  const [barberos, setBarberos] = useState([]);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [barbero, setBarbero] = useState({

    nombre: "",
    email: "",
    contrasena: "",
    descripcion: "",
    foto: null,
  });

  const [barberoEdit, setBarberoEdit] = useState({
    id_usuario: "",
    nombre_usuario: "",
    email: "",
    descripcion: "",
    foto: null,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('nombre_usuario', barbero.nombre_usuario);
      formData.append('email', barbero.email);
      formData.append('contrasena', barbero.contrasena);
      formData.append('descripcion', barbero.descripcion);
      formData.append('foto', barbero.foto);

      const res = await API.post(`/CreateBarberos`, formData);
      if (res.status === 200) {
        Swal.fire({
          icon: 'success',
          title: res.data,
          timer: 9000,
          customClass: {
            popup: "dark-theme-popup bg-dark antonparabackend ",
          },
        }).then(() => {
          window.location.reload(0);
        });
      }
    } catch (err) {
      console.log(err);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: err.response.data,
        customClass: {
          popup: "dark-theme-popup bg-dark antonparabackend ",
        },
      });
    }
  };

  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('nombre_usuario', barberoEdit.nombre_usuario);
      formData.append('email', barberoEdit.email);
      formData.append('descripcion', barberoEdit.descripcion);
      formData.append('foto', barberoEdit.foto);
      const res = await API.put(`/UpdateBarberos/${barberoEdit.id_usuario}`, formData);
      if (res.status === 200) {
        Swal.fire({
          icon: 'success',
          title: res.data,
          timer: 9000,
          customClass: {
            popup: "dark-theme-popup bg-dark antonparabackend ",
          },
        }).then(() => {
          window.location.reload(0);
        });
      }
    } catch (err) {
      console.log(err);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: err.response.data,
        customClass: {
          popup: "dark-theme-popup bg-dark antonparabackend ",
        },
      });
    }
  };

  const handleChange = (e) => {
    setBarbero(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleChangeEdit = (e) => {
    setBarberoEdit(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type.startsWith('image/')) {
      setBarbero({ ...barbero, [e.target.name]: selectedFile });
      setImagePreview(URL.createObjectURL(selectedFile));
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor, seleccione un archivo de imagen válido.',
        customClass: {
          popup: "dark-theme-popup bg-dark antonparabackend ",
        },
      });
    }
  };

  const handleFileChangeEdit = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type.startsWith('image/')) {
      setBarberoEdit({ ...barberoEdit, [e.target.name]: selectedFile });
      setImagePreviewEdit(URL.createObjectURL(selectedFile));
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor, seleccione un archivo de imagen válido.',
        customClass: {
          popup: "dark-theme-popup bg-dark antonparabackend ",
        },
      });
    }
  };

  const DeleteBarberos = async (id) => {
    try {
      const confirm = await Swal.fire({
        title: '¿Estas seguro de borrar este barbero?',
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
      const res = await API.delete(`/DeleteBarberos/${id}`);
      console.log(res);
      if (res.status === 200) {
        Swal.fire({
          icon: 'success',
          title: res.data,
          customClass: {
            popup: "dark-theme-popup bg-dark antonparabackend ",
          },
        })
          .then(() => {
            window.location.reload(0);
          });
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

  const fetchBarberos = async () => {
    try {
      const res = await API.get("/GetBarberos");
      setBarberos(res.data);
    } catch (err) {
      console.log("Error al obtener los datos:", err);
    }
  };

  useEffect(() => {
    fetchBarberos();
  }, []);

  const openEditModal = (barbero) => {
    setBarberoEdit(barbero);
    setImagePreviewEdit(`${API_URL}/imagesBarbero/${barbero.foto}`);
  };

  return (
    <div className='bg-dark'>
      <NavbarAdmin />
      <SidebarAdmin />
      <div className='contenido2' id='GestionarBarberos'>
        <p className='text-center  mt-5 text-white display-6 bebas col-sm-12 col'>HOLA, <span className='text-danger'>ADMINISTRADOR</span> |AQUI PODRAS EDITAR, AÑADIR Y ELIMINAR BARBEROS</p>
        <div className="d-flex justify-content-end mt-3 p-5 mx-5">
          <button type="button" className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#AñadirModal" data-bs-whatever="@mdo" >Añadir</button>
        </div>

        <div className=' text-center row col col-sm-12 justify-content-end'>
          <div className="table-responsive">
            <table className="table  table-bordered table-responsive table-dark table-hover mt-4 container p-5">
              <thead>
                <tr className='bg-white'>
                  <th scope="col" className='display-6 bebas p-4 text-danger'>Nombre</th>
                  <th scope="col" className='display-6 bebas p-4 '>Email</th>
                  <th scope="col" className='display-6 bebas p-4 '>Descripcion</th>
                  <th scope="col" className='display-6 bebas p-4'>imagen</th>
                  <th scope="col" className='text-warning display-6 bebas p-4'>Acciones</th>
                </tr>
              </thead>
              <tbody className='table-group-divider'>
                {barberos.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center text-danger antonparabackend fs-5">
                      No hay barberos para mostrar
                    </td>
                  </tr>
                ) : (
                  barberos.map((barbero) => (
                    <tr key={barbero.id_usuario}>
                      <td className='w-25 text-center p-5'>{barbero.nombre_usuario}</td>
                      <td className='w-25 text-center p-5'>{barbero.email}</td>
                      <td className='w-25 text-center p-5'>{barbero.descripcion}</td>
                      <td><img src={`${API_URL}/imagesBarbero/${barbero.foto}`} className='img-fluid zoomhover2' alt="" /></td>
                      <td>
                        <div className="d-flex justify-content-center mt-5 mx-5">
                          <button type="button" className="btn btn-outline-warning me-5" onClick={() => openEditModal(barbero)} data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo">
                            <i className='bi bi-pencil-fill text-white'></i>
                          </button>
                          <button className='btn btn-outline-danger' onClick={() => DeleteBarberos(barbero.id_usuario)}>
                            <i className="bi bi-trash-fill"  ></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* MODAL EDIT */}
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content bg-dark">
              <form onSubmit={handleSubmitEdit}>
                <div className="modal-header">
                  <h1 className="modal-title fs-5 text-white" id="exampleModalLabel">EDITAR</h1>
                  <button type="button" className="btn-close bg-white" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body d-flex justify-content-center ">
                  <div className="card bg-dark" style={{ width: '10rem' }}>
                    <img src={imagePreviewEdit || `${API_URL}/imagesBarbero/${barberoEdit.foto}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} className='img-fluid text-white rounded' alt="Imagen Barbero" />
                  </div>
                </div>
                <div className="modal-body">
                  <div className="mb-3">
                    <label id='nombre-barbero' className="col-form-label text-white">Nombre Barbero</label>
                    <input required type="text" className="form-control bg-dark text-white" pattern='^[A-Za-z\s]+$' id="nombre-barbero" value={barberoEdit.nombre_usuario} name='nombre_usuario' onChange={handleChangeEdit} placeholder='Escriba un nombre' />
                  </div>
                  <div className="mb-3">
                    <label className="col-form-label text-white">Email</label>
                    <input required type="email" className="form-control bg-dark text-white" value={barberoEdit.email} name='email' onChange={handleChangeEdit} placeholder='Email' />
                  </div>
                  <div className="mb-3">
                    <label className="col-form-label text-white">Descripcion</label>
                    <input required type="text" className="form-control bg-dark text-white" value={barberoEdit.descripcion} name='descripcion' onChange={handleChangeEdit} placeholder='Escriba una Descripcion' />
                  </div>
                  <p className="text-white antonparabackend"> Imagen Del Barbero</p>
                  <div className="input-group">
                    <input
                      name="foto"
                      accept="image/*"
                      type="file"
                      className="form-control bg-dark text-white"
                      onChange={handleFileChangeEdit}
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" >Close</button>
                  <button type="submit" className="btn btn-danger" >Editar</button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* MODAL AÑADIR */}
        <div className="modal fade" id="AñadirModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content bg-dark row">
              <form onSubmit={handleSubmit}>
                <div className="modal-header">
                  <h1 className="modal-title fs-5 text-white" id="exampleModalLabel">Añadir</h1>
                  <button type="button" className="btn-close bg-white" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body d-flex justify-content-center ">
                  <div className="card bg-dark" style={{ width: '10rem' }}>
                    <img src={imagePreview || ''} style={{ width: '100%', height: '100%', objectFit: 'cover' }} className='img-fluid text-white rounded' alt="Imagen Barbero" />
                  </div>
                </div>
                <div className="mb-3">
                  <label className="col-form-label text-white">Nombre Barbero</label>
                  <input required type="text" className="form-control bg-dark text-white" name='nombre' onChange={handleChange} placeholder='Escriba un Nombre' />
                </div>
                <div className="mb-3">
                  <label  className="col-form-label text-white">Email</label>
                  <input required type="email" className="form-control bg-dark text-white" name='email' onChange={handleChange} placeholder='Escriba un Email' />
                </div>
                <label className="col-form-label text-white">Contraseña</label>
                <div className="mb-3 input-group">
                  <input required className="form-control bg-dark text-white" name='contrasena' onChange={handleChange} placeholder='Escriba una Contraseña' type={isPasswordVisible ? "text" : "password"} />
                  <button
                    type="button"
                    onClick={() => setIsPasswordVisible((prev) => !prev)}
                    className=" bg-dark rounded-end"
                  >
                    {isPasswordVisible ? " 🙉" : "🙈"}
                  </button>
                </div>
                <div className="mb-3">
                  <label className="col-form-label text-white">Descripcion</label>
                  <input required type="text" className="form-control bg-dark text-white" name='descripcion' onChange={handleChange} placeholder='Escriba una Descripcion' />
                </div>
                <p className="text-white antonparabackend"> Imagen Del Barbero</p>
                <div className="input-group">
                  <input
                    required
                    name="foto"
                    accept="image/*"
                    type="file"
                    className="form-control bg-dark text-white "
                    onChange={handleFileChange}
                  />
                </div>
                <div className="modal-footer mt-4">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  <button type="submit" className="btn btn-danger">Añadir</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}