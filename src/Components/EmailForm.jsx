import React, { useEffect, useState } from 'react'
import logotype from '../images/logotype.svg'
import inbox from '../images/inbox.svg'
import EmailCode from './EmailCode'
import done from '../images/done.svg'
import telegram from '../images/telegram.svg'
import error from '../images/error.svg'

function EmailForm() {

    const [emailStep, setEmailStep] = useState(1)
    const [formError, setFormError] = useState(false)
    const [formPassed, setFormPassed] = useState(false)

    const [email, setEmail] = useState('')
    const [isEmailValid, setIsEmailValid] = useState(true)

    const [codeError, setCodeError] = useState(false)

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

        if (valid === true) {
            setEmailStep(2)
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

    return (
        <div className={`w-[90%] right-[5%] sm:w-[530px] rounded-[24px] h-full gradient max-h-[40vh] md:max-h-[80vh] absolute bottom-[5vh] md:top-[10vh] px-4 border-4 ${formError ? 'border-red-600' : formPassed ? 'border-green' : 'border-transparent'}`}>

            {
                emailStep === 1
                    ? <div className='pt-[10px] md:pt-[256px]'>
                        <div className='flex justify-center'>
                            <img className='w-[70%] md:w-auto' src={logotype} alt="Logotype" />
                        </div>
                        <p className='text-[14px] md:text-[20px] max-w-[375px] m-auto text-center leading-5 text-white mt-5 font-regular'>Join our <span className='font-bold text-green'>Waiting List</span> and earn big <span className='font-bold text-green'>cash</span> & win amazing <span className='font-bold text-green'>prizes</span> by referring your friends and completing <span className='font-bold text-green'>fun</span> activities.</p>

                        <div className='md:w-[367px] m-auto mt-4 relative'>
                            <p className='text-white mb-2'>Email*</p>
                            <input onChange={e => setEmail(e.target.value)} value={email} className='w-full h-[56px] pr-[40px] bg-white text-gray-700 placeholder:text-gray-500 outline-none text-[16px] pl-3 rounded-[7px]' type="email" placeholder='Insert your e-mail here' />
                            {
                                isEmailValid === false && <p className='text-[#ED1111] text-[12px] mt-2'>Insert a valid e-mail</p>
                            }
                            {
                                isEmailValid === false && <img className='w-6 h-6 absolute bottom-[43px] right-3' src={error} alt="Error" />
                            }

                        </div>

                        <div className='flex justify-center absolute bottom-8 left-0 right-0'>
                            <button onClick={e => sendEmail()} className='text-[#8D31E4] w-[180px] md:w-[375px] font-bold m-auto bg-white h-[48px] rounded-[32px] border-2 border-[#EA81B6]'>Join now</button>
                        </div>
                    </div>

                    : emailStep === 2
                        ? <div className='pt-[20px] md:pt-[200px]'>
                            <div className='flex justify-center'>
                                <img className='w-[50px] md:w-[125px]' src={inbox} alt="Logotype" />
                            </div>
                            <p className='text-center text-white text-[24px] md:text-[40px] font-bold my-2'>Check your Inbox</p>
                            <p className='text-center text-white px-2 text-[14px] md:text-[20px] md:px-12'>We sent a code  for you to confirm your e-mail account.</p>

                            <div className='flex justify-center mt-2 md:mt-24'>
                                <EmailCode />
                            </div>

                            {
                                codeError && <p className='text-center text-red-600 mt-2 text-[14px] md:mt-4'>Insert a correct code please!</p>
                            }


                            <div className='flex justify-center absolute bottom-8 left-0 right-0'>
                                <button className='text-[#8D31E4] w-[180px] md:w-[375px] font-bold m-auto bg-white h-[48px] rounded-[32px] border-2 border-[#EA81B6]'>Join now</button>
                            </div>
                        </div>
                        : <div className='pt-5 md:pt-[100px]'>
                            <div className='flex justify-center'>
                                <img className='w-[50px] md:w-[125px]' src={done} alt="Done" />
                            </div>
                            <p className='text-center text-white text-[24px] md:text-[40px] font-bold my-2'>Thank you!</p>
                            <p className='text-center text-white text-[14px] md:text-[20px] px-2 md:px-12'>You're officially in the sweetest deal in town. Stay tunned for all the juicy updates joining our Telegram group.</p>

                            <div className='flex justify-center absolute bottom-8 left-0 right-0'>
                                <button className='text-[#8D31E4] w-[250px] md:w-[375px] flex justify-center gap-4 font-bold m-auto bg-white h-[48px] rounded-[32px] border-2 border-[#EA81B6] items-center'>
                                    <p>Acess our Group</p>
                                    <img className='w-7 h-7' src={telegram} alt="Telegram" />
                                </button>
                            </div>
                        </div>
            }
        </div>
    )
}

export default EmailForm