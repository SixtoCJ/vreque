"use client"
import Bancos from "./Bancos"
import { useState, useEffect, useRef } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faArrowLeft,
  faCalendarAlt,
  faChevronLeft,
  faChevronRight,
  faTimes,
  faCheck,
  faExclamation,
  faFilePdf,
  faDownload,
  faUpload
} from "@fortawesome/free-solid-svg-icons"
import "../styles/ventas.css"

interface Cliente {
  dni: string
  nombres: string
  apellidos: string
  estado: string
  ingreso: string
  telefono: string
  ocupacion: string
  cargaFamiliar: string
}

interface Vivienda {
  proyecto: string
  codigoUnidad: string
  etapa: string
  area: string
  tipo: string
  precio: string
  disponible: string
}

interface Operacion {
  financiamiento: string
  montoBono: string
  interes: string
  cuotas: string
  montoCuota: string
  fechaPago: string
  inicial: string
}

export default function Ventas() {
  // Estados para los datos del cliente, vivienda y operación
  const [cliente, setCliente] = useState<Cliente>({
    dni: "72958707",
    nombres: "Sixto",
    apellidos: "-----",
    estado: "Evaluado",
    ingreso: "S/ 3500.00",
    telefono: "930805480",
    ocupacion: "....",
    cargaFamiliar: "Si"
  })

  const [vivienda, setVivienda] = useState<Vivienda>({
    proyecto: "VALLE-REQUE",
    codigoUnidad: "A-13",
    etapa: "IV",
    area: "60 m2",
    tipo: "CALLE/PARQUE",
    precio: "S/ 10000.00",
    disponible: "Si"
  })

  const [operacion, setOperacion] = useState<Operacion>({
    financiamiento: "Techo Propio 2025",
    montoBono: "S/ 500",
    interes: "2000",
    cuotas: "36",
    montoCuota: "",
    fechaPago: "07/XX",
    inicial: "S/ 3000.00"
  })

  // Referencias para los archivos de imagen
  const logoFileRef = useRef<HTMLInputElement>(null)
  const editLogoFileRef = useRef<HTMLInputElement>(null)




  // Función para manejar la selección de archivo de logo
  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>, isEdit = false) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
      }
      reader.readAsDataURL(file)
    }
  }


  // Estado para mostrar/ocultar secciones
  const [mostrarDetalles, setMostrarDetalles] = useState(false)

  // Estados para los modales
  const [modalAlerta, setModalAlerta] = useState(false)
  const [modalConfirmacion, setModalConfirmacion] = useState(false)
  const [modalPdfPreview, setModalPdfPreview] = useState(false)

  // Estados para el calendario
  const [mostrarCalendario, setMostrarCalendario] = useState(false)
  const [fechaSeleccionada, setFechaSeleccionada] = useState("07/XX")
  const [mesActual, setMesActual] = useState(new Date().getMonth())
  const [anioActual, setAnioActual] = useState(new Date().getFullYear())
  const [diaSeleccionado, setDiaSeleccionado] = useState(7)

  // Referencias para posicionamiento
  const calendarRef = useRef<HTMLDivElement>(null)
  const fechaPagoInputRef = useRef<HTMLInputElement>(null)

  // Nombres de los meses
  const nombresMeses = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ]

  // Función para generar el calendario
  const generarCalendario = () => {
    const primerDia = new Date(anioActual, mesActual, 1).getDay()
    const diasEnMes = new Date(anioActual, mesActual + 1, 0).getDate()
    
    let dias = []
    
    // Espacios en blanco para los días anteriores al primer día del mes
    for (let i = 0; i < primerDia; i++) {
      dias.push(<div key={`empty-${i}`} className="venta-dia venta-dia-deshabilitado"></div>)
    }
    
    // Días del mes
    for (let dia = 1; dia <= diasEnMes; dia++) {
      dias.push(
        <div 
          key={dia} 
          className={`venta-dia ${dia === diaSeleccionado && mesActual === new Date(fechaSeleccionada.split('/')[1] === 'XX' ? new Date().getMonth() : parseInt(fechaSeleccionada.split('/')[1]) - 1).getMonth() ? 'venta-dia-seleccionado' : ''}`}
          onClick={() => seleccionarFecha(dia)}
        >
          {dia}
        </div>
      )
    }
    
    return dias
  }

  // Función para seleccionar una fecha
  const seleccionarFecha = (dia: number) => {
    setDiaSeleccionado(dia)
    const diaFormateado = dia.toString().padStart(2, '0')
    const mesFormateado = (mesActual + 1).toString().padStart(2, '0')
    setFechaSeleccionada(`${diaFormateado}/${mesFormateado}`)
    setOperacion({...operacion, fechaPago: `${diaFormateado}/${mesFormateado}`})
    setMostrarCalendario(false)
  }

  // Función para cambiar de mes
  const cambiarMes = (incremento: number) => {
    let nuevoMes = mesActual + incremento
    let nuevoAnio = anioActual
    
    if (nuevoMes > 11) {
      nuevoMes = 0
      nuevoAnio++
    } else if (nuevoMes < 0) {
      nuevoMes = 11
      nuevoAnio--
    }
    
    setMesActual(nuevoMes)
    setAnioActual(nuevoAnio)
  }

  // Función para posicionar el calendario
  const posicionarCalendario = () => {
    if (fechaPagoInputRef.current && calendarRef.current) {
      const inputRect = fechaPagoInputRef.current.getBoundingClientRect()
      const calendarHeight = 350 // Altura aproximada del calendario
      
      calendarRef.current.style.left = `${inputRect.left}px`
      
      if (inputRect.top > calendarHeight) {
        calendarRef.current.style.top = `${inputRect.top - calendarHeight}px`
      } else {
        calendarRef.current.style.top = `${inputRect.bottom + 5}px`
      }
    }
  }

  // Función para mostrar el calendario
  const toggleCalendario = () => {
    if (!mostrarCalendario) {
      posicionarCalendario()
    }
    setMostrarCalendario(!mostrarCalendario)
  }

  // Función para continuar y mostrar detalles
  const continuarVenta = () => {
    setMostrarDetalles(true)
    setTimeout(() => {
      const detallesSection = document.getElementById('venta-detalles-section')
      if (detallesSection) {
        detallesSection.scrollIntoView({ behavior: 'smooth' })
      }
    }, 100)
  }

  // Función para confirmar la venta
  const confirmarVenta = () => {
    setModalAlerta(true)
  }

  // Función para mostrar confirmación
  const mostrarConfirmacion = () => {
    setModalAlerta(false)
    setModalConfirmacion(true)
    setTimeout(() => {
      setModalConfirmacion(false)
    }, 3000)
  }

  // Función para formatear moneda
  const formatearMoneda = (valor: string): string => {
    const numero = parseFloat(valor.replace(/[^\d.]/g, ''))
    if (isNaN(numero)) return ''
    return `S/ ${numero.toFixed(2)}`
  }

  // Función para formatear porcentaje
  const formatearPorcentaje = (valor: string): string => {
    const numero = valor.replace(/[^\d.]/g, '')
    if (!numero) return ''
    return `${numero}%`
  }

  // Efecto para cerrar el calendario al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        calendarRef.current && 
        !calendarRef.current.contains(event.target as Node) &&
        fechaPagoInputRef.current && 
        !fechaPagoInputRef.current.contains(event.target as Node)
      ) {
        setMostrarCalendario(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

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

        {/* Sección de datos del cliente */}
        <div className="venta-form-section">
          <div className="venta-form-grid">
            <div className="venta-form-group">
              <label htmlFor="venta-dni">DNI</label>
              <input 
                
                id="venta-dni" 
                className="venta-form-input" 
                value={cliente.dni}
                onChange={(e) => setCliente({...cliente, dni: e.target.value})}
              />
            </div>
            <div className="venta-form-group">
              <label htmlFor="venta-nombres">Nombres</label>
              <input 
                
                id="venta-nombres" 
                className="venta-form-input" 
                value={cliente.nombres}
                onChange={(e) => setCliente({...cliente, nombres: e.target.value})}
              />
            </div>
            <div className="venta-form-group">
              <label htmlFor="venta-apellidos">Apellidos</label>
              <input 
                
                id="venta-apellidos" 
                className="venta-form-input" 
                value={cliente.apellidos}
                onChange={(e) => setCliente({...cliente, apellidos: e.target.value})}
              />
            </div>
            <div className="venta-form-group">
              <label htmlFor="venta-estado">Estado del Cliente</label>
              <input 
                
                id="venta-estado" 
                className="venta-form-input" 
                value={cliente.estado}
                onChange={(e) => setCliente({...cliente, estado: e.target.value})}
              />
            </div>
            <div className="venta-form-group">
              <label htmlFor="venta-ingreso">Ingreso Neto</label>
              <input 
                
                id="venta-ingreso" 
                className="venta-form-input" 
                value={cliente.ingreso}
                onChange={(e) => setCliente({...cliente, ingreso: formatearMoneda(e.target.value)})}
              />
            </div>
            <div className="venta-form-group">
              <label htmlFor="venta-telefono">Teléfono</label>
              <input 
                
                id="venta-telefono" 
                className="venta-form-input" 
                value={cliente.telefono}
                onChange={(e) => setCliente({...cliente, telefono: e.target.value})}
              />
            </div>
            <div className="venta-form-group">
              <label htmlFor="venta-ocupacion">Ocupación</label>
              <input 
                
                id="venta-ocupacion" 
                className="venta-form-input" 
                value={cliente.ocupacion}
                onChange={(e) => setCliente({...cliente, ocupacion: e.target.value})}
              />
            </div>
            <div className="venta-form-group">
              <label htmlFor="venta-carga">Carga Familiar</label>
              <input 
                
                id="venta-carga" 
                className="venta-form-input" 
                value={cliente.cargaFamiliar}
                onChange={(e) => setCliente({...cliente, cargaFamiliar: e.target.value})}
              />
            </div>
          </div>
        </div>

        {/* Sección de selección de vivienda */}
        <div className="venta-form-section">
          <h3 className="venta-section-title">Selección de Vivienda</h3>
          <p className="venta-subtitle">Solo podrás seleccionar aquellos terrenos que estén disponibles. Verifica en Logística &gt; Terrenos</p>
          
          <div className="venta-form-grid">
            <div className="venta-form-group">
              <label htmlFor="venta-proyecto">Seleccione el proyecto</label>
              <input 
                
                id="venta-proyecto" 
                className="venta-form-input" 
                value={vivienda.proyecto}
                onChange={(e) => setVivienda({...vivienda, proyecto: e.target.value})}
              />
            </div>
            <div className="venta-form-group">
              <label htmlFor="venta-codigo">Código de Unidad</label>
              <input 
                
                id="venta-codigo" 
                className="venta-form-input" 
                value={vivienda.codigoUnidad}
                onChange={(e) => setVivienda({...vivienda, codigoUnidad: e.target.value})}
              />
            </div>
            <div className="venta-form-group">
              <label htmlFor="venta-etapa">Etapa</label>
              <input 
                
                id="venta-etapa" 
                className="venta-form-input" 
                value={vivienda.etapa}
                onChange={(e) => setVivienda({...vivienda, etapa: e.target.value})}
              />
            </div>
            <div className="venta-form-group">
              <label htmlFor="venta-disponible">¿Disponible?</label>
              <input 
                
                id="venta-disponible" 
                className="venta-form-input" 
                value={vivienda.disponible}
                onChange={(e) => setVivienda({...vivienda, disponible: e.target.value})}
              />
            </div>
            <div className="venta-form-group">
              <label htmlFor="venta-precio">Precio</label>
              <input 
                
                id="venta-precio" 
                className="venta-form-input" 
                value={vivienda.precio}
                onChange={(e) => setVivienda({...vivienda, precio: formatearMoneda(e.target.value)})}
              />
            </div>
           <div className="venta-form-group">
              <label htmlFor="venta-tipo">Tipo</label>
              <select
                id="venta-tipo"
                className="venta-form-input"
                value={vivienda.tipo}
                onChange={(e) => setVivienda({ ...vivienda, tipo: e.target.value })}
              >
                <option value="PARQUE">PARQUE</option>
                <option value="AVENIDA">AVENIDA</option>
                <option value="CALLE">CALLE</option>
                <option value="ESQUINA">ESQUINA</option>
                <option value="ESQUINA/PARQUE">ESQUINA/PARQUE</option>
              </select>
            </div>

            <div className="venta-form-group">
              <label htmlFor="venta-area">Área</label>
              <input 
                
                id="venta-area" 
                className="venta-form-input" 
                value={vivienda.area}
                onChange={(e) => setVivienda({...vivienda, area: e.target.value})}
              />
            </div>
          </div>
        </div>

        {/* Sección de operaciones */}
        <div className="venta-form-section">
          <h3 className="venta-section-title">Operaciones</h3>
          <p className="venta-subtitle">Verifica si los financiamientos actuales están disponibles para realizar una venta</p>
          
          <div className="venta-form-grid">
            <div className="venta-form-group">
              <label htmlFor="venta-financiamiento">Seleccione el financiamiento</label>
              <div className="venta-select-container">
                <select 
                  id="venta-financiamiento" 
                  className="venta-form-select"
                  value={operacion.financiamiento}
                  onChange={(e) => setOperacion({...operacion, financiamiento: e.target.value})}
                >
                  <option>Techo Propio 2025</option>
                  <option>Bono Policial</option>
                  <option>Bono Familiar</option>
                  <option>Crédito Hipotecario</option>
                </select>
              </div>
            </div>
            <div className="venta-form-group">
              <label htmlFor="venta-monto-bono">Monto del bono o financiamiento</label>
              <input 
                 
                id="venta-monto-bono" 
                className="venta-form-input" 
                value={operacion.montoBono}
                onChange={(e) => setOperacion({...operacion, montoBono: formatearMoneda(e.target.value)})}
              />
            </div>
            <div className="venta-form-group">
              <label htmlFor="venta-interes">Interés</label>
              <input 
                
                id="venta-interes" 
                className="venta-form-input" 
                value={operacion.interes}
                onChange={(e) => setOperacion({...operacion, interes: e.target.value})}
              />
            </div>
            <div className="venta-form-group">
              <label htmlFor="venta-cuotas">N de Cuotas</label>
              <input 
                
                id="venta-cuotas" 
                className="venta-form-input" 
                value={operacion.cuotas}
                onChange={(e) => setOperacion({...operacion, cuotas: e.target.value})}
              />
            </div>
            <div className="venta-form-group">
              <label htmlFor="venta-monto-cuota">Monto x Cuota</label>
              <input 
                
                id="venta-monto-cuota" 
                className="venta-form-input" 
                value={operacion.montoCuota}
                onChange={(e) => setOperacion({...operacion, montoCuota: formatearMoneda(e.target.value)})}
              />
            </div>
            <div className="venta-form-group">
              <label htmlFor="venta-fecha-pagos">Fecha de Pagos</label>
              <div className="venta-date-input-container">
                <input 
                  
                  id="venta-fecha-pagos" 
                  className="venta-form-input" 
                  value={operacion.fechaPago}
                  readOnly
                  ref={fechaPagoInputRef}
                />
                <button 
                  type="button" 
                  className="venta-calendar-button" 
                  onClick={toggleCalendario}
                >
                  <FontAwesomeIcon icon={faCalendarAlt} />
                </button>
              </div>
              {mostrarCalendario && (
                <div className="venta-calendar-dropdown" ref={calendarRef}>
                  <div className="venta-calendar-header">
                    <button 
                      type="button" 
                      className="venta-month-nav" 
                      onClick={() => cambiarMes(-1)}
                    >
                      <FontAwesomeIcon icon={faChevronLeft} />
                    </button>
                    <div className="venta-current-month">
                      {nombresMeses[mesActual]}
                    </div>
                    <button 
                      type="button" 
                      className="venta-month-nav" 
                      onClick={() => cambiarMes(1)}
                    >
                      <FontAwesomeIcon icon={faChevronRight} />
                    </button>
                  </div>
                  <div className="venta-calendar-days">
                    <div className="venta-weekday-header">
                      <div>Do</div>
                      <div>Lu</div>
                      <div>Ma</div>
                      <div>Mi</div>
                      <div>Ju</div>
                      <div>Vi</div>
                      <div>Sa</div>
                    </div>
                    <div className="venta-days-grid">
                      {generarCalendario()}
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="venta-form-group">
              <label htmlFor="venta-inicial">Inicial</label>
              <input 
                
                id="venta-inicial" 
                className="venta-form-input" 
                value={operacion.inicial}
                onChange={(e) => setOperacion({...operacion, inicial: formatearMoneda(e.target.value)})}
              />
            </div>
            <div className="venta-constancia">
              <label htmlFor="logoFile" className="venta-constancia-label">
                <FontAwesomeIcon icon={faUpload} /> Subir Constancia
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

        <div className="venta-button-container-center">
          <button 
            id="venta-btn-continuar" 
            className="venta-btn-continuar"
            onClick={continuarVenta}
          >
            Continuar
          </button>
        </div>

        <br /><hr />
        
        {/* Sección de detalles de la venta */}
        <div 
          id="venta-detalles-section" 
          className={`venta-detalles-section ${mostrarDetalles ? '' : 'venta-hidden'}`}
        >
          <div className="venta-section-header">
            <h3 className="venta-section-title">Detalles de la Cotización</h3>
            <p className="venta-subtitle">Es obligatorio brindar al cliente toda la información relacionada con la cotización del proceso. Verifica que los datos sean correctos y confirma que el cliente comprenda cada punto antes de proceder.</p>
          </div>

          <div className="venta-table-container">
            <table className="venta-detalles-table">
              <thead>
                <tr>
                  <th>Descripción</th>
                  <th>Monto a Financiar</th>
                  <th>Monto de venta</th>
                  <th>Pago Inicial</th>
                  <th>Interés</th>
                  <th>Cuotas</th>
                  <th>Fechas de pago</th>
                  <th>Cronogramas</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{`${vivienda.proyecto} - ETAPA ${vivienda.etapa}`}</td>
                  <td>s/7000.00</td>
                  <td>s/70000.00</td>
                  <td>{operacion.inicial}</td>
                  <td>0.0%</td>
                  <td>{operacion.cuotas}</td>
                  <td>{operacion.fechaPago}</td>
                  <td className="venta-constancia-cell">
                    <button 
                      className="venta-pdf-button" 
                      onClick={() => setModalPdfPreview(true)}
                    >
                      <FontAwesomeIcon icon={faFilePdf} className="icono-pdf" />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="venta-button-container">
            <div className="venta-button-group">
              <button 
                className="venta-btn-confirmar"
                onClick={confirmarVenta}
              >
                Confirmar
              </button>
              <button className="venta-btn-cancelar">
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Alerta */}
      {modalAlerta && (
        <div className="venta-modal venta-modal-alerta">
          <div className="venta-modal-content">
            <div className="venta-modal-header">
              <h3>ALERTA - VENTA</h3>
              <button 
                className="venta-close-btn" 
                onClick={() => setModalAlerta(false)}
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
            <div className="venta-modal-body">
              <div className="venta-modal-icon-container">
                <div className="venta-modal-icon venta-modal-icon-warning">
                  <FontAwesomeIcon icon={faExclamation} />
                </div>
              </div>
              <p className="venta-modal-message">¿Desea Guardar estos cambios?</p>
            </div>
            <div className="venta-modal-footer">
              <button 
                className="venta-btn-atras" 
                onClick={() => setModalAlerta(false)}
              >
                Atrás
              </button>
              <button 
                className="venta-btn-continuar-modal" 
                onClick={mostrarConfirmacion}
              >
                Continuar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Confirmación */}
      {modalConfirmacion && (
        <div className="venta-modal venta-modal-confirmacion">
          <div className="venta-modal-content">
            <div className="venta-modal-header">
              <h3>CONFIRMACIÓN - VENTA</h3>
              <button 
                className="venta-close-btn" 
                onClick={() => setModalConfirmacion(false)}
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
            <div className="venta-modal-body">
              <div className="venta-modal-icon-container">
                <div className="venta-modal-icon venta-modal-icon-success">
                  <FontAwesomeIcon icon={faCheck} />
                </div>
              </div>
              <p className="venta-modal-message">Se ha registrado correctamente la venta</p>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Vista Previa PDF */}
      {modalPdfPreview && (
        <div className="venta-modal venta-modal-pdf">
          <div className="venta-modal-pdf-content">
            <div className="venta-modal-pdf-header">
              <h3>Vista Previa del PDF</h3>
              <button 
                className="venta-close-btn" 
                onClick={() => setModalPdfPreview(false)}
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
            <div className="venta-modal-pdf-body">
              <div className="venta-contenido-vista-previa">
                {/* Aquí iría el contenido del PDF */}
                <div className="venta-pdf-placeholder">
                  <h4>Cronograma de Pagos</h4>
                  <p>Cliente: {cliente.nombres} {cliente.apellidos}</p>
                  <p>Proyecto: {vivienda.proyecto} - Unidad: {vivienda.codigoUnidad}</p>
                  <p>Monto: {vivienda.precio}</p>
                  <p>Cuotas: {operacion.cuotas}</p>
                  <p>Fecha de pago: {operacion.fechaPago}</p>
                </div>
              </div>
            </div>
            <div className="venta-modal-pdf-footer">
              <button className="venta-btn-descargar-pdf">
                <FontAwesomeIcon icon={faDownload} /> Descargar PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
