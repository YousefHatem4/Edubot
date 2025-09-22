import React, { useState, useEffect, useCallback } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook, faChartBar, faChartLine, faGear, faGraduationCap, faHome, faRobot, faStar, faUsers, faPlusCircle, faUpload, faMagic, faBrain, faLink, faArrowUp, faArrowDown, faChevronUp, faChevronDown, faRefresh } from '@fortawesome/free-solid-svg-icons'
import { faCopy, faClock } from '@fortawesome/free-regular-svg-icons'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import axios from 'axios'

export default function Dashboard({ onNavigateToCreateBot }) {
  // State management
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024)
  const [chatbots, setChatbots] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedBot, setSelectedBot] = useState(null)
  const [userData, setUserData] = useState(null)
  const [userLoading, setUserLoading] = useState(true)
  const [allStudentRequests, setAllStudentRequests] = useState([])
  const [filteredStudentRequests, setFilteredStudentRequests] = useState([])
  const [requestsLoading, setRequestsLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)

  // Dropdown state
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState("Select a chatbot")

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // API helper function
  const getAuthHeaders = () => {
    const token = localStorage.getItem('userToken')
    if (!token) {
      throw new Error("No authentication token found")
    }
    return {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  }

  // Filter student requests based on selected bot
  useEffect(() => {
    if (selectedBot && allStudentRequests.length > 0) {
      const filtered = allStudentRequests.filter(request => request.bot_id === selectedBot._id)
      setFilteredStudentRequests(filtered)
    } else {
      setFilteredStudentRequests([])
    }
  }, [selectedBot, allStudentRequests])

  // Fetch user data
  const fetchUserData = useCallback(async () => {
    try {
      setUserLoading(true)
      const response = await axios.get('http://16.171.18.65:8000/users/me', {
        headers: getAuthHeaders()
      })
      setUserData(response.data)
    } catch (error) {
      console.error('Error fetching user data:', error)
      if (error.response?.status === 401) {
        toast.error("Authentication failed. Please login again.")
      } else {
        toast.error("Failed to load profile data")
      }
    } finally {
      setUserLoading(false)
    }
  }, [])

  // Fetch chatbots data
  const fetchChatbots = useCallback(async () => {
    try {
      setLoading(true)
      const response = await axios.get('http://16.171.18.65:8000/bots/teacher/me', {
        headers: getAuthHeaders()
      })

      const botsData = response.data
      setChatbots(botsData)

      // Set the first bot as selected if available and no bot is currently selected
      if (botsData.length > 0 && !selectedBot) {
        setSelectedBot(botsData[0])
        setSelected(botsData[0].name)
      } else if (botsData.length === 0) {
        setSelectedBot(null)
        setSelected("No chatbots available")
      }

    } catch (error) {
      console.error('Error fetching chatbots:', error)
      if (error.response?.status === 401) {
        toast.error("Authentication failed. Please login again.")
      } else {
        toast.error("Failed to load chatbots data")
      }
      setChatbots([])
    } finally {
      setLoading(false)
    }
  }, [selectedBot])

  // Fetch student access requests from memberships API
  const fetchStudentRequests = useCallback(async () => {
    try {
      setRequestsLoading(true)

      // Get all bots first to fetch membership requests for each
      const allRequests = []

      if (chatbots.length > 0) {
        // Fetch membership requests for each bot
        for (const bot of chatbots) {
          try {
            const response = await axios.get(`http://16.171.18.65:8000/memberships/bot/${bot._id}`, {
              headers: getAuthHeaders()
            })

            // Process the response data and flatten the arrays
            const botRequests = []

            // Add pending requests
            if (response.data.pending) {
              response.data.pending.forEach(request => {
                botRequests.push({
                  id: request._id,
                  student_id: request.student_id,
                  bot_id: request.bot_id,
                  bot_name: bot.name,
                  status: 'pending',
                  created_at: request.created_at,
                  expires_at: request.expires_at
                })
              })
            }

            // Add accepted requests
            if (response.data.accepted) {
              response.data.accepted.forEach(request => {
                botRequests.push({
                  id: request._id,
                  student_id: request.student_id,
                  bot_id: request.bot_id,
                  bot_name: bot.name,
                  status: 'approved',
                  created_at: request.created_at,
                  expires_at: request.expires_at
                })
              })
            }

            // Add expired requests as rejected
            if (response.data.expired) {
              response.data.expired.forEach(request => {
                botRequests.push({
                  id: request._id,
                  student_id: request.student_id,
                  bot_id: request.bot_id,
                  bot_name: bot.name,
                  status: 'rejected',
                  created_at: request.created_at,
                  expires_at: request.expires_at
                })
              })
            }

            allRequests.push(...botRequests)
          } catch (botError) {
            console.error(`Error fetching requests for bot ${bot._id}:`, botError)
          }
        }
      }

      setAllStudentRequests(allRequests)
    } catch (error) {
      console.error('Error fetching student requests:', error)
      // Fallback to mock data if API fails
      setAllStudentRequests([
        { id: 1, student_id: "student1", bot_id: chatbots[0]?._id, bot_name: "Physics Helper", status: "pending" },
        { id: 2, student_id: "student2", bot_id: chatbots[0]?._id, bot_name: "Math Tutor", status: "approved" },
        { id: 3, student_id: "student3", bot_id: chatbots[1]?._id, bot_name: "Chemistry Lab", status: "rejected" },
        { id: 4, student_id: "student4", bot_id: chatbots[1]?._id, bot_name: "Biology Guide", status: "rejected" }
      ])
    } finally {
      setRequestsLoading(false)
    }
  }, [chatbots])

  // Initial data fetch
  useEffect(() => {
    fetchUserData()
    fetchChatbots()
  }, [fetchUserData, fetchChatbots])

  // Fetch student requests after chatbots are loaded
  useEffect(() => {
    if (chatbots.length > 0) {
      fetchStudentRequests()
    }
  }, [chatbots, fetchStudentRequests])

  // Handle bot deletion
  const handleDeleteBot = useCallback(async (botId) => {
    if (!window.confirm("Are you sure you want to delete this bot? This action cannot be undone.")) {
      return
    }

    try {
      await axios.delete(`http://16.171.18.65:8000/bots/${botId}`, {
        headers: getAuthHeaders()
      })

      toast.success("Bot deleted successfully")

      // Update local state
      const updatedBots = chatbots.filter(bot => bot._id !== botId)
      setChatbots(updatedBots)

      // Update selected bot if deleted bot was selected
      if (selectedBot && selectedBot._id === botId) {
        if (updatedBots.length > 0) {
          setSelectedBot(updatedBots[0])
          setSelected(updatedBots[0].name)
        } else {
          setSelectedBot(null)
          setSelected("No chatbots available")
        }
      }

    } catch (error) {
      console.error('Error deleting bot:', error)
      toast.error("Failed to delete bot")
    }
  }, [chatbots, selectedBot])

  // Handle student request actions
  const handleRequestAction = useCallback(async (requestId, action) => {
    try {
      // Find the request to get the bot_id
      const request = filteredStudentRequests.find(req => req.id === requestId)
      if (!request) {
        toast.error("Request not found")
        return
      }

      // Use the new membership API endpoints
      let endpoint
      if (action === 'approve') {
        endpoint = `http://16.171.18.65:8000/memberships/accept/${requestId}`
      } else {
        endpoint = `http://16.171.18.65:8000/memberships/reject/${requestId}`
      }

      await axios.post(endpoint, {}, {
        headers: getAuthHeaders()
      })

      toast.success(`Request ${action}d successfully`)

      // Update both all requests and filtered requests
      const updatedStatus = action === 'approve' ? 'approved' : 'rejected'

      setAllStudentRequests(prev =>
        prev.map(req =>
          req.id === requestId ? { ...req, status: updatedStatus } : req
        )
      )

      setFilteredStudentRequests(prev =>
        prev.map(req =>
          req.id === requestId ? { ...req, status: updatedStatus } : req
        )
      )

    } catch (error) {
      console.error(`Error ${action}ing request:`, error)
      toast.error(`Failed to ${action} request`)
    }
  }, [filteredStudentRequests])

  // Handle bot ID copy
  const handleCopy = useCallback((botId) => {
    const idToCopy = botId || (selectedBot?._id) || "edb-9f3a17"
    navigator.clipboard.writeText(idToCopy)
      .then(() => {
        toast.success("Bot ID copied!")
      })
      .catch(() => {
        toast.error("Failed to copy")
      })
  }, [selectedBot])

  // Handle dropdown selection
  const handleBotSelection = useCallback((selectedBotName) => {
    const bot = chatbots.find(b => b.name === selectedBotName)
    if (bot) {
      setSelectedBot(bot)
      setSelected(selectedBotName)
    }
    setOpen(false)
  }, [chatbots])

  // Handle refresh data
  const handleRefresh = useCallback(async () => {
    setRefreshing(true)
    try {
      await Promise.all([
        fetchUserData(),
        fetchChatbots(),
        fetchStudentRequests()
      ])
      toast.success("Data refreshed successfully")
    } catch (error) {
      toast.error("Failed to refresh data")
    } finally {
      setRefreshing(false)
    }
  }, [fetchUserData, fetchChatbots, fetchStudentRequests])

  // Format date function
  const formatDate = (dateString) => {
    if (!dateString) return "N/A"
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    })
  }

  // Get initials for avatar
  const getInitials = (name) => {
    if (!name) return "U"
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
  }

  // Get status color class
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending':
        return { border: 'border-[#FACC154D]', text: 'text-[#FDE68A]' }
      case 'approved':
        return { border: 'border-[#10B9814D]', text: 'text-[#B9F3DA]' }
      case 'rejected':
        return { border: 'border-[#EF444480]', text: 'text-[#EF444480]' }
      default:
        return { border: 'border-[#FFFFFF14]', text: 'text-[#9CA3AF]' }
    }
  }

  // Create dropdown options from fetched chatbots
  const options = chatbots.map(bot => bot.name)

  return (
    <>
      <section className="min-h-[200vh] bg-gradient-to-r from-[#0A0710] to-[#1B0034] opacity-100 px-4 md:px-8 lg:px-20 py-6 md:py-8 lg:py-10">
        {/* Refresh button */}
        <div className="flex justify-end mb-4">
          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] text-white disabled:opacity-50"
          >
            <FontAwesomeIcon
              icon={faRefresh}
              className={refreshing ? 'animate-spin' : ''}
            />
            {refreshing ? 'Refreshing...' : 'Refresh'}
          </button>
        </div>

        {/* welcome teacher */}
        <section className="w-full max-w-[940px] h-auto lg:h-[225px] rounded-[10px] p-[1px] bg-[linear-gradient(90deg,#8B5CF6_0%,#3B82F6_100%)] ">
          <div className="w-full h-full rounded-[10px] bg-[linear-gradient(180deg,#0F0A1F_0%,#1E1B29_100%)] p-4 md:p-5">

            <div className='flex flex-col md:flex-row justify-between gap-4 md:gap-0'>
              <div className='flex flex-col md:flex-row gap-4 md:gap-5 items-start md:items-center'>
                {/* Profile Avatar */}
                <div className='w-[60px] h-[60px] md:w-[70px] md:h-[70px] rounded-full opacity-100 bg-[linear-gradient(135deg,#8B5CF6_25%,#3B82F6_95.71%)] shadow-lg flex items-center justify-center shadow-[black_10%]'>
                  <h1 className='font-inter font-bold text-[16px] md:text-[18px] leading-[32px] tracking-[0] align-middle text-white'>
                    {userLoading ? "..." : getInitials(userData?.name)}
                  </h1>
                </div>

                {/* Welcome text */}
                <div className='flex flex-col gap-1'>
                  <h1 className='font-poppins font-bold text-[22px] md:text-[26px] lg:text-[28px] leading-[100%] tracking-[0.2px] align-middle text-white'>
                    Welcome back,
                    <span className='bg-gradient-to-r tracking-[1.2px] from-[rgba(139,92,246,0.9)] to-[rgba(236,72,153,0.9)] bg-clip-text text-transparent'>
                      {" "}{userLoading ? "Loading..." : (userData?.role === 'teacher' ? `Mr. ${userData?.name}` : userData?.name || "User")}
                    </span>👋
                  </h1>

                  {/* User role and status badges */}
                  {userData && (
                    <div className='flex flex-wrap items-center gap-2 mt-2'>
                      <div className='w-[63px] h-[28px] rounded-full opacity-100 bg-[#A78BFA33] flex items-center justify-center'>
                        <h1 className='font-poppins font-medium text-[11.9px] text-[#8B5CF6] capitalize'>{userData.role}</h1>
                      </div>
                      <div className='w-[63px] h-[28px] rounded-full opacity-100 bg-[#22C55E33] flex items-center justify-center'>
                        <h1 className='font-poppins font-medium text-[11.9px] text-[#22C55E]'>{userData.is_active ? "Active" : "Inactive"}</h1>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className='flex items-center gap-2'>
                <p className='font-medium text-[14px] md:text-[16px] leading-[100%] tracking-[0] align-middle text-[#9CA3AF]'>Bot ID</p>
                <div className='w-auto md:w-[99px] h-[24px] rounded-full px-2 md:px-3 py-[2px] opacity-100 bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] flex items-center justify-center'>
                  <p className='font-poppins font-normal text-[12px] md:text-[13.33px] leading-[100%] tracking-[0] align-middle text-white'>
                    {selectedBot?._id?.substring(0, 8) || "No Bot"}
                  </p>
                </div>
                <FontAwesomeIcon
                  className='text-[#E5E7EB] cursor-pointer text-base md:text-lg'
                  onClick={() => handleCopy()}
                  icon={faCopy}
                />
              </div>
            </div>

            <div className='mt-6 md:mt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-0'>
              <div className='flex flex-col gap-2 md:gap-4'>
                <h1 className='font-normal text-[20px] md:text-[24px] lg:text-[26.65px] leading-[100%] tracking-[0] align-middle text-white'>
                  {loading ? "Loading..." : (selectedBot?.name || "No Bot Selected")}
                </h1>
                <p className='font-poppins font-medium text-[14px] md:text-[16px] leading-[100%] tracking-[0] align-middle text-[#9CA3AF]'>
                  Class: {selectedBot?.grade || "N/A"}, Subject: {selectedBot?.subject || "N/A"}
                </p>
                <p className='font-poppins font-normal text-[12px] md:text-[13.33px] leading-[100%] tracking-[0] align-middle text-[#6B7280]'>
                  Created At: {selectedBot ? formatDate(selectedBot.created_at) : "N/A"}
                </p>
              </div>

              <div className="relative w-full md:w-[260px]">
                {/* Select box */}
                <div
                  className="w-full h-[38px] md:h-[42px] rounded-[8px] border-[#A78BFA] border-[1.3px] bg-[#0F0A1F] text-[#E5E7EB] px-4 md:px-[18px] py-2 md:py-[11px] font-poppins font-normal text-[12px] md:text-[13.33px] flex justify-between items-center cursor-pointer"
                  onClick={() => !loading && chatbots.length > 0 && setOpen(!open)}
                >
                  {loading ? "Loading..." : selected}
                  <div className="flex flex-col gap-[2px] pointer-events-none">
                    <FontAwesomeIcon
                      icon={open ? faChevronUp : faChevronDown}
                      className="text-[#9CA3AF] text-sm"
                    />
                  </div>
                </div>

                {/* Dropdown options */}
                {open && !loading && chatbots.length > 0 && (
                  <div className="absolute w-full bg-[#0F0A1F] rounded-[8px] mt-1 shadow-lg z-10 border border-[#A78BFA]">
                    {options.map((option) => (
                      <div
                        key={option}
                        className="px-4 md:px-[18px] py-2 md:py-[11px] text-[#E5E7EB] hover:bg-[#A78BFA] cursor-pointer first:rounded-t-[8px] last:rounded-b-[8px] text-[12px] md:text-[14px]"
                        onClick={() => handleBotSelection(option)}
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
          {/* card 1 - Total Students */}
          <div className='w-full max-w-[269px] mx-auto sm:mx-0 transition-all duration-300 ease-in-out hover:shadow-[0px_8px_36.2px_0px_#8A38F540,0px_-7px_13.4px_0px_#4A00E05C] h-[160px] md:h-[181px] rounded-[18px] p-4 md:p-[19px] flex flex-col gap-3 md:gap-4 opacity-100 bg-gradient-to-b from-[#0F0A1F] to-[#1E1B29]'>
            <div className='w-[32px] h-[32px] md:w-[36px] md:h-[36px] flex items-center justify-center rounded-[12px] border border-[#FFFFFF0D] p-[6.5px_1px] opacity-100 bg-[#FFFFFF0F] backdrop-blur-[3px] z-0'>
              <FontAwesomeIcon icon={faUsers} className='text-white text-sm md:text-base'></FontAwesomeIcon>
            </div>
            <p className='font-poppins font-normal text-[12px] md:text-[13.33px] leading-[100%] tracking-[0] align-middle text-[#9CA3AF]'>Total Students</p>
            <h1 className='font-poppins font-semibold text-[24px] md:text-[27.65px] leading-[100%] tracking-[0] align-middle text-white'>
              {userData?.teacher_profile?.total_students || 1248}
            </h1>
            <p className='font-poppins font-normal text-[12px] md:text-[13.33px] leading-[100%] tracking-[0] align-middle text-[#9CA3AF]'>+38 this week</p>
          </div>

          {/* card 2 - Active Chatbots */}
          <div className='w-full max-w-[269px] mx-auto sm:mx-0 h-[160px] md:h-[181px] transition-all duration-300 ease-in-out hover:shadow-[0px_8px_36.2px_0px_#8A38F540,0px_-7px_13.4px_0px_#4A00E05C] rounded-[18px] p-4 md:p-[19px] flex flex-col gap-3 md:gap-4 opacity-100 bg-gradient-to-b from-[#0F0A1F] to-[#1E1B29]'>
            <div className='w-[32px] h-[32px] md:w-[36px] md:h-[36px] flex items-center justify-center rounded-[12px] border border-[#FFFFFF0D] p-[6.5px_1px] opacity-100 bg-[#FFFFFF0F] backdrop-blur-[3px]'>
              <img src="bot-1.png" className='w-[18px] h-[18px] md:w-[20px] md:h-[20px] lg:w-[25px] lg:h-[25px] object-cover' alt="EduBot Logo" />
            </div>
            <p className='font-poppins font-normal text-[12px] md:text-[13.33px] leading-[100%] tracking-[0] align-middle text-[#9CA3AF]'>Active Chatbots</p>
            <h1 className='font-poppins font-semibold text-[24px] md:text-[27.65px] leading-[100%] tracking-[0] align-middle text-white'>{chatbots.length}</h1>
            <p className='font-poppins font-normal text-[12px] md:text-[13.33px] leading-[100%] tracking-[0] align-middle text-[#9CA3AF]'>
              {chatbots.length > 0 ? `${chatbots.length} currently active` : "No active bots"}
            </p>
          </div>

          {/* card 3 - Bot Uptime */}
          <div className='w-full max-w-[269px] mx-auto sm:mx-0 h-[160px] md:h-[181px] transition-all duration-300 ease-in-out hover:shadow-[0px_8px_36.2px_0px_#8A38F540,0px_-7px_13.4px_0px_#4A00E05C] rounded-[18px] p-4 md:p-[19px] flex flex-col gap-3 md:gap-4 opacity-100 bg-gradient-to-b from-[#0F0A1F] to-[#1E1B29]'>
            <div className='w-[32px] h-[32px] md:w-[36px] md:h-[36px] flex items-center justify-center rounded-[12px] border border-[#FFFFFF0D] p-[6.5px_1px] opacity-100 bg-[#FFFFFF0F] backdrop-blur-[3px]'>
              <FontAwesomeIcon icon={faClock} className='text-white text-lg md:text-xl'></FontAwesomeIcon>
            </div>
            <p className='font-poppins font-normal text-[12px] md:text-[13.33px] leading-[100%] tracking-[0] align-middle text-[#9CA3AF]'>Bot Uptime</p>
            <h1 className='font-poppins font-semibold text-[24px] md:text-[27.65px] leading-[100%] tracking-[0] align-middle text-white'>99.9%</h1>
            <p className='font-poppins font-normal text-[12px] md:text-[13.33px] leading-[100%] tracking-[0] align-middle text-[#9CA3AF]'>Past 24h</p>
          </div>

          {/* card 4 - Requests Today */}
          <div className='w-full max-w-[269px] mx-auto sm:mx-0 h-[160px] md:h-[181px] transition-all duration-300 ease-in-out hover:shadow-[0px_8px_36.2px_0px_#8A38F540,0px_-7px_13.4px_0px_#4A00E05C] rounded-[18px] p-4 md:p-[19px] flex flex-col gap-3 md:gap-4 opacity-100 bg-gradient-to-b from-[#0F0A1F] to-[#1E1B29]'>
            <div className='w-[32px] h-[32px] md:w-[36px] md:h-[36px] flex items-center justify-center rounded-[12px] border border-[#FFFFFF0D] p-[6.5px_1px] opacity-100 bg-[#FFFFFF0F] backdrop-blur-[3px]'>
              <img src="box.png" className='w-[18px] h-[18px] md:w-[20px] md:h-[20px] lg:w-[25px] lg:h-[25px] object-cover' alt="EduBot Logo" />
            </div>
            <p className='font-poppins font-normal text-[12px] md:text-[13.33px] leading-[100%] tracking-[0] align-middle text-[#9CA3AF]'>Requests Today</p>
            <h1 className='font-poppins font-semibold text-[24px] md:text-[27.65px] leading-[100%] tracking-[0] align-middle text-white'>
              {userData?.teacher_profile?.daily_requests || 3204}
            </h1>
            <p className='font-poppins font-normal text-[12px] md:text-[13.33px] leading-[100%] tracking-[0] align-middle text-[#9CA3AF]'>+12% vs yesterday</p>
          </div>
        </section>

        {/* chatbots */}
        <section className='w-full max-w-[1010px] h-auto lg:h-[373px] rounded-[18px] opacity-100 bg-[#24222E] mt-8 md:mt-12 lg:mt-18 overflow-hidden mx-auto'>
          <h1 className='font-poppins p-4 md:p-6 font-semibold text-[22px] md:text-[25px] lg:text-[27.65px] leading-[100%] text-white'>
            My Chatbots ({chatbots.length})
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

              {loading ? (
                <div className='text-white text-center py-8'>Loading chatbots...</div>
              ) : chatbots.length === 0 ? (
                <div className='text-white text-center py-8'>
                  <p>No chatbots found</p>
                  <button
                    onClick={onNavigateToCreateBot}
                    className='text-[#8B5CF6] underline hover:text-[#EC4899] transition-colors duration-200'
                  >
                    Create your first bot
                  </button>
                </div>
              ) : (
                <>
                  {/* Mobile view */}
                  <div className='md:hidden space-y-4 py-2'>
                    {chatbots.map((bot, index) => (
                      <div key={bot._id} className='bg-[#2A2835] rounded-[12px] p-4'>
                        <div className='grid grid-cols-2 gap-2 mb-3'>
                          <div>
                            <p className='text-[#9CA3AF] text-xs'>Bot Name</p>
                            <p className='text-white text-sm'>{bot.name}</p>
                          </div>
                          <div>
                            <p className='text-[#9CA3AF] text-xs'>Class</p>
                            <p className='text-white text-sm'>{bot.grade}</p>
                          </div>
                        </div>
                        <div className='grid grid-cols-2 gap-2 mb-3'>
                          <div>
                            <p className='text-[#9CA3AF] text-xs'>Subject</p>
                            <p className='text-white text-sm'>{bot.subject}</p>
                          </div>
                          <div>
                            <p className='text-[#9CA3AF] text-xs'>Created At</p>
                            <p className='text-white text-sm'>{formatDate(bot.created_at)}</p>
                          </div>
                        </div>
                        <div className='mb-3'>
                          <p className='text-[#9CA3AF] text-xs'>Bot ID</p>
                          <div className='flex items-center gap-2'>
                            <p className='text-white text-sm'>{bot._id}</p>
                            <div onClick={() => handleCopy(bot._id)} className='w-[20px] h-[20px] cursor-pointer flex items-center justify-center rounded-[8px] border border-[#FFFFFF14] bg-gradient-to-r from-[rgba(139,92,246,0.35)] to-[rgba(236,72,153,0.35)]'>
                              <FontAwesomeIcon className='text-[10px]' icon={faLink} />
                            </div>
                          </div>
                        </div>
                        <div className='mb-3'>
                          <p className='text-[#9CA3AF] text-xs'>Teacher ID</p>
                          <p className='text-white text-sm'>{bot.teacher_id}</p>
                        </div>
                        <div className='flex items-center gap-2 justify-start'>
                          <Link to={'/managebot'}>
                            <button className='w-[70px] h-[35px] rounded-[10px] border border-[#FFFFFF14] bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] font-poppins font-bold text-[10px] text-white'>
                              Manage
                            </button>
                          </Link>
                          <button
                            onClick={() => handleDeleteBot(bot._id)}
                            className='w-[60px] h-[35px] rounded-[10px] bg-[#EF4444] font-poppins font-bold text-[10px] text-white hover:bg-[#DC2626] transition-colors'
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Desktop view */}
                  <div className='hidden md:block'>
                    {chatbots.map((bot, index) => (
                      <React.Fragment key={bot._id}>
                        <div className='grid grid-cols-7 items-center mt-5 font-poppins font-medium text-[14px] md:text-[16px] text-[#E5E7EB] px-4 md:px-5'>
                          <h1>{bot.name}</h1>
                          <h1>{bot.grade}</h1>
                          <h1 className='ms-2'>{bot.subject}</h1>
                          <h1>{formatDate(bot.created_at)}</h1>

                          {/* Bot ID with icon */}
                          <div className='flex items-center gap-2'>
                            <h1>{bot._id.substring(0, 8)}...</h1>
                            <div onClick={() => handleCopy(bot._id)} className='w-[22px] h-[22px] md:w-[25px] md:h-[25px] cursor-pointer flex items-center justify-center rounded-[12px] border border-[#FFFFFF14] bg-gradient-to-r from-[rgba(139,92,246,0.35)] to-[rgba(236,72,153,0.35)] shadow-[0px_8px_22px_0px_#8B5CF640] hover:opacity-80 transition-opacity'>
                              <FontAwesomeIcon className='text-[10px] md:text-[12px]' icon={faLink} />
                            </div>
                          </div>

                          <h1 className='text-[10px]'>{bot.teacher_id}</h1>

                          {/* Actions */}
                          <div className='flex items-center gap-2 md:gap-3 justify-center'>
                            <Link to={'/managebot'}>
                              <button className='w-[70px] md:w-[69px] h-[35px] md:h-[41px] rounded-[10px] md:rounded-[12px] border border-[#FFFFFF14] bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] font-poppins font-bold text-[10px] md:text-[12px] text-white hover:opacity-90 transition-opacity'>
                                Manage
                              </button>
                            </Link>
                            <button
                              onClick={() => handleDeleteBot(bot._id)}
                              className='w-[60px] md:w-[67px] h-[35px] md:h-[41px] rounded-[10px] md:rounded-[12px] bg-[#EF4444] font-poppins font-bold text-[10px] md:text-[12px] text-white hover:bg-[#DC2626] transition-colors'
                            >
                              Delete
                            </button>
                          </div>
                        </div>

                        {/* line under row */}
                        {index < chatbots.length - 1 && (
                          <div className='hidden md:flex justify-center items-center mt-3 shrink-0'>
                            <div className='w-[95%] md:w-[983px] h-0 border border-[#FFFFFF66] opacity-25'></div>
                          </div>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </>
              )}
            </div>
          </section>
        </section>

        {/* Student Access Requests */}
        <section className='w-full max-w-[1010px] h-auto lg:h-[373px] rounded-[18px] bg-[#24222E] mt-8 md:mt-12 lg:mt-18 overflow-hidden mx-auto'>
          <h1 className='font-poppins p-4 md:p-6 font-semibold text-[22px] md:text-[25px] lg:text-[27.65px] text-white'>
            Student Access Requests for {selectedBot?.name || "Select a Bot"} ({filteredStudentRequests.length})
          </h1>

          {/* table container */}
          <section className='mt-2 flex flex-col h-auto lg:h-[calc(100%-80px)]'>

            {/* header */}
            <div className='hidden md:grid md:grid-cols-4 font-poppins font-medium text-[14px] md:text-[16px] text-[#E5E7EB] px-4 md:px-8 shrink-0'>
              <h1>Student ID</h1>
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

              {requestsLoading ? (
                <div className='text-white text-center py-8'>Loading student requests...</div>
              ) : !selectedBot ? (
                <div className='text-white text-center py-8'>Please select a bot to view student requests</div>
              ) : filteredStudentRequests.length === 0 ? (
                <div className='text-white text-center py-8'>No student requests found for this bot</div>
              ) : (
                <>
                  {/* Mobile view */}
                  <div className='md:hidden space-y-4 py-2'>
                    {filteredStudentRequests.map((request) => (
                      <div key={request.id} className='bg-[#2A2835] rounded-[12px] p-4'>
                        <div className='grid grid-cols-1 gap-2 mb-3'>
                          <div>
                            <p className='text-[#9CA3AF] text-xs'>Student ID</p>
                            <p className='text-white text-sm'>{request.student_id}</p>
                          </div>
                          <div>
                            <p className='text-[#9CA3AF] text-xs'>Requested Bot</p>
                            <p className='text-white text-sm'>{request.bot_name}</p>
                          </div>
                        </div>
                        <div className='mb-3'>
                          <p className='text-[#9CA3AF] text-xs'>Status</p>
                          <div className={`w-[87px] h-[32px] rounded-[8px] ${getStatusColor(request.status).border} px-2 py-1 flex items-center justify-center mt-1`}>
                            <p className={`font-normal text-[12px] ${getStatusColor(request.status).text} capitalize`}>
                              {request.status}
                            </p>
                          </div>
                        </div>
                        <div className='flex items-center gap-2 justify-start'>
                          {request.status === 'pending' ? (
                            <>
                              <button
                                onClick={() => handleRequestAction(request.id, 'approve')}
                                className='w-[70px] h-[35px] rounded-[10px] border border-[#FFFFFF14] bg-[#34C759B2] font-normal text-[11px] text-white hover:bg-[#34C759] transition-colors'
                              >
                                Approve
                              </button>
                              <button
                                onClick={() => handleRequestAction(request.id, 'reject')}
                                className='w-[60px] h-[35px] rounded-[10px] bg-[#EF4444B2] font-normal text-[11px] text-white hover:bg-[#EF4444] transition-colors'
                              >
                                Reject
                              </button>
                            </>
                          ) : (
                            <button className='w-[70px] h-[35px] rounded-[10px] border border-[#FFFFFF14] shadow-[0_8px_22px_0_#8B5CF640] font-normal text-[11px] text-white'>
                              View
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Desktop view */}
                  <div className='hidden md:block'>
                    {filteredStudentRequests.map((request, index) => (
                      <React.Fragment key={request.id}>
                        <div className='grid grid-cols-4 items-center mt-5 font-poppins font-medium text-[14px] md:text-[16px] text-[#E5E7EB] px-4 md:px-5'>
                          <h1>{request.student_id}</h1>
                          <h1>{request.bot_name}</h1>
                          <div className={`w-[80px] md:w-[87px] h-[34px] md:h-[38px] rounded-[8px] md:rounded-[10px] ${getStatusColor(request.status).border} px-2 md:px-[11px] py-1 md:py-[7px] flex items-center justify-center`}>
                            <h1 className={`font-normal text-[12px] md:text-[13.33px] ${getStatusColor(request.status).text} capitalize`}>
                              {request.status}
                            </h1>
                          </div>
                          <div className='flex items-center gap-2 md:gap-3 justify-center'>
                            {request.status === 'pending' ? (
                              <>
                                <button
                                  onClick={() => handleRequestAction(request.id, 'approve')}
                                  className='w-[70px] md:w-[83px] h-[35px] md:h-[43px] rounded-[10px] md:rounded-[12px] border border-[#FFFFFF14] bg-[#34C759B2] font-normal text-[11px] md:text-[13.33px] text-white hover:bg-[#34C759] transition-colors'
                                >
                                  Approve
                                </button>
                                <button
                                  onClick={() => handleRequestAction(request.id, 'reject')}
                                  className='w-[60px] md:w-[67px] h-[35px] md:h-[43px] rounded-[10px] md:rounded-[12px] bg-[#EF4444B2] font-normal text-[11px] md:text-[13.33px] text-white hover:bg-[#EF4444] transition-colors'
                                >
                                  Reject
                                </button>
                              </>
                            ) : (
                              <button className='w-[70px] md:w-[57px] h-[41px] md:h-[43px] rounded-[10px] md:rounded-[12px] border border-[#FFFFFF14] shadow-[0_8px_22px_0_#8B5CF640] font-normal text-[11px] md:text-[13.33px] text-white'>
                                View
                              </button>
                            )}
                          </div>
                        </div>

                        {/* line under row */}
                        {index < filteredStudentRequests.length - 1 && (
                          <div className='hidden md:flex justify-center items-center mt-3 shrink-0'>
                            <div className='w-[95%] md:w-[948px] h-0 border border-[#FFFFFF66] opacity-25'></div>
                          </div>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </>
              )}
            </div>
          </section>
        </section>
      </section>
    </>
  )
}
