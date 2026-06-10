export default function Dashboard() {
  return (
    <div>
      <h1>¡Hola, Tutor!</h1>
      <div className="grid-widgets">
        <div className="widget">
          <h3>Próximas Tutorías</h3>
          <p>Cálculo II - Juan Pérez</p>
        </div>
        <div className="widget">
          <h3>Herramientas Pedagógicas</h3>
          <button>Ir a Talleres</button>
        </div>
      </div>
    </div>
  );
}