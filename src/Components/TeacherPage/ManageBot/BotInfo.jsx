import { faBookBookmark, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react'

export default function BotInfo() {
    const [open, setOpen] = useState(null); // instead of boolean, track which dropdown is open
    const [selected, setSelected] = useState("Grade");
    const options = ["Grade 7", "Label2", "Label3"];

    const [language, setLanguage] = useState("Language");
    const languages = ["English", "Arabic", "French"];


    // form state
    const [botName, setBotName] = useState("Mohamed Bahaa");
    const [subject, setSubject] = useState("Math");
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
    return <>
        <section className='flex justify-center items-center mt-25 mb-10'>
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

                        required
                    />
                    <FontAwesomeIcon icon={faBookBookmark} className="text-[#E5E7EB] text-xl md:text-2xl absolute bottom-4 md:bottom-5 left-4 md:left-5" />
                </div>

                {/* grade choice */}
                <div className="relative w-full mt-4 md:mt-6">
                    {/* Select box */}
                    <div
                        className="w-full h-[38px] md:h-[68px] rounded-[8px] border-[#A78BFA] border-[1.3px] focus:border-3 hover:border-3 bg-[#0F0A1F] text-[#E5E7EB] px-4 md:px-[18px] py-2 md:py-[11px] font-poppins font-normal text-[12px] md:text-[13.33px] flex justify-between items-center cursor-pointer transition-all duration-100 ease-in-out"
                        onClick={() => setOpen(open === "grade" ? null : "grade")}
                    >
                        {selected}
                        <div className="flex flex-col gap-[2px] pointer-events-none">
                            <FontAwesomeIcon icon={open === "grade" ? faChevronUp : faChevronDown} className="text-[#9CA3AF] text-sm" />
                        </div>
                    </div>

                    {/* Dropdown options */}
                    {open === "grade" && (
                        <div className="absolute w-full bg-[#0F0A1F] rounded-[8px] mt-1 shadow-lg z-10">
                            {options.map((option) => (
                                <div
                                    key={option}
                                    className="px-4 md:px-[18px] py-2 md:py-[11px] text-[#E5E7EB] hover:bg-[#A78BFA] cursor-pointer rounded-[8px] text-[12px] md:text-[14px]"
                                    onClick={() => {
                                        setSelected(option);
                                        setOpen(null);
                                    }}
                                >
                                    {option}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* language choice */}
                <div className="relative w-full mt-4 md:mt-6">
                    {/* Select box */}
                    <div
                        className="w-full h-[38px] md:h-[68px] rounded-[8px] border-[#A78BFA] border-[1.3px] focus:border-3 hover:border-3 bg-[#0F0A1F] text-[#E5E7EB] px-4 md:px-[18px] py-2 md:py-[11px] font-poppins font-normal text-[12px] md:text-[13.33px] flex justify-between items-center cursor-pointer transition-all duration-100 ease-in-out"
                        onClick={() => setOpen(open === "language" ? null : "language")}
                    >
                        {language}
                        <div className="flex flex-col gap-[2px] pointer-events-none">
                            <FontAwesomeIcon icon={open === "language" ? faChevronUp : faChevronDown} className="text-[#9CA3AF] text-sm" />
                        </div>
                    </div>

                    {open === "language" && (
                        <div className="absolute w-full bg-[#0F0A1F] rounded-[8px] mt-1 shadow-lg z-50">
                            {languages.map((lang) => (
                                <div
                                    key={lang}
                                    className="px-4 md:px-[18px] py-2 md:py-[11px] text-[#E5E7EB] hover:bg-[#A78BFA] cursor-pointer rounded-[8px] text-[12px] md:text-[14px]"
                                    onClick={() => {
                                        setLanguage(lang);
                                        setOpen(null);
                                    }}
                                >
                                    {lang}
                                </div>
                            ))}
                        </div>
                    )}

                </div>

                <section className='mt-15 flex items-center gap-5'>
                    <button className="w-[171px] cursor-pointer h-[47px] rounded-[12px] border border-[#FFFFFF33] bg-[#8B5CF6] shadow-[0px_6px_35.7px_0px_#A78BFA2E] hover:shadow-[0px_8px_40px_0px_#8B5CF680] transition-shadow duration-300 ease-in-out font-poppins font-normal text-[19.2px] leading-[100%] text-center text-white opacity-100">
                        Save Changes
                    </button>

                    <button className='w-[97px] cursor-pointer h-[47px] rounded-[12px] border border-[#FF5F57] px-[13px] pt-[11px] pb-[12px] font-poppins font-bold text-[12px] leading-[100%] tracking-[0.3px] align-middle text-[#FF5F57]'>
                        Cancel
                    </button>
                </section>
            </form>
        </section>
    </>
}
