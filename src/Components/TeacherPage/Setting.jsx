import React, { useState } from 'react'

export default function Setting() {
  const [enabled, setEnabled] = useState(true); // default ON

  return (
    <>
      <section className='flex items-center justify-center px-4'>
        <section className='w-full max-w-[672px] mt-8 md:mt-30 mb-8 md:mb-10'>
          <h1 className='font-poppins mb-8 md:mb-13 font-normal text-[18px] md:text-[19.2px] leading-[100%] tracking-[0%] align-middle text-white'>
            Bot Controls
          </h1>

          <section className='flex justify-between items-center py-4 md:py-0'>
            <div className='max-w-[70%] md:max-w-none'>
              <h1 className='font-poppins mb-2 font-medium text-[15px] md:text-[16px] leading-[100%] tracking-[0%] align-middle text-[#E5E7EB]'>
                Bot Status
              </h1>
              <p className='font-poppins font-normal text-[12px] md:text-[13.33px] leading-[100%] tracking-[0%] align-middle text-[#9CA3AF]'>
                Enable or disable this bot
              </p>
            </div>

            {/* Toggle Button */}
            <div
              className='relative cursor-pointer flex-shrink-0'
              onClick={() => setEnabled(!enabled)}
            >
              {/* Track */}
              <div className='w-[56px] h-[28px] rounded-full bg-[#374151] opacity-100'></div>

              {/* Knob */}
              <div
                className={`w-[29px] h-[28px] rounded-full opacity-100 absolute top-[0.2px] transition-all duration-300 
                ${enabled
                    ? 'bg-[linear-gradient(91.27deg,#8B5CF6_0.46%,#EC4899_99.62%)] left-[27px]'
                    : 'bg-[#9CA3AF] left-0'
                  }`}
              ></div>
            </div>
          </section>

          <section className='flex justify-between items-center mt-8 md:mt-15 py-4 md:py-0'>
            <div className='max-w-[70%] md:max-w-none'>
              <h1 className='font-poppins mb-2 font-medium text-[15px] md:text-[16px] leading-[100%] tracking-[0%] align-middle text-[#E5E7EB]'>
                Reset Bot Content
              </h1>
              <p className='font-poppins font-normal text-[12px] md:text-[13.33px] leading-[100%] tracking-[0%] align-middle text-[#9CA3AF]'>
                Clear all files and training data
              </p>
            </div>

            <h1 className='font-inter me-0 md:me-5 font-normal text-[12.6px] md:text-[13.6px] leading-[24px] tracking-[0%] text-center align-middle text-[#EF4444] cursor-pointer'>Reset Content</h1>

          </section>

          <section className='w-full md:w-[682.4px] h-auto md:h-[65.6px] mt-6 md:mt-10 rounded-[8px] opacity-100 bg-[#EF44441A] border border-[#EF444433] p-3'>
            <p className='font-inter font-normal text-[11px] md:text-[11.9px] leading-[18px] md:leading-[20px] tracking-[0%] align-middle text-[#9CA3AF]'>Warning: This action cannot be undone. All uploaded files and training data will be </p>
            <p className='font-inter font-normal text-[11px] md:text-[11.9px] leading-[18px] md:leading-[20px] tracking-[0%] align-middle text-[#9CA3AF]'>permanently deleted.</p>
          </section>

          <section className='flex justify-between items-center mt-8 md:mt-13 py-4 md:py-0'>
            <div className='max-w-[70%] md:max-w-none'>
              <h1 className='font-poppins mb-2 font-medium text-[15px] md:text-[16px] leading-[100%] tracking-[0%] align-middle text-[#E5E7EB]'>
                Delete Bot
              </h1>
              <p className='font-poppins font-normal text-[12px] md:text-[13.33px] leading-[100%] tracking-[0%] align-middle text-[#9CA3AF]'>
                Permanently delete this bot
              </p>
            </div>

            <button className='w-[100px] md:w-[112.99px] cursor-pointer h-[36px] md:h-[40px] rounded-[12px] bg-[#EF4444] opacity-100 font-inter font-normal text-[12.6px] md:text-[13.6px] leading-[24px] tracking-[0%] text-center align-middle text-white'>Delete Bot</button>

          </section>

          <section className='w-full md:w-[682.4px] h-auto md:h-[65.6px] mt-6 md:mt-10 rounded-[8px] opacity-100 bg-[#EF44441A] border border-[#EF444433] p-3'>
            <p className='font-inter font-normal text-[11px] md:text-[11.9px] leading-[18px] md:leading-[20px] tracking-[0%] align-middle text-[#9CA3AF]'>Warning: This action cannot be undone. The bot and all associated data will be  </p>
            <p className='font-inter font-normal text-[11px] md:text-[11.9px] leading-[18px] md:leading-[20px] tracking-[0%] align-middle text-[#9CA3AF]'>permanently deleted.</p>
          </section>

        </section>
      </section>
    </>
  )
}