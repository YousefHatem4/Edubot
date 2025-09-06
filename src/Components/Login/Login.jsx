import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight, faBolt, faChalkboardUser, faEnvelope, faEye, faEyeSlash, faGraduationCap, faLock, faMobileScreen, faShieldHalved, faUserGraduate } from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [role, setRole] = useState("")
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024)
  const navigate = useNavigate()

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    toast.success("Signed in successfully 🎉")
    navigate("/teacher-page")
  }

  return (
    <section className='bg-[linear-gradient(116.66deg,#0F0A1F_1.16%,#1E1B29_94.74%)] p-4 md:p-6 lg:p-10 min-h-screen flex items-center justify-center flex-col'>
      {/* main box */}
      <section className='w-full max-w-[614px] h-auto lg:h-[651px] rounded-[16px] opacity-100 bg-[#0F0B1A1A]  py-6 lg:py-4 transition-all duration-300 ease-in-out shadow-[0px_25px_50px_0px_#A259FF40]'>

        {/* title */}
        <h1 className='font-semibold text-[28px] md:text-[33.18px] leading-[100%] tracking-[0%] text-center text-[#E5E7EB] mt-4 lg:mt-0'>Welcome Back</h1>
        <p className='mt-3 font-normal text-[18px] md:text-[22px] leading-[100%] tracking-[0%] text-center text-[#8C8C8C]'>
          Sign in to your account
        </p>

        <form className='mt-6 lg:mt-8 px-4 md:px-6 lg:px-10' onSubmit={handleSubmit}>
          {/* email input */}
          <label htmlFor="email" className="block font-normal text-[20px] md:text-[26.65px] leading-[100%] tracking-[0%] text-[#E5E7EB]">Email address</label>
          <div className="relative mt-3 md:mt-5">
            <FontAwesomeIcon className='absolute text-[#E5E7EB] left-4 md:left-5 top-[52%] -translate-y-1/2 transition-all duration-300 ease-in-out text-sm md:text-base' icon={faEnvelope} />
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="ps-12 md:ps-14 w-full h-[60px] md:h-[70px] lg:h-[82px] rounded-[12px] opacity-100 border-2 border-[#E5E7EB] font-poppins font-normal text-[16px] md:text-[19.2px] leading-[100%] tracking-[0%] text-[#656567] transition-all duration-300 ease-in-out focus:text-[#E5E7EB] focus:border-[#8E2DE2] focus:outline-none focus:ring-2 focus:ring-[#8E2DE2]"
              placeholder="EX:Mohamed@gmail.com"
              required
            />
          </div>

          {/* pass input */}
          <label htmlFor="pass" className="block mt-6 md:mt-8 font-normal text-[20px] md:text-[26.65px] leading-[100%] tracking-[0%] text-[#E5E7EB]">Password</label>
          <div className="relative mt-3 md:mt-5">
            <FontAwesomeIcon className='absolute text-[#ADAEBC] left-4 md:left-5 top-[52%] -translate-y-1/2 transition-all duration-300 ease-in-out text-sm md:text-base' icon={faLock} />
            <FontAwesomeIcon
              className='absolute text-[#ADAEBC] right-4 md:right-8 top-[52%] -translate-y-1/2 cursor-pointer hover:text-[#A259FF] transition-all duration-300 ease-in-out text-sm md:text-base'
              icon={showPassword ? faEye : faEyeSlash}
              onClick={() => setShowPassword(!showPassword)}
            />
            <input
              type={showPassword ? "text" : "password"}
              id="pass"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="ps-12 md:ps-14 w-full h-[60px] md:h-[70px] lg:h-[82px] rounded-[12px] opacity-100 border-2 border-[#E5E7EB] font-poppins font-normal text-[16px] md:text-[19.2px] leading-[100%] tracking-[0%] text-[#656567] transition-all duration-300 ease-in-out focus:text-[#E5E7EB] focus:border-[#8E2DE2] focus:outline-none focus:ring-2 focus:ring-[#8E2DE2]"
              placeholder="Enter your password"
              required
            />
          </div>

          <div className='flex items-center justify-center mt-6 md:mt-8'>
            <button
              className="flex items-center justify-center gap-5 w-full max-w-[477px] h-[60px] md:h-[70px] lg:h-[83px] rounded-[12px] bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA] font-semibold text-[18px] md:text-[22px] lg:text-[27.65px] leading-[100%] text-white shadow-[0px_-7px_13.4px_0px_#4A00E02E] transition-colors duration-1000 ease-out hover:shadow-[0px_8px_36.2px_0px_#8A38F540] hover:bg-gradient-to-r hover:from-[#8B5CF6] hover:to-[#EC4899] group"
            >
              Sign in
              <FontAwesomeIcon
                icon={faAngleRight}
                className="transition-transform duration-500 ease-out group-hover:translate-x-2"
              />
            </button>
          </div>
          <div className='mt-8 md:mt-12'>
            <h1 className='font-medium text-[14px] md:text-[16px] leading-[100%] tracking-[0%] text-center text-[#E5E7EB]'>
              Don't have an account? <Link to="/register" className='font-medium text-[#8B5CF6] hover:text-[#8E2DE2] transition-all duration-300 ease-in-out'> Sign up </Link>
            </h1>
          </div>
        </form>
      </section>

     
    </section>
  )
}