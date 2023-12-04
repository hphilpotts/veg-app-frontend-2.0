import Axios from 'axios';

function AuthAttempt(success, message) {
    this.successful = success
    this.message = message
};

function User(loggedIn, username, userId, token) {
    this.loggedIn = loggedIn
    this.name = username
    this.id = userId
    this.token = token
};

export const nullUser = new User(false, 'Guest', null, null);

export const userSignupAttempt = async input => {

    let attempt = new AuthAttempt(false, 'unknown error signing up, please try again later');

    await Axios.post('/api/auth/signup', input)
        .then(res => {
            if (res.status === 201) {
                attempt = new AuthAttempt(true, 'user signed up successfully!');
            }
        })
        .catch(err => {
            if (err.response) {
                attempt.message = err.response.data.message;
            }
        })
    return attempt;
};

export const userSignInRequest = async (input) => {

    const response = {
        user: nullUser,
        attempt: new AuthAttempt(false, 'unknown error signing in, please try again later')
    };

    await Axios.post('/api/auth/signin', input)
        .then(res => {
            if (res.status === 200) {
                response.user = new User(true, res.data.body.username, res.data.body._id, res.data.token);
                response.attempt = new AuthAttempt(true, 'signed in successfully!');
            }
        })
        .catch(err => {
            if (err.response) {
                response.attempt.message = err.response.data.message;
            }
        })
    return response;
};