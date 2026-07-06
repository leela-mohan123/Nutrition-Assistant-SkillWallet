import { motion } from 'framer-motion';
import { FaExclamationTriangle, FaCheckCircle, FaLightbulb, FaTint } from 'react-icons/fa';
import { useState, useEffect } from 'react';

const Recommendations = () => {
  const [profile, setProfile] = useState(null);
  const [averages, setAverages] = useState({ calories: 0, protein: 0, carbs: 0, fats: 0 });
  const [water, setWater] = useState(0);

  useEffect(() => {
    // 1. Fetch Profile Targets
    const pData = localStorage.getItem('user_profile_v2');
    let targetCals = 2200;
    let targetProtein = 150;
    
    if (pData) {
      const p = JSON.parse(pData);
      setProfile(p);
      
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
      targetProtein = Math.round(weight * 2.2);
    }

    // 2. Fetch Meal Averages (Simplifying for today's logs)
    const mData = localStorage.getItem('nutri_meals');
    if (mData) {
      const meals = JSON.parse(mData);
      let c=0, p=0;
      meals.forEach(m => {
        c += Number(m.calories) || 0;
        p += Number(m.p) || 0;
      });
      setAverages({ calories: c, protein: p, targetCals, targetProtein });
    } else {
      setAverages({ calories: 0, protein: 0, targetCals, targetProtein });
    }

    // 3. Fetch Water
    const wData = localStorage.getItem('nutri_water');
    if (wData) setWater(Number(wData));

  }, []);

  // Rules Engine
  const calState = averages.calories > averages.targetCals ? 'high' : averages.calories < (averages.targetCals * 0.5) ? 'low' : 'good';
  const proState = averages.protein < averages.targetProtein ? 'low' : 'good';
  const waterState = water >= 8 ? 'good' : 'low';

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8 max-w-4xl mx-auto relative font-sans min-h-[85vh] pb-10">
      
      {/* Background Aurora */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-rose-500/10 blur-[120px] rounded-full pointer-events-none z-0"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none z-0"></div>

      <div className="relative z-10">
        <h1 className="text-3xl font-black text-white tracking-tight mb-2 drop-shadow-md">AI Diet Recommendations</h1>
        <p className="text-cyan-100/60 text-sm font-medium">Smart actionable insights automatically generated based on your nutritional telemetry.</p>
      </div>

      <div className="space-y-6 relative z-10">
        
        {/* Rule 1: Calorie Engine */}
        {calState === 'high' && (
          <motion.div whileHover={{ scale: 1.01 }} className="bg-[#0f172a]/80 backdrop-blur-3xl border border-white/5 p-8 rounded-3xl flex items-start gap-5 shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-rose-400 to-rose-600 shadow-[2px_0_15px_rgba(244,63,94,0.5)]"></div>
            <div className="w-12 h-12 rounded-2xl bg-rose-500/10 flex items-center justify-center flex-shrink-0 border border-rose-500/20 group-hover:bg-rose-500/20 transition-colors">
              <FaExclamationTriangle className="text-rose-400 text-2xl drop-shadow-[0_0_8px_rgba(244,63,94,0.6)]" />
            </div>
            <div>
              <h3 className="text-lg font-black text-white mb-2 tracking-tight">Calories Exceeding Target</h3>
              <p className="text-gray-300 leading-relaxed text-sm font-medium">
                Your intake (<span className="text-rose-400 font-bold">{averages.calories} kcal</span>) is currently running above your baseline target of <span className="text-white font-bold">{averages.targetCals} kcal</span>.
                <br/><br/>
                <span className="text-rose-300 font-bold uppercase tracking-wider text-[0.65rem] border border-rose-500/30 bg-rose-500/10 px-3 py-1.5 rounded-lg inline-block mb-2 shadow-inner">Recommendation</span>
                <br/>
                Try substituting high-carb or sugary snacks with volume-heavy foods like raw salads or fiber-rich vegetables to suppress appetite without caloric dense penalization.
              </p>
            </div>
          </motion.div>
        )}
        
        {calState === 'low' && (
          <motion.div whileHover={{ scale: 1.01 }} className="bg-[#0f172a]/80 backdrop-blur-3xl border border-white/5 p-8 rounded-3xl flex items-start gap-5 shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-amber-400 to-orange-500 shadow-[2px_0_15px_rgba(245,158,11,0.5)]"></div>
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center flex-shrink-0 border border-amber-500/20">
              <FaLightbulb className="text-amber-400 text-2xl" />
            </div>
            <div>
              <h3 className="text-lg font-black text-white mb-2 tracking-tight">Severe Caloric Deficit Detected</h3>
              <p className="text-gray-300 leading-relaxed text-sm font-medium">
                You have consumed only <span className="text-amber-400 font-bold">{averages.calories} kcal</span> against a {averages.targetCals} kcal target.
                <br/><br/>
                <span className="text-amber-300 font-bold uppercase text-[0.65rem] border border-amber-500/30 bg-amber-500/10 px-3 py-1.5 rounded-lg inline-block mb-2 shadow-inner">Try Adding</span>
                <br/>
                Healthy calorie-dense foods like peanut butter, avocados, nuts, and olive oil to prevent metabolic slowdown.
              </p>
            </div>
          </motion.div>
        )}

        {/* Rule 2: Protein Engine */}
        {proState === 'low' ? (
          <motion.div whileHover={{ scale: 1.01 }} className="bg-[#0f172a]/80 backdrop-blur-3xl border border-white/5 p-8 rounded-3xl flex items-start gap-5 shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-cyan-400 to-blue-500 shadow-[2px_0_15px_rgba(6,182,212,0.5)]"></div>
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 flex items-center justify-center flex-shrink-0 border border-cyan-500/20">
              <FaLightbulb className="text-cyan-400 text-2xl" />
            </div>
            <div>
              <h3 className="text-lg font-black text-white mb-2 tracking-tight">Protein Yield is Sub-Optimal</h3>
              <p className="text-gray-300 leading-relaxed text-sm font-medium">
                You have consumed <span className="text-cyan-400 font-bold">{averages.protein}g</span> out of your {averages.targetProtein}g daily goal. High protein is crucial for preserving lean mass.
                <br/><br/>
                <span className="text-cyan-300 font-bold uppercase text-[0.65rem] border border-cyan-500/30 bg-cyan-500/10 px-3 py-1.5 rounded-lg inline-block mb-2 shadow-inner">Try Adding</span>
                <br/>
                Eggs, Paneer, Chicken Breast, Sprouts, or Greek Yogurt to your next meal block immediately.
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.div whileHover={{ scale: 1.01 }} className="bg-[#0f172a]/80 backdrop-blur-3xl border border-white/5 p-8 rounded-3xl flex items-start gap-5 shadow-xl relative overflow-hidden group">
             <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-emerald-400 to-emerald-600 shadow-[2px_0_15px_rgba(16,185,129,0.5)]"></div>
             <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center flex-shrink-0 border border-emerald-500/20">
               <FaCheckCircle className="text-emerald-400 text-2xl" />
             </div>
             <div>
               <h3 className="text-lg font-black text-white mb-2 tracking-tight">Optimal Protein Synthesis</h3>
               <p className="text-gray-300 leading-relaxed text-sm font-medium">
                 Your protein macros are on target. You are successfully supplying your body with the amino acids required for recovery and lean muscle preservation.
               </p>
             </div>
          </motion.div>
        )}

        {/* Rule 3: Hydration Engine */}
        {waterState === 'low' ? (
          <motion.div whileHover={{ scale: 1.01 }} className="bg-[#0f172a]/80 backdrop-blur-3xl border border-white/5 p-8 rounded-3xl flex items-start gap-5 shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-blue-400 to-indigo-500 shadow-[2px_0_15px_rgba(59,130,246,0.5)]"></div>
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center flex-shrink-0 border border-blue-500/20">
              <FaTint className="text-blue-400 text-2xl" />
            </div>
            <div>
              <h3 className="text-lg font-black text-white mb-2 tracking-tight">Dehydration Risk</h3>
              <p className="text-gray-300 leading-relaxed text-sm font-medium">
                You have only logged <span className="text-blue-400 font-bold">{water} glasses</span> of water today!
                <br/><br/>
                <span className="text-blue-300 font-bold uppercase tracking-wider text-[0.65rem] border border-blue-500/30 bg-blue-500/10 px-3 py-1.5 rounded-lg inline-block mb-2 shadow-inner">Recommendation</span>
                <br/>
                Immediately consume 2 glasses of water. Hydration is vital for accurate hunger cue management and metabolic efficiency.
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.div whileHover={{ scale: 1.01 }} className="bg-[#0f172a]/80 backdrop-blur-3xl border border-white/5 p-8 rounded-3xl flex items-start gap-5 shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-emerald-400 to-emerald-600 shadow-[2px_0_15px_rgba(16,185,129,0.5)]"></div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center flex-shrink-0 border border-emerald-500/20">
              <FaCheckCircle className="text-emerald-400 text-2xl" />
            </div>
            <div>
              <h3 className="text-lg font-black text-white mb-2 tracking-tight">Excellent Hydration Met</h3>
              <p className="text-gray-300 leading-relaxed text-sm font-medium">
                You hit the baseline 8-glass water target. Staying hydrated securely ensures maximum metabolic rate functionality.
              </p>
            </div>
          </motion.div>
        )}

      </div>
    </motion.div>
  );
};
export default Recommendations;
