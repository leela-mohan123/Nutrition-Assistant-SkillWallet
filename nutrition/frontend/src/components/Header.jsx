import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaLeaf } from 'react-icons/fa';

const Header = () => {
  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="sticky top-0 z-50 bg-black/90 backdrop-blur-md border-b border-[#d4af37]/40 shadow-[0_4px_30px_rgba(212,175,55,0.15)]"
    >
      <div className="container mx-auto px-6 py-5 flex justify-center items-center relative overflow-hidden">
        {/* Subtle background glow effect behind the logo */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-10 bg-[#d4af37]/10 blur-xl rounded-full"></div>
        
        <Link to="/" className="flex items-center gap-3 group relative z-10">
          <motion.div 
            whileHover={{ rotate: 180, scale: 1.2 }}
            transition={{ duration: 0.6, type: "spring" }}
            className="flex items-center justify-center p-2 rounded-full bg-gradient-to-br from-[#d4af37]/20 to-transparent border border-[#d4af37]/50 shadow-[0_0_15px_rgba(212,175,55,0.3)]"
          >
            <FaLeaf className="text-2xl text-[#ffdf00] drop-shadow-[0_0_8px_rgba(255,223,0,0.8)] group-hover:text-white transition-colors duration-500" />
          </motion.div>
          <span className="text-3xl font-black pure-gold-shine uppercase tracking-widest drop-shadow-[0_0_12px_rgba(255,215,0,0.5)] transform transition-transform group-hover:scale-105 duration-300">
            NutriAssist
          </span>
        </Link>
      </div>
    </motion.header>
  );
};

export default Header;
