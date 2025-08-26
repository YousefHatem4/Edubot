import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook, faChartBar, faGear, faGraduationCap, faHome, faRobot, faUsers, faBars, faXmark } from '@fortawesome/free-solid-svg-icons'
import Dashboard from './Dashboard';
import Student from './Student';
import Ai from './Ai';
import Analytics from './Analytics';
import Course from './Course';
import Setting from './Setting';

export default function TeacherPage() {
  const [dashboard, setDashboard] = useState(true);
  const [student, setStudent] = useState(false);
  const [ai, setAi] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [course, setCourse] = useState(false);
  const [setting, setSetting] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <section className="flex">
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
          className={`lg:w-[256px] mt-2 md:mt-0 min-h-[100vh] fixed bg-[#0A0710] backdrop-blur-xl border-r border-white/10 p-5 flex flex-col shadow-2xl
          transform transition-transform duration-300 z-40
          ${menuOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
        >
          {/* title (hidden on mobile because it’s in topbar) */}
          <div className="hidden lg:block">
            <div className="flex items-center gap-4">
              <div className="w-[40px] h-[40px] rounded-[12px] bg-gradient-to-br from-[#A259FF] to-[#6B21FF] flex justify-center items-center shadow-lg transform transition-transform duration-300 hover:scale-110">
                <FontAwesomeIcon className="text-white text-[19px]" icon={faGraduationCap} />
              </div>
              <h1 className="font-inter font-extrabold text-[22px] text-white tracking-wide">EduBot Pro</h1>
            </div>
          </div>

          {/* nav links */}
          <section className="mt-10 flex flex-col gap-4">
            {/* Dashboard */}
            <div
              onClick={() => {
                setDashboard(true); setStudent(false); setAi(false); setAnalytics(false); setCourse(false); setSetting(false); setMenuOpen(false);
              }}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all duration-300
              ${dashboard ? 'bg-gradient-to-r from-[#A259FF] to-[#6B21FF] shadow-[0_0_20px_#A259FF80] scale-105'
                  : 'hover:bg-white/10 hover:scale-105'}`}
            >
              <FontAwesomeIcon className="text-white text-[19px]" icon={faHome} />
              <h1 className="font-inter font-medium text-[16px] text-white">Dashboard</h1>
            </div>

            {/* Students */}
            <div
              onClick={() => {
                setDashboard(false); setStudent(true); setAi(false); setAnalytics(false); setCourse(false); setSetting(false); setMenuOpen(false);
              }}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all duration-300
              ${student ? 'bg-gradient-to-r from-[#A259FF] to-[#6B21FF] shadow-[0_0_20px_#A259FF80] scale-105'
                  : 'hover:bg-white/10 hover:scale-105'}`}
            >
              <FontAwesomeIcon className="text-white text-[19px]" icon={faUsers} />
              <h1 className="font-inter font-medium text-[16px] text-white">Students</h1>
            </div>

            {/* AI Bot */}
            <div
              onClick={() => {
                setDashboard(false); setStudent(false); setAi(true); setAnalytics(false); setCourse(false); setSetting(false); setMenuOpen(false);
              }}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all duration-300
              ${ai ? 'bg-gradient-to-r from-[#A259FF] to-[#6B21FF] shadow-[0_0_20px_#A259FF80] scale-105'
                  : 'hover:bg-white/10 hover:scale-105'}`}
            >
              <FontAwesomeIcon className="text-white text-[19px]" icon={faRobot} />
              <h1 className="font-inter font-medium text-[16px] text-white">AI Bot</h1>
            </div>

            {/* Analytics */}
            <div
              onClick={() => {
                setDashboard(false); setStudent(false); setAi(false); setAnalytics(true); setCourse(false); setSetting(false); setMenuOpen(false);
              }}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all duration-300
              ${analytics ? 'bg-gradient-to-r from-[#A259FF] to-[#6B21FF] shadow-[0_0_20px_#A259FF80] scale-105'
                  : 'hover:bg-white/10 hover:scale-105'}`}
            >
              <FontAwesomeIcon className="text-white text-[19px]" icon={faChartBar} />
              <h1 className="font-inter font-medium text-[16px] text-white">Analytics</h1>
            </div>

            {/* Courses */}
            <div
              onClick={() => {
                setDashboard(false); setStudent(false); setAi(false); setAnalytics(false); setCourse(true); setSetting(false); setMenuOpen(false);
              }}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all duration-300
              ${course ? 'bg-gradient-to-r from-[#A259FF] to-[#6B21FF] shadow-[0_0_20px_#A259FF80] scale-105'
                  : 'hover:bg-white/10 hover:scale-105'}`}
            >
              <FontAwesomeIcon className="text-white text-[19px]" icon={faBook} />
              <h1 className="font-inter font-medium text-[16px] text-white">Courses</h1>
            </div>

            {/* Settings */}
            <div
              onClick={() => {
                setDashboard(false); setStudent(false); setAi(false); setAnalytics(false); setCourse(false); setSetting(true); setMenuOpen(false);
              }}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all duration-300
              ${setting ? 'bg-gradient-to-r from-[#A259FF] to-[#6B21FF] shadow-[0_0_20px_#A259FF80] scale-105'
                  : 'hover:bg-white/10 hover:scale-105'}`}
            >
              <FontAwesomeIcon className="text-white text-[19px]" icon={faGear} />
              <h1 className="font-inter font-medium text-[16px] text-white">Settings</h1>
            </div>
          </section>

          {/* profile */}
          <section className="mt-62 md:mt-55">
            <div className="w-full lg:w-[208px] h-[72px] rounded-xl bg-white/10 backdrop-blur-lg border border-white/10 p-3 flex gap-3 items-center hover:shadow-[0_0_20px_#A259FF50] transition-all duration-300">
              <img src="profile image.jpg" className="w-12 h-12 rounded-full border-2 border-[#A259FF]" alt="" />
              <div>
                <h1 className="font-inter font-semibold text-[15px] text-white">Sarah Johnson</h1>
                <p className="font-inter text-[13px] text-[#C0C0C0]">Mathematics Teacher</p>
              </div>
            </div>
          </section>
        </section>

        {/* right section */}
        <section className="md:ml-[256px] mt-15 md:mt-0 w-full">
          {dashboard && <Dashboard />}
          {student && <Student />}
          {ai && <Ai />}
          {analytics && <Analytics />}
          {course && <Course />}
          {setting && <Setting />}
        </section>
      </section>
    </>
  )
}
