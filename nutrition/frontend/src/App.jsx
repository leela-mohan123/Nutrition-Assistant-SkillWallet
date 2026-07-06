import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

// Protected Routes & Context
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

// Sidebar Pages
import Dashboard from './pages/Dashboard';
import AddMeal from './pages/AddMeal';
import MealHistory from './pages/MealHistory';
import NutritionAnalysis from './pages/NutritionAnalysis';
import Recommendations from './pages/Recommendations';
import Profile from './pages/Profile';
import Notifications from './pages/Notifications';
import ExportReport from './pages/ExportReport';
import About from './pages/About';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="flex flex-col min-h-screen bg-slate-950 text-slate-100 font-sans">
          
          <Routes>
            {/* Public Entry Routes */}
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<><Header /><main className="flex-grow"><Login /></main><Footer /></>} />
            <Route path="/register" element={<><Header /><main className="flex-grow"><Register /></main><Footer /></>} />

            {/* Protected Sidebar Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/dashboard/add-meal" element={<AddMeal />} />
              <Route path="/dashboard/history" element={<MealHistory />} />
              <Route path="/dashboard/analysis" element={<NutritionAnalysis />} />
              <Route path="/dashboard/recommendations" element={<Recommendations />} />
              <Route path="/dashboard/profile" element={<Profile />} />
              <Route path="/dashboard/notifications" element={<Notifications />} />
              <Route path="/dashboard/export" element={<ExportReport />} />
              <Route path="/dashboard/about" element={<About />} />
            </Route>
          </Routes>
          
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
