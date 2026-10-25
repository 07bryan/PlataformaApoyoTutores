import { useNavigate } from "react-router-dom";
import styles from "./Dashboard.module.css";

export default function Dashboard() {
  const navigate = useNavigate();

  const widgets = [
    {
      titulo: "Material para tutorías",
      contenido: "Accede a recursos y materiales para apoyar tus tutorías.",
      ruta: "/herramientas",
      color: "#2563eb",
    },
    {
      titulo: "Autocuidado",
      contenido: "Encuentra recursos para el bienestar y cuidado del tutor.",
      ruta: "/autocuidado",
      color: "#10b981",
    },
    {
      titulo: "Herramientas Pedagógicas",
      contenido:
        "Consulta herramientas y recursos para fortalecer tus estrategias de enseñanza.",
      ruta: "/planeacion",
      color: "#2563eb",
    },
  ];

  return (
    <div className={styles.dashboardContainer}>
      <h1>¡Hola, Tutor!</h1>

      <div className={styles.gridWidgets}>
        {widgets.map((w, index) => (
          <div
            key={index}
            className={`${styles.widget} ${w.ruta ? styles.widgetClickable : ""}`}
            onClick={() => w.ruta && navigate(w.ruta)}
            style={{ borderLeft: `5px solid ${w.color}` }}
          >
            <h3>{w.titulo}</h3>
            <p>{w.contenido}</p>
            {w.ruta && (
              <span className={styles.linkText}>Ir a {w.titulo} →</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
