import { useState, useEffect } from 'react';
import axios from 'axios';

function AdminPanel() {
  const [usuarios, setUsuarios] = useState([]);
  const [nuevoUsuario, setNuevoUsuario] = useState({ id: '', nombre: '', correo: '', password: '', rol: 'TUTOR' });

  // Cargar lista al entrar
  useEffect(() => {
    cargarUsuarios();
  }, []);

  const cargarUsuarios = async () => {
    const res = await axios.get('http://localhost:8080/api/usuarios/listar');
    setUsuarios(res.data);
  };

  const crearUsuario = async (e) => {
  e.preventDefault();
  console.log("JSON que se envía al backend:", JSON.stringify(nuevoUsuario));
  try {
    // Enviamos el objeto 'nuevoUsuario' directamente en el POST
    await axios.post('http://localhost:8080/api/usuarios/admin/crear', nuevoUsuario,{
        headers: {
        'rol-admin': 'SUPER_ADMIN' // Este valor debe coincidir con el esperado en tu backend
      }
    });
    
    // Limpiamos el formulario y recargamos la lista
    alert("Usuario creado con éxito");
    cargarUsuarios();
  } catch (error) {
    alert("Error al crear el usuario: " + error.message);
  }
};

  return (
    <div style={{ padding: '20px', color: '#fff' }}>
      <h1>Panel de Administración</h1>
      
      <h3>Crear nuevo usuario</h3>
      <form onSubmit={crearUsuario}>
        <input placeholder="ID" onChange={e => setNuevoUsuario({...nuevoUsuario, id: e.target.value})} />
        <input placeholder="Nombre" onChange={e => setNuevoUsuario({...nuevoUsuario, nombre: e.target.value})} />
        <input placeholder="Correo" onChange={e => setNuevoUsuario({...nuevoUsuario, correo: e.target.value})} />
        <input placeholder="Contraseña" type="password" onChange={e => setNuevoUsuario({...nuevoUsuario, password: e.target.value})} />
        <select onChange={e => setNuevoUsuario({...nuevoUsuario, rol: e.target.value})}>
          <option value="TUTOR">TUTOR</option>
          <option value="ADMIN">ADMIN</option>
          <option value="SUPER_ADMIN">SUPER_ADMIN</option>
        </select>
        <button type="submit">Guardar Usuario</button>
      </form>

      <h3>Usuarios registrados</h3>
      <ul>
        {usuarios.map(u => (
          <li key={u.id}>{u.nombre} - {u.correo} ({u.rol})</li>
        ))}
      </ul>
    </div>
  );
}

export default AdminPanel;