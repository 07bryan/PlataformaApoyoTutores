import { Link, useLocation } from 'react-router-dom';

export default function Sidebar() {
  const location = useLocation(); // Para saber qué página está activa

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2>TutorDigital</h2>
      </div>
      <nav className="sidebar-nav">
        <Link to="/inicio" className={location.pathname === '/inicio' ? 'active' : ''}>
          Inicio
        </Link>
        <Link to="/planeacion" className={location.pathname === '/planeacion' ? 'active' : ''}>
          Planeación
        </Link>
        <Link to="/herramientas" className={location.pathname === '/herramientas' ? 'active' : ''}>
          Herramientas
        </Link>
        <Link to="/autocuidado" className={location.pathname === '/autocuidado' ? 'active' : ''}>
          Autocuidado
        </Link>
      </nav>
    </aside>
  );
}