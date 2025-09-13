import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faEye, faEyeSlash, faLock, faPenToSquare, faRobot, faUser, faXmark } from '@fortawesome/free-solid-svg-icons'

export default function StudentProfile() {
    const [enabled, setEnabled] = useState(false)
    const [email, setEmail] = useState("Mohamed@gmail.com")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [name, setName] = useState("Mohamed Bahaa")
    const [isEditing, setIsEditing] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        setIsEditing(false)
    }

    const handleCancel = () => {
        setIsEditing(false)
    }

    return <>
        <section className="min-h-screen bg-gradient-to-r from-[#0A0710] to-[#1B0034] opacity-100 p-4 sm:p-6 md:p-8 lg:p-15 flex flex-col items-center gap-6 md:gap-8 relative">

            {/* profile box */}
            <section className="w-full max-w-[991px] p-[1px] rounded-[10px] bg-gradient-to-r from-[#8B5CF6] to-[#3B82F6]">
                <div className="h-auto rounded-[9px] bg-gradient-to-b from-[#0F0A1F] to-[#1E1B29] px-4 sm:px-5 md:px-8 lg:px-15 py-4 sm:py-6 md:py-8 lg:py-12 flex flex-col md:flex-row justify-between gap-4 md:gap-0">
                    <div className="flex flex-col md:flex-row gap-4 md:gap-5 items-center">

                        <img src="bahaa.jpg" className='w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-[96px] lg:h-[96px] shadow-black/10 object-cover rounded-full opacity-100' alt="" />

                        <div className="flex flex-col gap-2 sm:gap-3 md:gap-4 text-center md:text-left">
                            <h1 className="font-poppins font-bold text-lg sm:text-xl md:text-[24px] lg:text-[28px] leading-[100%] tracking-[0.2px] text-[#E5E7EB]">
                                Mr. Mohamed Bahaa
                            </h1>

                            <div className="flex flex-wrap justify-center md:justify-start items-center gap-2">
                                <div className="w-auto min-w-[63px] h-[28px] px-2 rounded-full opacity-100 bg-[#A78BFA33] flex items-center justify-center">
                                    <h1 className="font-poppins font-medium text-xs sm:text-[11.9px] text-[#8B5CF6]">Teacher</h1>
                                </div>
                                <div className="w-auto min-w-[63px] h-[28px] px-2 rounded-full opacity-100 bg-[#22C55E33] flex items-center justify-center">
                                    <h1 className="font-poppins font-medium text-xs sm:text-[11.9px] text-[#22C55E]">Active</h1>
                                </div>
                            </div>

                            <p className="font-poppins font-medium text-xs sm:text-sm md:text-[14px] lg:text-[16px] text-[#9CA3AF]">
                                Member since January 15, 2023
                            </p>
                        </div>
                    </div>

                    {/* btn */}
                    <button
                        className="w-full mt-4 md:mt-0 md:w-[151px] cursor-pointer h-[42px] font-poppins flex gap-1 items-center justify-center font-normal text-sm md:text-base lg:text-[19.2px] text-white rounded-[12px] border border-[#FFFFFF33] bg-[#8B5CF6] hover:shadow-[0px_6px_35.7px_0px_#A78BFA2E] shadow-[0px_6px_15.6px_0px_#EC48991A] transition-all duration-150"
                        onClick={() => setIsEditing(true)}
                    >
                        <FontAwesomeIcon icon={faPenToSquare} />
                        Edit Profile
                    </button>
                </div>
            </section>

            {/* profile info */}
            <section className="w-full max-w-[991px] p-[1px] rounded-[16px] mx-auto mt-4 md:mt-6">
                <div className="h-auto rounded-[15px] px-4 sm:px-6 md:px-8 py-4 md:py-5 bg-gradient-to-b from-[#0F0A1F] to-[#1E1B29]">
                    <h1 className='font-poppins font-normal text-base sm:text-lg md:text-[19.2px] text-white'>
                        Profile Information
                    </h1>

                    {/* info section */}
                    <section className='mt-4 md:mt-5 flex flex-col md:flex-row gap-4 md:gap-8 lg:gap-70'>
                        {/* right part */}
                        <div className='flex flex-col gap-3 md:gap-4'>
                            <div>
                                <p className='text-[#9CA3AF] mb-1 md:mb-2 text-xs sm:text-[12px] md:text-[13.33px]'>Name</p>
                                <h1 className='text-white text-sm sm:text-[15px] md:text-[16px] font-medium'>Mr. Mohamed Bahaa</h1>
                            </div>
                            <div>
                                <p className='text-[#9CA3AF] mb-1 md:mb-2 text-xs sm:text-[12px] md:text-[13.33px]'>Email</p>
                                <h1 className='text-white text-sm sm:text-[15px] md:text-[16px] font-medium'>alex.johnson@example.com</h1>
                            </div>
                            <div>
                                <p className='text-[#9CA3AF] mb-1 md:mb-2 text-xs sm:text-[12px] md:text-[13.33px]'>Role</p>
                                <h1 className='text-white text-sm sm:text-[15px] md:text-[16px] font-medium'>Teacher</h1>
                            </div>
                        </div>

                        {/* left part */}
                        <div className='flex flex-col gap-3 md:gap-4 mt-4 md:mt-0'>
                            <div>
                                <p className='text-[#9CA3AF] mb-1 md:mb-2 text-xs sm:text-[12px] md:text-[13.33px]'>Bot Limit</p>
                                <h1 className='text-white text-sm sm:text-[15px] md:text-[16px] font-medium'>3</h1>
                            </div>
                            <div>
                                <p className='text-[#9CA3AF] mb-1 md:mb-2 text-xs sm:text-[12px] md:text-[13.33px]'>Current Bots</p>
                                <h1 className='text-white text-sm sm:text-[15px] md:text-[16px] font-medium'>2</h1>
                            </div>
                            {/* status */}
                            <section className=''>
                                <p className='text-[#9CA3AF] mb-1 md:mb-2 text-xs sm:text-[12px] md:text-[13.33px]'>Status</p>
                                <h1 className='text-[#22C55E] text-xs sm:text-[13px] md:text-[13.33px]'>Active</h1>
                            </section>
                        </div>
                    </section>
                </div>
            </section>

            {/* active boxes */}
            <section className='flex flex-col lg:flex-row items-center gap-6 md:gap-8 mt-4 md:mt-6 w-full max-w-[991px]'>
                {/* left box */}
                <section className='w-full lg:w-[533px] h-auto rounded-[16px] bg-gradient-to-b from-[#0F0A1F] to-[#1E1B29] px-4 sm:px-5 md:px-6 py-4 md:py-5 flex flex-col gap-4 md:gap-5'>
                    <h1 className='text-white text-base sm:text-lg md:text-[19.2px] font-normal'>Subscriptions</h1>
                    {/* main part */}
                    <section className='w-full h-auto rounded-[16px] flex flex-col sm:flex-row justify-between p-4 bg-[#100E17] opacity-100 gap-4 sm:gap-0'>
                        <div>
                            <h1 className='font-poppins font-semibold text-base sm:text-lg md:text-[18px] leading-[28px] text-white align-middle'>Mr.Mohamed Bahaa</h1>
                            <h2 className='font-poppins font-semibold text-base sm:text-lg md:text-[18px] leading-[28px] text-white'>Math Bot helper</h2>
                            <p className='font-poppins font-normal text-xs sm:text-sm md:text-[14px] leading-[20px] text-[#9CA3AF] align-middle'>Valid until: 2024-12-31 (365 days left)</p>
                        </div>
                        <div className='flex items-center gap-3 self-start sm:self-auto'>
                            <div className="w-auto min-w-[63px] h-[28px] px-2 rounded-full opacity-100 bg-[#22C55E33] flex items-center justify-center">
                                <h1 className="font-poppins font-medium text-xs sm:text-[11.9px] text-[#22C55E]">Active</h1>
                            </div>
                            <button className='w-auto min-w-[91px] h-[36px] px-4 rounded-[12px] bg-gradient-to-r from-[#A855F7] to-[#EC4899] font-poppins font-semibold text-xs sm:text-sm md:text-[14px] leading-[20px] text-white text-center align-middle'>
                                Manage
                            </button>
                        </div>
                    </section>
                </section>

                {/* right box */}
                <section className='w-full lg:w-[427px] h-auto md:h-[200px] rounded-[16px] bg-gradient-to-b from-[#0F0A1F] to-[#1E1B29] px-4 sm:px-5 md:px-6 py-4 md:py-5 flex flex-col gap-4 md:gap-5 lg:gap-7'>
                    <h1 className='text-white text-base sm:text-lg md:text-[19.2px] font-normal'>Active Bots</h1>

                    {/* main section */}
                    <section className='w-full h-auto rounded-[12px] px-4 py-4 flex gap-4 bg-[#100E17] opacity-100 items-center'>

                        <FontAwesomeIcon className='text-[#4ADE80] text-xl sm:text-2xl' icon={faRobot}></FontAwesomeIcon>
                        <div>
                            <h1 className='font-poppins font-semibold text-sm sm:text-base md:text-[16px] leading-[24px] text-white align-middle'>Math Bot</h1>
                            <p className='font-poppins font-normal text-xs sm:text-sm md:text-[14px] leading-[20px] text-[#9CA3AF] align-middle'>Ready to help</p>
                        </div>
                    </section>
                </section>
            </section>

            {/* requests part */}
            <section className='flex flex-col lg:flex-row items-center gap-6 md:gap-8 mt-4 md:mt-6 w-full max-w-[991px]'>
                {/* left box */}
                <section className='w-full lg:w-[533px] h-auto rounded-[16px] p-4 sm:p-5 md:p-6 flex flex-col gap-4 bg-gradient-to-b from-[#0F0A1F] to-[#1E1B29] opacity-100'>
                    <h1 className='text-white text-base sm:text-lg md:text-[19.2px] font-normal'>Requests Status</h1>

                    <div className='w-full h-auto flex flex-col sm:flex-row justify-between items-center rounded-[16px] p-4 bg-[#100E17] opacity-100 gap-2 sm:gap-0'>
                        <div>
                            <h1 className='font-poppins font-semibold text-sm sm:text-base md:text-[16px] leading-6 align-middle text-[#FFFFFF]'>History Bot</h1>
                            <p className='font-poppins font-normal text-xs sm:text-sm md:text-[14px] leading-5 align-middle text-[#9CA3AF]'>ID: HIST-101 | Requested: 2023-10-26</p>
                        </div>
                        <div className='w-auto min-w-[83px] h-[28px] px-3 py-1 rounded-full bg-[#EAB30833] opacity-100 flex items-center justify-center'>
                            <h1 className='font-poppins font-semibold text-xs sm:text-sm leading-5 text-[#FACC15]'>Pending</h1>
                        </div>
                    </div>

                    <div className='w-full h-auto flex flex-col sm:flex-row justify-between items-center rounded-[16px] p-4 bg-[#100E17] opacity-100 gap-2 sm:gap-0'>
                        <div>
                            <h1 className='font-poppins font-semibold text-sm sm:text-base md:text-[16px] leading-6 align-middle text-[#FFFFFF]'>Calculus Bot</h1>
                            <p className='font-poppins font-normal text-xs sm:text-sm md:text-[14px] leading-5 align-middle text-[#9CA3AF]'>ID: CALC-202 | Requested: 2023-10-25</p>
                        </div>
                        <div className='w-auto min-w-[83px] h-[28px] px-3 py-1 rounded-full bg-[#EF444433] opacity-100 flex items-center justify-center'>
                            <h1 className='font-poppins font-semibold text-xs sm:text-sm leading-5 text-[#F87171]'>Rejected</h1>
                        </div>
                    </div>

                    <div className='w-full h-auto flex flex-col sm:flex-row justify-between items-center rounded-[16px] p-4 bg-[#100E17] opacity-100 gap-2 sm:gap-0'>
                        <div>
                            <h1 className='font-poppins font-semibold text-sm sm:text-base md:text-[16px] leading-6 align-middle text-[#FFFFFF]'>Calculus Bot</h1>
                            <p className='font-poppins font-normal text-xs sm:text-sm md:text-[14px] leading-5 align-middle text-[#9CA3AF]'>ID: CALC-202 | Requested: 2023-10-25</p>
                        </div>
                        <div className='w-auto min-w-[83px] h-[28px] px-3 py-1 rounded-full bg-[#27C8401A] opacity-100 flex items-center justify-center'>
                            <h1 className='font-poppins font-semibold text-xs sm:text-sm leading-5 text-[#22C55E]'>Accepted</h1>
                        </div>
                    </div>
                </section>

                {/* right box */}
                <section className='w-full lg:w-[427px] h-auto rounded-[16px] p-4 sm:p-5 md:p-6 flex flex-col gap-4 bg-gradient-to-b from-[#0F0A1F] to-[#1E1B29] opacity-100'>
                    <h1 className='text-white text-base sm:text-lg md:text-[19.2px] font-normal'>Request Access to a Bot</h1>
                    <form className="flex flex-col gap-4">
                        {/* Input 1 */}
                        <input
                            type="text"
                            placeholder="Enter Bot ID"
                            className="w-full h-[53px] rounded-[12px] border-2 border-[#374151] 
               px-4 sm:px-[18px] pt-[13px] pb-[14px] bg-[#100E17] opacity-100
               font-poppins font-normal text-sm sm:text-base leading-[100%] text-[#6B7280] 
               focus:outline-none focus:border-[#8B5CF6] focus:ring-1 focus:ring-[#8B5CF6]
               hover:border-[#A78BFA] transition focus:text-white"
                        />

                        {/* Input 2 */}
                        <input
                            type="text"
                            placeholder="Optional note..."
                            className="w-full h-[100px] rounded-[12px] border-2 border-[#374151] 
               px-4 sm:px-[18px] pt-[14px] pb-[62px] bg-[#100E17] opacity-100
               font-poppins font-normal text-sm sm:text-base leading-6 text-[#6B7280] 
               focus:outline-none focus:border-[#8B5CF6] focus:ring-1 focus:ring-[#8B5CF6]
               hover:border-[#A78BFA] transition focus:text-white"
                        />

                        <p className="font-poppins font-normal text-xs leading-4 text-[#6B7280]">
                            Your teacher will be notified of your request.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
                            {/* Primary Gradient Button */}
                            <button
                                type="submit"
                                className="w-full sm:w-[220px] h-[48px] rounded-[12px] 
                 bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] 
                 shadow-[0px_8px_36.2px_0px_#8A38F540,0px_-7px_13.4px_0px_#4A00E05C]
                 font-poppins font-normal text-base sm:text-[19.2px] leading-[100%] text-white 
                 opacity-100 cursor-pointer
                 hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]
                 transition"
                            >
                                Request Access
                            </button>

                            {/* Secondary Clear Button */}
                            <button
                                type="reset"
                                className="w-full sm:w-[167px] h-[48px] rounded-[12px] 
             border-2 border-[#374151] 
             px-4 sm:px-[26px] pt-[14px] pb-[14px] 
             font-poppins font-semibold text-xs sm:text-sm leading-5 text-center text-[#9CA3AF] 
             opacity-100 cursor-pointer
             hover:border-[#6B7280] hover:text-[#D1D5DB] 
             focus:outline-none focus:ring-2 focus:ring-[#374151]
             transition"
                            >
                                Clear
                            </button>
                        </div>
                    </form>
                </section>
            </section>

            {/* Edit Modal */}
            {isEditing && (
                <div className="fixed inset-0 bg-black bg-opacity-70 z-40 flex items-center justify-center p-4">
                    <div className="relative w-full max-w-2xl">
                        <section className='w-full rounded-[18px] bg-gradient-to-b from-[#0F0A1F] to-[#1E1B29] shadow-lg flex items-center justify-center p-4 sm:p-6 md:p-8'>
                            <section className='w-full max-w-md'>
                                <form onSubmit={handleSubmit}>
                                    <label htmlFor="name" className="block text-lg sm:text-xl md:text-[26px] text-[#E5E7EB]">Name</label>
                                    <div className="relative mt-3 md:mt-5">
                                        <FontAwesomeIcon className='absolute left-4 md:left-5 top-1/2 -translate-y-1/2 text-[#E5E7EB]' icon={faUser} />
                                        <input
                                            type="text"
                                            id="name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            className="ps-12 md:ps-14 w-full h-[50px] sm:h-[60px] md:h-[70px] rounded-[12px] border-2 border-[#E5E7EB] text-[#656567] focus:text-[#E5E7EB] focus:border-[#8E2DE2] focus:ring-2 focus:ring-[#8E2DE2]"
                                            required
                                        />
                                    </div>

                                    <label htmlFor="email" className="block mt-4 sm:mt-6 md:mt-8 text-lg sm:text-xl md:text-[26px] text-[#E5E7EB]">Email address</label>
                                    <div className="relative mt-3 md:mt-5">
                                        <FontAwesomeIcon className='absolute left-4 md:left-5 top-1/2 -translate-y-1/2 text-[#E5E7EB]' icon={faEnvelope} />
                                        <input
                                            type="email"
                                            id="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="ps-12 md:ps-14 w-full h-[50px] sm:h-[60px] md:h-[70px] rounded-[12px] border-2 border-[#E5E7EB] text-[#656567] focus:text-[#E5E7EB] focus:border-[#8E2DE2] focus:ring-2 focus:ring-[#8E2DE2]"
                                            required
                                        />
                                    </div>

                                    <label htmlFor="pass" className="block mt-4 sm:mt-6 md:mt-8 text-lg sm:text-xl md:text-[26px] text-[#E5E7EB]">Password</label>
                                    <div className="relative mt-3 md:mt-5">
                                        <FontAwesomeIcon className='absolute left-4 md:left-5 top-1/2 -translate-y-1/2 text-[#ADAEBC]' icon={faLock} />
                                        <FontAwesomeIcon
                                            className='absolute right-4 md:right-8 top-1/2 -translate-y-1/2 cursor-pointer text-[#ADAEBC] hover:text-[#A259FF]'
                                            icon={showPassword ? faEye : faEyeSlash}
                                            onClick={() => setShowPassword(!showPassword)}
                                        />
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            id="pass"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="ps-12 md:ps-14 w-full h-[50px] sm:h-[60px] md:h-[70px] rounded-[12px] border-2 border-[#E5E7EB] text-[#656567] focus:text-[#E5E7EB] focus:border-[#8E2DE2] focus:ring-2 focus:ring-[#8E2DE2]"
                                            placeholder="*********"
                                            required
                                        />
                                    </div>

                                    <div className='mt-6 sm:mt-7 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center'>
                                        <button type="submit" className='w-full sm:w-[224px] h-[50px] sm:h-[59px] rounded-[12px] bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA] text-white'>Save Updates</button>
                                        <button type="button" onClick={handleCancel} className='w-full sm:w-[188px] h-[50px] sm:h-[59px] rounded-[12px] bg-[#6B7280] text-white'>Cancel</button>
                                    </div>
                                </form>
                            </section>

                            <section
                                className='w-6 h-6 sm:w-[31px] sm:h-[31px] absolute top-3 right-3 sm:top-4 sm:right-4 rounded-full bg-[#E5E5E5] flex items-center justify-center cursor-pointer'
                                onClick={handleCancel}
                            >
                                <FontAwesomeIcon icon={faXmark} className="text-gray-800 text-xs sm:text-base" />
                            </section>
                        </section>
                    </div>
                </div>
            )}
        </section>
    </>
}