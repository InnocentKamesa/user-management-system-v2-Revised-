"use main" // Remove this line if you are not using Next.js App Router

import { motion } from "framer-motion"
import { ReactNode } from "react"

interface PageWrapperProps {
  children: ReactNode
}

// Define your animation settings
const pageVariants = {
  initial: {
    opacity: 0,
    y: 15, // Starts slightly lower
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeInOut",
    },
  },
  exit: {
    opacity: 0,
    y: -15, // Fades out while moving slightly up
    transition: {
      duration: 0.3,
    },
  },
}

export function PageWrapper({ children }: PageWrapperProps) {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="w-full h-full"
    >
      {children}
    </motion.div>
  )
}