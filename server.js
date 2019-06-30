const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const app = express()
const port = 3001

app.use(express.static('public'))
app.use(bodyParser.json())
app.use(cookieParser());

app.use(session({
    secret: 'puki muki',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))

const bugRoute = require('./api/bug/bug.route');
const userRoute = require('./api/user/user.route');

app.use('/api/bug', bugRoute)
app.use('/api/user', userRoute)

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port,
    () => console.log(`Example app listening on port ${port}!`))