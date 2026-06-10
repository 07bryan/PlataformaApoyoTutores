import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
// Importa los nuevos componentes
import Planeacion from './components/Planeacion';
import Herramientas from './components/Herramientas';
import Autocuidado from './components/Autocuidado';

function App() {
  const [usuarioLogueado, setUsuarioLogueado] = useState(null);

  if (!usuarioLogueado) {
    return <Login onLoginSuccess={(usuario) => setUsuarioLogueado(usuario)} />;
  }

  return (
    <Router>
      <div className="contenedor-principal">
        <Sidebar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/inicio" element={<Dashboard />} />
            <Route path="/planeacion" element={<Planeacion />} />
            <Route path="/herramientas" element={<Herramientas />} />
            <Route path="/autocuidado" element={<Autocuidado />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;