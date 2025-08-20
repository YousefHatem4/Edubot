import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBrain, faBars, faTimes, faArrowRight, faCheck, faLightbulb, faGraduationCap } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

export default function Home() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Navbar */}
      <nav className="w-full h-[75px] bg-[#0F0B1A] flex items-center justify-between px-6 md:px-18 border-b border-white/10 relative">
        {/* Left - Logo */}
        <div className="flex items-center gap-2">
          <div className="w-[40px] h-[40px] bg-gradient-to-r from-[#8628e1] from-30% via-[#6A19E0] to-[#5004e0] to-70% rounded-lg flex items-center justify-center">
            <FontAwesomeIcon icon={faBrain} className="text-white text-lg " />
          </div>
          <span className="font-bold text-xl leading-[28px] text-[#FFFFFF]">EduBot</span>
        </div>

        {/* Right - Buttons */}
        <div className="hidden md:flex items-center gap-6">
          <Link
            to={'/login'}
            className="relative text-[#B0B0B0] leading-[100%] transition-colors duration-300 hover:text-white
             after:content-[''] after:absolute after:left-0 after:bottom-[-2px] after:w-0 after:h-[2px] after:bg-gradient-to-r after:from-[#8E2DE2] after:to-[#4A00E0] after:transition-all after:duration-300 hover:after:w-full"
          >
            Login
          </Link>

          <Link
            to={'/register'}
            className="px-5 py-1.5 rounded-lg border border-white/30 bg-white/5 text-white text-sm
             transition-transform duration-500 ease-in-out
             hover:bg-gradient-to-r hover:from-[#8E2DE2] hover:to-[#4A00E0] hover:border-transparent
             hover:scale-105"
          >
            Sign Up
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white text-2xl cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          <FontAwesomeIcon icon={isOpen ? faTimes : faBars} />
        </button>

        {isOpen && (
          <div className="absolute top-[75px] left-0 w-full bg-[#0F0B1A] border-t border-white/10 flex flex-col items-center gap-4 py-6 md:hidden z-50 transition-all duration-300">
            <Link
              to={'/login'}
              onClick={() => setIsOpen(false)}
              className="text-[#B0B0B0] transition-colors duration-300 hover:text-white"
            >
              Login
            </Link>
            <Link
              to={'/register'}
              onClick={() => setIsOpen(false)}
              className="px-5 py-1.5 rounded-lg border border-white/30 bg-white/5 text-white text-sm
       transition-transform duration-500 ease-in-out
       hover:bg-gradient-to-r hover:from-[#8E2DE2] hover:to-[#4A00E0] hover:border-transparent
       hover:scale-105"
            >
              Sign Up
            </Link>
          </div>
        )}

      </nav>

      {/* main section */}
      <main className='bg-gradient-to-r from-[#291343] to-[#0f0b1a] relative min-h-[90.3vh] flex flex-col lg:flex-row justify-center items-center gap-10 overflow-hidden px-6 py-12 lg:py-0'>

        {/* left section */}
        <section className='flex flex-col items-center lg:items-start gap-6 max-w-[500px] order-2 lg:order-1 text-center lg:text-left'>
          {/* Title */}
          <h1 className='font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#A259FF] to-[#8E2DE2] text-4xl sm:text-5xl lg:text-[56px] leading-[1.2]'>
            Master Any Subject with <br className="hidden sm:block" /> AI-Powered Learning
          </h1>

          {/* Description */}
          <p className='text-base sm:text-lg text-[#B0B0B0] leading-[28px] z-10'>
            Transform your study experience with <span className='text-white font-medium'>personalized AI tutoring</span>,
            adaptive quizzes, and intelligent progress tracking.
          </p>

          {/* CTA Button */}
          <Link
            to={'/upload'}
            className="w-full sm:w-[280px] z-10 h-[60px] bg-[#A259FF] shadow-[0_0_20px_rgba(162,89,255,0.4)] rounded-xl font-semibold text-[18px] flex items-center justify-center gap-3 text-white transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-[0_0_30px_rgba(162,89,255,0.7)]"
          >
            Start Learning Today
            <FontAwesomeIcon icon={faArrowRight} />
          </Link>

          {/* Features */}
          <div className='flex flex-col sm:flex-row gap-4 sm:gap-8 mt-2'>
            <div className='flex items-center justify-center lg:justify-start gap-2 text-[15px] text-[#B0B0B0]'>
              <FontAwesomeIcon className='text-[#A259FF]' icon={faCheck} />
              <span>Free 14-day trial</span>
            </div>
            <div className='flex items-center justify-center lg:justify-start gap-2 text-[15px] text-[#B0B0B0]'>
              <FontAwesomeIcon className='text-[#A259FF]' icon={faCheck} />
              <span>No credit card required</span>
            </div>
          </div>
        </section>

        {/* right section */}
        <section className="order-1 lg:order-2 mb-8 lg:mb-0">
          <div className="relative w-[280px] h-[246px] sm:w-[400px] sm:h-[350px] lg:w-[512px] lg:h-[450px] flex items-center justify-center">
            {/* background gradient (layer 2) */}
            <div className="absolute inset-0 rounded-[16px] lg:rounded-[24px] opacity-30 bg-gradient-to-r from-[#8E2DE2] to-[#8E2DE2]/30 z-5"></div>
            {/* image (layer 1) */}
            <img
              src="main-image.png"
              alt="AI Brain"
              className="relative w-[240px] h-[206px] sm:w-[350px] sm:h-[300px] lg:w-[446px] lg:h-[384px] rounded-2xl z-10 object-cover"
            />

            {/* icon 1 - Hidden on mobile, visible on medium screens and up */}
            <div className='hidden sm:flex w-12 h-12 lg:w-16 lg:h-16 absolute top-[-15px] lg:top-[-25px] left-[280px] sm:left-[340px] lg:left-[480px] rounded-full bg-[#A259FF] items-center justify-center animate-bounce-slow'>
              <FontAwesomeIcon icon={faGraduationCap} className='text-lg lg:text-xl text-white ' />
            </div>

            {/* icon 2 - Hidden on mobile, visible on medium screens and up */}
            <div className='hidden sm:flex w-10 h-10 lg:w-12 lg:h-12 absolute top-[240px] sm:top-[300px] lg:top-[417px] left-[-10px] sm:left-[-12px] lg:left-[-15px] rounded-full bg-[#8E2DE2] items-center justify-center animate-pulse'>
              <FontAwesomeIcon className='text-lg lg:text-xl text-white ' icon={faLightbulb}></FontAwesomeIcon>
            </div>
          </div>
        </section>

        {/* circles - Hidden on mobile, visible on medium screens and up */}
        <div className="hidden sm:block w-[80px] h-[80px] lg:w-[128px] lg:h-[128px] absolute top-[40px] left-[20px] lg:top-[80px] lg:left-[40px] rounded-full bg-[rgba(162,89,255,0.2)]"></div>
        <div className="hidden sm:block w-[60px] h-[60px] lg:w-[96px] lg:h-[96px] absolute top-[250px] left-[200px] sm:top-[300px] sm:left-[250px] lg:top-[400px] lg:left-[360px] rounded-full bg-[rgba(74,0,224,0.4)] z-0"></div>
        <div className="hidden lg:block w-[192px] h-[192px] absolute top-[448px] left-[1168px] rounded-full bg-[rgba(142,45,226,0.3)]"></div>

      </main>
    </>
  )
}