import { useState, useEffect, useRef } from 'react';
import api from '../services/api';
import styles from './GestionAcademica.module.css';

export default function GestionAcademica() {
    const [universidades, setUniversidades] = useState([]);
    const [materias, setMaterias] = useState([]);
    const [nuevaMateria, setNuevaMateria] = useState({
        nombre: '', creditos: 0, semestre: 1, idUniversidad: ''
    });

    const inputRef = useRef(null);

    useEffect(() => {
        cargarDatos();
    }, []);

    const cargarDatos = async () => {
        try {
            const [resUniv, resMat] = await Promise.all([
                api.get('/api/universidades/listar'),
                api.get('/api/materias/listar')
            ]);
            setUniversidades(Array.isArray(resUniv.data) ? resUniv.data : []);
            setMaterias(Array.isArray(resMat.data) ? resMat.data : []);
        } catch (error) {
            console.error("Error al conectar con el backend:", error);
        }
    };

    const manejarSubmit = async (e) => {
        e.preventDefault();
        if (!nuevaMateria.idUniversidad) {
            alert("Por favor, selecciona una universidad.");
            return;
        }
        try {
            await api.post('/api/materias/crear', nuevaMateria);
            setNuevaMateria({ nombre: '', creditos: 0, semestre: 1, idUniversidad: '' });
            cargarDatos();
        } catch (error) {
            alert("Error al guardar la materia.");
        }
    };

    const eliminarMateria = async (id) => {
        if (window.confirm("¿Seguro que deseas eliminar esta materia?")) {
            await api.delete(`/api/materias/eliminar/${id}`);
            cargarDatos();
        }
    };

    return (
        <div className={styles.adminContainer}>
            <h2>Gestión Académica</h2>

            <section className={styles.adminCard}>
                <h3>Agregar Nueva Materia</h3>
                <form className={styles.adminForm} onSubmit={manejarSubmit}>
                    <input ref={inputRef} placeholder="Nombre Materia" value={nuevaMateria.nombre} onChange={e => setNuevaMateria({ ...nuevaMateria, nombre: e.target.value })} required />
                    <input type="number" placeholder="Créditos" value={nuevaMateria.creditos} onChange={e => setNuevaMateria({ ...nuevaMateria, creditos: parseInt(e.target.value) || 0 })} required />
                    <input type="number" placeholder="Semestre" value={nuevaMateria.semestre} onChange={e => setNuevaMateria({ ...nuevaMateria, semestre: parseInt(e.target.value) || 1 })} required />
                    <select value={nuevaMateria.idUniversidad} onChange={e => setNuevaMateria({ ...nuevaMateria, idUniversidad: e.target.value })} required>
                        <option value="">Seleccione Universidad</option>
                        {Array.isArray(universidades) && universidades.map(u => (
                            <option key={u.id} value={u.id}>{u.nombre}</option>
                        ))}
                    </select>
                    <button type="submit">Guardar Materia</button>
                </form>
            </section>

            <section className={styles.adminCard}>
                <h3>Materias Registradas</h3>
                {Array.isArray(materias) && materias.length > 0 ? (
                    < table className={styles.userTable}>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Semestre</th>
                        <th>Créditos</th>
                        <th>Universidad</th> {/* Nueva columna */}
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {materias.map(m => (
                        <tr key={m.id}>
                            <td>{m.nombre}</td>
                            <td>{m.semestre}</td>
                            <td>{m.creditos}</td>
                            {/* Acceso a la propiedad de la universidad vinculada */}
                            <td>{m.universidad ? m.universidad.nombre : 'Sin asignar'}</td>
                            <td>
                                <button className={styles.btnDelete} onClick={() => eliminarMateria(m.id)}>
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            ) : (
            <div className={styles.emptyState}>
                <p>No se encontraron materias registradas.</p>
                <button className={styles.btnAdd} onClick={() => inputRef.current?.focus()}>¡Agrega tu primera materia arriba!</button>
            </div>
        )}
        </section>
    </div >
  );
}