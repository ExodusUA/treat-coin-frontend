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

async function checkIfUserExists(userEmail, token) {

    let data = {
        userEmail: userEmail,
        token: token
    }

    const res = await axios.post(process.env.REACT_APP_API_URL + '/checkEmail', data, {
        headers: {
            'Content-Type': 'application/json',
        }
    })

    return res.data
}

async function getUserCountry() {
    const res = await axios.get('https://geosvc.globalmailer.com/mygeoipinfo?json=1')
    return res.data.data.country
}


export default { sendEmail, checkCodeValidity, checkIfUserExists, getUserCountry };