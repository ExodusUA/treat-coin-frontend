import axios from 'axios';

async function sendEmail(userEmail, token, sendEmail) {
    let data = {
        userEmail: userEmail,
        token: token,
        sendEmail: sendEmail ? 1 : 0
    }
    const res = await axios.post(`https://user.treatcoin.com/sendEmail`, data, {
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
    const res = await axios.post('https://user.treatcoin.com/verify', data, {
        headers: {
            'Content-Type': 'application/json',
        }
    })
    return res.data
}

async function checkIfUserExists(userEmail, token) {

    return sendEmail(userEmail, token, false);
    /*let data = {
        userEmail: userEmail,
        token: token
    }

    const res = await axios.post('https://user.treatcoin.com/checkEmail', data, {
        headers: {
            'Content-Type': 'application/json',
        }
    })

    return res.data*/
}

async function getUserCountry() {
    const res = await axios.get('https://geosvc.globalmailer.com/mygeoipinfo?json=1&corsdef=1')
    return res.data.Data.country
}


export default { sendEmail, checkCodeValidity, checkIfUserExists, getUserCountry };