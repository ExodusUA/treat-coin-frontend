import React, { useEffect, useState, useRef } from 'react'
import logotype from '../images/logotype.svg'
import inbox from '../images/inbox.svg'
import EmailCode from './EmailCode'
import done from '../images/done.svg'
import telegram from '../images/telegram.svg'
import error from '../images/error.svg'
import emailsAPI from '../requests/emails'
import MarketingPopup from './MarketingPopup'
import ReCAPTCHA from "react-google-recaptcha";
import { Link } from 'react-router-dom'
import OverlaySpinner from './OverlaySpinner'
import GoogleAuth from './GoogleAuth'
import FacebookAuth from './FacebookAuth'


function EmailForm({ translatedData }) {

    const [emailStep, setEmailStep] = useState(1)
    const [formError, setFormError] = useState(false)
    const [formPassed, setFormPassed] = useState(false)
    const [userExist, setUserExist] = useState(false)
    const recaptchaRef = useRef(null);

    const [showPopup, setShowPopup] = useState(false)

    const [email, setEmail] = useState('')
    const [isEmailValid, setIsEmailValid] = useState(true)

    const [codeError, setCodeError] = useState(false)

    const [userCode, setUserCode] = useState('')

    const [loading, setLoading] = useState(false)


    useEffect(() => {

        if (isEmailValid === false) {
            validateEmail()
        }
    }, [email])

    function validateEmail() {

        if (email.includes('@') && email.includes('.')) {
            setIsEmailValid(true)
            setFormError(false)
            return true
        } else {
            setIsEmailValid(false)
            return false
        }

    }

    function submitEmail(email, token, sendEmail) {
        const valid = validateEmail()
        setLoading(true)
        setUserExist(false)

        if (valid === true) {

            const res = emailsAPI.sendEmail(email, token, sendEmail)

            res.then(response => {
                if (response.status === 'sended') {
                    setEmailStep(2)
                    setLoading(false)
                } else if (response.status === 'exist') {
                    setFormError(true)
                    setLoading(false)
                    setUserExist(true)
                } else if (response.message === 'invalid token') {
                    setFormError(true)
                    setLoading(false)
                    setCaptchaPassed(false)
                    alert('Invalid captcha token')
                }
            })

            setFormError(false)
        } else {
            setFormError(true)
        }

    }

    useEffect(() => {
        if (codeError === true) {
            setFormError(true)
        } else {
            setFormError(false)

        }
    }, [codeError])

    function checkCode() {
        setLoading(true)
        const res = emailsAPI.checkCodeValidity(userCode)

        res.then(response => {
            if (response.message === 'success') {
                setFormPassed(true)
                setFormError(false)
                setEmailStep(3)
            } else {
                setCodeError(true)
            }

            setLoading(false)
        })
    }

    const [captchaPassed, setCaptchaPassed] = useState(true);


    const handleSubmit = async (e) => {
        e.preventDefault()
        const token = await recaptchaRef.current.executeAsync();
        submitEmail(email, token, true)
    };

    const loginViaGoogle = async (email) => {
        console.log('Google Email: ', email)
        const token = await recaptchaRef.current.executeAsync();
        const res = emailsAPI.sendEmail(email, token, false)

        res.then(response => {
            if (response.status === 'not exist') {
                setEmailStep(3)
                setLoading(false)
            } else if (response.status === 'exist') {
                setFormError(true)
                setLoading(false)
                setUserExist(true)
            } else if (response.message === 'invalid token') {
                setFormError(true)
                setLoading(false)
                setCaptchaPassed(false)
                alert('Invalid captcha token')
            }
        })

        setFormError(false)
    }

    const loginViaFacebook = async (email) => {
        console.log('Facebook Email: ', email)
        const token = await recaptchaRef.current.executeAsync();
        const res = emailsAPI.sendEmail(email, token, false)

        res.then(response => {
            if (response.status === 'not exist') {
                setEmailStep(3)
                setLoading(false)
            } else if (response.status === 'exist') {
                setFormError(true)
                setLoading(false)
                setUserExist(true)
            } else if (response.message === 'invalid token') {
                setFormError(true)
                setLoading(false)
                setCaptchaPassed(false)
                alert('Invalid captcha token')
            }
        })
        setFormError(false)
    }

    return (
        <div className={`w-[90%] right-[5%] sm:w-[530px] rounded-[24px] h-full gradient max-h-[4vh] md:max-h-[80vh] 2xl:max-h-[750px] absolute bottom-[5vh] md:top-[5vh] px-4 border-4 min-h-[560px] sm:min-h-[600px] ${formError ? 'border-red-600' : formPassed ? 'border-green' : 'border-transparent'}`}>
            {
                emailStep === 1
                    ? <div className='pt-[30px] md:pt-[50px] 2xl:pt-[150px] '>
                        <div className='flex justify-center'>
                            <img className='w-[70%] md:w-auto' src={logotype} alt="Logotype" />
                        </div>
                        <p className='text-[14px] md:text-[20px] max-w-[375px] m-auto text-center leading-5 text-white mt-5 font-regular'>
                            <span>{translatedData.step1Title1}</span>
                            <span className='text-[#07FF78] font-bold'>{translatedData.step1Title2}</span>
                            <span>{translatedData.step1Title3}</span>
                            <span className='text-[#07FF78] font-bold'>{translatedData.step1Title4}</span>
                            <span>{translatedData.step1Title5}</span>
                            <span className='text-[#07FF78] font-bold'>{translatedData.step1Title6}</span>
                            <span>{translatedData.step1Title7}</span>
                            <span className='text-[#07FF78] font-bold'>{translatedData.step1Title8}</span>
                            <span>{translatedData.step1Title9}</span>

                        </p>

                        <ReCAPTCHA ref={recaptchaRef} sitekey='6LfpgJMoAAAAAJUxDeXx8uhBOXmKbmvsLr5vo8qY' size="invisible">
                            <form onSubmit={e => handleSubmit(e)}>

                                <div className='md:w-[367px] m-auto mt-4 relative'>
                                    <p className='text-white mb-4 font-bold'>{translatedData.step1EMail}</p>
                                    <div className='justify-center left-0 right-0 mt-4 '>
                                        <div className='flex justify-between md:w-[375px] m-auto'>
                                            <FacebookAuth loginViaFacebook={loginViaFacebook} setLoading={setLoading} />
                                            <GoogleAuth loginViaGoogle={loginViaGoogle} setLoading={setLoading} />
                                        </div>
                                    </div>

                                    <p className='text-white mb-2 font-bold mt-4 '>{translatedData.step1EMailOr}</p>

                                    <input onChange={e => setEmail(e.target.value)} value={email} className='w-full h-[56px] pr-[40px] bg-white text-gray-700 placeholder:text-gray-500 outline-none text-[16px] pl-3 rounded-[7px]' type="email" placeholder={translatedData.step1EMailPlaceholder} />
                                    {
                                        isEmailValid === false && <p className='text-[#ED1111] text-[12px] mt-2'>{translatedData.step1WrongEmail}</p>
                                    }

                                    <div className='mt-4'>
                                        <p className='text-[10px] text-gray-200'>{translatedData.TermsText1} <b>TreatCoin.com</b> {translatedData.TermsText2} <span className='underline cursor-pointer' onClick={e => setShowPopup(true)}>{translatedData.MarketingTerms}</span></p>
                                    </div>

                                    <button type='submit' disabled={loading} className='text-[#8D31E4] cursor-pointer mt-4 px-4 min-w-[180px] md:w-[375px] font-bold m-auto bg-white h-[48px] rounded-[32px] border-2 border-[#EA81B6] items-center flex gap-2 justify-center'>
                                        <p>{translatedData.step1Button}</p>
                                    </button>
                                </div>

                            </form>
                        </ReCAPTCHA>
                        {
                            userExist && <p className='text-center text-red-600 mt-2 text-[14px] md:mt-4'>{translatedData.step1UserExist}</p>
                        }
                    </div>


                    : emailStep === 2
                        ? <div className='pt-[20px] md:pt-[50px] 2xl:pt-[100px]'>
                            <div className='flex justify-center'>
                                <img className='w-[50px] md:w-[125px]' src={inbox} alt="Logotype" />
                            </div>
                            <p className='text-center text-white text-[24px] md:text-[40px] font-bold my-2'>{translatedData.step2Title}</p>
                            <p className='text-center text-white px-2 text-[14px] md:text-[20px] md:px-12'>{translatedData.step2Text}</p>

                            <div className='flex justify-center mt-2 md:mt-8'>
                                <EmailCode setUserCode={setUserCode} />
                            </div>

                            <p className='text-[12px] text-center text-white mt-6'>{translatedData.Step2Note}</p>

                            {
                                codeError && <p className='text-center text-red-600 mt-2 text-[14px] md:mt-4'>{translatedData.step2WrongCode}</p>
                            }

                            <div className='flex justify-center left-0 right-0 mt-4 md:mt-16'>
                                <button onClick={e => checkCode()} className='text-[#8D31E4] w-[250px] md:w-[375px] font-bold m-auto bg-white h-[48px] rounded-[32px] border-2 border-[#EA81B6] items-center flex gap-2 justify-center cursor-pointer '>

                                    <p>{translatedData.step2Button}</p>
                                </button>
                            </div>
                        </div>
                        : <div className='pt-5 md:pt-[100px]'>
                            <div className='flex justify-center'>
                                <img className='w-[50px] md:w-[125px]' src={done} alt="Done" />
                            </div>
                            <p className='text-center text-white text-[24px] md:text-[40px] font-bold my-2'>{translatedData.step3Title}</p>
                            <p className='text-center text-white text-[14px] md:text-[20px] px-2 md:px-12'>{translatedData.step3Text}</p>

                            <div className='flex justify-center absolute bottom-8 left-0 right-0'>
                                <Link to={'https://t.me/treatcoinglobal'} target='_blank'>
                                    <button className='text-[#8D31E4] w-[300px] md:w-[375px] flex justify-center gap-4 font-bold m-auto bg-white h-[48px] rounded-[32px] border-2 border-[#EA81B6] items-center'>
                                        <p>{translatedData.step3Button}</p>
                                        <img className='w-7 h-7' src={telegram} alt="Telegram" />
                                    </button>
                                </Link>

                            </div>
                        </div>
            }

            {
                <MarketingPopup showPopup={showPopup} setShowPopup={setShowPopup} />
            }

            {
                <OverlaySpinner loading={loading} />
            }
        </div >
    )
}

export default EmailForm