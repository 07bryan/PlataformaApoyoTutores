import { useState } from 'react';
import api from '../services/api';
import './Login.css';
import logo from '../assets/Logo.jpeg';

function Login({ onLoginSuccess }) { // Desestructuramos el prop
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [mensajeError, setMensajeError] = useState('');

  const manejarEnvio = async (e) => {
    e.preventDefault();
    try {
      const respuesta = await api.post('/api/auth/login', { correo, password });
      const usuario = respuesta.data;

      // GUARDADO PERSISTENTE:
      localStorage.setItem('usuarioSesion', JSON.stringify(usuario));

      // Notificamos al componente padre
      onLoginSuccess(usuario);
    } catch (error) {
      setMensajeError(error.response?.data?.message || 'Credenciales incorrectas');
    }
  };
  return (
    <div className="login-container">
      <h1 className="titulo-sistema">Sistema Integrado - Plataforma de Tutores</h1>
      <form className="login-card" onSubmit={manejarEnvio}>
        <img src={logo} alt="Logo Fundación" className="login-logo" />
        <h2 className="login-title">Bienvenido</h2>
        <p className="login-subtitle">Ingresa a tu plataforma de tutores</p>

        {mensajeError && <div className="error-msg">{mensajeError}</div>}

        <input type="email" placeholder="Correo electrónico" value={correo}
          onChange={(e) => setCorreo(e.target.value)} required />

        <input type="password" placeholder="Contraseña" value={password}
          onChange={(e) => setPassword(e.target.value)} required />

        <button type="submit" className="login-btn">Iniciar Sesión</button>
      </form>
    </div>
  );
}

export default Login;