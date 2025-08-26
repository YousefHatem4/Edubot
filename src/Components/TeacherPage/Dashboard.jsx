import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook, faChartBar, faChartLine, faClock, faGear, faGraduationCap, faHome, faRobot, faStar, faUsers, faPlusCircle, faUpload, faMagic, faBrain } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

export default function Dashboard() {
  return (
    <>
      <section className="min-h-[120vh] bg-gradient-to-r from-[#0A0710] to-[#1B0034] opacity-100 p-6">
        {/* title */}
        <section>
          <h1 className="font-inter font-bold text-[30px] leading-[36px] tracking-normal text-white">
            Teacher Dashboard
          </h1>
          <p className="font-inter mt-2 font-normal text-base leading-6 tracking-normal text-[#9CA3AF]">
            Welcome back, Sarah! Here's what's happening in your classroom today.
          </p>
        </section>

        {/* main items */}
        <section className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:flex gap-6">
          {/* item 1 */}
          <div className="w-full sm:w-auto lg:w-[262px] h-[152px] rounded-[12px] bg-gradient-to-r from-[#2E0854] to-[#1B0034] p-6 flex justify-between 
                          hover:scale-105 hover:shadow-lg hover:shadow-[#A259FF]/30 transition-all duration-300 cursor-pointer">
            <div>
              <FontAwesomeIcon className="text-[#A259FF] text-2xl " icon={faUsers} />
              <h1 className="font-inter font-bold text-[24px] text-white mt-5 -ms-1">147</h1>
              <p className="font-inter font-normal text-[14px] text-[#9CA3AF] -ms-1 mt-2">Total Students</p>
            </div>
            <div className="font-inter font-medium text-[14px] text-[#4CAF50]">+12%</div>
          </div>

          {/* item 2 */}
          <div className="w-full sm:w-auto lg:w-[262px] h-[152px] rounded-[12px] bg-gradient-to-r from-[#2E0854] to-[#1B0034] p-6 flex justify-between 
                          hover:scale-105 hover:shadow-lg hover:shadow-[#A259FF]/30 transition-all duration-300 cursor-pointer">
            <div>
              <FontAwesomeIcon className="text-[#A259FF] text-2xl " icon={faChartLine} />
              <h1 className="font-inter font-bold text-[24px] text-white mt-5 -ms-1">92%</h1>
              <p className="font-inter font-normal text-[14px] text-[#9CA3AF] -ms-1 mt-2">Completion Rate</p>
            </div>
            <div className="font-inter font-medium text-[14px] text-[#4CAF50]">+8%</div>
          </div>

          {/* item 3 */}
          <div className="w-full sm:w-auto lg:w-[262px] h-[152px] rounded-[12px] bg-gradient-to-r from-[#2E0854] to-[#1B0034] p-6 flex justify-between 
                          hover:scale-105 hover:shadow-lg hover:shadow-[#FF9800]/30 transition-all duration-300 cursor-pointer">
            <div>
              <FontAwesomeIcon className="text-[#FF9800] text-2xl " icon={faClock} />
              <h1 className="font-inter font-bold text-[24px] text-white mt-5 -ms-1">24h</h1>
              <p className="font-inter font-normal text-[14px] text-[#9CA3AF] -ms-1 mt-2">Bot Uptime</p>
            </div>
            <div className="font-inter font-medium text-[14px] text-[#FF9800]">Active</div>
          </div>

          {/* item 4 */}
          <div className="w-full sm:w-auto lg:w-[262px] h-[152px] rounded-[12px] bg-gradient-to-r from-[#2E0854] to-[#1B0034] p-6 flex justify-between 
                          hover:scale-105 hover:shadow-lg hover:shadow-[#FFD700]/30 transition-all duration-300 cursor-pointer">
            <div>
              <FontAwesomeIcon className="text-[#FF9800] text-2xl " icon={faStar} />
              <h1 className="font-inter font-bold text-[24px] text-white mt-5 -ms-1">4.8</h1>
              <p className="font-inter font-normal text-[14px] text-[#9CA3AF] -ms-1 mt-2">Avg Rating</p>
            </div>
            <div className="font-inter font-medium text-[14px] text-[#4CAF50]">+0.2</div>
          </div>
        </section>

        {/* recent students | create bot */}
        <section className="flex flex-col lg:flex-row mt-8 gap-6">
          {/* recent students */}
          <section className="w-full lg:w-[364px] h-auto lg:h-[518px] rounded-[12px] bg-[#1A1A1A] p-5 
                            hover:shadow-lg hover:shadow-[#A259FF]/20 transition-all duration-300">
            <h1 className="font-inter font-semibold text-[20px] text-white">Recent Students</h1>

            {/* student 1 */}
            <section className="w-full rounded-lg bg-gray-800 mt-7 p-4 flex items-center justify-between 
                                hover:bg-gray-700 transition-colors duration-300 cursor-pointer">
              <img src="profile image_2.jpg" className="w-12 h-12 rounded-full" alt="" />
              <div className="flex-1 px-3">
                <h1 className="font-inter font-medium text-base text-white">Alex Thompson</h1>
                <p className="font-inter text-sm text-gray-400">Last active 2 hours ago</p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#4CAF50]"></div>
                <p className="font-inter text-[12px] text-[#9CA3AF]">Online</p>
              </div>
            </section>

            {/* student 2 */}
            <section className="w-full rounded-lg bg-gray-800 mt-4 p-4 flex items-center justify-between 
                                hover:bg-gray-700 transition-colors duration-300 cursor-pointer">
              <img src="profile image_3.jpg" className="w-12 h-12 rounded-full" alt="" />
              <div className="flex-1 px-3">
                <h1 className="font-inter font-medium text-base text-white">Emma Davis</h1>
                <p className="font-inter text-sm text-gray-400">Last active 5 hours ago</p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#6B7280]"></div>
                <p className="font-inter text-[12px] text-[#9CA3AF]">Offline</p>
              </div>
            </section>

            {/* student 3 */}
            <section className="w-full rounded-lg bg-gray-800 mt-4 p-4 flex items-center justify-between 
                                hover:bg-gray-700 transition-colors duration-300 cursor-pointer">
              <img src="profile image_4.jpg" className="w-12 h-12 rounded-full" alt="" />
              <div className="flex-1 px-3">
                <h1 className="font-inter font-medium text-base text-white">Michael Chen</h1>
                <p className="font-inter text-sm text-gray-400">Last active 1 hour ago</p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#4CAF50]"></div>
                <p className="font-inter text-[12px] text-[#9CA3AF]">Online</p>
              </div>
            </section>
          </section>

          {/* create bot */}
          <Link to={'/upload'} className="flex-1">
            <div className="h-auto lg:h-[518px] rounded-[20px] bg-gradient-to-br from-[#1E0338] to-[#2D0B52] border border-[#A259FF]/30 p-8 flex flex-col justify-between relative overflow-hidden group hover:scale-[1.02] transition-all duration-300 cursor-pointer">
              {/* Background decorations */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-[#A259FF]/10 rounded-full -translate-y-20 translate-x-20"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#A259FF]/5 rounded-full -translate-x-16 translate-y-16"></div>

              {/* Animated orb */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-[#A259FF]/10 group-hover:scale-110 group-hover:opacity-50 transition-all duration-700"></div>

              {/* Content */}
              <div className="relative z-10 text-center">
                <div className="flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-[#A259FF] to-[#7B3FE4] mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                  <FontAwesomeIcon className="text-white text-3xl" icon={faPlusCircle} />
                </div>
                <h1 className="font-inter font-bold text-[28px] sm:text-[32px] text-white mb-3">
                  Create Your Bot
                </h1>
                <p className="font-inter text-[15px] sm:text-[16px] text-[#D0D0D0] mb-8 max-w-md mx-auto">
                  Build an intelligent assistant from your documents in minutes. Empower your teaching with AI.
                </p>
              </div>

              {/* Features */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 relative z-10">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#A259FF]/10 flex items-center justify-center">
                    <FontAwesomeIcon className="text-[#A259FF] text-sm" icon={faUpload} />
                  </div>
                  <span className="font-inter font-medium text-sm text-white">Upload Documents</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#A259FF]/10 flex items-center justify-center">
                    <FontAwesomeIcon className="text-[#A259FF] text-sm" icon={faMagic} />
                  </div>
                  <span className="font-inter font-medium text-sm text-white">AI Training</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#A259FF]/10 flex items-center justify-center">
                    <FontAwesomeIcon className="text-[#A259FF] text-sm" icon={faBrain} />
                  </div>
                  <span className="font-inter font-medium text-sm text-white">Smart Responses</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#A259FF]/10 flex items-center justify-center">
                    <FontAwesomeIcon className="text-[#A259FF] text-sm" icon={faGear} />
                  </div>
                  <span className="font-inter font-medium text-sm text-white">Easy Customization</span>
                </div>
              </div>

              {/* CTA Button */}
              <div className="relative z-10">
                <div className="w-full bg-gradient-to-r from-[#A259FF] to-[#7B3FE4] rounded-xl py-4 text-center group-hover:shadow-lg group-hover:shadow-[#A259FF]/30 transition-all duration-300">
                  <span className="font-inter font-semibold text-white">Get Started Now</span>
                </div>
              </div>
            </div>
          </Link>
        </section>
      </section>
    </>
  )
}
