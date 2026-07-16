import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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
  const [cargando, setCargando] = useState(true); // Estado para evitar parpadeos

  // 1. Efecto para recuperar la sesión al recargar
  useEffect(() => {
    const sesionGuardada = localStorage.getItem('usuarioSesion');
    if (sesionGuardada) {
      try {
        setUsuarioLogueado(JSON.parse(sesionGuardada));
      } catch (e) {
        console.error("Error al parsear la sesión", e);
        localStorage.removeItem('usuarioSesion');
      }
    }
    setCargando(false);
  }, []);

  // 2. Función para manejar el login y guardar en localStorage
  const handleLoginSuccess = (usuario) => {
    localStorage.setItem('usuarioSesion', JSON.stringify(usuario));
    setUsuarioLogueado(usuario);
  };

  // 3. Función para cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem('usuarioSesion');
    setUsuarioLogueado(null);
  };

  // Mostrar algo mientras verificamos la sesión
  if (cargando) return <div>Cargando...</div>;

  if (!usuarioLogueado) {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <Router>
      <div className="contenedor-principal">
        {/* Pasamos también handleLogout si quieres un botón de salir en el Sidebar */}
        <Sidebar rol={usuarioLogueado.rol} onLogout={handleLogout} /> 
        
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/inicio" element={<Dashboard />} />
            <Route path="/herramientas" element={<Herramientas />} />
            <Route path="/autocuidado" element={<Autocuidado />} />
            <Route path="/planeacion" element={<Planeacion />} />
            
            {/* Rutas Protegidas */}
            <Route 
              path="/gestion-academica" 
              element={
                (usuarioLogueado.rol === 'ADMIN' || usuarioLogueado.rol === 'SUPER_ADMIN') 
                ? <GestionAcademica /> : <Navigate to="/" />
              } 
            />
            <Route 
              path="/gestion-universidades" 
              element={
                (usuarioLogueado.rol === 'ADMIN' || usuarioLogueado.rol === 'SUPER_ADMIN') 
                ? <GestionUniversidades /> : <Navigate to="/" />
              } 
            />
            <Route 
              path="/gestion-recursos" 
              element={
                (usuarioLogueado.rol === 'ADMIN' || usuarioLogueado.rol === 'SUPER_ADMIN') 
                ? <GestionRecursos /> : <Navigate to="/" />
              } 
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;