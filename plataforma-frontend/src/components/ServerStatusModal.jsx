import './ServerStatusModal.css';

export default function ServerStatusModal({ segundos }) {
  return (
    <div className="server-modal-overlay">
      <div className="server-modal">
        <div className="server-modal-icon">
          <span>↻</span>
        </div>

        <h2>Servidor iniciándose</h2>

        <p>
          El servidor estuvo inactivo y se está iniciando nuevamente.
          <br />
          Por favor, espera un momento.
        </p>

        <div className="server-modal-loader">
          <div className="server-modal-spinner"></div>
        </div>

        <div className="server-modal-countdown">
          <span>{segundos}</span>
          <small>segundos</small>
        </div>

        <p className="server-modal-info">
          Comprobando conexión con el servidor...
        </p>
      </div>
    </div>
  );
}