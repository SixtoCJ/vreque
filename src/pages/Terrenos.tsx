"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus, faSearch, faMap, faPen, faTrash, faExclamation, faCheck } from "@fortawesome/free-solid-svg-icons"
import "../styles/terrenos.css"

interface Terreno {
  id: number
  proyecto: string
  etapa: number
  manzana: string
  area: number
  precio: number
  tipo: string
  estado: string
}

const Terrenos: React.FC = () => {
  // Estados para los modales
  const [modalNuevoTerreno, setModalNuevoTerreno] = useState(false)
  const [modalEditarTerreno, setModalEditarTerreno] = useState(false)
  const [modalConfirmarGuardarTerreno, setModalConfirmarGuardarTerreno] = useState(false)
  const [modalExitoTerreno, setModalExitoTerreno] = useState(false)
  const [modalConfirmarEditarTerreno, setModalConfirmarEditarTerreno] = useState(false)
  const [modalExitoEditarTerreno, setModalExitoEditarTerreno] = useState(false)
  const [modalConfirmarEliminarTerreno, setModalConfirmarEliminarTerreno] = useState(false)

  // Estado para el terreno seleccionado
  const [selectedTerrenoId, setSelectedTerrenoId] = useState<number | null>(null)

  // Estado para la búsqueda
  const [searchTerm, setSearchTerm] = useState("")
  const [filterOption, setFilterOption] = useState("")

  // Datos de ejemplo para la tabla
  const [terrenos, setTerrenos] = useState<Terreno[]>([
    {
      id: 1,
      proyecto: "VALLE REQUE",
      etapa: 1,
      manzana: "A",
      area: 120,
      precio: 12000.0,
      tipo: "CALLE",
      estado: "Disponible",
    },
    {
      id: 2,
      proyecto: "VALLE REQUE",
      etapa: 2,
      manzana: "B",
      area: 150,
      precio: 15000.0,
      tipo: "ESQUINA",
      estado: "Vendido",
    },
    {
      id: 3,
      proyecto: "VALLE REQUE",
      etapa: 3,
      manzana: "C",
      area: 100,
      precio: 10000.0,
      tipo: "AVENIDA",
      estado: "Reservado",
    },
    {
      id: 4,
      proyecto: "VALLE REQUE",
      etapa: 4,
      manzana: "D",
      area: 130,
      precio: 13000.0,
      tipo: "PARQUE",
      estado: "Disponible",
    },
    {
      id: 5,
      proyecto: "VALLE REQUE",
      etapa: 1,
      manzana: "E",
      area: 110,
      precio: 11000.0,
      tipo: "ESQUINA-PARQUE",
      estado: "Vendido",
    },
    {
      id: 6,
      proyecto: "VALLE REQUE",
      etapa: 2,
      manzana: "F",
      area: 140,
      precio: 14000.0,
      tipo: "AVENIDA",
      estado: "Reservado",
    },
  ])

  // Función para formatear el precio
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-ES", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(price)
  }

  // Función para obtener la clase CSS según el estatus
  const getStatusClass = (estado: string) => {
    switch (estado.toLowerCase()) {
      case "disponible":
        return "terreno-estado-disponible"
      case "vendido":
        return "terreno-estado-vendido"
      case "reservado":
        return "terreno-estado-reservado"
      default:
        return ""
    }
  }

  // Función para abrir el modal de edición
  const openEditModal = (id: number) => {
    setSelectedTerrenoId(id)
    setModalEditarTerreno(true)
  }

  // Función para abrir el modal de eliminación
  const openDeleteModal = (id: number) => {
    setSelectedTerrenoId(id)
    setModalConfirmarEliminarTerreno(true)
  }

  // Función para eliminar un terreno
  const deleteTerreno = () => {
    if (selectedTerrenoId) {
      setTerrenos(terrenos.filter((terreno) => terreno.id !== selectedTerrenoId))
      setModalConfirmarEliminarTerreno(false)
    }
  }

  // Función para filtrar terrenos
  const filteredTerrenos = terrenos.filter((terreno) => {
    const searchTermLower = searchTerm.toLowerCase()
    if (searchTerm === "") return true

    switch (filterOption) {
      case "Proyecto":
        return terreno.proyecto.toLowerCase().includes(searchTermLower)
      case "Etapa":
        return terreno.etapa.toString().includes(searchTermLower)
      case "Estado":
        return terreno.estado.toLowerCase().includes(searchTermLower)
      default:
        return (
          terreno.proyecto.toLowerCase().includes(searchTermLower) ||
          terreno.etapa.toString().includes(searchTermLower) ||
          terreno.manzana.toLowerCase().includes(searchTermLower) ||
          terreno.tipo.toLowerCase().includes(searchTermLower) ||
          terreno.estado.toLowerCase().includes(searchTermLower)
        )
    }
  })

  // Cerrar todos los modales
  const closeAllModals = () => {
    setModalNuevoTerreno(false)
    setModalEditarTerreno(false)
    setModalConfirmarGuardarTerreno(false)
    setModalExitoTerreno(false)
    setModalConfirmarEditarTerreno(false)
    setModalExitoEditarTerreno(false)
    setModalConfirmarEliminarTerreno(false)
  }

  // Efecto para cerrar modales con ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeAllModals()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [])

  // Efecto para cerrar el modal de éxito después de un tiempo
  useEffect(() => {
    if (modalExitoEditarTerreno) {
      const timer = setTimeout(() => {
        setModalExitoEditarTerreno(false)
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [modalExitoEditarTerreno])

  return (
    <div className="contenedor-terreno">
      <header>
        <div className="terreno-container">
          <h1
            style={{
              fontSize: "24px",
              color: "white",
            }}
          >
            Terrenos
          </h1>

          <button className="terreno-btn-primary" onClick={() => setModalNuevoTerreno(true)}>
            <FontAwesomeIcon icon={faPlus} /> Agregar
          </button>
        </div>
      </header>

      <div className="buscarterreno-container">
        <div className="buscarterreno-box">
          <input
            placeholder="Buscar por proyecto, etapa, manzana..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FontAwesomeIcon icon={faSearch} className="terreno-search-icon" />
        </div>

        <div className="filtrarterreno-box">
          <select value={filterOption} onChange={(e) => setFilterOption(e.target.value)}>
            <option value="">Filtrar por...</option>
            <option value="Proyecto">Proyecto</option>
            <option value="Etapa">Etapa</option>
            <option value="Estado">Estado</option>
          </select>
        </div>
      </div>

      <div className="terreno-table-container">
        <table className="terreno-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Proyecto</th>
              <th>Etapa</th>
              <th>Unidad</th>
              <th>Área</th>
              <th>Precio</th>
              <th>Tipo</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredTerrenos.map((terreno) => (
              <tr key={terreno.id}>
                <td>{terreno.id}</td>
                <td>{terreno.proyecto}</td>
                <td>{terreno.etapa}</td>
                <td>{terreno.manzana}</td>
                <td>{terreno.area} m²</td>
                <td>${formatPrice(terreno.precio)}</td>
                <td>{terreno.tipo}</td>
                <td>
                  <span className={`terreno-estado ${getStatusClass(terreno.estado)}`}>{terreno.estado}</span>
                </td>
                <td>
                  <div className="terreno-btn-action">
                    <button
                      className="terreno-btn-icon terreno-btn-edit"
                      title="Editar"
                      onClick={() => openEditModal(terreno.id)}
                    >
                      <FontAwesomeIcon icon={faPen} />
                    </button>
                    <button
                      className="terreno-btn-icon terreno-btn-delete"
                      title="Eliminar"
                      onClick={() => openDeleteModal(terreno.id)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal para Nuevo Terreno */}
      {modalNuevoTerreno && (
        <div className="terreno-modal">
          <div className="terreno-modal-content">
            <div className="terreno-modal-header">
              <div className="terreno-modal-title">
                <div className="terreno-icon-circle">
                  <FontAwesomeIcon icon={faMap} />
                </div>
                <div>
                  <h2>Nuevo Terreno</h2>
                  <p>
                    Bienvenido a la creación de terreno. No olvide que los campos deben estar en proyecto creado, si el
                    campo no existe debe crearlo en la sección de catálogos.
                  </p>
                </div>
              </div>
              <span className="terreno-close" onClick={() => setModalNuevoTerreno(false)}>
                &times;
              </span>
            </div>
            <div className="terreno-modal-body">
              <form id="form-nuevo-terreno">
                <div className="terreno-form-group">
                  <label>Selecciona el Proyecto*</label>
                  <select required>
                    <option value="">Seleccionar...</option>
                    <option value="VALLE VERDE">VALLE REQUE</option>
                  </select>
                </div>
                <div className="terreno-form-group">
                  <label>Selecciona la Etapa*</label>
                  <select required>
                    <option value="">Seleccionar...</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                  </select>
                </div>
                <div className="terreno-form-group">
                  <label>Selecciona la Manzana*</label>
                  <select required>
                    <option value="">Seleccionar...</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                  </select>
                </div>
                <div className="terreno-form-group">
                  <label>Tipo de terreno*</label>
                  <select required>
                    <option value="">Seleccionar...</option>
                    <option value="CALLE">CALLE</option>
                    <option value="AVENIDA">AVENIDA</option>
                    <option value="ESQUINA">ESQUINA</option>
                    <option value="PARQUE">PARQUE</option>
                    <option value="ESQUINA-PARQUE">ESQUINA-PARQUE</option>
                  </select>
                </div>
                <div className="terreno-form-group">
                  <label>Área m²*</label>
                  <input type="number" defaultValue="120" required />
                </div>
                <div className="terreno-form-group">
                  <label>Precio*</label>
                  <div className="terreno-price-input">
                    <span>$</span>
                    <input type="text" defaultValue="12,000.00" required />
                  </div>
                </div>
                <div className="terreno-form-group">
                  <label>Detalles</label>
                  <textarea defaultValue="Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the industry's standard dummy text ever since the 1500s." />
                </div>
              </form>
            </div>
            <div className="terreno-modal-footer">
              <button className="terreno-btn-secondary" onClick={() => setModalNuevoTerreno(false)}>
                Cancelar
              </button>
              <button
                className="terreno-btn-primary"
                onClick={() => {
                  setModalNuevoTerreno(false)
                  setModalConfirmarGuardarTerreno(true)
                }}
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal para Editar Terreno */}
      {modalEditarTerreno && (
        <div className="terreno-modal">
          <div className="terreno-modal-content">
            <div className="terreno-modal-header">
              <div className="terreno-modal-title">
                <div className="terreno-icon-circle">
                  <FontAwesomeIcon icon={faMap} />
                </div>
                <div>
                  <h2>Editar Terreno</h2>
                  <p>
                    Bienvenido a la edición de terreno. Solo puedes modificar los campos visibles. Si el campo contiene
                    un candado, no se puede modificar.
                  </p>
                </div>
              </div>
              <span className="terreno-close" onClick={() => setModalEditarTerreno(false)}>
                &times;
              </span>
            </div>
            <div className="terreno-modal-body">
              <form id="form-editar-terreno">
                <div className="terreno-form-group">
                  <label>Tipo de terreno*</label>
                  <select required>
                    <option value="">Seleccionar...</option>
                    <option value="CALLE">CALLE</option>
                    <option value="AVENIDA">AVENIDA</option>
                    <option value="ESQUINA">ESQUINA</option>
                    <option value="PARQUE">PARQUE</option>
                    <option value="ESQUINA-PARQUE">ESQUINA-PARQUE</option>
                  </select>
                </div>
                <div className="terreno-form-group">
                  <label>Área m²*</label>
                  <input type="number" defaultValue="80" required />
                </div>
                <div className="terreno-form-group">
                  <label>Precio*</label>
                  <div className="terreno-price-input">
                    <span>$</span>
                    <input type="text" defaultValue="10,000.00" required />
                  </div>
                </div>
                <div className="terreno-form-group">
                  <label>Estado*</label>
                  <select required>
                    <option value="">Seleccionar...</option>
                    <option value="Disponible" selected>
                      Disponible
                    </option>
                    <option value="Vendido">Vendido</option>
                    <option value="Reservado">Reservado</option>
                  </select>
                </div>
                <div className="terreno-form-group">
                  <label>Detalles</label>
                  <textarea defaultValue="Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the industry's standard dummy text ever since the 1500s." />
                </div>
              </form>
            </div>
            <div className="terreno-modal-footer">
              <button className="terreno-btn-secondary" onClick={() => setModalEditarTerreno(false)}>
                Cancelar
              </button>
              <button
                className="terreno-btn-primary"
                onClick={() => {
                  setModalEditarTerreno(false)
                  setModalConfirmarEditarTerreno(true)
                }}
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Confirmación para Guardar */}
      {modalConfirmarGuardarTerreno && (
        <div className="terreno-modal">
          <div className="terreno-modal-content terreno-modal-small">
            <div className="terreno-modal-header">
              <div className="terreno-modal-title">
                <div className="terreno-icon-circle terreno-icon-warning">
                  <FontAwesomeIcon icon={faExclamation} />
                </div>
                <div>
                  <h2>¿Desea guardar el nuevo Terreno?</h2>
                  <p>
                    Recuerde que al guardar un nuevo terreno, no podrá eliminarlo, solo podrá cambiar su estado a
                    "Inactivo".
                  </p>
                </div>
              </div>
              <span className="terreno-close" onClick={() => setModalConfirmarGuardarTerreno(false)}>
                &times;
              </span>
            </div>
            <div className="terreno-modal-footer">
              <button
                className="terreno-btn-secondary"
                onClick={() => {
                  setModalConfirmarGuardarTerreno(false)
                  setModalNuevoTerreno(true)
                }}
              >
                Atrás
              </button>
              <button
                className="terreno-btn-danger"
                onClick={() => {
                  setModalConfirmarGuardarTerreno(false)
                  setModalExitoTerreno(true)
                }}
              >
                Continuar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Éxito */}
      {modalExitoTerreno && (
        <div className="terreno-modal">
          <div className="terreno-modal-content terreno-modal-small">
            <div className="terreno-modal-header">
              <div className="terreno-modal-title">
                <div className="terreno-icon-circle terreno-icon-success">
                  <FontAwesomeIcon icon={faCheck} />
                </div>
                <div>
                  <h2>Se a creado un nuevo Terreno !!</h2>
                  <p>
                    Su Terreno fue creado con el siguiente código: su número Terreno, en el proyecto [Proyecto], en la
                    manzana [Manzana].
                  </p>
                </div>
              </div>
              <span className="terreno-close" onClick={() => setModalExitoTerreno(false)}>
                &times;
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Confirmación para Editar */}
      {modalConfirmarEditarTerreno && (
        <div className="terreno-modal">
          <div className="terreno-modal-content terreno-modal-small">
            <div className="terreno-modal-header">
              <div className="terreno-modal-title">
                <div className="terreno-icon-circle terreno-icon-warning">
                  <FontAwesomeIcon icon={faExclamation} />
                </div>
                <div>
                  <h2>¿Desea guardar los cambios en el terreno?</h2>
                </div>
              </div>
              <span className="terreno-close" onClick={() => setModalConfirmarEditarTerreno(false)}>
                &times;
              </span>
            </div>
            <div className="terreno-modal-footer">
              <button
                className="terreno-btn-secondary"
                onClick={() => {
                  setModalConfirmarEditarTerreno(false)
                  setModalEditarTerreno(true)
                }}
              >
                Atrás
              </button>
              <button
                className="terreno-btn-danger"
                onClick={() => {
                  setModalConfirmarEditarTerreno(false)
                  setModalExitoEditarTerreno(true)
                }}
              >
                Continuar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Éxito para Editar */}
      {modalExitoEditarTerreno && (
        <div className="terreno-modal">
          <div className="terreno-modal-content terreno-modal-small">
            <div className="terreno-modal-header">
              <div className="terreno-modal-title">
                <div className="terreno-icon-circle terreno-icon-success">
                  <FontAwesomeIcon icon={faCheck} />
                </div>
                <div>
                  <h2>Se a modificado correctamente el Terreno !!</h2>
                </div>
              </div>
              <span className="terreno-close" onClick={() => setModalExitoEditarTerreno(false)}>
                &times;
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Confirmación para Eliminar */}
      {modalConfirmarEliminarTerreno && (
        <div className="terreno-modal">
          <div className="terreno-modal-content terreno-modal-small">
            <div className="terreno-modal-header">
              <div className="terreno-modal-title">
                <div className="terreno-icon-circle terreno-icon-warning">
                  <FontAwesomeIcon icon={faExclamation} />
                </div>
                <div>
                  <h2>¿Desea eliminar este terreno?</h2>
                  <p>Esta acción no se puede deshacer. El terreno será eliminado permanentemente.</p>
                </div>
              </div>
              <span className="terreno-close" onClick={() => setModalConfirmarEliminarTerreno(false)}>
                &times;
              </span>
            </div>
            <div className="terreno-modal-footer">
              <button className="terreno-btn-danger" onClick={deleteTerreno}>
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Overlay para modales */}
      <div
        className="terreno-modal-overlay"
        style={{
          display:
            modalNuevoTerreno ||
            modalEditarTerreno ||
            modalConfirmarGuardarTerreno ||
            modalExitoTerreno ||
            modalConfirmarEditarTerreno ||
            modalExitoEditarTerreno ||
            modalConfirmarEliminarTerreno
              ? "block"
              : "none",
        }}
        onClick={closeAllModals}
      ></div>
    </div>
  )
}

export default Terrenos
