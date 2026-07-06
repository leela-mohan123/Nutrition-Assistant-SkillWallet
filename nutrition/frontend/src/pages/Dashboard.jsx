import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaFire, FaDumbbell, FaBreadSlice, FaHamburger, FaArrowRight, FaPlus, FaChartPie, FaLightbulb, FaUser, FaTint, FaMinus } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import StatsCard from '../components/StatsCard';

const Dashboard = () => {
  const [goals, setGoals] = useState({ calories: 2200, protein: 150, carbs: 250, fats: 70 });
  const [current, setCurrent] = useState({ calories: 0, protein: 0, carbs: 0, fats: 0 });
  const [recentLogs, setRecentLogs] = useState([]);
  const [userName, setUserName] = useState("Student");
  
  // New Water Tracker State & Streak
  const [water, setWater] = useState(0);
  const [streak, setStreak] = useState(3); 

  useEffect(() => {
    // Sync Water from Storage
    const savedWater = localStorage.getItem('nutri_water');
    if (savedWater) setWater(Number(savedWater));

    // Dynamic Profile Calculation
    let targetCals = 2200;
    const profileData = localStorage.getItem('user_profile_v2');
    if (profileData) {
      const p = JSON.parse(profileData);
      setUserName(p.name?.split(' ')[0] || "Student");
      
      const weight = parseFloat(p.weight) || 70;
      const height = parseFloat(p.height) || 175;
      const age = parseInt(p.age) || 22;
      
      let bmr = (10 * weight) + (6.25 * height) - (5 * age);
      bmr = p.gender === 'Male' ? bmr + 5 : bmr - 161;
      
      const activityMultipliers = { 'Sedentary': 1.2, 'Lightly Active': 1.375, 'Moderately Active': 1.55, 'Very Active': 1.725 };
      const tdee = bmr * (activityMultipliers[p.activityLevel] || 1.2);
      
      let calculatedCals = tdee;
      if (p.goal === 'Weight Loss') calculatedCals -= 500;
      if (p.goal === 'Weight Gain') calculatedCals += 500;
      targetCals = Math.round(calculatedCals);

      const targetProtein = Math.round(weight * 2.2); 
      const targetFats = Math.round((targetCals * 0.25) / 9); 
      const targetCarbs = Math.round((targetCals - (targetProtein * 4) - (targetFats * 9)) / 4);

      setGoals({ calories: targetCals, protein: targetProtein, carbs: targetCarbs, fats: targetFats });
    }

    // Dynamic Meal Log Calculation
    const storedMeals = localStorage.getItem('nutri_meals');
    let cals = 0;
    if (storedMeals) {
      const meals = JSON.parse(storedMeals);
      let p = 0, c = 0, f = 0;
      meals.forEach(meal => { cals += Number(meal.calories) || 0; p += Number(meal.p) || 0; c += Number(meal.c) || 0; f += Number(meal.f) || 0; });
      setCurrent({ calories: cals, protein: p, carbs: c, fats: f });
      setRecentLogs(meals.slice(0, 3));
      
      // Basic Streak Logic: If emails logged, increment visual streak
      if (meals.length > 0) setStreak(Math.max(3, Math.min(7, meals.length))); 
    }
  }, []);

  // Water Tracker Handlers
  const addWater = () => {
    const newWater = Math.min(water + 1, 15);
    setWater(newWater);
    localStorage.setItem('nutri_water', newWater.toString());
  };
  
  const removeWater = () => {
    const newWater = Math.max(water - 1, 0);
    setWater(newWater);
    localStorage.setItem('nutri_water', newWater.toString());
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-10 max-w-6xl mx-auto relative min-h-[85vh] pb-10 font-sans">
      
      <motion.div animate={{ scale: [1, 1.2, 1], x: [0, 50, 0] }} transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }} className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/10 blur-[150px] rounded-full pointer-events-none z-0"></motion.div>
      <motion.div animate={{ scale: [1, 1.3, 1], y: [0, 40, 0] }} transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }} className="absolute top-[30%] -left-[200px] w-[500px] h-[500px] bg-cyan-500/10 blur-[150px] rounded-full pointer-events-none z-0"></motion.div>

      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 relative z-10">
        <div>
          <div className="flex items-center gap-4 mb-2">
            <h1 className="text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 drop-shadow-[0_0_15px_rgba(6,182,212,0.3)] tracking-tight">
              Welcome back, {userName}!
            </h1>
            <div className="hidden sm:flex bg-orange-500/10 border border-orange-500/30 px-3 py-1.5 rounded-xl items-center gap-1.5 shadow-[0_0_10px_rgba(249,115,22,0.2)]">
               <FaFire className="text-orange-500 drop-shadow-[0_0_5px_currentColor]" />
               <span className="text-orange-400 font-black text-xs tracking-widest uppercase">{streak} Day Streak</span>
            </div>
          </div>
          <p className="text-cyan-100/60 text-sm font-medium tracking-wide">Live dynamic bounds loaded from Profile Core.</p>
        </div>
        <Link to="/dashboard/add-meal" className="flex items-center gap-3 px-8 py-4 bg-white hover:bg-gray-100 text-black font-black uppercase tracking-widest rounded-2xl transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] transform hover:-translate-y-1">
          <FaPlus className="text-cyan-600" /> Log Meal
        </Link>
      </motion.div>

      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
        <StatsCard title="Calories" icon={<FaFire />} current={current.calories} goal={goals.calories} unit="kcal" color="emerald" />
        <StatsCard title="Proteins" icon={<FaDumbbell />} current={current.protein} goal={goals.protein} unit="g" color="blue" />
        <StatsCard title="Carbs" icon={<FaBreadSlice />} current={current.carbs} goal={goals.carbs} unit="g" color="amber" />
        <StatsCard title="Fats" icon={<FaHamburger />} current={current.fats} goal={goals.fats} unit="g" color="rose" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10 mt-8">
        
        {/* Left Side: Recent Logs */}
        <div className="lg:col-span-7 bg-[#0f172a]/60 backdrop-blur-3xl border border-white/10 p-8 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-sm font-bold text-gray-300 uppercase tracking-widest flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 drop-shadow-[0_0_10px_rgba(6,182,212,1)] animate-ping"></span> Live Logs
            </h2>
            <Link to="/dashboard/history" className="text-xs font-bold uppercase tracking-widest text-cyan-400 hover:text-cyan-300 flex items-center gap-1 transition-colors group">
              View All <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="space-y-4">
             {recentLogs.length > 0 ? recentLogs.map((log) => (
                <div key={log.id} className="flex justify-between items-center bg-[#030712]/50 p-5 rounded-2xl border border-white/5 hover:border-cyan-500/50 transition-all duration-300 group relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-transparent translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500"></div>
                  <div>
                    <span className="text-[10px] text-fuchsia-400 font-black uppercase tracking-widest block mb-1">{log.type}</span>
                    <span className="text-white font-bold group-hover:text-cyan-400 transition-colors relative z-10 text-sm md:text-base">{log.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaFire className="text-orange-500 text-sm group-hover:scale-125 transition-transform" />
                    <span className="font-black text-cyan-400 relative z-10">{log.calories} kcal</span>
                  </div>
                </div>
              )) : (
                <div className="text-center text-gray-500 font-bold uppercase tracking-widest text-xs py-10">No meals logged yet.</div>
              )}
          </div>
        </div>

        {/* Right Side Stack: Water + Quick Actions */}
        <div className="lg:col-span-5 space-y-8 flex flex-col">
          
          {/* Water Tracker Widget */}
          <div className="bg-[#0f172a]/80 backdrop-blur-3xl border border-blue-500/20 p-8 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden flex-1 group hover:border-blue-500/50 transition-colors">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-[50px] rounded-full pointer-events-none transition-transform group-hover:scale-150 duration-700"></div>
            <h2 className="text-sm font-bold text-gray-300 uppercase tracking-widest mb-6 flex items-center gap-3 relative z-10">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-400 shadow-[0_0_10px_rgba(59,130,246,1)] animate-ping"></span> Hydration Tracker
            </h2>
            
            <div className="flex items-end justify-between mb-4 relative z-10">
               <div>
                  <span className="text-5xl font-black text-white tracking-tighter drop-shadow-md">{water}</span>
                  <span className="text-blue-500 font-bold tracking-widest uppercase ml-2 text-sm">/ 8 Glasses</span>
               </div>
               <div className="flex bg-[#030712] border border-white/10 rounded-xl overflow-hidden shadow-inner p-1 gap-1">
                 <button onClick={removeWater} className="w-10 h-10 rounded-lg flex items-center justify-center bg-white/5 text-gray-400 hover:text-white hover:bg-rose-500/30 transition-all"><FaMinus /></button>
                 <button onClick={addWater} className="w-10 h-10 rounded-lg flex items-center justify-center bg-blue-500/20 text-blue-400 hover:text-white hover:bg-blue-500 transition-all shadow-[0_0_10px_rgba(59,130,246,0.3)]"><FaPlus /></button>
               </div>
            </div>
            
            <div className="w-full h-3 bg-[#030712] rounded-full overflow-hidden relative z-10 shadow-inner">
               <motion.div initial={{ width: 0 }} animate={{ width: `${Math.min((water/8)*100, 100)}%` }} transition={{ type: "spring", stiffness: 100 }} className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.8)] relative">
                  <div className="absolute top-0 right-0 w-4 h-full bg-white/50 blur-[1px] skew-x-[-20deg]"></div>
               </motion.div>
            </div>
          </div>

          {/* Quick Actions Panel */}
          <div className="bg-[#0f172a]/60 backdrop-blur-3xl border border-white/10 p-8 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden flex-1">
            <h2 className="text-sm font-bold text-gray-300 uppercase tracking-widest mb-6 flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-fuchsia-400 shadow-[0_0_10px_rgba(232,121,249,1)] animate-ping"></span> Quick Nav
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <Link to="/dashboard/add-meal" className="bg-[#030712]/50 hover:bg-[#0f172a] border border-white/5 hover:border-cyan-500/50 p-4 rounded-2xl flex flex-col items-center justify-center gap-3 transition-all group">
                <div className="p-3 bg-cyan-500/10 rounded-xl text-cyan-400 group-hover:scale-110 group-hover:bg-cyan-500 group-hover:text-white transition-all"><FaFire className="text-xl" /></div>
                <span className="font-bold text-[10px] uppercase tracking-widest text-gray-400 group-hover:text-white">Log Food</span>
              </Link>
              <Link to="/dashboard/analysis" className="bg-[#030712]/50 hover:bg-[#0f172a] border border-white/5 hover:border-indigo-500/50 p-4 rounded-2xl flex flex-col items-center justify-center gap-3 transition-all group">
                <div className="p-3 bg-indigo-500/10 rounded-xl text-indigo-400 group-hover:scale-110 group-hover:bg-indigo-500 group-hover:text-white transition-all"><FaChartPie className="text-xl" /></div>
                <span className="font-bold text-[10px] uppercase tracking-widest text-gray-400 group-hover:text-white">Analytics</span>
              </Link>
              <Link to="/dashboard/recommendations" className="bg-[#030712]/50 hover:bg-[#0f172a] border border-white/5 hover:border-amber-500/50 p-4 rounded-2xl flex flex-col items-center justify-center gap-3 transition-all group">
                <div className="p-3 bg-amber-500/10 rounded-xl text-amber-400 group-hover:scale-110 group-hover:bg-amber-500 group-hover:text-white transition-all"><FaLightbulb className="text-xl" /></div>
                <span className="font-bold text-[10px] uppercase tracking-widest text-gray-400 group-hover:text-white">AI Tips</span>
              </Link>
              <Link to="/dashboard/profile" className="bg-[#030712]/50 hover:bg-[#0f172a] border border-white/5 hover:border-fuchsia-500/50 p-4 rounded-2xl flex flex-col items-center justify-center gap-3 transition-all group">
                <div className="p-3 bg-fuchsia-500/10 rounded-xl text-fuchsia-400 group-hover:scale-110 group-hover:bg-fuchsia-500 group-hover:text-white transition-all"><FaUser className="text-xl" /></div>
                <span className="font-bold text-[10px] uppercase tracking-widest text-gray-400 group-hover:text-white">Settings</span>
              </Link>
            </div>
          </div>
          
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;
