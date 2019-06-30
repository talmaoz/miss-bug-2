const fs = require('fs')


module.exports = {
    query,
    getById,
    remove,
    add,
    update
}

var bugs = _createBugs();

const limit = 3;


function query(filterBy) {

    var fliteredBugs = bugs.filter(bug => !filterBy.txt || bug.vendor.includes(filterBy.txt))

    var offeset = (filterBy.page-1) * limit;

    fliteredBugs = fliteredBugs.slice(offeset, offeset+limit);

    return Promise.resolve(fliteredBugs)
}

function update(bug) {
    var bugIdx = bugs.findIndex(currBug => currBug.id === bug.id);
    bugs.splice(bugIdx, 1, bug);
    return _saveBugsToFile().then(() => bug)
}


function add(bug) {
    bug.id = _makeId()
    bugs.push(bug)
    return _saveBugsToFile().then(() => bug)
}
function remove(id, loggedinUserId) {
    var bugIdx = bugs.findIndex(bug => bug.id === id && bug.owner._id === loggedinUserId);
    if (bugIdx < 0) return Promise.reject('Unknow Bug');
    bugs.splice(bugIdx, 1)
    return _saveBugsToFile()
}

function getById(id) {
    var bug = bugs.find(bug => bug.id === id);
    if (bug) return Promise.resolve(bug);
    else return Promise.reject('Unknown Bug');
}


function _makeId(length = 3) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}

function _createBugs() {
    bugs = require('../data/bug.json')
    if (bugs && bugs.length) return bugs;
    return ['Fiag', 'Subali'].map(_createBug)
}

function _createBug(vendor) {
    return {
        id: _makeId(),
        vendor,
    }
}

function _saveBugsToFile() {
    return new Promise((resolve, reject) => {
        fs.writeFile("data/bug.json", JSON.stringify(bugs), (err) => {
            if (err) {
                return reject(err)
            }
            resolve()
        });

    })
}
