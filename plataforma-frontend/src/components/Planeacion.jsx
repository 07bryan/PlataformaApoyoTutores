import { useState, useEffect } from 'react';
import api from '../services/api';
// Importa tus estilos para mantener consistencia
import './Herramientas.css'; 

export default function Planeacion() {
  const [recursos, setRecursos] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    cargarRecursos();
  }, []);

  const cargarRecursos = async () => {
    try {
      const res = await api.get('/api/recursos/listar');
      const filtrados = res.data.filter(r => r.categoria === 'HERRAMIENTAS_PEDAGOGICAS');
      setRecursos(filtrados);
    } catch (error) {
      console.error("Error al cargar recursos", error);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="view-container">
      <h2>Herramientas Pedagógicas</h2>
      
      {cargando ? (
        <p>Cargando recursos...</p>
      ) : recursos.length === 0 ? (
        <div className="content-card">
          <p>No hay herramientas pedagógicas disponibles en este momento.</p>
        </div>
      ) : (
        <div className="tabla-wrapper">
          <table className="user-table">
            <thead>
              <tr>
                <th>Nombre del Recurso</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {recursos.map(r => (
                <tr key={r.id}>
                  <td>{r.nombreRecurso}</td>
                  <td>
                    <a 
                      href={r.urlArchivoPdf.startsWith("http") ? r.urlArchivoPdf : `${import.meta.env.VITE_APP_API_URL}${r.urlArchivoPdf}`}
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="btn-descargar"
                    >
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