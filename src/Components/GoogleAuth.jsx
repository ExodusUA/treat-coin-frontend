import React from 'react'
import google from '../images/google.svg';
import { LoginSocialGoogle } from 'reactjs-social-login';

function GoogleAuth({ loginViaGoogle, setLoading }) {

    return (
        <>
            <LoginSocialGoogle scope='https://www.googleapis.com/auth/userinfo.email' client_id='539052354588-6lpssquossom75ju3kudcm1hn2e88udq.apps.googleusercontent.com' onResolve={(response) => {
                setLoading(true)
                console.log(response.data)
                console.log('Google Email: ', response.data.email)
                loginViaGoogle(response.data.email)
            }}
                onReject={(response) => {
                    console.log(response)
                }}
            >
                <button type="button" className='border-[1px] border-[#282B54] bg-white px-[16px] py-[14px] sm:py-[16px] flex items-center gap-3 rounded-[18px] w-[145px] sm:w-[165px]'>
                <img className='w-[25px] h-[25px] sm:w-[30px] sm:h-[30px]' src={google} alt="Google" />
                    <p className='text-[#E43E2B] text-[16px] sm:text-[18px]'>Google</p>
                </button>
            </LoginSocialGoogle>
        </>

    )
}

export default GoogleAuth