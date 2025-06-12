"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch, faEye, faPlus } from "@fortawesome/free-solid-svg-icons"
import "../styles/seguridad.css"

const Perfil = () => {
    // Simulación de datos: reemplaza esto con props o datos de una API
    const [empleado] = useState({
        nombre: "Gerardo",
        apellido: "Pérez",
        correo: "gerardo@correo.com",
        telefono: "987654321",
        fecha_nacimiento: "1990-05-15",
        direccion: "Av. Siempre Viva 123",
        dni: "12345678",
        usuario: "gerardo"
    })

    const [rol] = useState("Administrador")
    const [estado] = useState(1) // 1 = Activo, 0 = Inactivo

    return (
        <div className="contenedor-principal">
            {/* Contenedor de información del usuario */}
            <div className="tarjeta-usuario">
                <div className="usuario-encabezado">
                    <div className="usuario-avatar">
                        <img src="/img/perfil.png" alt="Foto de Usuario" />
                    </div>
                    <div className="usuario-info-basica">
                        <h2>{empleado.nombre} {empleado.apellido}</h2>
                        <p className="usuario-rol">{rol}</p>
                        <div className="usuario-contacto">
                            <span><i className="fas fa-envelope"></i> {empleado.correo}</span>
                            <span><i className="fas fa-phone"></i> {empleado.telefono}</span>
                        </div>
                    </div>
                </div>

                <div className="usuario-contenido">
                    <div className="usuario-seccion">
                        <h3>Información Personal</h3>
                        <div className="info-grupo">
                            <div className="info-item">
                                <label>Nombre Completo</label>
                                <p>{empleado.nombre} {empleado.apellido}</p>
                            </div>
                            <div className="info-item">
                                <label>Fecha de Nacimiento</label>
                                <p>{empleado.fecha_nacimiento}</p>
                            </div>
                            <div className="info-item">
                                <label>Dirección</label>
                                <p>{empleado.direccion}</p>
                            </div>
                            <div className="info-item">
                                <label>Correo Electrónico</label>
                                <p>{empleado.correo}</p>
                            </div>
                            <div className="info-item">
                                <label>Teléfono</label>
                                <p>{empleado.telefono}</p>
                            </div>
                            <div className="info-item">
                                <label>DNI</label>
                                <p>{empleado.dni}</p>
                            </div>
                        </div>
                    </div>

                    <div className="usuario-seccion">
                        <h3>Seguridad de la Cuenta</h3>
                        <div className="info-grupo">
                            <div className="info-item">
                                <label>Nombre de Usuario</label>
                                <p>{empleado.usuario}</p>
                            </div>
                            <div className="info-item">
                                <label>Rol del Sistema</label>
                                <p>{rol}</p>
                            </div>
                            <div className="info-item">
                                <label>Estado</label>
                                <p className={estado === 1 ? "estado-activo" : "estado-inactivo"}>
                                    {estado === 1 ? "Activo" : "Inactivo"}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Perfil
