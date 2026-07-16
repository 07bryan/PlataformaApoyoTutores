import { useState, useEffect } from 'react';
import api from '../services/api';
import './Herramientas.css';

export default function Herramientas() {
  const [recursos, setRecursos] = useState([]);
  const [universidadSeleccionada, setUniversidadSeleccionada] = useState(null);
  const [busquedaMateria, setBusquedaMateria] = useState('');

  useEffect(() => {
    cargarRecursos();
  }, []);

  const cargarRecursos = async () => {
    try {
      const res = await api.get('/api/recursos/listar');
      const academicos = res.data.filter(r => r.categoria === 'MATERIAL_PARA_TUTORIAS');
      setRecursos(res.data);
    } catch (error) {
      console.error("Error al cargar recursos", error);
    }
  };

  const universidades = [...new Set(recursos.map(r => r.materia?.universidad?.nombre).filter(Boolean))];

  return (
    <div className="view-container">
      <h2>Material para tutorías</h2>

      <div className="grid-widgets">
        {universidades.map(univ => (
          <div key={univ} className="widget">
            <h3>{univ}</h3>
            <p>Material disponible</p>
            <button className="btn-secondary" onClick={() => setUniversidadSeleccionada(univ)}>
              Ver Recursos
            </button>
          </div>
        ))}
      </div>

      {universidadSeleccionada && (
        <div className="seccion-recursos-container">
          <div className="header-tabla">
            <h3>Recursos de {universidadSeleccionada}</h3>
            <div className="controles-tabla">
              <input
                className="input-filtro"
                placeholder="🔍 Filtrar por materia..."
                value={busquedaMateria}
                onChange={(e) => setBusquedaMateria(e.target.value)}
              />
              <button className="btn-cerrar" onClick={() => {
                setUniversidadSeleccionada(null);
                setBusquedaMateria('');
              }}>Cerrar</button>
            </div>
          </div>

          <div className="tabla-wrapper">
            <table className="user-table">
              <thead>
                <tr>
                  <th>Materia</th>
                  <th>Nombre Recurso</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                {recursos
                  .filter(r => r.materia?.universidad?.nombre === universidadSeleccionada)
                  .filter(r => r.materia?.nombre?.toLowerCase().includes(busquedaMateria.toLowerCase()))
                  .map(r => (
                    <tr key={r.id}>
                      <td><span className="badge-materia">{r.materia?.nombre || 'N/A'}</span></td>
                      <td>{r.nombreRecurso}</td>
                      <td>
                        <a href={r.urlArchivoPdf.startsWith("http") ? r.urlArchivoPdf : `${import.meta.env.VITE_APP_API_URL}${r.urlArchivoPdf}`}
                          target="_blank" rel="noopener noreferrer" className="btn-descargar">
                          Descargar
                        </a>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}