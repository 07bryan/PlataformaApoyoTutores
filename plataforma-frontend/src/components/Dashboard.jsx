import { useNavigate } from 'react-router-dom';
import styles from './Dashboard.module.css';

export default function Dashboard() {
  const navigate = useNavigate();

  const widgets = [
    {
      titulo: "Material para tutorias",
      contenido: "Accede a todos los recursos y talleres.",
      ruta: "/herramientas",
      color: "#007bff"
    },
    {
      titulo: "Autocuidado",
      contenido: "Espacios de bienestar y gestión emocional.",
      ruta: "/autocuidado",
      color: "#28a745" // Verde para diferenciar
    }
  ];

  return (
    <div className={styles.dashboardContainer}>
      <h1>¡Hola, Tutor!</h1>
      
      <div className={styles.gridWidgets}>
        {widgets.map((w, index) => (
          <div 
            key={index}
            className={`${styles.widget} ${w.ruta ? styles.widgetClickable : ''}`}
            onClick={() => w.ruta && navigate(w.ruta)}
            style={{ borderLeft: `5px solid ${w.color}` }}
          >
            <h3>{w.titulo}</h3>
            <p>{w.contenido}</p>
            {w.ruta && <span className={styles.linkText}>Ir a {w.titulo} →</span>}
          </div>
        ))}
      </div>
    </div>
  );
}