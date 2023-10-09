import React, { useEffect, useState } from 'react';
import menu from '../images/menu.svg';
import logoColor from '../images/LogoColor.svg';
import close from '../images/close.svg';
import arrow from '../images/arrow.svg';
import LanguageChange from './LanguageChange';
import { Link } from 'react-router-dom';
import LogoColor from '../images/LogoColor.svg';

function Navbar({ translatedData }) {
    const [menuOpen, setMenuOpen] = useState(false);
    const [moreOptionsOpen, setMoreOptionsOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const toggleMoreOptions = () => {
        setMoreOptionsOpen(!moreOptionsOpen);
    };



    return (
        <nav className='max-w-[1220px] mx-auto w-[90%] pt-[30px] relative flex justify-between'>
            <img className='cursor-pointer relative z-[9]' src={menu} alt="Menu" onClick={toggleMenu} />


            {menuOpen && (
                <div className='left-0 top-0 fixed md:absolute md:top-[20px] md:left-[-10px] w-full md:w-[300px] bg-white rounded-[24px] mobile-gradient p-4 z-[999999] h-full md:h-auto'>
                    <div className='flex items-center justify-between'>
                        <Link to={'/'}><img src={logoColor} alt="Logotype" /></Link>
                        <img className='cursor-pointer' src={close} alt="Close" onClick={toggleMenu} />
                    </div>

                    <ul className='mt-2'>

                        <li className='py-2 border-b-[1px] border-[#3735A080]'>
                            <Link className='text-black text-[18px] font-medium' to='/about'>{translatedData.aboutUsLinkText}</Link>
                        </li>
                        <li className='py-2 border-b-[1px] border-[#3735A080]'>
                            <Link className='text-black text-[18px] font-medium' to='/mission'>{translatedData.ourMissionLinkText}</Link>
                        </li>
                        
                    </ul>

                    <div className='relative mt-4'>
                        <LanguageChange />
                    </div>
{/* 
                    <div className='bg-white p-4 rounded-[38px] text-center mt-4'>
                        <a href="#" target='_blank'><button className='w-full button-gradient px-[50px] py-[16px] text-white rounded-[18px]'>{translatedData.joinTreatCoinButtonText}</button></a>
                        <a href="#" className='relative top-2 underline text-[#282B54] text-[14px] text-center'>{translatedData.loginLinkText}</a>
                    </div>

 */}                </div>
            )}
        </nav>
    );


}

export default Navbar;
