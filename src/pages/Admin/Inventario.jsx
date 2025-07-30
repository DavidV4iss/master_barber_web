import NavbarAdmin from '../../Components/NavbarAdmin'
import SidebarAdmin from '../../Components/SidebarAdmin'
import Swal from 'sweetalert2'
import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import API from '../../api/api';
const API_URL = process.env.API_URL || "http://localhost:8080";

export default function Inventario() {
    const [imagePreviewEdit, setImagePreviewEdit] = useState('');
    const [imagePreview, setImagePreview] = useState('');
    const [inventario, setInventario] = useState([]);
    const [producto, setProducto] = useState({
        nombre: '',
        descripcion_P: '',
        cantidad: '',
        id_categoria_producto: '',
        proveedor: '',
        fecha_venta: '',
        foto: null,
        preciounitario: ''
    });

    const [productoEditar, setProductoEditar] = useState({
        nombre: '',
        descripcion_P: '',
        cantidad: '',
        id_categoria_producto: '',
        proveedor: '',
        fecha_venta: '',
        foto: null,
        preciounitario: ''
    });

    const [categorias, setCategorias] = useState([]);

    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('nombre', producto.nombre);
            formData.append('descripcion_P', producto.descripcion_P);
            formData.append('cantidad', producto.cantidad);
            formData.append('id_categoria_producto', producto.id_categoria_producto);
            formData.append('proveedor', producto.proveedor);
            formData.append('fecha_venta', producto.fecha_venta);
            formData.append('foto', producto.foto);
            formData.append('preciounitario', producto.preciounitario);

            const res = await API.post(`/CreateInventario`, formData);
            if (res.status === 200) {
                Swal.fire({
                    icon: 'success',
                    title: res.data,
                    timer: 8000,
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
            formData.append('nombre', productoEditar.nombre);
            formData.append('descripcion_P', productoEditar.descripcion_P);
            formData.append('cantidad', productoEditar.cantidad);
            formData.append('id_categoria_producto', productoEditar.id_categoria_producto);
            formData.append('proveedor', productoEditar.proveedor);
            formData.append('fecha_venta', productoEditar.fecha_venta);
            formData.append('foto', productoEditar.foto);
            formData.append('preciounitario', productoEditar.preciounitario);

            const res = await API.put(`/UpdateInventario/${productoEditar.id_producto}`, formData);
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

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setProducto({ ...producto, [e.target.name]: selectedFile });
            setImagePreview(URL.createObjectURL(selectedFile));
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error', text: 'No se pudo subir la imagen',
                customClass: {
                    popup: "dark-theme-popup bg-dark antonparabackend ",
                },
            });
        }
    };

    const handleFileChangeEdit = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile && selectedFile.type.startsWith('image/')) {
            setProductoEditar({ ...productoEditar, [e.target.name]: selectedFile });
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



    const handleChangeEdit = (e) => {
        setProductoEditar(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleChange = (e) => {
        setProducto(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const DeleteInventario = async (id) => {
        try {
            const confirm = await Swal.fire({
                title: '¿Estas seguro de borrar este producto?',
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
            const res = await API.delete(`/DeleteInventario/${id}`);
            console.log(res);
            if (res.status === 200) {
                Swal.fire({
                    icon: 'success',
                    title: res.data,
                    customClass: {
                        popup: "dark-theme-popup bg-dark antonparabackend ",
                    },
                }).then(() => {
                    navigate(0);
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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [inventarioRes, categoriasRes] = await Promise.all([
                    API.get(`/GetInventario`),
                    API.get(`/categorias`),
                ]);
                setInventario(inventarioRes.data);
                setCategorias(categoriasRes.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    const openEditModal = (item) => {
        setProductoEditar({
            ...item,
            foto: item.foto
        });
        setImagePreviewEdit('');
    };


    return (
        <div className='bg-dark'>
            <NavbarAdmin />
            <SidebarAdmin />
            <div className='mt-5'>
                <div className='contenido ' id='Inventario'>
                    <p className='text-center text-white mt-5 display-6 bebas mx-3 '>HOLA, <span className='text-danger'>ADMINISTRADOR</span>| ESTE ES EL INVENTARIO DE LOS PRODUCTOS QUE ENTRAN A LA BARBERIA</p>

                    <div className="d-flex justify-content-end mx-5 mt-5 ">
                        <button type="button" class="btn btn-danger .col-md-4" data-bs-toggle="modal" data-bs-target="#AñadirModal" data-bs-whatever="@mdo" >Añadir</button>
                    </div>
                    <div className='container text-center'>
                        <div className="table-responsive">
                            <table class="table  table-bordered table-responsive table-dark table-hover mt-4 container p-5">
                                <thead>
                                    <tr>
                                        <th scope="col" className=' bebas p-4 text-danger'>ID Producto</th>
                                        <th scope="col" className=' bebas p-4 fs-3'>Nombre</th>
                                        <th scope="col" className=' bebas p-4 fs-3'>Descripcion</th>
                                        <th scope="col" className=' bebas p-4 fs-3'>Cantidad</th>
                                        <th scope="col" className=' bebas p-4 fs-3'>Categoria</th>
                                        <th scope="col" className=' bebas p-4 fs-3'>Proveedor</th>
                                        <th scope="col" className=' bebas p-4  fs-3'>Fecha Y Hora</th>
                                        <th scope="col" className=' bebas p-4 fs-3'>Imagen</th>
                                        <th scope="col" className=' bebas p-4 fs-3'>Precio</th>
                                        <th scope="col" className=' bebas p-4 text-warning fs-3'>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody className='p-5'>
                                    {inventario.length === 0 ? (
                                        <tr>
                                            <td colSpan="10" className="text-center text-danger fs-5 antonparabackend">
                                                No hay productos para mostrar
                                            </td>
                                        </tr>
                                    ) : (
                                        inventario.map((item) => (
                                            <tr key={item.id_producto}>
                                                <th className='text-center'>{item.id_producto}</th>
                                                <td className='text-center'>{item.nombre}</td>
                                                <td className='text-center'>{item.descripcion_P}</td>
                                                <td className='text-center'>{item.cantidad}</td>
                                                <td className='text-center'>{categorias.find(c => c.id_categoria_producto === item.id_categoria_producto)?.categoria}</td>
                                                <td className='text-center'>{item.proveedor}</td>
                                                <td className='text-center'>{item.fecha_venta}</td>
                                                <td className='text-center'><img src={`${API_URL}/ImagesInventario/${item.foto}`} className='img-fluid zoomhover2' style={{ width: '150px', height: '150px', objectFit: 'cover' }} /></td>
                                                <td className='text-center'>{item.preciounitario}</td>
                                                <td>
                                                    <div className="d-flex">
                                                        <button type="button" className="btn btn-outline-warning me-3" onClick={() => openEditModal(item)} data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo">
                                                            <i className='bi bi-pencil-fill text-white'></i>
                                                        </button>
                                                        <button className='btn btn-outline-danger' onClick={() => DeleteInventario(item.id_producto)}>
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

                    {/* MODAL EDITAR */}

                    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content bg-dark">
                                <form onSubmit={handleSubmitEdit}>
                                    <div class="modal-header">
                                        <h1 class="modal-title fs-3 text-white bebas" id="exampleModalLabel">EDITAR</h1>
                                        <button type="button" class="btn-close bg-white" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div className="d-flex justify-content-center ">
                                        <div className="card bg-dark mt-3" style={{ width: '10rem' }}>
                                            <img
                                                src={
                                                    imagePreviewEdit
                                                        ? imagePreviewEdit
                                                        : productoEditar.foto && typeof productoEditar.foto === 'string'
                                                            ? `${API_URL}/ImagesInventario/${productoEditar.foto}`
                                                            : productoEditar.foto && typeof productoEditar.foto === 'string'
                                                                ? `${API_URL}/ImagesInventario/${productoEditar.foto}`
                                                                : ''
                                                }
                                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                className='img-fluid text-white rounded'
                                                alt="Imagen"
                                            />
                                        </div>
                                    </div>
                                    <div class="modal-body">
                                        <div class="mb-3">
                                            <label for="recipient-name" class="col-form-label text-white  antonparabackend ">Nombre:</label>
                                            <input type="text" value={productoEditar.nombre} class="form-control bg-dark text-white" id="recipient-name" name='nombre' onChange={handleChangeEdit} />
                                        </div>
                                        <div class="mb-3">
                                            <label for="recipient-name" class="col-form-label text-white antonparabackend">Descripcion:</label>
                                            <input type="text" value={productoEditar.descripcion_P} class="form-control bg-dark text-white" id="recipient-name" name='descripcion_P' onChange={handleChangeEdit} />
                                        </div>
                                        <div class="mb-3">
                                            <label for="recipient-name" class="col-form-label text-white  antonparabackend">Cantidad:</label>
                                            <input type="text" value={productoEditar.cantidad} class="form-control bg-dark text-white" id="recipient-name" name='cantidad' onChange={handleChangeEdit} />
                                        </div >
                                        <div class="mb-3">
                                            <label for="recipient-name" class="col-form-label text-white  antonparabackend">Categoria:</label>
                                            <select name="id_categoria_producto" value={productoEditar.id_categoria_producto} class="form-select bg-dark text-white" id="" onChange={handleChangeEdit}>
                                                <option selected disabled>Seleccione una categoria</option>
                                                {categorias.map((item) => (
                                                    <option key={item.id_categoria} value={item.id_categoria_producto}>{item.categoria}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div class="mb-3">
                                            <label for="recipient-name" class="col-form-label text-white  antonparabackend">Proveedor:</label>
                                            <input type="text" value={productoEditar.proveedor} class="form-control bg-dark text-white" id="recipient-name" name='proveedor' onChange={handleChangeEdit} />
                                        </div>
                                        <div class="mb-3">
                                            <label for="recipient-name" class="col-form-label text-white antonparabackend">Fecha Y Hora De Venta</label>
                                            <input type="datetime-local" class="form-control bg-dark text-white" id="recipient-name" name='fecha_venta' onChange={handleChangeEdit} />
                                        </div>
                                        <p className="text-white antonparabackend">Editar Imagen</p>
                                        <div className="input-group">
                                            <input
                                                name="foto"
                                                accept="image/*"
                                                type="file"
                                                className="form-control bg-dark text-white"
                                                id="inputGroupFile04"
                                                onChange={handleFileChangeEdit}
                                            />
                                        </div>
                                        <div class="mb-3">
                                            <label for="recipient-name" class="col-form-label text-white  antonparabackend">Costo Total:</label>
                                            <input value={productoEditar.preciounitario} type="text" class="form-control bg-dark text-white" id="recipient-name" name='preciounitario' onChange={handleChangeEdit} />
                                        </div>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" >Cerrar</button>
                                        <button type="sumbit" class="btn btn-danger ">Editar</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                    {/* MODAL DE AÑADIR */}

                    <div class="modal fade" id="AñadirModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content bg-dark">
                                <form onSubmit={handleSubmit}>
                                    <div class="modal-header">
                                        <h1 class="modal-title fs-3 text-white text-white bebas" id="exampleModalLabel" >AÑADIR</h1>
                                    </div>
                                    <div className="modal-body d-flex justify-content-center ">
                                        <div className="card bg-dark" style={{ width: '10rem' }}>
                                            <img src={imagePreview || ''} style={{ width: '100%', height: '100%', objectFit: 'cover' }} className='img-fluid text-white rounded' alt="Imagen" />
                                        </div>
                                    </div>
                                    <div class="modal-body">
                                        <form>
                                            <div class="mb-3">
                                                <label for="recipient-name" class="col-form-label text-white  antonparabackend">Nombre</label>
                                                <input type="text" class="form-control bg-dark text-white" id="recipient-name" name='nombre' onChange={handleChange} />
                                            </div>
                                            <div class="mb-3">
                                                <label for="recipient-name" class="col-form-label text-white  antonparabackend">Descripcion</label>
                                                <input type="text" class="form-control bg-dark text-white" id="recipient-name" name='descripcion_P' onChange={handleChange} />
                                            </div>
                                            <div class="mb-3">
                                                <label for="recipient-name" class="col-form-label text-white  antonparabackend">Cantidad</label>
                                                <input type="text" class="form-control bg-dark text-white" id="recipient-name" name='cantidad' onChange={handleChange} />
                                            </div >
                                            <div class="mb-3">
                                                <label for="recipient-name" class="col-form-label text-white  antonparabackend">Categoria</label>
                                                <select name="id_categoria_producto" class="form-select bg-dark text-white" id="" onChange={handleChange}>
                                                    <option selected disabled>Seleccione una categoria</option>
                                                    {categorias.map((item) => (
                                                        <option key={item.id_categoria} value={item.id_categoria_producto}>{item.categoria}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div class="mb-3">
                                                <label for="recipient-name" class="col-form-label text-white  antonparabackend">Proveedor</label>
                                                <input type="text" class="form-control bg-dark text-white" id="recipient-name" name='proveedor' onChange={handleChange} />
                                            </div>
                                            <div class="mb-3">
                                                <label for="recipient-name" class="col-form-label text-white  antonparabackend">Fecha Y Hora</label>
                                                <input type="datetime-local" class="form-control bg-dark text-white" id="recipient-name" name='fecha_venta' onChange={handleChange} />
                                            </div>
                                            <p className="text-white antonparabackend">Imagen Del Producto</p>
                                            <div className="input-group">
                                                <input
                                                    required
                                                    name="foto"
                                                    accept="image/*"
                                                    type="file"
                                                    className="form-control bg-dark text-white "
                                                    id="inputGroupFile04"
                                                    onChange={handleFileChange}
                                                    style={{ width: '50f%', height: '50%', objectFit: 'cover' }}
                                                />
                                            </div>
                                            <div class="mb-3 mt-3">
                                                <label for="recipient-name" class="col-form-label text-white  antonparabackend">Costo Total</label>
                                                <input type="text" class="form-control bg-dark text-white" id="recipient-name" name='preciounitario' onChange={handleChange} />
                                            </div>
                                        </form>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                                        <button type="submit" class="btn btn-danger" onClick={handleSubmit}>Añadir</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
