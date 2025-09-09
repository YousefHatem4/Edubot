import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight, faArrowUpFromBracket, faBookBookmark, faCheck, faChevronDown, faChevronUp, faCloudArrowUp } from '@fortawesome/free-solid-svg-icons'
import { faTrashCan, faCopy } from '@fortawesome/free-regular-svg-icons'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
export default function Files() {

  const [files, setFiles] = useState([]) // store uploaded files
  const [error, setError] = useState("");

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
  return <>
    <section className=" mt-20 mb-10">
      {/* main section */}
      <section className="flex flex-col justify-center items-center gap-8 md:gap-13 px-4">


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
              <FontAwesomeIcon icon={faArrowUpFromBracket} className="text-sm md:text-2xl" />
            </button>
          </div>
        </form>
      </section>


    </section>
  </>
}
