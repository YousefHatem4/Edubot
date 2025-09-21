import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faEye, faEyeSlash, faLock, faPenToSquare, faUser, faXmark } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import toast from 'react-hot-toast'

export default function Profile() {
  const [enabled, setEnabled] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [name, setName] = useState("")
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(true)
  const [userData, setUserData] = useState(null)

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true)
        const token = localStorage.getItem('userToken')

        if (!token) {
          toast.error("No authentication token found")
          return
        }

        const response = await axios.get('http://16.171.18.65:8000/users/me', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        })

        const data = response.data
        setUserData(data)
        setName(data.name)
        setEmail(data.email)

      } catch (error) {
        console.error('Error fetching user data:', error)
        if (error.response?.status === 401) {
          toast.error("Authentication failed. Please login again.")
          // Optionally redirect to login page
        } else {
          toast.error("Failed to load profile data")
        }
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [])

  // Format date function
  const formatDate = (dateString) => {
    if (!dateString) return "N/A"
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  // Get initials for avatar
  const getInitials = (name) => {
    if (!name) return "U"
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const token = localStorage.getItem('userToken')

      const updateData = {
        name: name,
        email: email
      }

      if (password) {
        updateData.password = password
      }

      await axios.put('http://16.171.18.65:8000/users/me', updateData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })

      // Update local userData
      setUserData(prev => ({
        ...prev,
        name: name,
        email: email
      }))

      toast.success("Profile updated successfully!")
      setIsEditing(false)
      setPassword("") // Clear password field

    } catch (error) {
      console.error('Error updating profile:', error)
      if (error.response?.data?.detail) {
        toast.error(error.response.data.detail)
      } else {
        toast.error("Failed to update profile")
      }
    }
  }

  const handleCancel = () => {
    // Reset form values to original data
    if (userData) {
      setName(userData.name)
      setEmail(userData.email)
    }
    setPassword("")
    setIsEditing(false)
  }

  if (loading) {
    return (
      <section className="min-h-[150vh] bg-gradient-to-r from-[#0A0710] to-[#1B0034] opacity-100 p-6 md:p-15 flex items-center justify-center">
        <div className="text-white text-xl">Loading profile...</div>
      </section>
    )
  }

  if (!userData) {
    return (
      <section className="min-h-[150vh] bg-gradient-to-r from-[#0A0710] to-[#1B0034] opacity-100 p-6 md:p-15 flex items-center justify-center">
        <div className="text-white text-xl">Failed to load profile data</div>
      </section>
    )
  }

  return (
    <section className="min-h-[150vh] bg-gradient-to-r from-[#0A0710] to-[#1B0034] opacity-100 p-6 md:p-15 flex flex-col items-center gap-8 md:gap-10 relative">
      {/* profile box */}
      <section className="w-full max-w-[940px] p-[1px] rounded-[10px] bg-gradient-to-r from-[#8B5CF6] to-[#3B82F6]">
        <div className="h-auto md:h-[201px] rounded-[9px] bg-gradient-to-b from-[#0F0A1F] to-[#1E1B29] px-5 md:px-10 py-6 md:py-12 flex flex-col md:flex-row justify-between gap-6 md:gap-0">
          <div className="flex flex-col md:flex-row gap-5 items-center">
            <div className="w-[96px] h-[96px] rounded-full opacity-100 bg-[linear-gradient(135deg,#8B5CF6_25%,#3B82F6_95.71%)] shadow-lg flex items-center justify-center shadow-black/10">
              <h1 className=" font-inter font-bold text-[20.4px] leading-[32px] tracking-[0] align-middle  text-white">
                {getInitials(userData.name)}
              </h1>
            </div>
            <div className="flex flex-col gap-3 md:gap-4 text-center md:text-left">
              <h1 className="font-poppins font-bold text-[24px] md:text-[28px] leading-[100%] tracking-[0.2px] text-[#E5E7EB]">
                {userData.role === 'teacher' ? 'Mr. ' : ''}{userData.name}
              </h1>
              <div className="flex flex-wrap justify-center md:justify-start items-center gap-2">
                <div className="w-[63px] h-[28px] rounded-full opacity-100 bg-[#A78BFA33] flex items-center justify-center">
                  <h1 className="font-poppins font-medium text-[11.9px] text-[#8B5CF6] capitalize">
                    {userData.role}
                  </h1>
                </div>
                <div className="w-[63px] h-[28px] rounded-full opacity-100 bg-[#22C55E33] flex items-center justify-center">
                  <h1 className="font-poppins font-medium text-[11.9px] text-[#22C55E]">
                    {userData.is_active ? 'Active' : 'Inactive'}
                  </h1>
                </div>
              </div>
              <p className="font-poppins font-medium text-[14px] md:text-[16px] text-[#9CA3AF]">
                Member since {formatDate(userData.created_at)}
              </p>
            </div>
          </div>
          {/* btn */}
          <button
            className="w-full md:w-[151px] cursor-pointer h-[42px] font-poppins flex gap-1 items-center justify-center font-normal text-[16px] md:text-[19.2px] text-white rounded-[12px] border border-[#FFFFFF33] bg-[#8B5CF6] hover:shadow-[0px_6px_35.7px_0px_#A78BFA2E] shadow-[0px_6px_15.6px_0px_#EC48991A] transition-all duration-150"
            onClick={() => setIsEditing(true)}
          >
            <FontAwesomeIcon icon={faPenToSquare} />
            Edit Profile
          </button>
        </div>
      </section>

      {/* profile info */}
      <section className="w-full max-w-[940px] p-[1px] rounded-[16px] mx-auto mt-6">
        <div className="h-auto md:h-[342px] rounded-[15px] px-5 py-7 bg-gradient-to-b from-[#0F0A1F] to-[#1E1B29]">
          <h1 className='font-poppins font-normal text-[18px] md:text-[19.2px] text-white'>
            Profile Information
          </h1>
          {/* info section */}
          <section className='mt-6 md:mt-5 flex flex-col md:flex-row gap-6 md:gap-65'>
            {/* right part */}
            <div className='flex flex-col gap-4 md:gap-4'>
              <div>
                <p className='text-[#9CA3AF] mb-1 md:mb-2 text-[12px] md:text-[13.33px]'>Name</p>
                <h1 className='text-white text-[15px] md:text-[16px] font-medium'>
                  {userData.role === 'teacher' ? 'Mr. ' : ''}{userData.name}
                </h1>
              </div>
              <div>
                <p className='text-[#9CA3AF] mb-1 md:mb-2 text-[12px] md:text-[13.33px]'>Email</p>
                <h1 className='text-white text-[15px] md:text-[16px] font-medium'>{userData.email}</h1>
              </div>
              <div>
                <p className='text-[#9CA3AF] mb-1 md:mb-2 text-[12px] md:text-[13.33px]'>Role</p>
                <h1 className='text-white text-[15px] md:text-[16px] font-medium capitalize'>{userData.role}</h1>
              </div>
            </div>
            {/* left part */}
            <div className='flex flex-col gap-4 md:gap-4'>
              {userData.teacher_profile && (
                <>
                  <div>
                    <p className='text-[#9CA3AF] mb-1 md:mb-2 text-[12px] md:text-[13.33px]'>Bot Limit</p>
                    <h1 className='text-white text-[15px] md:text-[16px] font-medium'>{userData.teacher_profile.bot_limit}</h1>
                  </div>
                  <div>
                    <p className='text-[#9CA3AF] mb-1 md:mb-2 text-[12px] md:text-[13.33px]'>Current Bots</p>
                    <h1 className='text-white text-[15px] md:text-[16px] font-medium'>{userData.teacher_profile.current_bots}</h1>
                  </div>
                </>
              )}
              <div>
                <p className='text-[#9CA3AF] mb-1 md:mb-2 text-[12px] md:text-[13.33px]'>Account Created</p>
                <h1 className='text-white text-[15px] md:text-[16px] font-medium'>{formatDate(userData.created_at)}</h1>
              </div>
            </div>
          </section>
          {/* status */}
          <section className='mt-6 md:mt-5'>
            <p className='text-[#9CA3AF] mb-1 md:mb-2 text-[12px] md:text-[13.33px]'>Status</p>
            <h1 className={`text-[13px] md:text-[13.33px] ${userData.is_active ? 'text-[#22C55E]' : 'text-[#EF4444]'}`}>
              {userData.is_active ? 'Active' : 'Inactive'}
            </h1>
          </section>
        </div>
      </section>

      {/* active boxes */}
      <section className='flex flex-col md:flex-row items-center gap-6 md:gap-30 mt-6'>
        {/* left box */}
        <section className='w-full md:w-[407px] h-auto md:h-[287px] rounded-[16px] bg-gradient-to-b from-[#0F0A1F] to-[#1E1B29] px-4 md:px-6 py-5 md:py-7 flex flex-col gap-6 md:gap-8'>
          <h1 className='text-white text-[18px] md:text-[19.2px] font-normal'>Activity</h1>
          {/* last login */}
          <section className='flex items-center gap-3'>
            <div className='w-[40px] h-[40px] rounded-full bg-[#3B82F633] flex items-center justify-center'>
              <img src="pulse.png" className='w-[20px] h-[20px] object-cover' alt="Logo" />
            </div>
            <div className='flex flex-col gap-1 md:gap-2'>
              <h1 className='text-white text-[13px] md:text-[13.33px]'>Last Login</h1>
              <p className='text-[#9CA3AF] text-[13px] md:text-[13.33px]'>May 10, 2023 at 05:22 PM</p>
            </div>
          </section>
          {/* active bot */}
          {userData.teacher_profile && (
            <section className='flex items-center gap-3'>
              <div className='w-[40px] h-[40px] rounded-full bg-[#8B5CF633] flex items-center justify-center'>
                <img src="bot (1).png" className='w-[20px] h-[20px] object-cover' alt="Bot" />
              </div>
              <div className='flex flex-col gap-1 md:gap-2'>
                <h1 className='text-white text-[13px] md:text-[13.33px]'>Active Bots</h1>
                <p className='text-[#9CA3AF] text-[13px] md:text-[13.33px]'>
                  {userData.teacher_profile.current_bots} bots currently active
                </p>
              </div>
            </section>
          )}
        </section>

        {/* right box */}
        <section className='w-full md:w-[407px] h-auto md:h-[287px] rounded-[16px] bg-gradient-to-b from-[#0F0A1F] to-[#1E1B29] px-4 md:px-6 py-5 md:py-7 flex flex-col gap-5 md:gap-7'>
          <h1 className='text-white text-[18px] md:text-[19.2px] font-normal'>Security instructions</h1>
          {/* password */}
          <section className='flex flex-col gap-3'>
            <h1 className='text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] text-[13px] md:text-[13.33px]'>Password</h1>
            <p className='text-[#E5E7EB] text-[13px] md:text-[13.33px]'>Change your password every 30 days for security.</p>
            <div className='flex items-center gap-2'>
              <img src="key.png" className='w-[20px] h-[20px] object-cover' alt="Key" />
              <p className='text-[#E5E7EB] text-[13.6px] md:text-[13.6px]'>Change Password</p>
            </div>
          </section>
          {/* two-factor auth */}
          <section className='flex flex-col gap-3'>
            <h1 className='text-[#9CA3AF] text-[11.9px] md:text-[11.9px]'>Two-Factor Authentication</h1>
            <div className='flex items-center gap-3'>
              <div className='relative cursor-pointer flex-shrink-0' onClick={() => setEnabled(!enabled)}>
                <div className='w-[56px] h-[28px] rounded-full bg-[#374151]'></div>
                <div className={`w-[29px] h-[28px] rounded-full absolute top-[0.2px] transition-all duration-300 
                  ${enabled ? 'bg-[linear-gradient(91.27deg,#8B5CF6_0.46%,#EC4899_99.62%)] left-[27px]' : 'bg-[#9CA3AF] left-0'}`}>
                </div>
              </div>
              <h1 className='text-[#9CA3AF] text-[13px] md:text-[13.33px]'>Not Enabled</h1>
            </div>
          </section>
        </section>
      </section>

      {/* Edit Modal */}
      {isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-40 flex items-center justify-center p-4">
          <div className="relative w-full max-w-2xl">
            <section className='w-full rounded-[18px] bg-gradient-to-b from-[#0F0A1F] to-[#1E1B29] shadow-lg flex items-center justify-center p-6 md:p-8'>
              <section className='w-full max-w-md'>
                <form onSubmit={handleSubmit}>
                  <label htmlFor="name" className="block text-[20px] md:text-[26px] text-[#E5E7EB]">Name</label>
                  <div className="relative mt-3 md:mt-5">
                    <FontAwesomeIcon className='absolute left-4 md:left-5 top-1/2 -translate-y-1/2 text-[#E5E7EB]' icon={faUser} />
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="ps-12 md:ps-14 w-full h-[60px] md:h-[70px] rounded-[12px] border-2 border-[#E5E7EB] text-[#656567] focus:text-[#E5E7EB] focus:border-[#8E2DE2] focus:ring-2 focus:ring-[#8E2DE2]"
                      required
                    />
                  </div>
                  <label htmlFor="email" className="block mt-6 md:mt-8 text-[20px] md:text-[26px] text-[#E5E7EB]">Email address</label>
                  <div className="relative mt-3 md:mt-5">
                    <FontAwesomeIcon className='absolute left-4 md:left-5 top-1/2 -translate-y-1/2 text-[#E5E7EB]' icon={faEnvelope} />
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="ps-12 md:ps-14 w-full h-[60px] md:h-[70px] rounded-[12px] border-2 border-[#E5E7EB] text-[#656567] focus:text-[#E5E7EB] focus:border-[#8E2DE2] focus:ring-2 focus:ring-[#8E2DE2]"
                      required
                    />
                  </div>
                  <label htmlFor="pass" className="block mt-6 md:mt-8 text-[20px] md:text-[26px] text-[#E5E7EB]">Password (optional)</label>
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
                      className="ps-12 md:ps-14 w-full h-[60px] md:h-[70px] rounded-[12px] border-2 border-[#E5E7EB] text-[#656567] focus:text-[#E5E7EB] focus:border-[#8E2DE2] focus:ring-2 focus:ring-[#8E2DE2]"
                      placeholder="Leave blank to keep current password"
                    />
                  </div>
                  <div className='mt-7 flex flex-col sm:flex-row gap-4 justify-center'>
                    <button type="submit" className='w-full sm:w-[224px] h-[59px] rounded-[12px] bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA] text-white'>Save Updates</button>
                    <button type="button" onClick={handleCancel} className='w-full sm:w-[188px] h-[59px] rounded-[12px] bg-[#6B7280] text-white'>Cancel</button>
                  </div>
                </form>
              </section>
              <section
                className='w-[31px] h-[31px] absolute top-4 right-4 rounded-full bg-[#E5E5E5] flex items-center justify-center cursor-pointer'
                onClick={handleCancel}
              >
                <FontAwesomeIcon icon={faXmark} className="text-gray-800" />
              </section>
            </section>
          </div>
        </div>
      )}
    </section>
  )
}
