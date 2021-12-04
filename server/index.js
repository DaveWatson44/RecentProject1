const jwt = require('jsonwebtoken');
const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
const pg = require('./db/postgresquery')
const itRoutes = require('./routes/itRoutes')
const baRoutes = require('./routes/baRoutes')
const maintenanceRoutes = require('./routes/maintenance')
const bcrypt = require('bcrypt');



app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods: POST, GET, OPTIONS, preflightContinue": false');
    next();
});

app.use(cors({
    origin: [
        'http://localhost:8080',
        'https://localhost:8080'
    ],
    exposedHeaders: ['set-cookie']
}));

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    console.log(authHeader)
    const token = authHeader && authHeader.split(' ')[1];
    const secret = 'hjkhdfhkjcvncxkjhoweiutpoqwlkkjghqwekjhqwejkh'

    if (token == null) return res.sendStatus(401)

    jwt.verify(token, secret, (err, user) => {
        if (err) {
            console.log(err)
            return res.sendStatus(403)
        }

        req.user = user
        console.log('USER', user)

        next()
    })
}

app.post('/get_roles', authenticateToken, (req, res, next) => {
    const userId = req.body.userId;
    const sql = `SELECT role_id from user_roles WHERE user_id = $1`
    const values = [userId]
    let roles = []
    pg.query(sql, values).then((resp) => {
        let returnedRoles = resp.rows;
        for (let role of returnedRoles) {
            roles.push(role.role_id)
        }
        res.send(roles)
    }).catch(err => res.send(err))
})

app.post('/signup', (req, res, next) => {
    let username = req.body.userName;
    let password = req.body.password;
    const secret = 'hjkhdfhkjcvncxkjhoweiutpoqwlkkjghqwekjhqwejkh'
    const saltRounds = 10;
    const sql = 'INSERT INTO users (email_address, username, password, created_on, updated_on, department_id) VALUES ($1, $2, $3, $4, $5, $6)'

    bcrypt.genSalt(saltRounds, function (err, salt) {
        bcrypt.hash(password, salt, function (err, passwordHash) {
            // Will need to do a check first to see if user already exists in the db.
            let values = [username, username, passwordHash, '2021-10-04', '2021-10-04', 1]
            pg.query(sql, values).then((resp) => {
                console.log(resp)
                console.log('user added succesfully.')
                const token = jwt.sign({ userName: username }, secret, { expiresIn: '30d' });
                return token
            }).then((token) => {
                let sql = 'SELECT user_id FROM users WHERE username = $1';
                let values = [username]
                pg.query(sql, values).then((resp) => {
                    console.log(resp);
                    let userID = resp.rows[0].user_id;
                    res.send({userID: userID, token: token})
                }).catch(err => {console.log(err); res.send(err);})
            }).catch(err => console.log(err))
        })
    })


});

app.post('/login', (req, res, next) => {
    let username = req.body.userName;
    let password = req.body.password;
    const secret = 'hjkhdfhkjcvncxkjhoweiutpoqwlkkjghqwekjhqwejkh'
    const sql = 'SELECT user_id, password FROM users WHERE username = $1'
    let values = [username]
    pg.query(sql, values).then(resp => {
        let hash = resp.rows[0].password
        let userID = resp.rows[0].user_id
        bcrypt.compare(password, hash, function (err, result) {
            if (result == true) {
                console.log('passwords match!!!')
                const token = jwt.sign({ userName: username }, secret, { expiresIn: '30d' });
                console.log('logged in sending:', userID)
                res.send({userID: userID, token: token})
            } else {
                console.log('passwords dont match')
            }
        });
    }).catch(err => console.log(err))
})

app.use(itRoutes)
app.use(baRoutes)
app.use(maintenanceRoutes)

app.listen(port, () => {
    console.log(`App listening on localhost:${port}`)
})



