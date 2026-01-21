'use client'
import { type ReactNode, useId } from 'react'
import { motion, type Variants } from 'framer-motion'
import { cn } from '@/lib/utils'
import React from 'react'

type PresetType = 'fade' | 'slide' | 'scale' | 'blur' | 'blur-slide'

interface AnimatedGroupProps {
  readonly children: ReactNode
  readonly className?: string
  readonly variants?: {
    container?: Variants
    item?: Variants
  }
  readonly preset?: PresetType
}

const defaultContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const defaultItemVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}

const presetVariants: Record<PresetType, { container: Variants; item: Variants }> = {
  fade: {
    container: defaultContainerVariants,
    item: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
    },
  },
  slide: {
    container: defaultContainerVariants,
    item: {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 },
    },
  },
  scale: {
    container: defaultContainerVariants,
    item: {
      hidden: { opacity: 0, scale: 0.8 },
      visible: { opacity: 1, scale: 1 },
    },
  },
  blur: {
    container: defaultContainerVariants,
    item: {
      hidden: { opacity: 0, filter: 'blur(4px)' },
      visible: { opacity: 1, filter: 'blur(0px)' },
    },
  },
  'blur-slide': {
    container: defaultContainerVariants,
    item: {
      hidden: { opacity: 0, filter: 'blur(4px)', y: 20 },
      visible: { opacity: 1, filter: 'blur(0px)', y: 0 },
    },
  },
}

export function AnimatedGroup({ children, className, variants, preset }: AnimatedGroupProps) {
  const id = useId()
  const selectedVariants = preset
    ? presetVariants[preset]
    : { container: defaultContainerVariants, item: defaultItemVariants }
  const containerVariants = variants?.container || selectedVariants.container
  const itemVariants = variants?.item || selectedVariants.item

  const childArray = React.Children.toArray(children)

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className={cn(className)}
    >
      {childArray.map((child, index) => (
        <motion.div key={`${id}-${index}`} variants={itemVariants}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  )
}
