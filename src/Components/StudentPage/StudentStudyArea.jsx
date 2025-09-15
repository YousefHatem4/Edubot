import React, { useState, useEffect, useRef } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDays,
  faChartLine,
  faCheck,
  faClock,
  faFire,
  faPause,
  faPlay,
  faPlus,
  faVolumeHigh,
  faTrash,
  faChevronLeft,
  faChevronRight
} from "@fortawesome/free-solid-svg-icons";

export default function StudentStudyArea() {
  // Todo List State
  const [todos, setTodos] = useState([
    { id: 1, text: "Complete Math Assignment", completed: false },
    { id: 2, text: "Read Chapter 5", completed: true },
    { id: 3, text: "Practice coding", completed: false },
    { id: 4, text: "Review notes", completed: true },
    { id: 5, text: "Prepare presentation", completed: false },
  ]);
  const [newTodo, setNewTodo] = useState("");
  const [showAddTodo, setShowAddTodo] = useState(false);

  // Pomodoro Timer State
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef(null);

  // Brown Noise State
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(50);
  const [currentTrack, setCurrentTrack] = useState('brown-noise');
  const audioRef = useRef(null);

  // Calendar State
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Audio tracks for brown noise
  const tracks = {
    'brown-noise': { name: 'Brown Noise', url: 'brown-noise.mp3' },
  };

  // Todo Functions
  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, {
        id: Date.now(),
        text: newTodo.trim(),
        completed: false
      }]);
      setNewTodo("");
      setShowAddTodo(false);
    }
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  };

  // Pomodoro Timer Functions
  useEffect(() => {
    if (isRunning && !isPaused) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            setIsRunning(false);
            setIsPaused(false);
            // Reset to 25 minutes
            return 25 * 60;
          }
          return prevTime - 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning, isPaused]);

  const startTimer = () => {
    setIsRunning(true);
    setIsPaused(false);
  };

  const pauseTimer = () => {
    setIsPaused(true);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setIsPaused(false);
    setTimeLeft(25 * 60);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // Brown Noise Functions
  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseInt(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume / 100;
    }
  };

  // Calendar Functions
  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const navigateMonth = (direction) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + direction, 1));
  };

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const dayNames = ["S", "M", "T", "W", "T", "F", "S"];

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="w-8 h-8"></div>);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const isToday = new Date().getDate() === day &&
        new Date().getMonth() === currentDate.getMonth() &&
        new Date().getFullYear() === currentDate.getFullYear();

      days.push(
        <div
          key={day}
          className={`w-8 h-8 flex items-center justify-center text-xs cursor-pointer rounded-full hover:bg-[#A259FF]/20 ${isToday ? 'bg-[#A259FF] text-white' : 'text-[#E5E7EB]'
            }`}
          onClick={() => setSelectedDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day))}
        >
          {day}
        </div>
      );
    }

    return days;
  };

  return <>
    <section className='study-area-container min-h-[150vh] bg-[linear-gradient(117.93deg,#0F0A1F_0.23%,#1E1B29_79.52%)] p-4 md:p-8 lg:p-15 flex flex-col items-center gap-8 md:gap-12 lg:gap-20'>
      {/* Audio element for brown noise */}
      <audio
        ref={audioRef}
        src={tracks[currentTrack].url}
        loop
        onLoadedData={() => {
          if (audioRef.current) {
            audioRef.current.volume = volume / 100;
          }
        }}
      />

      {/* title */}
      <section className="title-section w-full max-w-[940px] h-auto lg:h-[249px] rounded-[10px] p-[1px] bg-[linear-gradient(90deg,#8B5CF6_0%,#3B82F6_100%)]">
        <div className="title-content w-full h-full rounded-[9px] bg-gradient-to-b from-[#0F0A1F] to-[#1E1B29] opacity-100 flex flex-col lg:flex-row px-4 md:px-8 lg:px-10 py-6 lg:py-15 items-center gap-4 lg:gap-7">
          <div className="title-avatar w-16 h-16 lg:w-[96px] lg:h-[96px] rounded-full opacity-100 
  bg-[linear-gradient(91.27deg,#8B5CF6_0.46%,#EC4899_99.62%)] 
  shadow-lg shadow-black/10 flex items-center justify-center flex-shrink-0">
            <svg width="35" height="39" lg:width="45" lg:height="49" viewBox="0 0 45 49" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M35.2466 18.1347L34.0405 20.2605C32.906 22.26 32.3388 23.2598 31.1033 23.3471C29.8678 23.4344 29.344 22.7197 28.2966 21.2903C27.1274 19.6948 26.387 17.8199 26.1246 15.8594C25.8794 14.0277 25.7568 13.1119 25.4601 12.6622C24.9865 11.9444 24.035 11.5495 23.3237 11.1316C21.4503 10.031 20.5136 9.48069 20.2676 8.54654C20.0217 7.61239 20.5625 6.65922 21.6441 4.75288C22.7257 2.84653 23.2665 1.89336 24.1845 1.64306C25.1024 1.39275 26.0391 1.94307 27.9125 3.0437C28.6238 3.4616 29.4356 4.10271 30.2833 4.16118C30.8144 4.19782 31.6551 3.84792 33.3366 3.14814C35.1362 2.39915 37.1021 2.11423 39.0445 2.34681C40.7847 2.55519 41.6548 2.65937 42.1983 3.79183C42.7417 4.92428 42.1745 5.92405 41.04 7.92358L39.8354 10.0467M35.2466 18.1347L36.2416 18.7193C38.4364 20.0087 41.2429 19.2435 42.5101 17.0101C43.7773 14.7767 43.0253 11.9208 40.8305 10.6313L39.8354 10.0467M35.2466 18.1347L39.8354 10.0467" stroke="white" strokeWidth="2" />
              <path d="M11.0417 26.7917C11.0417 29.323 8.98964 31.375 6.45833 31.375C3.92703 31.375 1.875 29.323 1.875 26.7917C1.875 24.2604 3.92703 22.2084 6.45833 22.2084C8.98964 22.2084 11.0417 24.2604 11.0417 26.7917Z" stroke="white" strokeWidth="2" />
              <path d="M8.75 24.5001L24.7917 13.0417" stroke="white" strokeWidth="2" strokeLinejoin="round" />
              <path d="M11.041 47.4167H27.0827" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M8.75 31.375L20.2083 47.4167" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className='title-text flex flex-col gap-3 lg:gap-5 text-center lg:text-left'>
            <h1 className='font-poppins font-semibold text-2xl lg:text-[33.18px] leading-[100%] tracking-[0%] text-white'>Welcome , Mohamed👋</h1>
            <h2 className='w-full lg:w-[730px] h-auto lg:h-[121px] opacity-100 
   font-poppins font-semibold text-lg lg:text-[27.65px] leading-[130%] tracking-[0%] 
   text-[#E5E7EB]'><span className='bg-[linear-gradient(91.27deg,#8B5CF6_0.46%,#EC4899_99.62%)] bg-clip-text text-transparent'>The study area</span> helps you focus on studying in general in any subjects and is a great source of income for you. We wish you success.</h2>
          </div>
        </div>
      </section>

      {/* main sections */}
      <section className='flex flex-col gap-4 md:gap-6 lg:gap-7 w-full max-w-[940px]'>
        {/* first row */}
        <section className='widgets-row flex flex-col md:grid md:grid-cols-2 lg:flex lg:flex-row items-center justify-center gap-4 md:gap-6 lg:gap-9'>
          {/* todo list */}
          <section className='widget-card w-full max-w-[350px] md:max-w-[300px] lg:w-[290px] lg:max-w-none h-[298px] opacity-100 rounded-[16px] 
  border border-[#1F2937] bg-[#111827]/50 p-4 lg:p-5'>
            {/* title */}
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-2'>
                <div>
                  <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_618_18572)">
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
              <FontAwesomeIcon
                icon={faPlus}
                className='text-[#A259FF] cursor-pointer hover:text-[#8B5CF6] transition-colors'
                onClick={() => setShowAddTodo(!showAddTodo)}
              />
            </div>

            {/* Add new todo input */}
            {showAddTodo && (
              <div className='mt-4 flex gap-2'>
                <input
                  type="text"
                  value={newTodo}
                  onChange={(e) => setNewTodo(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Add new task..."
                  className='flex-1 px-2 py-1 text-sm bg-[#374151] text-white border border-[#4B5563] rounded focus:outline-none focus:border-[#A259FF]'
                  autoFocus
                />
                <button
                  onClick={addTodo}
                  className='px-2 py-1 bg-[#A259FF] text-white text-xs rounded hover:bg-[#8B5CF6] transition-colors'
                >
                  Add
                </button>
              </div>
            )}

            {/* tasks - with fixed height and scroll */}
            <section className='h-[200px] overflow-y-auto scrollbar-hide mt-6'>
              <div className='flex flex-col gap-3 pr-2'>
                {todos.map((todo) => (
                  <section key={todo.id} className='flex items-center gap-2 group'>
                    <div
                      className={`w-[16px] h-[16px] opacity-100 rounded-[1px] cursor-pointer transition-colors ${todo.completed
                          ? 'bg-[#0075FF] flex items-center justify-center'
                          : 'border-black/100 border-[0.5px] bg-white hover:bg-gray-100'
                        }`}
                      onClick={() => toggleTodo(todo.id)}
                    >
                      {todo.completed && (
                        <FontAwesomeIcon icon={faCheck} className='text-white text-xs' />
                      )}
                    </div>
                    <h1 className={`flex-1 font-inter font-normal text-[14px] leading-[20px] tracking-[0%] ${todo.completed ? 'line-through text-[#B0B0B0]' : 'text-white'
                      }`}>
                      {todo.text}
                    </h1>
                    <FontAwesomeIcon
                      icon={faTrash}
                      className='text-red-500 text-xs cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity hover:text-red-400'
                      onClick={() => deleteTodo(todo.id)}
                    />
                  </section>
                ))}
              </div>
            </section>
          </section>

          {/* pomodoro timer */}
          <section className='widget-card w-full max-w-[350px] md:max-w-[300px] lg:w-[290px] lg:max-w-none h-[298px] rounded-[16px] border border-[#1F2937] opacity-100 bg-[#111827]/50 p-4 lg:p-5'>
            {/* title */}
            <div className='flex items-center gap-2'>
              <FontAwesomeIcon icon={faClock} className='text-[#A259FF] text-xl'></FontAwesomeIcon>
              <h1 className='font-inter font-semibold text-[18px] leading-[28px] tracking-[0%] text-white'>Pomodoro Timer</h1>
            </div>
            {/* clock */}
            <div className='flex items-center justify-center mt-7 flex-col'>
              <div className='w-[128px] h-[128px] opacity-100 rounded-full 
  bg-transparent border-4 border-[#374151] flex items-center justify-center relative'>
                {/* Progress ring */}
                <div className="absolute inset-0">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="50%"
                      cy="50%"
                      r="58"
                      stroke="#A259FF"
                      strokeWidth="4"
                      fill="none"
                      strokeDasharray={`${((25 * 60 - timeLeft) / (25 * 60)) * 364} 364`}
                      className="transition-all duration-1000"
                    />
                  </svg>
                </div>
                <h1 className='font-inter font-bold text-[24px] leading-[32px] tracking-[0%] text-white z-10'>
                  {formatTime(timeLeft)}
                </h1>
              </div>
              <div className='mt-5 flex items-center gap-4'>
                {!isRunning || isPaused ? (
                  <button
                    onClick={startTimer}
                    className='w-[78.75px] h-[36px] opacity-100 rounded-[8px] 
  bg-[#A259FF] hover:bg-[#8B5CF6] transition-colors
  font-inter font-medium text-[14px] leading-[100%] tracking-[0%] 
  text-center text-white flex items-center justify-center gap-1'
                  >
                    <FontAwesomeIcon icon={faPlay}></FontAwesomeIcon>
                    {isPaused ? 'Resume' : 'Start'}
                  </button>
                ) : (
                  <button
                    onClick={pauseTimer}
                    className='w-[78.75px] h-[36px] opacity-100 
  rounded-[8px] bg-[#374151] hover:bg-[#4B5563] transition-colors
  font-inter font-medium text-[14px] leading-[100%] tracking-[0%] 
  text-center text-white flex items-center justify-center gap-1'
                  >
                    <FontAwesomeIcon icon={faPause}></FontAwesomeIcon>
                    Pause
                  </button>
                )}
                <button
                  onClick={resetTimer}
                  className='w-[78.75px] h-[36px] opacity-100 
  rounded-[8px] bg-[#6B7280] hover:bg-[#9CA3AF] transition-colors
  font-inter font-medium text-[14px] leading-[100%] tracking-[0%] 
  text-center text-white flex items-center justify-center'
                >
                  Reset
                </button>
              </div>
            </div>
          </section>

          {/* calendar section */}
          <section className='widget-card w-full max-w-[350px] md:max-w-[300px] lg:w-[290px] lg:max-w-none h-[298px] opacity-100 
  rounded-[16px] border border-[#1F2937] 
  bg-[#111827]/50 p-4 lg:p-5'>
            {/* title */}
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-2'>
                <FontAwesomeIcon icon={faCalendarDays} className='text-[#A259FF] text-xl'></FontAwesomeIcon>
                <h1 className='font-inter font-semibold text-[18px] leading-[28px] tracking-[0%] text-white'>
                  {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                </h1>
              </div>
              <div className='flex gap-2'>
                <FontAwesomeIcon
                  icon={faChevronLeft}
                  className='text-[#A259FF] cursor-pointer hover:text-[#8B5CF6] transition-colors'
                  onClick={() => navigateMonth(-1)}
                />
                <FontAwesomeIcon
                  icon={faChevronRight}
                  className='text-[#A259FF] cursor-pointer hover:text-[#8B5CF6] transition-colors'
                  onClick={() => navigateMonth(1)}
                />
              </div>
            </div>

            {/* calendar grid */}
            <div className='mt-4'>
              {/* Day headers */}
              <div className='grid grid-cols-7 gap-1 mb-2'>
                {dayNames.map((day) => (
                  <div key={day} className='w-8 h-6 flex items-center justify-center text-xs font-medium text-[#9CA3AF]'>
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar days */}
              <div className='grid grid-cols-7 gap-1'>
                {renderCalendar()}
              </div>
            </div>
          </section>
        </section>

        {/* second row */}
        <section className='widgets-row flex flex-col lg:flex-row items-center justify-center gap-4 md:gap-6 lg:gap-9'>
          {/* brown noise */}
          <section className='widget-card w-full max-w-[350px] lg:w-[290px] lg:max-w-none h-[266px] opacity-100 rounded-[16px] border border-[#1F2937] bg-[#11182780] p-4 lg:p-5'>
            {/* title */}
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-3'>
                <FontAwesomeIcon icon={faVolumeHigh} className='text-[#A259FF] text-xl'></FontAwesomeIcon>
                <h1 className='font-inter font-semibold text-[18px] leading-[28px] tracking-[0%] text-white'>
                  {tracks[currentTrack].name}
                </h1>
              </div>

            </div>
            {/* play section */}
            <div className='flex flex-col items-center justify-center mt-6 gap-4'>
              <div
                className='w-[64px] h-[64px] opacity-100 rounded-full bg-[#A259FF33] flex items-center justify-center cursor-pointer hover:bg-[#A259FF55] transition-colors'
                onClick={togglePlayPause}
              >
                <FontAwesomeIcon
                  icon={isPlaying ? faPause : faPlay}
                  className='text-[#A259FF] text-xl'
                />
              </div>

              <p className='font-inter font-normal text-[14px] leading-[100%] tracking- text-center text-[#B0B0B0]'>Volume</p>

              {/* volume section */}
              <div className='flex items-center w-[140px] relative'>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="w-full h-2 bg-[#E5E5E5] rounded-full outline-none slider"
                  style={{
                    background: `linear-gradient(to right, #0075FF 0%, #0075FF ${volume}%, #E5E5E5 ${volume}%, #E5E5E5 100%)`
                  }}
                />
              </div>

              <p className='font-inter font-normal text-[12px] leading-[100%] tracking- text-center text-[#B0B0B0]'>
                {isPlaying ? `Playing - ${volume}%` : 'Not playing'}
              </p>
            </div>
          </section>

          {/* study stats */}
          <section className='study-stats-wide widget-card w-full max-w-[614px] lg:w-[614px] lg:max-w-none h-[266px] opacity-100 rounded-[16px] border border-[#1F2937] bg-[#11182780] p-4 lg:p-5'>
            {/* title */}
            <div className='flex items-center gap-2'>
              <FontAwesomeIcon icon={faChartLine} className='text-[#A259FF] text-xl'></FontAwesomeIcon>
              <h1 className='font-inter font-semibold text-[18px] leading-[28px] tracking-[0%] text-white'>Study Stats</h1>
            </div>
            {/* stats section */}
            <div className='study-stats-content flex flex-col md:flex-row items-center justify-around mt-8 gap-4 md:gap-0'>
              <div className='flex flex-col gap-2 items-center'>
                <h1 className='font-inter font-bold text-[24px] leading-[100%] tracking- text-[#A259FF]'>2.5</h1>
                <p className='font-inter font-normal text-[12px] leading-[100%] tracking-  text-[#B0B0B0]'>Hours Today</p>
              </div>
              <div className='flex flex-col gap-2 items-center'>
                <h1 className='font-inter font-bold text-[24px] leading-[100%] tracking- text-[#4CAF50]'>{todos.filter(t => t.completed).length}</h1>
                <p className='font-inter font-normal text-[12px] leading-[100%] tracking-  text-[#B0B0B0]'>Tasks Done</p>
              </div>
              <div className='flex flex-col gap-2 items-center'>
                <h1 className='font-inter font-bold text-[24px] leading-[100%] tracking- text-[#F97316]'>8</h1>
                <p className='font-inter font-normal text-[12px] leading-[100%] tracking-  text-[#B0B0B0]'>Pomodoros</p>
              </div>
              <div className='flex flex-col gap-2 items-center'>
                <h1 className='font-inter font-bold text-[24px] leading-[100%] tracking- text-[#3B82F6]'>95%</h1>
                <p className='font-inter font-normal text-[12px] leading-[100%] tracking-  text-[#B0B0B0]'>Focus Score</p>
              </div>
            </div>
          </section>
        </section>

        {/* third row */}
        <section className='third-row flex '>
          {/* streaks */}
          <section className='widget-card w-full max-w-[350px] lg:w-[290px] lg:max-w-none h-[298px] opacity-100 rounded-[16px] border border-[#1F2937] bg-[#11182780] p-4 lg:p-5'>
            {/* title */}
            <div className='flex items-center gap-1'>
              <FontAwesomeIcon icon={faFire} className='text-[#F97316] text-xl'></FontAwesomeIcon>
              <h1 className='font-inter font-semibold text-[18px] leading-[28px] tracking-[0%] text-white'>Study Streak</h1>
            </div>
            {/* days row*/}
            <div className='flex flex-col gap-3 items-center mt-5'>
              <h1 className='font-inter font-bold text-[30px] leading-[100%] tracking- text-[#4CAF50]'>7</h1>
              <p className='font-inter font-normal text-[14px] leading-[100%] tracking-  text-[#B0B0B0]'>Days in a row</p>
            </div>
            {/* weekly goals */}
            <div className='mt-5'>
              <div className='flex items-center justify-between'>
                <h1 className='font-inter font-normal text-[14px] leading-[20px] tracking- text-white'>Weekly Goal</h1>
                <h1 className='font-inter font-normal text-[14px] leading-[20px] tracking- text-[#4CAF50]'>5/7 days</h1>
              </div>
              <div className='mt-4 flex items-center relative'>
                <div className='w-[235.39px] md:w-[170.39px] h-[8px] rounded-full opacity-100 bg-[#4CAF50] z-10'></div>
                <div className='w-[85px] h-[8px] rounded-full opacity-100 bg-[#374151] absolute right-0'></div>
              </div>
            </div>
          </section>
        </section>
      </section>

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #0075FF;
          cursor: pointer;
        }
        .slider::-moz-range-thumb {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #0075FF;
          cursor: pointer;
          border: none;
        }

        /* Mobile-first responsive design */
        @media (max-width: 767px) {
          .study-area-container {
            min-height: 100vh;
          }
          
          .title-section {
            margin: 0 !important;
          }
          
          .widgets-row {
            width: 100% !important;
          }
          
          .widget-card {
            margin: 0 auto !important;
          }
          
          .study-stats-content {
            display: grid !important;
            grid-template-columns: 1fr 1fr !important;
            gap: 1.5rem !important;
          }
        }

        @media (min-width: 768px) and (max-width: 1023px) {
          .widgets-row:first-of-type .widget-card:last-child {
            grid-column: 1 / -1 !important;
            justify-self: center !important;
            max-width: 350px !important;
          }
        }
      `}</style>
    </section>
  </>
}
