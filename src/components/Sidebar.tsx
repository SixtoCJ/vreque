import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faShieldAlt, faTruck, faCoins, faFileInvoiceDollar, 
  faShoppingCart, faList, faFolder, faMapMarkerAlt, 
  faUsers, faReceipt, faMoneyBillWave, faUniversity, 
  faExchangeAlt, faBars, faChevronDown, faAngleDown
} from '@fortawesome/free-solid-svg-icons';
import '../styles/sidebar.css';


interface SidebarProps {
  active: boolean;
  toggleSidebar: () => void;
  isMobile: boolean;
}

interface NavItem {
  title: string;
  icon: any;
  path: string;
  submenu?: NavItem[];
}

const Sidebar: React.FC<SidebarProps> = ({ active, toggleSidebar, isMobile }) => {
  const location = useLocation();
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({
    logistica: false,
    tesoreria: false
  });

  const navItems: NavItem[] = [
    {
      title: "Seguridad",
      icon: faShieldAlt,
      path: "/seguridad"
    },
    {
      title: "Logística",
      icon: faTruck,
      path: "#",
      submenu: [
        {
          title: "Proyectos",
          icon: faFolder,
          path: "/logistica/proyectos"
        },
        {
          title: "Terrenos",
          icon: faMapMarkerAlt,
          path: "/logistica/terrenos"
        },
        {
          title: "Clientes",
          icon: faUsers,
          path: "/logistica/clientes"
        }
      ]
    },
    {
      title: "Tesorería",
      icon: faCoins,
      path: "#",
      submenu: [
        {
          title: "Cuotas de Pago",
          icon: faReceipt,
          path: "/tesoreria/cuotas"
        },
        {
          title: "Financiamientos",
          icon: faMoneyBillWave,
          path: "/tesoreria/financiamientos"
        },
        {
          title: "Bancos",
          icon: faUniversity,
          path: "/tesoreria/bancos"
        },
        {
          title: "Devoluciones",
          icon: faExchangeAlt,
          path: "/tesoreria/devoluciones"
        }
      ]
    },
    {
      title: "Cotización",
      icon: faFileInvoiceDollar,
      path: "/cotizacion"
    },
    {
      title: "Ventas",
      icon: faShoppingCart,
      path: "/ventas"
    },
    {
      title: "Listar Ventas",
      icon: faList,
      path: "/listar"
    }
  ];

  const toggleSubmenu = (key: string) => {
    setExpandedItems(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <aside className={`sidebar ${active ? 'active' : ''}`}>
      <div className="sidebar-header">
        <div className="logo">
          <Link to="/">
            <img src="/logo.png" alt="Logo Valle Reque" className="logo-img" />
          </Link>
          <span>Valle <span className="text-accent">Reque</span></span>
        </div>
        {isMobile && (
          <button className="menu-toggle" onClick={toggleSidebar}>
            <FontAwesomeIcon icon={faBars} />
          </button>
        )}

      </div>
      
      <nav className="sidebar-nav">
        {navItems.map((item, index) => (
          <div className="nav-section" key={index}>
            {item.submenu ? (
              <>
                <a 
                  href={item.path} 
                  className={`nav-item ${expandedItems[item.title.toLowerCase()] ? 'active' : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    toggleSubmenu(item.title.toLowerCase());
                  }}
                >
                  <FontAwesomeIcon icon={item.icon} />
                  <span>{item.title}</span>
                  <FontAwesomeIcon 
                    icon={faAngleDown}
                    className={`submenu-arrow ${expandedItems[item.title.toLowerCase()] ? 'rotate' : ''}`} 
                  />
                </a>
                <div 
                  className="nav-submenu"
                  style={{ 
                    maxHeight: expandedItems[item.title.toLowerCase()] 
                      ? `${item.submenu.length * 40}px` 
                      : '0'
                  }}
                >
                  {item.submenu.map((subitem, subindex) => (
                    <Link 
                      to={subitem.path} 
                      className={`nav-subitem ${isActive(subitem.path) ? 'active' : ''}`}
                      key={subindex}
                    >
                      <FontAwesomeIcon icon={subitem.icon} />
                      <span>{subitem.title}</span>
                    </Link>
                  ))}
                </div>
              </>
            ) : (
              <Link 
                to={item.path} 
                className={`nav-item ${isActive(item.path) ? 'active' : ''}`}
              >
                <FontAwesomeIcon icon={item.icon} />
                <span>{item.title}</span>
              </Link>
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
