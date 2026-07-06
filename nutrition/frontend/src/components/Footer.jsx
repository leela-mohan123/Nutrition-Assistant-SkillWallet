const Footer = () => {
  return (
    <footer className="bg-black/95 border-t border-[#d4af37]/30 py-8 relative overflow-hidden shadow-[0_-5px_30px_rgba(212,175,55,0.05)]">
      {/* Subtle top decoration line */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1/3 h-[1px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent opacity-70"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center justify-center gap-4">
          <p className="text-[#d4af37]/60 text-sm font-medium tracking-wider uppercase">
            &copy; {new Date().getFullYear()} <span className="pure-gold-shine font-bold">NutriAssist</span> Inc. All rights reserved.
          </p>
          
          <div className="flex justify-center gap-8 mt-2 items-center">
            <a href="#" className="flex items-center gap-2 text-[#d4af37]/40 text-xs font-bold uppercase tracking-widest hover:text-[#ffdf00] transition-all duration-300 transform hover:-translate-y-1 hover:drop-shadow-[0_0_8px_rgba(255,223,0,0.8)] relative group">
              Privacy Policy
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#ffdf00] group-hover:w-full transition-all duration-300"></span>
            </a>
            
            {/* Decorative Gold Dot Separator */}
            <div className="w-1.5 h-1.5 rounded-full bg-[#d4af37]/40"></div>
            
            <a href="#" className="flex items-center gap-2 text-[#d4af37]/40 text-xs font-bold uppercase tracking-widest hover:text-[#ffdf00] transition-all duration-300 transform hover:-translate-y-1 hover:drop-shadow-[0_0_8px_rgba(255,223,0,0.8)] relative group">
              Terms of Service
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#ffdf00] group-hover:w-full transition-all duration-300"></span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
