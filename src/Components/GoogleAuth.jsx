import React from 'react'
import google from '../images/google.svg';
import { LoginSocialGoogle } from 'reactjs-social-login';

function GoogleAuth({ loginViaGoogle, setLoading }) {

    return (
        <>
            <LoginSocialGoogle client_id={process.env.REACT_APP_GOOGLE_CLIENT_ID} onResolve={(response) => {
                setLoading(true)
                loginViaGoogle(response.data.email)
            }}
                onReject={(response) => {
                    console.log(response)
                }}
            >
                <button type="button" className='border-[1px] border-[#282B54] bg-white px-[16px] py-[16px] flex items-center gap-3 rounded-[18px] w-[155px] sm:w-[165px]'>
                    <img className='w-[30px]' src={google} alt="Google" />
                    <p className='text-[#E43E2B] text-[16px] sm:text-[18px]'>Google</p>
                </button>
            </LoginSocialGoogle>
        </>

    )
}

export default GoogleAuth