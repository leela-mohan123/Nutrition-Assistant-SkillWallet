import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUser, FaEnvelope, FaLock, FaUserPlus, FaWeight, FaCalendar, FaEye, FaEyeSlash, FaSpinner, FaExclamationCircle, FaCheckCircle } from 'react-icons/fa';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', age: '', weight: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Form Validation Logic
    if (formData.name.trim().length < 3) {
      setError('Name must be at least 3 characters long.');
      return;
    }
    if (!formData.email.includes('@')) {
      setError('Please provide a valid email.');
      return;
    }
    if (formData.password.length < 6) {
      setError('Password must contain at least 6 characters for security.');
      return;
    }
    if (!formData.age || Number(formData.age) <= 0 || Number(formData.age) > 120) {
      setError('Please enter a valid age between 1 and 120.');
      return;
    }
    if (!formData.weight || Number(formData.weight) <= 0) {
      setError('Please enter a valid weight.');
      return;
    }

    setLoading(true);

    // Simulate backend delay and Success Toast
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      
      // Setup Mock JWT Auth token
      localStorage.setItem('userToken', 'fake-jwt-token');

      // Add slight delay after success toast before redirect
      setTimeout(() => {
        navigate('/dashboard');
      }, 1000);
      
    }, 1500);
  };

  return (
    <div className="min-h-screen pt-24 pb-12 flex items-center justify-center relative overflow-hidden bg-black font-sans tracking-wide">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-pure-gold-shine opacity-10 pointer-events-none"></div>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-lg relative z-10 px-4"
      >
        <div className="bg-black/80 backdrop-blur-xl border border-[#d4af37]/30 rounded-3xl p-8 md:p-10 shadow-[0_0_50px_rgba(212,175,55,0.15)] relative overflow-hidden group">
          
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2 pure-gold-shine">Create Account</h2>
            <p className="text-[#d4af37]/60 text-sm">Join NutriAssist and start tracking today.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            <AnimatePresence>
              {error && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="bg-red-500/10 border border-red-500/50 text-red-500 text-sm font-bold p-3 rounded-xl flex items-center gap-2">
                  <FaExclamationCircle /> {error}
                </motion.div>
              )}
              {success && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="bg-emerald-500/10 border border-emerald-500/50 text-emerald-500 text-sm font-bold p-3 rounded-xl flex items-center gap-2">
                  <FaCheckCircle /> Account successfully generated! Routing...
                </motion.div>
              )}
            </AnimatePresence>

            <div>
              <label className="block text-sm font-semibold text-[#d4af37]/80 mb-2">Full Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FaUser className="text-[#d4af37]/50" />
                </div>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full bg-[#111] text-[#d4af37] border border-[#d4af37]/40 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-[#ffdf00] focus:ring-1 focus:ring-[#ffdf00] transition-all placeholder-[#d4af37]/30" placeholder="John Doe" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#d4af37]/80 mb-2">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FaEnvelope className="text-[#d4af37]/50" />
                </div>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full bg-[#111] text-[#d4af37] border border-[#d4af37]/40 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-[#ffdf00] focus:ring-1 focus:ring-[#ffdf00] transition-all placeholder-[#d4af37]/30" placeholder="student@example.com" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-[#d4af37]/80 mb-2">Age</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"><FaCalendar className="text-[#d4af37]/50" /></div>
                  <input type="number" name="age" value={formData.age} onChange={handleChange} className="w-full bg-[#111] text-[#d4af37] border border-[#d4af37]/40 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-[#ffdf00] focus:ring-1 focus:ring-[#ffdf00] transition-all placeholder-[#d4af37]/30" placeholder="Years" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#d4af37]/80 mb-2">Weight</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"><FaWeight className="text-[#d4af37]/50" /></div>
                  <input type="number" name="weight" value={formData.weight} onChange={handleChange} className="w-full bg-[#111] text-[#d4af37] border border-[#d4af37]/40 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-[#ffdf00] focus:ring-1 focus:ring-[#ffdf00] transition-all placeholder-[#d4af37]/30" placeholder="kg" />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#d4af37]/80 mb-2">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FaLock className="text-[#d4af37]/50" />
                </div>
                <input type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={handleChange} required className="w-full bg-[#111] text-[#d4af37] border border-[#d4af37]/40 rounded-xl py-3 pl-12 pr-12 focus:outline-none focus:border-[#ffdf00] focus:ring-1 focus:ring-[#ffdf00] transition-all placeholder-[#d4af37]/30" placeholder="••••••••" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#d4af37]/60 hover:text-[#ffdf00] transition-colors">
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading || success} className="w-full py-4 mt-6 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#ffdf00] text-black font-extrabold uppercase tracking-widest hover:shadow-[0_0_20px_rgba(255,223,0,0.5)] transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2 disabled:opacity-70 disabled:hover:translate-y-0 disabled:cursor-not-allowed">
              {loading ? <FaSpinner className="animate-spin text-xl" /> : <><FaUserPlus /> Register Now</>}
            </button>
          </form>

          <p className="text-center mt-8 text-sm text-[#d4af37]/60">
            Already have an account? <Link to="/login" className="text-[#ffdf00] font-bold hover:underline ml-1 drop-shadow-[0_0_5px_rgba(255,223,0,0.5)]">Sign In here</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
