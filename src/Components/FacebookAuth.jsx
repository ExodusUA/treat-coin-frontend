import React from 'react'
import { LoginSocialFacebook } from 'reactjs-social-login';
import facebook from '../images/facebook.svg';

function FacebookAuth({ loginViaFacebook, setLoading }) {

    function getFacebookEmail(data) {
        setLoading(true)
        loginViaFacebook(data.data.email)
    }

    return (
        <LoginSocialFacebook scope='email' fields='email' appId={process.env.REACT_APP_FACEBOOK_APP_ID} onResolve={(response) => {
            console.log(response)
            getFacebookEmail(response)
        }}
            onReject={(response) => {
                console.log(response)
            }}
            fieldsProfile={
                'email'
            }>

            <button type="button" className='border-[1px] border-[#282B54] bg-white px-[16px] py-[16px] flex items-center gap-3 rounded-[18px] w-[155px] sm:w-[165px]'>
                <img className='w-[30px]' src={facebook} alt="Facebook" />
                <p className='text-[#2C3BCB] text-[16px] sm:text-[18px]'>Facebook</p>
            </button>
        </LoginSocialFacebook>
    )
}

export default FacebookAuth
