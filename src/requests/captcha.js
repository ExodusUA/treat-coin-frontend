import axios from 'axios';

async function checkCaptcha(token) {

    let data = {
        token: token
    }

    const res = await axios.post(process.env.REACT_APP_API_URL + '/captchaVerify', data, {
        headers: {
            'Content-Type': 'application/json',
        }
    })

    return res.data

}

export default { checkCaptcha };