'use client';

import { motion } from 'framer-motion';

const CasaValdoSection = () => {
  return (
    <motion.section 
      className="section-minimal bg-white py-20"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="container-minimal">
        <motion.div 
          className="section-header text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-title">CASA VALDO</h2>
          <p className="section-subtitle">Our home in Valdobbiadene</p>
        </motion.div>
        
        <div className="text-center">
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Casa Valdo represents our deep connection to the land and the people of Valdobbiadene. 
            It's where our story began and where our future continues to unfold.
          </p>
        </div>
      </div>
    </motion.section>
  );
};

export default CasaValdoSection; 