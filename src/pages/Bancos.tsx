"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faUniversity,
  faPlus,
  faEdit,
  faToggleOn,
  faToggleOff,
  faTimes,
  faUpload,
} from "@fortawesome/free-solid-svg-icons"
import "../styles/bancos.css"

interface Banco {
  id: number
  nombre: string
  numeroCuenta: string
  titular: string
  estado: boolean
  logo: string
}

export default function Bancos() {
  // Estado para los bancos
  const [bancos, setBancos] = useState<Banco[]>([
    {
      id: 1,
      nombre: "BCP",
      numeroCuenta: "854348348343",
      titular: "GERARDO MANUEL FLORES GUERRERO",
      estado: true,
      logo: "/bcp.png",
    },
    {
      id: 2,
      nombre: "BBVA",
      numeroCuenta: "48384348384384",
      titular: "GERARDO MANUEL FLORES GUERRERO",
      estado: true,
      logo: "/bbva.webp",
    },
    {
      id: 3,
      nombre: "Interbank",
      numeroCuenta: "483483483483",
      titular: "GERARDO MANUEL FLORES GUERRERO",
      estado: false,
      logo: "/interbank.png",
    },
  ])

  // Estados para los modales
  const [modalAgregarBanco, setModalAgregarBanco] = useState(false)
  const [modalEditarBanco, setModalEditarBanco] = useState(false)

  // Referencias para los archivos de imagen
  const logoFileRef = useRef<HTMLInputElement>(null)
  const editLogoFileRef = useRef<HTMLInputElement>(null)

  // Estado para las imágenes de vista previa
  const [previewImage, setPreviewImage] = useState("placeholder-bank.png")
  const [editPreviewImage, setEditPreviewImage] = useState("placeholder-bank.png")

  // Estado para el banco que se está editando
  const [bancoEditando, setBancoEditando] = useState<Banco | null>(null)

  // Función para manejar la selección de archivo de logo
  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>, isEdit = false) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        if (isEdit) {
          setEditPreviewImage(result)
        } else {
          setPreviewImage(result)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  // Función para agregar un nuevo banco
  const handleAgregarBanco = (e: React.FormEvent) => {
    e.preventDefault()

    const form = e.target as HTMLFormElement
    const nombreBanco = (form.elements.namedItem("nombreBanco") as HTMLInputElement).value
    const numeroCuenta = (form.elements.namedItem("numeroCuenta") as HTMLInputElement).value
    const titular = (form.elements.namedItem("titular") as HTMLInputElement).value

    if (!nombreBanco || !numeroCuenta || !titular || previewImage === "placeholder-bank.png") {
      alert("Por favor complete todos los campos y suba un logo")
      return
    }

    const nuevoBanco: Banco = {
      id: bancos.length > 0 ? Math.max(...bancos.map((b) => b.id)) + 1 : 1,
      nombre: nombreBanco,
      numeroCuenta: numeroCuenta,
      titular: titular,
      estado: true,
      logo: previewImage,
    }

    setBancos([...bancos, nuevoBanco])
    setModalAgregarBanco(false)
    setPreviewImage("placeholder-bank.png")
    form.reset()
  }

  // Función para abrir el modal de edición
  const handleEditarBanco = (id: number) => {
    const banco = bancos.find((b) => b.id === id)
    if (banco) {
      setBancoEditando(banco)
      setEditPreviewImage(banco.logo)
      setModalEditarBanco(true)
    }
  }

  // Función para guardar los cambios al editar un banco
  const handleGuardarEdicion = (e: React.FormEvent) => {
    e.preventDefault()

    if (!bancoEditando) return

    const form = e.target as HTMLFormElement
    const nombreBanco = (form.elements.namedItem("editNombreBanco") as HTMLInputElement).value
    const numeroCuenta = (form.elements.namedItem("editNumeroCuenta") as HTMLInputElement).value
    const titular = (form.elements.namedItem("editTitular") as HTMLInputElement).value

    if (!nombreBanco || !numeroCuenta || !titular) {
      alert("Por favor complete todos los campos")
      return
    }

    const bancosActualizados = bancos.map((banco) => {
      if (banco.id === bancoEditando.id) {
        return {
          ...banco,
          nombre: nombreBanco,
          numeroCuenta: numeroCuenta,
          titular: titular,
          logo: editPreviewImage,
        }
      }
      return banco
    })

    setBancos(bancosActualizados)
    setModalEditarBanco(false)
    setBancoEditando(null)
  }

  // Función para cambiar el estado de un banco
  const toggleEstadoBanco = (id: number) => {
    const bancosActualizados = bancos.map((banco) => {
      if (banco.id === id) {
        return {
          ...banco,
          estado: !banco.estado,
        }
      }
      return banco
    })

    setBancos(bancosActualizados)
  }

  // Efecto para cerrar modales con ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setModalAgregarBanco(false)
        setModalEditarBanco(false)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [])

  return (
    <div className="banco-container">
      <header className="banco-header">
        <div className="banco-header-content">
          <div className="banco-header-icon">
            <FontAwesomeIcon icon={faUniversity} />
          </div>
          <h1>Bancos</h1>
        </div>
      </header>

      <main className="banco-content">
        <div className="banco-content-header">
          <h2>Lista de Bancos</h2>
          <button className="banco-btn banco-btn-primary" onClick={() => setModalAgregarBanco(true)}>
            <FontAwesomeIcon icon={faPlus} /> Agregar
          </button>
        </div>

        <div className="banco-table-container">
          <table className="banco-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Banco</th>
                <th>N° de Cuenta</th>
                <th>Titular</th>
                <th>Estado</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {bancos.map((banco, index) => (
                <tr key={banco.id}>
                  <td>{index + 1}</td>
                  <td className="banco-nombre">
                    <img src={banco.logo || "/placeholder.svg"} alt={banco.nombre} className="banco-logo" />
                    {banco.nombre}
                  </td>
                  <td>{banco.numeroCuenta}</td>
                  <td>{banco.titular}</td>
                  <td>
                    <span className={`banco-estado ${banco.estado ? "banco-activo" : "banco-inactivo"}`}>
                      {banco.estado ? "Activo" : "Inactivo"}
                    </span>
                  </td>
                  <td className="banco-acciones">
                    <button className="banco-btn-icon banco-btn-edit" onClick={() => handleEditarBanco(banco.id)}>
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button className="banco-btn-icon banco-btn-toggle" onClick={() => toggleEstadoBanco(banco.id)}>
                      <FontAwesomeIcon icon={banco.estado ? faToggleOn : faToggleOff} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      {/* Modal para agregar banco */}
      {modalAgregarBanco && (
        <div
          className="banco-modal banco-modal-agregar"
          onClick={(e) => {
            if ((e.target as HTMLElement).className === "banco-modal banco-modal-agregar") {
              setModalAgregarBanco(false)
            }
          }}
        >
          <div className="banco-modal-contenido">
            <div className="banco-modal-encabezado">
              <h2>Agregar un nuevo Banco</h2>
              <span className="banco-modal-cerrar" onClick={() => setModalAgregarBanco(false)}>
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </div>
            <div className="banco-modal-cuerpo">
              <form id="agregarBancoForm" onSubmit={handleAgregarBanco}>
                <div className="banco-form-grupo">
                  <label htmlFor="nombreBanco">
                    Banco<span className="banco-required">*</span>
                  </label>
                  <input type="text" id="nombreBanco" name="nombreBanco" required />
                </div>
                <div className="banco-form-grupo">
                  <label htmlFor="numeroCuenta">
                    N° de Cuenta<span className="banco-required">*</span>
                  </label>
                  <input type="text" id="numeroCuenta" name="numeroCuenta" required />
                </div>
                <div className="banco-form-grupo">
                  <label htmlFor="titular">
                    Titular<span className="banco-required">*</span>
                  </label>
                  <input type="text" id="titular" name="titular" required />
                </div>
                <div className="banco-form-grupo">
                  <label htmlFor="logoBanco">
                    Logo del Banco<span className="banco-required">*</span>
                  </label>
                  <div className="banco-logo-upload-container">
                    <div className="banco-logo-preview">
                      <img src={previewImage || "/placeholder.svg"} alt="LOGO" />
                    </div>
                    <div className="banco-logo-upload">
                      <label htmlFor="logoFile" className="banco-upload-label">
                        <FontAwesomeIcon icon={faUpload} /> Subir Logo
                      </label>
                      <input
                        type="file"
                        id="logoFile"
                        name="logoFile"
                        accept="image/*"
                        className="banco-file-input"
                        ref={logoFileRef}
                        onChange={(e) => handleLogoChange(e)}
                      />
                    </div>
                  </div>
                </div>
                <div className="banco-form-acciones">
                  <button
                    type="button"
                    className="banco-btn banco-btn-secondary"
                    onClick={() => setModalAgregarBanco(false)}
                  >
                    Cancelar
                  </button>
                  <button type="submit" className="banco-btn banco-btn-success">
                    Guardar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Modal para editar banco */}
      {modalEditarBanco && bancoEditando && (
        <div
          className="banco-modal banco-modal-editar"
          onClick={(e) => {
            if ((e.target as HTMLElement).className === "banco-modal banco-modal-editar") {
              setModalEditarBanco(false)
            }
          }}
        >
          <div className="banco-modal-contenido">
            <div className="banco-modal-encabezado">
              <h2>Editar los datos del Banco</h2>
              <span className="banco-modal-cerrar" onClick={() => setModalEditarBanco(false)}>
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </div>
            <div className="banco-modal-cuerpo">
              <form id="editarBancoForm" onSubmit={handleGuardarEdicion}>
                <input type="hidden" id="editId" value={bancoEditando.id} />
                <div className="banco-form-grupo">
                  <label htmlFor="editNombreBanco">
                    Banco<span className="banco-required">*</span>
                  </label>
                  <input
                    type="text"
                    id="editNombreBanco"
                    name="editNombreBanco"
                    defaultValue={bancoEditando.nombre}
                    required
                  />
                </div>
                <div className="banco-form-grupo">
                  <label htmlFor="editNumeroCuenta">
                    N° de Cuenta<span className="banco-required">*</span>
                  </label>
                  <input
                    type="text"
                    id="editNumeroCuenta"
                    name="editNumeroCuenta"
                    defaultValue={bancoEditando.numeroCuenta}
                    required
                  />
                </div>
                <div className="banco-form-grupo">
                  <label htmlFor="editTitular">
                    Titular<span className="banco-required">*</span>
                  </label>
                  <input
                    type="text"
                    id="editTitular"
                    name="editTitular"
                    defaultValue={bancoEditando.titular}
                    required
                  />
                </div>
                <div className="banco-form-grupo">
                  <label htmlFor="editLogoBanco">
                    Logo del Banco<span className="banco-required">*</span>
                  </label>
                  <div className="banco-logo-upload-container">
                    <div className="banco-logo-preview">
                      <img src={editPreviewImage || "/placeholder.svg"} alt="Vista previa del logo" />
                    </div>
                    <div className="banco-logo-upload">
                      <label htmlFor="editLogoFile" className="banco-upload-label">
                        <FontAwesomeIcon icon={faUpload} /> Cambiar Logo
                      </label>
                      <input
                        type="file"
                        id="editLogoFile"
                        name="editLogoFile"
                        accept="image/*"
                        className="banco-file-input"
                        ref={editLogoFileRef}
                        onChange={(e) => handleLogoChange(e, true)}
                      />
                    </div>
                  </div>
                </div>
                <div className="banco-form-acciones">
                  <button
                    type="button"
                    className="banco-btn banco-btn-secondary"
                    onClick={() => setModalEditarBanco(false)}
                  >
                    Cancelar
                  </button>
                  <button type="submit" className="banco-btn banco-btn-success">
                    Guardar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
