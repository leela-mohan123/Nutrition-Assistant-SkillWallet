import { motion } from 'framer-motion';

const StatsCard = ({ title, icon, current, goal, unit, color }) => {
  const percentage = Math.min((current / goal) * 100, 100) || 0;
  
  const colorMap = {
    emerald: 'from-cyan-400 to-blue-500 bg-cyan-500 text-cyan-400 border-cyan-500/30',
    blue: 'from-indigo-400 to-purple-600 bg-indigo-500 text-indigo-400 border-indigo-500/30',
    amber: 'from-fuchsia-400 to-pink-600 bg-fuchsia-500 text-fuchsia-400 border-fuchsia-500/30',
    rose: 'from-orange-400 to-rose-600 bg-orange-500 text-orange-400 border-orange-500/30'
  };

  const selectedColor = colorMap[color]?.split(' ') || colorMap.emerald.split(' ');
  const gradient = selectedColor[0] + ' ' + selectedColor[1];
  const textColor = selectedColor[3];
  const borderColor = selectedColor[4];

  return (
    <motion.div 
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300 }}
      className={`bg-[#0f172a]/40 backdrop-blur-2xl border ${borderColor} p-6 rounded-3xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] relative overflow-hidden group hover:bg-[#0f172a]/80 transition-colors float-aura glass-shimmer`}
    >
      <div className={`absolute -top-10 -right-10 w-32 h-32 ${selectedColor[2].replace('bg-', 'bg-')}/20 blur-3xl rounded-full group-hover:scale-150 transition-transform duration-700`}></div>

      <div className="flex justify-between items-center mb-4 relative z-10">
        <h3 className="text-gray-400 font-bold uppercase tracking-widest text-xs">{title}</h3>
        <div className={`p-3 rounded-2xl bg-[#030712] ${textColor} border ${borderColor} shadow-inner`}>{icon}</div>
      </div>
      
      <div className="flex items-end gap-2 mb-6 relative z-10">
        <h2 className="text-4xl font-black text-white drop-shadow-md">{current}</h2>
        <span className="text-gray-500 font-bold mb-1 tracking-wide">/ {goal} {unit}</span>
      </div>
      
      <div className="w-full h-2 bg-[#030712] rounded-full overflow-hidden relative z-10 shadow-inner">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className={`h-full rounded-full bg-gradient-to-r ${gradient} shadow-[0_0_10px_currentColor]`}
        ></motion.div>
      </div>
    </motion.div>
  );
};

export default StatsCard;
