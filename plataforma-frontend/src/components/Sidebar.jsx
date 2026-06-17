import { Link, useLocation } from 'react-router-dom';

export default function Sidebar({ rol }) {
  const location = useLocation();

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2>TutorDigital</h2>
      </div>
      <nav className="sidebar-nav">
        <Link to="/inicio" className={location.pathname === '/inicio' ? 'active' : ''}>Inicio</Link>
        <Link to="/herramientas" className={location.pathname === '/herramientas' ? 'active' : ''}>Herramientas</Link>
        <Link to="/autocuidado" className={location.pathname === '/autocuidado' ? 'active' : ''}>Autocuidado</Link>

        {/* --- SECCIÓN ADMINISTRADOR --- */}
        {(rol === 'ADMIN' || rol === 'SUPER_ADMIN') && (
          <>
            <hr /> {/* Separador visual */}
            <Link to="/gestion-academica" className={location.pathname === '/gestion-academica' ? 'active' : ''}>
              Gestión Académica
            </Link>
            <Link to="/gestion-universidades" className={location.pathname === '/gestion-universidades' ? 'active' : ''}>
              Gestión Universidades
            </Link>
            <Link to="/gestion-recursos" className={location.pathname === '/gestion-recursos' ? 'active' : ''}>
              Gestión Recursos
            </Link>
          </>
        )}
      </nav>
    </aside>
  );
}