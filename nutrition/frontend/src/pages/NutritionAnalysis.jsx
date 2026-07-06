import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const NutritionAnalysis = () => {
  const [weeklyData, setWeeklyData] = useState([0, 0, 0, 0, 0, 0, 0]); // Mon-Sun kcal totals
  const [macroSplit, setMacroSplit] = useState({ p: 0, c: 0, f: 0, totalP: 0, totalC: 0, totalF: 0 });

  useEffect(() => {
    const meals = JSON.parse(localStorage.getItem('nutri_meals') || '[]');
    
    // 1. Crunch Weekly Calories
    // For a real app, this parses dates. For demo, we just assign recent meals to a random daily distribution 
    // or parse the actual `date` field.
    const days = [0, 0, 0, 0, 0, 0, 0];
    
    meals.forEach(meal => {
      if (meal.date) {
        // Simple mock week alignment: Get day of week (0-6) from the date string
        const dateObj = new Date(meal.date);
        let dayIndex = dateObj.getDay() - 1; // 0=Mon, 6=Sun in our UI array
        if (dayIndex === -1) dayIndex = 6; // Sunday fix
        
        if (dayIndex >= 0 && dayIndex <= 6) {
          days[dayIndex] += Number(meal.calories) || 0;
        }
      }
    });
    
    // If no data, provide a mock sequence for the presentation so it's not empty, 
    // otherwise use the calculated actual days
    const hasData = days.some(d => d > 0);
    if (!hasData) {
      setWeeklyData([0, 0, 0, 0, 0, 0, 0]); // Blank slate if nothing logged
    } else {
      setWeeklyData(days);
    }

    // 2. Crunch Macro Averages
    let totalP = 0, totalC = 0, totalF = 0;
    meals.forEach(meal => {
      totalP += Number(meal.p) || 0;
      totalC += Number(meal.c) || 0;
      totalF += Number(meal.f) || 0;
    });

    const totalGrams = totalP + totalC + totalF;
    if (totalGrams > 0) {
      setMacroSplit({
        p: Math.round((totalP / totalGrams) * 100),
        c: Math.round((totalC / totalGrams) * 100),
        f: Math.round((totalF / totalGrams) * 100),
        totalP, totalC, totalF
      });
    } else {
      setMacroSplit({ p: 0, c: 0, f: 0, totalP: 0, totalC: 0, totalF: 0 });
    }

  }, []);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8 max-w-6xl mx-auto relative min-h-[85vh] pb-10">
      
      {/* Background Orbs */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-indigo-500/10 blur-[150px] rounded-full pointer-events-none z-0 float-aura"></div>

      <div className="relative z-10">
        <h1 className="text-4xl font-black text-white tracking-tight mb-2 text-neon-pulse drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">Nutrition Analysis</h1>
        <p className="text-cyan-100/60 text-sm font-medium">Deep dive into your eating patterns and macro distributions.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10 mt-8">
        
        {/* Weekly Calorie Chart - Equalizer Style */}
        <div className="bg-[#0f172a]/60 backdrop-blur-3xl border border-white/10 p-8 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden group glass-shimmer">
          <div className="absolute top-0 right-0 w-40 h-40 bg-cyan-500/20 blur-[100px] rounded-full group-hover:bg-cyan-400/30 transition-all duration-700"></div>
          
          <h2 className="text-sm font-bold text-gray-300 uppercase tracking-widest mb-12 flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(6,182,212,1)] animate-ping"></span> 
            Live Weekly Calorie Intake (From DB)
          </h2>
          
          <div className="h-64 flex items-end justify-between gap-4 border-b-2 border-white/10 pb-2 relative z-10">
            {/* Holographic background scanlines */}
            <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(255,255,255,0.02)_50%)] bg-[length:100%_4px] pointer-events-none"></div>

            {weeklyData.map((calories, i) => {
              // Convert actual calories to a height percentage, capping at 100% for ~3000 kcal
              const heightPercent = Math.min((calories / 3000) * 100, 100);
              
              return (
              <div key={i} className="w-full relative group/bar flex flex-col items-center cursor-pointer h-full justify-end">
                <motion.div 
                  initial={{ height: 0 }}
                  animate={{ height: `${heightPercent || 2}%` }} // fallback to 2% so empty bars are slightly visible
                  transition={{ duration: 1, delay: i * 0.1, type: "spring" }}
                  className={`w-full rounded-t-lg transition-all duration-300 transform group-hover/bar:scale-y-110 origin-bottom border-x border-t relative overflow-hidden ${
                    calories > 2500 
                      ? 'bg-gradient-to-t from-rose-900/80 via-rose-500/80 to-rose-400 border-rose-400 shadow-[0_0_20px_rgba(244,63,94,0.6)]' 
                      : 'bg-gradient-to-t from-cyan-900/80 via-cyan-500/80 to-cyan-300 border-cyan-300 shadow-[0_0_20px_rgba(6,182,212,0.6)]'
                  } ${calories === 0 && 'opacity-20'}`} 
                >
                  {/* Equalizer moving lines */}
                  {calories > 0 && <div className="absolute inset-0 bg-[linear-gradient(to_top,transparent,rgba(255,255,255,0.5),transparent)] h-[200%] animate-[liquidGradientFlow_2s_linear_infinite] opacity-50"></div>}
                </motion.div>
                
                {/* Floating Tooltip */}
                <div className="absolute -top-12 bg-black/80 backdrop-blur-md border border-white/20 text-white font-black text-xs px-4 py-2 rounded-xl opacity-0 group-hover/bar:opacity-100 group-hover/bar:-translate-y-2 transition-all shadow-[0_10px_20px_rgba(0,0,0,0.5)] z-20 whitespace-nowrap hidden group-hover/bar:block">
                  {calories} kcal
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-black/80 border-b border-r border-white/20 rotate-45"></div>
                </div>
              </div>
            )})}
          </div>
          <div className="flex justify-between mt-6 text-xs font-black text-gray-500 uppercase tracking-widest px-2">
            <span className="hover:text-cyan-400 transition-colors cursor-default">Mon</span>
            <span className="hover:text-cyan-400 transition-colors cursor-default">Tue</span>
            <span className="hover:text-cyan-400 transition-colors cursor-default">Wed</span>
            <span className="hover:text-rose-400 transition-colors cursor-default">Thu</span>
            <span className="hover:text-cyan-400 transition-colors cursor-default">Fri</span>
            <span className="hover:text-cyan-400 transition-colors cursor-default">Sat</span>
            <span className="hover:text-cyan-400 transition-colors cursor-default">Sun</span>
          </div>
        </div>

        {/* Macro Distribution - Cyberpunk Data Core Style */}
        <div className="bg-[#0f172a]/60 backdrop-blur-3xl border border-white/10 p-8 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden group glass-shimmer">
          <div className="absolute bottom-0 left-0 w-56 h-56 bg-fuchsia-500/20 blur-[120px] rounded-full group-hover:bg-fuchsia-400/30 transition-all duration-700"></div>
          
          <h2 className="text-sm font-bold text-gray-300 uppercase tracking-widest mb-12 flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-fuchsia-400 shadow-[0_0_10px_rgba(232,121,249,1)] animate-ping"></span> 
            Live Macro Average
          </h2>

          {macroSplit.totalP === 0 && macroSplit.totalC === 0 ? (
            <div className="h-64 flex items-center justify-center text-gray-500 font-bold uppercase tracking-widest text-xs">
              No Data Available to Analyze
            </div>
          ) : (
            <div className="flex flex-col justify-center gap-8 relative z-10">
              
              {/* Protein */}
              <div className="group/macro cursor-pointer">
                <div className="flex justify-between text-xs mb-3 font-black uppercase tracking-widest">
                  <span className="text-gray-300 group-hover/macro:text-cyan-400 transition-colors flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 group-hover/macro:shadow-[0_0_8px_cyan]"></span>
                    Protein ({macroSplit.p}%)
                  </span>
                  <span className="text-gray-600 group-hover/macro:text-cyan-500/70">{macroSplit.totalP}g Total</span>
                </div>
                <div className="w-full bg-black/50 border border-white/10 rounded-full h-5 overflow-hidden relative shadow-inner p-0.5">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${macroSplit.p}%` }}
                    transition={{ duration: 1.5, delay: 0.2 }}
                    className="h-full rounded-full bg-gradient-to-r from-blue-600 via-cyan-400 to-cyan-300 group-hover/macro:brightness-150 transition-all shadow-[0_0_15px_rgba(6,182,212,0.8)] relative"
                  >
                    <div className="absolute top-0 right-0 w-8 h-full bg-white/40 blur-[2px] skew-x-[-20deg] animate-[shineSweep_2s_infinite]"></div>
                  </motion.div>
                </div>
              </div>

              {/* Carbs */}
              <div className="group/macro cursor-pointer">
                <div className="flex justify-between text-xs mb-3 font-black uppercase tracking-widest">
                  <span className="text-gray-300 group-hover/macro:text-fuchsia-400 transition-colors flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-fuchsia-500 group-hover/macro:shadow-[0_0_8px_fuchsia]"></span>
                    Carbs ({macroSplit.c}%)
                  </span>
                  <span className="text-gray-600 group-hover/macro:text-fuchsia-500/70">{macroSplit.totalC}g Total</span>
                </div>
                <div className="w-full bg-black/50 border border-white/10 rounded-full h-5 overflow-hidden relative shadow-inner p-0.5">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${macroSplit.c}%` }}
                    transition={{ duration: 1.5, delay: 0.4 }}
                    className="h-full rounded-full bg-gradient-to-r from-purple-600 via-fuchsia-500 to-pink-400 group-hover/macro:brightness-150 transition-all shadow-[0_0_15px_rgba(232,121,249,0.8)] relative"
                  >
                    <div className="absolute top-0 right-0 w-8 h-full bg-white/40 blur-[2px] skew-x-[-20deg] animate-[shineSweep_2s_infinite]"></div>
                  </motion.div>
                </div>
              </div>

              {/* Fats */}
              <div className="group/macro cursor-pointer">
                <div className="flex justify-between text-xs mb-3 font-black uppercase tracking-widest">
                  <span className="text-gray-300 group-hover/macro:text-amber-400 transition-colors flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 group-hover/macro:shadow-[0_0_8px_orange]"></span>
                    Fats ({macroSplit.f}%)
                  </span>
                  <span className="text-gray-600 group-hover/macro:text-amber-500/70">{macroSplit.totalF}g Total</span>
                </div>
                <div className="w-full bg-black/50 border border-white/10 rounded-full h-5 overflow-hidden relative shadow-inner p-0.5">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${macroSplit.f}%` }}
                    transition={{ duration: 1.5, delay: 0.6 }}
                    className="h-full rounded-full bg-gradient-to-r from-orange-600 via-amber-500 to-yellow-400 group-hover/macro:brightness-150 transition-all shadow-[0_0_15px_rgba(251,191,36,0.8)] relative"
                  >
                    <div className="absolute top-0 right-0 w-8 h-full bg-white/40 blur-[2px] skew-x-[-20deg] animate-[shineSweep_2s_infinite]"></div>
                  </motion.div>
                </div>
              </div>

            </div>
          )}
        </div>

      </div>

    </motion.div>
  );
};
export default NutritionAnalysis;
