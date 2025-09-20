import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight, faChalkboardUser, faEnvelope, faEye, faEyeSlash, faGraduationCap, faLock, faUser } from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import axios from 'axios'
import toast from 'react-hot-toast'
export default function Register() {
  const [showPassword, setShowPassword] = useState(false)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024)
  const navigate = useNavigate()
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  const validate = (values) => {
    const errors = {}
    if (!values.name) {
      errors.name = 'Full name is required'
    } else if (values.name.length < 2) {
      errors.name = 'Name must be at least 2 characters'
    }
    if (!values.email) {
      errors.email = 'Email is required'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = 'Invalid email address'
    }
    if (!values.password) {
      errors.password = 'Password is required'
    } else if (values.password.length < 6) {
      errors.password = 'Password must be at least 6 characters'
    }
    if (!values.role) {
      errors.role = 'Please select a role'
    }
    return errors
  }
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      role: '',
    },
    validate,
    onSubmit: async (values, { setSubmitting, setFieldError }) => {
      try {
        const requestData = {
          name: values.name,
          email: values.email,
          role: values.role,
          password: values.password
        }
        if (values.role.toLowerCase() === 'teacher') {
          requestData.teacher_profile = {
            bot_limit: 3,
            current_bots: 0
          }
        }
        const response = await axios.post('http://16.171.18.65:8000/auth/register', requestData)

        // --- NEW LOGIC START ---
        // Save role to our new cache, mapped by email
        const roleCache = JSON.parse(localStorage.getItem('roleCache')) || {};
        roleCache[values.email] = values.role.toLowerCase();
        localStorage.setItem('roleCache', JSON.stringify(roleCache));
        // --- NEW LOGIC END ---

        toast.success("Account created successfully 🎉")
        navigate("/login")
      } catch (error) {
        if (error.response?.data?.detail) {
          if (Array.isArray(error.response.data.detail)) {
            error.response.data.detail.forEach(err => {
              if (err.loc && err.loc.includes('name')) {
                setFieldError('name', err.msg)
              } else if (err.loc && err.loc.includes('email')) {
                setFieldError('email', err.msg)
              } else if (err.loc && err.loc.includes('password')) {
                setFieldError('password', err.msg)
              } else if (err.loc && err.loc.includes('role')) {
                setFieldError('role', err.msg)
              }
            })
          } else {
            toast.error(error.response.data.detail)
          }
        } else if (error.response?.data?.message) {
          toast.error(error.response.data.message)
        } else {
          toast.error("Registration failed. Please try again.")
        }
      } finally {
        setSubmitting(false)
      }
    }
  })
  return (
    <section className='bg-[linear-gradient(116.66deg,#0F0A1F_1.16%,#1E1B29_94.74%)] p-4 md:p-6 lg:p-10 min-h-screen flex items-center justify-center flex-col'>
      {/* main box */}
      <section className='w-full max-w-[614px] h-auto lg:h-[957px] rounded-[16px] opacity-100 bg-[#0F0B1A1A] py-6 lg:py-4 transition-all duration-300 ease-in-out shadow-[0px_25px_50px_0px_#A259FF40]'>
        {/* title */}
        <h1 className='font-semibold text-[28px] md:text-[33.18px] leading-[100%] tracking-[0%] text-center text-[#E5E7EB] mt-4 lg:mt-0'>Create Account</h1>
        <p className='mt-3 font-normal text-[18px] md:text-[22px] leading-[100%] tracking-[0%] text-center text-[#8C8C8C]'>
          Join us and start your journey
        </p>
        <form className='mt-6 lg:mt-8 px-4 md:px-6 lg:px-10' onSubmit={formik.handleSubmit}>
          {/* Full Name input */}
          <label htmlFor="name" className="block font-normal text-[20px] md:text-[26.65px] leading-[100%] tracking-[0%] text-[#E5E7EB]">Full Name</label>
          <div className="relative mt-3 md:mt-5">
            <FontAwesomeIcon className='absolute text-[#E5E7EB] left-4 md:left-5 top-[52%] -translate-y-1/2 transition-all duration-300 ease-in-out text-sm md:text-base' icon={faUser} />
            <input
              type="text"
              id="name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`ps-12 md:ps-14 w-full h-[60px] md:h-[70px] lg:h-[82px] rounded-[12px] opacity-100 border-2 font-poppins font-normal text-[16px] md:text-[19.2px] leading-[100%] tracking-[0%] text-[#656567] transition-all duration-300 ease-in-out focus:text-[#E5E7EB] focus:outline-none focus:ring-2 ${formik.touched.name && formik.errors.name
                ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                : 'border-[#E5E7EB] focus:border-[#8E2DE2] focus:ring-[#8E2DE2]'
                }`}
              placeholder="EX: Mohamed Bahaa"
            />
          </div>
          {formik.touched.name && formik.errors.name && (
            <p className="mt-2 text-red-500 text-sm">{formik.errors.name}</p>
          )}
          {/* email input */}
          <label htmlFor="email" className="block mt-6 md:mt-8 font-normal text-[20px] md:text-[26.65px] leading-[100%] tracking-[0%] text-[#E5E7EB]">Email address</label>
          <div className="relative mt-3 md:mt-5">
            <FontAwesomeIcon className='absolute text-[#E5E7EB] left-4 md:left-5 top-[52%] -translate-y-1/2 transition-all duration-300 ease-in-out text-sm md:text-base' icon={faEnvelope} />
            <input
              type="email"
              id="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`ps-12 md:ps-14 w-full h-[60px] md:h-[70px] lg:h-[82px] rounded-[12px] opacity-100 border-2 font-poppins font-normal text-[16px] md:text-[19.2px] leading-[100%] tracking-[0%] text-[#656567] transition-all duration-300 ease-in-out focus:text-[#E5E7EB] focus:outline-none focus:ring-2 ${formik.touched.email && formik.errors.email
                ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                : 'border-[#E5E7EB] focus:border-[#8E2DE2] focus:ring-[#8E2DE2]'
                }`}
              placeholder="EX:Mohamed@gmail.com"
            />
          </div>
          {formik.touched.email && formik.errors.email && (
            <p className="mt-2 text-red-500 text-sm">{formik.errors.email}</p>
          )}
          {/* pass input */}
          <label htmlFor="password" className="block mt-6 md:mt-8 font-normal text-[20px] md:text-[26.65px] leading-[100%] tracking-[0%] text-[#E5E7EB]">Password</label>
          <div className="relative mt-3 md:mt-5">
            <FontAwesomeIcon className='absolute text-[#ADAEBC] left-4 md:left-5 top-[52%] -translate-y-1/2 transition-all duration-300 ease-in-out text-sm md:text-base' icon={faLock} />
            <FontAwesomeIcon
              className='absolute text-[#ADAEBC] right-4 md:right-8 top-[52%] -translate-y-1/2 cursor-pointer hover:text-[#A259FF] transition-all duration-300 ease-in-out text-sm md:text-base'
              icon={showPassword ? faEye : faEyeSlash}
              onClick={() => setShowPassword(!showPassword)}
            />
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`ps-12 md:ps-14 w-full h-[60px] md:h-[70px] lg:h-[82px] rounded-[12px] opacity-100 border-2 font-poppins font-normal text-[16px] md:text-[19.2px] leading-[100%] tracking-[0%] text-[#656567] transition-all duration-300 ease-in-out focus:text-[#E5E7EB] focus:outline-none focus:ring-2 ${formik.touched.password && formik.errors.password
                ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                : 'border-[#E5E7EB] focus:border-[#8E2DE2] focus:ring-[#8E2DE2]'
                }`}
              placeholder="Enter your password"
            />
          </div>
          {formik.touched.password && formik.errors.password && (
            <p className="mt-2 text-red-500 text-sm">{formik.errors.password}</p>
          )}
          {/* category */}
          <label className="block mb-4 md:mb-5 mt-6 md:mt-8 font-poppins font-normal text-[20px] md:text-[26.65px] leading-[100%] tracking-[0%] text-center text-[#E5E7EB]">Select Your Role</label>
          <div className='flex justify-center'>
            <div className='flex flex-col sm:flex-row gap-4 md:gap-6 lg:gap-10 w-full max-w-[382px]'>
              <div
                onClick={() => formik.setFieldValue('role', 'student')}
                className={`flex-1 w-full sm:w-[149px] h-[80px] md:h-[90px] lg:h-[95px] rounded-[12px] border flex justify-center items-center gap-2 md:gap-3 flex-col cursor-pointer transition-all duration-300 ease-in-out ${formik.values.role === "student"
                  ? "border-[#F9A8D4] bg-gradient-to-b from-[#0F0A1F] to-[#1E1B29] scale-105"
                  : formik.touched.role && formik.errors.role
                    ? "border-red-500 hover:border-[#F9A8D4] hover:bg-gradient-to-b from-[#0F0A1F] to-[#1E1B29]"
                    : "border-[#E5E7EB] hover:border-[#F9A8D4] hover:bg-gradient-to-b from-[#0F0A1F] to-[#1E1B29]"
                  }`}
              >
                <FontAwesomeIcon className={`transition-all duration-300 text-xl md:text-2xl ease-in-out ${formik.values.role === "student" ? "text-[#8B5CF6]" : "text-[#8B5CF6] hover:text-[#A259FF]"}`} icon={faGraduationCap} />
                <h1 className={`transition-all duration-300 ease-in-out text-[14px] md:text-[16px] ${formik.values.role === "student" ? "text-[#B0B0B0]" : "text-[#B0B0B0] hover:text-white"} font-poppins font-medium text-center`}>Student</h1>
              </div>
              <div
                onClick={() => formik.setFieldValue('role', 'teacher')}
                className={`flex-1 w-full sm:w-[149px] h-[80px] md:h-[90px] lg:h-[95px] rounded-[12px] border flex justify-center items-center gap-2 md:gap-3 flex-col cursor-pointer transition-all duration-300 ease-in-out ${formik.values.role === "teacher"
                  ? "border-[#F9A8D4] bg-gradient-to-b from-[#0F0A1F] to-[#1E1B29] scale-105"
                  : formik.touched.role && formik.errors.role
                    ? "border-red-500 hover:border-[#F9A8D4] hover:bg-gradient-to-b from-[#0F0A1F] to-[#1E1B29]"
                    : "border-[#E5E7EB] hover:border-[#F9A8D4] hover:bg-gradient-to-b from-[#0F0A1F] to-[#1E1B29]"
                  }`}
              >
                <FontAwesomeIcon className={`transition-all duration-300 text-xl md:text-2xl ease-in-out ${formik.values.role === "teacher" ? "text-[#EC4899]" : "text-[#EC4899] hover:text-[#EC4899]"}`} icon={faChalkboardUser} />
                <h1 className={`transition-all duration-300 ease-in-out text-[14px] md:text-[16px] ${formik.values.role === "teacher" ? "text-[#B0B0B0]" : "text-[#B0B0B0] hover:text-white"} font-poppins font-medium text-center`}>Teacher</h1>
              </div>
            </div>
          </div>
          {formik.touched.role && formik.errors.role && (
            <p className="mt-2 text-red-500 text-sm text-center">{formik.errors.role}</p>
          )}
          {/* btn */}
          <div className='flex items-center justify-center mt-6 md:mt-8'>
            <button
              type="submit"
              disabled={formik.isSubmitting}
              className="flex items-center justify-center gap-6 w-full max-w-[477px] h-[60px] md:h-[70px] lg:h-[83px] rounded-[12px] bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA] font-semibold text-[18px] md:text-[22px] lg:text-[27.65px] leading-[100%] text-white shadow-[0px_-7px_13.4px_0px_#4A00E02E] transition-colors duration-1000 ease-out hover:shadow-[0px_8px_36.2px_0px_#8A38F540] hover:bg-gradient-to-r hover:from-[#8B5CF6] hover:to-[#EC4899] group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {formik.isSubmitting ? 'Creating Account...' : 'Create Account'}
              {!formik.isSubmitting && (
                <FontAwesomeIcon
                  icon={faAngleRight}
                  className="transition-transform duration-500 ease-out group-hover:translate-x-2"
                />
              )}
            </button>
          </div>
          <div className='mt-6 md:mt-9'>
            <h1 className='font-medium text-[14px] md:text-[16px] leading-[100%] tracking-[0%] text-center text-[#E5E7EB]'>
              Already have an account? <Link to="/login" className='font-medium text-[#8B5CF6] hover:text-[#8E2DE2] transition-all duration-300 ease-in-out'> Sign In </Link>
            </h1>
          </div>
        </form>
      </section>
    </section>
  )
}
