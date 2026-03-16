import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '../../layout/MainLayout/MainLayout';
import { Suspense, lazy } from 'react';
const Dashboard = lazy(() => import('../../layout/Dashboard/Pages/Dashboard'));

function Placeholder({ title }: { title: string }) {
  return (
    <div style={{ padding: 24 }}>
      <h1>{title}</h1>
      <p>This page is a placeholder. The challenge focuses on the dashboard experience.</p>
    </div>
  )
}
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
