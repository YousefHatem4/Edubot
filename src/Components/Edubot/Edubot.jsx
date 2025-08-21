import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEllipsisVertical, faPaperclip, faImage, faSmile,
  faMicrophone, faPaperPlane, faStop, faSun, faMoon
} from '@fortawesome/free-solid-svg-icons';
import EmojiPicker from 'emoji-picker-react';

export default function Edubot() {
  // ---------------------------
  // State Variables
  // ---------------------------
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your AI teaching assistant. How can I help you with your studies today?",
      sender: 'assistant',
      timestamp: getCurrentTime()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isOnline, setIsOnline] = useState(true);
  const [isRecording, setIsRecording] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  // ---------------------------
  // Refs
  // ---------------------------
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const emojiPickerRef = useRef(null);
  const chatContainerRef = useRef(null);

  // ---------------------------
  // Effects
  // ---------------------------

  // Auto-scroll chat when messages change
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // Close emoji picker if clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (emojiPickerRef.current && !emojiPickerRef.current.contains(e.target)) {
        setShowEmojiPicker(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // ---------------------------
  // Helper Functions
  // ---------------------------

  // Get current time in HH:MM format
  function getCurrentTime() {
    return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  // Add a new message to chat
  function addMessage(sender, text, image = null) {
    setMessages(prev => [
      ...prev,
      { id: prev.length + 1, sender, text, image, timestamp: getCurrentTime() }
    ]);
  }

  // Generate AI response based on user message
  function generateAIResponse(msg) {
    const text = msg.toLowerCase();
    if (text.includes('quantum') || text.includes('physics')) {
      return "Quantum physics explores how particles behave at the smallest scales...";
    }
    if (text.includes('math') || text.includes('calculus')) {
      return "I'd be happy to help with mathematics! Are you struggling with derivatives, integrals, or limits?";
    }
    if (text.includes('hello') || text.includes('hi')) {
      return "Hello! How can I assist with your studies today?";
    }
    return "That's an interesting question. Could you provide more details?";
  }

  // ---------------------------
  // Event Handlers
  // ---------------------------

  // Send message when clicking send button or pressing Enter
  function handleSendMessage() {
    if (!inputText.trim()) return;

    const userMessage = inputText;
    addMessage('user', userMessage);
    setInputText('');

    // Simulate AI response after 1 second
    setTimeout(() => {
      addMessage('assistant', generateAIResponse(userMessage));
    }, 1000);
  }

  // Trigger send on Enter key press
  const handleKeyPress = (e) => e.key === 'Enter' && handleSendMessage();

  // Start voice recording
  async function startRecording() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;
      const chunks = [];

      recorder.ondataavailable = e => chunks.push(e.data);
      recorder.onstop = () => {
        const audioBlob = new Blob(chunks, { type: 'audio/wav' });
        simulateSpeechRecognition();
      };

      recorder.start();
      setIsRecording(true);
    } catch {
      alert('Could not access microphone.');
    }
  }

  // Stop voice recording
  function stopRecording() {
    if (!mediaRecorderRef.current || !isRecording) return;

    mediaRecorderRef.current.stop();
    mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
    setIsRecording(false);
  }

  // Simulate speech recognition transcription
  function simulateSpeechRecognition() {
    setTimeout(() => setInputText("This is a simulated voice message transcription"), 1500);
  }

  // Handle image file selection
  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      addMessage('user', '[Image]', event.target.result);
      setTimeout(() => addMessage('assistant', "Thanks for sharing this image. How can I help you with it?"), 1000);
    };
    reader.readAsDataURL(file);
  };

  // ---------------------------
  // Theme Colors
  // ---------------------------
  const colors = {
    navbarBg: isDarkMode ? '#0f071a' : '#F3F4F6',
    navbarText: isDarkMode ? '#FFFFFF' : '#1F2937',
    chatBg: isDarkMode ? 'linear-gradient(to right, #2E0854, #1B0034)' : 'linear-gradient(to right, #E5E7EB, #F3F4F6)',
    assistantMsgBg: isDarkMode ? '#6a1b9a' : '#9333EA',
    userMsgBg: isDarkMode ? '#2C2C2C' : '#E5E7EB',
    inputBg: isDarkMode ? '#1F293799' : '#FFFFFF',
    inputText: isDarkMode ? '#ADAEBC' : '#1F2937',
    iconColor: isDarkMode ? '#A855F7' : '#7C3AED',
    onlineColor: isOnline ? (isDarkMode ? '#4CAF50' : '#16A34A') : '#9CA3AF'
  };

  // ---------------------------
  // Render
  // ---------------------------
  return (
    <>
      {/* Navbar */}
      <nav className='w-full h-[81px] border-b opacity-100 pt-3 relative'
        style={{ backgroundColor: colors.navbarBg, borderColor: isDarkMode ? '#581C874D' : '#D1D5DB' }}>
        <section className='flex gap-4 items-center justify-start md:justify-center lg:me-170 relative px-4 md:px-0'>
          {/* Profile Picture */}
          <div className='border-2 flex items-center justify-center w-14 h-14 rounded-full border-[#6a1b9a]'>
            <img src="profile image.jpg" className='w-12 h-12 object-cover rounded-full' alt="Profile" />
          </div>

          {/* Online Status Indicator */}
          <div className={`w-4 h-4 rounded-full border-2 absolute left-14 top-10 md:left-84`} style={{ backgroundColor: colors.onlineColor }}></div>

          {/* Name & Status */}
          <div>
            <h1 className='font-roboto font-semibold text-[18px] leading-[28px]' style={{ color: colors.navbarText }}>EduBot Assistant</h1>
            <p className='font-roboto font-normal text-[14px] leading-[20px]' style={{ color: isDarkMode ? '#9CA3AF' : '#6B7280' }}>
              {isOnline ? 'Online now' : 'Offline'}
            </p>
          </div>

          {/* More Options Icon */}
          <FontAwesomeIcon className='cursor-pointer hidden md:block' style={{ color: colors.navbarText }} icon={faEllipsisVertical} />

          {/* Theme Toggle Button */}
          <button
            onClick={() => setIsDarkMode(prev => !prev)}
            className='absolute right-4 md:-right-60 cursor-pointer top-2 p-2 rounded-full border'
            style={{ borderColor: isDarkMode ? '#6a1b9a' : '#D1D5DB', backgroundColor: isDarkMode ? '#1B0034' : '#F9FAFB' }}
          >
            <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon} style={{ color: isDarkMode ? '#FBBF24' : '#374151' }} />
          </button>
        </section>
      </nav>

      {/* Main Chat Container */}
      <div className="flex flex-col h-[calc(100vh-81px)]" style={{ background: colors.chatBg }}>
        {/* Chat Messages */}
        <section ref={chatContainerRef} className="flex-grow overflow-y-auto px-4 py-4" style={{ maxHeight: 'calc(100vh - 81px - 125px)' }}>
          <div className='max-w-4xl mx-auto space-y-6'>
            {messages.map(msg => (
              <div key={msg.id} className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                {/* Assistant Avatar */}
                {msg.sender === 'assistant' && <img src="profile image.jpg" className='w-8 h-8 rounded-full' alt="Assistant" />}

                {/* Message Bubble */}
                <div className={`max-w-[448px] p-3 rounded-tl-[6px] rounded-tr-[16px] rounded-br-[16px] rounded-bl-[16px]`}
                  style={{ backgroundColor: msg.sender === 'assistant' ? colors.assistantMsgBg : colors.userMsgBg }}>
                  {msg.image && <img src={msg.image} alt="Uploaded" className="max-w-full h-auto rounded-md mb-2" />}
                  <p className='break-words whitespace-pre-wrap' style={{ color: msg.sender === 'assistant' ? '#FFFFFF' : (isDarkMode ? '#FFFFFF' : '#1F2937') }}>
                    {msg.text}
                  </p>
                  <p className='font-roboto text-[12px] mt-2 text-right'
                    style={{ color: msg.sender === 'assistant' ? (isDarkMode ? '#F3E8FF' : '#6B7280') : (isDarkMode ? '#FFFFFF' : '#6B7280') }}>
                    {msg.timestamp}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </section>

        {/* Input Section */}
        <section className='w-full h-[125px] px-4 md:px-6 py-4 gap-3 relative' style={{ backgroundColor: isDarkMode ? '#1B0034' : '#F3F4F6' }}>
          {/* Input Row */}
          <section className='flex items-center justify-center gap-2'>
            {/* File Attach */}
            <FontAwesomeIcon icon={faPaperclip} className="text-2xl cursor-pointer" style={{ color: colors.iconColor }} onClick={() => fileInputRef.current?.click()} />
            <input type="file" ref={fileInputRef} onChange={handleFileSelect} accept="image/*" style={{ display: 'none' }} />

            {/* Text Input */}
            <input
              type="text"
              value={inputText}
              onChange={e => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your question here..."
              className='p-5 font-poppins text-[16px] leading-[24px] w-full md:w-[1408.5px] h-[50px] rounded-full border'
              style={{ backgroundColor: colors.inputBg, color: colors.inputText, borderColor: isDarkMode ? '#4B5563' : '#D1D5DB' }}
            />

            {/* Send Button */}
            <button onClick={handleSendMessage} disabled={!inputText.trim()} className='w-10 h-10 flex items-center justify-center rounded-full hover:opacity-80 transition disabled:opacity-50 disabled:cursor-not-allowed' style={{ backgroundColor: colors.iconColor }}>
              <FontAwesomeIcon icon={faPaperPlane} className="text-white" />
            </button>
          </section>

          {/* Action Buttons */}
          <section className='mt-5 flex items-center justify-between'>
            <div className='flex gap-3'>
              {/* Voice Recording */}
              <button onClick={isRecording ? stopRecording : startRecording} className={`p-2 rounded-full -me-3 cursor-pointer`} style={{ backgroundColor: isRecording ? '#EF4444' : 'transparent' }}>
                <FontAwesomeIcon icon={isRecording ? faStop : faMicrophone} className={isRecording ? "text-white text-lg" : `text-lg`} style={{ color: colors.iconColor }} />
              </button>

              {/* Image Upload */}
              <button onClick={() => fileInputRef.current?.click()}>
                <FontAwesomeIcon icon={faImage} className={`text-lg cursor-pointer`} style={{ color: colors.iconColor }} />
              </button>

              {/* Emoji Picker Toggle */}
              <button onClick={() => setShowEmojiPicker(prev => !prev)}>
                <FontAwesomeIcon icon={faSmile} className={`text-lg cursor-pointer`} style={{ color: colors.iconColor }} />
              </button>
            </div>

            {/* Online Status */}
            <div className='font-poppins text-[12px]' style={{ color: isDarkMode ? '#9CA3AF' : '#6B7280' }}>
              AI Assistant is {isOnline ? 'online' : 'offline'}
            </div>
          </section>

          {/* Emoji Picker */}
          {showEmojiPicker && (
            <div ref={emojiPickerRef} className="absolute bottom-20 right-4 z-10">
              <EmojiPicker onEmojiClick={(e) => { setInputText(prev => prev + e.emoji); setShowEmojiPicker(false); }} />
            </div>
          )}
        </section>
      </div>
    </>
  );
}
