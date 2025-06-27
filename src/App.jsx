import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PrivateRoute from './Components/PrivateRoute';  // Importa tu componente de ruta privada
import AccessDenied from './pages/default/AccessDenied'; // Importa el componente de acceso denegado
import 'animate.css';


// IMPORTACION PARA RUTAS
import Login from './pages/default/Login';
import Index from './pages/default/Index';
import Registro from './pages/default/Registro';
import GestionarBarberos from './pages/Admin/GestionarBarberos';
import Inventario from './pages/Admin/Inventario';
import InicioAdmin from './pages/Admin/InicioAdmin';
import Gestiondeinventario from './pages/Admin/Gestiondeinventario';
import EnvEmail from './pages/default/EnvEmail';
import Cambiarpasscod from './pages/default/Cambiarpasscod';
import InicioUsuario from './pages/Usuario/InicioUsuario';
import PerfilAdmin from './pages/Admin/PerfilAdmin';
import PerfilBarber from "./pages/Barbers/PerfilBarber";
import PerfilUser from "./pages/Usuario/PerfilUser";
import GestionReservas from './pages/Barbers/GestionReservas';
import ReservaCliente from './pages/Usuario/ReservaCliente';

//FIN IMPORTACION DE RUTAS




// ESTILOS DE LA PAGINA
import 'animate.css';
import './App.scss';
import 'bootstrap/scss/bootstrap.scss'



//FIN ESTILOS

function App() {
  return (
    <BrowserRouter>
      <div className="flex">
        <div className="content w-100">
          <Routes>




            {/* RUTAS PUBLICAS */}
            <Route exact path="/" element={<Index />} />
            <Route exact path="/Login" element={<Login />} />
            <Route exact path="/Registro" element={<Registro />} />
            <Route exact path="/EnvEmail" element={<EnvEmail />} />
            <Route exact path="/cambiarpasscod" element={<Cambiarpasscod />} />
            {/* FIN RUTAS PUBLICAS */}







            {/* RUTAS PRIVDAS ADMINISTRADOR*/}
            <Route
              exact
              path="/InicioAdmin"
              element={<PrivateRoute roles={["1"]} element={<InicioAdmin />} />}
            />
            <Route
              exact
              path="/GestionarBarberos"
              element={
                <PrivateRoute roles={["1"]} element={<GestionarBarberos />} />
              }
            />
            <Route
              exact
              path="/Inventario"
              element={<PrivateRoute roles={["1"]} element={<Inventario />} />}
            />

            <Route
              exact
              path="/Gestiondeinventario"
              element={
                <PrivateRoute roles={["1"]} element={<Gestiondeinventario />} />
              }
            />
            <Route
              exact
              path="/PerfilAdmin"
              element={<PrivateRoute roles={["1"]} element={<PerfilAdmin />} />}
            />
            {/* FIN RUTAS PRIVDAS ADMINISTRADOR*/}











            {/* RUTAS PRIVADAS BARBEROS */}

            <Route
              exact
              path="/PerfilBarber"
              element={<PrivateRoute roles={["2"]} element={<PerfilBarber />} />}
            />
            <Route
              exact
              path="/GestionReservas"
              element={<PrivateRoute roles={["2"]} element={<GestionReservas />} />}
            />


            {/* FIN RUTAS PRIVADAS BARBEROS */}










            {/* RUTAS PRIVADAS CLIENTE*/}
            <Route
              exact
              path="/InicioUsuario"
              element={<PrivateRoute roles={["3"]} element={<InicioUsuario />} />}
            />

            <Route
              exact
              path="/PerfilUser"
              element={<PrivateRoute roles={["3"]} element={<PerfilUser />} />}
            />
            <Route
              exact
              path="/ReservaCliente"
              element={<PrivateRoute roles={["3"]} element={<ReservaCliente />} />}
            />


            {/* FIN RUTAS PRIVADAS CLIENTE*/}









            {/* RUTA ACCESO DENEGADO*/}
            <Route exact path="/access-denied" element={<AccessDenied />} />
            {/* FIN RUTA ACCESO DENEGADO*/}


          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
