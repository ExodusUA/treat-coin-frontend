import axios from 'axios';

async function sendEmail(userEmail, code) {

    let data = {
        code: code,
        userEmail: userEmail
    }

    const res = await axios.post('https://exodusdevelop.com:3000/sendEmail', data, {
        headers: {
            'Content-Type': 'application/json',
        }
    })

    return res.data

}

export default {sendEmail};