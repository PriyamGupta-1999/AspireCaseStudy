import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '../../layout/MainLayout/MainLayout';
import { Suspense, lazy } from 'react';
const Dashboard = lazy(() => import('../../layout/Dashboard/Pages/Dashboard'));

export default function AppRouter() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Suspense fallback={<div style={{padding: 24}}>Loading...</div>}>
          <Routes>
            {/* Default navigation to /cards (Dashboard) */}
            <Route path="/" element={<Navigate to="/cards" replace />} />
            <Route path="/cards" element={<Dashboard />} />
            <Route path="*" element={<Navigate to="/cards" replace />} />
          </Routes>
        </Suspense>
      </MainLayout>
    </BrowserRouter>
  );
}
