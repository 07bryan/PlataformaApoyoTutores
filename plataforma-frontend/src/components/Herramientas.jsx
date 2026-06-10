export default function Herramientas() {
  return (
    <div className="view-container">
      <h2>Herramientas Pedagógicas</h2>
      <input type="text" className="search-bar" placeholder="Buscar materia o recurso..." />
      
      <div className="grid-widgets">
        <div className="widget">
          <h3>Universidad de Antioquia</h3>
          <p>Semestres: 1-8</p>
          <button className="btn-secondary">Ver Talleres</button>
        </div>
        <div className="widget">
          <h3>EAFIT / PUJ</h3>
          <p>Material complementario</p>
          <button className="btn-secondary">Ver Parciales</button>
        </div>
      </div>
    </div>
  );
}