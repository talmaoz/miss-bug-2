const fs = require('fs')

var users = require('../data/user.json')

module.exports = {
    login,
    signup
}

function login(credentials) {
    const user = users.find(user => {
        return user.name === credentials.name && user.pass === credentials.pass
    });

    if (user) {
        return Promise.resolve({
            _id : user._id,
            name: user.name,
            isAdmin: user.isAdmin});
    }
    else return Promise.reject('Login failed.');
}

function signup(user) {
    user._id = _makeId();
    users.push(user);
    _saveUsersToFile();
    return Promise.resolve(user);

}

function _saveUsersToFile() {
    fs.writeFileSync('data/user.json', JSON.stringify(users, null, 2));
}

function _makeId(length=3) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}
