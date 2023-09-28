import React, { useState } from 'react';
import menu from '../images/menu.svg';
import logoColor from '../images/LogoColor.svg';
import close from '../images/close.svg';
import arrow from '../images/arrow.svg';
import LanguageChange from './LanguageChange';

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [moreOptionsOpen, setMoreOptionsOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const toggleMoreOptions = () => {
        setMoreOptionsOpen(!moreOptionsOpen);
    };

    return (
        <nav className='max-w-[1220px] mx-auto w-[90%] pt-[30px] relative'>
            <img className='cursor-pointer' src={menu} alt="Menu" onClick={toggleMenu} />

            {menuOpen && (
                <div className='left-0 top-0 fixed md:absolute md:top-[20px] md:left-[-10px] w-full md:w-[300px] bg-white rounded-[24px] mobile-gradient p-4 z-[99999] h-full md:h-auto'>
                    <div className='flex items-center justify-between'>
                        <img src={logoColor} alt="Logotype" />
                        <img className='cursor-pointer' src={close} alt="Close" onClick={toggleMenu} />
                    </div>

                    <ul className='mt-2'>
                        <li className='py-2 border-b-[1px] border-[#3735A080]'>
                            <a className='text-black text-[18px] font-medium' href='#'>About us</a>
                        </li>
                        <li className='py-2 border-b-[1px] border-[#3735A080]'>
                            <a className='text-black text-[18px] font-medium' href='#'>Our mission</a>
                        </li>
                        <li className='py-2 border-b-[1px] border-[#3735A080]'>
                            <a className='text-black text-[18px] font-medium' href='#'>Terms and Conditions</a>
                        </li>
                        <li className='py-2 border-b-[1px] border-[#3735A080]'>
                            <div
                                className='flex items-center justify-between cursor-pointer'
                                onClick={toggleMoreOptions}
                            >
                                <span className='text-black text-[18px] font-medium'>Privacy Policy</span>
                                <img src={arrow} className={`leading-0 transform transition-transform ${moreOptionsOpen === true ? 'rotate-0' : 'rotate-90'}`} alt="Arrow" />
                            </div>
                            {moreOptionsOpen && (
                                <ul className='pl-2'>
                                    <li className='py-2 border-b-[1px] border-[#3735A080]'>
                                        <a className='text-black text-[18px] font-regular' href='#'>About Us</a>
                                    </li>
                                    <li className='py-2 border-b-[1px] border-[#3735A080]'>
                                        <a className='text-black text-[18px] font-regular' href='#'>TreatCoin's Mission</a>
                                    </li>
                                    <li className='py-2 border-b-[1px] border-[#3735A080]'>
                                        <a className='text-black text-[18px] font-regular' href='#'>How Does it Work?</a>
                                    </li>
                                    <li className='py-2'>
                                        <a className='text-black text-[18px] font-regular' href='#'>FAQ</a>
                                    </li>
                                </ul>
                            )}
                        </li>
                        <li className='py-2 border-b-[1px] border-[#3735A080]'>
                            <a className='text-black text-[18px] font-medium' href='#'>Help Center</a>
                        </li>

                        <li className='py-2'>
                            <a className='text-black text-[18px] font-medium' href='#'>Virtual Treat Market</a>
                        </li>
                    </ul>

                    <div className='relative'>
                        <LanguageChange />
                    </div>

                    <div className='bg-white p-4 rounded-[38px] text-center mt-4'>
                        <a href="#" target='_blank'><button className='w-full button-gradient px-[50px] py-[16px] text-white rounded-[18px]'>Join TreatCoin</button></a>
                        <a href="#" className='relative top-2 underline text-[#282B54] text-[14px] text-center'>Log in</a>
                    </div>

                </div>
            )}
        </nav>
    );
}

export default Navbar;
