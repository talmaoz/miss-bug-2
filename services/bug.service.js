const fs = require('fs')

module.exports = {
    query,
    getById,
    remove,
    add,
    update
}

const DEFAULT_BUG_LIST = [
    {
        "_id": "abc123",
        "title": "Cannot save a Car",
        "description": "problem when clicking Save",
        "severity": 1,
        "createdAt": 1542107359454,
        "creator": {
            "_id": "xyz111",
            "name": "Shahar",
            "isAdmin": false
        }
    },
    {
        "_id": "abc124",
        "title": "Cannot MARRY a Car",
        "description": "problem when explaining to the RABI",
        "severity": 2,
        "createdAt": 1542193759454,
        "creator": {
            "_id": "xyz112",
            "name": "Tal",
            "isAdmin": false
        }
    },
    {
        "_id": "abc125",
        "title": "Cannot change Car color YYY",
        "description": "problem when clicking Color Pallete",
        "severity": 2,
        "createdAt": 1561809220793,
        "creator": {
            "_id": "xyz112",
            "name": "Tal",
            "isAdmin": false
        }
    },
    {
        "title": "My New Bug",
        "description": "dfsdf;lskjdf;lskdf",
        "severity": 1,
        "createdAt": 1561809206618,
        "creator": {
            "_id": "xyz112",
            "name": "Tal",
            "isAdmin": false
        },
        "_id": "cvv"
    }
]
const limit = 3;

var bugs = _createBugs();

function query(filterBy) {

    var fliteredBugs = bugs.filter(bug => !filterBy.txt || bug.vendor.includes(filterBy.txt))

    var offeset = (filterBy.page-1) * limit;

    fliteredBugs = fliteredBugs.slice(offeset, offeset+limit);

    return Promise.resolve(fliteredBugs)
}

function update(bug, loggedinUser) {
    var bugIdx = bugs.findIndex(currBug => {
        return (
            currBug._id === bug._id && (currBug.creator._id === loggedinUser._id || loggedinUser.isAdmin)
        )
    });
    if (bugIdx !== -1) {
        if (!loggedinUser.isAdmin) bug.creator = loggedinUser
        bugs.splice(bugIdx, 1, bug);
        return _saveBugsToFile().then(() => bug)
    }
    return Promise.reject('ERROR in UPDATE')
}

function add(bug) {
    bug.id = _makeId()
    bugs.push(bug)
    return _saveBugsToFile().then(() => bug)
}

function remove(id, loggedinUser) {
    var bugIdx = bugs.findIndex(bug => {
        return bug._id === id && (bug.creator._id === loggedinUser._id || loggedinUser.isAdmin)
    });
    if (bugIdx < 0) {
        return Promise.reject('Unknow Bug');
    }
    bugs.splice(bugIdx, 1)
    return _saveBugsToFile()
}

function getById(id) {
    var bug = bugs.find(bug => bug._id === id);
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
    bugs = JSON.parse(JSON.stringify(DEFAULT_BUG_LIST))
    _saveBugsToFile()
    return bugs
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

