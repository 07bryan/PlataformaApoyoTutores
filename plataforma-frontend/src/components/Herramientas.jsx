export default function Herramientas() {
  const [recursos, setRecursos] = useState([]);
  const [universidadSeleccionada, setUniversidadSeleccionada] = useState(null);
  // 1. Nuevo estado para el filtro
  const [busquedaMateria, setBusquedaMateria] = useState('');

  useEffect(() => {
    cargarRecursos();
  }, []);

  const cargarRecursos = async () => {
    try {
      const res = await api.get('/api/recursos/listar');
      setRecursos(res.data);
    } catch (error) {
      console.error("Error al cargar recursos", error);
    }
  };

  const universidades = [...new Set(recursos.map(r => r.materia?.universidad?.nombre).filter(Boolean))];

  return (
    <div className="view-container">
      <h2>Herramientas Pedagógicas</h2>

      {/* ... widgets de universidades ... */}

      {universidadSeleccionada && (
        <div className="seccion-recursos" style={{ marginTop: '30px' }}>
          <div className="header-tabla">
            <h3>Recursos de {universidadSeleccionada}</h3>
            {/* 2. Input de filtro integrado */}
            <input 
              placeholder="Filtrar por materia..." 
              value={busquedaMateria}
              onChange={(e) => setBusquedaMateria(e.target.value)}
              style={{ padding: '8px', marginLeft: '10px' }}
            />
            <button className="btn-cerrar" onClick={() => {
                setUniversidadSeleccionada(null);
                setBusquedaMateria(''); // Limpiar filtro al cerrar
            }}>Cerrar Tabla</button>
          </div>

          <table className="user-table">
            <thead>
              <tr><th>Materia</th><th>Nombre Recurso</th><th>Acción</th></tr>
            </thead>
            <tbody>
              {recursos
                .filter(r => r.materia?.universidad?.nombre === universidadSeleccionada)
                // 3. Aplicamos el filtro de búsqueda por nombre de materia
                .filter(r => r.materia?.nombre?.toLowerCase().includes(busquedaMateria.toLowerCase()))
                .map(r => (
                  <tr key={r.id}>
                    <td>{r.materia?.nombre || 'N/A'}</td>
                    <td>{r.nombreRecurso}</td>
                    <td>
                      <a href={r.urlArchivoPdf.startsWith("http") ? r.urlArchivoPdf : `${import.meta.env.VITE_APP_API_URL}${r.urlArchivoPdf}`} target="_blank" rel="noopener noreferrer">
                        Descargar
                      </a>
                    </td>
                  </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}