"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "../styles/registro-venta.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch, faEye, faPlus } from "@fortawesome/free-solid-svg-icons"
import "../styles/listar-ventas.css"

const RegistroVentas = () => {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState("")

  // Estado para búsqueda y filtro
  const [busqueda, setBusqueda] = useState("")
  const [filtro, setFiltro] = useState("")

  const ventas = [
    {
      nombre: "BILLY EMMANUEL REAÑO DAVILA",
      dni: "48965245",
      codigo: "ccxx-12",
      terreno: "A-012",
      precio: "S/84000.00",
      financiado: "S/5000",
      amortizado: "S/2000.00",
      estado: "Cancelado",
      tipo: "Normal",
    },
    {
      nombre: "GUSTAVO CASTAÑEDA CUBAS",
      dni: "45963852",
      codigo: "ccxx-12",
      terreno: "A-012",
      precio: "S/84000.00",
      financiado: "S/5000",
      amortizado: "S/2000.00",
      estado: "Finalizado",
      tipo: "Traspaso",
    },
    {
      nombre: "SIXTO CUBAS JUAPE",
      dni: "56242357",
      codigo: "ccxx-12",
      terreno: "A-012",
      precio: "S/84000.00",
      financiado: "S/5000",
      amortizado: "S/2000.00",
      estado: "Cancelado",
      tipo: "Refinanciada",
    },
    {
      nombre: "GERARDO MANUEL FLORES GUERRERO",
      dni: "02985634",
      codigo: "ccxx-12",
      terreno: "A-012",
      precio: "S/84000.00",
      financiado: "S/5000",
      amortizado: "S/2000.00",
      estado: "Finalizado",
      tipo: "Normal",
    },
    {
      nombre: "GEORGE WILLY STEVEN SATISYAN MEJIA",
      dni: "89123675",
      codigo: "ccxx-12",
      terreno: "A-012",
      precio: "S/84000.00",
      financiado: "S/5000",
      amortizado: "S/2000.00",
      estado: "Cancelado",
      tipo: "Normal",
    },
  ]

  const ventasFiltradas = ventas.filter((venta) => {
    const terminoBusqueda = busqueda.toLowerCase()
    if (busqueda === "") return true

    switch (filtro) {
      case "estado":
        return venta.estado.toLowerCase().includes(terminoBusqueda)
      case "tipo":
        return venta.tipo.toLowerCase().includes(terminoBusqueda)
      case "dni":
        return venta.dni.includes(terminoBusqueda)
      default:
        return (
          venta.estado.toLowerCase().includes(terminoBusqueda) ||
          venta.tipo.toLowerCase().includes(terminoBusqueda) ||
          venta.dni.includes(terminoBusqueda)
        )
    }
  })

  return (
    <div className="contenedor-terrenos">
      <header className="header">
        <div className="header-content">
          <div className="header-icon">
            <i className="fa-solid fa-money-bill"></i>
          </div>
          <h1>Registros de Ventas</h1>
        </div>
      </header>

      {/* Barra de búsqueda y filtros */}
      <div className="barra-herramientas">
        <div className="busqueda-container">
          <input placeholder="Buscar cliente" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          <button className="btn-buscar">
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>
        <div className="filtro-container">
          <select value={filtro} onChange={(e) => setFiltro(e.target.value)}>
            <option value="">Filtrar por...</option>
            <option value="estado">Estado</option>
            <option value="tipo">Tipo</option>
            <option value="dni">DNI</option>
          </select>
        </div>
        <button className="btn-generate" onClick={() => navigate("/ventas")}>
          Generar <FontAwesomeIcon icon={faPlus} />
        </button>

      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th></th>
              <th className="sortable">
                Nombres y Apellidos <i className="fas fa-sort"></i>
              </th>
              <th>DNI</th>
              <th>Código</th>
              <th>Terreno</th>
              <th>Precio de Ventas</th>
              <th>Monto Financiado</th>
              <th>Monto Amortizado</th>
              <th>Estado</th>
              <th>Tipo</th>
              <th>Contrato</th>
            </tr>
          </thead>
          <tbody>
            {ventas
              .filter((venta) => venta.nombre.toLowerCase().includes(searchTerm.toLowerCase()))
              .map((venta, index) => (
                <tr key={index}>
                  <td>
                    <input type="checkbox" />
                  </td>
                  <td>{venta.nombre}</td>
                  <td>{venta.dni}</td>
                  <td>{venta.codigo}</td>
                  <td>{venta.terreno}</td>
                  <td>{venta.precio}</td>
                  <td>{venta.financiado}</td>
                  <td>{venta.amortizado}</td>
                  <td>
                    <span
                      className={`status ${venta.estado.toLowerCase() === "cancelado" ? "cancelled" : "finalized"}`}
                    >
                      {venta.estado}
                    </span>
                  </td>
                  <td>{venta.tipo}</td>
                  <button className="btn-detalles">
                    <FontAwesomeIcon icon={faEye} />
                  </button>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <br />
      <div className="action-buttons">
        <button className="btn-action" onClick={() => navigate("/listar/cambiar-titular")}>
        Cambiar Titularidad
        </button>
        <button className="btn-action" onClick={() => navigate("/listar/refinanciar")}>
          Refinanciar
        </button>
        <button className="btn-action" onClick={() => navigate("/listar/finalizar")}>
          Finalizar
        </button>
        <button className="btn-action" onClick={() => navigate("/listar/cancelar")}>
          Cancelar
        </button>
      </div>
      <br />
    </div>
  )
}

export default RegistroVentas
