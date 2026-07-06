import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCheckCircle, FaChartPie, FaRunning, FaFire, FaTint, FaSyncAlt } from 'react-icons/fa';

const Profile = () => {
  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem('user_profile_v2');
    return saved ? JSON.parse(saved) : {
      name: 'Student User', email: 'student@example.com', age: 22, weight: 70, height: 175, gender: 'Male', activityLevel: 'Moderately Active', goal: 'Weight Loss'
    };
  });

  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      localStorage.setItem('user_profile_v2', JSON.stringify(profile));
      setIsSaving(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }, 1200);
  };

  const biometrics = useMemo(() => {
    const weight = parseFloat(profile.weight) || 0;
    const height = parseFloat(profile.height) || 0;
    const age = parseInt(profile.age) || 0;
    
    const heightM = height / 100;
    const bmi = weight > 0 && heightM > 0 ? (weight / (heightM * heightM)).toFixed(1) : 0;
    
    let bmr = 0;
    if (weight && height && age) {
      bmr = (10 * weight) + (6.25 * height) - (5 * age);
      bmr = profile.gender === 'Male' ? bmr + 5 : bmr - 161;
    }

    const activityMultipliers = { 'Sedentary': 1.2, 'Lightly Active': 1.375, 'Moderately Active': 1.55, 'Very Active': 1.725 };
    const tdee = bmr * (activityMultipliers[profile.activityLevel] || 1.2);

    let targetCalories = tdee;
    if (profile.goal === 'Weight Loss') targetCalories -= 500;
    if (profile.goal === 'Weight Gain') targetCalories += 500;

    const water = (weight * 0.035).toFixed(1);

    return { 
      bmi, bmr: Math.round(bmr), tdee: Math.round(tdee), targetCalories: Math.round(targetCalories), water 
    };
  }, [profile]);

  return (
    <div className="min-h-[calc(100vh-64px)] bg-[#030712] text-slate-200 py-12 px-6 lg:px-12 relative overflow-hidden font-sans">
      
      {/* Extreme impressive backgrounds */}
      <div className="absolute inset-0 bg-[#030712] z-0"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,#1e3a8a_0%,transparent_50%)] pointer-events-none z-0"></div>
      
      {/* Dynamic Animated Grid */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" style={{
        backgroundImage: 'linear-gradient(to right, #00ffff 1px, transparent 1px), linear-gradient(to bottom, #00ffff 1px, transparent 1px)',
        backgroundSize: '80px 80px',
        transform: 'perspective(500px) rotateX(60deg) translateY(-100px)',
        transformOrigin: 'top center',
        animation: 'gridMove 10s linear infinite'
      }}></div>

      <style>{`
        @keyframes gridMove {
          0% { background-position: 0 0; }
          100% { background-position: 0 80px; }
        }
        @keyframes borderSpin {
          100% { transform: rotate(360deg); }
        }
      `}</style>

      {/* Floating glowing orbs */}
      <motion.div animate={{ y: [0, -30, 0], x: [0, 20, 0] }} transition={{ duration: 7, repeat: Infinity }} className="absolute top-1/4 left-10 w-96 h-96 bg-cyan-600/30 blur-[120px] rounded-full pointer-events-none z-0"></motion.div>
      <motion.div animate={{ y: [0, 30, 0], x: [0, -40, 0] }} transition={{ duration: 10, repeat: Infinity }} className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-indigo-600/20 blur-[150px] rounded-full pointer-events-none z-0"></motion.div>

      <div className="max-w-[90rem] mx-auto relative z-10 pt-4">
        <motion.div initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="mb-12 text-center lg:text-left flex flex-col lg:flex-row lg:items-end justify-between border-b border-cyan-500/20 pb-6 gap-6">
          <div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-2 drop-shadow-[0_0_15px_rgba(6,182,212,0.5)]">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-500 to-indigo-500">System Parameters</span>
            </h1>
            <p className="text-cyan-200/60 text-lg md:text-xl font-bold tracking-widest uppercase shadow-black">Calibrate your core biological telemetry.</p>
          </div>
          
          {/* Top Save Button mapped */}
          <div className="flex justify-center">
             <motion.button 
               whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(6,182,212,0.6)" }} whileTap={{ scale: 0.95 }} onClick={handleSave} disabled={isSaving}
               className="bg-gradient-to-r from-cyan-600 to-indigo-600 text-white font-black tracking-widest uppercase text-sm px-10 py-5 rounded-2xl shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all flex items-center gap-3 border border-cyan-400/50 disabled:opacity-75 disabled:grayscale relative overflow-hidden group"
             >
               <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out skew-x-12"></div>
               {isSaving ? <><FaSyncAlt className="animate-spin text-xl drop-shadow-[0_0_10px_currentColor]" /> SYNCING CORE...</> : <>UPDATE NEURAL CORE</>}
             </motion.button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-12 relative">
          
          <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2, duration: 0.6 }} className="xl:col-span-7 space-y-6">
            
            {/* Extremely complex glass card with animated border */}
            <div className="relative p-1 rounded-[2.5rem] bg-[#0B1221]/90 overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.8),inset_0_0_30px_rgba(255,255,255,0.05)] backdrop-blur-3xl group">
               {/* Spinning gradient border layer */}
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-[conic-gradient(from_0deg,transparent_0_340deg,rgba(6,182,212,1)_360deg)] animate-[borderSpin_4s_linear_infinite] opacity-50 group-hover:opacity-100 transition-opacity"></div>
               
               {/* Inner Card */}
               <div className="relative bg-[#0B1221] p-8 sm:p-10 rounded-[2.4rem] h-full border border-white/5 z-10 shadow-inner">
                  <h2 className="text-3xl font-black text-white mb-8 tracking-tighter flex items-center gap-3"><FaCheckCircle className="text-cyan-400 drop-shadow-[0_0_10px_rgba(6,182,212,0.8)]" /> Identity Matrix</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                    {[
                      { label: "Full Name", name: "name", type: "text", color: "cyan" },
                      { label: "Email Address", name: "email", type: "email", color: "cyan" },
                      { label: "Age", name: "age", type: "number", color: "indigo" },
                      { label: "Weight (kg)", name: "weight", type: "number", color: "purple" },
                      { label: "Height (cm)", name: "height", type: "number", color: "purple" },
                    ].map((field, i) => (
                      <div key={i} className="group/input relative flex flex-col">
                        <label className={`text-[0.65rem] font-black text-${field.color}-400 mb-2 uppercase tracking-widest pl-2 drop-shadow-[0_0_5px_currentColor]`}>{field.label}</label>
                        <div className="relative">
                           <div className={`absolute inset-0 bg-${field.color}-500/20 blur-md opacity-0 group-focus-within/input:opacity-100 transition-opacity rounded-2xl`}></div>
                           <input type={field.type} name={field.name} value={profile[field.name]} onChange={handleChange} className={`w-full bg-[#030712]/80 border border-white/10 rounded-2xl px-6 py-4 text-white font-black text-lg focus:outline-none focus:border-${field.color}-400 focus:ring-2 focus:ring-${field.color}-500/50 transition-all shadow-[inset_0_0_15px_rgba(0,0,0,0.8)] relative z-10 peer`} />
                           {/* Hover bottom neon line */}
                           <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-${field.color}-400 peer-focus:w-1/2 transition-all duration-300 z-20 rounded-full`}></div>
                        </div>
                      </div>
                    ))}
                    
                    <div className="group/input relative flex flex-col">
                      <label className="text-[0.65rem] font-black text-indigo-400 mb-2 uppercase tracking-widest pl-2 drop-shadow-[0_0_5px_currentColor]">Gender</label>
                      <select name="gender" value={profile.gender} onChange={handleChange} className="w-full bg-[#030712]/80 border border-white/10 rounded-2xl px-6 py-4 text-white font-black text-lg focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/50 transition-all appearance-none cursor-pointer shadow-[inset_0_0_15px_rgba(0,0,0,0.8)] relative z-10"><option>Male</option><option>Female</option><option>Other</option></select>
                    </div>

                    <div className="group/input relative flex flex-col">
                      <label className="text-[0.65rem] font-black text-amber-400 mb-2 uppercase tracking-widest pl-2 drop-shadow-[0_0_5px_currentColor]">Activity Level</label>
                      <select name="activityLevel" value={profile.activityLevel} onChange={handleChange} className="w-full bg-[#030712]/80 border border-white/10 rounded-2xl px-6 py-4 text-white font-black text-lg focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-500/50 transition-all appearance-none cursor-pointer shadow-[inset_0_0_15px_rgba(0,0,0,0.8)] relative z-10"><option>Sedentary</option><option>Lightly Active</option><option>Moderately Active</option><option>Very Active</option></select>
                    </div>

                    <div className="group/input relative flex flex-col">
                      <label className="text-[0.65rem] font-black text-rose-400 mb-2 uppercase tracking-widest pl-2 drop-shadow-[0_0_5px_currentColor]">Primary Goal</label>
                      <select name="goal" value={profile.goal} onChange={handleChange} className="w-full bg-[#030712]/80 border border-white/10 rounded-2xl px-6 py-4 text-white font-black text-lg focus:outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-500/50 transition-all appearance-none cursor-pointer shadow-[inset_0_0_15px_rgba(0,0,0,0.8)] relative z-10"><option>Weight Loss</option><option>Weight Gain</option><option>Maintain Weight</option></select>
                    </div>
                  </div>
               </div>
            </div>
          </motion.div>

          {/* Right Side - Insane Live Engine Dashboard */}
          <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4, duration: 0.6 }} className="xl:col-span-5 h-full">
            <div className="bg-gradient-to-b from-[#0B1221] to-[#030712] border-t border-l border-white/10 border-b-2 border-r-2 border-cyan-500/20 p-8 sm:p-10 rounded-[3rem] shadow-[inset_0_0_60px_rgba(6,182,212,0.1),0_30px_60px_rgba(0,0,0,0.8)] relative h-full flex flex-col group/dash hover:border-cyan-400/40 transition-all duration-700">
               
               <div className="absolute top-0 right-0 w-full h-[200px] bg-gradient-to-b from-cyan-500/10 to-transparent pointer-events-none rounded-t-[3rem]"></div>

               <div className="flex items-center gap-5 mb-10 relative z-10">
                 <div className="w-16 h-16 bg-[#030712] rounded-2xl flex items-center justify-center border border-cyan-500/50 shadow-[0_0_20px_rgba(6,182,212,0.5)]">
                    <FaChartPie className="text-4xl text-cyan-400 drop-shadow-[0_0_10px_currentColor]" />
                 </div>
                 <div>
                   <h2 className="text-3xl font-black text-white tracking-tighter drop-shadow-md">Compute Core</h2>
                   <div className="flex items-center gap-2 mt-1">
                     <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                     <p className="text-emerald-400 font-bold uppercase tracking-widest text-[0.65rem] drop-shadow-[0_0_5px_currentColor]">Telemetry Active</p>
                   </div>
                 </div>
               </div>

               <div className="space-y-6 flex-1 flex flex-col justify-center relative z-10">
                 {/* Calorie Output Main -> Massive scale */}
                 <div className="bg-[#030712]/90 border border-cyan-500/20 p-8 rounded-[2rem] shadow-2xl relative overflow-hidden group/card hover:scale-[1.02] transition-transform duration-300">
                   <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(6,182,212,0.15),transparent_70%)] pointer-events-none"></div>
                   
                   <p className="text-sm font-black text-cyan-400 uppercase tracking-widest flex items-center gap-2 mb-4 drop-shadow-[0_0_8px_currentColor]"><FaFire className="text-lg"/> Target Yield</p>
                   
                   <div className="flex flex-col md:flex-row items-baseline gap-3">
                     <motion.span key={biometrics.targetCalories} initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-6xl sm:text-[5.5rem] font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-cyan-300 tracking-tighter leading-none drop-shadow-2xl">
                       {biometrics.targetCalories || 0}
                     </motion.span>
                     <span className="text-cyan-500/50 font-black tracking-widest text-xl uppercase border border-cyan-500/20 px-3 py-1 rounded-xl">Kcal</span>
                   </div>
                 </div>

                 <div className="grid grid-cols-2 gap-4 sm:gap-6">
                    <div className="bg-gradient-to-br from-emerald-900/40 to-[#030712] border border-emerald-500/30 p-6 rounded-[2rem] shadow-xl relative overflow-hidden group/mini hover:border-emerald-400/80 hover:shadow-[0_0_30px_rgba(16,185,129,0.3)] transition-all">
                       <p className="text-[0.65rem] font-black text-emerald-400 uppercase tracking-widest mb-3 drop-shadow-[0_0_5px_currentColor]"><FaRunning className="inline mr-1 text-base"/> Energy Rate</p>
                       <div className="flex flex-col">
                         <motion.span key={biometrics.tdee} initial={{ y: -10 }} animate={{ y: 0 }} className="text-3xl sm:text-4xl font-black text-white tracking-tighter drop-shadow-lg">{biometrics.tdee || 0}</motion.span>
                         <span className="text-[0.65rem] text-emerald-500 font-bold uppercase tracking-widest">TDEE / Day</span>
                       </div>
                    </div>

                    <div className="bg-gradient-to-br from-blue-900/40 to-[#030712] border border-blue-500/30 p-6 rounded-[2rem] shadow-xl relative overflow-hidden group/mini hover:border-blue-400/80 hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] transition-all">
                       <p className="text-[0.65rem] font-black text-blue-400 uppercase tracking-widest mb-3 drop-shadow-[0_0_5px_currentColor]"><FaTint className="inline mr-1 text-base"/> Fluid Goal</p>
                       <div className="flex flex-col">
                         <motion.span key={biometrics.water} initial={{ y: -10 }} animate={{ y: 0 }} className="text-3xl sm:text-4xl font-black text-white tracking-tighter drop-shadow-lg">{biometrics.water || 0}</motion.span>
                         <span className="text-[0.65rem] text-blue-500 font-bold uppercase tracking-widest">Liters / Day</span>
                       </div>
                    </div>
                 </div>

                 <div className="bg-gradient-to-r from-fuchsia-900/30 to-[#030712] border border-fuchsia-500/20 p-6 rounded-[2rem] flex justify-between items-center px-8 shadow-xl hover:border-fuchsia-500/50 transition-colors">
                    <div>
                      <p className="text-[0.75rem] font-black text-fuchsia-400 uppercase tracking-widest mb-1 drop-shadow-[0_0_5px_currentColor]">Body Mass Index</p>
                      <p className="text-xs text-fuchsia-200/40 font-black tracking-widest">{profile.height}CM | {profile.weight}KG</p>
                    </div>
                    <motion.span key={biometrics.bmi} initial={{ scale: 0.5 }} animate={{ scale: 1 }} className="text-5xl font-black text-white drop-shadow-[0_0_20px_rgba(217,70,239,0.5)]">
                      {biometrics.bmi || 0}
                    </motion.span>
                 </div>
               </div>

            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default Profile;
