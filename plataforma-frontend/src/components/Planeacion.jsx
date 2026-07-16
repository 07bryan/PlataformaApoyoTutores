import { useState, useEffect } from 'react';
import api from '../services/api';

export default function Planeacion() {
  const [recursos, setRecursos] = useState([]);

  useEffect(() => {
    // Obtenemos los recursos y filtramos por la nueva categoría
    api.get('/api/recursos/listar').then(res => {
      const filtrados = res.data.filter(r => r.categoria === 'HERRAMIENTAS_PEDAGOGICAS');
      setRecursos(filtrados);
    });
  }, []);

  return (
    <div className="view-container">
      <h2>Formato de Planeación de Tutorías</h2>
      
      {/* Tu formulario actual */}
      <form className="form-card">
        {/* ... tus campos de fecha, estudiante, objetivo ... */}
        <button type="submit" className="btn-primary">Guardar Planeación</button>
      </form>

      {/* Sección de consulta de recursos de apoyo */}
      <div className="content-card" style={{ marginTop: '20px' }}>
        <h3>Recursos de Apoyo para la Planeación</h3>
        {recursos.length > 0 ? (
          <ul>
            {recursos.map(r => (
              <li key={r.id}>
                {r.nombreRecurso} - 
                <a href={r.urlArchivoPdf} target="_blank" rel="noopener noreferrer"> Descargar</a>
              </li>
            ))}
          </ul>
        ) : <p>No hay herramientas pedagógicas cargadas.</p>}
      </div>
    </div>
  );
}