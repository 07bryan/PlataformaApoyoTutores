import { useState } from 'react';
import axios from 'axios'; // 1. Importamos la librería de conexión

function Login(props) {
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [mensajeError, setMensajeError] = useState('');

  const manejarEnvio = async (e) => {
    e.preventDefault();
    setMensajeError(''); // Limpiamos errores previos

    try {
      const respuesta = await axios.post('http://localhost:8080/api/auth/login', {
        correo: correo,
        password: password
    });
    props.onLoginSuccess(respuesta.data);
      
    } catch (error) {
      // 4. Si el usuario no existe o la contraseña no coincide, capturamos el error
      console.error('Error al loguear:', error);
      if (error.response) {
        setMensajeError(error.response.data.error || 'Credenciales incorrectas');
      } else {
        setMensajeError('No se pudo conectar con el servidor backend');
      }
    }
  };

  return (
    <div style={estilos.tarjeta}>
      <h2 style={estilos.titulo}>Iniciar Sesión</h2>
      
      {/* Mensaje visual si ocurre un error de login */}
      {mensajeError && <div style={estilos.error}>{mensajeError}</div>}

      <form onSubmit={manejarEnvio} style={estilos.formulario}>
        <div style={estilos.grupo}>
          <label style={estilos.etiqueta}>Correo Electrónico:</label>
          <input 
            type="email" 
            value={correo} 
            onChange={(e) => setCorreo(e.target.value)} 
            required 
            style={estilos.input}
            placeholder="ejemplo@correo.com"
          />
        </div>
        
        <div style={estilos.grupo}>
          <label style={estilos.etiqueta}>Contraseña:</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
            style={estilos.input}
            placeholder="********"
          />
        </div>

        <button type="submit" style={estilos.boton}>Ingresar</button>
      </form>
    </div>
  );
}

const estilos = {
  tarjeta: {
    backgroundColor: '#1e1e1e',
    padding: '35px',
    borderRadius: '10px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.5)',
    width: '360px',
    margin: '40px auto',
    color: '#fff',
    fontFamily: 'Arial, sans-serif',
    boxSizing: 'border-box'
  },
  titulo: {
    textAlign: 'center',
    marginBottom: '25px',
    color: '#fff',
    fontSize: '24px'
  },
  error: {
    backgroundColor: '#721c24',
    color: '#f8d7da',
    padding: '10px',
    borderRadius: '4px',
    marginBottom: '15px',
    fontSize: '14px',
    textAlign: 'center',
    border: '1px solid #f5c6cb'
  },
  formulario: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  grupo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    textAlign: 'left'
  },
  etiqueta: {
    fontSize: '14px',
    color: '#ccc',
    fontWeight: '500'
  },
  input: {
    padding: '12px',
    borderRadius: '6px',
    border: '1px solid #444',
    backgroundColor: '#2a2a2a',
    color: '#fff',
    fontSize: '14px',
    outline: 'none',
    boxSizing: 'border-box'
  },
  boton: {
    padding: '12px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '16px',
    marginTop: '10px'
  }
};

export default Login;