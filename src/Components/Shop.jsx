import React, { useEffect, useRef, useState } from 'react';
import API from '../api/api';
const API_URL = process.env.API_URL || "http://localhost:8080";

export default function Shop() {
    const [productos, setProductos] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [categories, setCategories] = useState([]);
    const [search, setSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("Todos");
    const [selectedProducto, setSelectedProducto] = useState(null);
    const scrollRef = useRef(null);

    useEffect(() => {
        const fetchProductos = async () => {
            try {
                const res = await API.get("/GetInventario");
                setProductos(res.data);
                setFiltered(res.data);
                const uniqueCategories = ["Todos", ...new Set(res.data.map(p => p.categoria))];
                setCategories(uniqueCategories);
            } catch (err) {
                console.error("Error cargando productos:", err);
            }
        };
        fetchProductos();
    }, []);

    const handleSearch = (e) => {
        const value = e.target.value.toLowerCase();
        setSearch(value);
        filterProductos(value, selectedCategory);
    };

    const handleCategory = (category) => {
        setSelectedCategory(category);
        filterProductos(search, category);
    };

    const filterProductos = (searchText, category) => {
        let temp = [...productos];
        if (category !== "Todos") {
            temp = temp.filter(p => p.categoria === category);
        }
        if (searchText) {
            temp = temp.filter(p => p.nombre.toLowerCase().includes(searchText));
        }
        setFiltered(temp);
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(price);
    };

    const handleWheelScroll = (e) => {
        if (e.deltaY !== 0 && scrollRef.current) {
            scrollRef.current.scrollLeft += e.deltaY;
        }
    };

    return (
        <div className="container">
            <h1 className="display-1 anton mb-4 text-center" data-aos="fade-down"
                style={{
                    background: 'linear-gradient(80deg,rgb(194, 158, 0),rgb(206, 202, 4))',
                    border: 'none',
                    borderRadius: '8px',
                    color: 'white',
                    boxShadow: '0 16px 12px rgba(0, 0, 0, 0.2)',
                    transition: 'all 0.3s ease',
                }}>
                PRODUCTOS EN VENTA
            </h1>
            <div className="mt-5 pt-5">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-5 col-md-6">
                            <input
                                type="text"
                                className="form-control shadow-sm bg-dark text-white input-dark"
                                placeholder="🔎 Buscar producto..."
                                value={search}
                                onChange={handleSearch}
                                data-aos="fade-up"
                            />
                        </div>
                        <div className="col-lg-7 col-md-6 text-end">
                            <p className="mt-3 text-light ms-3 d-inline-block" data-aos="fade-up">
                                Mostrando <strong>{filtered.length}</strong> producto(s)
                            </p>
                        </div>
                    </div>
                </div>

                <div
                    className="horizontal-scroll-wrapper mt-5 pt-4"
                    ref={scrollRef}
                    onWheel={handleWheelScroll}
                    data-aos="fade-up"

                >
                    {filtered.length > 0 ? (
                        filtered.map((producto) => (
                            <div key={producto.id} className="product-card-horizontal">
                                <div
                                    className="card text-white position-relative shadow-sm"
                                    onClick={() => setSelectedProducto(producto)}
                                >
                                    <img
                                        src={`${API_URL}/ImagesInventario/${producto.foto}`}
                                        className="card-img-top"
                                        alt={producto.nombre}
                                        style={{ height: "180px", objectFit: "cover" }}
                                    />

                                    <span className={`position-absolute top-0 end-0 m-2 product-badge-stock badge cesar ${producto.cantidad <= 10 ? "bg-danger" : "bg-success"}`}>
                                        {producto.cantidad <= 10 ? "🔥 Pocas unidades" : "✔️ Stock"}
                                    </span>

                                    <div className="card-body text-center">
                                        <h6 className="text-warning mb-1 cesar">{producto.nombre}</h6>
                                        <p className="small mb-0">{formatPrice(producto.preciounitario)}</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center mx-auto text-light fs-5 mt-3">😕 No hay productos disponibles.</p>
                    )}
                </div>

                {selectedProducto && (
                    <div
                        className="position-fixed top-0 start-0 w-100 h-100 bg-black bg-opacity-75 d-flex justify-content-center align-items-center"
                        style={{ zIndex: 1050 }}
                    >
                        <div
                            className="bg-dark text-white rounded-4 shadow p-4 position-relative"
                            style={{ maxWidth: "600px", animation: "fadeInUp 0.5s ease" }}
                        >
                            <button
                                className="btn-close btn-close-white position-absolute top-2 end-2"
                                onClick={() => setSelectedProducto(null)}
                            ></button>
                            <img
                                src={`${API_URL}/ImagesInventario/${selectedProducto.foto}`}
                                alt={selectedProducto.nombre}
                                className="img-fluid rounded mb-3"
                            />
                            <h4 className="text-warning text-center cesar fs-5">{selectedProducto.nombre}</h4>
                            <p className="text-light"> <strong>Descripción: </strong>{selectedProducto.descripcion_P}</p>
                            <p><strong>Precio:</strong> {formatPrice(selectedProducto.preciounitario)}</p>
                            <p><strong>Stock:</strong> {selectedProducto.cantidad} unidad(es)</p>
                            <button className="btn btn-outline-warning w-100 mt-3" onClick={() => setSelectedProducto(null)}>Cerrar</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
