import { useState } from 'react'
import React from 'react'
import arrow from '../images/arrow.svg'

function LanguageChange() {

    const [languageOpen, setLanguageOpen] = useState(false)
    const [selectedLanguage, setSelectedLanguage] = useState('EN')

    const langs = [
        {
            name: 'Spanish',
            code: 'ES',
            icon: '🇪🇸'
        },
        {
            name: 'Portugese',
            code: 'PT',
            icon: '🇵🇹'
        },
        {
            name: 'Hindu',
            code: 'HI',
            icon: '🇮🇳'
        },
        {
            name: 'English',
            code: 'EN',
            icon: '🇬🇧'
        }
    ]

    return (
        <>

            <div className='flex items-center bg-[#3735A0]/30 py-2 px-4 rounded-[10px] justify-between cursor-pointer' onClick={e => setLanguageOpen(!languageOpen)}>
                <div className='flex items-center gap-2'>
                    <p className='text-[24px]'>{langs.find(e => e.code === selectedLanguage).icon}</p>
                    <p className='text-[18px] font-medium'>{langs.find(e => e.code === selectedLanguage).name}</p>
                </div>

                <img className={`${languageOpen === true ? 'rotate-0' : 'rotate-180'}`} src={arrow} alt="Down" />
            </div>


            {
                languageOpen && (
                    <div className='bg-[#3735A0] py-2 px-4 rounded-[10px] absolute left-0 top-16 w-full z-10'>
                        <ul>
                            {
                                langs.map(lang => (
                                    <li onClick={e => {
                                        setSelectedLanguage(lang.code)
                                        setLanguageOpen(false)
                                    }
                                    }>
                                        <div className='flex items-center gap-2 cursor-pointer'>
                                            <p className='text-[24px]'>{lang.icon}</p>
                                            <p className='text-[18px] text-white'>{lang.name}</p>
                                        </div>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                )
            }

        </>

    )
}

export default LanguageChange