'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { cn } from '@/lib/utils'

interface ParallaxSectionProps {
  children: React.ReactNode
  className?: string
  speed?: number
  threshold?: number
}

export default function ParallaxSection({ 
  children, 
  className, 
  speed = 0.5, 
  threshold = 0.1 
}: ParallaxSectionProps) {
  const [ref, inView] = useInView({
    threshold,
    triggerOnce: true
  })

  return (
    <motion.div
      ref={ref}
      className={cn('relative', className)}
      initial={{ opacity: 0, y: 100 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
      transition={{ 
        duration: 0.8, 
        ease: 'easeOut',
        delay: 0.2
      }}
      style={{
        transform: inView ? `translateY(${speed * 50}px)` : 'translateY(100px)'
      }}
    >
      {children}
    </motion.div>
  )
} 