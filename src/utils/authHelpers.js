import Axios from 'axios'

function AuthAttempt(successful, message) {
    this.successful = successful,
    this.message = message
}

function User(loggedIn, userName, userId, token) {
    this.loggedIn = loggedIn
    this.name = userName
    this.id = userId
    this.token = token
}

export const nullUser = new User(false, 'Guest', null, null)

export const userSignupRequest = async input => {
    const attempt = new AuthAttempt(false, 'unknown error signing up, please try again later')
    await Axios.post('/api/auth/signup', input)
        .then(res => {
            if (res.status === 201) {
                attempt.successful = true,
                attempt.message = 'account successfully created!'
            }
        })
        .catch(err => {
            if (err.response) {
                attempt.message = err.response.data.message
            }
        })
    return attempt
}

export const userSignInRequest = async (input) => {
    let userOutput = nullUser
    await Axios.post('/api/auth/signin', input)
        .then(res => {
            console.log(res)
            if (res.status === 200) {
                console.log('happy days')
                console.log(res)
                userOutput = new User(true, res.data.body.userName, res.data.body._id, res.data.token)
            }
        })
        .catch(err => {
            console.error(err)
            if (err.response) {
                console.error(err.response.data.message)
            }
        })
    return userOutput
}