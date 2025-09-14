import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDays,
  faCheck,
  faClock,
  faPause,
  faPlay,
  faPlus
} from "@fortawesome/free-solid-svg-icons";

export default function StudentStudyArea() {
  return <>
    <section className='min-h-[150vh] bg-[linear-gradient(117.93deg,#0F0A1F_0.23%,#1E1B29_79.52%)] p-15 flex flex-col items-center gap-20'>

      {/* title */}
      <section className=" w-[940px] h-[249px]  rounded-[10px] p-[1px] bg-[linear-gradient(90deg,#8B5CF6_0%,#3B82F6_100%)]">
        <div className="w-full h-full rounded-[9px] bg-gradient-to-b from-[#0F0A1F] to-[#1E1B29] opacity-100 flex px-10 py-15 items-center gap-7">

          <div className="w-[96px] h-[96px] rounded-full opacity-100 
  bg-[linear-gradient(91.27deg,#8B5CF6_0.46%,#EC4899_99.62%)] 
  shadow-lg shadow-black/10 flex items-center justify-center">
            <svg width="45" height="49" viewBox="0 0 45 49" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M35.2466 18.1347L34.0405 20.2605C32.906 22.26 32.3388 23.2598 31.1033 23.3471C29.8678 23.4344 29.344 22.7197 28.2966 21.2903C27.1274 19.6948 26.387 17.8199 26.1246 15.8594C25.8794 14.0277 25.7568 13.1119 25.4601 12.6622C24.9865 11.9444 24.035 11.5495 23.3237 11.1316C21.4503 10.031 20.5136 9.48069 20.2676 8.54654C20.0217 7.61239 20.5625 6.65922 21.6441 4.75288C22.7257 2.84653 23.2665 1.89336 24.1845 1.64306C25.1024 1.39275 26.0391 1.94307 27.9125 3.0437C28.6238 3.4616 29.4356 4.10271 30.2833 4.16118C30.8144 4.19782 31.6551 3.84792 33.3366 3.14814C35.1362 2.39915 37.1021 2.11423 39.0445 2.34681C40.7847 2.55519 41.6548 2.65937 42.1983 3.79183C42.7417 4.92428 42.1745 5.92405 41.04 7.92358L39.8354 10.0467M35.2466 18.1347L36.2416 18.7193C38.4364 20.0087 41.2429 19.2435 42.5101 17.0101C43.7773 14.7767 43.0253 11.9208 40.8305 10.6313L39.8354 10.0467M35.2466 18.1347L39.8354 10.0467" stroke="white" stroke-width="2" />
              <path d="M11.0417 26.7917C11.0417 29.323 8.98964 31.375 6.45833 31.375C3.92703 31.375 1.875 29.323 1.875 26.7917C1.875 24.2604 3.92703 22.2084 6.45833 22.2084C8.98964 22.2084 11.0417 24.2604 11.0417 26.7917Z" stroke="white" stroke-width="2" />
              <path d="M8.75 24.5001L24.7917 13.0417" stroke="white" stroke-width="2" stroke-linejoin="round" />
              <path d="M11.041 47.4167H27.0827" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M8.75 31.375L20.2083 47.4167" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </div>

          <div className='flex flex-col gap-5'>
            <h1 className='font-poppins font-semibold text-[33.18px] leading-[100%] tracking-[0%] align-middle text-white'>Welcome , Mohamed👋</h1>
            <h2 className='w-[730px] h-[121px] opacity-100 
   font-poppins font-semibold text-[27.65px] leading-[130%] tracking-[0%] 
   align-middle text-[#E5E7EB]'><span className='bg-[linear-gradient(91.27deg,#8B5CF6_0.46%,#EC4899_99.62%)] bg-clip-text text-transparent'>The study area</span> helps you focus on studying in general in any subjects and is a great source of income for you. We wish you success.</h2>
          </div>

        </div>
      </section>

      {/* main sections */}
      <section className='flex items-center gap-7'>

        {/* todo list */}
        <section className='w-[290px] h-[298px] opacity-100 rounded-[16px] 
  border border-[#1F2937] bg-[#111827]/50 p-5'>

          {/* title */}
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-2'>
              <div>
                <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clip-path="url(#clip0_618_18572)">
                    <path d="M5.34707 1.59298C5.69512 1.90587 5.72324 2.43673 5.41035 2.78478L2.8791 5.59728C2.72441 5.76954 2.50645 5.8715 2.27441 5.87501C2.04238 5.87853 1.8209 5.79064 1.65566 5.62892L0.245898 4.22267C-0.0810547 3.8922 -0.0810547 3.35782 0.245898 3.02736C0.572852 2.69689 1.11074 2.69689 1.4377 3.02736L2.21465 3.80431L4.15176 1.65275C4.46465 1.3047 4.99551 1.27657 5.34355 1.58947L5.34707 1.59298ZM5.34707 7.21798C5.69512 7.53087 5.72324 8.06173 5.41035 8.40978L2.8791 11.2223C2.72441 11.3945 2.50645 11.4965 2.27441 11.5C2.04238 11.5035 1.8209 11.4156 1.65566 11.2539L0.245898 9.84767C-0.0845703 9.5172 -0.0845703 8.98282 0.245898 8.65587C0.576367 8.32892 1.11074 8.3254 1.4377 8.65587L2.21465 9.43283L4.15176 7.28126C4.46465 6.93322 4.99551 6.90509 5.34355 7.21798H5.34707ZM7.8748 3.62501C7.8748 3.00275 8.37754 2.50001 8.9998 2.50001H16.8748C17.4971 2.50001 17.9998 3.00275 17.9998 3.62501C17.9998 4.24728 17.4971 4.75001 16.8748 4.75001H8.9998C8.37754 4.75001 7.8748 4.24728 7.8748 3.62501ZM7.8748 9.25001C7.8748 8.62775 8.37754 8.12501 8.9998 8.12501H16.8748C17.4971 8.12501 17.9998 8.62775 17.9998 9.25001C17.9998 9.87228 17.4971 10.375 16.8748 10.375H8.9998C8.37754 10.375 7.8748 9.87228 7.8748 9.25001ZM5.6248 14.875C5.6248 14.2527 6.12754 13.75 6.7498 13.75H16.8748C17.4971 13.75 17.9998 14.2527 17.9998 14.875C17.9998 15.4973 17.4971 16 16.8748 16H6.7498C6.12754 16 5.6248 15.4973 5.6248 14.875ZM1.6873 13.1875C2.13486 13.1875 2.56408 13.3653 2.88055 13.6818C3.19702 13.9982 3.3748 14.4275 3.3748 14.875C3.3748 15.3226 3.19702 15.7518 2.88055 16.0683C2.56408 16.3847 2.13486 16.5625 1.6873 16.5625C1.23975 16.5625 0.81053 16.3847 0.494062 16.0683C0.177594 15.7518 -0.000195323 15.3226 -0.000195323 14.875C-0.000195323 14.4275 0.177594 13.9982 0.494062 13.6818C0.81053 13.3653 1.23975 13.1875 1.6873 13.1875Z" fill="#A259FF" />
                  </g>
                  <defs>
                    <clipPath id="clip0_618_18572">
                      <path d="M0 0.25H18V18.25H0V0.25Z" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <h1 className='font-inter font-semibold text-[18px] leading-[28px] tracking-[0%] text-white'> To-Do List</h1>
            </div>
            <FontAwesomeIcon icon={faPlus} className='text-[#A259FF] cursor-pointer '></FontAwesomeIcon>
          </div>

          {/* tasks */}
          <section className='flex flex-col gap-3 mt-6'>
            {/* the task if not completed */}
            <section className=' flex items-center gap-2'>
              <div className='w-[16px] h-[16px] top-[2px] opacity-100 
  rounded-[1px]  border-black/100 border-[0.5px]  cursor-pointer
  bg-white'></div>
              <h1 className='font-inter font-normal text-[14px] leading-[20px] tracking-[0%] text-white'>Complete Math Assignment</h1>
            </section>

            {/* the task if completed */}
            <section className=' flex items-center gap-2'>
              <div className='w-[16px] h-[16px] top-[2px] opacity-100 
  rounded-[1px] bg-[#0075FF] flex items-center justify-center cursor-pointer'>
                <FontAwesomeIcon icon={faCheck} className='text-white text-sm'></FontAwesomeIcon>
              </div>
              <h1 className='font-inter font-normal text-[14px] leading-[20px] tracking-[0%] line-through text-[#B0B0B0]'>Complete Math Assignment</h1>
            </section>
          </section>

        </section>

        {/* pomodoro timer */}
        <section className='w-[290px] h-[298px] rounded-[16px] border border-[#1F2937] opacity-100 bg-[#111827]/50 p-5'>

          {/* title */}
          <div className='flex items-center gap-2'>
            <FontAwesomeIcon icon={faClock} className='text-[#A259FF] text-xl'></FontAwesomeIcon>
            <h1 className='font-inter font-semibold text-[18px] leading-[28px] tracking-[0%] text-white'>Pomodoro Timer</h1>
          </div>

          {/* clock */}
          <div className='flex items-center justify-center mt-7 flex-col'>
            <div className='w-[128px] h-[128px] opacity-100 rounded-full 
  bg-transparent border-4 border-[#374151] flex items-center justify-center'>
              <h1 className='font-inter font-bold text-[24px] leading-[32px] tracking-[0%] text-white'>25:00</h1>
            </div>
            <div className='mt-5 flex items-center gap-4'>
              <button className='w-[78.75px] h-[36px] opacity-100 rounded-[8px] 
  bg-[#A259FF] 
  font-inter font-medium text-[14px] leading-[100%] tracking-[0%] 
  text-center text-white flex items-center justify-center gap-1'>
                <FontAwesomeIcon icon={faPlay}></FontAwesomeIcon>
                Start
              </button>
              <button className='w-[85.8125px] h-[36px] opacity-100 
  rounded-[8px] bg-[#374151] 
  font-inter font-medium text-[14px] leading-[100%] tracking-[0%] 
  text-center text-white flex items-center justify-center gap-1'>
                <FontAwesomeIcon icon={faPause}></FontAwesomeIcon>
                Pause
              </button>
            </div>
          </div>

        </section>

        {/* months section */}
        <section className='w-[290px] h-[298px] opacity-100 
  rounded-[16px] border border-[#1F2937] 
  bg-[#111827]/50 p-5'>
          {/* title */}
          <div className='flex items-center gap-2'>
            <FontAwesomeIcon icon={faCalendarDays} className='text-[#A259FF] text-xl'></FontAwesomeIcon>
            <h1 className='font-inter font-semibold text-[18px] leading-[28px] tracking-[0%] text-white'>December 2024</h1>
          </div>
        </section>
      </section>

    </section>
  </>
}



