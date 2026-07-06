import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaFire, FaEdit, FaTrash, FaUtensils, FaCoffee, FaMoon, FaAppleAlt, FaDumbbell } from 'react-icons/fa';

const MealHistory = () => {
  const [meals, setMeals] = useState([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All Types');
  const [dateFilter, setDateFilter] = useState('');

  useEffect(() => {
    // Load from local storage or set default mocks
    const storedMeals = localStorage.getItem('nutri_meals');
    if (storedMeals) {
      setMeals(JSON.parse(storedMeals));
    } else {
      const mockData = [
        { id: 1, date: '2026-04-08', type: 'Breakfast', name: 'Oatmeal & Berries', calories: 320, p: 12, c: 45, f: 8 },
        { id: 2, date: '2026-04-08', type: 'Lunch', name: 'Grilled Chicken Salad', calories: 450, p: 40, c: 15, f: 20 },
        { id: 3, date: '2026-04-07', type: 'Dinner', name: 'Steak and Veggies', calories: 600, p: 50, c: 10, f: 30 },
      ];
      setMeals(mockData);
      localStorage.setItem('nutri_meals', JSON.stringify(mockData));
    }
  }, []);

  const handleDelete = (id) => {
    const newMeals = meals.filter(m => m.id !== id);
    setMeals(newMeals);
    localStorage.setItem('nutri_meals', JSON.stringify(newMeals));
  };

  const filteredMeals = meals.filter(meal => {
    const matchesSearch = meal.name?.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'All Types' || meal.type === filter;
    const matchesDate = !dateFilter || meal.date === dateFilter;
    return matchesSearch && matchesFilter && matchesDate;
  });

  // Helper to render type icons
  const getTypeIcon = (type) => {
    switch (type) {
      case 'Breakfast': return <FaCoffee className="text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.6)]" />;
      case 'Lunch': return <FaUtensils className="text-cyan-400 drop-shadow-[0_0_8px_rgba(6,182,212,0.6)]" />;
      case 'Dinner': return <FaMoon className="text-indigo-400 drop-shadow-[0_0_8px_rgba(99,102,241,0.6)]" />;
      case 'Snacks': return <FaAppleAlt className="text-fuchsia-400 drop-shadow-[0_0_8px_rgba(232,121,249,0.6)]" />;
      default: return <FaUtensils className="text-gray-400" />;
    }
  };

  // Stagger animation container
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-10 max-w-6xl mx-auto relative min-h-[85vh] pb-20">
      
      {/* Hyper-Dynamic Aurora Background */}
      <motion.div 
        animate={{ scale: [1, 1.4, 1], rotate: [0, 45, 0], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-[100px] -right-[100px] w-[600px] h-[600px] bg-cyan-500/10 blur-[200px] rounded-full pointer-events-none z-0 float-aura"
      ></motion.div>
      <motion.div 
        animate={{ scale: [1, 1.3, 1], rotate: [0, -30, 0], opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[10%] -left-[200px] w-[500px] h-[500px] bg-indigo-500/10 blur-[150px] rounded-full pointer-events-none z-0 float-aura"
      ></motion.div>

      {/* Header & Controls Panel */}
      <div className="relative z-10 flex flex-col xl:flex-row justify-between items-start xl:items-end gap-8 bg-[#0f172a]/40 backdrop-blur-3xl border border-white/5 p-8 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
        
        {/* Glow Strip */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 via-indigo-500 to-fuchsia-500 opacity-80 rounded-t-[2rem]"></div>

        <div className="flex-1">
          <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 tracking-tight mb-2 drop-shadow-[0_0_15px_rgba(255,255,255,0.1)] text-neon-pulse">
            Meal History
          </h1>
          <p className="text-cyan-100/60 font-medium">Dive into your past nutritional records and track your progression.</p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4 w-full xl:w-auto">
          <div className="relative w-full sm:w-64 group">
            <FaSearch className="absolute left-5 top-1/2 transform -translate-y-1/2 text-cyan-400/50 group-focus-within:text-cyan-400 group-focus-within:scale-125 transition-all duration-300" />
            <input 
              type="text" 
              placeholder="Search by food name..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-14 pr-5 py-4 bg-[#030712]/60 backdrop-blur-2xl border border-white/5 rounded-2xl text-white font-bold placeholder-gray-500 focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 focus:outline-none transition-all shadow-inner hover:bg-white/5"
            />
          </div>
          
          <div className="relative w-full sm:w-48">
            <input 
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="w-full py-4 px-6 bg-[#030712]/60 backdrop-blur-2xl border border-white/5 rounded-2xl text-white font-bold focus:border-indigo-500/50 focus:outline-none cursor-pointer transition-all shadow-inner hover:bg-white/5"
            />
          </div>

          <div className="relative w-full sm:w-48">
            <select 
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="w-full py-4 px-6 bg-[#030712]/60 backdrop-blur-2xl border border-white/5 rounded-2xl text-white font-bold focus:border-fuchsia-500/50 focus:outline-none cursor-pointer appearance-none transition-all shadow-inner hover:bg-white/5"
            >
              <option className="bg-[#0f172a] text-white font-bold p-2">All Types</option>
              <option className="bg-[#0f172a] text-white font-bold p-2">Breakfast</option>
              <option className="bg-[#0f172a] text-white font-bold p-2">Lunch</option>
              <option className="bg-[#0f172a] text-white font-bold p-2">Dinner</option>
              <option className="bg-[#0f172a] text-white font-bold p-2">Snacks</option>
            </select>
            <div className="absolute right-5 top-1/2 transform -translate-y-1/2 pointer-events-none text-fuchsia-400 opacity-60">▼</div>
          </div>
        </div>
      </div>

      {/* Floating Header Columns for Desktop (Replaces rigid table head) */}
      <div className="hidden md:flex relative z-10 px-8 pb-2 text-[10px] font-black text-gray-500 uppercase tracking-widest pl-10 pr-10">
         <div className="w-1/6">Date</div>
         <div className="w-1/3">Meal Identity</div>
         <div className="w-1/6 flex items-center justify-center">Energy</div>
         <div className="w-1/4 flex items-center justify-end pr-10">Macronutrients</div>
         <div className="w-1/12 text-right">Mng</div>
      </div>

      {/* Dynamic List Rendering */}
      <motion.div variants={containerVariants} initial="hidden" animate="show" className="space-y-4 relative z-10">
        <AnimatePresence>
          {filteredMeals.map(meal => (
            <motion.div 
              key={meal.id}
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, x: 100, filter: 'blur(10px)' }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              className="group flex flex-col md:flex-row items-start md:items-center justify-between p-6 bg-[#0f172a]/50 backdrop-blur-xl border border-white/5 rounded-[2rem] hover:bg-[#111827]/80 hover:border-cyan-500/30 transition-all duration-500 shadow-[0_10px_30px_rgba(0,0,0,0.3)] hover:shadow-[0_15px_40px_rgba(6,182,212,0.15)] overflow-hidden relative cursor-pointer transform hover:-translate-y-1"
            >
              {/* Animated Inner Glow Sweep */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/10 to-transparent translate-x-[-150%] group-hover:translate-x-[150%] transition-transform duration-[1.5s] ease-in-out pointer-events-none"></div>

              {/* Date Block */}
              <div className="w-full md:w-1/6 mb-4 md:mb-0 pl-2">
                <span className="text-gray-400 font-bold block text-sm">{meal.date}</span>
              </div>

              {/* Identity Block */}
              <div className="w-full md:w-1/3 mb-4 md:mb-0 flex gap-4 items-center">
                <div className="w-12 h-12 rounded-xl bg-[#030712] border border-white/5 flex items-center justify-center flex-shrink-0 shadow-inner group-hover:border-cyan-500/30 transition-colors">
                   {getTypeIcon(meal.type)}
                </div>
                <div>
                  <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest block mb-0.5 group-hover:text-cyan-400 transition-colors">{meal.type}</span>
                  <span className="font-extrabold text-white text-lg drop-shadow-md tracking-wide truncate">{meal.name}</span>
                </div>
              </div>

              {/* Energy Block */}
              <div className="w-full md:w-1/6 mb-5 md:mb-0 flex items-center md:justify-center">
                <div className="flex items-center gap-2 bg-[#030712]/80 px-4 py-2 rounded-xl border border-white/5 shadow-inner">
                  <FaFire className="text-rose-500 drop-shadow-[0_0_10px_rgba(244,63,94,0.8)] text-xl animate-pulse" /> 
                  <span className="font-black text-xl text-white drop-shadow-sm">{meal.calories}</span>
                  <span className="text-xs text-gray-400 font-bold">kcal</span>
                </div>
              </div>

              {/* Macros Block */}
              <div className="w-full md:w-1/4 mb-4 md:mb-0 flex items-center md:justify-end gap-2 pr-0 md:pr-4">
                <div className="flex gap-2">
                   <div className="bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-lg flex flex-col items-center min-w-[50px] shadow-[0_0_10px_rgba(16,185,129,0.1)] group-hover:shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all">
                     <span className="text-[9px] text-emerald-400/70 font-black uppercase tracking-wider block mb-0.5"><FaDumbbell className="inline text-[8px] mb-[2px]"/> Pro</span>
                     <span className="text-emerald-400 font-black text-sm">{meal.p || 0}g</span>
                   </div>
                   <div className="bg-amber-500/10 border border-amber-500/20 px-3 py-1.5 rounded-lg flex flex-col items-center min-w-[50px] shadow-[0_0_10px_rgba(245,158,11,0.1)] group-hover:shadow-[0_0_15px_rgba(245,158,11,0.3)] transition-all">
                     <span className="text-[9px] text-amber-400/70 font-black uppercase tracking-wider block mb-0.5">Carb</span>
                     <span className="text-amber-400 font-black text-sm">{meal.c || 0}g</span>
                   </div>
                   <div className="bg-fuchsia-500/10 border border-fuchsia-500/20 px-3 py-1.5 rounded-lg flex flex-col items-center min-w-[50px] shadow-[0_0_10px_rgba(217,70,239,0.1)] group-hover:shadow-[0_0_15px_rgba(217,70,239,0.3)] transition-all">
                     <span className="text-[9px] text-fuchsia-400/70 font-black uppercase tracking-wider block mb-0.5">Fat</span>
                     <span className="text-fuchsia-400 font-black text-sm">{meal.f || 0}g</span>
                   </div>
                </div>
              </div>

              {/* Actions Block */}
              <div className="w-full md:w-1/12 flex items-center justify-end gap-2 border-t md:border-t-0 border-white/10 pt-4 md:pt-0">
                <button className="w-10 h-10 rounded-xl flex items-center justify-center bg-white/5 border border-white/5 text-gray-400 hover:text-white hover:bg-cyan-500/20 hover:border-cyan-500/50 hover:shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-all transform hover:scale-110">
                  <FaEdit />
                </button>
                <button 
                  onClick={(e) => { e.stopPropagation(); handleDelete(meal.id); }}
                  className="w-10 h-10 rounded-xl flex items-center justify-center bg-white/5 border border-white/5 text-gray-400 hover:text-white hover:bg-rose-500/80 hover:border-rose-500 hover:shadow-[0_0_20px_rgba(244,63,94,0.6)] transition-all transform hover:scale-110 hover:rotate-12"
                >
                  <FaTrash />
                </button>
              </div>

            </motion.div>
          ))}
        </AnimatePresence>

        {/* Empty State Redesign */}
        {filteredMeals.length === 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full p-16 bg-[#0f172a]/40 backdrop-blur-xl border border-white/5 rounded-[2rem] text-center flex flex-col items-center justify-center">
             <div className="w-24 h-24 mb-6 rounded-full bg-[#030712] border border-white/5 flex items-center justify-center shadow-[0_0_30px_rgba(6,182,212,0.2)]">
                <FaSearch className="text-4xl text-cyan-400/50 drop-shadow-[0_0_15px_rgba(6,182,212,0.5)]" />
             </div>
             <h3 className="text-2xl font-black text-white tracking-wide mb-2 drop-shadow-md">No Records Discovered</h3>
             <p className="text-gray-400 max-w-md mx-auto">We couldn't locate any meals matching your current filters. Adjust your search or log a new meal to expand your database.</p>
          </motion.div>
        )}
      </motion.div>

    </motion.div>
  );
};
export default MealHistory;
