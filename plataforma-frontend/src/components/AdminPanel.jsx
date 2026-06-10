import { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminPanel.css';

function AdminPanel() {
  const [usuarios, setUsuarios] = useState([]);
  const [nuevoUsuario, setNuevoUsuario] = useState({ 
    nombre: '', 
    correo: '', 
    password: '', 
    rol: 'TUTOR' 
});

  useEffect(() => { cargarUsuarios(); }, []);

  const cargarUsuarios = async () => {
    const res = await axios.get('http://localhost:8080/api/usuarios/listar');
    setUsuarios(res.data);
  };

  const crearUsuario = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/api/usuarios/admin/crear', nuevoUsuario, {
        headers: { 'rol-admin': 'SUPER_ADMIN' }
      });
      alert("Usuario creado con éxito");
      setNuevoUsuario({ nombre: '', correo: '', password: '', rol: 'TUTOR' });
      cargarUsuarios();
    } catch (error) {
      alert("Error al crear: " + error.message);
    }
  };

  const eliminarUsuario = async (id) => {
  if (window.confirm("¿Estás seguro de que deseas eliminar este usuario?")) {
    try {
      await axios.delete(`http://localhost:8080/api/usuarios/admin/eliminar/${id}`, {
        headers: { 'rol-admin': 'SUPER_ADMIN' }
      });
      cargarUsuarios(); // Recargamos la lista
    } catch (error) {
      alert("Error al eliminar: " + error.message);
    }
  }
};

  return (
    <div className="admin-container">
      <h1>Panel de Administración</h1>

      <section className="admin-card">
        <h3>Crear nuevo usuario</h3>
        <form onSubmit={crearUsuario} className="admin-form">
          <input placeholder="Nombre" value={nuevoUsuario.nombre} onChange={e => setNuevoUsuario({...nuevoUsuario, nombre: e.target.value})} />
          <input placeholder="Correo" value={nuevoUsuario.correo} onChange={e => setNuevoUsuario({...nuevoUsuario, correo: e.target.value})} />
          <input type="password" placeholder="Contraseña" value={nuevoUsuario.password} onChange={e => setNuevoUsuario({...nuevoUsuario, password: e.target.value})} />
          <select value={nuevoUsuario.rol} onChange={e => setNuevoUsuario({...nuevoUsuario, rol: e.target.value})}>
            <option value="TUTOR">TUTOR</option>
            <option value="ADMIN">ADMIN</option>
            <option value="SUPER_ADMIN">SUPER_ADMIN</option>
          </select>
          <button type="submit">Guardar Usuario</button>
        </form>
      </section>

      <section className="admin-card">
        <h3>Usuarios registrados</h3>
        <table className="user-table">
          <thead>
            <tr><th>Nombre</th><th>Correo</th><th>Rol</th><th>Acciones</th></tr>
          </thead>
          <tbody>
          {usuarios.map(u => (
            <tr key={u.id}>
              <td>{u.nombre}</td>
              <td>{u.correo}</td>
              <td><span className={`badge ${u.rol.toLowerCase()}`}>{u.rol}</span></td>
              <td>
                <button className="btn-delete" onClick={() => eliminarUsuario(u.id)}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        </table>
      </section>
    </div>
  );
}

export default AdminPanel;