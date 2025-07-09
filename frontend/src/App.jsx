import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardLayout from './components/DashboardLayout'; // <-- Import Layout
import OverviewPage from './pages/OverviewPage'; // <-- Import Halaman
import DevicesPage from './pages/DevicesPage';   // <-- Import Halaman
import MonitoringPage from './pages/MonitoringPage'; // <-- Import Halaman
import AddDevicePage from './pages/AddDevicePage'; // <-- Import halaman baru
import EditDevicePage from './pages/EditDevicePage'; // <-- Import halaman baru
import DeviceDetailPage from './pages/DeviceDetailPage';
import SettingsPage from './pages/SettingsPage';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const token = localStorage.getItem('accessToken');

  return (
    <>
      <Navbar /> {/* Navbar ini hanya tampil jika belum login */}
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        
        <Route 
          path="/dashboard" 
          element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}
        >
          {/* Rute default saat membuka /dashboard */}
          <Route index element={<OverviewPage />} /> 
          
          {/* Rute anak lainnya */}
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