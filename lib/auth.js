'use strict'

const Config = require('./config')
const Util = require('./util')
const Service = require('./service')

/**
 * 
 */
class Auth {

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
        this.Util = new Util(options)
        this.Config = new Config(options)
        this.Service = new Service(options)
    }

    /**
     * 
     */
    getAccessTokenB2b(timestamp = "") {
        if (timestamp == "") {
            timestamp = this.Util.getTimestamp()
        }

        const url = this.Config.getBaseUrl() + '/access-token/b2b'
        const sign = this.Util.generateSignatureAuth(timestamp)
        const headers = {
            'X-Timestamp': timestamp,
            'X-Client-Key': this.Config.clientId,
            'X-Signature': sign,
        }

        const payload = {
            grantType: 'client_credentials'
        }

        return this.Service.request('POST', url, headers, payload)
        
    }

}

module.exports = Auth