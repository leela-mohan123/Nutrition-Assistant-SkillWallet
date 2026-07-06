import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPaperPlane, FaCheckCircle, FaSpinner, FaMicrochip, FaNetworkWired, FaUpload, FaDatabase, FaShieldAlt, FaSync } from 'react-icons/fa';

const About = () => {
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSend = () => {
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSent(true);
      setTimeout(() => setSent(false), 5000);
    }, 2000);
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-[#0A1221] text-slate-200 py-12 px-6 md:px-12 relative overflow-hidden font-sans">
      
      {/* Intense Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none z-0"></div>
      
      <div className="max-w-[85rem] mx-auto relative z-10 pt-4 grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-16">
        
        {/* Left Side text & smaller blocks */}
        <div className="lg:col-span-7 flex flex-col justify-start pt-4">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="mb-10">
            <h1 className="text-4xl lg:text-6xl font-black tracking-tighter mb-4 leading-tight drop-shadow-xl text-white">
               Engineered <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-500 drop-shadow-[0_0_8px_rgba(6,182,212,0.6)]">Precision</span>
            </h1>
            <p className="text-slate-400 text-base font-medium tracking-wide leading-relaxed max-w-xl">
              An intelligent, responsive approach to dietary habits relying on neural processing and persistent tracking. Features have been expanded to meet robust criteria:
            </p>
          </motion.div>

          <motion.div 
             initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1, staggerChildren: 0.1 }}
             className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6"
          >
             {/* 6 smaller, stylized modular blocks */}
             {[
               { icon: <FaMicrochip />, color: "cyan", title: "AI Neural Engine", desc: "Personalized suggestions." },
               { icon: <FaNetworkWired />, color: "indigo", title: "Live Dashboard", desc: "Instantly track goals natively." },
               { icon: <FaUpload />, color: "blue", title: "Data Portability", desc: "Export CSVs natively." },
               { icon: <FaDatabase />, color: "purple", title: "Macro Analytics", desc: "Granular insight analysis." },
               { icon: <FaShieldAlt />, color: "emerald", title: "Local Security", desc: "Secure local data retention." },
               { icon: <FaSync />, color: "rose", title: "Live Real-Time", desc: "No background latency." }
             ].map((feat, i) => (
               <motion.div 
                 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                 key={i} 
                 className={`flex items-center gap-4 p-4 lg:p-5 bg-[#0B1221]/90 backdrop-blur-3xl border border-white/5 rounded-2xl group hover:border-${feat.color}-500/50 hover:bg-[#0B1221] transition-all duration-300 shadow-lg`}
               >
                  <div className={`w-12 h-12 rounded-xl bg-${feat.color}-500/10 flex items-center justify-center shrink-0 border border-${feat.color}-500/30 group-hover:shadow-[0_0_15px_rgba(6,182,212,0.3)] group-hover:scale-105 transition-all duration-300`}>
                     <span className={`text-xl text-${feat.color}-400`}>{feat.icon}</span>
                  </div>
                  <div>
                    <strong className="text-white block font-bold text-[0.95rem] mb-0.5 tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-300">{feat.title}</strong>
                    <p className="text-[0.7rem] font-bold text-slate-500 uppercase tracking-widest">{feat.desc}</p>
                  </div>
               </motion.div>
             ))}
          </motion.div>
        </div>

        {/* Right Side heavily polished form */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
          className="lg:col-span-5 h-full flex flex-col justify-start"
        >
          <div className="bg-[#0B1221]/90 backdrop-blur-3xl border border-white/10 p-8 sm:p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden group/form hover:border-cyan-500/30 transition-colors duration-500">
            
            <div className="absolute -top-32 -right-32 w-64 h-64 bg-cyan-600/20 blur-[100px] rounded-full pointer-events-none group-hover/form:bg-indigo-600/30 transition-colors duration-1000"></div>

            <h2 className="text-2xl font-black text-white mb-2 tracking-tighter drop-shadow-md">Establish Uplink</h2>
            <p className="text-slate-400 mb-8 text-sm font-medium tracking-wide">Transmit diagnostic feedback directly to developers.</p>
            
            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }} 
                  animate={{ opacity: 1, scale: 1 }} 
                  exit={{ opacity: 0 }}
                  className="bg-emerald-500/10 border border-emerald-500/30 p-8 rounded-[2rem] flex flex-col items-center text-center py-16 shadow-inner"
                >
                  <FaCheckCircle className="text-6xl text-emerald-400 drop-shadow-[0_0_15px_rgba(16,185,129,0.5)] mb-4" />
                  <h3 className="text-emerald-400 font-extrabold text-2xl tracking-tighter mb-1">Payload Deployed</h3>
                  <p className="text-emerald-200/60 font-bold tracking-widest uppercase text-[0.65rem] border border-emerald-500/30 px-3 py-1 rounded-full mt-2">Engineers Notified</p>
                </motion.div>
              ) : (
                <motion.form 
                  key="form"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="space-y-5 relative z-10"
                >
                   <div className="relative group">
                      <input type="text" placeholder="TRANSMISSION SUBJECT" className="w-full bg-[#030712]/80 border border-white/10 rounded-2xl px-5 py-4 text-white focus:border-cyan-400 focus:ring-1 focus:ring-cyan-500 outline-none transition-all placeholder:text-slate-600 font-black tracking-widest text-[0.7rem] relative z-10" />
                   </div>
                   <div className="relative group">
                      <textarea placeholder="WRITE PAYLOAD DETAILS..." rows="4" className="w-full bg-[#030712]/80 border border-white/10 rounded-2xl px-5 py-4 text-white focus:border-cyan-400 focus:ring-1 focus:ring-cyan-500 outline-none transition-all placeholder:text-slate-600 font-bold tracking-wide text-sm resize-none relative z-10"></textarea>
                   </div>
                   <button 
                     type="button" 
                     onClick={handleSend}
                     disabled={sending}
                     className="w-full relative group overflow-hidden bg-gradient-to-r from-cyan-600 to-indigo-600 text-white font-black tracking-widest text-[0.8rem] h-14 rounded-2xl shadow-[0_0_20px_rgba(6,182,212,0.3)] disabled:scale-100 disabled:opacity-80 hover:brightness-125 hover:shadow-[0_0_30px_rgba(99,102,241,0.5)] transition-all flex items-center justify-center gap-2 mt-2"
                   >
                     {sending ? (
                       <><FaSpinner className="animate-spin text-lg" /> UPLOADING PACKETS...</>
                     ) : (
                       <><FaPaperPlane className="text-lg" /> TRANSMIT PAYLOAD</>
                     )}
                   </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
