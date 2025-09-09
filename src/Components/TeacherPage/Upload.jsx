import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight, faArrowUpFromBracket, faBookBookmark, faCheck, faChevronDown, faChevronUp, faCloudArrowUp } from '@fortawesome/free-solid-svg-icons'
import { faTrashCan, faCopy } from '@fortawesome/free-regular-svg-icons'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'


export default function Upload({ goToDashboard }) {
  const [files, setFiles] = useState([]) // store uploaded files
  const [error, setError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false); // Control success modal display

  // handle file upload
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files)

    // allowed file types
    const allowedTypes = ["application/pdf", "image/png", "image/jpeg", "application/zip", "image/svg+xml"]

    const validFiles = selectedFiles.filter(file => allowedTypes.includes(file.type))
    if (validFiles.length !== selectedFiles.length) {
      setError("Some files were rejected. Allowed: pdf, png, jpeg, svg, zip.")
    } else {
      setError("")
    }

    setFiles(prev => [...prev, ...validFiles])
  }

  // delete file
  const handleDelete = (index) => {
    setFiles(prev => prev.filter((_, i) => i !== index))
  }

  // handle submit
  const handleSubmit = (e) => {
    e.preventDefault()
    if (files.length === 0) {
      setError("Please upload at least one file before saving.")
      return
    }

    // simulate upload (replace with API later)
    console.log("Uploading files:", files)

    // Show success animation
    setShowSuccess(true);

    // Reset after animation completes
    setTimeout(() => {
      toast.success("Files uploaded successfully!")
      setFiles([]);
    }, 3000); // Match animation duration
  }

  return (
    <>
      <section className="min-h-screen md:min-h-[150vh] bg-gradient-to-r from-[#0A0710] to-[#1B0034] relative opacity-100 py-8 md:py-10">
        {/* main section */}
        <section className="flex flex-col justify-center items-center gap-8 md:gap-13 px-4">
          {/* title */}
          <section className="text-center">
            <h1 className="font-poppins font-semibold text-[26px] md:text-[30px] lg:text-[33.18px] leading-[100%] tracking-[0%] text-center align-middle text-white mb-4 md:mb-6">
              Upload Study Materials for Your Bot
            </h1>
            <p className="font-poppins font-medium text-[14px] md:text-[16px] leading-[100%] tracking-[0%] text-center align-middle text-[#9CA3AF]">
              Add resources so your chatbot can assist students with accurate answers
            </p>
          </section>

          {/* step section */}
          <section className="flex items-center gap-4 md:gap-6 lg:gap-8 w-full max-w-[600px] md:max-w-[700px]">
            {/* left part */}
            <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">
              <div className="w-[28px] h-[28px] md:w-[32px] md:h-[32px] rounded-full bg-[linear-gradient(90deg,#8B5CF6_0%,#EC4899_100%)] flex items-center justify-center shadow-[0_0_35px_0_#8B5CF6,0_0_25px_0_#8B5CF6,0_0_15px_0_#8B5CF6]">
                <FontAwesomeIcon icon={faCheck} className="font-poppins font-bold text-[14px] md:text-[16px] text-white" />
              </div>
              <h1 className="font-poppins font-medium text-[12px] md:text-[14px] lg:text-[16px] text-white whitespace-nowrap">
                Step 1: Create Bot
              </h1>
            </div>

            {/* middle part */}
            <div className="w-full md:w-[245.3300018310547px] h-[4px] rounded-full bg-[linear-gradient(90deg,#8B5CF6_0%,#EC4899_100%)] shadow-[0_0_15px_0_#EC4899,0_0_15px_0_#8B5CF6]"></div>

            {/* right part */}
            <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">
              <div className="w-[28px] h-[28px] md:w-[32px] md:h-[32px] rounded-full bg-[linear-gradient(90deg,#8B5CF6_0%,#EC4899_100%)] flex items-center justify-center shadow-[0_0_35px_0_#8B5CF6,0_0_25px_0_#8B5CF6,0_0_15px_0_#8B5CF6]">
                <h1 className="font-poppins font-extrabold text-[14px] md:text-[16px] text-[#9CA3AF]">2</h1>
              </div>
              <h1 className="font-poppins font-medium text-[12px] md:text-[14px] lg:text-[16px] text-white whitespace-nowrap">
                Step 2: Upload Content
              </h1>
            </div>
          </section>

          {/* form input */}
          <form onSubmit={handleSubmit} className="w-full max-w-[694px]">
            {/* upload input */}
            <div className="w-full h-auto md:h-[219px] rounded-[6px] border-[2px] border-dashed border-[#A78BFA] bg-[#0F0A1F] p-4 md:p-[16px] md:pr-[24px] md:pl-[24px] gap-3 md:gap-[12px] shadow-[0px_10px_33px_0px_#0000001A]">
              <label htmlFor="dropzone-file" className="cursor-pointer">
                <div className="flex flex-col items-center justify-center pt-6 md:pt-8 pb-4 md:pb-6">
                  <FontAwesomeIcon className="text-3xl md:text-4xl text-[#E5E7EB] mb-3 md:mb-5" icon={faCloudArrowUp} />
                  <p className="mb-2 font-poppins font-normal text-[16px] md:text-[19.2px] text-center text-[#B0B2BC]">
                    Drag & Drop or Choose file to <span className="text-[#A78BFA]">upload</span>
                  </p>
                  <p className="font-poppins font-medium text-[14px] md:text-[16px] text-center text-[#B0B2BC80] mt-2 md:mt-3">
                    fig, zip, pdf, png, jpeg
                  </p>
                </div>
                <input id="dropzone-file" type="file" multiple onChange={handleFileChange} className="hidden" />
              </label>
            </div>

            <div className="mt-6 md:mt-8">
              <h1 className="font-poppins font-normal text-[16px] md:text-[19.2px] text-[#E5E7EB]">Uploaded</h1>

              {error && (
                <h1 className="font-poppins mt-3 md:mt-4 font-normal text-[16px] md:text-[18px] text-[#EF4444]">
                  {error}
                </h1>
              )}

              {/* no uploaded files */}
              {files.length === 0 && !error && (
                <h1 className="font-poppins mt-6 md:mt-9 font-normal text-[16px] md:text-[20px] text-[#EF4444]">
                  There is nothing uploaded yet
                </h1>
              )}

              {/* uploaded files list */}
              {files.map((file, index) => (
                <div
                  key={index}
                  className="w-full h-auto md:h-[55px] rounded-[14px] bg-[#0F0A1F] p-4 md:p-5 mt-4 md:mt-6 flex items-center justify-between"
                >
                  <h1 className="font-poppins font-normal text-[14px] md:text-[16px] text-[#E5E7EB] truncate max-w-[70%]">
                    {file.name}
                  </h1>
                  <div
                    className="w-[20px] h-[20px] md:w-[24px] md:h-[24px] rounded-full bg-[#FFF3F3] cursor-pointer flex items-center justify-center flex-shrink-0"
                    onClick={() => handleDelete(index)}
                  >
                    <FontAwesomeIcon icon={faTrashCan} className="text-[11px] md:text-[13px] text-[#E41D1D]" />
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center mt-6 md:mt-8">
              <button
                type="submit"
                className="cursor-pointer flex items-center justify-center gap-3 w-full max-w-[577px] h-[55px] md:h-[60px] lg:h-[83px] rounded-[12px] bg-gradient-to-r from-[#8A38F5] to-[#A78BFA] font-poppins font-semibold text-[16px] md:text-[20px] lg:text-[27.65px] text-white shadow-[0px_-7px_13.4px_0px_#4A00E02E] transition-colors duration-1000 ease-out hover:shadow-[0px_8px_36.2px_0px_#8A38F540] hover:bg-gradient-to-r hover:from-[#8B5CF6] hover:to-[#EC4899]"
              >
                Upload & Save
                <FontAwesomeIcon icon={faArrowUpFromBracket} className="text-sm md:text-base" />
              </button>
            </div>
          </form>
        </section>

        {/* Success modal with animated check circle */}
        {showSuccess && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-70 p-4">
            <section className='w-full max-w-[695px] h-auto md:h-[490px] gap-4 md:gap-5 flex flex-col items-center py-4 md:py-5 rounded-[8px] opacity-100 bg-[linear-gradient(180deg,#0F0A1F_0%,#1E1B29_100%)] shadow-[0px_5px_87.6px_0px_#8A38F50D]'>
              {/* Animated check circle */}
              <div className="animated-check-circle mt-4 md:mt-0">
                <span className="checkmark">✓</span>
              </div>

              <h1 className='font-poppins font-semibold text-[24px] md:text-[28px] lg:text-[33.18px] leading-[100%] tracking-[0%] align-middle text-[#E5E7EB] text-center px-4'>
                Your Chatbot is Ready!
              </h1>
              <p className='font-poppins font-medium text-[14px] md:text-[16px] leading-[170%] tracking-[0%] text-center align-middle text-[#9CA3AF] w-full md:w-[554px] h-auto opacity-100 px-4'>
                MR.Mohamed bot has been successfully created and is ready to help your Grade 11 Chemistry students.
              </p>

              <div className='w-full max-w-[520px] mt-2 h-auto md:h-[79px] flex flex-col items-center py-3 opacity-100 rounded-[6px] border border-[#A78BFA] mx-4'>
                <h1 className='font-poppins font-medium text-[14px] md:text-[16px] leading-[100%] tracking-[0%] align-middle text-[#9CA3AF]'>Bot ID:</h1>
                <div className='mt-2 flex items-center gap-3'>
                  <h1 className='font-poppins font-normal text-[16px] md:text-[19.2px] leading-[100%] tracking-[0%] align-middle text-[#A78BFA]'>BOT-GXK4RQHL</h1>
                  <div className='w-[24px] h-[24px] md:w-[30px] md:h-[30px] cursor-pointer rounded-[4px] p-[5px] md:p-[6px] gap-[8px] bg-[#A78BFA70] opacity-100 flex items-center justify-center'>
                    <FontAwesomeIcon icon={faCopy} className='text-white text-sm md:text-lg'></FontAwesomeIcon>
                  </div>
                </div>
              </div>

              <div className="relative w-full flex flex-col md:flex-row justify-center items-center mt-4 gap-3 md:gap-4 px-4">
                <button onClick={goToDashboard} className='w-full md:w-[224px] h-[50px] md:h-[59px] rounded-[12px] bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] shadow-[0px_8px_36.2px_0px_#8A38F540,0px_-7px_13.4px_0px_#4A00E05C] font-poppins font-normal text-[16px] md:text-[19.2px] cursor-pointer leading-[100%] tracking-[0%] text-white'>
                  Go to Dashboard
                </button>
                <Link to={'/managebot'}>
                  <button className='w-full md:w-[224px] h-[50px] md:h-[59px] rounded-[12px] bg-[#6B7280] shadow-[0px_8px_36.2px_0px_#8A38F526,0px_-7px_13.4px_0px_#4A00E00A] font-poppins font-normal text-[16px] md:text-[19.2px] cursor-pointer leading-[100%] tracking-[0%] text-white opacity-100'>
                    Manage Bot
                  </button>
                </Link>
              </div>
            </section>
          </div>
        )}
      </section>

     
    </>
  )
}