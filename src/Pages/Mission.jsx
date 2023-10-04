import React from 'react'
import { useLanguage } from '../Helpers/LanguageContext'
import { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar'
import footer_image from '../images/footerImage.svg'


function Mission() {

  const { language } = useLanguage();
  const [languageData, setLanguageData] = useState({});

  const languages = {
    EN: require('../Helpers/languages/en.json'),
    ES: require('../Helpers/languages/es.json'),
    PT: require('../Helpers/languages/pt.json'),
    HI: require('../Helpers/languages/hi.json'),
  };

  useEffect(() => {
    setLanguageData(languages[language]);
  }, [language]);

  const [selectedPage, setSelectedPage] = useState(1);

  useEffect(() => {
    let pageNumber = window.location.pathname.split('/')[1].replace('page', '');
    setSelectedPage(Number(pageNumber));
  }, [selectedPage]);

  return (
    <section className={'relative new-bg md:bg-main h-screen w-screen bg-cover bg-center xl:overflow-hidden'}>
      <Navbar translatedData={languageData} />

      <div className='bg-[#141629] mt-6 h-full'>
        <div className='pt-14 w-[90%] max-w-[1240px] m-auto h-full relative'>
          <div className="text-center text-sky-300 text-[44px] font-bold font-['Poppins'] leading-[48.40px] gradient-text mb-14">{languageData.MissionTitle}</div>

          <p className='text-white mb-4 leading-7'>{languageData.MissionText1}</p>
          <p className='text-white mb-4 leading-7'>{languageData.MissionText2}</p>
          <p className='text-white mb-4 leading-7'>{languageData.MissionText3}</p>


          {
            /*
            <div className='flex items-center gap-6 absolute right-0 bottom-28'>
            <div>
              <p className='text-center text-white'>© TreatBot.io</p>
              <p className='text-[#7674F5]'>All Rights Reserved 2023</p>
            </div>
            <img src={footer_image} alt="Footer Image" />
          </div>
            */
          }
        </div>

      </div>

    </section>

  )
}

export default Mission