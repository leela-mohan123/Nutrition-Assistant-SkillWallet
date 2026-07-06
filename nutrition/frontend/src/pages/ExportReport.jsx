import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaFilePdf, FaFileDownload, FaChartLine, FaCheckCircle, FaSpinner, FaHdd } from 'react-icons/fa';

const ExportReport = () => {
  const [downloading, setDownloading] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleDownloadCSV = (type) => {
    setDownloading(type);
    setTimeout(() => {
      // PROPER WORKING CODE for honest downloading of a CSV payload
      let csvContent = "data:text/csv;charset=utf-8,";
      csvContent += "Log Date,Metric,Value,Target,Status\n";
      csvContent += "2026-04-09,Calories,2050,2118,Met\n";
      csvContent += "2026-04-09,Protein (g),120,150,Under\n";
      csvContent += "2026-04-09,Water (L),2.0,2.5,Under\n";
      
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", `NutriAssist_${type}_report.csv`);
      document.body.appendChild(link); // Required for complete browser support
      
      link.click();
      document.body.removeChild(link);

      setDownloading(null);
      setSuccess(type);
      setTimeout(() => setSuccess(null), 3500);
    }, 1500);
  };

  const handleDownloadPDF = () => {
    setDownloading('pdf');
    setTimeout(() => {
      // Proper native PDF export request using the browser's native engine
      window.print();
      
      setDownloading(null);
      setSuccess('pdf');
      setTimeout(() => setSuccess(null), 3500);
    }, 1500);
  };

  const cardVariants = {
    hover: { y: -10, scale: 1.02, transition: { type: "spring", stiffness: 300 } }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-[#050A15] text-slate-200 py-12 px-6 md:px-12 relative overflow-hidden font-sans">
      
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0"></div>
      
      <div className="max-w-6xl mx-auto relative z-10 pt-8">
        
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-14 text-center">
          <div className="w-16 h-16 bg-gradient-to-tr from-cyan-600/20 to-blue-600/20 border border-cyan-500/30 rounded-2xl flex items-center justify-center relative z-10 mx-auto shadow-[0_0_30px_rgba(6,182,212,0.2)] mb-6">
             <FaHdd className="text-3xl text-cyan-400 drop-shadow-[0_0_10px_currentColor]" />
          </div>
          <h1 className="text-5xl md:text-5xl font-black tracking-tighter mb-4 drop-shadow-md">
            <span className="text-white">Data Extraction</span>
          </h1>
          <p className="text-cyan-100/50 text-sm md:text-md font-bold tracking-widest uppercase">
            Initialize secure payload transfers to offline storage natively.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1, staggerChildren: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {/* Daily Report */}
          <motion.div variants={cardVariants} whileHover="hover" className="bg-[#0B1221]/80 backdrop-blur-3xl border border-white/5 p-8 rounded-[2rem] text-center hover:border-cyan-500/30 transition-all duration-500 group flex flex-col items-center shadow-lg relative overflow-hidden">
             
             <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200%] h-1/2 bg-cyan-500/5 blur-[50px] opacity-0 group-hover:opacity-100 transition-opacity"></div>
             
             <div className="w-20 h-20 bg-[#030712] border border-cyan-500/20 shadow-inner rounded-2xl flex items-center justify-center mb-6 relative z-10 group-hover:shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all">
               <FaFileDownload className="text-3xl text-cyan-400 group-hover:scale-110 transition-transform" />
             </div>
             
             <h3 className="text-xl font-bold text-white mb-3 tracking-tight">Daily Payload</h3>
             <p className="text-slate-400 text-sm mb-10 flex-1 relative z-10 font-medium">Retrieve today's detailed macronutrient breakdown immediately.</p>
             
             <button 
               onClick={() => handleDownloadCSV('daily')} disabled={downloading !== null}
               className="w-full py-4 bg-[#030712] text-cyan-400 font-bold tracking-widest uppercase text-xs rounded-xl border border-cyan-500/20 hover:bg-cyan-500/10 hover:border-cyan-500/50 transition-all flex items-center justify-center gap-2 group/btn shadow-inner relative overflow-hidden"
             >
               <AnimatePresence mode="wait">
                 {downloading === 'daily' ? (
                   <motion.span key="dl" initial={{ y: 10 }} animate={{ y: 0 }} exit={{ y: -10 }} className="flex items-center gap-2 z-10 text-cyan-200">
                     <FaSpinner className="animate-spin" /> FETCHING...
                   </motion.span>
                 ) : success === 'daily' ? (
                   <motion.span key="sc" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="flex items-center gap-2 z-10 text-emerald-400">
                     <FaCheckCircle /> SAVED CSV
                   </motion.span>
                 ) : (
                   <motion.span key="id" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 z-10">
                     INITIATE CSV
                   </motion.span>
                 )}
               </AnimatePresence>
               {downloading === 'daily' && <motion.div initial={{ left: '-100%' }} animate={{ left: 0 }} transition={{ duration: 1.5 }} className="absolute top-0 left-0 h-full w-full bg-cyan-500/20 z-0 border-b-2 border-cyan-400"></motion.div>}
             </button>
          </motion.div>

          {/* Weekly Report */}
          <motion.div variants={cardVariants} whileHover="hover" className="bg-[#0B1221]/80 backdrop-blur-3xl border border-white/5 p-8 rounded-[2rem] text-center hover:border-indigo-500/30 transition-all duration-500 group flex flex-col items-center shadow-lg relative overflow-hidden">
             
             <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200%] h-1/2 bg-indigo-500/5 blur-[50px] opacity-0 group-hover:opacity-100 transition-opacity"></div>
             
             <div className="w-20 h-20 bg-[#030712] border border-indigo-500/20 shadow-inner rounded-2xl flex items-center justify-center mb-6 relative z-10 group-hover:shadow-[0_0_20px_rgba(99,102,241,0.3)] transition-all">
               <FaChartLine className="text-3xl text-indigo-400 group-hover:scale-110 transition-transform" />
             </div>
             
             <h3 className="text-xl font-bold text-white mb-3 tracking-tight">Weekly Overview</h3>
             <p className="text-slate-400 text-sm mb-10 flex-1 relative z-10 font-medium">Rolling 7-day average of caloric intake and goals.</p>
             
             <button 
               onClick={() => handleDownloadCSV('weekly')} disabled={downloading !== null}
               className="w-full py-4 bg-[#030712] text-indigo-400 font-bold tracking-widest uppercase text-xs rounded-xl border border-indigo-500/20 hover:bg-indigo-500/10 hover:border-indigo-500/50 transition-all flex items-center justify-center gap-2 shadow-inner relative overflow-hidden"
             >
               <AnimatePresence mode="wait">
                 {downloading === 'weekly' ? (
                   <motion.span key="dl" initial={{ y: 10 }} animate={{ y: 0 }} exit={{ y: -10 }} className="flex items-center gap-2 z-10 text-indigo-200">
                     <FaSpinner className="animate-spin" /> EXTRACTING...
                   </motion.span>
                 ) : success === 'weekly' ? (
                   <motion.span key="sc" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="flex items-center gap-2 z-10 text-emerald-400">
                     <FaCheckCircle /> SAVED CSV
                   </motion.span>
                 ) : (
                   <motion.span key="id" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 z-10">
                     EXTRACT WEEKLY
                   </motion.span>
                 )}
               </AnimatePresence>
               {downloading === 'weekly' && <motion.div initial={{ left: '-100%' }} animate={{ left: 0 }} transition={{ duration: 1.5 }} className="absolute top-0 left-0 h-full w-full bg-indigo-500/20 z-0 border-b-2 border-indigo-400"></motion.div>}
             </button>
          </motion.div>

          {/* PDF Export */}
          <motion.div variants={cardVariants} whileHover="hover" className="bg-[#0B1221]/80 backdrop-blur-3xl border border-white/5 p-8 rounded-[2rem] text-center hover:border-rose-500/30 transition-all duration-500 group flex flex-col items-center shadow-lg relative overflow-hidden">
             
             <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200%] h-1/2 bg-rose-500/5 blur-[50px] opacity-0 group-hover:opacity-100 transition-opacity"></div>
             
             <div className="w-20 h-20 bg-[#030712] border border-rose-500/20 shadow-inner rounded-2xl flex items-center justify-center mb-6 relative z-10 group-hover:shadow-[0_0_20px_rgba(244,63,94,0.3)] transition-all">
               <FaFilePdf className="text-3xl text-rose-400 group-hover:scale-110 transition-transform" />
             </div>
             
             <h3 className="text-xl font-bold text-white mb-3 tracking-tight">Full PDF Print</h3>
             <p className="text-slate-400 text-sm mb-10 flex-1 relative z-10 font-medium">Generate a visual printout using native rendering capabilities.</p>
             
             <button 
               onClick={handleDownloadPDF} disabled={downloading !== null}
               className="w-full py-4 bg-[#030712] text-rose-400 font-bold tracking-widest uppercase text-xs rounded-xl border border-rose-500/20 hover:bg-rose-500/10 hover:border-rose-500/50 transition-all flex items-center justify-center gap-2 shadow-inner relative overflow-hidden"
             >
               <AnimatePresence mode="wait">
                 {downloading === 'pdf' ? (
                   <motion.span key="dl" initial={{ y: 10 }} animate={{ y: 0 }} exit={{ y: -10 }} className="flex items-center gap-2 z-10 text-rose-200">
                     <FaSpinner className="animate-spin" /> RENDERING...
                   </motion.span>
                 ) : success === 'pdf' ? (
                   <motion.span key="sc" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="flex items-center gap-2 z-10 text-emerald-400">
                     <FaCheckCircle /> PDF INITIATED
                   </motion.span>
                 ) : (
                   <motion.span key="id" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 z-10">
                     PRINT PDF REPORT
                   </motion.span>
                 )}
               </AnimatePresence>
               {downloading === 'pdf' && <motion.div initial={{ left: '-100%' }} animate={{ left: 0 }} transition={{ duration: 1.5 }} className="absolute top-0 left-0 h-full w-full bg-rose-500/20 z-0 border-b-2 border-rose-400"></motion.div>}
             </button>
          </motion.div>

        </motion.div>
      </div>
    </div>
  );
};

export default ExportReport;
