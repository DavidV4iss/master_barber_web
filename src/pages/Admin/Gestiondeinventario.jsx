import React, { useEffect, useState } from 'react';
import NavbarAdmin from '../../Components/NavbarAdmin';
import SidebarAdmin from '../../Components/SidebarAdmin';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';
import GraficaVenta from '../../Components/GraficaVenta';
import API from '../../api/api';

export default function Gestiondeinventario() {
    const [inventario, setInventario] = useState([]);
    const [venta, setVenta] = useState([]);
    const [ventasProcesadas, setVentasProcesadas] = useState([]);
    const [rango, setRango] = useState('Diario');

    useEffect(() => {
        const getInventario = async () => {
            try {
                const res = await API.get("/GetInventario");
                setInventario(res.data);
            } catch (err) {
                console.log("Error al obtener los datos:", err);
            }
        };
        getInventario();
    }, []);

    useEffect(() => {
        const getVentas = async () => {
            try {
                const res = await API.get(`/GetVentas?rango=${rango}`);
                setVentasProcesadas(res.data);
            } catch (err) {
                console.error('Error al obtener las ventas:', err);
            }
        };
        getVentas();
    }, [rango]);

    function agregarProducto(producto) {
        const productoExistente = venta.find(item => item.id_producto === producto.id_producto);
        const productoInventario = inventario.find(item => item.id_producto === producto.id_producto);

        if (productoInventario && productoInventario.cantidad > 0) {
            if (productoExistente) {
                setVenta(venta.map(item =>
                    item.id_producto === producto.id_producto
                        ? { ...item, cantidad: item.cantidad + 1 }
                        : item
                ));
            } else {
                setVenta([...venta, { ...producto, cantidad: 1 }]);
            }

            setInventario(inventario.map(item =>
                item.id_producto === producto.id_producto
                    ? { ...item, cantidad: item.cantidad - 1 }
                    : item
            ));
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `No hay más ${producto.nombre} en stock`,
                confirmButtonColor: "#DC3545",
                customClass: {
                    popup: "dark-theme-popup bg-dark antonparabackend",
                },
            });
        }
    }

    const calcularTotal = () => {
        return venta.reduce((total, item) => total + (item.preciounitario * item.cantidad), 0);
    };

    const handleSubmit = async () => {
        try {
            const ventasConFecha = venta.map(producto => ({ ...producto, fecha: new Date().toISOString().slice(0, 19).replace('T', ' ') }));
            for (const producto of ventasConFecha) {
                await API.put(`/RestarInventario/${producto.id_producto}`, {
                    cantidad: producto.cantidad,
                });
            }
            await API.post('/GuardarVentas', ventasConFecha);
            const res = await API.get(`/GetVentas?rango=${rango}`);
            setVentasProcesadas(res.data);

            Swal.fire({
                icon: 'success',
                timer: 9000,
                title: 'Venta Exitosa',
                html: `Productos vendidos:<br>${ventasConFecha.map(p => `<span style="color: yellow">${p.nombre} (x${p.cantidad})</span>`).join('<br>')}<br><br>Total: <span style="color: yellow">$${calcularTotal()}</span>`,
                confirmButtonColor: '#DC3545',
                customClass: {
                    popup: 'dark-theme-popup bg-dark antonparabackend',
                },
            }).then(() => setVenta([]));
        } catch (err) {
            console.error('Error al procesar la venta:', err);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Error al procesar la venta',
                confirmButtonColor: '#DC3545',
                customClass: {
                    popup: 'dark-theme-popup bg-dark antonparabackend',
                },
            });
        }
    };

    const generarPDF = async () => {
        const doc = new jsPDF();
        const ventasAgrupadas = ventasProcesadas.reduce((acc, venta) => {
            const key = venta.id_producto;
            if (!acc[key]) acc[key] = { ...venta, cantidad: 0 };
            acc[key].cantidad += venta.cantidad;
            return acc;
        }, {});

        const ventasAgrupadasArray = Object.values(ventasAgrupadas);
        doc.setFontSize(18);
        doc.text('Reporte De Ventas', 10, 10);
        doc.setFontSize(12);
        doc.text(`Rango: ${rango}`, 10, 20);

        let y = 30;
        if (ventasAgrupadasArray.length === 0) {
            doc.text("No hay ventas en este rango.", 10, y);
        } else {
            ventasAgrupadasArray.forEach((venta, index) => {
                doc.text(`${index + 1}. Producto: ${venta.nombre}, Cantidad: ${venta.cantidad}, Total: $${(venta.preciounitario * venta.cantidad).toFixed(2)}`, 10, y);
                y += 10;
            });
            const total = ventasAgrupadasArray.reduce((acc, item) => acc + item.preciounitario * item.cantidad, 0);
            doc.text(`Total General: $${total.toFixed(2)}`, 10, y + 10);
        }

        doc.save(`Reporte_Ventas_${rango}.pdf`);
    };

    const ventasFiltradas = ventasProcesadas;

    return (
        <div className="bg-dark">
            <NavbarAdmin />
            <SidebarAdmin />
            <div className="container py-5 ">
                <h2 className="text-center text-white bebas display-6 mb-5 contenido3">
                    Hola, <span className="text-danger">Administrador</span> | Este es el inventario de los productos que salen de la barberia
                </h2>

                <div className="row g-4 contenido mt-5 pt-5">
                    <div className="col-lg-7">
                        <div className="row row-cols-1 row-cols-md-3 g-4">
                            {inventario.length === 0 ? (
                                <div className="col-12 text-center text-warning fs-4 contenido5 welcome-2 bebas">
                                    No hay productos en el inventario para mostrar
                                </div>
                            ) : (
                                inventario.map((item) => (
                                    <Link
                                        key={item.id_producto}
                                        onClick={() => agregarProducto(item)}
                                        className="col text-decoration-none"
                                    >
                                        <div className="card bg-dark h-100 shadow rounded-4">
                                            <img
                                                src={
                                                    item.foto
                                                        ? `https://res.cloudinary.com/dnh1n2jbq/image/upload/${item.foto}`
                                                        : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                                                }
                                                alt={item.nombre}
                                                className="card-img-top rounded-top-4 shadow"
                                                style={{ height: '200px', objectFit: 'cover' }}
                                            />
                                            <div className="card-body text-center">
                                                <h5 className="text-warning bebas">{item.nombre}</h5>
                                                <p className="text-white">${item.preciounitario}</p>
                                                <p className="text-success bebas">{item.cantidad} Unidades</p>
                                            </div>
                                        </div>
                                    </Link>
                                ))
                            )}
                        </div>
                    </div>

                    <div className="col-lg-4 contenidol mt-5 pt-5">
                        <div className="card bg-dark text-white p-3 rounded-4 shadow">
                            <div className="row justify-content-end align-items-center mb-2">
                                <div className="col-auto">
                                    <select
                                        className="form-select bg-dark text-white"
                                        value={rango}
                                        onChange={(e) => setRango(e.target.value)}
                                    >
                                        <option value="diario">Diario</option>
                                        <option value="mensual">Mensual</option>
                                        <option value="semanal">Semanal</option>
                                        <option value="anual">Anual</option>
                                    </select>
                                </div>
                                <div className="col-auto me-5">
                                    <button onClick={generarPDF} className="btn btn-danger bebas ">
                                        Generar PDF
                                    </button>
                                </div>
                            </div>

                            <hr />
                            <table className="table table-dark table-striped text-center mb-3 mt-3">
                                <thead>
                                    <tr>
                                        <th className="text-warning">Cantidad</th>
                                        <th className="text-warning">ID</th>
                                        <th className="text-warning">Producto</th>
                                        <th className="text-warning">Precio</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {venta.length > 0 ? (
                                        venta.map((item) => (
                                            <tr key={item.id_producto}>
                                                <td>{item.cantidad}</td>
                                                <td>{item.id_producto}</td>
                                                <td>{item.nombre}</td>
                                                <td>${item.preciounitario}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="4">
                                                No has agregado ningun producto
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>

                            <div className="d-flex flex-column gap-2">
                                <p className="text-center text-success fs-3 bebas bebas fw-bold" >
                                    Total: ${calcularTotal().toFixed(2)}
                                </p>
                                <button onClick={() => setVenta([])} disabled={venta.length === 0} className="btn btn-danger bebas">
                                    Limpiar
                                </button>
                                <button onClick={handleSubmit} className="btn btn-warning bebas mt-3">
                                    Restar Del Inventario
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row justify-content-center mt-5 pt-5">
                    <div className="col-12 col-md-10">
                        <GraficaVenta ventas={ventasFiltradas} />
                    </div>
                </div>
            </div>
        </div >
    );
}