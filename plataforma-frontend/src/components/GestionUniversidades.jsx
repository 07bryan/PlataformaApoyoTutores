import { useState, useEffect } from 'react';
import api from '../services/api';
import styles from './GestionUniversidades.module.css';

export default function GestionUniversidades() {
  const [universidades, setUniversidades] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [nuevaUniv, setNuevaUniv] = useState({ nombre: '' });

  useEffect(() => {
    cargarUniversidades();
  }, []);

  const cargarUniversidades = async () => {
    try {
      const res = await api.get('/api/universidades/listar');
      setUniversidades(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error("Error al cargar:", error);
      setUniversidades([]);
    }
  };

  const guardarUniversidad = async () => {
    try {
      await api.post('/api/universidades/crear', nuevaUniv);
      setIsModalOpen(false);
      setNuevaUniv({ nombre: '' });
      cargarUniversidades();
    } catch (error) {
      alert("Error al guardar.");
    }
  };

  const editarUniversidad = async (universidad) => {
    const nuevoNombre = prompt("Introduce el nuevo nombre de la universidad:", universidad.nombre);
    
    // Validación básica
    if (!nuevoNombre || nuevoNombre.trim() === "" || nuevoNombre === universidad.nombre) return;

    try {
      await api.put(`/api/universidades/editar/${universidad.id}`, null, {
        params: { nuevoNombre }
      });
      cargarUniversidades(); // Recargar lista
      alert("Universidad actualizada con éxito");
    } catch (error) {
      console.error("Error al editar", error);
      alert("Error al actualizar la universidad.");
    }
  };

  const eliminarUniversidad = async (id) => {
    if (window.confirm("¿Seguro que deseas eliminar esta universidad?")) {
      try {
        await api.delete(`/api/universidades/eliminar/${id}`);
        cargarUniversidades();
      } catch (error) {
        alert("No se pudo eliminar. Verifica si hay materias vinculadas.");
      }
    }
  };

  return (
    <div className={styles.adminContainer}>
      <h2>Gestión de Universidades</h2>
      
      <button className={styles.btnAdd} onClick={() => setIsModalOpen(true)}>
        + Agregar Universidad
      </button>

      <table className={styles.userTable}>
        <thead>
          <tr><th>Nombre</th><th>Acciones</th></tr>
        </thead>
        <tbody>
          {universidades.length > 0 ? (
            universidades.map(u => (
              <tr key={u.id}>
                <td>{u.nombre}</td>
                <td>
                  <button className={styles.btnEdit} onClick={() => editarUniversidad(u)}>
                    Editar
                  </button>
                  <button className={styles.btnDelete} onClick={() => eliminarUniversidad(u.id)}>
                    Eliminar
                  </button>
              </td>
              </tr>
            ))
          ) : (
            <tr><td colSpan="2">No hay universidades registradas.</td></tr>
          )}
        </tbody>
      </table>

      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h3>Nueva Universidad</h3>
            <input 
              placeholder="Nombre de la universidad" 
              value={nuevaUniv.nombre}
              onChange={e => setNuevaUniv({ nombre: e.target.value })} 
            />
            <div className={styles.modalActions}>
              <button className={styles.btnCancel} onClick={() => setIsModalOpen(false)}>Cancelar</button>
              <button className={styles.btnSave} onClick={guardarUniversidad}>Guardar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}