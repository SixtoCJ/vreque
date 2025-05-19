import React, { useState, useRef, useEffect } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faPlus,
  faEdit,
  faKey,
  faTimes,
  faUserPlus,
  faCheckCircle,
  faEnvelope,
  faPhone,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons"
import "../styles/seguridad.css"

const Seguridad: React.FC = () => {
  // Estados para controlar la visibilidad de los modales
  const [modalAgregarActivo, setModalAgregarActivo] = useState(false)
  const [modalActualizarActivo, setModalActualizarActivo] = useState(false)
  const [modalPasswordActivo, setModalPasswordActivo] = useState(false)
  const [modalExitoActivo, setModalExitoActivo] = useState(false)

  // Estado para el modal de éxito
  const [exitoInfo, setExitoInfo] = useState({
    titulo: "",
    mensaje: "",
    mostrarCredenciales: false,
    usuario: "",
    password: "",
  })

  // Estados para controlar la visibilidad de las contraseñas
  const [passwordActualVisible, setPasswordActualVisible] = useState(false)
  const [passwordNuevaVisible, setPasswordNuevaVisible] = useState(false)
  const [passwordConfirmarVisible, setPasswordConfirmarVisible] = useState(false)

  // Referencias para los formularios
  const formAgregarRef = useRef<HTMLFormElement>(null)
  const formActualizarRef = useRef<HTMLFormElement>(null)
  const formPasswordRef = useRef<HTMLFormElement>(null)

  // Funciones para manejar modales
  const abrirModal = (modal: string) => {
    switch (modal) {
      case "agregar":
        setModalAgregarActivo(true)
        break
      case "actualizar":
        setModalActualizarActivo(true)
        break
      case "password":
        setModalPasswordActivo(true)
        break
      case "exito":
        setModalExitoActivo(true)
        break
    }
    document.body.style.overflow = "hidden" // Prevenir scroll
  }

  const cerrarModal = (modal: string) => {
    switch (modal) {
      case "agregar":
        setModalAgregarActivo(false)
        break
      case "actualizar":
        setModalActualizarActivo(false)
        break
      case "password":
        setModalPasswordActivo(false)
        break
      case "exito":
        setModalExitoActivo(false)
        break
      case "todos":
        setModalAgregarActivo(false)
        setModalActualizarActivo(false)
        setModalPasswordActivo(false)
        setModalExitoActivo(false)
        break
    }
    document.body.style.overflow = "" // Restaurar scroll
  }

  // Función para mostrar modal de éxito
  const mostrarExito = (titulo: string, mensaje: string, mostrarCredenciales = false) => {
    let usuario = ""
    let password = ""

    if (mostrarCredenciales) {
      // Generar credenciales aleatorias para demostración
      usuario = "r." + Math.random().toString(36).substring(2, 8)
      password = "Pass" + Math.floor(Math.random() * 10000) + "!"
    }

    setExitoInfo({
      titulo,
      mensaje,
      mostrarCredenciales,
      usuario,
      password,
    })

    cerrarModal("todos")
    setTimeout(() => {
      abrirModal("exito")
    }, 500)
  }

  // Manejar envío de formularios
  const handleSubmitAgregar = (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí iría la lógica para enviar datos al servidor
    cerrarModal("agregar")
    setTimeout(() => {
      mostrarExito(
        "Empleado Agregado Exitosamente",
        "El nuevo empleado ha sido registrado en el sistema. A continuación se muestran las credenciales generadas:",
        true,
      )
    }, 500)
  }

  const handleSubmitActualizar = (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí iría la lógica para actualizar datos
    cerrarModal("actualizar")
    setTimeout(() => {
      mostrarExito("Información Actualizada", "Los datos del empleado han sido actualizados correctamente.")
    }, 500)
  }

  const handleSubmitPassword = (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí iría la validación de contraseñas
    cerrarModal("password")
    setTimeout(() => {
      mostrarExito("Contraseña Actualizada", "La contraseña ha sido cambiada exitosamente.")
    }, 500)
  }

  // Cerrar modales con ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        cerrarModal("todos")
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => {
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [])

  return (
    <div className="contenedor-principal">
      {/* Cabecera con botón para agregar empleados */}
      <div className="cabecera-gestion">
        <h1>Gestión de Usuarios</h1>
        <button className="btn-agregar" onClick={() => abrirModal("agregar")}>
          <FontAwesomeIcon icon={faPlus} /> Agregar Empleado
        </button>
      </div>

      {/* Contenedor de información del usuario */}
      <div className="tarjeta-usuario">
        <div className="usuario-encabezado">
          <div className="usuario-avatar">
            <img src="perfil.png" alt="Foto" />
          </div>
          <div className="usuario-info-basica">
            <h2>Rosa Margarita Flores del Campo</h2>
            <p className="usuario-rol">Administrador</p>
            <div className="usuario-contacto">
              <span>
                <FontAwesomeIcon icon={faEnvelope} /> rosamargar1998@gmail.com
              </span>
              <span>
                <FontAwesomeIcon icon={faPhone} /> 978657452
              </span>
            </div>
          </div>
        </div>

        <div className="usuario-contenido">
          <div className="usuario-seccion">
            <h3>Información Personal</h3>
            <div className="info-grupo">
              <div className="info-item">
                <label>Nombre Completo</label>
                <p>Rosa Margarita Flores del Campo</p>
              </div>
              <div className="info-item">
                <label>Fecha de Nacimiento</label>
                <p>25 de Enero de 1998</p>
              </div>
              <div className="info-item">
                <label>Dirección</label>
                <p>Antenor Orrego #563</p>
              </div>
              <div className="info-item">
                <label>Correo Electrónico</label>
                <p>rosamargar1998@gmail.com</p>
              </div>
              <div className="info-item">
                <label>Teléfono</label>
                <p>978657452</p>
              </div>
            </div>
            <button className="btn-accion" onClick={() => abrirModal("actualizar")}>
              <FontAwesomeIcon icon={faEdit} /> Actualizar Información
            </button>
          </div>

          <div className="usuario-seccion">
            <h3>Seguridad de la Cuenta</h3>
            <div className="info-grupo">
              <div className="info-item">
                <label>Nombre de Usuario</label>
                <p>r.flores</p>
              </div>
              <div className="info-item">
                <label>Rol del Sistema</label>
                <p>Asesor</p>
              </div>
              <div className="info-item">
                <label>Última Actualización</label>
                <p>15 de Abril de 2023</p>
              </div>
              <div className="info-item">
                <label>Estado</label>
                <p className="estado-activo">Activo</p>
              </div>
            </div>
            <button className="btn-accion" onClick={() => abrirModal("password")}>
              <FontAwesomeIcon icon={faKey} /> Cambiar Contraseña
            </button>
          </div>
        </div>
      </div>

      {/* Modal para Agregar Empleado */}
      {modalAgregarActivo && (
        <>
          <div className="modal activo">
            <div className="modal-contenido">
              <div className="agregar-empleado">
                <div className="modal-icono">
                  <FontAwesomeIcon icon={faUserPlus} />
                </div>
                <h2>Agregar Nuevo Empleado</h2>
                <button className="modal-cerrar" onClick={() => cerrarModal("agregar")}>
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              </div>
              <div className="modal-cuerpo">
                <form ref={formAgregarRef} onSubmit={handleSubmitAgregar}>
                  <div className="form-grupo">
                    <label htmlFor="nombreEmpleado">Nombre*</label>
                    <input  id="nombreEmpleado" placeholder="Ingrese nombre" required />
                  </div>
                  <div className="form-grupo">
                    <label htmlFor="apellidoEmpleado">Apellidos*</label>
                    <input  id="apellidoEmpleado" placeholder="Ingrese apellidos" required />
                  </div>
                  <div className="form-fila">
                    <div className="form-grupo">
                      <label htmlFor="emailEmpleado">Correo Electrónico*</label>
                      <input type="email" id="emailEmpleado" placeholder="correo@ejemplo.com" required />
                    </div>
                    <div className="form-grupo">
                      <label htmlFor="telefonoEmpleado">Teléfono*</label>
                      <input type="tel" id="telefonoEmpleado" placeholder="978657452" required />
                    </div>
                  </div>
                  <div className="form-fila">
                    <div className="form-grupo">
                      <label htmlFor="fechaNacEmpleado">Fecha de Nacimiento*</label>
                      <input type="date" id="fechaNacEmpleado" required />
                    </div>
                    <div className="form-grupo">
                      <label htmlFor="rolEmpleado">Rol*</label>
                      <select id="rolEmpleado" required>
                        <option value="">Seleccione un rol</option>
                        <option value="administrador">Administrador</option>
                        <option value="asesor">Asesor</option>
                        <option value="usuario">Usuario</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-grupo">
                    <label htmlFor="direccionEmpleado">Dirección</label>
                    <input id="direccionEmpleado" placeholder="Ingrese dirección" />
                  </div>
                  <div className="modal-pie">
                    <button type="button" className="btn-cancelar" onClick={() => cerrarModal("agregar")}>
                      Cancelar
                    </button>
                    <button type="submit" className="btn-confirmar">
                      Confirmar
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="modal-overlay activo" onClick={() => cerrarModal("todos")}></div>
        </>
      )}

      {/* Modal para Actualizar Información */}
      {modalActualizarActivo && (
        <>
          <div className="modal activo">
            <div className="modal-contenido">
              <div className="encabezado-seguridad">
                <div className="modal-icono">
                  <FontAwesomeIcon icon={faEdit} />
                </div>
                <h2>Actualizar Información</h2>
                <button className="modal-cerrar" onClick={() => cerrarModal("actualizar")}>
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              </div>
              <div className="modal-cuerpo">
                <form ref={formActualizarRef} onSubmit={handleSubmitActualizar}>
                  <div className="form-fila">
                    <div className="form-grupo">
                      <label htmlFor="nombreActualizar">Nombre*</label>
                      <input  id="nombreActualizar" defaultValue="Rosa Margarita" required />
                    </div>
                    <div className="form-grupo">
                      <label htmlFor="apellidoActualizar">Apellidos*</label>
                      <input id="apellidoActualizar" defaultValue="Flores del Campo" required />
                    </div>
                  </div>
                  <div className="form-grupo">
                    <label htmlFor="emailActualizar">Correo Electrónico*</label>
                    <input
                      type="email"
                      id="emailActualizar"
                      defaultValue="rosamargar1998@gmail.com"
                      required
                    />
                  </div>
                  <div className="form-fila">
                    <div className="form-grupo">
                      <label htmlFor="fechaNacActualizar">Fecha de Nacimiento*</label>
                      <input type="date" id="fechaNacActualizar" defaultValue="1998-01-25" required />
                    </div>
                    <div className="form-grupo">
                      <label htmlFor="telefonoActualizar">Teléfono*</label>
                      <input type="tel" id="telefonoActualizar" defaultValue="978657452" required />
                    </div>
                  </div>
                  <div className="form-grupo">
                    <label htmlFor="direccionActualizar">Dirección</label>
                    <input
                      
                      id="direccionActualizar"
                      defaultValue="Antenor Orrego #563"
                    />
                  </div>
                  <div className="modal-pie">
                    <button
                      type="button"
                      className="btn-cancelar"
                      onClick={() => cerrarModal("actualizar")}
                    >
                      Cancelar
                    </button>
                    <button type="submit" className="btn-confirmar">
                      Guardar Cambios
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="modal-overlay activo" onClick={() => cerrarModal("todos")}></div>
        </>
      )}

      {/* Modal para Cambiar Contraseña */}
      {modalPasswordActivo && (
        <>
          <div className="modal activo">
            <div className="modal-contenido">
              <div className="seguridad-contraseña">
                <div className="modal-icono">
                  <FontAwesomeIcon icon={faKey} />
                </div>
                <h2>Cambiar Contraseña</h2>
                <button className="modal-cerrar" onClick={() => cerrarModal("password")}>
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              </div>
              <div className="modal-cuerpo">
                <form ref={formPasswordRef} onSubmit={handleSubmitPassword}>
                  <div className="form-grupo">
                    <label htmlFor="passwordActual">Contraseña Actual*</label>
                    <div className="input-password">
                      <input
                        type={passwordActualVisible ? "text" : "password"}
                        id="passwordActual"
                        required
                      />
                      <button
                        type="button"
                        className="toggle-password"
                        onClick={() => setPasswordActualVisible(!passwordActualVisible)}
                      >
                        <FontAwesomeIcon icon={passwordActualVisible ? faEyeSlash : faEye} />
                      </button>
                    </div>
                  </div>
                  <div className="form-grupo">
                    <label htmlFor="passwordNueva">Nueva Contraseña*</label>
                    <div className="input-password">
                      <input
                        type={passwordNuevaVisible ? "text" : "password"}
                        id="passwordNueva"
                        required
                      />
                      <button
                        type="button"
                        className="toggle-password"
                        onClick={() => setPasswordNuevaVisible(!passwordNuevaVisible)}
                      >
                        <FontAwesomeIcon icon={passwordNuevaVisible ? faEyeSlash : faEye} />
                      </button>
                    </div>
                  </div>
                  <div className="form-grupo">
                    <label htmlFor="passwordConfirmar">Confirmar Contraseña*</label>
                    <div className="input-password">
                      <input
                        type={passwordConfirmarVisible ? "text" : "password"}
                        id="passwordConfirmar"
                        required
                      />
                      <button
                        type="button"
                        className="toggle-password"
                        onClick={() => setPasswordConfirmarVisible(!passwordConfirmarVisible)}
                      >
                        <FontAwesomeIcon icon={passwordConfirmarVisible ? faEyeSlash : faEye} />
                      </button>
                    </div>
                  </div>
                  <div className="requisitos-password">
                    <p>La contraseña debe cumplir con los siguientes requisitos:</p>
                    <ul>
                      <li>Mínimo 8 caracteres</li>
                      <li>Al menos una letra mayúscula</li>
                      <li>Al menos un número</li>
                      <li>Al menos un carácter especial</li>
                    </ul>
                  </div>
                  <div className="modal-pie">
                    <button
                      type="button"
                      className="btn-cancelar"
                      onClick={() => cerrarModal("password")}
                    >
                      Cancelar
                    </button>
                    <button type="submit" className="btn-confirmar">
                      Cambiar Contraseña
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="modal-overlay activo" onClick={() => cerrarModal("todos")}></div>
        </>
      )}

      {/* Modal de Éxito */}
      {modalExitoActivo && (
        <>
          <div className="modal activo">
            <div className="modal-exito modal-exito">
              <div className="seguridad-contraseña">
                <div className="icono-exito">
                  <FontAwesomeIcon icon={faCheckCircle} size="3x" />

                </div>
                <h2 style={{ textAlign: 'center' }}>{exitoInfo.titulo}</h2>

                <button className="modal-cerrar" onClick={() => cerrarModal("exito")}>
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              </div>
              <div className="modal-cuerpo">
                <p>{exitoInfo.mensaje}</p>
                {exitoInfo.mostrarCredenciales && (
                  <div className="credenciales">
                    <p>
                      <strong>Usuario:</strong> <span>{exitoInfo.usuario}</span>
                    </p>
                    <p>
                      <strong>Contraseña:</strong> <span>{exitoInfo.password}</span>
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="modal-overlay activo" onClick={() => cerrarModal("todos")}></div>
        </>
      )}
    </div>
  )
}

export default Seguridad
