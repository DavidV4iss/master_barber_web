import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ roles, element }) => {
    const token = localStorage.getItem('token');

    if (!token) {
        console.log("NO HAY TOKEN. PORFAVOR INICIA SESION O REGISTRATE");
        return <Navigate to="/Login" />;
    }

    let userRole;
    try {
        const user = JSON.parse(atob(token.split('.')[1]));
        userRole = user.role;
        console.log("Rol de usuario segun el token", userRole);
    } catch (error) {
        console.error("Error decoding token", error);
        return <Navigate to="/access-denied" />;
    }

    if (!roles.includes(userRole.toString())) {
        console.log(`Acceso Denegado. Tu Rol Es: ${userRole}, Y Para Ir Alla Se Requiere Tener El Rol: ${roles}`);
        return <Navigate to="/access-denied" />;
    }

    return element;
};

export default PrivateRoute;

