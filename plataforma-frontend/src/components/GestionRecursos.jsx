import { useState, useEffect, useRef } from 'react';
import api from '../services/api';
import styles from './GestionRecursos.module.css';
import './Modal.css';

export default function GestionRecursos() {
    const [recursos, setRecursos] = useState([]);
    const [materias, setMaterias] = useState([]);
    const [modalMateriasAbierta, setModalMateriasAbierta] = useState(false);

    const [universidades, setUniversidades] = useState([]);
    const [paso, setPaso] = useState('universidad'); // 'universidad' o 'materia'
    const [materiasFiltradas, setMateriasFiltradas] = useState([]);

    // Estados del formulario
    const [nombre, setNombre] = useState('');
    const [archivo, setArchivo] = useState(null);
    const [idMateria, setIdMateria] = useState('');
    const [materiaSeleccionada, setMateriaSeleccionada] = useState(null);
    const [cargando, setCargando] = useState(false);
    const [categoria, setCategoria] = useState('ACADEMICO'); // Valor por defecto

    // Referencia para limpiar el input de archivo
    const fileInputRef = useRef(null);

    useEffect(() => {
        cargarDatos();
    }, []);

    const cargarDatos = async () => {
        try {
            const [resRec, resUni, resMat] = await Promise.all([
                api.get('/api/recursos/listar'),
                api.get('/api/universidades/listar'),
                api.get('/api/materias/listar')
            ]);
            setRecursos(resRec.data);
            setUniversidades(resUni.data);
            setMaterias(resMat.data);
        } catch (error) {
            console.error("Error al cargar datos", error);
        }
    };

    const seleccionarUniversidad = (uni) => {
        const filtradas = materias.filter(m => m.universidad.id === uni.id);
        setMateriasFiltradas(filtradas);
        setPaso('materia');
    };

    const seleccionarMateria = (materia) => {
        setMateriaSeleccionada(materia);
        setIdMateria(materia.id);
        setModalMateriasAbierta(false);
    };

    const subirArchivo = async () => {
        const esAcademico = categoria === 'ACADEMICO';
        if (!archivo || !nombre || !idMateria) {
            alert("Por favor completa todos los campos y selecciona un archivo.");
            return;
        }

        setCargando(true);
        const formData = new FormData();
        formData.append('archivo', archivo);
        formData.append('nombre', nombre);
        formData.append('idMateria', idMateria);
        formData.append('categoria', categoria);

        if (esAcademico) {
            formData.append('idMateria', idMateria);
        }

        try {
            await api.post('/api/recursos/subir', formData, {
                //headers: { 'Content-Type': 'multipart/form-data' }
            });

            // Limpiar formulario
            setNombre('');
            setArchivo(null);
            setIdMateria('');
            if (fileInputRef.current) fileInputRef.current.value = "";

            cargarDatos();
            alert("Recurso subido exitosamente");
        } catch (error) {
            console.error(error);
            alert("Error al subir el archivo. Verifica el tamaño o formato.");
        } finally {
            setCargando(false);
        }
    };

    const editarNombre = async (recurso) => {
        const nuevoNombre = prompt("Introduce el nuevo nombre:", recurso.nombreRecurso);
        if (!nuevoNombre || nuevoNombre === recurso.nombreRecurso) return;

        try {
            await api.put(`/api/recursos/editar/${recurso.id}`, null, {
                params: { nuevoNombre }
            });
            cargarDatos();
            alert("Nombre actualizado correctamente");
        } catch (error) {
            console.error("Error al editar", error);
            alert("No se pudo actualizar el nombre");
        }
    };

    const eliminarRecurso = async (id) => {
        if (!window.confirm("¿Estás seguro de eliminar este recurso?")) return;

        try {
            await api.delete(`/api/recursos/eliminar/${id}`);
            cargarDatos(); // Recargar la tabla tras eliminar
            alert("Recurso eliminado correctamente");
        } catch (error) {
            console.error("Error al eliminar", error);
            alert("No se pudo eliminar el recurso");
        }
    };
    console.log("Recursos cargados:", recursos);

    return (
        <div className={styles.adminContainer}>
            <h2>Gestión de Recursos</h2>

            <section className={styles.adminCard}>
                <input
                    placeholder="Nombre del recurso"
                    value={nombre}
                    onChange={e => setNombre(e.target.value)}
                />

                <select
                    value={categoria}
                    onChange={(e) => setCategoria(e.target.value)}
                    className={styles.selectCategoría} // Define este estilo en tu CSS
                >
                    <option value="ACADEMICO">Académico</option>
                    <option value="AUTOCUIDADO">Autocuidado</option>
                </select>

                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={e => setArchivo(e.target.files[0])}
                />
                {/* Solo mostramos la selección de materia si es Académico */}
                {categoria === 'ACADEMICO' && (
                    <button type="button" onClick={() => setModalMateriasAbierta(true)}>
                        {materiaSeleccionada ? materiaSeleccionada.nombre : "Seleccione Materia..."}
                    </button>
                )}

                <button onClick={subirArchivo} disabled={cargando}>
                    {cargando ? "Subiendo..." : "Subir Recurso"}
                </button>
            </section>

            <table className={styles.userTable}>
                <thead>
                    <tr><th>Nombre</th><th>Categoría</th><th>Archivo</th><th>Materia</th><th>Universidad</th><th>Acciones</th></tr>
                </thead>
                <tbody>
                    {recursos.map(r => (
                        <tr key={r.id}>
                            <td>{r.nombreRecurso}</td>
                            <td><span className={r.categoria === 'ACADEMICO' ? styles.badgeBlue : styles.badgeGreen}>{r.categoria}</span></td>
                            <td>
                                <a
                                    href={r.urlArchivoPdf.startsWith("http") ? r.urlArchivoPdf : `${import.meta.env.VITE_APP_API_URL}${r.urlArchivoPdf}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Descargar
                                </a>
                            </td>
                            <td>{r.materia?.nombre || 'N/A'}</td>
                            <td>{r.materia?.universidad?.nombre || 'N/A'}</td>
                            <td>
                                <button onClick={() => editarNombre(r)} className={styles.btnEditar}>Editar</button>
                                <button onClick={() => eliminarRecurso(r.id)} className={styles.btnEliminar}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {modalMateriasAbierta && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3>{paso === 'universidad' ? 'Seleccionar Universidad' : 'Seleccionar Materia'}</h3>
                            <button onClick={() => { setModalMateriasAbierta(false); setPaso('universidad'); }} className={styles.btnCerrarModal} >×</button>
                        </div>

                        {paso === 'universidad' ? (
                            <table className={styles.userTable}>
                                <thead><tr><th>Universidad</th></tr></thead>
                                <tbody>
                                    {universidades.map(u => (
                                        <tr key={u.id} onClick={() => seleccionarUniversidad(u)} style={{ cursor: 'pointer' }}>
                                            <td>{u.nombre}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <>
                                <button onClick={() => setPaso('universidad')} className={styles.btnVolver}>← Volver a Universidades</button>
                                <table className={styles.userTable}>
                                    <thead><tr><th>Materia</th></tr></thead>
                                    <tbody>
                                        {materiasFiltradas.map(m => (
                                            <tr key={m.id} onClick={() => seleccionarMateria(m)} style={{ cursor: 'pointer' }}>
                                                <td>{m.nombre}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}