import { useState, useEffect } from 'react';
import api from '../services/api';
import './Herramientas.css';

export default function Herramientas() {
  const [recursos, setRecursos] = useState([]);
  const [universidadSeleccionada, setUniversidadSeleccionada] = useState(null);
  const [pdfUrl, setPdfUrl] = useState(null); // Estado para la modal

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

      <div className="grid-widgets">
        {universidades.map(univ => (
          <div key={univ} className="widget">
            <h3>{univ}</h3>
            <button className="btn-secondary" onClick={() => setUniversidadSeleccionada(univ)}>
              Ver Recursos
            </button>
          </div>
        ))}
      </div>

      {universidadSeleccionada && (
        <div className="seccion-recursos">
          <div className="header-tabla">
            <h3>Recursos de {universidadSeleccionada}</h3>
            <button className="btn-cerrar" onClick={() => setUniversidadSeleccionada(null)}>Cerrar</button>
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
                      <button className="btn-view" onClick={() => setPdfUrl(r.urlArchivoPdf)}>
                        Visualizar
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}

      {/* MODAL DE VISUALIZACIÓN */}
      {pdfUrl && (
        <div className="modal-overlay">
          <div className="modal-content-pdf">
            <div className="modal-header">
              <h3>Previsualización</h3>
              <button onClick={() => setPdfUrl(null)}>Cerrar</button>
            </div>
            <iframe 
              src={pdfUrl} 
              title="PDF Preview"
              width="100%" 
              height="600px" 
              style={{ border: 'none' }}
            />
          </div>
        </div>
      )}
    </div>
  );
}