import User from '../models/users'
import VideoCourse from '../models/video_courses'
import uuid from 'uuid/v1'
import { loadTemplate, sendEmail } from "../config/mailer";

export function createUser(req, res) {
    const requireKeys = [
        "firstname",
        "lastname",
        "email",
        "password",
        "phone",
        "postalCode",
        "country",
        "street"
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

    const { firstname, lastname, email, password, phone, postalCode, country, street } = req.body

    const confirmCode = uuid()

    const dataToInvoice = {
        firstname, lastname, postalCode, country, street
    }

    if (req.body.companyName !== undefined && req.body.taxNumber !== undefined) {
        dataToInvoice.companyName = req.body.companyName
        dataToInvoice.taxNumber = req.body.taxNumber
    }

    const user = {
        firstname, lastname, email, password, phone,
        dataToInvoice
    }

    User.create({ ...user, confirmCode }).then((doc) => {
        let url = ""

        if (process.env.MODE === "DEV") {
            url = `http://localhost:3000/confirm/${confirmCode}`
        } else {
            url = `https://logistic-calc.com/confirm/${confirmCode}`
        }
        loadTemplate("confirmCreate", [
            { firstname, lastname, url }
        ])
            .then(async result => {
                sendEmail({
                    to: doc.email,
                    subject: `TTS Potwierdzenie założenia konta`,
                    html: result[0].email.html,
                    text: result[0].email.text
                });

                res.status(201).send({ msg: "User created successfuly" })
            })
            .catch(err => {
                console.log(err)
                return res.status(500).send({ msg: "Error while sending email" })
            });

    }).catch(err => {
        if (err.name === 'MongoError' && err.code === 11000) {
            return res.status(400).send({ msg: "Email has to be unique" })
        }
        return res.status(422).send({})
    })

}

export async function confirmUser(req, res) {
    if (!req.body.confirmCode) {
        return res.status(400).send({ msg: "Missing parameter confirmCode" })
    }

    const { confirmCode } = req.body

    const userToConfirm = await User.findOne({ confirmCode })
    if (!userToConfirm) {
        return res.status(404).send({ msg: "Confirmation code doesn't exists" })
    }

    User.updateOne({ confirmCode }, { isConfirmed: true }).then(async () => {
        res.status(201).send({ msg: "User confirmed" })
    }).catch(err => {
        console.log(err)
        return res.status(500).send({ msg: "Unhandled Error" })
    })
}

export async function getMyCourses(req, res) {

    const user = await User.findOne({
        email: req.user.email
    })

    if (!user) {
        return res.status(401).send({
            msg: "User doesn't exist"
        })
    }

    const videoCourses = await VideoCourse.find({
        name: {
            $in: user.videoCourses
        }
    })

    res.send({
        videoCourses
    })

}

export async function getProfile(req, res) {
    const user = await User.findOne({
        email: req.user.email
    }, {
            password: 0
        })

    if (!user) {
        return res.status(401).send({
            msg: "User doesn't exist"
        })
    }
    res.send({
        user
    })
}