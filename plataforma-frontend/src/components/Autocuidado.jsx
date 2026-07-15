import { useState, useEffect } from 'react';
import api from '../services/api';
import './Herramientas.css'; // Puedes reutilizar los mismos estilos

export default function Autocuidado() {
  const [recursos, setRecursos] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    cargarRecursosAutocuidado();
  }, []);

  const cargarRecursosAutocuidado = async () => {
    try {
      const res = await api.get('/api/recursos/listar');
      // Filtramos únicamente los recursos que tengan la categoría 'AUTOCUIDADO'
      const filtrados = res.data.filter(r => r.categoria === 'AUTOCUIDADO');
      setRecursos(filtrados);
    } catch (error) {
      console.error("Error al cargar recursos de autocuidado", error);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="view-container">
      <h2>Hábitos de Autocuidado</h2>
      
      {cargando ? (
        <p>Cargando recursos...</p>
      ) : recursos.length === 0 ? (
        <div className="content-card">
          <p>No hay recursos de autocuidado disponibles en este momento.</p>
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
                      Descargar / Ver
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