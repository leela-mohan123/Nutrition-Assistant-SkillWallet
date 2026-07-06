import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash, FaSpinner, FaExclamationCircle } from 'react-icons/fa';

const Login = () => {
  const [curtainOpen, setCurtainOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  // Trigger curtain open after a short delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurtainOpen(true);
    }, 1500); // 1.5 seconds of curtain before opening
    return () => clearTimeout(timer);
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    // Basic Validation
    if (!formData.email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    setLoading(true);

    // Simulate API Call Processing with Loading Spinner
    setTimeout(() => {
      setLoading(false);
      navigate('/dashboard'); // Mock login routing
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden flex items-center justify-center font-sans tracking-wide">
      
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-pure-gold-shine opacity-20 pointer-events-none"></div>

      <AnimatePresence>
        {!curtainOpen && (
          <motion.div
            key="curtain"
            initial={{ y: 0 }}
            exit={{ y: "-100vh", opacity: 0 }}
            transition={{ duration: 1.2, ease: [0.77, 0, 0.175, 1] }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black border-b-[10px] border-[#d4af37]"
          >
            <div className="absolute inset-0 bg-pure-gold-shine opacity-10"></div>
            <motion.h1 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-5xl md:text-7xl font-black pure-gold-shine uppercase tracking-widest text-center px-4 z-10 drop-shadow-[0_0_25px_rgba(255,215,0,0.4)]"
            >
              Welcome to Login
            </motion.h1>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Actual Login Form Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: curtainOpen ? 1 : 0, scale: curtainOpen ? 1 : 0.9 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative z-10 w-full max-w-md p-8 md:p-10 bg-black/80 backdrop-blur-xl border border-[#d4af37]/30 rounded-3xl shadow-[0_0_50px_rgba(212,175,55,0.15)] mt-12"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold pure-gold-shine mb-2">NutriAssist Login</h2>
          <p className="text-[#d4af37]/60 text-sm">Enter your credentials to access your dashboard.</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          
          <AnimatePresence>
            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }} 
                animate={{ opacity: 1, y: 0 }} 
                exit={{ opacity: 0, y: -10 }}
                className="bg-red-500/10 border border-red-500/50 text-red-500 text-sm font-bold p-3 rounded-xl flex items-center gap-2"
              >
                <FaExclamationCircle /> {error}
              </motion.div>
            )}
          </AnimatePresence>

          <div>
            <label className="block text-sm font-semibold text-[#d4af37]/80 mb-2">Email Address</label>
            <input 
              type="email" 
              required
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              placeholder="student@example.com"
              className="w-full bg-[#111] text-[#d4af37] border border-[#d4af37]/40 rounded-xl py-3 px-4 focus:outline-none focus:border-[#ffdf00] focus:ring-1 focus:ring-[#ffdf00] transition-all placeholder-[#d4af37]/30" 
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-[#d4af37]/80 mb-2">Password</label>
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"} 
                required
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                placeholder="••••••••"
                className="w-full bg-[#111] text-[#d4af37] border border-[#d4af37]/40 rounded-xl py-3 px-4 pr-12 focus:outline-none focus:border-[#ffdf00] focus:ring-1 focus:ring-[#ffdf00] transition-all placeholder-[#d4af37]/30" 
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#d4af37]/60 hover:text-[#ffdf00] transition-colors"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <div className="flex justify-between items-center text-xs text-[#d4af37]/60">
            <label className="flex items-center gap-2 cursor-pointer hover:text-[#d4af37] transition-colors">
              <input type="checkbox" className="accent-[#d4af37]" /> Remember me
            </label>
            <a href="#" className="hover:text-[#ffdf00] transition-colors hover:underline">Forgot password?</a>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-4 mt-2 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#ffdf00] text-black font-extrabold uppercase tracking-widest hover:shadow-[0_0_20px_rgba(255,223,0,0.5)] transition-all transform hover:-translate-y-1 disabled:opacity-70 disabled:hover:translate-y-0 disabled:cursor-not-allowed flex justify-center items-center gap-2"
          >
            {loading ? <FaSpinner className="animate-spin text-xl" /> : "Sign In"}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-[#d4af37]/60">
          Don't have an account? <Link to="/register" className="text-[#ffdf00] font-bold hover:underline ml-1 drop-shadow-[0_0_5px_rgba(255,223,0,0.5)]">Register here</Link>
        </p>
      </motion.div>

    </div>
  );
};

export default Login;
