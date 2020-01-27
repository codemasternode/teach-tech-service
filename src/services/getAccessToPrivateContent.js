import AWS from 'aws-sdk'
import fs from 'fs'
import path from 'path'

const privateKey = fs.readFileSync(path.join(__dirname, "private_key.pem")).toString()
const publicKey = fs.readFileSync(path.join(__dirname, "public_key.pem")).toString()

const cloudFront = new AWS.CloudFront.Signer(publicKey, privateKey)

export function getSignedURL(urlToFile) {
    return new Promise((resolve, reject) => {
        cloudFront.getSignedUrl({
            url: `${process.env.CLOUDFRONT_URL}/video_courses${urlToFile}`,
            expires: Math.floor((new Date()).getTime() / 1000) + (60 * 60 * 2)
        }, (err, url) => {
            if (err) {
                console.log(err)
                reject(err)
            }
            resolve(url)
        })
    })
}