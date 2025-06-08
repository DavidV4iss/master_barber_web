import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, EffectCreative, Autoplay } from 'swiper/modules';
import 'swiper/css/bundle';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/effect-creative';
import axios from 'axios';
const API_URL = process.env.API_URL || "http://localhost:8080";
import API from '../api/api';


export default function CarrouselShop() {
    const [images, setImages] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const res = await API.get("/GetInventario");
                setImages(res.data);
            } catch (err) {
                console.log("Error al obtener las calificaciones:", err);
            }
        };
        fetchImages();
    }, []);

    const handleShowModal = (image) => {
        setSelectedImage(image);
    };

    const handleCloseModal = () => {
        setSelectedImage(null);
    };

    return (
        <>
            <Swiper
                grabCursor={true}
                effect={'creative'}
                creativeEffect={{
                    prev: {
                        translate: ['-100%', 0, -500],
                    },
                    next: {
                        translate: ['100%', 0, -500],
                    },
                }}
                centeredSlides={true}
                modules={[Navigation, Pagination, EffectCreative, Autoplay]}
                autoplay={{ delay: 2200 }}
                navigation={{ clickable: true }}
                loop={true}
                breakpoints={{
                    640: {
                        slidesPerView: 1
                    },
                    768: {
                        slidesPerView: 3
                    }
                }}
                className="mySwiper2 mt-5 pt-5 "
            >
                {images.map((carrousel) => (
                    <SwiperSlide key={carrousel.id}>
                        <div className="card text-center bg-dark">
                            <div className="card-body">
                                <img src={`${API_URL}/ImagesInventario/${carrousel.Foto}`} className='img-fluid ' alt="" />
                                <h5 className="card-title mt-4 antonparabackend text-danger">{carrousel.nombre}</h5>
                                <p className="card-text text-white mt-4">{carrousel.descripcion_P}</p>
                                <p className="card-text text-white mt-2">Quedan {carrousel.cantidad} Unidades De Este Producto</p>
                                <button type="button" className="btn btn-danger" onClick={() => handleShowModal(carrousel)}>
                                    Ver
                                </button>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {selectedImage && (
                <div className="modal fade show bg-black" style={{ display: 'block' }} tabIndex="-1">
                    <div className="modal-dialog ">
                        <div className="modal-content bg-black welcome-2 border border">
                            <div className="modal-header">
                                <button type="button" className="btn-close btn-close-white" onClick={handleCloseModal} aria-label="Close"></button>
                            </div>
                            <div className="modal-bod y ">
                                <img src={`/images/imagesInventario/${selectedImage.Foto}`} className=' w-25 contenido4 mt-5' alt="" />
                                <h5 className="card-title mt-4 antonparabackend text-danger text-center">{selectedImage.nombre}</h5>
                                <p className="card-text text-white mt-4 text-center m-5 ">{selectedImage.descripcion_P}</p>
                                <p className="card-text text-white text-center m-5 ">Quedan {selectedImage.cantidad} Unidades De Este Producto</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-danger" onClick={handleCloseModal}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}