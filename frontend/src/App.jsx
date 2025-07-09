import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardLayout from './components/DashboardLayout';
import OverviewPage from './pages/OverviewPage';
import DevicesPage from './pages/DevicesPage';
import MonitoringPage from './pages/MonitoringPage';
import AddDevicePage from './pages/AddDevicePage';
import EditDevicePage from './pages/EditDevicePage';
import DeviceDetailPage from './pages/DeviceDetailPage';
import SettingsPage from './pages/SettingsPage';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const location = useLocation();
  const token = localStorage.getItem('accessToken');
  const showNavbar = !!token && !['/', '/register'].includes(location.pathname);

  return (
    <>
      {showNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<LoginPage />} />
        {/* <Route path="/register" element={<RegisterPage />} /> */}
        
        <Route 
          path="/dashboard" 
          element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}
        >
          <Route index element={<OverviewPage />} />
          <Route path="monitoring" element={<MonitoringPage />} />
          <Route path="devices" element={<DevicesPage />} />
          <Route path="devices/new" element={<AddDevicePage />} />
          <Route path="devices/edit/:id" element={<EditDevicePage />} />
          <Route path="devices/detail/:id" element={<DeviceDetailPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;