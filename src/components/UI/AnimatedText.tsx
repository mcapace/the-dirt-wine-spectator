'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface AnimatedTextProps {
  children: React.ReactNode
  className?: string
  delay?: number
  duration?: number
}

export default function AnimatedText({ 
  children, 
  className, 
  delay = 0, 
  duration = 0.6 
}: AnimatedTextProps) {
  return (
    <motion.div
      className={cn('gradient-text', className)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration, 
        delay, 
        ease: 'easeOut' 
      }}
    >
      {children}
    </motion.div>
  )
} 