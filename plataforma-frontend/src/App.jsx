// App.jsx
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Planeacion from './components/Planeacion';
import Herramientas from './components/Herramientas';
import Autocuidado from './components/Autocuidado';
import GestionAcademica from './components/GestionAcademica';
import GestionUniversidades from './components/GestionUniversidades';

function App() {
  const [usuarioLogueado, setUsuarioLogueado] = useState(null);

  if (!usuarioLogueado) {
    return <Login onLoginSuccess={(usuario) => setUsuarioLogueado(usuario)} />;
  }

  return (
    <Router>
      <div className="contenedor-principal">
        <Sidebar rol={usuarioLogueado.rol} /> 
        
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/inicio" element={<Dashboard />} />
            <Route path="/planeacion" element={<Planeacion />} />
            <Route path="/herramientas" element={<Herramientas />} />
            <Route path="/autocuidado" element={<Autocuidado />} />
            
            {/* Rutas Protegidas de Admin */}
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
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;