import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import BotInfo from './BotInfo';
import Files from './Files';
import Setting from '../Setting';

export default function ManageBot() {
    const [activeTab, setActiveTab] = useState("botinfo");

    const tabClasses = (tab) =>
        `font-poppins font-medium text-[14px] md:text-[16px] leading-[100%] w-auto md:w-[92.54px] h-[41.6px] flex items-center justify-center transition-all duration-200 cursor-pointer ${activeTab === tab
            ? "text-white border-b border-[#8B5CF6]"
            : "text-[#9CA3AF] hover:text-white hover:border-b hover:border-[#8B5CF6]"
        }`;

    return (
        <>
            <section className="bg-[linear-gradient(117.93deg,#0F0A1F_0.23%,#1E1B29_79.52%)] min-h-screen px-4 md:px-8 lg:px-25 py-8 md:py-12 lg:py-15">
                {/* title */}
                <section className="flex gap-4 md:gap-6 lg:gap-8 items-center">
                    <Link to={"/teacher-page"}>
                        <FontAwesomeIcon
                            className="text-[#8B5CF6] text-xl md:text-2xl"
                            icon={faArrowLeft}
                        />
                    </Link>
                    <div className="flex flex-col gap-2 md:gap-3">
                        <h1 className="font-poppins font-normal text-[20px] md:text-[24px] lg:text-[26.65px] leading-[100%] text-white">
                            Manage Bot: Physics Helper
                        </h1>
                        <p className="font-poppins font-normal text-[14px] md:text-[17px] lg:text-[19.2px] leading-[100%] text-[#9CA3AF]">
                            Bot ID:{" "}
                            <span className="font-poppins font-normal text-[14px] md:text-[17px] lg:text-[19.2px] bg-[linear-gradient(91.27deg,#8B5CF6_0.46%,#EC4899_99.62%)] text-transparent bg-clip-text">
                                edb-91a3f7
                            </span>{" "}
                            | Created At: 2025-09-01
                        </p>
                    </div>
                </section>

                {/* navbar */}
                <nav className="mt-8 md:mt-12 lg:mt-15 flex items-center gap-3 md:gap-4 lg:gap-5 overflow-x-auto pb-2 md:pb-0">
                    <h1 onClick={() => setActiveTab("botinfo")} className={tabClasses("botinfo")}>
                        Bot Info
                    </h1>
                    <h1 onClick={() => setActiveTab("files")} className={tabClasses("files")}>
                        Files
                    </h1>
                    <h1 onClick={() => setActiveTab("settings")} className={tabClasses("settings")}>
                        Settings
                    </h1>
                </nav>

                <section className='mt-6 md:mt-8 lg:mt-10'>
                    {activeTab === "botinfo" && <BotInfo />}
                    {activeTab === "files" && <Files />}
                    {activeTab === "settings" && <Setting />}
                </section>
            </section>

            {/* footer section */}
            <footer className='h-auto z-100 lg:h-[96px] opacity-100 bg-[linear-gradient(93.87deg,#0A0716_-42.23%,#1A1726_110.13%)] flex flex-col lg:flex-row items-center justify-between px-4 md:px-8 lg:px-30 py-6 lg:py-10 gap-4 lg:gap-0'>
                {/* title */}
                <section className='flex items-center gap-2'>
                    <div className='w-[35px] h-[35px] lg:w-[45px] lg:h-[45px] bg-[linear-gradient(135deg,#8E2DE2_5%,#4A00E0_95%)] opacity-100 rounded-[8px] flex items-center justify-center'>
                        <img src="bot-1.png" className='w-[20px] h-[20px] lg:w-[30px] lg:h-[30px] object-cover' alt="EduBot Logo" />
                    </div>
                    <h1 className='font-semibold text-[20px] lg:text-[27.65px] leading-[100%] tracking-[0] text-white'>EduBot</h1>
                </section>

                {/* category */}
                <section className='flex flex-col lg:flex-row gap-3 lg:gap-5 items-center'>
                    <h1 className='font-medium text-[14px] lg:text-[16px] text-[#9CA3AF] hover:text-white transition-colors cursor-pointer'>Privacy Policy</h1>
                    <h1 className='font-medium text-[14px] lg:text-[16px] text-[#9CA3AF] hover:text-white transition-colors cursor-pointer'>Terms</h1>
                    <h1 className='font-medium text-[14px] lg:text-[16px] text-[#9CA3AF] hover:text-white transition-colors cursor-pointer'>Contact</h1>
                </section>
            </footer>
        </>
    );
}