import React from 'react'
import loadingImage from '../images/loading.svg'

function OverlaySpinner({ loading }) {
    return (
        <div className={`fixed w-screen h-screen bg-gray-700/40 z-[9999] flex justify-center items-center left-0 top-0 duration-300 ${loading === true ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <div className='w-16 h-16 bg-[#8D31E4] rounded-lg text-center items-center flex justify-center'>
                <img className='w-8 h-8' src={loadingImage} alt="" />
            </div>
        </div>
    )
}

export default OverlaySpinner