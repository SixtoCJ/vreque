"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Sidebar from "./Sidebar"
import Navbar from "./Navbar"
import "../styles/layout.css"

interface LayoutProps {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarActive, setSidebarActive] = useState(true)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkIfMobile = () => {
      const isMobileView = window.innerWidth < 992
      setIsMobile(isMobileView)

      
      if (isMobileView !== isMobile) {
        setSidebarActive(!isMobileView) 
      }
    }

    // Verificar inicialmente
    checkIfMobile()

    // Agregar event listener para resize
    window.addEventListener("resize", checkIfMobile)

    // Cleanup
    return () => {
      window.removeEventListener("resize", checkIfMobile)
    }
  }, [isMobile])

  const toggleSidebar = () => {
    setSidebarActive(!sidebarActive)
  }

  return (
    <div className="app-container">
      <Sidebar active={sidebarActive} toggleSidebar={toggleSidebar} isMobile={isMobile} />

      {/* Overlay para móvil */}
      {isMobile && sidebarActive && (
        <div className={`sidebar-overlay ${sidebarActive ? "active" : ""}`} onClick={() => setSidebarActive(false)} />
      )}

      <main
        className="main-content"
        style={{
          marginLeft: isMobile ? "0" : sidebarActive ? "var(--sidebar-width)" : "0",
          width: isMobile ? "100%" : sidebarActive ? `calc(100% - var(--sidebar-width))` : "100%",
          transition: "var(--transition)",
        }}
      >
        <Navbar toggleSidebar={toggleSidebar} isMobile={isMobile} />
        <div className="content-wrapper">{children}</div>
      </main>
    </div>
  )
}

export default Layout
