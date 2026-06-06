import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

export const AnimatedSection = ({ children, className = '', delay = 0, direction = 'up' }) => {
  const variants = {
    hidden: { 
      opacity: 0, 
      y: direction === 'up' ? 50 : direction === 'down' ? -50 : 0,
      x: direction === 'left' ? 50 : direction === 'right' ? -50 : 0
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      x: 0, 
      transition: { duration: 0.7, delay, ease: 'easeOut' } 
    }
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  )
}
export const HeroSection = ({ title, subtitle, backgroundImage }) => {
  return (
    <div className="relative h-48 sm:h-56 md:h-72 flex items-center justify-center text-center text-white hero-gradient overflow-hidden">
      {backgroundImage && (
        <div className="absolute inset-0 w-full h-full">
          <img 
            src={backgroundImage} 
            alt={title} 
            className="w-full h-full object-cover object-center"
          />
        </div>
      )}
      {/* Dark overlay for optimal text contrast */}
      <div className="absolute inset-0 bg-black/50"></div>
      
      <div className="relative z-10 container-custom px-4 stagger-children w-full mt-4 sm:mt-0">
        <h1 
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)] leading-tight" 
          style={{ fontFamily: 'Alexandria, sans-serif' }}
        >
          {title}
        </h1>
        {subtitle && (
          <p className="text-base sm:text-lg md:text-xl text-white font-medium drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] max-w-3xl mx-auto mt-2 sm:mt-4 px-2">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  )
}

export const SectionTitle = ({ title, subtitle, centered = true }) => {
  return (
    <div className={`mb-12 ${centered ? 'text-center' : ''} stagger-children`}>
      <h2 className="section-title gold-underline inline-block pb-4">{title}</h2>
      {subtitle && <p className="section-subtitle mt-6 max-w-2xl mx-auto">{subtitle}</p>}
    </div>
  )
}

export const Container = ({ children, className = '' }) => {
  return (
    <div className={`container-custom ${className}`}>
      {children}
    </div>
  )
}

export const Section = ({ children, className = '', bg = 'white' }) => {
  const bgClass = bg === 'gray' ? 'bg-gray-50' : bg === 'light' ? 'bg-[#f4f7f6]' : 'bg-white'
  return (
    <section className={`py-12 sm:py-16 md:py-20 lg:py-24 ${bgClass} ${className}`}>
      {children}
    </section>
  )
}

export const Card = ({ children, className = '', onClick }) => {
  return (
    <div onClick={onClick} className={`card ${onClick ? 'cursor-pointer card-hover-lift' : ''} ${className}`}>
      {children}
    </div>
  )
}

export const Button = ({ children, variant = 'primary', size = 'md', className = '', glow = false, ...props }) => {
  const baseClass = 'flex items-center justify-center gap-2 relative overflow-hidden group tracking-wide'
  
  const variantClass = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    accent: 'btn-accent',
    outline: 'btn-outline',
    white: 'bg-white text-[#0E4B33] rounded-3xl font-bold shadow-[0_10px_20px_rgba(0,0,0,0.05)] hover:shadow-[0_15px_30px_rgba(0,0,0,0.1)] hover:-translate-y-1 transition-all duration-300',
  }[variant]
  
  const sizeClass = {
    sm: '!px-6 !py-2.5 text-sm',
    md: '',
    lg: '!px-10 !py-5 text-lg',
  }[size]

  return (
    <button className={`${baseClass} ${variantClass} ${sizeClass} ${glow ? 'btn-glow' : ''} ${className}`} {...props}>
      {children}
      {/* Ripple effect overlay on hover */}
      <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </button>
  )
}

export const Badge = ({ children, variant = 'primary', className = '' }) => {
  const variantClass = {
    primary: 'bg-[#0E4B33] text-white',
    secondary: 'bg-[#C89B3C] text-white',
    accent: 'bg-[#E3B14D] text-white',
    success: 'bg-emerald-500 text-white',
    warning: 'bg-amber-500 text-white',
    danger: 'bg-rose-500 text-white',
  }[variant]

  return (
    <span className={`px-3 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase shadow-sm ${variantClass} ${className}`}>
      {children}
    </span>
  )
}

export const Grid = ({ children, cols = 3, className = '' }) => {
  const colClass = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
    5: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5',
    6: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6',
  }[cols] || 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'

  return (
    <div className={`grid ${colClass} gap-6 sm:gap-8 md:gap-10 ${className}`}>
      {children}
    </div>
  )
}

export const Skeleton = ({ type = 'text', count = 1, className = '' }) => {
  const getClass = () => {
    switch(type) {
      case 'title': return 'skeleton-title'
      case 'image': return 'skeleton-image'
      case 'card': return 'skeleton-card'
      case 'avatar': return 'skeleton w-12 h-12 rounded-full'
      case 'text':
      default: return 'skeleton-text'
    }
  }

  if (type === 'card') {
    return (
      <>
        {Array(count).fill(0).map((_, i) => (
          <div key={i} className={`skeleton-card ${className}`}>
            <div className="skeleton-image"></div>
            <div className="skeleton-title"></div>
            <div className="skeleton-text"></div>
            <div className="skeleton-text w-1/2"></div>
          </div>
        ))}
      </>
    )
  }

  return (
    <>
      {Array(count).fill(0).map((_, i) => (
        <div key={i} className={`${getClass()} ${className}`}></div>
      ))}
    </>
  )
}
