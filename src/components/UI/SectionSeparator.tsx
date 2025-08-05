import Image from 'next/image';
import { motion } from 'framer-motion';

const SectionSeparator = () => {
  return (
    <motion.div 
      className="flex justify-center items-center py-8 md:py-12"
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="relative">
        <Image
          src="/Logos/Seperator.png"
          alt="Section Separator"
          width={120}
          height={40}
          className="w-20 md:w-32 h-auto opacity-60"
        />
      </div>
    </motion.div>
  );
};

export default SectionSeparator; 