import { Link, useLocation } from 'react-router-dom';

export default function Sidebar({ rol }) {
  const location = useLocation();

  const cerrarSesion = () => {
    localStorage.removeItem('usuarioSesion');
    window.location.href = '/login';
  };

  const esRutaActiva = (ruta) => location.pathname === ruta;

  const esAdministrador = rol === 'ADMIN' || rol === 'SUPER_ADMIN';

  return (
    <aside className="sidebar">

      {/* LOGO */}
      <div className="sidebar-header">
        <h2>TutorDigital</h2>
      </div>

      {/* NAVEGACIÓN */}
      <nav className="sidebar-nav">

        {/* SECCIÓN PRINCIPAL */}
        <div className="nav-section">

          <span className="nav-section-title">
            Principal
          </span>

          <Link
            to="/inicio"
            className={esRutaActiva('/inicio') ? 'active' : ''}
          >
            Inicio
          </Link>

          <Link
            to="/herramientas"
            className={esRutaActiva('/herramientas') ? 'active' : ''}
          >
            Material para tutorías
          </Link>

          <Link
            to="/autocuidado"
            className={esRutaActiva('/autocuidado') ? 'active' : ''}
          >
            Autocuidado
          </Link>

          <Link
            to="/planeacion"
            className={esRutaActiva('/planeacion') ? 'active' : ''}
          >
            Herramientas Pedagógicas
          </Link>

        </div>

        {/* SECCIÓN ADMINISTRACIÓN */}
        {esAdministrador && (
          <div className="nav-section">

            <span className="nav-section-title">
              Administración
            </span>

            <Link
              to="/gestion-academica"
              className={
                esRutaActiva('/gestion-academica') ? 'active' : ''
              }
            >
              Gestión Académica
            </Link>

            <Link
              to="/gestion-universidades"
              className={
                esRutaActiva('/gestion-universidades') ? 'active' : ''
              }
            >
              Gestión Universidades
            </Link>

            <Link
              to="/gestion-recursos"
              className={
                esRutaActiva('/gestion-recursos') ? 'active' : ''
              }
            >
              Gestión Recursos
            </Link>

          </div>
        )}

      </nav>

      {/* CERRAR SESIÓN */}
      <div className="sidebar-footer">
        <button
          onClick={cerrarSesion}
          className="btn-logout"
        >
          Cerrar sesión
        </button>
      </div>

    </aside>
  );
}