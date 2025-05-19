import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Seguridad from './pages/Seguridad';
import Proyecto from './pages/Proyecto';
import Terreno from './pages/Terrenos';
import ListarClientes from './pages/ListarClientes';
import Cuotas from './pages/Cuotas';
import Devoluciones from './pages/Devoluciones';
import Bancos from './pages/Bancos';
import Ventas from './pages/Ventas';
import RegistroVentas from './pages/ListarVentas';
import CambiarTitular from './pages/CambiarTitular';
import Refinanciamiento from './pages/Refinanciamiento';
import CancelarVentas from './pages/Cancelar';

import Login from './pages/Login';
import Layout from './components/Layout';
import './styles/globals.css';

function App() {
  return (
    <Router basename="/VReque">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Layout><Dashboard /></Layout>} />
        <Route path="/seguridad" element={<Layout><Seguridad /></Layout>} />
        <Route path="/logistica/proyectos" element={<Layout><Proyecto /></Layout>} />
        <Route path="/logistica/terrenos" element={<Layout><Terreno /></Layout>} />
        <Route path="/logistica/clientes" element={<Layout><ListarClientes /></Layout>} />
        <Route path="/tesoreria/cuotas" element={<Layout><Cuotas /></Layout>} />
        <Route path="/tesoreria/financiamientos" element={<Layout><div>Financiamientos</div></Layout>} />
        <Route path="/tesoreria/bancos" element={<Layout><Bancos /></Layout>} />
        <Route path="/tesoreria/devoluciones" element={<Layout><Devoluciones /></Layout>} />
        <Route path="/cotizacion" element={<Layout><div>Cotización</div></Layout>} />
        <Route path="/ventas" element={<Layout><Ventas /></Layout>} />
        <Route path="/listar" element={<Layout><RegistroVentas /></Layout>} />
      </Routes>

      {/* Rutas para las acciones de ListarVentas */}
      <Routes>
        <Route path="/listar/cambiar-titular" element={<Layout><CambiarTitular /></Layout>} />
        <Route path="/listar/finalizar" element={<Layout><div>Finalizar</div></Layout>} />
        <Route path="/listar/refinanciar" element={<Layout><Refinanciamiento /></Layout>} />
        <Route path="/listar/cancelar" element={<Layout><CancelarVentas /></Layout>} />
      </Routes>
    </Router>
  );
}

export default App;
