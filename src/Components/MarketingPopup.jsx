import React, { useState } from "react";

function MarketingPopup({showPopup, setShowPopup}) {

    const openModal = () => {
        setShowPopup(true);
    };

    const closeModal = () => {
        setShowPopup(false);
    };

    return (
        <div>
            {showPopup && (
                <div className="fixed inset-0 flex items-center justify-center z-[9000] bg-black/50">
                    <div className="bg-white w-[90%] xl:w-1/2 p-6 rounded shadow-lg">
                        <div className="flex justify-end">
                            <button
                                className="text-gray-500 hover:text-gray-700"
                                onClick={closeModal}
                            >
                                <svg
                                    className="h-6 w-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                        <p className="text-gray-800">
                            By providing TreatCoin.com with your email you agree to be added
                            to TreatCoin.com waiting list and to receive promotional materials
                            and initial offers.
                        </p>
                        <p className="mt-4 text-gray-800">
                            You agree that TreatCoin.com may approach your social media
                            profiles in order to promote custom-made advertisements for you.
                        </p>
                    </div>
                    
                </div>
            )}
        </div>
    );
}

export default MarketingPopup;
