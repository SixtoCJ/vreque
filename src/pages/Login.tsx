"use client"

import type React from "react"
import { useState } from "react"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEnvelope, faLock, faArrowRight } from "@fortawesome/free-solid-svg-icons"
import "../styles/login.css"

const Login: React.FC = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [remember, setRemember] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Lógica de inicio de sesión aquí
    console.log({ username, password, remember })
    // Redireccionar al dashboard
    window.location.href = "/"
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-form">
          <div className="logo-small">
            <img src="/logo.png" alt="Logo Valle Reque" />
          </div>

          <h1>BIENVENIDO</h1>
          <p className="subtitle">Inicia sesión para continuar</p>

          <form id="loginForm" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Usuario</label>
              <div className="input-container">
                <FontAwesomeIcon icon={faEnvelope} />
                <input
                  type="text"
                  id="username"
                  placeholder="Ingresa tu usuario"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password">Contraseña</label>
              <div className="input-container">
                <FontAwesomeIcon icon={faLock} />
                <input
                  type="password"
                  id="password"
                  placeholder="Ingresa tu contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <Link to="/forgot-password" className="forgot-password">
                ¿Olvidaste tu contraseña?
              </Link>
            </div>

            <div className="remember-me">
              <input type="checkbox" id="remember" checked={remember} onChange={(e) => setRemember(e.target.checked)} />
              <label htmlFor="remember">Recordar mi sesión</label>
            </div>

            <button type="submit" className="login-button">
              Iniciar Sesión
              <FontAwesomeIcon icon={faArrowRight} />
            </button>
          </form>
        </div>

        <div className="brand-panel">
          <div className="logo-large">
            <img src="/logo.png" alt="Logo Valle Reque Grande" />
          </div>
          <h2>Valle Reque</h2>
          <p className="urbanizacion">URBANIZACIÓN</p>
          <p className="description">
            Sistema de gestión integral para
            <br />
            proyectos inmobiliarios
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
