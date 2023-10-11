const express   = require('express');
let router      = express.Router();
const Users    = require('../models/users');

const isLogin = (req, res, next) => {
    if(req.session && req.session.user) {
        next()
    } else {
        res.redirect('/login')
    }
}

router.get('/', isLogin, async (req, res) => {
    res.render('index', { user: req.session.user })
})

// Read All
router.get('/users', async(req, res) => {
    const users = await Users.find()
    res.json(users)
})
// Read One by Email ( body )
router.get('/user', async (req, res) => {
    const email = req.body.email
    const user = await Users.findOne({ email: email })
    res.json(user)
})
// Create One ( body )
router.post('/user', async (req, res) => {
    const user = new Users({username: req.body.username, email: req.body.email, password: req.body.password})
    await user.save()
    res.json(user)
})
// Delete One by Email ( body )
router.delete('/user', async (req, res) => {
    const email = req.body.email
    const user = await Users.deleteOne({ email: email })
    res.json(user)
})
// Update One by Email ( body )
router.put('/user', async (req, res) => {
    const email = req.body.email
    const user = await Users.updateOne({ email: email }, { username: req.body.username })
    res.json(user)
})

router.post('/login', async (req, res) => {
    req.session.user = req.body
    res.redirect('/')
})

router.get('/register', async (req, res) => {
    res.render('register')
})

router.post('/register', async (req, res) => {
    // Todo
    res.redirect('/')
})

router.get('/logout', async (req, res) => {
    req.session.destroy()
    res.redirect('/login')
})

module.exports = router;