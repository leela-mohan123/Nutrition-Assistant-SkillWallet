import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowRight, FaShieldAlt, FaChartLine, FaDumbbell } from 'react-icons/fa';

const Home = () => {
  return (
    <div className="min-h-screen bg-black text-[#d4af37] font-sans selection:bg-[#ffdf00]/30">
      
      {/* Background Dynamic Elements */}
      <div className="absolute inset-0 bg-pure-gold-shine opacity-5 pointer-events-none"></div>

      <div className="container mx-auto px-6 pt-32 pb-24 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-widest pure-gold-shine mb-6 drop-shadow-[0_0_15px_rgba(212,175,55,0.3)]">
              Welcome to NutriAssist
            </h1>
            <p className="text-xl md:text-2xl text-[#d4af37]/70 font-light mb-12 tracking-wide">
              Track your nutrition smartly. Elevate your performance.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <Link 
              to="/login" 
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#ffdf00] text-black font-extrabold uppercase tracking-widest hover:shadow-[0_0_25px_rgba(255,223,0,0.4)] transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2"
            >
              Enter Dashboard <FaArrowRight />
            </Link>
            <Link 
              to="/register" 
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-transparent border-2 border-[#d4af37] text-[#ffdf00] font-extrabold uppercase tracking-widest hover:bg-[#d4af37]/10 transition-all transform hover:-translate-y-1"
            >
              Create Account
            </Link>
          </motion.div>

        </div>

        {/* Feature Highlights matching Placement Ready requirements */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-32"
        >
          <div className="p-8 border border-[#d4af37]/20 rounded-2xl bg-[#111] hover:border-[#ffdf00]/50 transition-colors group">
            <FaChartLine className="text-4xl text-[#d4af37] mb-6 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-bold text-white mb-3">Placement Ready Analytics</h3>
            <p className="text-[#d4af37]/60 leading-relaxed text-sm">
              Deep macros breakdown using precise custom data visualizations to show analytical tracking over time.
            </p>
          </div>
          
          <div className="p-8 border border-[#d4af37]/20 rounded-2xl bg-[#111] hover:border-[#ffdf00]/50 transition-colors group">
            <FaShieldAlt className="text-4xl text-[#d4af37] mb-6 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-bold text-white mb-3">Secure Authorisation</h3>
            <p className="text-[#d4af37]/60 leading-relaxed text-sm">
              Protected routes governed by centralized context mimicking JWT Bearer logic.
            </p>
          </div>

          <div className="p-8 border border-[#d4af37]/20 rounded-2xl bg-[#111] hover:border-[#ffdf00]/50 transition-colors group">
            <FaDumbbell className="text-4xl text-[#d4af37] mb-6 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-bold text-white mb-3">Target AI Insights</h3>
            <p className="text-[#d4af37]/60 leading-relaxed text-sm">
              Actionable recommendation mockups adapting to underlying calorie models to steer health accurately.
            </p>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default Home;
