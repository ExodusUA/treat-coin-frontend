import React, { useEffect, useState, createRef } from 'react'
import logotype from '../images/logotype.svg'
import inbox from '../images/inbox.svg'
import EmailCode from './EmailCode'
import done from '../images/done.svg'
import telegram from '../images/telegram.svg'
import error from '../images/error.svg'
import emailsAPI from '../requests/emails'
import captchaAPI from '../requests/captcha'
import MarketingPopup from './MarketingPopup'
import ReCAPTCHA from "react-google-recaptcha";
import { Link } from 'react-router-dom'


function EmailForm({ translatedData }) {

    const [emailStep, setEmailStep] = useState(1)
    const [formError, setFormError] = useState(false)
    const [formPassed, setFormPassed] = useState(false)
    const [userExist, setUserExist] = useState(false)
    const recaptchaRef = React.createRef();

    const [showPopup, setShowPopup] = useState(false)

    const [email, setEmail] = useState('')
    const [isEmailValid, setIsEmailValid] = useState(true)

    const [codeError, setCodeError] = useState(false)

    const [userCode, setUserCode] = useState('')


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

    function sendEmail() {
        const valid = validateEmail()

        setUserExist(false)

        if (valid === true) {

            const res = emailsAPI.sendEmail(email)

            res.then(response => {
                if (response.status === 'sended') {
                    setEmailStep(2)
                } else if (response.status === 'exist') {
                    setFormError(true)
                    setUserExist(true)
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

        const res = emailsAPI.checkCodeValidity(userCode)

        res.then(response => {
            if (response.message === 'success') {
                setFormPassed(true)
                setFormError(false)
                setEmailStep(3)
            } else {
                setCodeError(true)
            }
        })
    }

    const [captchaPassed, setCaptchaPassed] = useState(true);


    const handleSubmit = async (e) => {
        e.preventDefault()
        const token = await recaptchaRef.current.executeAsync();

        const res = await captchaAPI.checkCaptcha(token)
        if (res.message === 'success') {
            sendEmail()
        } else {
            alert('Captcha failed')
        }
    };

    return (
        <div className={`w-[90%] right-[5%] sm:w-[530px] rounded-[24px] h-full gradient max-h-[44vh] md:max-h-[80vh] 2xl:max-h-[750px] absolute bottom-[5vh] md:top-[10vh] px-4 border-4 ${formError ? 'border-red-600' : formPassed ? 'border-green' : 'border-transparent'}`}>

            {
                emailStep === 1
                    ?

                    <div className='pt-[20px] md:pt-[150px] 2xl:pt-[200px] '>
                        <div className='flex justify-center'>
                            <img className='w-[70%] md:w-auto' src={logotype} alt="Logotype" />
                        </div>
                        <p className='text-[14px] md:text-[20px] max-w-[375px] m-auto text-center leading-5 text-white mt-5 font-regular'>{translatedData.step1Title}</p>

                        <ReCAPTCHA ref={recaptchaRef} sitekey={process.env.REACT_APP_RECAPTCHA_CLIENT_KEY} size="invisible">
                            <form onSubmit={e => handleSubmit(e)}>
                                <div className='md:w-[367px] m-auto mt-4 relative'>
                                    <p className='text-white mb-2'>{translatedData.step1EMail}</p>

                                    <input onChange={e => setEmail(e.target.value)} value={email} className='w-full h-[56px] pr-[40px] bg-white text-gray-700 placeholder:text-gray-500 outline-none text-[16px] pl-3 rounded-[7px]' type="email" placeholder={translatedData.step1EMailPlaceholder} />
                                    {
                                        isEmailValid === false && <p className='text-[#ED1111] text-[12px] mt-2'>{translatedData.step1WrongEmail}</p>
                                    }
                                    {
                                        isEmailValid === false && <img className='w-6 h-6 absolute bottom-[43px] right-3' src={error} alt="Error" />
                                    }

                                    <div className='mt-4'>
                                        <p className='text-[10px] text-gray-200'>By providing your email to <b>TreatCoin.com</b> you agree to our <span className='underline cursor-pointer' onClick={e => setShowPopup(true)}>Marketing Terms</span></p>
                                    </div>

                                </div>

                                <div className='flex justify-center absolute bottom-4 xl:bottom-8 left-0 right-0'>
                                    <button type='submit' className='text-[#8D31E4] w-[180px] md:w-[375px] font-bold m-auto bg-white h-[48px] rounded-[32px] border-2 border-[#EA81B6]'>{translatedData.step1Button}</button>
                                </div>
                            </form>
                        </ReCAPTCHA>
                        {
                            userExist && <p className='text-center text-red-600 mt-2 text-[14px] md:mt-4'>{translatedData.step1UserExist}</p>
                        }
                    </div>


                    : emailStep === 2
                        ? <div className='pt-[20px] md:pt-[50px] 2xl:pt-[150px]'>
                            <div className='flex justify-center'>
                                <img className='w-[50px] md:w-[125px]' src={inbox} alt="Logotype" />
                            </div>
                            <p className='text-center text-white text-[24px] md:text-[40px] font-bold my-2'>{translatedData.step2Title}</p>
                            <p className='text-center text-white px-2 text-[14px] md:text-[20px] md:px-12'>{translatedData.step2Text}</p>

                            <div className='flex justify-center mt-2 md:mt-24'>
                                <EmailCode setUserCode={setUserCode} />
                            </div>

                            {
                                codeError && <p className='text-center text-red-600 mt-2 text-[14px] md:mt-4'>{translatedData.step2WrongCode}</p>
                            }


                            <div className='flex justify-center absolute bottom-8 left-0 right-0'>
                                <button onClick={e => checkCode()} className='text-[#8D31E4] w-[180px] md:w-[375px] font-bold m-auto bg-white h-[48px] rounded-[32px] border-2 border-[#EA81B6]'>{translatedData.step2Button}</button>
                            </div>
                        </div>
                        : <div className='pt-5 md:pt-[100px]'>
                            <div className='flex justify-center'>
                                <img className='w-[50px] md:w-[125px]' src={done} alt="Done" />
                            </div>
                            <p className='text-center text-white text-[24px] md:text-[40px] font-bold my-2'>{translatedData.step3Title}</p>
                            <p className='text-center text-white text-[14px] md:text-[20px] px-2 md:px-12'>{translatedData.step3Text}</p>

                            <div className='flex justify-center absolute bottom-8 left-0 right-0'>
                                <Link to={'https://t.me/treatcoin'} target='_blank'>
                                    <button className='text-[#8D31E4] w-[250px] md:w-[375px] flex justify-center gap-4 font-bold m-auto bg-white h-[48px] rounded-[32px] border-2 border-[#EA81B6] items-center'>
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
        </div >
    )
}

export default EmailForm