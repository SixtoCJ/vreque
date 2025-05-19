"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faArrowLeft,
  faExclamationTriangle,
  faFilePdf
} from "@fortawesome/free-solid-svg-icons"
import "../styles/cancelar.css"

export default function CancelarVentas() {
    const navigate = useNavigate();

  // Fecha actual para mostrar en el encabezado
  const fechaActual = new Date().toLocaleDateString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })

  return (
    <div className="contenedor-principal">
      <div className="venta-card">
        <div className="venta-card-header">
          <div className="venta-header-left">
            <button onClick={() => navigate(-1)} className="back-button">
                <FontAwesomeIcon icon={faArrowLeft} className="icon-back" />
            </button>
            <div>
              <h2>Datos del Cliente</h2>
              <p className="venta-subtitle">Verifica que los datos del cliente estén correctos</p>
            </div>
          </div>
          <div className="venta-header-right">
            <p>
              <span>Fecha: {fechaActual}</span> 
              <span className="venta-separator">|</span> 
              <span>Asesor: Benito</span>
            </p>
          </div>
        </div>

        <div className="form-section">
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="dni">DNI</label>
              <input id="dni" value="76961302" className="form-input" readOnly />
            </div>
            <div className="form-group">
              <label htmlFor="nombres">Nombres</label>
              <input id="nombres" value="Billy Marik" className="form-input" readOnly />
            </div>
            <div className="form-group">
              <label htmlFor="apellidos">Apellidos</label>
              <input id="apellidos" value="Reaño Davila" className="form-input" readOnly />
            </div>
            <div className="form-group">
              <label htmlFor="modalidad">Modalidad Actual</label>
              <input id="modalidad" value="Techo Propio 2025" className="form-input" readOnly />
            </div>
            <div className="form-group">
              <label htmlFor="carga">Carga Familiar</label>
              <input id="carga" value="Si" className="form-input" readOnly />
            </div>
            <div className="form-group motivo-group">
              <label htmlFor="motivo">Motivo de la Cancelación</label>
              <textarea id="motivo" rows={3} className="form-textarea"></textarea>
            </div>
          </div>
        </div>

        <div className="resumen-section">
          <div className="resumen-cancelacion">
            <h2>Resumen</h2>
            <p className="text-cancelacion">Debes comunicar al cliente toda la información que se detalla a continuación y verificar cuidadosamente cada dato.</p>
            <p className="warning">
              <FontAwesomeIcon icon={faExclamationTriangle} /> Recuerda: todo el proceso está sujeto a auditoría.
            </p>
          </div>

          <div className="info-cards-container">
            <div className="info-card">
              <h3>Datos del Terreno:</h3>
              {['Proyecto', 'Código de Unidad', 'Etapa', 'Precio', 'Tipo', 'Área'].map((label, i) => (
                <div className="info-item" key={i}>
                  <span className="info-label">{label}:</span>
                  <span className="info-value">*****</span>
                </div>
              ))}
            </div>

            <div className="info-card">
              <h3>Datos de la Venta:</h3>
              {['Código de venta', 'Valor Amortizado', 'Número de Cuotas Totales', 'Cuotas Pagadas', 'Saldo', 'Fecha de Fin', 'Tipo de Financiamiento'].map((label, i) => (
                <div className="info-item" key={i}>
                  <span className="info-label">{label}:</span>
                  <span className="info-value">*****</span>
                </div>
              ))}
            </div>
          </div>

          <div className="devolucion-grid">
            {['Penalización', 'Monto a Devolver', 'N de Cuotas a Devolver', 'Monto por Cuotas a Devolución', 'Fechas a Devolver'].map((label, i) => (
              <div className="form-group" key={i}>
                <label htmlFor={label.toLowerCase().replace(/ /g, '-')}>{label}</label>
                <input id={label.toLowerCase().replace(/ /g, '-')} className="form-input" />
              </div>
            ))}
          </div>
        </div>

        <div className="cancelacion-section">
          <div className="resumen-cancelacion">
            <h2>Detalles de la Cancelación</h2><br />
            <p >Es obligatorio brindar al cliente toda la información relacionada con la cancelación del proceso. Verifica que los datos sean correctos y confirma que el cliente comprenda cada punto antes de proceder.</p>
          </div>

          <div className="table-container">
            <table className="cancelacion-table">
              <thead>
                <tr>
                  {['Monto Amortizado', 'Penalización', 'Monto a Devolver', 'Número de Cuotas', 'Monto de Cuotas', 'Fechas a Devolver', 'Constancia'].map((th, i) => (
                    <th key={i}>{th}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  {[...Array(6)].map((_, i) => <td key={i}>*****</td>)}
                  <td className="constancia-cell">
                    <FontAwesomeIcon icon={faFilePdf} />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="button-container">
            <button className="btn-confirmar">Confirmar</button>
            <button className="btn-cancelar">Cancelar</button>
          </div>
        </div>
      </div>
    </div>
  )
}