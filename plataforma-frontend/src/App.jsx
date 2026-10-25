import { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';

import Sidebar from './components/Sidebar';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Planeacion from './components/Planeacion';
import Herramientas from './components/Herramientas';
import Autocuidado from './components/Autocuidado';
import GestionAcademica from './components/GestionAcademica';
import GestionUniversidades from './components/GestionUniversidades';
import GestionRecursos from './components/GestionRecursos';

function App() {
  const [usuarioLogueado, setUsuarioLogueado] = useState(null);
  const [cargando, setCargando] = useState(true);

  // Recuperar sesión al cargar la aplicación
  useEffect(() => {
    const sesionGuardada = localStorage.getItem('usuarioSesion');

    if (sesionGuardada) {
      try {
        setUsuarioLogueado(JSON.parse(sesionGuardada));
      } catch (error) {
        console.error('Error al parsear la sesión', error);
        localStorage.removeItem('usuarioSesion');
      }
    }

    setCargando(false);
  }, []);

  // Login exitoso
  const handleLoginSuccess = (usuario) => {
    localStorage.setItem('usuarioSesion', JSON.stringify(usuario));
    setUsuarioLogueado(usuario);
  };

  // Cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem('usuarioSesion');
    setUsuarioLogueado(null);
  };

  if (cargando) {
    return <div>Cargando...</div>;
  }

  return (
    <Router>
      {!usuarioLogueado ? (
        <Routes>
          <Route
            path="*"
            element={<Login onLoginSuccess={handleLoginSuccess} />}
          />
        </Routes>
      ) : (
        <div className="contenedor-principal">
          <Sidebar
            rol={usuarioLogueado.rol}
            onLogout={handleLogout}
          />

          <main className="main-content">
            <Routes>
              <Route
                path="/"
                element={<Navigate to="/inicio" replace />}
              />

              <Route
                path="/inicio"
                element={<Dashboard />}
              />

              <Route
                path="/herramientas"
                element={<Herramientas />}
              />

              <Route
                path="/autocuidado"
                element={<Autocuidado />}
              />

              <Route
                path="/planeacion"
                element={<Planeacion />}
              />

              <Route
                path="/gestion-academica"
                element={
                  usuarioLogueado.rol === 'ADMIN' ||
                  usuarioLogueado.rol === 'SUPER_ADMIN'
                    ? <GestionAcademica />
                    : <Navigate to="/inicio" replace />
                }
              />

              <Route
                path="/gestion-universidades"
                element={
                  usuarioLogueado.rol === 'ADMIN' ||
                  usuarioLogueado.rol === 'SUPER_ADMIN'
                    ? <GestionUniversidades />
                    : <Navigate to="/inicio" replace />
                }
              />

              <Route
                path="/gestion-recursos"
                element={
                  usuarioLogueado.rol === 'ADMIN' ||
                  usuarioLogueado.rol === 'SUPER_ADMIN'
                    ? <GestionRecursos />
                    : <Navigate to="/inicio" replace />
                }
              />

              <Route
                path="*"
                element={<Navigate to="/inicio" replace />}
              />
            </Routes>
          </main>
        </div>
      )}
    </Router>
  );
}

export default App;