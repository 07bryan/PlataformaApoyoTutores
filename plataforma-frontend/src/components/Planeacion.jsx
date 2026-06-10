export default function Planeacion() {
  return (
    <div className="view-container">
      <h2>Formato de Planeación de Tutorías</h2>
      <form className="form-card">
        <div className="form-group">
          <label>Fecha de la tutoría</label>
          <input type="date" />
        </div>
        <div className="form-group">
          <label>Nombre del Estudiante</label>
          <input type="text" placeholder="Ej: Juan Pérez" />
        </div>
        <div className="form-group">
          <label>Objetivo de aprendizaje</label>
          <textarea rows="4" placeholder="¿Qué logrará el estudiante hoy?"></textarea>
        </div>
        <button type="submit" className="btn-primary">Guardar Planeación</button>
      </form>
    </div>
  );
}