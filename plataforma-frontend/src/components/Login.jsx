import { useState } from 'react';
import axios from 'axios';
import './Login.css'; 
import logo from '../assets/Logo.jpeg';

function Login(props) {
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [mensajeError, setMensajeError] = useState('');

  const manejarEnvio = async (e) => {
    e.preventDefault();
    try {
      const respuesta = await axios.post('http://localhost:8080/api/auth/login', { correo, password });
      props.onLoginSuccess(respuesta.data);
    } catch (error) {
      setMensajeError(error.response?.data?.error || 'Error de conexión');
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