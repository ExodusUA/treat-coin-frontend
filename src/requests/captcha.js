import axios from 'axios';

async function checkCaptcha(token) {

    let data = {
        token: token
    }

    const res = await axios.post('http://146.59.14.103:3001/captchaVerify', data, {
        headers: {
            'Content-Type': 'application/json',
        }
    })

    return res.data

}

export default { checkCaptcha };