import React, { useState, useRef, useEffect } from 'react';

const EmailCode = ({setUserCode}) => {
    const [code, setCode] = useState(['', '', '', '', '', '']);
    const inputRefs = useRef([]);

    const handleInputChange = (e, index) => {
        const { value } = e.target;
        const updatedCode = [...code];
        updatedCode[index] = value;
        setCode(updatedCode);

        // Move focus to the next input
        if (value && index < 5) {
            inputRefs.current[index + 1].focus();
        }
    };

    const handleKeyDown = (e, index) => {
        // Move focus to the previous input when backspace is pressed
        if (e.key === 'Backspace' && !code[index] && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };

    const handlePaste = (e, index) => {
        e.preventDefault();
        const clipboardData = e.clipboardData.getData('Text');
        const updatedCode = [...code];

        for (let i = 0; i < clipboardData.length; i++) {
            if (index + i < 6) {
                updatedCode[index + i] = clipboardData[i];
            } else {
                break;
            }
        }

        setCode(updatedCode);
    };

    useEffect(() => {
        setUserCode(code.join(''));
    }, [code]);

    return (
        <div className="flex space-x-2">
            {code.map((value, index) => (
                <input
                    key={index}
                    type="text"
                    value={value}
                    className="w-[33px] h-[44px] md:w-[66px] md:h-[88px] p-2 text-center rounded-md border-2 border-[#EA81B6] outline-none text-[#8D31E4] text-[20px] md:text-[56px] font-bold"
                    onChange={(e) => handleInputChange(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    onPaste={(e) => handlePaste(e, index)}
                    maxLength={1}
                    ref={(input) => (inputRefs.current[index] = input)}
                />
            ))}
        </div>
    );
};

export default EmailCode;