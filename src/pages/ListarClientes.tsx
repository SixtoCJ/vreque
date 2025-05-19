"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faUserFriends,
  faSearch,
  faTrash,
  faEye,
  faTimes,
  faCheck,
  faCheckCircle,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons"
import "../styles/listar-clientes.css"

interface Cliente {
  id: number
  nombre: string
  dni: string
  direccion: string
  telefono: string
  ingreso: string
  estado: "activo" | "evaluado" | "finalizado" | "no-disponible" | "sin-evaluar"
}

const ListarClientes: React.FC = () => {
  // Estados para los modales
  const [modalCambiarEstado, setModalCambiarEstado] = useState(false)
  const [modalAgregarCliente, setModalAgregarCliente] = useState(false)
  const [modalExito, setModalExito] = useState(false)

  // Estado para mensajes de éxito
  const [exitoInfo, setExitoInfo] = useState({
    titulo: "",
    mensaje: "",
  })

  // Estado para clientes seleccionados y estado seleccionado
  const [clientesSeleccionados, setClientesSeleccionados] = useState<number[]>([])
  const [estadoSeleccionado, setEstadoSeleccionado] = useState<string | null>(null)

  // Estado para búsqueda y filtro
  const [busqueda, setBusqueda] = useState("")
  const [filtro, setFiltro] = useState("")

  // Datos de ejemplo para la tabla
  const [clientes, setClientes] = useState<Cliente[]>([
    {
      id: 1,
      nombre: "SIXTO JOSE CUBAS JUAPE",
      dni: "45434458",
      direccion: "Urb. Quispicoto Republicano Mz C lote 14",
      telefono: "999999999",
      ingreso: "S/5000",
      estado: "activo",
    },
    {
      id: 2,
      nombre: "BILLY EMMANUEL REANO DÁVILA",
      dni: "48965245",
      direccion: "Urb. Quispicoto Republicano Mz C lote 14",
      telefono: "999999999",
      ingreso: "S/5000",
      estado: "evaluado",
    },
    {
      id: 3,
      nombre: "GUSTAVO CASTAÑEDA CHARA",
      dni: "45653852",
      direccion: "Urb. Quispicoto Republicano Mz C lote 14",
      telefono: "999999999",
      ingreso: "S/5000",
      estado: "finalizado",
    },
    {
      id: 4,
      nombre: "EDGARDO RHYE DIAZ GUERRERO",
      dni: "56424357",
      direccion: "Urb. Quispicoto Republicano Mz C lote 14",
      telefono: "999999999",
      ingreso: "S/5000",
      estado: "no-disponible",
    },
    {
      id: 5,
      nombre: "GUSTAVO MANUEL FLORES GUERRERO",
      dni: "02986534",
      direccion: "Urb. Quispicoto Republicano Mz C lote 14",
      telefono: "999999999",
      ingreso: "S/5000",
      estado: "sin-evaluar",
    },
  ])

  // Función para mostrar modal de éxito
  const mostrarExito = (titulo: string, mensaje: string) => {
    setExitoInfo({
      titulo,
      mensaje,
    })
    setModalExito(true)
  }

  // Función para manejar la selección de clientes
  const handleSeleccionCliente = (id: number, checked: boolean) => {
    if (checked) {
      setClientesSeleccionados([...clientesSeleccionados, id])
    } else {
      setClientesSeleccionados(clientesSeleccionados.filter((clienteId) => clienteId !== id))
    }
  }

  // Función para manejar la selección de estado
  const handleSeleccionEstado = (estado: string) => {
    setEstadoSeleccionado(estado)
  }

  // Función para confirmar cambio de estado
  const confirmarCambioEstado = () => {
    if (!estadoSeleccionado) {
      alert("Por favor, seleccione un estado")
      return
    }

    // Aquí iría la lógica para cambiar el estado de los clientes seleccionados
    setModalCambiarEstado(false)
    setTimeout(() => {
      mostrarExito("Estado Actualizado", `Se ha actualizado el estado de ${clientesSeleccionados.length} cliente(s).`)
    }, 500)

    // Reiniciar selección
    setEstadoSeleccionado(null)
  }

  // Función para manejar el envío del formulario de agregar cliente
  const handleSubmitAgregarCliente = (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí iría la lógica para enviar datos al servidor
    setModalAgregarCliente(false)
    setTimeout(() => {
      mostrarExito("Cliente Agregado Exitosamente", "El nuevo cliente ha sido registrado en el sistema.")
    }, 500)
  }

  // Filtrar clientes según la búsqueda y el filtro
  const clientesFiltrados = clientes.filter((cliente) => {
    const terminoBusqueda = busqueda.toLowerCase()
    if (busqueda === "") return true

    switch (filtro) {
      case "estado":
        return cliente.estado.toLowerCase().includes(terminoBusqueda)
      case "ingreso":
        return cliente.ingreso.toLowerCase().includes(terminoBusqueda)
      case "dni":
        return cliente.dni.includes(terminoBusqueda)
      default:
        return (
          cliente.nombre.toLowerCase().includes(terminoBusqueda) ||
          cliente.dni.includes(terminoBusqueda) ||
          cliente.direccion.toLowerCase().includes(terminoBusqueda) ||
          cliente.telefono.includes(terminoBusqueda) ||
          cliente.ingreso.toLowerCase().includes(terminoBusqueda) ||
          cliente.estado.toLowerCase().includes(terminoBusqueda)
        )
    }
  })

  // Efecto para cerrar modales con ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setModalCambiarEstado(false)
        setModalAgregarCliente(false)
        setModalExito(false)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [])

  return (
    <div className="contenedor-terrenos">
      <div className="contenedor-principal">
        <header className="header">
          <div className="header-content">
            <div className="header-icon">
              <FontAwesomeIcon icon={faUserFriends} />
            </div>
            <h1>Clientes</h1>
          </div>
        </header>

        {/* Barra de búsqueda y filtros */}
        <div className="barra-herramientas">
          <div className="busqueda-container">
            <input
              
              placeholder="Buscar cliente"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
            <button className="btn-buscar">
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </div>
          <div className="filtro-container">
            <select value={filtro} onChange={(e) => setFiltro(e.target.value)}>
              <option value="">Filtrar por...</option>
              <option value="estado">Estado</option>
              <option value="ingreso">Ingreso Neto</option>
              <option value="dni">DNI</option>
            </select>
          </div>
        </div>

        {/* Tabla de clientes */}
        <div className="tabla-container">
          <table className="tabla-clientes">
            <thead>
              <tr>
                <th className="columna-checkbox"></th>
                <th>ID</th>
                <th className="columna-nombre">Nombres y Apellidos</th>
                <th>DNI</th>
                <th>Dirección</th>
                <th>Teléfono</th>
                <th>Ingreso Neto</th>
                <th>Estado</th>
                <th>Detalles</th>
              </tr>
            </thead>
            <tbody>
              {clientesFiltrados.map((cliente) => (
                <tr key={cliente.id}>
                  <td>
                    <input
                      type="checkbox"
                      className="checkbox-cliente"
                      checked={clientesSeleccionados.includes(cliente.id)}
                      onChange={(e) => handleSeleccionCliente(cliente.id, e.target.checked)}
                    />
                  </td>
                  <td>{cliente.id}</td>
                  <td>{cliente.nombre}</td>
                  <td>{cliente.dni}</td>
                  <td>{cliente.direccion}</td>
                  <td>{cliente.telefono}</td>
                  <td>{cliente.ingreso}</td>
                  <td>
                    <span className={`estado-badge ${cliente.estado}`}>{cliente.estado}</span>
                  </td>
                  <td>
                    <button className="btn-detalles">
                      <FontAwesomeIcon icon={faEye} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Botones de acción */}
        <div className="acciones-container">
          <button
            className="btn-cambiar-estado"
            onClick={() => setModalCambiarEstado(true)}
            disabled={clientesSeleccionados.length === 0}
            style={{ opacity: clientesSeleccionados.length === 0 ? 0.6 : 1 }}
          >
            Cambiar Estado
          </button>
          <button className="btn-agregar" onClick={() => setModalAgregarCliente(true)}>
            Agregar
          </button>
        </div>
      </div>

      {/* Modal para cambiar estado */}
      {modalCambiarEstado && (
        <div
          className="modalclientes"
          onClick={(e) => {
            if ((e.target as HTMLElement).className === "modal") {
              setModalCambiarEstado(false)
            }
          }}
        >
          <div className="modal-contenido modal-estado">
            <div className="encabezado-cambiarestado">
              <h2>Cambiar Estado</h2>
              <button className="modal-cerrar" onClick={() => setModalCambiarEstado(false)}>
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
            <div className="modal-cuerpo">
              <div className="opciones-estado">
                {["activo", "evaluado", "finalizado", "no-disponible", "sin-evaluar"].map((estado) => (
                  <div
                    key={estado}
                    className={`opcion-estado ${estadoSeleccionado === estado ? "seleccionado" : ""}`}
                    data-estado={estado}
                    onClick={() => handleSeleccionEstado(estado)}
                  >
                    <div className="check-circle">
                      <FontAwesomeIcon icon={faCheck} />
                    </div>
                    <div className={`estado-nombre ${estado}`}>{estado}</div>
                  </div>
                ))}
              </div>
              <div className="modal-pie">
                <button className="btn-confirmar-estado" onClick={confirmarCambioEstado}>
                  Confirmar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal para agregar cliente */}
      {modalAgregarCliente && (
        <div
          className="modalclientes"
          onClick={(e) => {
            if ((e.target as HTMLElement).className === "modal") {
              setModalAgregarCliente(false)
            }
          }}
        >
          <div className="modal-activo">
            <div className="modal-contenido">
              <div className="agregar-empleado">
                  <div className="modal-icono">
                    <FontAwesomeIcon icon={faUserPlus} />
                  </div>
                  <h2>Agregar Nuevo Cliente</h2>
                  <button className="modal-cerrar" onClick={() => setModalAgregarCliente(false)}>
                    <FontAwesomeIcon icon={faTimes} />
                  </button>
                </div>
                <div className="modal-cuerpo">
                  <form id="formAgregarCliente" onSubmit={handleSubmitAgregarCliente}>
                    <div className="form-fila">
                      <div className="form-grupo">
                        <label htmlFor="nombreCliente">Nombres*</label>
                        <input id="nombreCliente" placeholder="Ingrese nombres" required />
                      </div>
                      <div className="form-grupo">
                        <label htmlFor="apellidoCliente">Apellidos*</label>
                        <input id="apellidoCliente" placeholder="Ingrese apellidos" required />
                      </div>
                    </div>
                    <div className="form-fila">
                      <div className="form-grupo">
                        <label htmlFor="dniCliente">DNI*</label>
                        <input id="dniCliente" placeholder="Ingrese DNI" required />
                      </div>
                      <div className="form-grupo">
                        <label htmlFor="telefonoCliente">Teléfono*</label>
                        <input id="telefonoCliente" placeholder="999999999" required />
                      </div>
                    </div>
                    <div className="form-grupo">
                      <label htmlFor="direccionCliente">Dirección*</label>
                      <input id="direccionCliente" placeholder="Ingrese dirección" required />
                    </div>
                    <div className="form-grupo">
                      <label htmlFor="ingresoCliente">Ingreso Neto*</label>
                      <input id="ingresoCliente" placeholder="S/0000" required />
                    </div>
                    <div className="form-grupo">
                      <label htmlFor="estadoCliente">Estado Inicial*</label>
                      <select id="estadoCliente" required>
                        <option value="">Seleccione un estado</option>
                        <option value="activo">Activo</option>
                        <option value="evaluado">Evaluado</option>
                        <option value="finalizado">Finalizado</option>
                        <option value="no-disponible">No Disponible</option>
                        <option value="sin-evaluar">Sin Evaluar</option>
                      </select>
                    </div>
                    <div className="modal-pie">
                      <button type="button" className="btn-cancelar" onClick={() => setModalAgregarCliente(false)}>
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
        </div>
      )}

      {/* Modal de éxito */}
      {modalExito && (
        <div
          className="modal"
          onClick={(e) => {
            if ((e.target as HTMLElement).className === "modal") {
              setModalExito(false)
            }
          }}
        >
          <div className="modal-contenido modal-exito">
            <div className="modal-encabezado">
              <div className="icono-exito">
                <FontAwesomeIcon icon={faCheckCircle} />
              </div>
              <h2>{exitoInfo.titulo}</h2>
              <button className="modal-cerrar" onClick={() => setModalExito(false)}>
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
            <div className="modal-cuerpo">
              <p>{exitoInfo.mensaje}</p>
            </div>
          </div>
        </div>
      )}

      {/* Overlay para modales */}
      <div className={`modal-overlay ${modalCambiarEstado || modalAgregarCliente || modalExito ? "activo" : ""}`} />
    </div>
  )
}

export default ListarClientes
