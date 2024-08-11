import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Login from './login';
import Dashboard from './Dashboard';
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap'i dahil edin

function App() {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Kullanıcı oturumunu sonlandırmak için gerekli işlemleri yapın
        // Örneğin, JWT token'ı temizleyin ve kullanıcıyı giriş sayfasına yönlendirin
        localStorage.removeItem('token');
        navigate('/'); // Giriş sayfasına yönlendir
    };

    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard onLogout={handleLogout} />} />
        </Routes>
    );
}

export default App;
