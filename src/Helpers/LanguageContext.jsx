import React, { createContext, useState, useContext, useEffect } from 'react';
import API from '../requests/emails';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState('EN');

    useEffect(() => {
        if (localStorage.getItem('language') === null) {
            const country = API.getUserCountry();
            country
                .then((result) => {
                    let userLang;
                    switch (result) {
                        case 'IN':
                            userLang = 'HI';
                            break;
                        case 'AR':
                        case 'MX':
                            userLang = 'ES';
                            break;
                        case 'BR':
                            userLang = 'PT';
                            break;
                        default:
                            userLang = 'EN';
                            break;
                    }
                    setLanguage(userLang);
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            setLanguage(localStorage.getItem('language'));
        }

    }, [language]);

    const changeLanguage = (newLanguage) => {
        localStorage.setItem('language', newLanguage);
        setLanguage(newLanguage);
    };

    return (
        <LanguageContext.Provider value={{ language, changeLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    return useContext(LanguageContext);
};