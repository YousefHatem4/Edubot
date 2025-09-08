import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBrain, faBars, faTimes, faArrowRight, faCheck, faLightbulb, faGraduationCap, faAngleRight, faBookBookmark, faChartLine } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

export default function Home() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024)
      // Close mobile menu when resizing to desktop
      if (window.innerWidth >= 1024) {
        setIsOpen(false)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <>
      <section className='bg-[linear-gradient(117.93deg,#0F0A1F_0.23%,#1E1B29_79.52%)] min-h-screen lg:min-h-[175vh]'>
        {/* Mobile Navbar Toggle */}
        {isMobile && (
          <div className="fixed top-5 right-5 z-50 lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="w-12 h-12 rounded-lg bg-purple-700 flex items-center justify-center text-white cursor-pointer"
            >
              <FontAwesomeIcon icon={isOpen ? faTimes : faBars} className="text-xl" />
            </button>
          </div>
        )}

        {/* Navbar */}
        <nav className={`flex items-center justify-between px-4 md:px-8 lg:px-30 py-6 lg:py-10 ${isMobile ? 'fixed top-0 left-0 w-full bg-[#0F0A1F] z-40 shadow-md' : ''}`}>
          {/* title */}
          <section className='flex items-center gap-2 z-50'>
            {/* icon */}
            <div className='w-[35px] h-[35px] lg:w-[45px] lg:h-[45px] bg-[linear-gradient(135deg,#8E2DE2_5%,#4A00E0_95%)] opacity-100 rounded-[8px] flex items-center justify-center'>
              <img src="bot-1.png" className='w-[20px] h-[20px] lg:w-[30px] lg:h-[30px] object-cover' alt="EduBot Logo" />
            </div>
            {/* text */}
            <h1 className='font-semibold text-[20px] lg:text-[27.65px] leading-[100%] tracking-[0] text-white'>EduBot</h1>
          </section>

          {/* Mobile Menu Overlay */}
          {isMobile && isOpen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-70 z-30"
              onClick={() => setIsOpen(false)}
            ></div>
          )}

          {/* btns - Desktop */}
          <section className={`hidden lg:flex gap-6`}>
            <Link to={'/login'}
              className="w-[109.17px] h-[42px] rounded-[12px] border border-[#A259FF] 
             opacity-100 font-normal text-[19.2px] leading-[100%] 
             text-center text-white transition-all duration-300 ease-in-out 
             hover:shadow-[0px_3px_42.7px_0px_#A259FF40] 
             hover:scale-105 active:scale-95 flex items-center justify-center"
            >
              Login
            </Link>

            <Link to={'/register'} className='w-[111.17px] h-[42px] rounded-[12px] border border-[#FFFFFF33] 
             bg-[#8B5CF6] opacity-100 font-poppins font-normal text-[19.2px] 
             leading-[100%] text-center text-white 
             transition-all duration-300 ease-in-out 
             hover:shadow-[0px_3px_42.7px_0px_#A78BFA17] 
             hover:scale-105 active:scale-95 flex items-center justify-center'>
              Sign Up
            </Link>
          </section>

          {/* Mobile Menu */}
          {isMobile && (
            <div className={`fixed top-0 right-0 h-full w-3/4 max-w-sm bg-[#1E1B29] shadow-lg z-40 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
              <div className="flex flex-col items-center justify-center h-full space-y-8">
                <Link
                  to={'/login'}
                  className="w-3/4 h-[50px] rounded-[12px] border border-[#A259FF] opacity-100 font-normal text-[18px] text-center text-white flex items-center justify-center"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>

                <Link
                  to={'/register'}
                  className="w-3/4 h-[50px] rounded-[12px] border border-[#FFFFFF33] bg-[#8B5CF6] opacity-100 font-normal text-[18px] text-center text-white flex items-center justify-center"
                  onClick={() => setIsOpen(false)}
                >
                  Sign Up
                </Link>
              </div>
            </div>
          )}
        </nav>

        {/* main section */}
        <main className="flex flex-col lg:flex-row justify-between items-center px-4 md:px-8 lg:px-30 mt-20 lg:mt-20 gap-8 lg:gap-12 ">
          {/* left part */}
          <section className="order-2 lg:order-1 flex flex-col items-center lg:items-start">
            <div className="w-full max-w-[500px] lg:h-[214px]">
              <h1 className="opacity-100 font-bold text-[32px] md:text-[40px] lg:text-[47.78px] leading-[130%] tracking-[0] text-white text-center lg:text-left">
                Master Any Subject with{"  "}
                <span className="font-poppins font-bold text-[32px] md:text-[40px] lg:text-[47.78px] leading-[100%] tracking-[0] bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] bg-clip-text text-transparent">
                  AI-Powered Learning
                </span>
              </h1>
            </div>

            <p className="w-full max-w-[600px] mt-4 opacity-100 font-poppins font-normal text-[16px] md:text-[18px] lg:text-[19.2px] leading-[160%] tracking-[0] text-[#9CA3AF] text-center lg:text-left">
              Transform your study experience with personalized AI tutoring, adaptive quizzes, and intelligent progress tracking.
            </p>

            <Link
              to={"/login"}
              className="mt-8 lg:mt-10 flex items-center justify-center gap-4 w-full max-w-[407px] h-[60px] lg:h-[83px] rounded-[12px] bg-gradient-to-r from-[#8A38F5] to-[#A78BFA] font-poppins font-semibold text-[20px] lg:text-[27.65px] leading-[100%] text-white shadow-[0px_-7px_13.4px_0px_#4A00E02E] transition-colors duration-1000 ease-out hover:shadow-[0px_8px_36.2px_0px_#8A38F540] hover:bg-gradient-to-r hover:from-[#8B5CF6] hover:to-[#EC4899] group"
            >
              Start Learning Today
              <FontAwesomeIcon
                icon={faAngleRight}
                className="transition-transform duration-500 ease-out group-hover:translate-x-2"
              />
            </Link>

            <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 mt-8 lg:mt-10">
              <div className="flex items-center justify-center lg:justify-start gap-2 text-[14px] lg:text-[16px] font-medium">
                <h1 className="text-[#4ADE80] text-lg lg:text-2xl">✓</h1>
                <span className="text-[#9CA3AF]">Free 14-day trial</span>
              </div>
              <div className="flex items-center justify-center lg:justify-start gap-2 text-[14px] lg:text-[16px] font-medium">
                <h1 className="text-[#4ADE80] text-lg lg:text-2xl">✓</h1>
                <span className="text-[#9CA3AF]">No credit card required</span>
              </div>
            </div>
          </section>

          {/* right part */}
          <section className="order-1 lg:order-2 relative mt-4 lg:mt-0">
            <img
              src="main-image.png"
              className="w-[280px] h-[280px] md:w-[350px] md:h-[350px] lg:w-[446px] lg:h-[446px] rounded-full opacity-100 shadow-[3px_7px_46.9px_0px_#A78BFA36,0px_-5px_26.3px_0px_#4A00E040] float-animation"
              alt="AI Learning Assistant"
            />

            {/* animations */}
            <div className="w-[40px] h-[40px] md:w-[50px] md:h-[50px] lg:w-[64px] lg:h-[64px] absolute top-[40%] right-[10%] lg:top-[254px] lg:right-100 rounded-full flex items-center justify-center opacity-100 bg-[linear-gradient(180deg,rgba(236,72,153,0.5)_0%,rgba(162,89,255,0.8)_100%)] shadow-[0px_0px_20px_0px_#A259FF66] animate-move1">
              <FontAwesomeIcon
                icon={faBookBookmark}
                className="text-[#E5E7EB] text-sm md:text-base lg:text-xl"
              />
            </div>

            <div className="w-[40px] h-[40px] md:w-[50px] md:h-[50px] lg:w-[64px] lg:h-[64px] absolute left-[70%] top-[-5%] md:left-[75%] lg:left-[310px] lg:top-0 rounded-full flex items-center justify-center opacity-100 bg-[#A259FF] shadow-[0px_0px_20px_0px_#A259FF66] animate-move2">
              <FontAwesomeIcon
                icon={faGraduationCap}
                className="text-[#E5E7EB] text-sm md:text-base lg:text-xl"
              />
            </div>

            <div className="absolute flex items-center justify-center w-[30px] h-[30px] md:w-[40px] md:h-[40px] lg:w-[48px] lg:h-[48px] top-[75%] left-[85%] md:top-[80%] lg:top-[411px] lg:left-[379px] rounded-full opacity-100 bg-[linear-gradient(180deg,rgba(142,45,226,0.81)_0%,#4A00E0_100%)] animate-move3">
              <FontAwesomeIcon
                icon={faLightbulb}
                className="text-[#E5E7EB] text-xs md:text-sm lg:text-base"
              />
            </div>
          </section>
        </main>

        {/* descriptions cards */}
        <section className='px-4 md:px-8 lg:px-30 mt-20 lg:mt-40 flex flex-col lg:flex-row justify-center items-center gap-5'>
          {/* card 1 */}
          <section className='w-full max-w-[407px] flex flex-col gap-4 lg:gap-6 p-6 lg:p-10 h-auto lg:h-[279px] rounded-[14px] opacity-100 bg-[linear-gradient(122.91deg,rgba(236,72,153,0.44)_-24.09%,rgba(255,134,225,0.07)_98.73%)]'>
            <div className='w-[50px] h-[45px] lg:w-[61px] lg:h-[56px] rounded-[8px] opacity-100 bg-[linear-gradient(128.2deg,#EC4899_15.64%,rgba(134,41,87,0.57)_100%)] flex items-center justify-center'>
              <img src="bot-1.png" className='w-[25px] h-[25px] lg:w-[35px] lg:h-[35px] object-cover' alt="AI Tutoring" />
            </div>
            <h1 className='text-white font-semibold text-[22px] lg:text-[27.65px] leading-[100%] tracking-[0%]'>AI Tutoring</h1>
            <p className='text-white w-full font-medium text-[14px] lg:text-[16px] leading-[130%] tracking-[0%]'>Personalized learning paths that adapt to your pace and learning style for maximum retention.</p>
          </section>

          {/* card 2 */}
          <section className='w-full max-w-[407px] flex flex-col gap-4 lg:gap-6 p-6 lg:p-10 h-auto lg:h-[279px] rounded-[14px] opacity-100 bg-[linear-gradient(122.91deg,rgba(74,0,224,0.43)_-24.09%,rgba(96,165,250,0)_98.73%)]'>
            <div className='w-[50px] h-[45px] lg:w-[61px] lg:h-[56px] rounded-[8px] opacity-100 bg-[#3B82F6] flex items-center justify-center'>
              <img src="quezzes.png" className='object-cover w-[25px] h-[30px] lg:w-[31px] lg:h-[36px]' alt="Adaptive Quizzes" />
            </div>
            <h1 className='text-white font-semibold text-[22px] lg:text-[27.65px] leading-[100%] tracking-[0%]'>Adaptive Quizzes</h1>
            <p className='text-white w-full font-medium text-[14px] lg:text-[16px] leading-[130%] tracking-[0%]'>Smart test preparation with questions that adjust difficulty based on your performance.</p>
          </section>

          {/* card 3 */}
          <section className='w-full max-w-[407px] flex flex-col gap-4 lg:gap-6 p-6 lg:p-10 h-auto lg:h-[279px] rounded-[14px] opacity-100 bg-[linear-gradient(122.91deg,rgba(162,89,255,0.18)_-24.09%,rgba(142,45,226,0.02)_98.73%)]'>
            <div className='w-[50px] h-[45px] lg:w-[61px] lg:h-[56px] rounded-[8px] opacity-100 bg-[#A78BFA] flex items-center justify-center'>
              <FontAwesomeIcon icon={faChartLine} className='text-white text-xl lg:text-3xl'></FontAwesomeIcon>
            </div>
            <h1 className='text-white font-semibold text-[22px] lg:text-[27.65px] leading-[100%] tracking-[0%]'>Progress Tracking</h1>
            <p className='text-white w-full font-medium text-[14px] lg:text-[16px] leading-[130%] tracking-[0%]'>See your growth clearly with detailed analytics and milestone celebrations.</p>
          </section>
        </section>

        {/* footer section */}
        <footer className='h-auto lg:h-[96px] mt-20 lg:mt-40 opacity-100 bg-[linear-gradient(93.87deg,rgba(15,10,31,0.84)_-42.23%,rgba(30,27,41,0.76)_110.13%)] flex flex-col lg:flex-row items-center justify-between px-4 md:px-8 lg:px-30 py-6 lg:py-10 gap-4 lg:gap-0'>
          {/* title */}
          <section className='flex items-center gap-2'>
            {/* icon */}
            <div className='w-[35px] h-[35px] lg:w-[45px] lg:h-[45px] bg-[linear-gradient(135deg,#8E2DE2_5%,#4A00E0_95%)] opacity-100 rounded-[8px] flex items-center justify-center'>
              <img src="bot-1.png" className='w-[20px] h-[20px] lg:w-[30px] lg:h-[30px] object-cover' alt="EduBot Logo" />
            </div>
            {/* text */}
            <h1 className='font-semibold text-[20px] lg:text-[27.65px] leading-[100%] tracking-[0] text-white'>EduBot</h1>
          </section>

          {/* category */}
          <section className='flex flex-col lg:flex-row gap-3 lg:gap-5 items-center'>
            <h1 className='font-medium text-[14px] lg:text-[16px] leading-[100%] tracking-[0%] text-[#9CA3AF] hover:text-white transition-colors duration-300 ease-in-out cursor-pointer'>Privacy Policy</h1>
            <h1 className='font-medium text-[14px] lg:text-[16px] leading-[100%] tracking-[0%] text-[#9CA3AF] hover:text-white transition-colors duration-300 ease-in-out cursor-pointer'>Terms</h1>
            <h1 className='font-medium text-[14px] lg:text-[16px] leading-[100%] tracking-[0%] text-[#9CA3AF] hover:text-white transition-colors duration-300 ease-in-out cursor-pointer'>Contact</h1>
          </section>
        </footer>
      </section>
    </>
  )
}