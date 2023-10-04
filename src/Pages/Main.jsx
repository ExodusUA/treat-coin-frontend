import React from 'react'
import Navbar from '../Components/Navbar'
import EmailForm from '../Components/EmailForm'
import { useLanguage } from '../Helpers/LanguageContext'
import { useEffect, useState } from 'react'


function Main() {

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
    <>
      <section className={'relative bg-mobile md:bg-main h-screen w-screen bg-cover bg-center'}>
        <Navbar translatedData={languageData} />
        <div className='max-w-[90vw] m-auto flex justify-end items-center align-middle'>
          <EmailForm translatedData={languageData} />
        </div>
      </section>

    </>
  )
}

export default Main