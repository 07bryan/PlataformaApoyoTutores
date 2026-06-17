import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import styles from './GestionRecursos.module.css';

export default function GestionRecursos() {
    const [recursos, setRecursos] = useState([]);
    const [materias, setMaterias] = useState([]);

    // Estados del formulario
    const [nombre, setNombre] = useState('');
    const [archivo, setArchivo] = useState(null);
    const [idMateria, setIdMateria] = useState('');
    const [cargando, setCargando] = useState(false);

    // Referencia para limpiar el input de archivo
    const fileInputRef = useRef(null);

    useEffect(() => {
        cargarDatos();
    }, []);

    const cargarDatos = async () => {
        try {
            const [resRec, resMat] = await Promise.all([
                axios.get('http://localhost:8080/api/recursos/listar'),
                axios.get('http://localhost:8080/api/materias/listar')
            ]);
            setRecursos(resRec.data);
            setMaterias(resMat.data);
        } catch (error) {
            console.error("Error al cargar datos", error);
        }
    };

    const subirArchivo = async () => {
        if (!archivo || !nombre || !idMateria) {
            alert("Por favor completa todos los campos y selecciona un archivo.");
            return;
        }

        setCargando(true);
        const formData = new FormData();
        formData.append('archivo', archivo);
        formData.append('nombre', nombre);
        formData.append('idMateria', idMateria);

        try {
            await axios.post('http://localhost:8080/api/recursos/subir', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
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

    const eliminarRecurso = async (id) => {
        if (!window.confirm("¿Estás seguro de eliminar este recurso?")) return;

        try {
            await axios.delete(`http://localhost:8080/api/recursos/eliminar/${id}`);
            cargarDatos(); // Recargar la tabla tras eliminar
            alert("Recurso eliminado correctamente");
        } catch (error) {
            console.error("Error al eliminar", error);
            alert("No se pudo eliminar el recurso");
        }
    };

    return (
        <div className={styles.adminContainer}>
            <h2>Gestión de Recursos</h2>

            <section className={styles.adminCard}>
                <input
                    placeholder="Nombre del recurso"
                    value={nombre}
                    onChange={e => setNombre(e.target.value)}
                />

                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={e => setArchivo(e.target.files[0])}
                />

                <select value={idMateria} onChange={e => setIdMateria(e.target.value)}>
                    <option value="">Seleccione Materia</option>
                    {materias.map(m => <option key={m.id} value={m.id}>{m.nombre}</option>)}
                </select>

                <button onClick={subirArchivo} disabled={cargando}>
                    {cargando ? "Subiendo..." : "Subir Recurso"}
                </button>
            </section>

            <table className={styles.userTable}>
                <thead>
                    <tr><th>Nombre</th><th>Archivo</th><th>Materia</th><th>Acciones</th></tr>
                </thead>
                <tbody>
                    {recursos.map(r => (
                        <tr key={r.id}>
                            <td>{r.nombreRecurso}</td>
                            <td>
                                <a
                                    href={`http://localhost:8080${r.urlArchivoPdf}`}
                                    download={r.nombreRecurso || "recurso"} // El atributo 'download' fuerza la descarga
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Descargar
                                </a>
                            </td>
                            <td>{r.materia?.nombre || 'N/A'}</td>
                            <td>
                                <button
                                    onClick={() => eliminarRecurso(r.id)}
                                    className={styles.btnEliminar} // Asegúrate de tener estilos para esto
                                >
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}