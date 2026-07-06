import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { 
  FaHome, FaPlusCircle, FaHistory, FaChartPie, FaLightbulb, 
  FaSignOutAlt, FaLeaf, FaUser, FaBell, FaDownload, FaInfoCircle
} from 'react-icons/fa';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: <FaHome /> },
    { path: '/dashboard/add-meal', label: 'Add Meal', icon: <FaPlusCircle /> },
    { path: '/dashboard/history', label: 'Meal History', icon: <FaHistory /> },
    { path: '/dashboard/analysis', label: 'Analysis', icon: <FaChartPie /> },
    { path: '/dashboard/recommendations', label: 'Recommendations', icon: <FaLightbulb /> },
    { path: '/dashboard/profile', label: 'Profile Settings', icon: <FaUser /> },
    { path: '/dashboard/notifications', label: 'Alerts', icon: <FaBell /> },
    { path: '/dashboard/export', label: 'Export Reports', icon: <FaDownload /> },
    { path: '/dashboard/about', label: 'About & Features', icon: <FaInfoCircle /> },
  ];

  return (
    <aside className="w-[280px] bg-[#0A1221] border-r border-white/5 flex flex-col justify-between hidden lg:flex h-full shadow-[5px_0_30px_rgba(0,0,0,0.5)] relative z-20 overflow-hidden font-sans">
      
      {/* Subtle background glow */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-cyan-600/5 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-hide pb-6">
        
        {/* Logo Section exactly matching screenshot */}
        <div className="h-28 flex items-center px-8 relative z-10 sticky top-0 bg-[#0A1221]">
          <Link to="/" className="flex items-center gap-4 group w-full">
            <div className="flex items-center justify-center p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 transition-colors duration-300">
              <FaLeaf className="text-2xl text-cyan-400" />
            </div>
            <div>
              <h1 className="text-[1.4rem] font-bold text-slate-200 tracking-tight leading-none group-hover:text-white transition-colors duration-300">
                NutriAssist
              </h1>
            </div>
          </Link>
        </div>

        {/* Links Navigation matching exactly 5 items */}
        <nav className="px-5 mt-2 relative z-10 space-y-1.5">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path || (item.path === '/dashboard' && location.pathname === '/');
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-4 px-4 py-3.5 rounded-xl font-semibold text-[0.95rem] transition-all duration-300 border ${
                  isActive 
                  ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30 shadow-[inset_2px_0_0_0_#06b6d4]' 
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/5 border-transparent'
                }`}
              >
                <div className={`text-[1.1rem] transition-all duration-300 ${isActive ? 'text-cyan-400' : 'text-slate-400 group-hover:text-slate-300'}`}>
                  {item.icon}
                </div>
                <span className="tracking-wide">{item.label}</span>
              </Link>
            )
          })}
        </nav>
      </div>

      {/* Logout matching exactly the screenshot style */}
      <div className="p-6 relative z-10 bg-[#0A1221]">
        <button 
          onClick={handleLogout}
          className="flex items-center justify-center gap-3 px-4 py-3.5 rounded-xl font-bold text-sm text-slate-500 hover:text-slate-300 hover:bg-white/5 transition-all duration-300 w-full group"
        >
          <FaSignOutAlt className="text-lg group-hover:-translate-x-1 transition-transform" />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
