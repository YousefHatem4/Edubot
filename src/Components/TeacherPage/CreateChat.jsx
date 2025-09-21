import React, { useState, useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight, faBookBookmark, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';
import { useFormik } from 'formik'
import axios from 'axios'
import toast from 'react-hot-toast'
import { userContext } from '../Context/userContext'

export default function CreateChat({ onNext }) {
  const [open, setOpen] = useState(null); // instead of boolean, track which dropdown is open
  const { userToken } = useContext(userContext)

  const gradeOptions = ["Grade 7", "Grade 8", "Grade 9"];
  const languageOptions = ["English & Arabic", "French & Arabic", "Arabic"];

  const validate = (values) => {
    const errors = {}

    if (!values.name || !values.name.trim()) {
      errors.name = 'Bot name is required'
    } else if (values.name.length < 2) {
      errors.name = 'Bot name must be at least 2 characters'
    }

    if (!values.subject || !values.subject.trim()) {
      errors.subject = 'Subject is required'
    }

    if (!values.grade || values.grade === "Grade") {
      errors.grade = 'Please select a grade'
    }

    if (!values.supported_languages || values.supported_languages.length === 0) {
      errors.supported_languages = 'Please select at least one language'
    }

    return errors
  }

  const formik = useFormik({
    initialValues: {
      name: '',
      subject: '',
      grade: '',
      supported_languages: []
    },
    validate,
    onSubmit: async (values, { setSubmitting, setFieldError }) => {
      try {
        // Prepare the data according to the API schema
        const requestData = {
          name: values.name.trim(),
          subject: values.subject.trim(),
          grade: values.grade,
          supported_languages: values.supported_languages
        }

        const response = await axios.post('http://16.171.18.65:8000/bots', requestData, {
          headers: {
            'Authorization': `Bearer ${userToken}`,
            'Content-Type': 'application/json'
          }
        })

        toast.success("EduBot created successfully 🎉")

        // Pass the form data to the next step
        if (onNext) {
          onNext({
            botName: values.name,
            subject: values.subject,
            grade: values.grade,
            languages: values.supported_languages,
            botId: response.data.id || response.data._id // Include the bot ID from response
          })
        }

      } catch (error) {
        if (error.response?.data?.detail) {
          if (Array.isArray(error.response.data.detail)) {
            error.response.data.detail.forEach(err => {
              if (err.loc && err.loc.includes('name')) {
                setFieldError('name', err.msg)
              } else if (err.loc && err.loc.includes('subject')) {
                setFieldError('subject', err.msg)
              } else if (err.loc && err.loc.includes('grade')) {
                setFieldError('grade', err.msg)
              } else if (err.loc && err.loc.includes('supported_languages')) {
                setFieldError('supported_languages', err.msg)
              }
            })
          } else {
            toast.error(error.response.data.detail)
          }
        } else if (error.response?.data?.message) {
          toast.error(error.response.data.message)
        } else if (error.response?.status === 401) {
          toast.error("Authentication failed. Please login again.")
        } else {
          toast.error("Failed to create EduBot. Please try again.")
        }
      } finally {
        setSubmitting(false)
      }
    }
  })

  const handleLanguageSelection = (lang) => {
    const currentLanguages = formik.values.supported_languages
    let updatedLanguages

    if (currentLanguages.includes(lang)) {
      // Remove language if already selected
      updatedLanguages = currentLanguages.filter(l => l !== lang)
    } else {
      // Add language if not selected
      updatedLanguages = [...currentLanguages, lang]
    }

    formik.setFieldValue('supported_languages', updatedLanguages)
    setOpen(null)
  }

  const getDisplayLanguages = () => {
    const selected = formik.values.supported_languages
    if (selected.length === 0) return "Language"
    if (selected.length === 1) return selected[0]
    return `${selected.length} languages selected`
  }

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

          <form className="mt-4 w-full max-w-[726px]" onSubmit={formik.handleSubmit}>
            {/* Bot Name */}
            <label htmlFor="name" className="block mb-3 md:mb-5 font-poppins font-normal text-[16px] md:text-[19.2px] leading-[100%] tracking-[0%] text-[#E5E7EB]">
              Bot Name
            </label>
            <div className="relative">
              <input
                type="text"
                id="name"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full ps-12 md:ps-16 h-[55px] md:h-[63px] rounded-[12px] border focus:border-3 hover:border-3 focus:outline-none transition-all duration-100 ease-in-out bg-[#0F0A1F] font-poppins font-medium text-[14px] md:text-[16px] leading-[100%] tracking-[0%] text-[#9CA3AF] ${formik.touched.name && formik.errors.name
                    ? 'border-red-500'
                    : 'border-[#A78BFA]'
                  }`}
                placeholder="Ex: Mr.Mohamed"
                required
              />
              <img src="bot-1.png" className="w-[16px] md:w-[30px] absolute bottom-4 left-4 md:left-5 h-[16px] md:h-[30px] object-cover" alt="EduBot Logo" />
            </div>
            {formik.touched.name && formik.errors.name && (
              <p className="mt-2 text-red-500 text-sm">{formik.errors.name}</p>
            )}

            {/* Subject Name */}
            <label htmlFor="subject" className="block mb-3 md:mb-5 mt-4 md:mt-6 font-poppins font-normal text-[16px] md:text-[19.2px] leading-[100%] tracking-[0%] text-[#E5E7EB]">
              Subject
            </label>
            <div className="relative">
              <input
                type="text"
                id="subject"
                name="subject"
                value={formik.values.subject}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full ps-12 md:ps-16 h-[55px] md:h-[63px] rounded-[12px] border focus:border-3 hover:border-3 focus:outline-none transition-all duration-100 ease-in-out bg-[#0F0A1F] font-poppins font-medium text-[14px] md:text-[16px] leading-[100%] tracking-[0%] text-[#9CA3AF] ${formik.touched.subject && formik.errors.subject
                    ? 'border-red-500'
                    : 'border-[#A78BFA]'
                  }`}
                placeholder="Ex : Math"
                required
              />
              <FontAwesomeIcon icon={faBookBookmark} className="text-[#E5E7EB] text-xl md:text-2xl absolute bottom-4 md:bottom-5 left-4 md:left-5" />
            </div>
            {formik.touched.subject && formik.errors.subject && (
              <p className="mt-2 text-red-500 text-sm">{formik.errors.subject}</p>
            )}

            {/* grade choice */}
            <div className="relative w-full mt-4 md:mt-6">
              {/* Select box */}
              <div
                className={`w-full h-[38px] md:h-[68px] rounded-[8px] border-[1.3px] focus:border-3 hover:border-3 bg-[#0F0A1F] text-[#E5E7EB] px-4 md:px-[18px] py-2 md:py-[11px] font-poppins font-normal text-[12px] md:text-[13.33px] flex justify-between items-center cursor-pointer transition-all duration-100 ease-in-out ${formik.touched.grade && formik.errors.grade
                    ? 'border-red-500'
                    : 'border-[#A78BFA]'
                  }`}
                onClick={() => setOpen(open === "grade" ? null : "grade")}
              >
                {formik.values.grade || "Grade"}
                <div className="flex flex-col gap-[2px] pointer-events-none">
                  <FontAwesomeIcon icon={open === "grade" ? faChevronUp : faChevronDown} className="text-[#9CA3AF] text-sm" />
                </div>
              </div>

              {/* Dropdown options */}
              {open === "grade" && (
                <div className="absolute w-full bg-[#0F0A1F] rounded-[8px] mt-1 shadow-lg z-10">
                  {gradeOptions.map((option) => (
                    <div
                      key={option}
                      className="px-4 md:px-[18px] py-2 md:py-[11px] text-[#E5E7EB] hover:bg-[#A78BFA] cursor-pointer rounded-[8px] text-[12px] md:text-[14px]"
                      onClick={() => {
                        formik.setFieldValue('grade', option);
                        setOpen(null);
                      }}
                    >
                      {option}
                    </div>
                  ))}
                </div>
              )}
            </div>
            {formik.touched.grade && formik.errors.grade && (
              <p className="mt-2 text-red-500 text-sm">{formik.errors.grade}</p>
            )}

            {/* language choice */}
            <div className="relative w-full mt-4 md:mt-6">
              {/* Select box */}
              <div
                className={`w-full h-[38px] md:h-[68px] rounded-[8px] border-[1.3px] focus:border-3 hover:border-3 bg-[#0F0A1F] text-[#E5E7EB] px-4 md:px-[18px] py-2 md:py-[11px] font-poppins font-normal text-[12px] md:text-[13.33px] flex justify-between items-center cursor-pointer transition-all duration-100 ease-in-out ${formik.touched.supported_languages && formik.errors.supported_languages
                    ? 'border-red-500'
                    : 'border-[#A78BFA]'
                  }`}
                onClick={() => setOpen(open === "language" ? null : "language")}
              >
                {getDisplayLanguages()}
                <div className="flex flex-col gap-[2px] pointer-events-none">
                  <FontAwesomeIcon icon={open === "language" ? faChevronUp : faChevronDown} className="text-[#9CA3AF] text-sm" />
                </div>
              </div>

              {open === "language" && (
                <div className="absolute w-full bg-[#0F0A1F] rounded-[8px] mt-1 shadow-lg z-50">
                  {languageOptions.map((lang) => (
                    <div
                      key={lang}
                      className={`px-4 md:px-[18px] py-2 md:py-[11px] text-[#E5E7EB] hover:bg-[#A78BFA] cursor-pointer rounded-[8px] text-[12px] md:text-[14px] flex items-center justify-between ${formik.values.supported_languages.includes(lang) ? 'bg-[#A78BFA40]' : ''
                        }`}
                      onClick={() => handleLanguageSelection(lang)}
                    >
                      {lang}
                      {formik.values.supported_languages.includes(lang) && (
                        <span className="text-[#8B5CF6]">✓</span>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
            {formik.touched.supported_languages && formik.errors.supported_languages && (
              <p className="mt-2 text-red-500 text-sm">{formik.errors.supported_languages}</p>
            )}

            <div className="flex justify-center mt-10 md:mt-14">
              <button
                type="submit"
                disabled={formik.isSubmitting}
                className="btn-gradient cursor-pointer group relative flex items-center justify-center w-full max-w-[577px] h-[70px] md:h-[83px] rounded-[12px] font-poppins font-semibold text-[20px] md:text-[24px] lg:text-[27.65px] leading-[100%] text-white shadow-[0_8px_36.2px_0_#8A38F540,0_-7px_13.4px_0_#4A00E02E] hover:shadow-[0px_8px_36.2px_0px_#8A38F540] transition-all duration-700 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="relative z-10 ms-4 md:ms-10 transition-transform duration-700 ease-in-out group-hover:-translate-x-4 md:group-hover:-translate-x-6">
                  {formik.isSubmitting ? 'Creating EduBot...' : 'Create EduBot'}
                </span>
                {!formik.isSubmitting && (
                  <FontAwesomeIcon
                    icon={faAngleRight}
                    className="relative z-10 ml-2 md:ml-4 opacity-0 translate-x-0 transition-all duration-700 ease-in-out group-hover:opacity-100 group-hover:-translate-x-4 md:group-hover:-translate-x-6"
                  />
                )}
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
