import AWS from 'aws-sdk'
import fs from 'fs'
import path from 'path'

const privateKey = fs.readFileSync(path.join(__dirname, "key.pem"))

const cloudFront = new AWS.CloudFront.Signer('PUBLIC_ACCESS_KEY', privateKey)

export function getSignedURL(urlToFile) {
    return new Promise((resolve, reject) => {
        cloudFront.getSignedUrl({
            url: `${process.env.CLOUDFRONT_URL}/${urlToFile}`,
            expires: Math.floor((new Date()).getTime() / 1000) + (60 * 60 * 2)
        }, (err, url) => {
            resolve(url)
        })
    })
}