import User from '../models/users'
import jwt from 'jsonwebtoken'

export async function loginAuth(req, res) {
    const requireKeys = [
        "email",
        "password"
    ];

    for (let i = 0; i < requireKeys.length; i++) {
        let isInside = false;
        for (let key in req.body) {
            if (requireKeys[i] === key) {
                isInside = true;
            }
        }
        if (!isInside) {
            return res.status(400).send({
                msg: `Missing Parameter ${requireKeys[i]}`
            });
        }
    }
    const user = await User.findOne({
        email: req.body.email
    })

    if (!user) {
        return res.status(404).send({
            msg: "Niepoprawny email lub hasło"
        })
    }

    user.comparePassword(req.body.password, (err, isMatch) => {
        if (err || isMatch === false) {
            return res.status(400).send({
                msg: "Niepoprawny email lub hasło"
            })
        }
        const token = jwt.sign({ email: req.body.email }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN
        })
        return res.cookie("token", token, {
            expires: new Date(Date.now() + 604800000),
            secure: false,
            httpOnly: true
        }).send()
    })
}

export async function testAuth(req, res) {
    res.send({ user: req.user })
}