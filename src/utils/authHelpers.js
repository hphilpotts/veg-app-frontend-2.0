import Axios from 'axios'

function User(loggedIn, userName, userId, token) {
    this.loggedIn = loggedIn
    this.name = userName
    this.id = userId
    this.token = token
}

export const nullUser = new User(false, 'Guest', null, null)

export const requestSignIn = async input => {
    let userOutput = nullUser
    await Axios.post('/api/auth/signin', input)
        .then(res => {
            if (res.data.token) { // if successful w/ token returned (need this otherwise userName = undefined and error thrown)
                userOutput = new User(true, res.data.body.userName, res.data.body._id, res.data.token)
            }
        })
        .catch(err => {
            console.error(err)
        })
    return userOutput
}