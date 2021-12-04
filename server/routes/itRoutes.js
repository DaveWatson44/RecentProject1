const express = require('express');
const router = express.Router();
const pg = require('../db/postgresquery');
const User = require('../utils/user')


router.post('/tickets', (req, res, next) => {
    const status = req.body.status;
    const sql = "SELECT * FROM tickets WHERE resolved = $1"
    const values = [status]
    pg.query(sql, values).then(resp => {
        let tickets = resp.rows;
        tickets.forEach((ticket) => {
            console.log(ticket)
            if (ticket.created_on) {

                ticket.created_on = ticket.created_on.toLocaleDateString('en-US')
            }
        })
        return tickets

    }).then((tickets) => {
        res.send(tickets)
    }).catch(err => {
        console.log(err)
        res.send(err)
    })

});

router.post('/add_ticket', async (req, res, next) => {
    let subject = req.body.subject;
    let issue = req.body.issue;
    let sql = 'INSERT INTO tickets(issuer_id, issuer, subject, department_id, issue, resolved) VALUES ($1, $2, $3, $4, $5, $6)'
    let values = [1, 1, subject, 1, issue, 'f']

    pg.query(sql, values).then(resp => {
        res.status(200).send({ message: 'Your ticket was added successfully!' })
    }).catch(err => {
        console.log(err)
        res.status(500).send({ message: 'Something went wrong adding the ticket! Please try again later.' })
    })
})


module.exports = router;