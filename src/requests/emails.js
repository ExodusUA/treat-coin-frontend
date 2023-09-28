import axios from 'axios';

async function sendEmail(userEmail, code) {

    let data = {
        code: code,
        userEmail: userEmail
    }

    const res = await axios.post('http://exodusdevelop.com:3010/sendEmail', data, {
        headers: {
            'Content-Type': 'application/json',
        }
    })

    return res.data

}

export default {sendEmail};