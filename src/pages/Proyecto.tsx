"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import {
  faBuilding,
  faSearch,
  faUpload,
  faPlusCircle,
  faMinusCircle,
  faInfoCircle,
  faEdit,
  faCheckCircle,
  faExclamationTriangle,
  faMapMarkerAlt,
  faTimes,
} from "@fortawesome/free-solid-svg-icons"
import "../styles/proyecto.css"

// Helper function to convert number to Roman numeral
function toRomanNumeral(num: number) {
  const romanNumerals: Record<number, string> = {
    1: "I",
    2: "II",
    3: "III",
    4: "IV",
    5: "V",
    6: "VI",
    7: "VII",
    8: "VIII",
    9: "IX",
    10: "X",
  }
  return romanNumerals[num] || num.toString()
}

// Types
interface Project {
  id: string
  name: string
  address: string
  stages: string[]
  lots: number
  investment: string
  amountCollected: string
  sales: number
  reservations: number
  returns: number
  mapImage: string
}

interface ManzanaRow {
  id: string
  manzana: string
  lots: string
}

// Sample data
const initialProjects: Project[] = [
  {
    id: "1",
    name: "VALLE REQUE",
    address: "Av. Panamericana #556",
    stages: ["I", "II", "III", "IV", "V"],
    lots: 300,
    investment: "S/ 155,842",
    amountCollected: "S/ 1,250,000",
    sales: 85,
    reservations: 12,
    returns: 3,
    mapImage: "/mapa.png",
  },
  {
    id: "2",
    name: "SAN ANTONIO",
    address: "Av. Panamericana #126",
    stages: ["I", "II", "III", "IV", "V"],
    lots: 250,
    investment: "S/ 155,842",
    amountCollected: "S/ 1,250,000",
    sales: 85,
    reservations: 12,
    returns: 3,
    mapImage: "/mapa.png",
  },
]

const Proyecto: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>(initialProjects)
  const [searchQuery, setSearchQuery] = useState("")

  // Modal states
  const [newProjectModalOpen, setNewProjectModalOpen] = useState(false)
  const [editProjectModalOpen, setEditProjectModalOpen] = useState(false)
  const [deleteConfirmModalOpen, setDeleteConfirmModalOpen] = useState(false)
  const [successModalOpen, setSuccessModalOpen] = useState(false)
  const [deleteSuccessModalOpen, setDeleteSuccessModalOpen] = useState(false)
  const [currentProjectId, setCurrentProjectId] = useState<string | null>(null)
  const [stageModalOpen, setStageModalOpen] = useState(false)

  // Stage management
  const [numStages, setNumStages] = useState(2)
  const [currentStage, setCurrentStage] = useState(0)
  const [manzanaRows, setManzanaRows] = useState<ManzanaRow[]>([{ id: "1", manzana: "A", lots: "" }])

  // Form data
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    investment: "",
    lots: "",
    stages: "2",
    price: "",
  })

  // Filter projects based on search query
  const filteredProjects = projects.filter((project) => project.name.toLowerCase().includes(searchQuery.toLowerCase()))

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData({ ...formData, [id]: value })
  }

  // Funciones para manejar modales
  const abrirModal = (modal: string) => {
    switch (modal) {
      case "nuevo":
        setNewProjectModalOpen(true)
        break
      case "editar":
        setEditProjectModalOpen(true)
        break
      case "eliminar":
        setDeleteConfirmModalOpen(true)
        break
      case "exito":
        setSuccessModalOpen(true)
        break
      case "exitoEliminar":
        setDeleteSuccessModalOpen(true)
        break
      case "etapa":
        setStageModalOpen(true)
        break
    }
    document.body.style.overflow = "hidden" // Prevenir scroll
  }

  const cerrarModal = (modal: string) => {
    switch (modal) {
      case "nuevo":
        setNewProjectModalOpen(false)
        break
      case "editar":
        setEditProjectModalOpen(false)
        break
      case "eliminar":
        setDeleteConfirmModalOpen(false)
        break
      case "exito":
        setSuccessModalOpen(false)
        break
      case "exitoEliminar":
        setDeleteSuccessModalOpen(false)
        break
      case "etapa":
        setStageModalOpen(false)
        break
      case "todos":
        setNewProjectModalOpen(false)
        setEditProjectModalOpen(false)
        setDeleteConfirmModalOpen(false)
        setSuccessModalOpen(false)
        setDeleteSuccessModalOpen(false)
        setStageModalOpen(false)
        break
    }
    document.body.style.overflow = "" // Restaurar scroll
  }

  // Handle new project submission
  const handleNewProjectNext = () => {
    setNumStages(Number.parseInt(formData.stages) || 2)
    cerrarModal("nuevo")
    setCurrentStage(1)
    setTimeout(() => {
      abrirModal("etapa")
    }, 100)
  }

  // Handle stage navigation
  const handlePreviousStage = () => {
    if (currentStage === 1) {
      cerrarModal("etapa")
      setTimeout(() => {
        abrirModal("nuevo")
      }, 100)
    } else {
      setCurrentStage(currentStage - 1)
    }
  }

  const handleNextStage = () => {
    if (currentStage < numStages) {
      setCurrentStage(currentStage + 1)
    } else {
      // Last stage completed
      cerrarModal("etapa")

      // Add new project to the list
      const newProject: Project = {
        id: Date.now().toString(),
        name: formData.name,
        address: formData.address,
        stages: Array.from({ length: numStages }, (_, i) => toRomanNumeral(i + 1)),
        lots: Number.parseInt(formData.lots) || 0,
        investment: formData.investment,
        amountCollected: "S/ 0",
        sales: 0,
        reservations: 0,
        returns: 0,
        mapImage: "/mapa.png",
      }

      setProjects([...projects, newProject])

      // Reset form
      setFormData({
        name: "",
        address: "",
        investment: "",
        lots: "",
        stages: "2",
        price: "",
      })

      // Mostrar modal de éxito
      setTimeout(() => {
        abrirModal("exito")
      }, 300)

      // Auto close success message after 3 seconds
      setTimeout(() => {
        cerrarModal("exito")
      }, 3000)
    }
  }

  // Handle manzana rows
  const addManzanaRow = () => {
    const lastRow = manzanaRows[manzanaRows.length - 1]
    const nextManzana = getNextManzana(lastRow.manzana)

    setManzanaRows([
      ...manzanaRows,
      {
        id: Date.now().toString(),
        manzana: nextManzana,
        lots: "",
      },
    ])
  }

  const removeManzanaRow = (id: string) => {
    if (manzanaRows.length > 1) {
      setManzanaRows(manzanaRows.filter((row) => row.id !== id))
    }
  }

  const updateManzanaRow = (id: string, field: keyof ManzanaRow, value: string) => {
    setManzanaRows(manzanaRows.map((row) => (row.id === id ? { ...row, [field]: value } : row)))
  }

  const getNextManzana = (current: string): string => {
    const manzanas = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"]
    const currentIndex = manzanas.indexOf(current)
    return manzanas[(currentIndex + 1) % manzanas.length]
  }

  const generateResumen = (): string => {
    return manzanaRows
      .map((row, index) => {
        const text = `Manzana: ${row.manzana} - N° de Lotes: ${row.lots || "0"}`
        if (index % 2 === 0 && index < manzanaRows.length - 1) {
          return text + " | "
        } else if (index < manzanaRows.length - 1) {
          return text + "\n"
        }
        return text
      })
      .join("")
  }

  // Handle edit project
  const handleEditProject = (id: string) => {
    const project = projects.find((p) => p.id === id)
    if (project) {
      setCurrentProjectId(id)
      setFormData({
        name: project.name,
        address: project.address,
        investment: project.investment,
        lots: project.lots.toString(),
        stages: project.stages.length.toString(),
        price: "",
      })
      abrirModal("editar")
    }
  }

  // Handle save edit
  const handleSaveEdit = () => {
    if (currentProjectId) {
      setProjects(
        projects.map((project) =>
          project.id === currentProjectId
            ? {
                ...project,
                name: formData.name,
                address: formData.address,
                investment: formData.investment,
              }
            : project,
        ),
      )

      cerrarModal("editar")

      // Mostrar modal de éxito
      setTimeout(() => {
        abrirModal("exito")
      }, 300)

      // Auto close success message after 3 seconds
      setTimeout(() => {
        cerrarModal("exito")
      }, 3000)
    }
  }

  // Handle delete project
  const handleDeleteProject = (id: string) => {
    setCurrentProjectId(id)
    abrirModal("eliminar")
  }

  // Confirm delete project
  const handleConfirmDelete = () => {
    if (currentProjectId) {
      setProjects(projects.filter((project) => project.id !== currentProjectId))
      cerrarModal("eliminar")

      // Mostrar modal de éxito
      setTimeout(() => {
        abrirModal("exitoEliminar")
      }, 300)

      // Auto close success message after 3 seconds
      setTimeout(() => {
        cerrarModal("exitoEliminar")
      }, 3000)
    }
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
      <main className="main-content">
        <div className="projects-header">
          <div className="header-icon">
            <FontAwesomeIcon icon={faBuilding} />
          </div>

          <h2>Proyectos</h2>
          <div className="search-container">
            <input
              
              placeholder="Buscar Proyecto"
              className="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <FontAwesomeIcon icon={faSearch} className="search-icon" />
          </div>

          <button className="btn-nuevo" onClick={() => abrirModal("nuevo")}>
            Nuevo
          </button>
        </div>

        <div className="projects-container">
          {filteredProjects.map((project) => (
            <div className="project-card" key={project.id}>
              <div className="project-title">{project.name}</div>
              <div className="project-content">
                <div className="project-details">
                  <h3>DETALLES</h3>
                  <div className="details-grid">
                    <div className="detail-row">
                      <div className="detail-label">Dirección</div>
                      <div className="detail-value">{project.address}</div>
                    </div>
                    <div className="detail-row">
                      <div className="detail-label">Etapas</div>
                      <div className="detail-value">{project.stages.join(" - ")}</div>
                    </div>
                    <div className="detail-row">
                      <div className="detail-label">N° lotes</div>
                      <div className="detail-value">{project.lots}</div>
                    </div>
                    <div className="detail-row">
                      <div className="detail-label">Nombre Proyecto</div>
                      <div className="detail-value">{project.name}</div>
                    </div>
                    <div className="detail-row">
                      <div className="detail-label">Inversión</div>
                      <div className="detail-value">{project.investment}</div>
                    </div>
                  </div>
                </div>

                <div className="project-indicators">
                  <h3>Indicadores</h3>
                  <div className="indicator-row">
                    <div className="indicator-label">Monto Recaudado:</div>
                    <div className="indicator-value">{project.amountCollected}</div>
                  </div>
                  <div className="indicator-row">
                    <div className="indicator-label">N° de Ventas:</div>
                    <div className="indicator-value">
                      <span>{project.sales}</span>
                    </div>
                  </div>
                  <div className="indicator-row">
                    <div className="indicator-label">N° de Reserva:</div>
                    <div className="indicator-value">
                      <span>{project.reservations}</span>
                    </div>
                  </div>
                  <div className="indicator-row">
                    <div className="indicator-label">N° de Devoluciones:</div>
                    <div className="indicator-value">
                      <span>{project.returns}</span>
                    </div>
                  </div>
                </div>

                <div className="project-map">
                  <img src={project.mapImage || "/mapa.png"} alt={`Mapa de ${project.name}`} />
                </div>
              </div>
              <div className="project-actions">
                <button className="btn-eliminar" onClick={() => handleDeleteProject(project.id)}>
                  ELIMINAR
                </button>
                <button className="btn-editar" onClick={() => handleEditProject(project.id)}>
                  EDITAR
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Modal Nuevo Proyecto */}
      {newProjectModalOpen && (
        <>
          <div className="modal activo">
            <div className="modal-contenido">
              <div className="modal-encabezado">
                <div className="modal-icono">
                  <FontAwesomeIcon icon={faPlusCircle} />
                </div>
                <h3>Nuevo Proyecto</h3>
                <button className="modal-cerrar" onClick={() => cerrarModal("nuevo")}>
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              </div>
              <div className="modal-subtitulo">
                Bienvenido administrador! Recuerda siempre revisar los datos que estás añadiendo...
              </div>
              <div className="modal-cuerpo">
                <form id="formNuevoProyecto" onSubmit={(e) => e.preventDefault()}>
                  <div className="form-grupo">
                    <label htmlFor="name">Nombre del proyecto*</label>
                    <input
                      
                      id="name"
                      placeholder="San Fernando - Chiclayo"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-grupo">
                    <label htmlFor="address">Dirección*</label>
                    <input
                      
                      id="address"
                      placeholder="Av. Ramón Castilla 12345"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-grupo">
                    <label htmlFor="investment">Inversión*</label>
                    <input
                      
                      id="investment"
                      placeholder="S/ 1288890.00"
                      value={formData.investment}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-grupo">
                    <label htmlFor="lots">N° de Lotes*</label>
                    <input
                      type="number"
                      id="lots"
                      placeholder="300"
                      value={formData.lots}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-grupo">
                    <label htmlFor="stages">N° De Etapas*</label>
                    <input
                      type="number"
                      id="stages"
                      placeholder="2"
                      value={formData.stages}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-grupo">
                    <label htmlFor="price">Precio Terreno (c/u)*</label>
                    <input
                      
                      id="price"
                      placeholder="S/ 10000"
                      value={formData.price}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-grupo">
                    <label htmlFor="fotoReferencia">Foto de referencia*</label>
                    <div className="upload-container">
                      <div className="upload-button">
                        <FontAwesomeIcon icon={faUpload} />
                        <span className="upload-text">Click to upload</span>
                      </div>
                      <div className="upload-info">
                        Insertar imagen de Google Maps
                        <br />
                        (SVG, PNG, JPG o GIF max. 800x450px)
                      </div>
                    </div>
                    <div className="map-preview">
                      <img src="/mapa.png" alt="Mapa de referencia" />
                    </div>
                  </div>
                </form>
              </div>
              <div className="modal-pie">
                <button className="btn-cancelar" onClick={() => cerrarModal("nuevo")}>
                  Cancelar
                </button>
                <button className="btn-confirmar" onClick={handleNewProjectNext}>
                  Siguiente
                </button>
              </div>
            </div>
          </div>
          <div className="modal-overlay activo" onClick={() => cerrarModal("todos")}></div>
        </>
      )}

      {/* Modal Etapa */}
      {stageModalOpen && (
        <>
          <div className="modal activo">
            <div className="modal-contenido">
              <div className="modal-encabezado">
                <div className="modal-icono">
                  <FontAwesomeIcon icon={faMapMarkerAlt} />
                </div>
                <h3>
                  Bienvenido a la ETAPA <span className="etapa-num">{toRomanNumeral(currentStage)}</span>
                </h3>
                <button className="modal-cerrar" onClick={() => cerrarModal("etapa")}>
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              </div>
              <div className="modal-subtitulo">
                Es hora de configurar esta parte del proyecto. Recuerda que los terrenos por defecto el estado será{" "}
                <strong>Libre</strong> y el tipo de terreno <strong>Calle</strong>.
              </div>
              <div className="modal-cuerpo">
                <div className="alert alert-info">
                  <FontAwesomeIcon icon={faInfoCircle} />
                  <span>
                    El total de terrenos por etapas y manzanas debe coincidir con el número total de terrenos del
                    proyecto. Distribuyelos de forma equilibrada.
                  </span>
                </div>

                <form className="form-etapa" onSubmit={(e) => e.preventDefault()}>
                  <div className="manzanas-container">
                    {manzanaRows.map((row) => (
                      <div className="manzana-row" key={row.id}>
                        <div className="form-grupo">
                          <label>Manzana*</label>
                          <div className="select-container">
                            <select
                              value={row.manzana}
                              onChange={(e) => updateManzanaRow(row.id, "manzana", e.target.value)}
                            >
                              {["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"].map((letter) => (
                                <option key={letter} value={letter}>
                                  {letter}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div className="form-grupo">
                          <label>N° de lotes*</label>
                          <input
                            type="number"
                            placeholder="123"
                            value={row.lots}
                            onChange={(e) => updateManzanaRow(row.id, "lots", e.target.value)}
                          />
                        </div>
                        <div className="row-actions">
                          <button
                            type="button"
                            className="btn-icon btn-delete-row"
                            onClick={() => removeManzanaRow(row.id)}
                            disabled={manzanaRows.length <= 1}
                          >
                            <FontAwesomeIcon icon={faMinusCircle} />
                          </button>
                          <button type="button" className="btn-icon btn-add-row" onClick={addManzanaRow}>
                            <FontAwesomeIcon icon={faPlusCircle} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="form-grupo">
                    <label>Resumen*</label>
                    <textarea className="resumen-etapa" readOnly value={generateResumen()} />
                  </div>
                </form>
              </div>
              <div className="modal-pie">
                <button className="btn-cancelar" onClick={handlePreviousStage}>
                  Anterior
                </button>
                <button className="btn-confirmar" onClick={handleNextStage}>
                  {currentStage === numStages ? "Guardar" : "Siguiente"}
                </button>
              </div>
            </div>
          </div>
          <div className="modal-overlay activo" onClick={() => cerrarModal("todos")}></div>
        </>
      )}

      {/* Modal Éxito */}
      {successModalOpen && (
        <>
          <div className="modal activo">
            <div className="modal-contenido modal-sm">
              <div className="modal-encabezado success">
                <div className="modal-icono">
                  <FontAwesomeIcon icon={faCheckCircle} />
                </div>
                <h3>Proyecto guardado exitosamente !!</h3>
                <button className="modal-cerrar" onClick={() => cerrarModal("exito")}>
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              </div>
              <div className="modal-cuerpo text-center">
                <p>
                  Para poder editar las características específicas de los terrenos asignados, visitar la pestaña de{" "}
                  <strong>Terrenos</strong>.
                </p>
              </div>
            </div>
          </div>
          <div className="modal-overlay activo" onClick={() => cerrarModal("todos")}></div>
        </>
      )}

      {/* Modal Editar Proyecto */}
      {editProjectModalOpen && (
        <>
          <div className="modal activo">
            <div className="modal-contenido">
              <div className="modal-encabezado">
                <div className="modal-icono">
                  <FontAwesomeIcon icon={faEdit} />
                </div>
                <h3>Editar Detalles del Proyecto</h3>
                <button className="modal-cerrar" onClick={() => cerrarModal("editar")}>
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              </div>
              <div className="modal-subtitulo">
                Ojo si quieres editar o cambiar las propiedades de las <strong>Etapas</strong>,{" "}
                <strong>Manzanas</strong> y los <strong>Terrenos</strong>. Tiene que eliminar el proyecto y realizar uno
                nuevo.
              </div>
              <div className="modal-cuerpo">
                <form id="formEditarProyecto" onSubmit={(e) => e.preventDefault()}>
                  <div className="form-grupo">
                    <label htmlFor="name">Nombre Proyecto*</label>
                    <input  id="name" value={formData.name} onChange={handleInputChange} required />
                  </div>
                  <div className="form-grupo">
                    <label htmlFor="address">Dirección*</label>
                    <input  id="address" value={formData.address} onChange={handleInputChange} required />
                  </div>
                  <div className="form-grupo">
                    <label htmlFor="investment">Inversión*</label>
                    <input
                      
                      id="investment"
                      value={formData.investment}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-grupo">
                    <label htmlFor="editFotoReferencia">Foto de referencia*</label>
                    <div className="upload-container">
                      <div className="upload-button">
                        <FontAwesomeIcon icon={faUpload} />
                        <span className="upload-text">Click to upload</span>
                      </div>
                      <div className="upload-info">
                        Insertar imagen de Google Maps
                        <br />
                        (SVG, PNG, JPG o GIF max. 800x450px)
                      </div>
                    </div>
                    <div className="map-preview">
                      <img src="/mapa.png" alt="Mapa de referencia" />
                    </div>
                  </div>
                </form>
              </div>
              <div className="modal-pie">
                <button className="btn-cancelar" onClick={() => cerrarModal("editar")}>
                  Cancelar
                </button>
                <button className="btn-confirmar" onClick={handleSaveEdit}>
                  Guardar
                </button>
              </div>
            </div>
          </div>
          <div className="modal-overlay activo" onClick={() => cerrarModal("todos")}></div>
        </>
      )}

      {/* Modal Confirmar Eliminación */}
      {deleteConfirmModalOpen && (
        <>
          <div className="modal activo">
            <div className="modal-contenido modal-sm">
              <div className="modal-encabezado danger">
                
                <h3>Desea eliminar este Proyecto ?</h3>
                <button className="modal-cerrar" onClick={() => cerrarModal("eliminar")}>
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              </div>
              <div className="modal-cuerpo">
                <p>
                  Tenga en cuenta que al eliminar todo el proyecto, las etapas, manzanas y terrenos asociados a este.
                  También serán eliminados.
                </p>
              </div>
              <div className="modal-pie">
                <button className="cancelar-proyecto" onClick={() => cerrarModal("eliminar")}>
                  Cancelar
                </button>
                <button className="btn-danger" onClick={handleConfirmDelete}>
                  Eliminar
                </button>
              </div>
            </div>
          </div>
          <div className="modal-overlay activo" onClick={() => cerrarModal("todos")}></div>
        </>
      )}

      {/* Modal Eliminado con Éxito */}
      {deleteSuccessModalOpen && (
        <>
          <div className="modal activo">
            <div className="modal-contenido modal-sm">
              <div className="modal-encabezado eliminar">
                <div className="modal-icono">
                  <FontAwesomeIcon icon={faCheckCircle} />
                </div>
                <h3>Se ha eliminado el Proyecto !!!</h3>
                <button className="modal-cerrar" onClick={() => cerrarModal("exitoEliminar")}>
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              </div>
              <div className="modal-cuerpo text-center">
                <p>Puede verificar en la pestaña Terrenos.</p>
              </div>
            </div>
          </div>
          <div className="modal-overlay activo" onClick={() => cerrarModal("todos")}></div>
        </>
      )}
    </div>
  )
}

export default Proyecto
