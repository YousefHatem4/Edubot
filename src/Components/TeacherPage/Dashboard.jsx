import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook, faChartBar, faChartLine, faGear, faGraduationCap, faHome, faRobot, faStar, faUsers, faPlusCircle, faUpload, faMagic, faBrain, faLink, faArrowUp, faArrowDown, faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { faCopy, faClock } from '@fortawesome/free-regular-svg-icons'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'

export default function Dashboard() {
  const botID = "edb-9f3a17"; // The Bot ID you want to copy
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleCopy = () => {
    navigator.clipboard.writeText(botID)
      .then(() => {
        toast.success("Bot ID copied!"); // Shows success toast
      })
      .catch(() => {
        toast.error("Failed to copy");
      });
  }

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("physics Helper");
  const options = [
    "chemistry Helper",
    "biology Helper",
    "English Helper",
  ];

  return (
    <>
      <section className="min-h-[200vh] bg-gradient-to-r from-[#0A0710] to-[#1B0034] opacity-100 px-4 md:px-8 lg:px-20 py-6 md:py-8 lg:py-10">
        {/* welcome teacher */}
        <section className="w-full max-w-[940px] h-auto lg:h-[201px] rounded-[10px] p-[1px] bg-[linear-gradient(90deg,#8B5CF6_0%,#3B82F6_100%)] ">
          <div className="w-full h-full rounded-[10px] bg-[linear-gradient(180deg,#0F0A1F_0%,#1E1B29_100%)] p-4 md:p-5">

            <div className='flex flex-col md:flex-row justify-between gap-4 md:gap-0'>
              <h1 className='font-poppins font-bold text-[22px] md:text-[26px] lg:text-[28px] leading-[100%] tracking-[0.2px] align-middle text-white'>
                Welcome back,
                <span className='bg-gradient-to-r tracking-[1.2px] from-[rgba(139,92,246,0.9)] to-[rgba(236,72,153,0.9)] bg-clip-text text-transparent'> Mr.Ahmed</span>👋
              </h1>

              <div className='flex items-center gap-2'>
                <p className='font-medium text-[14px] md:text-[16px] leading-[100%] tracking-[0] align-middle text-[#9CA3AF]'>Bot ID</p>
                <div className='w-auto md:w-[99px] h-[24px] rounded-full px-2 md:px-3 py-[2px] opacity-100 bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] flex items-center justify-center'>
                  <p className='font-poppins font-normal text-[12px] md:text-[13.33px] leading-[100%] tracking-[0] align-middle text-white'>{botID}</p>
                </div>
                <FontAwesomeIcon className='text-[#E5E7EB] cursor-pointer text-base md:text-lg' onClick={handleCopy} icon={faCopy}></FontAwesomeIcon>
              </div>
            </div>

            <div className='mt-6 md:mt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-0'>
              <div className='flex flex-col gap-2 md:gap-4'>
                <h1 className='font-normal text-[20px] md:text-[24px] lg:text-[26.65px] leading-[100%] tracking-[0] align-middle text-white'>Physics Helper</h1>
                <p className='font-poppins font-medium text-[14px] md:text-[16px] leading-[100%] tracking-[0] align-middle text-[#9CA3AF]'>Class: Physics 101, Subject: Physics</p>
                <p className='font-poppins font-normal text-[12px] md:text-[13.33px] leading-[100%] tracking-[0] align-middle text-[#6B7280]'>Created At: 2023-09-15</p>
              </div>

              <div className="relative w-full md:w-[260px]">
                {/* Select box */}
                <div
                  className="w-full h-[38px] md:h-[42px] rounded-[8px] border-[#A78BFA] border-[1.3px] bg-[#0F0A1F] text-[#E5E7EB] px-4 md:px-[18px] py-2 md:py-[11px] font-poppins font-normal text-[12px] md:text-[13.33px] flex justify-between items-center cursor-pointer"
                  onClick={() => setOpen(!open)}
                >
                  {selected}
                  <div className="flex flex-col gap-[2px] pointer-events-none">
                    <FontAwesomeIcon
                      icon={open ? faChevronUp : faChevronDown}
                      className="text-[#9CA3AF] text-sm"
                    />
                  </div>
                </div>

                {/* Dropdown options */}
                {open && (
                  <div className="absolute w-full bg-[#0F0A1F] rounded-[8px] mt-1 shadow-lg z-10">
                    {options.map((option) => (
                      <div
                        key={option}
                        className="px-4 md:px-[18px] py-2 md:py-[11px] text-[#E5E7EB] hover:bg-[#A78BFA] cursor-pointer rounded-[8px] text-[12px] md:text-[14px]"
                        onClick={() => {
                          setSelected(option);
                          setOpen(false);
                        }}
                      >
                        {option}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* cards info */}
        <section className='mt-8 md:mt-12 lg:mt-18 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-10'>
          {/* card 1 */}
          <div className='w-full max-w-[269px] mx-auto sm:mx-0 transition-all duration-300 ease-in-out hover:shadow-[0px_8px_36.2px_0px_#8A38F540,0px_-7px_13.4px_0px_#4A00E05C] h-[160px] md:h-[181px] rounded-[18px] p-4 md:p-[19px] flex flex-col gap-3 md:gap-4 opacity-100 bg-gradient-to-b from-[#0F0A1F] to-[#1E1B29]'>
            <div className='w-[32px] h-[32px] md:w-[36px] md:h-[36px] flex items-center justify-center rounded-[12px] border border-[#FFFFFF0D] p-[6.5px_1px] opacity-100 bg-[#FFFFFF0F] backdrop-blur-[3px] z-0'>
              <FontAwesomeIcon icon={faUsers} className='text-white text-sm md:text-base'></FontAwesomeIcon>
            </div>
            <p className='font-poppins font-normal text-[12px] md:text-[13.33px] leading-[100%] tracking-[0] align-middle text-[#9CA3AF]'>Total Students</p>
            <h1 className='font-poppins font-semibold text-[24px] md:text-[27.65px] leading-[100%] tracking-[0] align-middle text-white'>1,248</h1>
            <p className='font-poppins font-normal text-[12px] md:text-[13.33px] leading-[100%] tracking-[0] align-middle text-[#9CA3AF]'>+38 this week</p>
          </div>

          {/* card 2 */}
          <div className='w-full max-w-[269px] mx-auto sm:mx-0 h-[160px] md:h-[181px] transition-all duration-300 ease-in-out hover:shadow-[0px_8px_36.2px_0px_#8A38F540,0px_-7px_13.4px_0px_#4A00E05C] rounded-[18px] p-4 md:p-[19px] flex flex-col gap-3 md:gap-4 opacity-100 bg-gradient-to-b from-[#0F0A1F] to-[#1E1B29]'>
            <div className='w-[32px] h-[32px] md:w-[36px] md:h-[36px] flex items-center justify-center rounded-[12px] border border-[#FFFFFF0D] p-[6.5px_1px] opacity-100 bg-[#FFFFFF0F] backdrop-blur-[3px]'>
              <img src="bot-1.png" className='w-[18px] h-[18px] md:w-[20px] md:h-[20px] lg:w-[25px] lg:h-[25px] object-cover' alt="EduBot Logo" />
            </div>
            <p className='font-poppins font-normal text-[12px] md:text-[13.33px] leading-[100%] tracking-[0] align-middle text-[#9CA3AF]'>Active Chatbots</p>
            <h1 className='font-poppins font-semibold text-[24px] md:text-[27.65px] leading-[100%] tracking-[0] align-middle text-white'>7</h1>
            <p className='font-poppins font-normal text-[12px] md:text-[13.33px] leading-[100%] tracking-[0] align-middle text-[#9CA3AF]'>All systems operational</p>
          </div>

          {/* card 3 */}
          <div className='w-full max-w-[269px] mx-auto sm:mx-0 h-[160px] md:h-[181px] transition-all duration-300 ease-in-out hover:shadow-[0px_8px_36.2px_0px_#8A38F540,0px_-7px_13.4px_0px_#4A00E05C] rounded-[18px] p-4 md:p-[19px] flex flex-col gap-3 md:gap-4 opacity-100 bg-gradient-to-b from-[#0F0A1F] to-[#1E1B29]'>
            <div className='w-[32px] h-[32px] md:w-[36px] md:h-[36px] flex items-center justify-center rounded-[12px] border border-[#FFFFFF0D] p-[6.5px_1px] opacity-100 bg-[#FFFFFF0F] backdrop-blur-[3px]'>
              <FontAwesomeIcon icon={faClock} className='text-white text-lg md:text-xl'></FontAwesomeIcon>
            </div>
            <p className='font-poppins font-normal text-[12px] md:text-[13.33px] leading-[100%] tracking-[0] align-middle text-[#9CA3AF]'>Bot Uptime</p>
            <h1 className='font-poppins font-semibold text-[24px] md:text-[27.65px] leading-[100%] tracking-[0] align-middle text-white'>99.9%</h1>
            <p className='font-poppins font-normal text-[12px] md:text-[13.33px] leading-[100%] tracking-[0] align-middle text-[#9CA3AF]'>Past 24h</p>
          </div>

          {/* card 4 */}
          <div className='w-full max-w-[269px] mx-auto sm:mx-0 h-[160px] md:h-[181px] transition-all duration-300 ease-in-out hover:shadow-[0px_8px_36.2px_0px_#8A38F540,0px_-7px_13.4px_0px_#4A00E05C] rounded-[18px] p-4 md:p-[19px] flex flex-col gap-3 md:gap-4 opacity-100 bg-gradient-to-b from-[#0F0A1F] to-[#1E1B29]'>
            <div className='w-[32px] h-[32px] md:w-[36px] md:h-[36px] flex items-center justify-center rounded-[12px] border border-[#FFFFFF0D] p-[6.5px_1px] opacity-100 bg-[#FFFFFF0F] backdrop-blur-[3px]'>
              <img src="box.png" className='w-[18px] h-[18px] md:w-[20px] md:h-[20px] lg:w-[25px] lg:h-[25px] object-cover' alt="EduBot Logo" />
            </div>
            <p className='font-poppins font-normal text-[12px] md:text-[13.33px] leading-[100%] tracking-[0] align-middle text-[#9CA3AF]'>Requests Today</p>
            <h1 className='font-poppins font-semibold text-[24px] md:text-[27.65px] leading-[100%] tracking-[0] align-middle text-white'>3,204</h1>
            <p className='font-poppins font-normal text-[12px] md:text-[13.33px] leading-[100%] tracking-[0] align-middle text-[#9CA3AF]'>+12% vs yesterday</p>
          </div>
        </section>

        {/* chatbots */}
        <section className='w-full max-w-[1010px] h-auto lg:h-[373px] rounded-[18px] opacity-100 bg-[#24222E] mt-8 md:mt-12 lg:mt-18 overflow-hidden mx-auto'>
          <h1 className='font-poppins p-4 md:p-6 font-semibold text-[22px] md:text-[25px] lg:text-[27.65px] leading-[100%] text-white'>
            My Chatbots
          </h1>

          {/* table */}
          <section className='mt-2 flex flex-col h-auto lg:h-[calc(100%-80px)]'>

            {/* head */}
            <div className='hidden md:grid md:grid-cols-7 font-poppins font-medium text-[14px] md:text-[16px] text-[#E5E7EB] px-4 md:px-8 shrink-0'>
              <h1>Bot Name</h1>
              <h1>Class</h1>
              <h1>Subject</h1>
              <h1>Created At</h1>
              <h1 className='ms-3 md:ms-5'>Bot ID</h1>
              <h1 className='ms-1'>Teacher_ID</h1>
              <h1 className='ms-8 md:ms-15'>Actions</h1>
            </div>

            {/* line under header */}
            <div className='hidden md:flex justify-center items-center mt-3 shrink-0'>
              <div className='w-[95%] md:w-[983px] h-0 border border-[#FFFFFF66] opacity-100'></div>
            </div>

            {/* scrollable body */}
            <div className='overflow-x-auto mt-3 px-2 scroll-hidden'>

              {/* Mobile view */}
              <div className='md:hidden space-y-4 py-2'>
                {/* row 1 mobile */}
                <div className='bg-[#2A2835] rounded-[12px] p-4'>
                  <div className='grid grid-cols-2 gap-2 mb-3'>
                    <div>
                      <p className='text-[#9CA3AF] text-xs'>Bot Name</p>
                      <p className='text-white text-sm'>Physics Helper</p>
                    </div>
                    <div>
                      <p className='text-[#9CA3AF] text-xs'>Class</p>
                      <p className='text-white text-sm'>Grade 10</p>
                    </div>
                  </div>
                  <div className='grid grid-cols-2 gap-2 mb-3'>
                    <div>
                      <p className='text-[#9CA3AF] text-xs'>Subject</p>
                      <p className='text-white text-sm'>Physics</p>
                    </div>
                    <div>
                      <p className='text-[#9CA3AF] text-xs'>Created At</p>
                      <p className='text-white text-sm'>2025-08-12</p>
                    </div>
                  </div>
                  <div className='mb-3'>
                    <p className='text-[#9CA3AF] text-xs'>Bot ID</p>
                    <div className='flex items-center gap-2'>
                      <p className='text-white text-sm'>{botID}</p>
                      <div onClick={handleCopy} className='w-[20px] h-[20px] cursor-pointer flex items-center justify-center rounded-[8px] border border-[#FFFFFF14] bg-gradient-to-r from-[rgba(139,92,246,0.35)] to-[rgba(236,72,153,0.35)]'>
                        <FontAwesomeIcon className='text-[10px]' icon={faLink} />
                      </div>
                    </div>
                  </div>
                  <div className='mb-3'>
                    <p className='text-[#9CA3AF] text-xs'>Teacher ID</p>
                    <p className='text-white text-sm'>#TCH-0931</p>
                  </div>
                  <div className='flex items-center gap-2 justify-start'>
                    <button className='w-[70px] h-[35px] rounded-[10px] border border-[#FFFFFF14] bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] font-poppins font-bold text-[10px] text-white'>
                      Manage
                    </button>
                    <button className='w-[60px] h-[35px] rounded-[10px] bg-[#EF4444] font-poppins font-bold text-[10px] text-white'>
                      Delete
                    </button>
                  </div>
                </div>


              </div>

              {/* Desktop view */}
              <div className='hidden md:block'>
                {/* row 1 */}
                <div className='grid grid-cols-7 items-center mt-5 font-poppins font-medium text-[14px] md:text-[16px] text-[#E5E7EB] px-4 md:px-5'>
                  <h1>Physics Helper</h1>
                  <h1>Grade 10</h1>
                  <h1 className='ms-2'>Physics</h1>
                  <h1>2025-08-12</h1>

                  {/* Bot ID with icon */}
                  <div className='flex items-center gap-2'>
                    <h1>{botID}</h1>
                    <div onClick={handleCopy} className='w-[22px] h-[22px] md:w-[25px] md:h-[25px] cursor-pointer flex items-center justify-center rounded-[12px] border border-[#FFFFFF14] bg-gradient-to-r from-[rgba(139,92,246,0.35)] to-[rgba(236,72,153,0.35)] shadow-[0px_8px_22px_0px_#8B5CF640]'>
                      <FontAwesomeIcon className='text-[10px] md:text-[12px]' icon={faLink} />
                    </div>
                  </div>

                  <h1>#TCH-0931</h1>

                  {/* Actions */}
                  <div className='flex items-center gap-2 md:gap-3 justify-center'>
                    <Link to={'/managebot'}>
                      <button className='w-[70px] md:w-[69px] h-[35px] md:h-[41px] rounded-[10px] md:rounded-[12px] border border-[#FFFFFF14] bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] font-poppins font-bold text-[10px] md:text-[12px] text-white'>
                        Manage
                      </button>
                    </Link>
                    <button className='w-[60px] md:w-[67px] h-[35px] md:h-[41px] rounded-[10px] md:rounded-[12px] bg-[#EF4444] font-poppins font-bold text-[10px] md:text-[12px] text-white'>
                      Delete
                    </button>
                  </div>
                </div>

                {/* line under header */}
                <div className='hidden md:flex justify-center items-center mt-3 shrink-0'>
                  <div className='w-[95%] md:w-[983px] h-0 border border-[#FFFFFF66] opacity-25'></div>
                </div>

                {/* row 2 */}
                <div className='grid grid-cols-7 items-center mt-5 font-poppins font-medium text-[14px] md:text-[16px] text-[#E5E7EB] px-4 md:px-5'>
                  <h1>Physics Helper</h1>
                  <h1>Grade 10</h1>
                  <h1 className='ms-2'>Physics</h1>
                  <h1>2025-08-12</h1>

                  {/* Bot ID with icon */}
                  <div className='flex items-center gap-2'>
                    <h1>{botID}</h1>
                    <div onClick={handleCopy} className='w-[22px] h-[22px] md:w-[25px] md:h-[25px] cursor-pointer flex items-center justify-center rounded-[12px] border border-[#FFFFFF14] bg-gradient-to-r from-[rgba(139,92,246,0.35)] to-[rgba(236,72,153,0.35)] shadow-[0px_8px_22px_0px_#8B5CF640]'>
                      <FontAwesomeIcon className='text-[10px] md:text-[12px]' icon={faLink} />
                    </div>
                  </div>

                  <h1>#TCH-0931</h1>

                  {/* Actions */}
                  <div className='flex items-center gap-2 md:gap-3 justify-center'>
                    <Link to={'/managebot'}>
                      <button className='w-[70px] md:w-[69px] h-[35px] md:h-[41px] rounded-[10px] md:rounded-[12px] border border-[#FFFFFF14] bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] font-poppins font-bold text-[10px] md:text-[12px] text-white'>
                        Manage
                      </button>
                    </Link>
                    <button className='w-[60px] md:w-[67px] h-[35px] md:h-[41px] rounded-[10px] md:rounded-[12px] bg-[#EF4444] font-poppins font-bold text-[10px] md:text-[12px] text-white'>
                      Delete
                    </button>
                  </div>
                </div>

                {/* line under header */}
                <div className='hidden md:flex justify-center items-center mt-3 shrink-0'>
                  <div className='w-[95%] md:w-[983px] h-0 border border-[#FFFFFF66] opacity-25'></div>
                </div>

                {/* row 3 */}
                <div className='grid grid-cols-7 items-center mt-5 font-poppins font-medium text-[14px] md:text-[16px] text-[#E5E7EB] px-4 md:px-5'>
                  <h1>Physics Helper</h1>
                  <h1>Grade 10</h1>
                  <h1 className='ms-2'>Physics</h1>
                  <h1>2025-08-12</h1>

                  {/* Bot ID with icon */}
                  <div className='flex items-center gap-2'>
                    <h1>{botID}</h1>
                    <div onClick={handleCopy} className='w-[22px] h-[22px] md:w-[25px] md:h-[25px] cursor-pointer flex items-center justify-center rounded-[12px] border border-[#FFFFFF14] bg-gradient-to-r from-[rgba(139,92,246,0.35)] to-[rgba(236,72,153,0.35)] shadow-[0px_8px_22px_0px_#8B5CF640]'>
                      <FontAwesomeIcon className='text-[10px] md:text-[12px]' icon={faLink} />
                    </div>
                  </div>

                  <h1>#TCH-0931</h1>

                  {/* Actions */}
                  <div className='flex items-center gap-2 md:gap-3 justify-center'>
                    <Link to={'/managebot'}>
                      <button className='w-[70px] md:w-[69px] h-[35px] md:h-[41px] rounded-[10px] md:rounded-[12px] border border-[#FFFFFF14] bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] font-poppins font-bold text-[10px] md:text-[12px] text-white'>
                        Manage
                      </button>
                    </Link>
                    <button className='w-[60px] md:w-[67px] h-[35px] md:h-[41px] rounded-[10px] md:rounded-[12px] bg-[#EF4444] font-poppins font-bold text-[10px] md:text-[12px] text-white'>
                      Delete
                    </button>
                  </div>
                </div>

                {/* line under header */}
                <div className='hidden md:flex justify-center items-center mt-3 shrink-0'>
                  <div className='w-[95%] md:w-[983px] h-0 border border-[#FFFFFF66] opacity-25'></div>
                </div>

                {/* row 4 */}
                <div className='grid grid-cols-7 items-center mt-5 font-poppins font-medium text-[14px] md:text-[16px] text-[#E5E7EB] px-4 md:px-5'>
                  <h1>Physics Helper</h1>
                  <h1>Grade 10</h1>
                  <h1 className='ms-2'>Physics</h1>
                  <h1>2025-08-12</h1>

                  {/* Bot ID with icon */}
                  <div className='flex items-center gap-2'>
                    <h1>{botID}</h1>
                    <div onClick={handleCopy} className='w-[22px] h-[22px] md:w-[25px] md:h-[25px] cursor-pointer flex items-center justify-center rounded-[12px] border border-[#FFFFFF14] bg-gradient-to-r from-[rgba(139,92,246,0.35)] to-[rgba(236,72,153,0.35)] shadow-[0px_8px_22px_0px_#8B5CF640]'>
                      <FontAwesomeIcon className='text-[10px] md:text-[12px]' icon={faLink} />
                    </div>
                  </div>

                  <h1>#TCH-0931</h1>

                  {/* Actions */}
                  <div className='flex items-center gap-2 md:gap-3 justify-center'>
                    <Link to={'/managebot'}>
                      <button className='w-[70px] md:w-[69px] h-[35px] md:h-[41px] rounded-[10px] md:rounded-[12px] border border-[#FFFFFF14] bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] font-poppins font-bold text-[10px] md:text-[12px] text-white'>
                        Manage
                      </button>
                    </Link>
                    <button className='w-[60px] md:w-[67px] h-[35px] md:h-[41px] rounded-[10px] md:rounded-[12px] bg-[#EF4444] font-poppins font-bold text-[10px] md:text-[12px] text-white'>
                      Delete
                    </button>
                  </div>
                </div>

                {/* line under header */}
                <div className='hidden md:flex justify-center items-center mt-3 shrink-0'>
                  <div className='w-[95%] md:w-[983px] h-0 border border-[#FFFFFF66] opacity-25'></div>
                </div>

              </div>
            </div>
          </section>
        </section>

        {/* Student Access Requests */}
        <section className='w-full max-w-[1010px] h-auto lg:h-[373px] rounded-[18px] bg-[#24222E] mt-8 md:mt-12 lg:mt-18 overflow-hidden mx-auto'>
          <h1 className='font-poppins p-4 md:p-6 font-semibold text-[22px] md:text-[25px] lg:text-[27.65px] text-white'>
            Student Access Requests
          </h1>

          {/* table container */}
          <section className='mt-2 flex flex-col h-auto lg:h-[calc(100%-80px)]'>

            {/* header */}
            <div className='hidden md:grid md:grid-cols-4 font-poppins font-medium text-[14px] md:text-[16px] text-[#E5E7EB] px-4 md:px-8 shrink-0'>
              <h1>Student</h1>
              <h1>Requested Bot</h1>
              <h1 className='ms-3 md:ms-5'>Status</h1>
              <h1 className='ms-15 md:ms-25'>Actions</h1>
            </div>

            {/* line under header */}
            <div className='hidden md:flex justify-center items-center mt-3 shrink-0'>
              <div className='w-[95%] md:w-[948px] h-0 border border-[#FFFFFF66] opacity-100'></div>
            </div>

            {/* scrollable body */}
            <div className='overflow-x-auto mt-3 px-2 scroll-hidden'>

              {/* Mobile view */}
              <div className='md:hidden space-y-4 py-2'>
                {/* row 1 mobile */}
                <div className='bg-[#2A2835] rounded-[12px] p-4'>
                  <div className='grid grid-cols-1 gap-2 mb-3'>
                    <div>
                      <p className='text-[#9CA3AF] text-xs'>Student</p>
                      <p className='text-white text-sm'>Ramey Elking</p>
                    </div>
                    <div>
                      <p className='text-[#9CA3AF] text-xs'>Requested Bot</p>
                      <p className='text-white text-sm'>Physics Helper</p>
                    </div>
                  </div>
                  <div className='mb-3'>
                    <p className='text-[#9CA3AF] text-xs'>Status</p>
                    <div className='w-[87px] h-[32px] rounded-[8px] border border-[#FACC154D] px-2 py-1 flex items-center justify-center mt-1'>
                      <p className='font-normal text-[12px] text-[#FDE68A]'>Pending</p>
                    </div>
                  </div>
                  <div className='flex items-center gap-2 justify-start'>
                    <button className='w-[70px] h-[35px] rounded-[10px] border border-[#FFFFFF14] bg-[#34C759B2] font-normal text-[11px] text-white'>
                      Approve
                    </button>
                    <button className='w-[60px] h-[35px] rounded-[10px] bg-[#EF4444B2] font-normal text-[11px] text-white'>
                      Reject
                    </button>
                  </div>
                </div>

                {/* Additional rows would follow the same pattern */}
              </div>

              {/* Desktop view */}
              <div className='hidden md:block'>
                {/* row 1 */}
                <div className='grid grid-cols-4 items-center mt-5 font-poppins font-medium text-[14px] md:text-[16px] text-[#E5E7EB] px-4 md:px-5'>
                  <h1>Ramey Elking</h1>
                  <h1>Physics Helper</h1>
                  <div className='w-[80px] md:w-[87px] h-[34px] md:h-[38px] rounded-[8px] md:rounded-[10px] border border-[#FACC154D] px-2 md:px-[11px] py-1 md:py-[7px] flex items-center justify-center'>
                    <h1 className='font-normal text-[12px] md:text-[13.33px] text-[#FDE68A]'>Pending</h1>
                  </div>
                  <div className='flex items-center gap-2 md:gap-3 justify-center'>
                    <button className='w-[70px] md:w-[83px] h-[35px] md:h-[43px] rounded-[10px] md:rounded-[12px] border border-[#FFFFFF14] bg-[#34C759B2] font-normal text-[11px] md:text-[13.33px] text-white'>
                      Approve
                    </button>
                    <button className='w-[60px] md:w-[67px] h-[35px] md:h-[43px] rounded-[10px] md:rounded-[12px] bg-[#EF4444B2] font-normal text-[11px] md:text-[13.33px] text-white'>
                      Reject
                    </button>
                  </div>
                </div>
                {/* line under header */}
                <div className='hidden md:flex justify-center items-center mt-3 shrink-0'>
                  <div className='w-[95%] md:w-[948px] h-0 border border-[#FFFFFF66] opacity-25'></div>
                </div>

                {/* row 2 */}
                <div className='grid grid-cols-4 items-center mt-5 font-poppins font-medium text-[14px] md:text-[16px] text-[#E5E7EB] px-4 md:px-5'>
                  <h1>Ramey Elking</h1>
                  <h1>Physics Helper</h1>
                  <div className='w-[80px] md:w-[87px] h-[34px] md:h-[38px] rounded-[8px] md:rounded-[10px] border border-[#10B9814D] px-2 md:px-[11px] py-1 md:py-[7px] flex items-center justify-center'>
                    <h1 className='font-normal text-[12px] md:text-[13.33px] text-[#B9F3DA]'>Approved</h1>
                  </div>
                  <div className='flex items-center justify-center'>
                    <button className='w-[70px] md:w-[57px] h-[41px] md:h-[43px] rounded-[10px] md:rounded-[12px] border border-[#FFFFFF14] shadow-[0_8px_22px_0_#8B5CF640] font-normal text-[11px] md:text-[13.33px] text-white'>
                      View
                    </button>

                  </div>
                </div>
                {/* line under header */}
                <div className='hidden md:flex justify-center items-center mt-3 shrink-0'>
                  <div className='w-[95%] md:w-[948px] h-0 border border-[#FFFFFF66] opacity-25'></div>
                </div>

                {/* row 3 */}
                <div className='grid grid-cols-4 items-center mt-5 font-poppins font-medium text-[14px] md:text-[16px] text-[#E5E7EB] px-4 md:px-5'>
                  <h1>Ramey Elking</h1>
                  <h1>Physics Helper</h1>
                  <div className='w-[80px] md:w-[87px] h-[34px] md:h-[38px] rounded-[8px] md:rounded-[10px] border border-[#EF444480] px-2 md:px-[11px] py-1 md:py-[7px] flex items-center justify-center'>
                    <h1 className='font-normal text-[12px] md:text-[13.33px] text-[#EF444480]'>Rejected</h1>
                  </div>
                  <div className='flex items-center justify-center'>
                    <button className='w-[70px] md:w-[57px] h-[41px] md:h-[43px] rounded-[10px] md:rounded-[12px] border border-[#FFFFFF14] shadow-[0_8px_22px_0_#8B5CF640] font-normal text-[11px] md:text-[13.33px] text-white'>
                      View
                    </button>

                  </div>
                </div>
                {/* line under header */}
                <div className='hidden md:flex justify-center items-center mt-3 shrink-0'>
                  <div className='w-[95%] md:w-[948px] h-0 border border-[#FFFFFF66] opacity-25'></div>
                </div>

                {/* row 4 */}
                <div className='grid grid-cols-4 items-center mt-5 font-poppins font-medium text-[14px] md:text-[16px] text-[#E5E7EB] px-4 md:px-5'>
                  <h1>Ramey Elking</h1>
                  <h1>Physics Helper</h1>
                  <div className='w-[80px] md:w-[87px] h-[34px] md:h-[38px] rounded-[8px] md:rounded-[10px] border border-[#EF444480] px-2 md:px-[11px] py-1 md:py-[7px] flex items-center justify-center'>
                    <h1 className='font-normal text-[12px] md:text-[13.33px] text-[#EF444480]'>Rejected</h1>
                  </div>
                  <div className='flex items-center justify-center'>
                    <button className='w-[70px] md:w-[57px] h-[41px] md:h-[43px] rounded-[10px] md:rounded-[12px] border border-[#FFFFFF14] shadow-[0_8px_22px_0_#8B5CF640] font-normal text-[11px] md:text-[13.33px] text-white'>
                      View
                    </button>

                  </div>
                </div>
                {/* line under header */}
                <div className='hidden md:flex justify-center items-center mt-3 shrink-0'>
                  <div className='w-[95%] md:w-[948px] h-0 border border-[#FFFFFF66] opacity-25'></div>
                </div>
              </div>
            </div>
          </section>
        </section>
      </section>
    </>
  )
}