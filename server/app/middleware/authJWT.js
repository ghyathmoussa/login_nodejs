const jwt = require('jsonwebtoken')
const jwtSecret = '4715aed3c946f7b0a38e6b534a9583628d84e96d10fbc04700770d572af3dce43625dd'

exports.adminAuth = (req, res, next) => {
    const token = req.cookies.jwt

    if (token) {
        jwt.verify(token, jwtSecret, (err, decodedToken) => {
            if (err) {
                console.log(err.message)
                return res.sendStatus(401).json({ message: 'Unauthorized' })
            } else {
                console.log(decodedToken)
                if (decodedToken.role !== 'admin') {
                    return res.sendStatus(401).json({ message: 'Unauthorized' })
                } else {
                    return res.sendStatus(200).json({ message: 'Authorized' })
                }
            }
        })
    } else {
        return res.sendStatus(401).json({ message: 'Not authorized, token not available' })
    }
}

exports.userAuth = (req, res) => {
    const token = req.cookies.jwt

    if (token) {
        jwt.verify(token, jwtSecret, (err, decodedToken) => {
            if (err) {
                return res.sendStatus(401).json({ message: 'Not authorized' })
            } else {
                if (decodedToken !== 'user') {
                    return res.sendStatus(401).json({ message: 'not authorized' })
                } else {
                    res.sendStatus(200).json({ message: 'Authorized' })
                }
            }
        })
    } else {
        return res.sendStatus(401).json({ message: 'not authorized, token not available!' })
    }
}