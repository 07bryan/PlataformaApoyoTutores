import { useState, useEffect } from 'react';
import axios from 'axios';
import './Herramientas.css';

export default function Herramientas() {
  const [recursos, setRecursos] = useState([]);
  const [universidadSeleccionada, setUniversidadSeleccionada] = useState(null);

  useEffect(() => {
    cargarRecursos();
  }, []);

  const cargarRecursos = async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/recursos/listar');
      setRecursos(res.data);
    } catch (error) {
      console.error("Error al cargar recursos", error);
    }
  };

  const universidades = [...new Set(recursos.map(r => r.materia?.universidad?.nombre).filter(Boolean))];

  return (
    <div className="view-container">
      <h2>Herramientas Pedagógicas</h2>

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
        <div className="seccion-recursos" style={{ marginTop: '30px' }}>
          <div className="header-tabla">
            <h3>Recursos de {universidadSeleccionada}</h3>
            <button className="btn-cerrar" onClick={() => setUniversidadSeleccionada(null)}>Cerrar Tabla</button>
          </div>

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
                .map(r => (
                  <tr key={r.id}>
                    <td>{r.materia?.nombre || 'N/A'}</td>
                    <td>{r.nombreRecurso}</td>
                    <td>
                      <a href={`http://localhost:8080${r.urlArchivoPdf}`} download target="_blank" rel="noopener noreferrer">
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