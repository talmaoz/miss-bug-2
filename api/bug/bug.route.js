const bugService = require('../../services/bug.service')
const express = require('express')
const router = express.Router()
module.exports = router

// Bug LIST
router.get('/', (req, res) => {
    const filterBy = req.query;
    bugService.query(filterBy)
        .then(bugs => res.json(bugs))
})

// Bug Add
router.post('/', (req, res) => {
    if (!req.session.user) return res.status(403).send('Unauthenticated')
    const bug = req.body;
    bug.owner = req.session.user;
    bugService.add(bug)
        .then(bugWithId => res.json(bugWithId))
        .catch(()=>{
            res.status(500).send('Server ERROR: Could not add your bug.')
        })
})

// Bug Single
router.get('/:id', (req, res) => {
    const bugId = req.params.id
    bugService.getById(bugId)
    .then(bug => res.json(bug))
    .catch(()=>{
        res.status(404).send('Unknown Bug.')
    })
})

// Bug Delete
router.delete('/:id', (req, res) => {
    if (!req.session.user) return res.status(403).send('Not Authenticated')
    const bugId = req.params.id

    bugService.remove(bugId, req.session.user)
    .then(()=>{
        res.json({})
    })
    .catch(()=>{
        res.status(500).send('Could Not Delete')
    })
})

// Bug Edit
router.put('/:id', (req, res) => {
    const bug = req.body;
    bugService.update(bug)
    .then(bug => res.json(bug))
    .catch(()=>{
        res.status(500).send('Could Not Edit')
    })
})



