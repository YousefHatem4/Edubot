import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloudArrowUp, faInfoCircle, faPencil, faRobot, faUpload } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

export default function Upload() {
  const [pdfFile, setPdfFile] = useState(null)
  const [botName, setBotName] = useState("")
  const [botAvatar, setBotAvatar] = useState(null)
  const [botDescription, setBotDescription] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!pdfFile) {
      alert("Please upload a PDF file before submitting")
      return
    }
    if (!botName.trim()) {
      alert("Please enter a bot name")
      return
    }

    const formData = new FormData()
    formData.append("pdf", pdfFile)
    formData.append("name", botName)
    formData.append("description", botDescription)
    if (botAvatar) formData.append("avatar", botAvatar)

    console.log("Form Submitted:")
    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1])
    }
  }

  return (
    <section className='min-h-[1211px] bg-[linear-gradient(90deg,rgba(88,28,135,0.2)_0%,#0A0710_50%,rgba(59,7,100,0.3)_100%)] flex items-center justify-center px-4'>
      <form
        onSubmit={handleSubmit}
        className='w-full max-w-[672px] h-auto lg:h-[1026px] py-5 px-6 sm:px-8 rounded-[24px] border border-[rgba(255,255,255,0.1)] bg-[rgba(26,26,26,0.8)] shadow-[0px_25px_50px_0px_rgba(162,89,255,0.1)]'
      >

        {/* title */}
        <div className='flex flex-col gap-1 justify-center'>
          <h1 className='font-inter font-bold text-[24px] sm:text-[30px] leading-[32px] sm:leading-[36px] text-center text-white px-3 py-1 rounded'>
            Create Your Bot
          </h1>
          <p className='text-[#B0B0B0] font-inter font-normal text-[14px] sm:text-[16px] leading-[22px] sm:leading-[24px] text-center'>
            Build an intelligent assistant from your documents
          </p>
        </div>

        {/* Upload PDF Document */}
        <div className="mt-10">
          <p className="text-sm text-[#B0B0B0] mb-3">Upload PDF Document</p>
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-full h-[180px] sm:h-[188px] border-1 border-dashed border-purple-700 rounded-xl cursor-pointer bg-gradient-to-r from-[#1c1a24] to-[#0f0b1a] hover:opacity-90"
          >
            <div className="flex flex-col items-center justify-center">
              <FontAwesomeIcon className='text-4xl text-purple-700' icon={faCloudArrowUp} />
              <p className="mb-3 text-sm text-gray-200">
                <span className="font-medium">Drag & drop your PDF here</span>
              </p>
              <p className="text-xs text-[#B0B0B0]">or click to browse files</p>
            </div>
            <input
              id="dropzone-file"
              type="file"
              accept="application/pdf"
              className="hidden"
              onChange={(e) => setPdfFile(e.target.files[0])}
            />
          </label>
          {pdfFile && <p className="mt-2 text-sm text-green-400">Uploaded: {pdfFile.name}</p>}
        </div>

        {/* Bot name */}
        <div className="mt-8">
          <label htmlFor="name" className="block mb-4 text-[#B0B0B0] text-sm sm:text-[14px] font-inter font-medium">
            Bot Name
          </label>
          <input
            type="text"
            id="name"
            className="bg-[#1A1A1A] text-[#ADAEBC] w-full lg:w-[606px] h-[50px] rounded-xl font-inter text-[16px] p-2.5 border border-[#1A1A1A] 
            hover:border-[#A259FF] hover:bg-[#1f1a29] focus:border-[#A259FF] focus:ring-1 focus:ring-[#A259FF] outline-none transition"
            placeholder="Enter your bot's name"
            value={botName}
            onChange={(e) => setBotName(e.target.value)}
            required
          />
        </div>

        {/* Bot avatar */}
        <div className="mt-8">
          <p className="text-[#B0B0B0] font-inter font-medium text-[14px]">Bot Avatar (Optional)</p>
          <div className="mt-4 flex flex-col sm:flex-row items-center gap-4">
            <div className="w-16 h-16 rounded-full border-2 bg-gradient-to-r from-[rgba(162,89,255,0.2)] to-[rgba(147,51,234,0.2)] border-[#A259FF4D] flex items-center justify-center overflow-hidden">
              {botAvatar ? (
                <img src={URL.createObjectURL(botAvatar)} alt="avatar preview" className="w-full h-full object-cover rounded-full" />
              ) : (
                <FontAwesomeIcon className="text-xl text-[#A259FF]" icon={faRobot} />
              )}
            </div>
            <label
              htmlFor="bot-avatar-upload"
              className="w-full sm:w-[163.8px] h-[42px] rounded-[8px] border border-[#0A0710] bg-[#0A0710] font-inter text-[16px] text-white flex items-center justify-center gap-2 cursor-pointer hover:bg-[#1a141f] transition"
            >
              <FontAwesomeIcon icon={faUpload} />
              <span>Upload Image</span>
            </label>
            <input
              id="bot-avatar-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => setBotAvatar(e.target.files[0])}
            />
          </div>
        </div>

        {/* Bot description */}
        <label htmlFor="message" className="block mb-4 mt-8 text-[#B0B0B0] text-sm sm:text-[14px] font-inter font-medium">
          Bot Description
        </label>
        <textarea
          id="message"
          className="block p-2.5 resize-none w-full lg:w-[606px] h-[98px] rounded-[12px] border border-[#1A1A1A] bg-[#1A1A1A] text-[#ADAEBC] font-inter text-[16px] leading-[24px] 
          hover:border-[#A259FF] hover:bg-[#1f1a29] focus:border-[#A259FF] focus:ring-1 focus:ring-[#A259FF] outline-none transition"
          placeholder="Describe what your bot should help with..."
          value={botDescription}
          onChange={(e) => setBotDescription(e.target.value)}
        />

        {/* Button */}
        <div className="mt-10">
          <Link to={'/edubot'} type='submit'
            className="w-full lg:w-[606px] h-[56px] rounded-[12px] bg-gradient-to-r from-[#A259FF] to-[#9333EA] font-inter font-semibold text-[16px] text-white flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(162,89,255,0.4)] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(162,89,255,0.7)]"
          >
            <FontAwesomeIcon icon={faPencil} />
            Create Bot
          </Link>
        </div>

        {/* Info */}
        <section className='w-full lg:w-[606px] px-3 py-4 h-auto min-h-[90px] mt-8 rounded-[12px] border border-[#A259FF33] bg-[#A259FF0D] flex gap-2'>
          <FontAwesomeIcon className='mt-1.5 text-[#9333EA]' icon={faInfoCircle} />
          <div>
            <h1 className='text-white font-inter mb-1 font-medium text-[14px]'>Processing Information</h1>
            <p className='text-[#B0B0B0] text-[12px] leading-[16px]'>
              Your PDF will be analyzed and processed to create an intelligent bot that can answer questions about the document content.
            </p>
          </div>
        </section>

      </form>
    </section>
  )
}
