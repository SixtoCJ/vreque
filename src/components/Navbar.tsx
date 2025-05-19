import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faBars, faSearch, faBell, faUser, 
  faCog, faSignOutAlt 
} from '@fortawesome/free-solid-svg-icons';
import '../styles/navbar.css';

interface NavbarProps {
  toggleSidebar: () => void;
  isMobile: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ toggleSidebar, isMobile }) => {
  const [userDropdownActive, setUserDropdownActive] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleUserDropdown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setUserDropdownActive(!userDropdownActive);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setUserDropdownActive(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="top-header">
      <div className="header-left">
        {isMobile && (
          <button className="menu-toggle-mobile" onClick={toggleSidebar}>
            <FontAwesomeIcon icon={faBars} />
          </button>
        )}
      </div>
      
      <div className="header-right">
        <div className="search-box">
          <FontAwesomeIcon icon={faSearch} />
          <input type="text" placeholder="Buscar..." />
        </div>
        
        <div className="notifications">
          <button className="icon-btn">
            <FontAwesomeIcon icon={faBell} />
            <span className="badge">3</span>
          </button>
        </div>
        
        <div className={`user-profile ${userDropdownActive ? 'active' : ''}`} ref={dropdownRef}>
          <div className="user-info" onClick={toggleUserDropdown}>
            <span className="user-name">Billy GAY</span>
          </div>
          <img 
            src="/perfil.png" 
            alt="User" 
            className="avatar"
            onClick={toggleUserDropdown}
          />
          
          {/* User Dropdown Menu */}
          <div className="user-dropdown">
            <div className="dropdown-header">
              <img 
                src="/perfil.png" 
                alt="User" 
                className="avatar-large"
              />
              <div className="user-details">
                <h4>Billy GAY</h4>
                <p>Administrador</p>
              </div>
            </div>
            <div className="dropdown-body">
              <a href="#" className="dropdown-item">
                <FontAwesomeIcon icon={faUser} />
                <span>Mi Perfil</span>
              </a>
              <a href="#" className="dropdown-item">
                <FontAwesomeIcon icon={faCog} />
                <span>Configuración</span>
              </a>
              <a href="#" className="dropdown-item">
                <FontAwesomeIcon icon={faSignOutAlt} />
                <span>Cerrar Sesión</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
