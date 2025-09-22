import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faEye, faEyeSlash, faLock, faPenToSquare, faRobot, faUser, faXmark } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import toast from 'react-hot-toast'

export default function StudentProfile() {
    const [enabled, setEnabled] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [name, setName] = useState("")
    const [isEditing, setIsEditing] = useState(false)
    const [loading, setLoading] = useState(true)
    const [userData, setUserData] = useState(null)
    const [botId, setBotId] = useState("")
    const [requestLoading, setRequestLoading] = useState(false)
    const [membershipRequests, setMembershipRequests] = useState([])
    const [requestsLoading, setRequestsLoading] = useState(true)

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

    // Fetch membership requests
    const fetchMembershipRequests = async () => {
        try {
            setRequestsLoading(true)
            const response = await axios.get('http://16.171.18.65:8000/memberships/my', {
                headers: getAuthHeaders()
            })

            // Transform the API response - flatten all status arrays into a single array
            const allRequests = []

            // The API returns an object with status keys, each containing arrays of requests
            Object.keys(response.data).forEach(status => {
                if (Array.isArray(response.data[status])) {
                    response.data[status].forEach(request => {
                        allRequests.push({
                            ...request,
                            status: status === 'accepted' ? 'accepted' : status === 'expired' ? 'rejected' : 'pending'
                        })
                    })
                }
            })

            // Sort by creation date (newest first)
            allRequests.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))

            setMembershipRequests(allRequests)
        } catch (error) {
            console.error('Error fetching membership requests:', error)
            if (error.response?.status === 401) {
                toast.error("Authentication failed. Please login again.")
            } else {
                // Keep empty array if API fails
                setMembershipRequests([])
            }
        } finally {
            setRequestsLoading(false)
        }
    }

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
        fetchMembershipRequests()
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

    // Format date for requests (shorter format)
    const formatRequestDate = (dateString) => {
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

    // Get status styling
    const getStatusStyle = (status) => {
        switch (status?.toLowerCase()) {
            case 'pending':
                return {
                    bgColor: 'bg-[#EAB30833]',
                    textColor: 'text-[#FACC15]'
                }
            case 'accepted':
                return {
                    bgColor: 'bg-[#27C8401A]',
                    textColor: 'text-[#22C55E]'
                }
            case 'rejected':
                return {
                    bgColor: 'bg-[#EF444433]',
                    textColor: 'text-[#F87171]'
                }
            default:
                return {
                    bgColor: 'bg-[#374151]',
                    textColor: 'text-[#9CA3AF]'
                }
        }
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

    // Handle bot access request
    const handleBotAccessRequest = async (e) => {
        e.preventDefault()

        if (!botId.trim()) {
            toast.error("Please enter a Bot ID")
            return
        }

        try {
            setRequestLoading(true)

            await axios.post(`http://16.171.18.65:8000/memberships/request/${botId}`, {}, {
                headers: getAuthHeaders()
            })

            toast.success("Bot access request sent successfully!")
            setBotId("") // Clear the input field

            // Refresh membership requests after successful request
            fetchMembershipRequests()

        } catch (error) {
            console.error('Error requesting bot access:', error)
            if (error.response?.status === 401) {
                toast.error("Authentication failed. Please login again.")
            } else if (error.response?.status === 404) {
                toast.error("Bot not found. Please check the Bot ID.")
            } else if (error.response?.data?.detail) {
                toast.error(error.response.data.detail)
            } else {
                toast.error("Failed to send bot access request")
            }
        } finally {
            setRequestLoading(false)
        }
    }

    // Handle clear form
    const handleClearForm = () => {
        setBotId("")
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
            <section className="min-h-screen bg-gradient-to-r from-[#0A0710] to-[#1B0034] opacity-100 p-6 md:p-15 flex items-center justify-center">
                <div className="text-white text-xl">Loading profile...</div>
            </section>
        )
    }

    if (!userData) {
        return (
            <section className="min-h-screen bg-gradient-to-r from-[#0A0710] to-[#1B0034] opacity-100 p-6 md:p-15 flex items-center justify-center">
                <div className="text-white text-xl">Failed to load profile data</div>
            </section>
        )
    }

    return <>
        <section className="min-h-screen bg-gradient-to-r from-[#0A0710] to-[#1B0034] opacity-100 p-4 sm:p-6 md:p-8 lg:p-15 flex flex-col items-center gap-6 md:gap-8 relative">

            {/* profile box */}
            <section className="w-full max-w-[991px] p-[1px] rounded-[10px] bg-gradient-to-r from-[#8B5CF6] to-[#3B82F6]">
                <div className="h-auto rounded-[9px] bg-gradient-to-b from-[#0F0A1F] to-[#1E1B29] px-4 sm:px-5 md:px-8 lg:px-15 py-4 sm:py-6 md:py-8 lg:py-12 flex flex-col md:flex-row justify-between gap-4 md:gap-0">
                    <div className="flex flex-col md:flex-row gap-4 md:gap-5 items-center">

                        <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-[96px] lg:h-[96px] rounded-full opacity-100 bg-[linear-gradient(135deg,#8B5CF6_25%,#3B82F6_95.71%)] shadow-lg flex items-center justify-center shadow-black/10">
                            <h1 className="font-inter font-bold text-[16px] sm:text-[18px] md:text-[20.4px] leading-[32px] tracking-[0] align-middle text-white">
                                {getInitials(userData.name)}
                            </h1>
                        </div>

                        <div className="flex flex-col gap-2 sm:gap-3 md:gap-4 text-center md:text-left">
                            <h1 className="font-poppins font-bold text-lg sm:text-xl md:text-[24px] lg:text-[28px] leading-[100%] tracking-[0.2px] text-[#E5E7EB]">
                                {userData.name}
                            </h1>

                            <div className="flex flex-wrap justify-center md:justify-start items-center gap-2">
                                <div className="w-auto min-w-[63px] h-[28px] px-2 rounded-full opacity-100 bg-[#A78BFA33] flex items-center justify-center">
                                    <h1 className="font-poppins font-medium text-xs sm:text-[11.9px] text-[#8B5CF6] capitalize">
                                        {userData.role}
                                    </h1>
                                </div>
                                <div className="w-auto min-w-[63px] h-[28px] px-2 rounded-full opacity-100 bg-[#22C55E33] flex items-center justify-center">
                                    <h1 className="font-poppins font-medium text-xs sm:text-[11.9px] text-[#22C55E]">
                                        {userData.is_active ? 'Active' : 'Inactive'}
                                    </h1>
                                </div>
                            </div>

                            <p className="font-poppins font-medium text-xs sm:text-sm md:text-[14px] lg:text-[16px] text-[#9CA3AF]">
                                Member since {formatDate(userData.created_at)}
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
                                <h1 className='text-white text-sm sm:text-[15px] md:text-[16px] font-medium'>{userData.name}</h1>
                            </div>
                            <div>
                                <p className='text-[#9CA3AF] mb-1 md:mb-2 text-xs sm:text-[12px] md:text-[13.33px]'>Email</p>
                                <h1 className='text-white text-sm sm:text-[15px] md:text-[16px] font-medium'>{userData.email}</h1>
                            </div>
                            <div>
                                <p className='text-[#9CA3AF] mb-1 md:mb-2 text-xs sm:text-[12px] md:text-[13.33px]'>Role</p>
                                <h1 className='text-white text-sm sm:text-[15px] md:text-[16px] font-medium capitalize'>{userData.role}</h1>
                            </div>
                        </div>

                        {/* left part */}
                        <div className='flex flex-col gap-3 md:gap-4 mt-4 md:mt-0'>
                            {/* Only show these fields if user has student_profile or if they are a student */}
                            {userData.role === 'student' && (
                                <>
                                    <div>
                                        <p className='text-[#9CA3AF] mb-1 md:mb-2 text-xs sm:text-[12px] md:text-[13.33px]'>Account Created</p>
                                        <h1 className='text-white text-sm sm:text-[15px] md:text-[16px] font-medium'>{formatDate(userData.created_at)}</h1>
                                    </div>
                                    <div>
                                        <p className='text-[#9CA3AF] mb-1 md:mb-2 text-xs sm:text-[12px] md:text-[13.33px]'>User ID</p>
                                        <h1 className='text-white text-sm sm:text-[15px] md:text-[16px] font-medium'>{userData._id}</h1>
                                    </div>
                                </>
                            )}
                            {/* status */}
                            <section className=''>
                                <p className='text-[#9CA3AF] mb-1 md:mb-2 text-xs sm:text-[12px] md:text-[13.33px]'>Status</p>
                                <h1 className={`text-xs sm:text-[13px] md:text-[13.33px] ${userData.is_active ? 'text-[#22C55E]' : 'text-[#EF4444]'}`}>
                                    {userData.is_active ? 'Active' : 'Inactive'}
                                </h1>
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
                            <h1 className='font-poppins font-semibold text-base sm:text-lg md:text-[18px] leading-[28px] text-white align-middle'>{userData.name}</h1>
                            <h2 className='font-poppins font-semibold text-base sm:text-lg md:text-[18px] leading-[28px] text-white'>Math Bot helper</h2>
                            <p className='font-poppins font-normal text-xs sm:text-sm md:text-[14px] leading-[20px] text-[#9CA3AF] align-middle'>Valid until: 2024-12-31 (365 days left)</p>
                        </div>
                        <div className='flex items-center gap-3 self-start sm:self-auto'>
                            <div className="w-auto min-w-[63px] h-[28px] px-2 rounded-full opacity-100 bg-[#22C55E33] flex items-center justify-center">
                                <h1 className="font-poppins font-medium text-xs sm:text-[11.9px] text-[#22C55E]">Active</h1>
                            </div>
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
                {/* left box - Requests Status */}
                <section className='w-full lg:w-[533px] h-auto rounded-[16px] p-4 sm:p-5 md:p-6 flex flex-col gap-4 bg-gradient-to-b from-[#0F0A1F] to-[#1E1B29] opacity-100'>
                    <h1 className='text-white text-base sm:text-lg md:text-[19.2px] font-normal'>Requests Status</h1>

                    {requestsLoading ? (
                        <div className='w-full h-auto flex items-center justify-center rounded-[16px] p-4 bg-[#100E17] opacity-100'>
                            <p className='text-[#9CA3AF] text-sm'>Loading requests...</p>
                        </div>
                    ) : membershipRequests.length === 0 ? (
                        <div className='w-full h-auto flex items-center justify-center rounded-[16px] p-4 bg-[#100E17] opacity-100'>
                            <p className='text-[#9CA3AF] text-sm'>No requests found</p>
                        </div>
                    ) : (
                        membershipRequests.map((request, index) => (
                            <div key={request._id || index} className='w-full h-auto flex flex-col sm:flex-row justify-between items-center rounded-[16px] p-4 bg-[#100E17] opacity-100 gap-2 sm:gap-0'>
                                <div>
                                    <h1 className='font-poppins font-semibold text-sm sm:text-base md:text-[16px] leading-6 align-middle text-[#FFFFFF]'>Bot Request</h1>
                                    <p className='font-poppins font-normal text-xs sm:text-sm md:text-[14px] leading-5 align-middle text-[#9CA3AF]'>
                                        ID: {request.bot_id?.substring(0, 8) || 'N/A'} | Requested: {formatRequestDate(request.created_at)}
                                    </p>
                                </div>
                                <div className={`w-auto min-w-[83px] h-[28px] px-3 py-1 rounded-full ${getStatusStyle(request.status).bgColor} opacity-100 flex items-center justify-center`}>
                                    <h1 className={`font-poppins font-semibold text-xs sm:text-sm leading-5 ${getStatusStyle(request.status).textColor} capitalize`}>
                                        {request.status}
                                    </h1>
                                </div>
                            </div>
                        ))
                    )}
                </section>

                {/* right box - Request Access to a Bot */}
                <section className='w-full lg:w-[427px] h-auto rounded-[16px] p-4 sm:p-5 md:p-6 flex flex-col gap-4 bg-gradient-to-b from-[#0F0A1F] to-[#1E1B29] opacity-100'>
                    <h1 className='text-white text-base sm:text-lg md:text-[19.2px] font-normal'>Request Access to a Bot</h1>
                    <form onSubmit={handleBotAccessRequest} className="flex flex-col gap-4">
                        {/* Input 1 */}
                        <input
                            type="text"
                            placeholder="Enter Bot ID"
                            value={botId}
                            onChange={(e) => setBotId(e.target.value)}
                            className="w-full h-[53px] rounded-[12px] border-2 border-[#374151] 
               px-4 sm:px-[18px] pt-[13px] pb-[14px] bg-[#100E17] opacity-100
               font-poppins font-normal text-sm sm:text-base leading-[100%] text-[#6B7280] 
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
                                disabled={requestLoading}
                                className="w-full sm:w-[220px] h-[48px] rounded-[12px] 
                 bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] 
                 shadow-[0px_8px_36.2px_0px_#8A38F540,0px_-7px_13.4px_0px_#4A00E05C]
                 font-poppins font-normal text-base sm:text-[19.2px] leading-[100%] text-white 
                 opacity-100 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed
                 hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]
                 transition"
                            >
                                {requestLoading ? "Requesting..." : "Request Access"}
                            </button>

                            {/* Secondary Clear Button */}
                            <button
                                type="button"
                                onClick={handleClearForm}
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

                                    <label htmlFor="pass" className="block mt-4 sm:mt-6 md:mt-8 text-lg sm:text-xl md:text-[26px] text-[#E5E7EB]">Password (optional)</label>
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
                                            placeholder="Leave blank to keep current password"
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
