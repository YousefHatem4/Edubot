import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight, faArrowUpFromBracket, faBookBookmark, faCheck, faChevronDown, faChevronUp, faCloudArrowUp } from '@fortawesome/free-solid-svg-icons'
import { faTrashCan } from '@fortawesome/free-regular-svg-icons'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'

export default function Upload() {
  const [files, setFiles] = useState([]) // store uploaded files
  const [error, setError] = useState("")

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
    toast.success("Files uploaded successfully!")
    setFiles([]);
  }

  return (
    <>
      <section className="md:min-h-[150vh] bg-gradient-to-r from-[#0A0710] to-[#1B0034] relative opacity-100 py-8 md:py-10">
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
          <form onSubmit={handleSubmit}>
            {/* upload input */}
            <div className="w-[694px] h-[219px] rounded-[6px] border-[2px] border-dashed border-[#A78BFA] bg-[#0F0A1F] p-[16px] pr-[24px] pl-[24px] gap-[12px] shadow-[0px_10px_33px_0px_#0000001A]">
              <label htmlFor="dropzone-file">
                <div className="flex flex-col items-center justify-center pt-8 pb-6 cursor-pointer">
                  <FontAwesomeIcon className="text-4xl text-[#E5E7EB] mb-5" icon={faCloudArrowUp} />
                  <p className="mb-2 font-poppins font-normal text-[19.2px] text-center text-[#B0B2BC]">
                    Drag & Drop or Choose file to <span className="text-[#A78BFA]">upload</span>
                  </p>
                  <p className="font-poppins font-medium text-[16px] text-center text-[#B0B2BC80] mt-3">
                    fig, zip, pdf, png, jpeg
                  </p>
                </div>
                <input id="dropzone-file" type="file" multiple onChange={handleFileChange} className="hidden" />
              </label>
            </div>

            <div className="mt-8">
              <h1 className="font-poppins font-normal text-[19.2px] text-[#E5E7EB]">Uploaded</h1>

              {error && (
                <h1 className="font-poppins mt-4 font-normal text-[18px] text-[#EF4444]">
                  {error}
                </h1>
              )}

              {/* no uploaded files */}
              {files.length === 0 && !error && (
                <h1 className="font-poppins mt-9 font-normal text-[20px] text-[#EF4444]">
                  There is nothing uploaded yet
                </h1>
              )}

              {/* uploaded files list */}
              {files.map((file, index) => (
                <div
                  key={index}
                  className="w-[694px] h-[55px] rounded-[14px] bg-[#0F0A1F] p-5 mt-6 flex items-center justify-between"
                >
                  <h1 className="font-poppins font-normal text-[16px] text-[#E5E7EB]">
                    {file.name}
                  </h1>
                  <div
                    className="w-[24px] h-[24px] rounded-full bg-[#FFF3F3] cursor-pointer flex items-center justify-center"
                    onClick={() => handleDelete(index)}
                  >
                    <FontAwesomeIcon icon={faTrashCan} className="text-[13px] text-[#E41D1D]" />
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="mt-8 cursor-pointer lg:mt-10 flex items-center justify-center gap-4 w-full max-w-[577px] h-[60px] lg:h-[83px] rounded-[12px] bg-gradient-to-r from-[#8A38F5] to-[#A78BFA] font-poppins font-semibold text-[20px] lg:text-[27.65px] text-white shadow-[0px_-7px_13.4px_0px_#4A00E02E] transition-colors duration-1000 ease-out hover:shadow-[0px_8px_36.2px_0px_#8A38F540] hover:bg-gradient-to-r hover:from-[#8B5CF6] hover:to-[#EC4899]"
              >
                Upload & Save
                <FontAwesomeIcon icon={faArrowUpFromBracket} />
              </button>
            </div>
          </form>
        </section>

        
        {/* complete part section */}
        <section className='w-[695px] absolute top-50 z-1000 h-[490px] rounded-[8px] opacity-100 bg-[linear-gradient(180deg,#0F0A1F_0%,#1E1B29_100%)] shadow-[0px_5px_87.6px_0px_#8A38F50D]'>

        </section>

      </section>
    </>
  )
}
