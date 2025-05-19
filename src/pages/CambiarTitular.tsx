"use client";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import "../styles/cambiar-titular.css"

export default function CambioTitularidad() {
  const navigate = useNavigate();

  return (
    <div className="contenedor-principal">
      <div className="card">
        <div className="venta-card-header">
          <div className="venta-header-left">
            <button onClick={() => navigate(-1)} className="back-button">
              <FontAwesomeIcon icon={faArrowLeft} className="icon-back" />
            </button>
            <div>
              <h2>Cambio de Titularidad</h2>
            </div>
          </div>
          <div className="header-right">
            <p>
              <span>Fecha: 25/10/2023</span>
              <span className="separator">|</span>
              <span>Asesor: Benito</span>
            </p>
          </div>
        </div>

        <div className="form-section">
          <h3 className="section-title">Datos del Antiguo Cliente</h3>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="dni-antiguo">DNI</label>
              <input id="dni-antiguo" defaultValue="76961302" className="form-input" />
            </div>
            <div className="form-group">
              <label htmlFor="nombres-antiguo">Nombres</label>
              <input id="nombres-antiguo" defaultValue="Billy Emmanuel" className="form-input" />
            </div>
            <div className="form-group">
              <label htmlFor="apellidos-antiguo">Apellidos</label>
              <input id="apellidos-antiguo" defaultValue="Reaño Davila" className="form-input" />
            </div>
            <div className="form-group">
              <label htmlFor="modalidad-antiguo">Modalidad Actual</label>
              <input id="modalidad-antiguo" defaultValue="Techo Propio 2025" className="form-input" />
            </div>
            <div className="form-group">
              <label htmlFor="carga-antiguo">Carga Familiar</label>
              <input id="carga-antiguo" defaultValue="Si" className="form-input" />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3 className="section-title">Datos del Nuevo Cliente</h3>
          <p className="subtitle">Verifica que los datos del cliente estén correctos</p>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="dni-nuevo">DNI</label>
              <input id="dni-nuevo" defaultValue="78695636" className="form-input" />
            </div>
            <div className="form-group">
              <label htmlFor="nombres-nuevo">Nombres</label>
              <input id="nombres-nuevo" defaultValue="Ruth" className="form-input" />
            </div>
            <div className="form-group">
              <label htmlFor="apellidos-nuevo">Apellidos</label>
              <input id="apellidos-nuevo" defaultValue="Tucto Coronado" className="form-input" />
            </div>
            <div className="form-group">
              <label htmlFor="modalidad-nuevo">Modalidad Actual</label>
              <input id="modalidad-nuevo" defaultValue="Techo Propio 2025" className="form-input" />
            </div>
            <div className="form-group">
              <label htmlFor="carga-nuevo">Carga Familiar</label>
              <input id="carga-nuevo" defaultValue="Si" className="form-input" />
            </div>
            <div className="form-group motivo-group">
              <label htmlFor="motivo">Motivo de Refinanciamiento</label>
              <textarea id="motivo" rows={3} className="form-textarea" defaultValue="Cambio de Titularidad" />
            </div>
          </div>
        </div>

        <div className="button-container">
          <button className="btn-guardar">Guardar</button>
          <button className="btn-cancelar">Cancelar</button>
        </div>
      </div>
    </div>
  );
}

