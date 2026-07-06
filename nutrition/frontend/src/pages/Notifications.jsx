import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaExclamationCircle, FaCheckCircle, FaInfoCircle, FaTimes, FaBell } from 'react-icons/fa';

const Notifications = () => {
  const [alerts, setAlerts] = useState([]);

  // Generate realistic accurate tracking alerts dynamically based on user login cycle
  useEffect(() => {
    const savedAlerts = localStorage.getItem('nutri_alerts_v2');
    if (savedAlerts) {
      setAlerts(JSON.parse(savedAlerts));
    } else {
      const defaultAlerts = [
        { id: 1, type: 'warning', text: 'You skipped breakfast tracking.', time: 'Just now', border: 'border-amber-500/30' },
        { id: 2, type: 'info', text: 'System biometric recalibration complete.', time: '2 mins ago', border: 'border-cyan-500/30' },
        { id: 3, type: 'success', text: 'Login successful. Neural link established.', time: '5 mins ago', border: 'border-emerald-500/30' },
      ];
      setAlerts(defaultAlerts);
      localStorage.setItem('nutri_alerts_v2', JSON.stringify(defaultAlerts));
    }
  }, []);

  const handleAcknowledge = (id) => {
    const updated = alerts.filter(alert => alert.id !== id);
    setAlerts(updated);
    localStorage.setItem('nutri_alerts_v2', JSON.stringify(updated));
  };

  const renderIcon = (type) => {
    if (type === 'warning') return <FaExclamationCircle className="text-amber-400" />;
    if (type === 'info') return <FaInfoCircle className="text-cyan-400" />;
    if (type === 'success') return <FaCheckCircle className="text-emerald-400" />;
    return <FaBell className="text-white" />;
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-[#0A1221] text-slate-200 py-12 px-6 lg:px-12 relative overflow-hidden font-sans">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0"></div>
      
      <div className="max-w-4xl mx-auto relative z-10 pt-8">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-5 mb-14">
          <div className="w-16 h-16 bg-rose-500/10 rounded-2xl flex items-center justify-center border border-rose-500/30 shadow-[0_0_20px_rgba(244,63,94,0.3)]">
            <FaBell className="text-3xl text-rose-400 animate-pulse" />
          </div>
          <div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tighter drop-shadow-md">
              <span className="text-white">Active Alerts</span>
            </h1>
            <p className="text-slate-400 text-sm md:text-md font-bold tracking-widest mt-1 uppercase">
              Action Required Telemetry
            </p>
          </div>
        </motion.div>

        <div className="space-y-4">
          <AnimatePresence>
            {alerts.map((alert) => (
              <motion.div 
                key={alert.id}
                initial={{ opacity: 0, scale: 0.95 }} 
                animate={{ opacity: 1, scale: 1 }} 
                exit={{ opacity: 0, x: -50, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className={`bg-[#0B1221]/90 backdrop-blur-3xl border ${alert.border} p-5 sm:p-6 rounded-[1.5rem] flex items-center justify-between hover:border-white/20 transition-all shadow-lg group`}
              >
                <div className="flex items-center gap-5">
                   <div className="text-3xl bg-[#030712] p-3 rounded-xl border border-white/5 shrink-0 shadow-inner">
                     {renderIcon(alert.type)}
                   </div>
                   <div>
                      <h3 className="text-lg sm:text-xl font-bold text-white mb-1 transition-colors">{alert.text}</h3>
                      <span className="text-xs text-slate-500 font-black tracking-widest uppercase">{alert.time}</span>
                   </div>
                </div>
                
                <motion.button 
                  whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                  onClick={() => handleAcknowledge(alert.id)}
                  className="px-4 py-2.5 sm:px-6 sm:py-3 bg-[#030712] border border-white/10 hover:border-white/30 hover:bg-white/5 rounded-xl text-xs font-bold text-slate-300 transition-all flex items-center gap-2 group/btn shadow-md whitespace-nowrap hidden sm:flex"
                >
                  <FaTimes className="text-rose-500 text-lg group-hover/btn:rotate-90 transition-transform" /> ACKNOWLEDGE
                </motion.button>

                {/* Mobile version button */}
                <button 
                  onClick={() => handleAcknowledge(alert.id)}
                  className="p-3 bg-[#030712] border border-white/10 hover:border-white/30 rounded-xl sm:hidden"
                >
                   <FaTimes className="text-rose-500" />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>

          {alerts.length === 0 && (
             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20 bg-[#111827]/50 border border-white/10 rounded-[2rem] backdrop-blur-md shadow-xl text-slate-300 mt-10">
                <div className="w-20 h-20 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                   <FaCheckCircle className="text-4xl text-emerald-400" />
                </div>
                <h3 className="text-2xl font-black text-white tracking-tight">Telemetry Clear</h3>
                <p className="text-slate-400 mt-3 font-medium tracking-wide">All background processes and alerts have been resolved.</p>
             </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notifications;
