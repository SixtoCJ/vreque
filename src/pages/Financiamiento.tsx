import React, { useState } from "react";

type Financiamiento = {
  id: number;
  nombre: string;
  tipo: string;
  monto: string;
  interes: string;
  creacion: string;
  estado: "Activo" | "Inactivo";
  logo: string;
};

const financiamientosIniciales: Financiamiento[] = [
  {
    id: 1,
    nombre: "TECHO PROPIO 2025",
    tipo: "Estatal",
    monto: "S/ 25,000",
    interes: "0.0% Anual",
    creacion: "01/01/2023",
    estado: "Activo",
    logo: "/techo-propio.png",
  },
  {
    id: 2,
    nombre: "BONO POLICIAL",
    tipo: "Privado",
    monto: "S/ 25,000",
    interes: "3.5% Anual",
    creacion: "01/01/2023",
    estado: "Activo",
    logo: "/bono-policial.jfif",
  },
  {
    id: 3,
    nombre: "VALLE REQUE",
    tipo: "Privado",
    monto: "S/ 25,000",
    interes: "3.5% Anual",
    creacion: "01/01/2023",
    estado: "Activo",
    logo: "/valle-reque.jfif",
  },
];

const Financiamientos = () => {
  const [financiamientos, setFinanciamientos] =
    useState<Financiamiento[]>(financiamientosIniciales);

  const [detalleId, setDetalleId] = useState<number | null>(null);
  const [confirmId, setConfirmId] = useState<number | null>(null);

  const selectedDetalle = financiamientos.find((f) => f.id === detalleId);

  const toggleEstado = (id: number) => {
    setFinanciamientos((prev) =>
      prev.map((f) =>
        f.id === id
          ? { ...f, estado: f.estado === "Activo" ? "Inactivo" : "Activo" }
          : f
      )
    );
  };

  return (
    <div className="container">
      <header>
        <div>
          <h1>Financiamientos</h1>
          <p>Gestión de programas de financiamiento disponibles</p>
        </div>
        <div className="actions">
          <button className="btn btn-danger">
            <i className="fas fa-trash" /> Eliminar
          </button>
          <button className="btn btn-primary">
            <i className="fas fa-plus" /> Agregar
          </button>
        </div>
      </header>

      <div className="filters">
        <div className="search-box">
          <i className="fas fa-search" />
          <input type="text" placeholder="Buscar financiamiento..." />
        </div>
        <div className="filter-selects">
          <select>
            <option>Todos los tipos</option>
            <option>Estatal</option>
            <option>Privado</option>
          </select>
          <select>
            <option>Todos los estados</option>
            <option>Activo</option>
            <option>Inactivo</option>
          </select>
        </div>
      </div>

      <div className="cards">
        {financiamientos.map((fin) => (
          <div
            className="card"
            key={fin.id}
            data-id={fin.id}
            style={{ borderColor: fin.estado === "Activo" ? "green" : "red" }}
          >
            <div className="card-header">
              <input type="checkbox" className="card-checkbox" />
              <div className="card-logo">
                <img src={fin.logo} alt={fin.nombre} />
              </div>
            </div>
            <div className="card-body">
              <h2>{fin.nombre}</h2>
              <span className={`badge ${fin.estado.toLowerCase()}`}>
                {fin.estado}
              </span>

              <div className="card-info">
                <div>
                  <span className="label">Tipo:</span>
                  <span className="value">{fin.tipo}</span>
                </div>
                <div>
                  <span className="label">Monto:</span>
                  <span className="value">{fin.monto}</span>
                </div>
                <div>
                  <span className="label">Interés:</span>
                  <span
                    className={`value ${
                      fin.interes === "0.0% Anual" ? "highlight" : ""
                    }`}
                  >
                    {fin.interes}
                  </span>
                </div>
                <div>
                  <span className="label">Creación:</span>
                  <span className="value">{fin.creacion}</span>
                </div>
              </div>
            </div>
            <div className="card-footer">
              <button
                className="btn-outline btn-danger toggle-status"
                onClick={() => setConfirmId(fin.id)}
              >
                <i className="fas fa-power-off" />
                {fin.estado === "Activo" ? " Desactivar" : " Activar"}
              </button>
              <button
                className="btn-outline btn-info show-details"
                onClick={() => setDetalleId(fin.id)}
              >
                <i className="fas fa-info-circle" /> Detalles
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Detalles */}
      {selectedDetalle && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Detalles del Financiamiento</h2>
              <button className="close-modal" onClick={() => setDetalleId(null)}>
                &times;
              </button>
            </div>
            <div className="modal-body">
              <div className="modal-info">
                <div className="modal-logo">
                  <img
                    id="modalLogo"
                    src={selectedDetalle.logo}
                    alt={selectedDetalle.nombre}
                  />
                </div>
                <div>
                  <h3 id="modalTitle">{selectedDetalle.nombre}</h3>
                  <span
                    id="modalStatus"
                    className={`badge ${selectedDetalle.estado.toLowerCase()}`}
                  >
                    {selectedDetalle.estado}
                  </span>
                </div>
              </div>

              <div className="info-section">
                <h4>Información General</h4>
                <div className="info-grid">
                  <div>
                    <span className="label">Tipo:</span>
                    <span id="modalTipo" className="value">
                      {selectedDetalle.tipo}
                    </span>
                  </div>
                  <div>
                    <span className="label">Monto:</span>
                    <span id="modalMonto" className="value">
                      {selectedDetalle.monto}
                    </span>
                  </div>
                  <div>
                    <span className="label">Interés:</span>
                    <span id="modalInteres" className="value">
                      {selectedDetalle.interes}
                    </span>
                  </div>
                  <div>
                    <span className="label">Creación:</span>
                    <span id="modalCreacion" className="value">
                      {selectedDetalle.creacion}
                    </span>
                  </div>
                </div>
              </div>

              {/* Aquí podrías agregar requisitos y beneficiarios si tienes datos */}
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setDetalleId(null)}>
                Cerrar
              </button>
              <button className="btn btn-primary">Editar</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Confirmación */}
      {confirmId !== null && (
        <div className="modal">
          <div className="modal-content modal-sm">
            <div className="modal-header">
              <h2>Confirmar Acción</h2>
              <button className="close-modal" onClick={() => setConfirmId(null)}>
                &times;
              </button>
            </div>
            <div className="modal-body">
              <div className="confirm-message">
                <i className="fas fa-exclamation-triangle warning-icon" />
                <p id="confirmText">
                  ¿Está seguro que desea{" "}
                  {financiamientos.find((f) => f.id === confirmId)?.estado ===
                  "Activo"
                    ? "desactivar"
                    : "activar"}{" "}
                  este financiamiento?
                </p>
              </div>
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-secondary"
                onClick={() => setConfirmId(null)}
              >
                Cancelar
              </button>
              <button
                id="confirmAction"
                className="btn btn-danger"
                onClick={() => {
                  toggleEstado(confirmId);
                  setConfirmId(null);
                }}
              >
                {financiamientos.find((f) => f.id === confirmId)?.estado ===
                "Activo"
                  ? "Desactivar"
                  : "Activar"}
              </button>
            </div>
          </div>
        </div>
      )}

      <div id="overlay"></div>
    </div>
  );
};

export default Financiamientos;
