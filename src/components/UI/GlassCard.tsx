'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface GlassCardProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
}

export default function GlassCard({ children, className, onClick }: GlassCardProps) {
  return (
    <motion.div
      className={cn(
        'glass-effect rounded-xl p-6 cursor-pointer',
        className
      )}
      whileHover={{ 
        scale: 1.02,
        transition: { duration: 0.3 }
      }}
      onClick={onClick}
    >
      {children}
    </motion.div>
  )
} 