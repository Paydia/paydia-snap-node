'use strict'

const Config = require('./config')

const crypto = require('crypto')
const forge = require('node-forge')

/**
 * 
 */
class Util {

    /**
     * 
     */
    constructor(options = {
        production: true,
        clientId: '',
        clientSecret: '',
        privateKey: '',
        channelId: ''
    }) {
        this.Config = new Config(options)
    }

    /**
     * 
     */
    getTimestamp() {
        let timeStamp = new Date()
        timeStamp = timeStamp.toISOString().slice(0, 19)
        timeStamp += '+07:00'
        return timeStamp
    }

    /**
     * 
     */
    generateStringPayloadSignature(...args) {
        let payload = ""
        if (args.length === 0) return ""
    
        for (let i = 0; i < args.length; i++) {
            payload += args[i]
            if (i !== (args.length - 1)) {
                payload += "|"
            }
        }
        
        return payload
    }

    /**
     * 
     */
    generateSignatureAuth(timestamp) {
        let privateKey = this.Config.privateKey
        privateKey = `-----BEGIN RSA PRIVATE KEY-----${privateKey}-----END RSA PRIVATE KEY-----`
    
        const strToSign = this.generateStringPayloadSignature(this.Config.clientId, timestamp)

        const rsaPrivateKey = forge.pki.privateKeyFromPem(privateKey)
        const md = forge.md.sha256.create()
        md.update(strToSign, 'utf8')
        const signature = rsaPrivateKey.sign(md)
        const signatureBase64 = forge.util.encode64(signature)

        return signatureBase64
    }

    /**
     * 
     */
    sha256HexEncode(data) {
        const hash = crypto.createHash('sha256')
        hash.update(data)
        return hash.digest('hex').toLowerCase()
    }

    /**
     * 
     */
    hmacSha512Base64Encode(data, secretKey) {
        const hmac = crypto.createHmac('sha512', secretKey)
        hmac.update(data)
        return hmac.digest('base64')
    }
    
    /**
     * 
     */
    generateSignatureService(method, path, token, payload, timestamp) {
        payload = JSON.stringify(payload)
        payload = this.sha256HexEncode(payload)

        const strToSign = method + ':' + path + ':' + token + ':' + payload  + ':' + timestamp
        console.log("====strToSign", strToSign);
        const signature = this.hmacSha512Base64Encode(strToSign, this.Config.clientSecret)

        return signature
    }
}

module.exports = Util