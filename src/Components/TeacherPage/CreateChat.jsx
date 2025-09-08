import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight, faBookBookmark, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';

export default function CreateChat({ onNext }) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("Grade");
  const options = ["Grade 7", "Label2", "Label3"];

  // form state
  const [botName, setBotName] = useState("");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // validation example
    if (!botName.trim() || !subject.trim() || selected === "Grade") {
      alert("Please fill out all required fields.");
      return;
    }

    const formData = {
      botName,
      subject,
      grade: selected,
      description,
    };

    console.log("Form Data:", formData);

    // go to next step
    if (onNext) {
      onNext(formData);
    }
  };

  return (
    <>
      <section className="md:min-h-[150vh] bg-gradient-to-r from-[#0A0710] to-[#1B0034] opacity-100 py-8 md:py-10">
        {/* main section */}
        <section className="flex flex-col justify-center items-center gap-8 md:gap-13 px-4">
          {/* title */}
          <section className="text-center">
            <h1 className="font-poppins font-semibold text-[26px] md:text-[30px] lg:text-[33.18px] leading-[100%] tracking-[0%] text-center align-middle text-white mb-4 md:mb-6">
              Create a New EduBot
            </h1>
            <p className="font-poppins font-medium text-[14px] md:text-[16px] leading-[100%] tracking-[0%] text-center align-middle text-[#9CA3AF]">
              Guiding you to build a personalized AI for your classroom.
            </p>
          </section>

          {/* step section */}
          <section className="flex items-center gap-4 md:gap-6 lg:gap-8 w-full max-w-[600px] md:max-w-[700px]">
            {/* left part */}
            <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">
              <div className="w-[28px] h-[28px] md:w-[32px] md:h-[32px] rounded-full bg-[linear-gradient(90deg,#8B5CF6_0%,#EC4899_100%)] flex items-center justify-center shadow-[0_0_35px_0_#8B5CF6,0_0_25px_0_#8B5CF6,0_0_15px_0_#8B5CF6]">
                <h1 className="font-poppins font-bold text-[14px] md:text-[16px] leading-[24px] tracking-[0%] align-middle text-white">1</h1>
              </div>
              <h1 className="font-poppins font-medium text-[12px] md:text-[14px] lg:text-[16px] leading-[100%] tracking-[0%] align-middle text-white whitespace-nowrap">Step 1: Create Bot</h1>
            </div>

            {/* middle part */}
            <div className="flex items-center w-full">
              <div className="w-full md:w-[122.66px] h-[4px] rounded-full bg-[linear-gradient(90deg,#8B5CF6_0%,#EC4899_100%)] shadow-[0_0_15px_0_#EC4899,0_0_15px_0_#8B5CF6]"></div>
              <div className="w-full md:w-[123.66px] h-[4px] rounded-full bg-[#8B5CF64D] "></div>
            </div>

            {/* right part */}
            <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">
              <div className="w-[28px] h-[28px] md:w-[32px] md:h-[32px] rounded-full border-2 p-[2px] bg-[#1E1B29] flex items-center justify-center border-[#8B5CF680]">
                <h1 className="font-poppins font-bold text-[14px] md:text-[16px] leading-[24px] tracking-[0%] align-middle text-[#9CA3AF]">2</h1>
              </div>
              <h1 className="font-poppins font-medium text-[12px] md:text-[14px] lg:text-[16px] leading-[100%] tracking-[0%] align-middle text-[#9CA3AF] whitespace-nowrap">Step 2: Upload Content</h1>
            </div>
          </section>

          <form className="mt-4 w-full max-w-[726px]">
            {/* Bot Name */}
            <label htmlFor="bot_name" className="block mb-3 md:mb-5 font-poppins font-normal text-[16px] md:text-[19.2px] leading-[100%] tracking-[0%] text-[#E5E7EB]">
              Bot Name
            </label>
            <div className="relative">
              <input
                type="text"
                id="bot_name"
                value={botName}
                onChange={(e) => setBotName(e.target.value)}
                className="w-full ps-12 md:ps-16 h-[55px] md:h-[63px] rounded-[12px] border border-[#A78BFA] focus:border-3 hover:border-3 focus:outline-none transition-all duration-100 ease-in-out bg-[#0F0A1F] font-poppins font-medium text-[14px] md:text-[16px] leading-[100%] tracking-[0%] text-[#9CA3AF]"
                placeholder="Ex: Mr.Mohamed"
                required
              />
              <img src="bot-1.png" className="w-[16px] md:w-[30px] absolute bottom-4 left-4 md:left-5 h-[16px] md:h-[30px] object-cover" alt="EduBot Logo" />
            </div>

            {/* Subject Name */}
            <label htmlFor="subject" className="block mb-3 md:mb-5 mt-4 md:mt-6 font-poppins font-normal text-[16px] md:text-[19.2px] leading-[100%] tracking-[0%] text-[#E5E7EB]">
              Subject
            </label>
            <div className="relative">
              <input
                type="text"
                id="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full ps-12 md:ps-16 h-[55px] md:h-[63px] rounded-[12px] border border-[#A78BFA] focus:border-3 hover:border-3 focus:outline-none transition-all duration-100 ease-in-out bg-[#0F0A1F] font-poppins font-medium text-[14px] md:text-[16px] leading-[100%] tracking-[0%] text-[#9CA3AF]"
                placeholder="Ex : Math"
                required
              />
              <FontAwesomeIcon icon={faBookBookmark} className="text-[#E5E7EB] text-xl md:text-2xl absolute bottom-4 md:bottom-5 left-4 md:left-5" />
            </div>

            {/* grade choice */}
            <div className="relative w-full mt-4 md:mt-6">

              {/* Select box */}
              <div
                className="w-full h-[38px] md:h-[42px] rounded-[8px] border-[#A78BFA] border-[1.3px] focus:border-3 hover:border-3 bg-[#0F0A1F] text-[#E5E7EB] px-4 md:px-[18px] py-2 md:py-[11px] font-poppins font-normal text-[12px] md:text-[13.33px] flex justify-between items-center cursor-pointer transition-all duration-100 ease-in-out"
                onClick={() => setOpen(!open)}
              >
                {selected}
                <div className="flex flex-col gap-[2px] pointer-events-none">
                  <FontAwesomeIcon icon={open ? faChevronUp : faChevronDown} className="text-[#9CA3AF] text-sm" />
                </div>
              </div>

              {/* Dropdown options */}
              {open && (
                <div className="absolute w-full bg-[#0F0A1F] rounded-[8px] mt-1 shadow-lg z-10">
                  {options.map((option) => (
                    <div
                      key={option}
                      className="px-4 md:px-[18px] py-2 md:py-[11px] text-[#E5E7EB] hover:bg-[#A78BFA] cursor-pointer rounded-[8px] text-[12px] md:text-[14px]"
                      onClick={() => {
                        setSelected(option);
                        setOpen(false);
                      }}
                    >
                      {option}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <label htmlFor="message" className="block mt-8 md:mt-13 mb-3 font-poppins font-normal text-[16px] md:text-[19.2px] leading-[100%] tracking-[0%] text-[#E5E7EB]">
              Description
            </label>
            <textarea
              id="message"
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="block w-full h-[120px] md:h-[132px] rounded-[16px] border-1 focus:border-3 hover:border-3 border-[#A78BFA] p-4 md:pt-[18px] md:pr-[18px] md:pb-[90px] md:pl-[18px] bg-[#0F0A1F] font-poppins font-normal text-[14px] md:text-[16px] leading-[24px] tracking-[0%] align-middle text-[#9CA3AF] resize-none overflow-hidden focus:outline-none  focus:border-[#A78BFA] transition-all duration-100 ease-in-out"
              placeholder="Describe what this bot will help with..."
              required
            ></textarea>

            <div className="flex justify-center mt-10 md:mt-14">
              <button
                onClick={onNext}
                type="submit"
                className="btn-gradient cursor-pointer group relative flex items-center justify-center w-full max-w-[577px] h-[70px] md:h-[83px] rounded-[12px] font-poppins font-semibold text-[20px] md:text-[24px] lg:text-[27.65px] leading-[100%] text-white shadow-[0_8px_36.2px_0_#8A38F540,0_-7px_13.4px_0_#4A00E02E] hover:shadow-[0px_8px_36.2px_0px_#8A38F540] transition-all duration-700 ease-in-out"
              >
                <span className="relative z-10 ms-4 md:ms-10 transition-transform duration-700 ease-in-out group-hover:-translate-x-4 md:group-hover:-translate-x-6">
                  Create EduBot
                </span>
                <FontAwesomeIcon
                  icon={faAngleRight}
                  className="relative z-10 ml-2 md:ml-4 opacity-0 translate-x-0 transition-all duration-700 ease-in-out group-hover:opacity-100 group-hover:-translate-x-4 md:group-hover:-translate-x-6"
                />
              </button>
            </div>

          </form>

        </section>
      </section>

      <style jsx>{`
        .btn-gradient {
          background: linear-gradient(to right, #8A38F5, #A78BFA);
        }
        
        .btn-gradient:hover {
          background: linear-gradient(to right, #8B5CF6, #EC4899);
        }
        
        @media (max-width: 768px) {
          .btn-gradient:hover span {
            transform: translateX(-1rem);
          }
          
          .btn-gradient:hover svg {
            opacity: 1;
            transform: translateX(-1rem);
          }
        }
      `}</style>
    </>
  );
}