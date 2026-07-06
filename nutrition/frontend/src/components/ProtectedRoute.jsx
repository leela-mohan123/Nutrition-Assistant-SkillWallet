import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Sidebar from './Sidebar';

const ProtectedRoute = () => {
  const { user } = useContext(AuthContext);

  // Fallback to true if we are mocking locally to test the design without logging in constantly
  // Change to `!user` when fully integrated
  const isDemoMode = true; 

  if (!user && !isDemoMode) {
    return <Navigate to="/login" replace />;
  }

  // Wraps sub-routes with Sidebar if they are protected
  return (
    <div className="flex h-screen overflow-hidden liquid-cyber-bg text-slate-100 font-sans relative">
      {/* Animated Hex/Grid Overlay spanning the entire dashboard background */}
      <div className="absolute inset-0 cyber-grid pointer-events-none z-0"></div>
      
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-4 md:p-8 relative z-10">
        <Outlet />
      </main>
    </div>
  );
};

export default ProtectedRoute;
