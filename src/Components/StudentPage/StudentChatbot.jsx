import React, { useEffect, useRef, useState, forwardRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faBookBookmark,
  faChevronDown,
  faChevronUp,
  faGraduationCap,
  faPenToSquare,
  faRightFromBracket,
  faUser,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { faClock, faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import { Link, useNavigate } from "react-router-dom";


/* tiny helper to compose tailwind classes clearly while keeping styles unchanged */
function cn(...parts) {
  return parts.filter(Boolean).join(" ");
}


/* Arabic text detection utility */
function isArabicText(text) {
  const arabicRegex = /[\u0600-\u06FF\u0750-\u077F]/;
  return arabicRegex.test(text);
}


/* ---------- Subcomponents ---------- */
const HeaderMobile = ({ menuOpen, setMenuOpen }) => (
  <div className="lg:hidden fixed top-0 left-0 w-full bg-gradient-to-r from-[#0F0A1F] to-[#1E1B29] z-40 flex justify-between items-center px-4 py-3 shadow-md">
    <div className="flex items-center gap-3">
      <div className="w-[36px] h-[36px] rounded-[10px] bg-gradient-to-br from-[#A259FF] to-[#6B21FF] flex justify-center items-center">
        <FontAwesomeIcon className="text-white text-[16px]" icon={faGraduationCap} />
      </div>
      <h1 className="font-inter font-extrabold text-[18px] text-white">EduBot</h1>
    </div>
    <button
      onClick={() => setMenuOpen(!menuOpen)}
      className="text-white text-xl focus:outline-none cursor-pointer"
    >
      <FontAwesomeIcon icon={menuOpen ? faXmark : faBars} />
    </button>
  </div>
);


const SidebarHeader = ({ collapsed, setCollapsed }) => (
  <div className="hidden lg:block">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-[45px] h-[45px] rounded-[8px] bg-[linear-gradient(135deg,#8E2DE2_5%,#4A00E0_95%)] flex justify-center items-center shadow-lg transform transition-transform duration-300 hover:scale-110">
          <img
            src="bot-1.png"
            className="w-[20px] h-[20px] lg:w-[30px] lg:h-[30px] object-cover"
            alt="EduBot Logo"
          />
        </div>
        <h1
          className={cn(
            "font-inter font-semibold text-[27.65px] text-white tracking-wide transition-all duration-300 ease-in-out",
            collapsed ? "opacity-0 w-0 overflow-hidden" : "opacity-100 w-auto"
          )}
        >
          EduBot
        </h1>
      </div>
      <div
        className="cursor-pointer transform transition-transform duration-300 hover:scale-110 hidden lg:block"
        onClick={() => setCollapsed((v) => !v)}
      >
        {collapsed ? <>
          <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.5 1.5V9.5M21.5 5.5L13.5 5.5" stroke="#E5E7EB" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M1.5 5.5C1.5 4.09987 1.5 3.3998 1.77248 2.86502C2.01217 2.39462 2.39462 2.01217 2.86502 1.77248C3.3998 1.5 4.09987 1.5 5.5 1.5C6.90013 1.5 7.6002 1.5 8.13498 1.77248C8.60538 2.01217 8.98783 2.39462 9.22752 2.86502C9.5 3.3998 9.5 4.09987 9.5 5.5C9.5 6.90013 9.5 7.6002 9.22752 8.13498C8.98783 8.60538 8.60538 8.98783 8.13498 9.22752C7.6002 9.5 6.90013 9.5 5.5 9.5C4.09987 9.5 3.3998 9.5 2.86502 9.22752C2.39462 8.98783 2.01217 8.60538 1.77248 8.13498C1.5 7.6002 1.5 6.90013 1.5 5.5Z" stroke="#E5E7EB" stroke-width="1.5" />
            <path d="M1.5 17.5C1.5 16.0999 1.5 15.3998 1.77248 14.865C2.01217 14.3946 2.39462 14.0122 2.86502 13.7725C3.3998 13.5 4.09987 13.5 5.5 13.5C6.90013 13.5 7.6002 13.5 8.13498 13.7725C8.60538 14.0122 8.98783 14.3946 9.22752 14.865C9.5 15.3998 9.5 16.0999 9.5 17.5C9.5 18.9001 9.5 19.6002 9.22752 20.135C8.98783 20.6054 8.60538 20.9878 8.13498 21.2275C7.6002 21.5 6.90013 21.5 5.5 21.5C4.09987 21.5 3.3998 21.5 2.86502 21.2275C2.39462 20.9878 2.01217 20.6054 1.77248 20.135C1.5 19.6002 1.5 18.9001 1.5 17.5Z" stroke="#E5E7EB" stroke-width="1.5" />
            <path d="M13.5 17.5C13.5 16.0999 13.5 15.3998 13.7725 14.865C14.0122 14.3946 14.3946 14.0122 14.865 13.7725C15.3998 13.5 16.0999 13.5 17.5 13.5C18.9001 13.5 19.6002 13.5 20.135 13.7725C20.6054 14.0122 20.9878 14.3946 21.2275 14.865C21.5 15.3998 21.5 16.0999 21.5 17.5C21.5 18.9001 21.5 19.6002 21.2275 20.135C20.9878 20.6054 20.6054 20.9878 20.135 21.2275C19.6002 21.5 18.9001 21.5 17.5 21.5C16.0999 21.5 15.3998 21.5 14.865 21.2275C14.3946 20.9878 14.0122 20.6054 13.7725 20.135C13.5 19.6002 13.5 18.9001 13.5 17.5Z" stroke="#E5E7EB" stroke-width="1.5" />
          </svg>
        </> : <>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={cn("transform transition-transform duration-500", collapsed ? "rotate-180" : "")}
          >
            <path d="M22 6L14 6" stroke="#E5E7EB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path
              d="M2 6C2 4.59987 2 3.8998 2.27248 3.36502C2.51217 2.89462 2.89462 2.51217 3.36502 2.27248C3.8998 2 4.59987 2 6 2C7.40013 2 8.1002 2 8.63498 2.27248C9.10538 2.51217 9.48783 2.89462 9.72752 3.36502C10 3.8998 10 4.59987 10 6C10 7.40013 10 8.1002 9.72752 8.63498C9.48783 9.10538 9.10538 9.48783 8.63498 9.72752C8.1002 10 7.40013 10 6 10C4.59987 10 3.8998 10 3.36502 9.72752C2.89462 9.4878 2.51217 9.10538 2.27248 8.63498C2 8.1002 2 7.40013 2 6Z"
              stroke="#E5E7EB"
              strokeWidth="1.5"
            />
            <path
              d="M2 18C2 16.5999 2 15.8998 2.27248 15.365C2.51217 14.8946 2.89462 14.5122 3.36502 14.2725C3.8998 14 4.59987 14 6 14C7.40013 14 8.1002 14 8.63498 14.2725C9.10538 14.5122 9.48783 14.8946 9.72752 15.365C10 15.8998 10 16.5999 10 18C10 19.4001 10 20.1002 9.72752 20.635C9.48783 21.1054 9.10538 21.4878 8.63498 21.7275C8.1002 22 7.40013 22 6 22C4.59987 22 3.8998 22 3.36502 21.7275C2.89462 21.4878 2.51217 21.1054 2.27248 20.635C2 20.1002 2 19.4001 2 18Z"
              stroke="#FFFFFF"
              strokeWidth="1.5"
            />
            <path
              d="M14 18C14 16.5999 14 15.8998 14.2725 15.365C14.5122 14.8946 14.8946 14.5122 15.365 14.2725C15.8998 14 16.5999 14 18 14C19.4001 14 20.1002 14 20.635 14.2725C21.1054 14.5122 21.4878 14.8946 21.7275 15.365C22 15.8998 22 16.5999 22 18C22 19.4001 22 20.1002 21.7275 20.635C21.4878 21.1054 21.1054 21.4878 20.635 21.7275C20.1002 22 19.4001 22 18 22C16.5999 22 15.8998 22 15.365 21.7275C14.8946 21.4878 14.5122 21.1054 14.2725 20.635C14 20.1002 14 19.4001 14 18Z"
              stroke="#E5E7EB"
              strokeWidth="1.5"
            />
          </svg>
        </>}
      </div>
    </div>
  </div>
);


/* ProfileNav with fixed positioning to appear outside the sidebar */
const ProfileNav = forwardRef(
  (
    {
      showProfileNav,
      isMobile,
      collapsed,
      studentProfile,
      chatbot,
      studyArea,
      setMenuOpen,
      navigate,
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          "transition-all duration-300 ease-out overflow-hidden",
          isMobile
            ? cn(
              "w-full",
              showProfileNav
                ? "max-h-[400px] opacity-100 mb-4"
                : "max-h-0 opacity-0"
            )
            : cn(
              "fixed z-50",
              collapsed ? "w-[220px] bottom-24" : "w-[300px] bottom-24",
              collapsed ? "left-[153px]" : "left-[324px]",
              showProfileNav
                ? "opacity-100 translate-y-0 pointer-events-auto"
                : "opacity-0 translate-y-2 pointer-events-none"
            )
        )}
      >
        <div className="pt-3 pr-4 pb-3 pl-4 gap-6 rounded-[14px] bg-gradient-to-b from-[#0F0A1F]/90 to-[#1E1B29]/90 shadow-2xl w-full border border-white/10">
          <h1 className={cn(
            "font-poppins font-semibold text-[15px] leading-[24px] tracking-[0.01em] text-[#9CA3AF] text-center",
            collapsed && !isMobile ? "truncate" : ""
          )}>
            MohamedBB@@gmail.com
          </h1>
          <section className={cn(
            "mt-2 flex flex-col gap-2 p-2 w-full",
            collapsed && !isMobile ? "items-center" : ""
          )}>
            <Link
              to={"/student-page"}
              className={cn(
                "flex items-center gap-3 rounded-[8px] cursor-pointer transition-all duration-200 w-full",
                collapsed && !isMobile ? "justify-center px-3 py-2" : "px-4 py-3",
                studentProfile
                  ? "bg-[linear-gradient(91.27deg,#8B5CF6_0.46%,#EC4899_99.62%)] shadow-lg scale-[1.02]"
                  : "hover:bg-white/10"
              )}
              onClick={() => isMobile && setMenuOpen(false)}
            >
              <FontAwesomeIcon className="text-white text-xl" icon={faUser} />
              {!collapsed || isMobile ? (
                <h1 className="font-semibold text-[16px] leading-[24px] tracking-[1%] text-white">
                  Profile
                </h1>
              ) : null}
            </Link>
            <Link
              to={"/edubot"}
              className={cn(
                "flex items-center gap-3 rounded-[8px] cursor-pointer transition-all duration-200 w-full",
                collapsed && !isMobile ? "justify-center px-3 py-2" : "px-4 py-3",
                chatbot
                  ? "bg-[linear-gradient(91.27deg,#8B5CF6_0.46%,#EC4899_99.62%)] shadow-lg scale-[1.02]"
                  : "hover:bg-white/10"
              )}
              onClick={() => isMobile && setMenuOpen(false)}
            >
              <img
                src="bot-1.png"
                className="w-[20px] h-[20px] lg:w-[24px] lg:h-[24px] object-cover"
                alt="EduBot Logo"
              />
              {!collapsed || isMobile ? (
                <h1 className="font-semibold text-[16px] leading-[24px] tracking-[1%] text-white">
                  My Chatbot
                </h1>
              ) : null}
            </Link>
            <div
              onClick={() => {
                navigate("/student-page", { state: { openTab: "studyArea" } });
                if (isMobile) setMenuOpen(false);
              }}
              className={cn(
                "flex items-center gap-3 rounded-[8px] cursor-pointer transition-all duration-200 w-full",
                collapsed && !isMobile ? "justify-center px-3 py-2" : "px-4 py-3",
                studyArea
                  ? "bg-[linear-gradient(91.27deg,#8B5CF6_0.46%,#EC4899_99.62%)] shadow-lg scale-[1.02]"
                  : "hover:bg-white/10"
              )}
            >
              <FontAwesomeIcon className="text-white text-xl" icon={faBookBookmark} />
              {!collapsed || isMobile ? (
                <h1 className="font-semibold text-[16px] leading-[24px] tracking-[1%] text-white">
                  Study Area
                </h1>
              ) : null}
            </div>
            <Link
              to={"/login"}
              className={cn(
                "flex items-center gap-3 rounded-[8px] cursor-pointer transition-all duration-200 w-full",
                collapsed && !isMobile ? "justify-center px-3 py-2" : "px-4 py-3",
                "hover:bg-white/10"
              )}
              onClick={() => isMobile && setMenuOpen(false)}
            >
              <FontAwesomeIcon className="text-[#EF4444] text-2xl" icon={faRightFromBracket} />
              {!collapsed || isMobile ? (
                <h1 className="font-semibold text-[16px] leading-[24px] tracking-[1%] text-white">
                  Logout
                </h1>
              ) : null}
            </Link>
          </section>
        </div>
      </div>
    );
  }
);


const MessageBubble = ({ message, isBot, collapsed, isMobile }) => {
  const isArabic = isArabicText(message.text);


  return (
    <div
      className={cn(
        "max-w-[100%] md:max-w-[100%] p-4 rounded-2xl",
        isBot ? "text-[#F3F4F6]" : "bg-[#9333EA6B] text-[#F3F4F6]",
        isBot && collapsed && !isMobile ? "-ms-35" : "",
        isArabic && isBot && collapsed ? '-ms-[15px]' : ''
      )}
      dir={isBot && isArabic ? "rtl" : "ltr"}
      style={{
        textAlign: isBot && isArabic ? "right" : "left"
      }}
    >
      <p className="font-poppins font-normal text-[13.33px] leading-[160%] break-words">{message.text}</p>
      {isBot && message.explanation && (
        <div className="mt-2 pt-2 border-t border-[#FFFFFF33]">
          <p
            className="text-[12px] text-[#CCCCCC] break-words"
            dir={isArabicText(message.explanation) ? "rtl" : "ltr"}
            style={{
              textAlign: isArabicText(message.explanation) ? "right" : "left"
            }}
          >
            {message.explanation}
          </p>
        </div>
      )}
    </div>
  );
};


const BotTyping = ({ collapsed, isMobile }) => (
  <div className={cn(
    "max-w-[85%] md:max-w-[70%] p-4 rounded-2xl bg-[#2D2A3B]",
    collapsed && !isMobile ? "ms-[30px]" : ""
  )}>
    <div className="flex space-x-2">
      <div className="w-2 h-2 rounded-full bg-[#F3F4F6] animate-bounce" />
      <div className="w-2 h-2 rounded-full bg-[#F3F4F6] animate-bounce" style={{ animationDelay: "0.2s" }} />
      <div className="w-2 h-2 rounded-full bg-[#F3F4F6] animate-bounce" style={{ animationDelay: "0.2s" }} />
    </div>
  </div>
);


/* Chatbot Header Component - NEW */
const ChatbotHeader = ({ selectedBot, collapsed, isMobile }) => {
  const getBotImage = () => {
    const botType = selectedBot.toLowerCase().replace(' bot', '');
    switch (botType) {
      case 'math':
        return 'bot-1.png';
      case 'chemistry':
        return 'bot-1.png';
      case 'biology':
        return 'bot-1.png';
      case 'english':
        return 'bot-1.png';
      default:
        return 'bot-1.png';
    }
  };

  const getBotName = () => {
    return selectedBot.replace(' bot', '').replace(' Bot', '');
  };

  return (
    <div className={cn(
      "flex flex-row gap-4 items-center py-3  mb-6",
      collapsed && !isMobile ? "ml-20" : ""
    )}>
     
        <img
          src='bahaa.jpg'
          className="w-[42px] h-[42px] rounded-[99px] opacity-100"
          alt="Chatbot Avatar"
        />
 
      <h2 className="font-poppins font-normal text-[13.33px] leading-[100%] align-middle text-[#E5E7EB] tracking-[0%] capitalize">
        {getBotName()} Bot, Mr Bahaa
      </h2>
    </div>
  );
};


/* ---------- Main Component ---------- */
export default function StudentChatbot() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("Math Bot");
  // KEY CHANGE: Initialize collapsed state based on screen size
  const [collapsed, setCollapsed] = useState(() => {
    // Only collapse on desktop/larger screens initially
    return window.innerWidth >= 1024;
  });
  const [sidebarWidth, setSidebarWidth] = useState(324);
  const [contentVisible, setContentVisible] = useState(true);
  const [studentProfile, setStudentProfile] = useState(false);
  const [chatbot, setChatbot] = useState(true);
  const [studyArea, setStudyArea] = useState(false);
  const navigate = useNavigate();
  const [showProfileNav, setShowProfileNav] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [isTablet, setIsTablet] = useState(window.innerWidth < 1280 && window.innerWidth >= 768);
  const options = ["chemistry Bot", "biology Bot", "English Bot"];
  const [showLine, setShowLine] = useState(() => window.innerWidth >= 1024);
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const profileNavRef = useRef(null);
  const profileTriggerRef = useRef(null);


  // Close profile nav on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (
        profileNavRef.current &&
        !profileNavRef.current.contains(e.target) &&
        profileTriggerRef.current &&
        !profileTriggerRef.current.contains(e.target)
      ) {
        setShowProfileNav(false);
      }
    }
    if (showProfileNav) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showProfileNav]);


  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };


  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);


  // lock page scroll like original
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const prevHtml = html.style.overflow;
    const prevBody = body.style.overflow;
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    return () => {
      html.style.overflow = prevHtml;
      body.style.overflow = prevBody;
    };
  }, []);


  // ENHANCED: responsive behavior with mobile-first approach
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const newIsMobile = width < 1024;
      const newIsTablet = width < 1280 && width >= 768;
      setIsMobile(newIsMobile);
      setIsTablet(newIsTablet);
      if (width >= 1024) {
        setMenuOpen(false);
      }
      // KEY CHANGE: Only force collapse state changes on desktop
      // Mobile screens should always stay expanded (not collapsed)
      if (newIsMobile) {
        setCollapsed(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    const newMessage = { text: inputMessage, sender: "user", timestamp: new Date() };
    setMessages((prev) => [...prev, newMessage]);
    setInputMessage("");
    setIsTyping(true);


    setTimeout(() => {
      // Check if user message contains Arabic to respond in Arabic
      const userMessageIsArabic = isArabicText(inputMessage);


      const botResponses = {
        physics: userMessageIsArabic
          ? "قانون نيوتن الأول ينص على أن الجسم سيبقى في حالة سكون أو في حركة منتظمة في خط مستقيم ما لم تؤثر عليه قوة خارجية. هذا ما يُعرف أيضاً بقانون القصور الذاتي."
          : "Newton's First Law states that an object will remain at rest or in uniform motion in a straight line unless acted upon by an external force. This is also known as the law of inertia.",
        math: userMessageIsArabic
          ? "نظرية فيثاغورس تنص على أنه في المثلث القائم الزاوية، مربع الوتر يساوي مجموع مربعي الضلعين الآخرين."
          : "The Pythagorean theorem states that in a right triangle, the square of the hypotenuse is equal to the sum of the squares of the other two sides.",
        chemistry: userMessageIsArabic
          ? "الجدول الدوري هو ترتيب جدولي للعناصر الكيميائية، منظم حسب العدد الذري والتكوين الإلكتروني والخصائص الكيميائية المتكررة."
          : "The periodic table is a tabular arrangement of chemical elements, organized by atomic number, electron configuration, and recurring chemical properties.",
        default: userMessageIsArabic
          ? "أنا هنا لمساعدتك في دراستك! هل يمكنك توضيح المادة التي تحتاج مساعدة فيها؟"
          : "I'm here to help with your studies! Could you please clarify which subject you need assistance with?",
      };


      const subject = selected.toLowerCase().replace(' bot', '');
      const botMessage = {
        text: botResponses[subject] || botResponses.default,
        sender: "bot",
        timestamp: new Date(),
        explanation: subject === "physics" && userMessageIsArabic
          ? "على سبيل المثال، كتاب على طاولة يبقى في مكانه حتى تدفعه. وبالمثل، كرة متحركة ستستمر في الحركة إلى الأبد إذا لم يكن هناك احتكاك أو مقاومة هوائية لإبطائها."
          : subject === "physics"
            ? "For example, a book on a table stays put until you push it. Similarly, a moving ball would continue moving forever if friction and air resistance didn't slow it down."
            : "",
      };


      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };


  // collapse transitions identical
  useEffect(() => {
    if (collapsed) {
      setContentVisible(false);
      const timer = setTimeout(() => {
        setSidebarWidth(isMobile ? 0 : 153);
        setShowLine(true);
      }, 250);
      return () => clearTimeout(timer);
    } else {
      setSidebarWidth(isMobile ? 280 : 324);
      setShowLine(false);
      const timer = setTimeout(() => {
        setContentVisible(true);
      }, 250);
      return () => clearTimeout(timer);
    }
  }, [collapsed, isMobile]);


  // Handle profile click
  const handleProfileClick = () => {
    setShowProfileNav(prev => !prev);
  };


  return (
    <section className="flex flex-col h-screen overflow-hidden overflow-x-hidden overscroll-contain">
      <section className="flex flex-1 min-h-0">
        <HeaderMobile menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        {/* Sidebar with flex layout */}
        <section
          className={cn(
            "sidebar bg-gradient-to-b from-[#0F0A1F] to-[#1E1B29] backdrop-blur-xl border-r border-white/10 flex flex-col shadow-2xl transform transition-all duration-500 ease-in-out fixed lg:sticky lg:top-0 z-30 h-screen",
            menuOpen ? "translate-x-0" : "-translate-x-[200px]",
            "lg:translate-x-0"
          )}
          style={{ width: isMobile ? (menuOpen ? "280px" : "0") : `${sidebarWidth}px` }}
        >
          {/* Fixed Header Section */}
          <div className="flex-shrink-0 p-5">
            <SidebarHeader collapsed={collapsed} setCollapsed={setCollapsed} />
          </div>
          {/* Scrollable Content Section */}
          <div className="flex-1 min-h-0 px-5 overflow-y-auto overflow-x-hidden [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            <section className="flex flex-col gap-6 mt-6 ms:mt-0">
              {/* New Chat */}
              <div
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-[4.31px] cursor-pointer transition-all duration-300 hover:scale-105",
                  collapsed ? "ms-8" : "hover:bg-[linear-gradient(91.27deg,rgba(139,92,246,0.5)_0.46%,rgba(236,72,153,0.5)_99.62%)]"
                )}
              >
                <FontAwesomeIcon className="text-white text-2xl" icon={faPenToSquare} />
                <h1
                  className={cn(
                    "font-semibold text-[17.25px] leading-[25.88px] tracking-[1%] text-white transition-all duration-300 ease-in-out",
                    collapsed ? "opacity-0 w-0 overflow-hidden" : "opacity-100 w-auto"
                  )}
                >
                  New Chat
                </h1>
              </div>
              {/* Bot Selector */}
              <div className={cn(collapsed && !isMobile ? "w-[124px]" : "w-full md:w-[260px] md:ms-4", "overflow-x-hidden")}>
                <div
                  className="w-full h-[38px] md:h-[42px] rounded-[8px] border-[#A78BFA] border-[1.3px] bg-[#0F0A1F] text-[#E5E7EB] px-4 md:px-[18px] py-2 md:py-[11px] font-poppins font-normal text-[12px] md:text-[13.33px] flex justify-between items-center cursor-pointer"
                  onClick={() => setOpen((v) => !v)}
                >
                  <span className="truncate max-w-[75%]">{selected}</span>
                  <div className="flex flex-col gap-[2px] pointer-events-none">
                    <FontAwesomeIcon icon={open ? faChevronUp : faChevronDown} className="text-[#9CA3AF] text-sm" />
                  </div>
                </div>
                <div
                  className={cn(
                    "overflow-hidden transition-all duration-500 ease-in-out",
                    open ? "max-h-40 opacity-100 mt-2" : "max-h-0 opacity-0"
                  )}
                >
                  <div className="w-full bg-[#0F0A1F] rounded-[8px] shadow-inner">
                    {options.map((option) => (
                      <div
                        key={option}
                        className="px-4 md:px-[18px] py-2 md:py-[11px] text-[#E5E7EB] hover:bg-[#A78BFA] cursor-pointer rounded-[8px] text-[12px] md:text-[14px]"
                        onClick={() => {
                          setSelected(option);
                          setOpen(false);
                          if (isMobile) setMenuOpen(false);
                        }}
                      >
                        {option}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              {showLine && (
                <div className="transition-all duration-500 ease-in-out">
                  <div className="w-[124px] bg-[#FFFFFF4D] h-[0.7px]" />
                </div>
              )}
              {/* Collapsible content */}
              <div
                className={cn(
                  "transition-all duration-500 ease-in-out",
                  contentVisible ? "opacity-100 max-h-screen" : "opacity-0 max-h-0 overflow-hidden"
                )}
              >
                <div className="flex justify-center transition-all duration-300 ease-in-out">
                  <div className="w-[300px] bg-[#FFFFFF4D] h-[0.7px]" />
                </div>
                {/* History */}
                <section className="mt-6">
                  <div className="w-[143.2px] h-[40px] rounded-tr-lg rounded-br-lg bg-[#6D28D9] opacity-100 flex items-center justify-center">
                    <h1 className="font-Poppins font-normal text-[13.33px] leading-[100%] tracking-normal text-center align-middle text-white">
                      History
                    </h1>
                  </div>
                  <h2 className="font-Poppins mt-9 font-normal text-[13.33px] leading-[100%] tracking-normal align-middle text-white">
                    History Chats
                  </h2>
                  <section className="flex flex-col gap-4 mt-4">
                    {["Forces and Motion", "Energy Conversion", "Electrical Circuits", "Wave Properties"].map((t, i) => (
                      <div key={i} className="w-[95%] h-[73.6px] rounded-[12px] bg-[#2D2A3B] opacity-100 border border-[#A855F733] p-3">
                        <h1 className="font-Inter font-medium text-[13.6px] leading-[24px] tracking-normal text-white align-middle">
                          {t}
                        </h1>
                        <div className="font-inter font-normal text-[11.9px] leading-[20px] text-gray-400 align-middle flex items-center gap-1 mt-1">
                          <FontAwesomeIcon icon={faClock} />
                          <h1>{["2 hours ago", "Yesterday", "3 days ago", "Last week"][i]}</h1>
                        </div>
                      </div>
                    ))}
                  </section>
                </section>
                <div className="flex justify-center transition-all duration-300 ease-in-out mt-6">
                  <div className="w-[300px] bg-[#FFFFFF4D] h-[0.7px]" />
                </div>
              </div>
              {/* Add some bottom padding to ensure scrolling works well */}
              <div className="h-4"></div>
            </section>
          </div>
          {/* Fixed Profile Section at Bottom */}
          <div className="flex-shrink-0 p-5 border-t border-white/10">
            <div className="relative">
              {/* Profile Navigation - Fixed positioned outside sidebar for desktop, above profile for mobile */}
              {isMobile ? (
                <ProfileNav
                  ref={profileNavRef}
                  showProfileNav={showProfileNav}
                  isMobile={isMobile}
                  collapsed={collapsed}
                  studentProfile={studentProfile}
                  chatbot={chatbot}
                  studyArea={studyArea}
                  setMenuOpen={setMenuOpen}
                  navigate={navigate}
                />
              ) : null}
              {/* Profile trigger */}
              <div
                ref={profileTriggerRef}
                className="flex items-center gap-3 cursor-pointer"
                onClick={handleProfileClick}
              >
                <img
                  src="bahaa.jpg"
                  className={cn(
                    "w-[60px] h-[60px] rounded-full opacity-100 object-cover transition-all duration-300",
                    collapsed && !isMobile ? "ms-6" : ""
                  )}
                  alt="profile image"
                />
                <div
                  className={cn(
                    "flex flex-col gap-2 transition-all duration-300 ease-in-out",
                    collapsed && !isMobile ? "opacity-0 w-0 overflow-hidden" : "opacity-100 w-auto"
                  )}
                >
                  <h1 className="font-poppins font-medium text-[16px] text-white whitespace-nowrap">Mohamed Bahaa</h1>
                  <h2 className="font-poppins font-medium text-[16px] text-[#9CA3AF] whitespace-nowrap">Subscribed</h2>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Profile Navigation - Fixed positioned outside sidebar for desktop only */}
        {!isMobile && (
          <ProfileNav
            ref={profileNavRef}
            showProfileNav={showProfileNav}
            isMobile={isMobile}
            collapsed={collapsed}
            studentProfile={studentProfile}
            chatbot={chatbot}
            studyArea={studyArea}
            setMenuOpen={setMenuOpen}
            navigate={navigate}
          />
        )}
        {/* Main area with proper layout for fixed input */}
        <section
          className={cn(
            "flex-1 w-full h-screen min-h-0 bg-[linear-gradient(117.93deg,#0F0A1F_0.23%,#1E1B29_79.52%)] transition-all duration-300 relative flex flex-col",
            menuOpen && isMobile ? "opacity-50 pointer-events-none" : ""
          )}
        >
          {isMobile && menuOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden" onClick={() => setMenuOpen(false)} />
          )}
          {/* Messages Area - Now properly contained */}
          <div
            ref={messagesContainerRef}
            className={cn(
              "flex-1 pt-20 lg:pt-6 px-4 md:px-8 overflow-y-auto overflow-x-hidden overscroll-contain pb-24",
              "[&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
            )}
          >
            {messages.length === 0 && (
              <section
                className={cn(
                  "flex items-center justify-center flex-col gap-8 h-full",
                  collapsed && !isMobile ? "mr-5" : "mr-5"
                )}
              >
                <svg width="36" height="38" viewBox="0 0 36 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M10.5 16.9141C10.5 16.9141 11.0793 22.3215 13.336 24.5781C15.5926 26.8347 21 27.4141 21 27.4141C21 27.4141 15.5926 27.9934 13.336 30.25C11.0793 32.5066 10.5 37.9141 10.5 37.9141C10.5 37.9141 9.92066 32.5066 7.66405 30.25C5.40743 27.9934 0 27.4141 0 27.4141C0 27.4141 5.40743 26.8347 7.66405 24.5781C9.92066 22.3215 10.5 16.9141 10.5 16.9141Z"
                    fill="#E5E7EB"
                  />
                  <path
                    d="M25.5 8C25.5 8 26.0793 13.4074 28.336 15.664C30.5926 17.9207 36 18.5 36 18.5C36 18.5 30.5926 19.0793 28.336 21.336C26.0793 23.5926 25.5 29 25.5 29C25.5 29 24.9207 23.5926 22.664 21.336C20.4074 19.0793 15 18.5 15 18.5C15 18.5 20.4074 17.9207 22.664 15.664C24.9207 13.4074 25.5 8 25.5 8Z"
                    fill="#E5E7EB"
                  />
                  <path
                    d="M10.5 0.0859375C10.5 0.0859375 11.0793 5.49337 13.336 7.74999C15.5926 10.0066 21 10.5859 21 10.5859C21 10.5859 15.5926 11.1653 13.336 13.4219C11.0793 15.6785 10.5 21.0859 10.5 21.0859C10.5 21.0859 9.92066 15.6785 7.66405 13.4219C5.40743 11.1653 0 10.5859 0 10.5859C0 10.5859 5.40743 10.0066 7.66405 7.74999C9.92066 5.49337 10.5 0.0859375 10.5 0.0859375Z"
                    fill="#E5E7EB"
                  />
                </svg>
                <h1 className="font-poppins font-semibold text-[24px] md:text-[33.18px] leading-[100%] tracking-[0%] text-[#E5E7EB] text-center px-4">
                  Ask our AI anything
                </h1>
              </section>
            )}
            {messages.length > 0 && (
              <>
                {/* Chatbot Header - Only show when messages exist */}
                <ChatbotHeader selectedBot={selected} collapsed={collapsed} isMobile={isMobile} />
                <div
                  className={cn(
                    "space-y-6 transition-all duration-300",
                    collapsed && !isMobile ? "ml-32" : "ml-0"
                  )}
                >
                  {messages.map((message, index) => {
                    const isBot = message.sender === "bot";
                    const isBotArabic = isBot && isArabicText(message.text);


                    return (
                      <div
                        key={index}
                        className={cn(
                          "flex",
                          isBot
                            ? (isBotArabic ? "justify-end" : "justify-start")
                            : "justify-end"
                        )}
                      >
                        <MessageBubble message={message} isBot={isBot} collapsed={collapsed} isMobile={isMobile} />
                      </div>
                    );
                  })}
                  {isTyping && (
                    <div className={`flex justify-start ${collapsed && '-ms-35'} `}>
                      <BotTyping collapsed={collapsed} isMobile={isMobile} />
                    </div>
                  )}
                </div>
              </>
            )}
            <div ref={messagesEndRef} />
          </div>
          {/* Fixed Input Area - Now properly layered */}
          <div className="flex-shrink-0 p-6 border-t border-transparent">

            <div className="relative max-w-3xl mx-auto flex items-center">
              {/* btn behind the input of messages */}
              <div className="w-[42px] h-[42px] rounded-full p-2 gap-2 bg-[#9CA3AF] opacity-100 flex items-center justify-center me-3 cursor-pointer">
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20.1673 6.49998C20.7196 6.49998 21.1673 6.05226 21.1673 5.49998C21.1673 4.9477 20.7196 4.49998 20.1673 4.49998V5.49998V6.49998ZM12.834 4.49998C12.2817 4.49998 11.834 4.9477 11.834 5.49998C11.834 6.05226 12.2817 6.49998 12.834 6.49998V5.49998V4.49998ZM17.5007 1.83331C17.5007 1.28103 17.0529 0.833313 16.5007 0.833313C15.9484 0.833313 15.5007 1.28103 15.5007 1.83331H16.5007H17.5007ZM15.5007 9.16665C15.5007 9.71893 15.9484 10.1666 16.5007 10.1666C17.0529 10.1666 17.5007 9.71893 17.5007 9.16665H16.5007H15.5007ZM20.1673 5.49998V4.49998H16.5007V5.49998V6.49998H20.1673V5.49998ZM16.5007 5.49998V4.49998H12.834V5.49998V6.49998H16.5007V5.49998ZM16.5007 1.83331H15.5007V5.49998H16.5007H17.5007V1.83331H16.5007ZM16.5007 5.49998H15.5007V9.16665H16.5007H17.5007V5.49998H16.5007Z" fill="url(#paint0_linear_769_2010)" />
                  <path d="M10.5423 2.75C6.43717 2.75 4.3846 2.75 3.10929 4.02531C1.83398 5.30061 1.83398 7.35319 1.83398 11.4583C1.83398 15.5635 1.83398 17.6161 3.10929 18.8914C4.3846 20.1667 6.43717 20.1667 10.5423 20.1667C14.6475 20.1667 16.7 20.1667 17.9753 18.8914C19.2507 17.6161 19.2507 15.5635 19.2507 11.4583V11" stroke="url(#paint1_linear_769_2010)" stroke-width="2" stroke-linecap="round" />
                  <path d="M4.58398 19.25C8.44313 14.8946 12.7801 9.11856 19.2507 13.4507" stroke="url(#paint2_linear_769_2010)" stroke-width="2" />
                  <defs>
                    <linearGradient id="paint0_linear_769_2010" x1="16.5007" y1="1.83331" x2="16.5007" y2="9.16665" gradientUnits="userSpaceOnUse">
                      <stop stop-color="#0F0A1F" />
                      <stop offset="1" stop-color="#1E1B29" />
                    </linearGradient>
                    <linearGradient id="paint1_linear_769_2010" x1="10.5423" y1="2.75" x2="10.5423" y2="20.1667" gradientUnits="userSpaceOnUse">
                      <stop stop-color="#0F0A1F" />
                      <stop offset="1" stop-color="#1E1B29" />
                    </linearGradient>
                    <linearGradient id="paint2_linear_769_2010" x1="11.9173" y1="11.9167" x2="11.9173" y2="19.25" gradientUnits="userSpaceOnUse">
                      <stop stop-color="#0F0A1F" />
                      <stop offset="1" stop-color="#1E1B29" />
                    </linearGradient>
                  </defs>
                </svg>


              </div>
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                className={cn(
                  "w-full h-[54px] rounded-[100px] px-6 py-1.5 bg-[#2D2A3B] opacity-100 font-inter font-normal text-[16px] leading-[24px] tracking-[0%] text-[#CCCCCC] pr-14 focus:outline-none focus:ring-2 focus:ring-[#9333EA]",
                  isArabicText(inputMessage) ? "text-right" : "text-left"
                )}
                dir={isArabicText(inputMessage) ? "rtl" : "ltr"}
                placeholder="Type your question..."
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim()}
                className={cn(
                  "absolute right-2 top-1/2 transform -translate-y-1/2 w-[42px] h-[42px] rounded-full p-2 flex items-center justify-center gap-2 transition-all duration-200",
                  inputMessage.trim()
                    ? "bg-gradient-to-b from-[#9333EA] to-[#6B21A8] text-white cursor-pointer"
                    : "bg-gradient-to-b from-[#0F0A1F] to-[#1E1B29] text-[#6B7280] cursor-not-allowed"
                )}
              >
                <FontAwesomeIcon icon={faPaperPlane} />
              </button>
            </div>
          </div>
        </section>
      </section>
    </section>
  );
}
