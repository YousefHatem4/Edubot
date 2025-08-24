import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBolt, faChalkboardUser, faEnvelope, faEye, faEyeSlash, faGraduationCap, faLock, faMobileScreen, faShieldHalved, faUserGraduate } from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [role, setRole] = useState("")
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    toast.success("Signed in successfully 🎉")
    navigate("/teacher-page")
  }

  return (
    <section className='bg-gradient-to-r from-[#8E2DE2] to-[#4A00E0] p-10 md:p-0 min-h-[110vh] flex items-center justify-center flex-col px-4'>
      {/* main box */}
      <section className='w-full max-w-[448px] h-auto lg:h-[745px] rounded-[16px] border-[1px] opacity-100 bg-[#0F0B1A] shadow-[0px_25px_50px_0px_#00000040] flex items-center py-4 flex-col transition-all duration-300 ease-in-out hover:shadow-[0px_25px_50px_0px_#A259FF40]'>

        {/* title */}
        <div className='w-[64px] h-[64px] rounded-full opacity-100 bg-gradient-to-r from-[#8E2DE2] to-[#4A00E0] flex items-center justify-center transition-all duration-300 ease-in-out hover:scale-110'>
          <FontAwesomeIcon className='text-2xl text-white transition-all duration-300 ease-in-out' icon={faGraduationCap} />
        </div>
        <h1 className='text-white font-poppins font-bold text-[24px] leading-[32px] text-center mt-3 transition-all duration-300 ease-in-out'>Welcome Back</h1>
        <p className='text-[#B0B0B0] font-poppins font-normal text-[14px] leading-[20px] text-center mt-2 transition-all duration-300 ease-in-out'>
          Sign in to continue your learning journey
        </p>

        {/* form */}
        <form className='mt-8 w-full flex flex-col items-center' onSubmit={handleSubmit}>
          {/* email input */}
          <label htmlFor="email" className="block mb-3 text-white font-poppins font-medium text-[14px] w-full max-w-[382px] transition-all duration-300 ease-in-out">Email Address</label>
          <div className="relative w-full max-w-[382px] transition-all duration-300 ease-in-out">
            <FontAwesomeIcon className='absolute text-[#ADAEBC] left-3 top-[52%] -translate-y-1/2 transition-all duration-300 ease-in-out' icon={faEnvelope} />
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full ps-11 h-[50px] rounded-[12px] border border-[#374151] bg-[#111827] text-[#ADAEBC] font-poppins text-[16px] transition-all duration-300 ease-in-out focus:border-[#8E2DE2] focus:outline-none focus:ring-2 focus:ring-[#8E2DE2]"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* password input */}
          <label htmlFor="pass" className="block mb-3 mt-8 text-white font-poppins font-medium text-[14px] w-full max-w-[382px] transition-all duration-300 ease-in-out">Password</label>
          <div className="relative w-full max-w-[382px] transition-all duration-300 ease-in-out">
            <FontAwesomeIcon className='absolute text-[#ADAEBC] left-3 top-[52%] -translate-y-1/2 transition-all duration-300 ease-in-out' icon={faLock} />
            <FontAwesomeIcon
              className='absolute text-[#ADAEBC] right-3 top-[52%] -translate-y-1/2 cursor-pointer hover:text-[#A259FF] transition-all duration-300 ease-in-out'
              icon={showPassword ? faEye : faEyeSlash}
              onClick={() => setShowPassword(!showPassword)}
            />
            <input
              type={showPassword ? "text" : "password"}
              id="pass"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full ps-11 h-[50px] rounded-[12px] border border-[#374151] bg-[#111827] text-[#ADAEBC] font-poppins text-[16px] transition-all duration-300 ease-in-out focus:border-[#8E2DE2] focus:outline-none focus:ring-2 focus:ring-[#8E2DE2]"
              placeholder="Enter your password"
              required
            />
          </div>

          {/* category input */}
          <label className="block mb-4 mt-8 text-white font-poppins font-medium text-[14px] w-full max-w-[382px] transition-all duration-300 ease-in-out">Select Your Role</label>
          <div className='flex flex-col sm:flex-row gap-3 w-full max-w-[382px]'>
            {/* Student */}
            <div
              onClick={() => setRole("Student")}
              className={`flex-1 h-[70px] rounded-[12px] border flex justify-center items-center gap-3 flex-col cursor-pointer transition-all duration-300 ease-in-out ${role === "Student" ? "border-[#8E2DE2] bg-[#1F1B2E] scale-105" : "border-[#374151] bg-[#111827] hover:border-[#6B7280] hover:bg-[#1a1f2e]"}`}
            >
              <FontAwesomeIcon className={`transition-all duration-300 ease-in-out ${role === "Student" ? "text-[#A259FF]" : "text-[#ADAEBC] hover:text-[#A259FF]"}`} icon={faUserGraduate} />
              <h1 className={`transition-all duration-300 ease-in-out ${role === "Student" ? "text-[#A259FF]" : "text-[#B0B0B0] hover:text-white"} font-poppins font-medium text-[14px] text-center`}>Student</h1>
            </div>
            {/* University */}
            <div
              onClick={() => setRole("University")}
              className={`flex-1 h-[70px] rounded-[12px] border flex justify-center items-center gap-3 flex-col cursor-pointer transition-all duration-300 ease-in-out ${role === "University" ? "border-[#8E2DE2] bg-[#1F1B2E] scale-105" : "border-[#374151] bg-[#111827] hover:border-[#6B7280] hover:bg-[#1a1f2e]"}`}
            >
              <FontAwesomeIcon className={`transition-all duration-300 ease-in-out ${role === "University" ? "text-[#A259FF]" : "text-[#ADAEBC] hover:text-[#A259FF]"}`} icon={faGraduationCap} />
              <h1 className={`transition-all duration-300 ease-in-out ${role === "University" ? "text-[#A259FF]" : "text-[#B0B0B0] hover:text-white"} font-poppins font-medium text-[14px] text-center`}>University</h1>
            </div>
            {/* Teacher */}
            <div
              onClick={() => setRole("Teacher")}
              className={`flex-1 h-[70px] rounded-[12px] border flex justify-center items-center gap-3 flex-col cursor-pointer transition-all duration-300 ease-in-out ${role === "Teacher" ? "border-[#8E2DE2] bg-[#1F1B2E] scale-105" : "border-[#374151] bg-[#111827] hover:border-[#6B7280] hover:bg-[#1a1f2e]"}`}
            >
              <FontAwesomeIcon className={`transition-all duration-300 ease-in-out ${role === "Teacher" ? "text-[#A259FF]" : "text-[#ADAEBC] hover:text-[#A259FF]"}`} icon={faChalkboardUser} />
              <h1 className={`transition-all duration-300 ease-in-out ${role === "Teacher" ? "text-[#A259FF]" : "text-[#B0B0B0] hover:text-white"} font-poppins font-medium text-[14px] text-center`}>Teacher</h1>
            </div>
          </div>

          {/* forgot password link */}
          <div className="w-full max-w-[382px] flex justify-end mt-7">
            <Link
              to="/forgetpass"
              className="text-[#B0B0B0] font-poppins text-[15px] hover:text-[#A259FF] transition-all duration-300 ease-in-out"
            >
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            className='w-full max-w-[382px] cursor-pointer mt-7 h-[48px] rounded-[12px] bg-gradient-to-r from-[#8E2DE2] to-[#4A00E0] shadow-[0_0_20px_0_#A259FF80] font-poppins font-semibold text-[16px] text-white transition-all duration-300 ease-in-out hover:shadow-[0_0_25px_5px_#A259FF80] hover:scale-[1.02]'
          >
            Sign In
          </button>

          <div className='w-full max-w-[382px] h-[45px] mt-7 border-t border-t-[#1F2937]'>
            <h1 className='font-poppins mt-5 font-normal text-[14px] text-center text-[#B0B0B0] transition-all duration-300 ease-in-out'>
              Don't have an account? <Link to="/register" className='font-medium text-[#A259FF] hover:text-[#8E2DE2] transition-all duration-300 ease-in-out'> Sign up here</Link>
            </h1>
          </div>
        </form>
      </section>

      {/* last items */}
      <section className='mt-6 flex flex-col sm:flex-row items-center gap-4 sm:gap-10 transition-all duration-300 ease-in-out'>
        <div className='font-poppins text-[12px] text-[#B0B0B0] flex items-center gap-1 transition-all duration-300 ease-in-out hover:text-white'>
          <FontAwesomeIcon icon={faShieldHalved} className="transition-all duration-300 ease-in-out" />
          <p>Secure</p>
        </div>
        <div className='font-poppins text-[12px] text-[#B0B0B0] flex items-center gap-1 transition-all duration-300 ease-in-out hover:text-white'>
          <FontAwesomeIcon icon={faBolt} className="transition-all duration-300 ease-in-out" />
          <p>Fast</p>
        </div>
        <div className='font-poppins text-[12px] text-[#B0B0B0] flex items-center gap-1 transition-all duration-300 ease-in-out hover:text-white'>
          <FontAwesomeIcon icon={faMobileScreen} className="transition-all duration-300 ease-in-out" />
          <p>Mobile Ready</p>
        </div>
      </section>
    </section>
  )
}
