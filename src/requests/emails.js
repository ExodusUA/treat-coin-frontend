import axios from 'axios';

async function sendEmail(userEmail) {

    let data = {
        userEmail: userEmail
    }

    const res = await axios.post('http://exodusdevelop.com:3001/sendEmail', data, {
        headers: {
            'Content-Type': 'application/json',
        }
    })

    return res.data

}

async function checkCodeValidity(code) {

    let data = {
        code: code
    }

    const res = await axios.post('http://exodusdevelop.com:3001/verify', data, {
        headers: {
            'Content-Type': 'application/json',
        }
    })

    return res.data

}

export default { sendEmail, checkCodeValidity };