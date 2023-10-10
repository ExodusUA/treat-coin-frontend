import axios from 'axios';

async function sendEmail(userEmail, token) {

    let data = {
        userEmail: userEmail,
        token: token
    }

    const res = await axios.post(process.env.REACT_APP_API_URL + '/sendEmail', data, {
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

    const res = await axios.post(process.env.REACT_APP_API_URL + '/verify', data, {
        headers: {
            'Content-Type': 'application/json',
        }
    })

    return res.data

}

export default { sendEmail, checkCodeValidity };