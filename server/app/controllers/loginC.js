const db = require('../config/db_config')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const jwtSecret = '4715aed3c946f7b0a38e6b534a9583628d84e96d10fbc04700770d572af3dce43625dd'

exports.login = (req, res) => {
    const { email, password } = req.body
    try {


        db.query(`SELECT * FROM users WHERE email = '${email}'`, (err, result) => {
            if (!err) {
                let username = result[0].username
                bcrypt.compare(password, result[0].password, (error, r) => {
                    if (!error) {
                        const maxAge = 30 * 60 * 60
                        const token = jwt.sign(
                            { id: result[0].username, username, role: result[0].role },
                            jwtSecret,
                            {
                                expiresIn: maxAge
                            }
                        );
                        res.cookie('jwt', token, {
                            httpOnly: true,
                            maxAge: maxAge * 1000
                        })
                        res.status(200).json({ message: 'login successfully' })
                    } else {
                        console.log('error', error)
                    }
                })
            } else {
                console.log('error:', err)
            }
        })
    } catch (e) {
        console.log('error ==> ', e)
        res.status(500).json({ message: 'error in login' })
    }

}