import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "./Login.css";
import logo from "../assets/Logo.jpeg";
import ServerStatusModal from "./ServerStatusModal";

function Login({ onLoginSuccess }) {
  const navigate = useNavigate();
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [mensajeError, setMensajeError] = useState("");
  const [servidorIniciando, setServidorIniciando] = useState(false);
  const [segundos, setSegundos] = useState(60);
  useEffect(() => {
    if (!servidorIniciando) {
      return;
    }

    const intervalo = setInterval(() => {
      setSegundos((actual) => {
        if (actual <= 1) {
          clearInterval(intervalo);
          setServidorIniciando(false);
          return 0;
        }

        return actual - 1;
      });
    }, 1000);

    return () => clearInterval(intervalo);
  }, [servidorIniciando]);

  const manejarEnvio = async (e) => {
    e.preventDefault();

    setMensajeError("");

    try {
      const respuesta = await api.post(
        "/api/auth/login",
        { correo, password },
        { timeout: 10000 },
      );

      const usuario = respuesta.data;

      setServidorIniciando(false);
      setSegundos(60);

      localStorage.setItem("usuarioSesion", JSON.stringify(usuario));
      onLoginSuccess(usuario);
      navigate("/inicio");
    } catch (error) {
      // El servidor respondió, pero las credenciales no son correctas
      if (error.response) {
        setMensajeError(
          error.response?.data?.message || "Credenciales incorrectas",
        );

        return;
      }
      
      setServidorIniciando(true);
      setSegundos(60);

      let tiempoTranscurrido = 0;

      while (tiempoTranscurrido < 60) {
        await new Promise((resolve) => {
          setTimeout(resolve, 5000);
        });

        tiempoTranscurrido += 5;

        try {
          const respuesta = await api.post(
            "/api/auth/login",
            { correo, password },
            { timeout: 10000 },
          );

          const usuario = respuesta.data;

          setServidorIniciando(false);
          setSegundos(60);

          localStorage.setItem("usuarioSesion", JSON.stringify(usuario));

          onLoginSuccess(usuario);
          navigate("/inicio");

          return;
        } catch (errorReintento) {
          if (errorReintento.response) {
            setServidorIniciando(false);
            setSegundos(60);

            setMensajeError(
              errorReintento.response?.data?.message ||
                "Credenciales incorrectas",
            );

            return;
          }
        }
      }

      setServidorIniciando(false);
      setSegundos(60);

      setMensajeError(
        "No fue posible conectar con el servidor. Intenta nuevamente.",
      );
    }
  };
  return (
    <>
      {servidorIniciando && <ServerStatusModal segundos={segundos} />}
      <div className="login-container">
        <div className="login-brand">
          <span className="brand-name">TutorDigital</span>

          <h1>Herramientas para tutores</h1>

          <p>
            Una plataforma de apoyo para fortalecer el trabajo de los tutores.
          </p>

          <div className="brand-features">
            <span>✓ Material académico</span>
            <span>✓ Herramientas pedagógicas</span>
            <span>✓ Recursos para tutores</span>
          </div>

          <span className="brand-foundation">
            Fundación Antivirus para la Deserción
          </span>
        </div>
        <form className="login-card" onSubmit={manejarEnvio}>
          <img src={logo} alt="Logo Fundación" className="login-logo" />
          <h2 className="login-title">Bienvenido</h2>
          <p className="login-subtitle">Ingresa a tu plataforma de tutores</p>

          {mensajeError && <div className="error-msg">{mensajeError}</div>}

          <input
            type="email"
            placeholder="Correo electrónico"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className="login-btn">
            Iniciar Sesión
          </button>
        </form>
      </div>
    </>
  );
}

export default Login;
