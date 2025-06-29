import { Provider } from 'react-redux';
import { store } from '../../../shared/store/store';
import AIInsightsList from './AIInsightsList';
import ProgressStats from './ProgressStats';
import { ImprovementSuggestions } from './ImprovementSuggestions';
import { SummaryStrengths } from './Strengths';
import { Certificate } from './Certificate';
import { motion } from 'framer-motion';

const MainDashboard = () => {
  return (
    <Provider store={store}>
      <DashboardContent />
    </Provider>
  );
};

const DashboardContent = () => {
  const hoverAnimation = {
    whileHover: { scale: 1.02 },
    transition: { duration: 0.3 },
  };

  return (
    <motion.div
      className="min-h-screen p-6 bg-gradient-to-br from-[--color-background] via-white to-[--color-primary]/10 text-right space-y-12"
      dir="rtl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* תעודת הצטיינות */}
      <motion.div className="max-w-4xl mx-auto" {...hoverAnimation}>
        <Certificate fullName="שירה סולטן" />
      </motion.div>

      {/* שורה ראשונה: חוזקות + הצעות לשיפור */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div {...hoverAnimation}>
          <SummaryStrengths />
        </motion.div>
        <motion.div {...hoverAnimation}>
          <ImprovementSuggestions />
        </motion.div>
      </div>

      {/* שורה שנייה: מסקנות מה-AI רחב יותר מהתקדמות */}
      <div className="max-w-6xl mx-auto grid grid-cols-3 gap-6">
        <motion.div className="col-span-2" {...hoverAnimation}>
          <AIInsightsList />
        </motion.div>
        <motion.div className="col-span-1" {...hoverAnimation}>
          <ProgressStats />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default MainDashboard;

