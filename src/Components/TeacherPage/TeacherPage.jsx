import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook, faChartBar, faGear, faGraduationCap, faHome, faRobot, faUsers, faBars, faXmark, faPlusCircle, faUser, faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import Dashboard from './Dashboard';
import Ai from './Ai';
import Setting from './Setting';
import CreateChat from './CreateChat';
import Profile from './Profile';
import { Link } from 'react-router-dom';

export default function TeacherPage() {
  const [dashboard, setDashboard] = useState(true);
  const [ai, setAi] = useState(false);
  const [Chatbot, setChatbot] = useState(false);
  const [profile, setProfile] = useState(false);
  const [setting, setSetting] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* full page wrapper */}
      <section className="flex flex-col min-h-screen">
        {/* main body (sidebar + content) */}
        <section className="flex flex-1">
          {/* mobile top bar */}
          <div className="lg:hidden fixed top-0 left-0 w-full bg-[#0A0710] z-50 flex justify-between items-center px-4 py-3 shadow-md">
            <div className="flex items-center gap-3">
              <div className="w-[36px] h-[36px] rounded-[10px] bg-gradient-to-br from-[#A259FF] to-[#6B21FF] flex justify-center items-center">
                <FontAwesomeIcon className="text-white text-[16px]" icon={faGraduationCap} />
              </div>
              <h1 className="font-inter font-extrabold text-[18px] text-white">EduBot Pro</h1>
            </div>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-white text-xl focus:outline-none cursor-pointer"
            >
              <FontAwesomeIcon icon={menuOpen ? faXmark : faBars} />
            </button>
          </div>

          {/* left sidebar */}
          <section
            className={`lg:w-[350px] mt-2 md:mt-0 min-h-[100vh] fixed bg-[#0F0A1F] backdrop-blur-xl border-r border-white/10 p-5 flex flex-col shadow-2xl
            transform transition-transform duration-300 
            ${menuOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
          >
            {/* title (hidden on mobile because it’s in topbar) */}
            <div className="hidden lg:block">
              <div className="flex items-center gap-3">
                <div className="w-[45px] h-[45px] rounded-[8px] bg-[linear-gradient(135deg,#8E2DE2_5%,#4A00E0_95%)] flex justify-center items-center shadow-lg transform transition-transform duration-300 hover:scale-110">
                  <img src="bot-1.png" className='w-[20px] h-[20px] lg:w-[30px] lg:h-[30px] object-cover' alt="EduBot Logo" />
                </div>
                <h1 className="font-inter font-semibold text-[27.65px] text-white tracking-wide">EduBot </h1>
              </div>
            </div>

            {/* nav links */}
            <section className="mt-10 flex flex-col gap-6">
              {/* Dashboard */}
              <div
                onClick={() => {
                  setDashboard(true); setAi(false); setChatbot(false); setProfile(false); setSetting(false); setMenuOpen(false);
                }}
                className={`flex items-center gap-3 px-4 py-3 rounded-[4.31px] cursor-pointer transition-all duration-300
                ${dashboard ? 'bg-[linear-gradient(91.27deg,#8B5CF6_0.46%,#EC4899_99.62%)] shadow-[0px_8.63px_39.03px_0px_#8A38F540,0px_-7.55px_14.45px_0px_#4A00E05C] scale-105'
                  : 'hover:bg-[linear-gradient(91.27deg,rgba(139,92,246,0.5)_0.46%,rgba(236,72,153,0.5)_99.62%)] hover:scale-105'}`}
              >
                <FontAwesomeIcon className="text-white text-2xl" icon={faHome} />
                <h1 className=" font-semibold text-[17.25px] leading-[25.88px] tracking-[1%] text-white">Dashboard</h1>
              </div>

              {/* AI Bot */}
              <div
                onClick={() => {
                  setDashboard(false);  setAi(true); setChatbot(false); setProfile(false); setSetting(false); setMenuOpen(false);
                }}
                className={`flex items-center gap-3 px-4 py-3 rounded-[4.31px] cursor-pointer transition-all duration-300
                ${ai ? 'bg-[linear-gradient(91.27deg,#8B5CF6_0.46%,#EC4899_99.62%)] shadow-[0px_8.63px_39.03px_0px_#8A38F540,0px_-7.55px_14.45px_0px_#4A00E05C] scale-105'
                  : 'hover:bg-[linear-gradient(91.27deg,rgba(139,92,246,0.5)_0.46%,rgba(236,72,153,0.5)_99.62%)] hover:scale-105'}`}
              >
                <img src="bot-1.png" className='w-[20px] h-[20px] lg:w-[30px] lg:h-[30px] object-cover' alt="EduBot Logo" />
                <h1 className=" font-semibold text-[17.25px] leading-[25.88px] tracking-[1%] text-white">Chatbot</h1>
              </div>

              {/* Create chatbot */}
              <div
                onClick={() => {
                  setDashboard(false);  setAi(false); setChatbot(true); setProfile(false); setSetting(false); setMenuOpen(false);
                }}
                className={`flex items-center gap-3 px-4 py-3 rounded-[4.31px] cursor-pointer transition-all duration-300
                ${Chatbot ? 'bg-[linear-gradient(91.27deg,#8B5CF6_0.46%,#EC4899_99.62%)] shadow-[0px_8.63px_39.03px_0px_#8A38F540,0px_-7.55px_14.45px_0px_#4A00E05C] scale-105'
                  : 'hover:bg-[linear-gradient(91.27deg,rgba(139,92,246,0.5)_0.46%,rgba(236,72,153,0.5)_99.62%)] hover:scale-105'}`}
              >
                <FontAwesomeIcon className="text-white text-2xl" icon={faPlusCircle} />
                <h1 className=" font-semibold text-[17.25px] leading-[25.88px] tracking-[1%] text-white">Create Chatbot</h1>
              </div>

              {/* Profile */}
              <div
                onClick={() => {
                  setDashboard(false); setAi(false); setChatbot(false); setProfile(true); setSetting(false); setMenuOpen(false);
                }}
                className={`flex items-center gap-3 px-4 py-3 rounded-[4.31px] cursor-pointer transition-all duration-300
                ${profile ? 'bg-[linear-gradient(91.27deg,#8B5CF6_0.46%,#EC4899_99.62%)] shadow-[0px_8.63px_39.03px_0px_#8A38F540,0px_-7.55px_14.45px_0px_#4A00E05C] scale-105'
                  : 'hover:bg-[linear-gradient(91.27deg,rgba(139,92,246,0.5)_0.46%,rgba(236,72,153,0.5)_99.62%)] hover:scale-105'}`}
              >
                <FontAwesomeIcon className="text-white text-2xl" icon={faUser} />
                <h1 className=" font-semibold text-[17.25px] leading-[25.88px] tracking-[1%] text-white">Profile</h1>
              </div>

              {/* Settings */}
              <div
                onClick={() => {
                  setDashboard(false);  setAi(false); setChatbot(false); setProfile(false); setSetting(true); setMenuOpen(false);
                }}
                className={`flex items-center gap-3 px-4 py-3 rounded-[4.31px] cursor-pointer transition-all duration-300
                ${setting ? 'bg-[linear-gradient(91.27deg,#8B5CF6_0.46%,#EC4899_99.62%)] shadow-[0px_8.63px_39.03px_0px_#8A38F540,0px_-7.55px_14.45px_0px_#4A00E05C] scale-105'
                  : 'hover:bg-[linear-gradient(91.27deg,rgba(139,92,246,0.5)_0.46%,rgba(236,72,153,0.5)_99.62%)] hover:scale-105'}`}
              >
                <FontAwesomeIcon className="text-white text-2xl" icon={faGear} />
                <h1 className=" font-semibold text-[17.25px] leading-[25.88px] tracking-[1%] text-white">Settings</h1>
              </div>

              {/* Logout */}
              <Link to={'/login'}
                className={`flex items-center md:mt-10 gap-3 px-4 py-3 rounded-[4.31px] cursor-pointer transition-all duration-300 hover:bg-[linear-gradient(91.27deg,rgba(139,92,246,0.5)_0.46%,rgba(236,72,153,0.5)_99.62%)] hover:scale-105
                `}>
                <FontAwesomeIcon className="text-[#EF4444] text-3xl" icon={faRightFromBracket} />
                <h1 className=" font-semibold text-[17.25px] leading-[25.88px] tracking-[1%] text-white">Logout</h1>
              </Link>
            </section>
          </section>

          {/* right content */}
          <section className="md:ml-[350px] mt-15 md:mt-0 w-full">
            {dashboard && <Dashboard />}
            {ai && <Ai />}
            {Chatbot && <CreateChat />}
            {profile && <Profile />}
            {setting && <Setting />}
          </section>
        </section>

        {/* footer section */}
        <footer className='h-auto z-100 lg:h-[96px] opacity-100 bg-[linear-gradient(93.87deg,#0A0716_-42.23%,#1A1726_110.13%)] flex flex-col lg:flex-row items-center justify-between px-4 md:px-8 lg:px-30 py-6 lg:py-10 gap-4 lg:gap-0'>
          {/* title */}
          <section className='flex items-center gap-2'>
            <div className='w-[35px] h-[35px] lg:w-[45px] lg:h-[45px] bg-[linear-gradient(135deg,#8E2DE2_5%,#4A00E0_95%)] opacity-100 rounded-[8px] flex items-center justify-center'>
              <img src="bot-1.png" className='w-[20px] h-[20px] lg:w-[30px] lg:h-[30px] object-cover' alt="EduBot Logo" />
            </div>
            <h1 className='font-semibold text-[20px] lg:text-[27.65px] leading-[100%] tracking-[0] text-white'>EduBot</h1>
          </section>

          {/* category */}
          <section className='flex flex-col lg:flex-row gap-3 lg:gap-5 items-center'>
            <h1 className='font-medium text-[14px] lg:text-[16px] text-[#9CA3AF] hover:text-white transition-colors cursor-pointer'>Privacy Policy</h1>
            <h1 className='font-medium text-[14px] lg:text-[16px] text-[#9CA3AF] hover:text-white transition-colors cursor-pointer'>Terms</h1>
            <h1 className='font-medium text-[14px] lg:text-[16px] text-[#9CA3AF] hover:text-white transition-colors cursor-pointer'>Contact</h1>
          </section>
        </footer>
      </section>
    </>
  )
}
