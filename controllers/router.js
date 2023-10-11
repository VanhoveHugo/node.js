const express   = require('express');
let router      = express.Router();

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

router.get('/login', async (req, res) => {
    res.render('login')
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