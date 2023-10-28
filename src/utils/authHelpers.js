import Axios from 'axios'

export const nullUser = {
    loggedIn: false,
    name: 'Guest',
    email: null,
    token: null
}

export const requestSignIn = async input => {
    const user = { ...nullUser }
    await Axios.post('/api/auth/signin', input)
        .then(res => {
            if (res.data.token) { // if successful (otherwise userName = undefined and error thrown)
                user.loggedIn = true
                user.name = res.data.body.userName
                user.email = res.data.body.emailAddress
                user.token = res.data.token
            }
        })
        .catch(err => {
            console.error(err)
        })
    return user
}