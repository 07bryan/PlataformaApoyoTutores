import { useState } from 'react'
import Login from './components/Login'
import AdminPanel from './components/AdminPanel'
import './App.css'

function App() {
  // Estado para saber si el usuario ha iniciado sesión
  const [usuarioLogueado, setUsuarioLogueado] = useState(null);

  return (
    <div className="contenedor-principal">
      <h1 style={{ textAlign: 'center', color: '#fff', fontFamily: 'Arial', marginTop: '40px' }}>
        Sistema Integrado - Plataforma de Tutores
      </h1>

      {/* Si usuarioLogueado es null, mostramos Login. Si no, mostramos el Panel */}
      {!usuarioLogueado ? (
        <Login onLoginSuccess={(usuario) => setUsuarioLogueado(usuario)} />
      ) : (
        <AdminPanel />
      )}
    </div>
  )
}

export default App