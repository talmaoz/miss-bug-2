import eventBus, { USER_LOGIN } from "../eventBus.js";

export default {
    login,
    logout,
    signup,
    getLoggedinUser
}

var loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'))

function getLoggedinUser() {
    return loggedInUser;
}

function login(credentials) {
    return axios.post('/api/user/login', credentials)
        .then(res => {
            console.log('THENNNNN');
            return _handleSuccessfulRegister(res.data)
        })
        // .catch(err => {
        //     console.log('CATCH', err);
        // })
}
function signup(userData) {
    return axios.post('/api/user/signup', userData)
        .then(res => {
            return _handleSuccessfulRegister(res.data)
        })
}

function logout() {
    return axios.post('/api/user/logout')
        .then(res => {
            sessionStorage.clear()
            loggedInUser = null
        })
}

function _handleSuccessfulRegister(user) {
    loggedInUser = user
    sessionStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
    eventBus.$emit(USER_LOGIN)
    return loggedInUser;
}