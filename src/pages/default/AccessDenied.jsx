import React from 'react';

const AccessDenied = () => {
    return (
        <div className=' position relative'>
            <div class="position-absolute top-50 start-50 translate-middle p-5 border border-3 text-white ">
                <div className="text-center">
                    <img src="LOGO.png" alt="" width="170" height="170" class=" mb-5" />

                </div>
                <h1 className='antonparabackend text-center text-warning'>Acceso Denegado</h1>
                <p className='text-danger antonparabackend'>No tienes permiso para acceder a esta página.</p>
            </div>

        </div>
    );
};

export default AccessDenied;
