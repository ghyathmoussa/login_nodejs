const db = require('../config/db_config')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const jwtSecret = '4715aed3c946f7b0a38e6b534a9583628d84e96d10fbc04700770d572af3dce43625dd'

exports.register = (req, res) => {
    let { username, email, password } = req.body //get data from body
    const salt_round = 10

    // encrypt password then save it

    bcrypt.hash(password, salt_round, (err1, hash) => {
        if (!err1) {
            db.query(`INSERT INTO users(username,email,password) VALUES (?,?,?)`, [username, email, hash], (err, resulte) => {
                if (!err) {
                    const maxAge = 30*60*60
                    const token = jwt.sign(
                        {id:resulte[0].username,username,role:resulte[0].role},
                        jwtSecret,
                        {
                            expiresIn:maxAge // 3h 
                        }
                    );
                    res.cookie('token',token,{
                        httpOnly:true,
                        maxAge:maxAge * 1000
                    })
                    console.log('inserted')
                    res.sendStatus(200).json(resulte)
                }
                else {
                    console.log('error: ', err)
                    res.sendStatus(500).json({ message: 'error insertion' })
                }
            })
        }
    })

}