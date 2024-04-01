'use strict'

const Config = require('./config')
const Util = require('./util')
const Service = require('./service')

/**
 * 
 */
class Mpm {

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
    generateQr(token, payload, externalId = "", timestamp = "") {
        if (externalId == "") {
            externalId = + new Date()
        }

        if (timestamp == "") {
            timestamp = this.Util.getTimestamp()
        }

        const url = this.Config.getBaseUrl() + '/qr/qr-mpm-generate'
        const sign = this.Util.generateSignatureService('POST', this.Config.section + '/' + this.Config.version + '/qr/qr-mpm-generate', token, payload, timestamp)
        const headers = {
            'Authorization': 'Bearer ' + token,
            'X-Timestamp': timestamp,
            'X-Partner-Id': this.Config.clientId,
            'X-Signature': sign,
            'X-External-Id': externalId.toString(),
            'Channel-Id': this.Config.channelId,
        }

        return this.Service.request('POST', url, headers, payload)
    }

    /**
     * 
     */
    checkStatusQr(token, payload, externalId = "", timestamp = "") {
        if (externalId == "") {
            externalId = + new Date()
        }

        if (timestamp == "") {
            timestamp = this.Util.getTimestamp()
        }

        payload = Object.assign(payload, {
            serviceCode: '47'
        })

        const url = this.Config.getBaseUrl() + '/qr/qr-mpm-status'
        const sign = this.Util.generateSignatureService('POST', this.Config.section + '/' + this.Config.version + '/qr/qr-mpm-status', token, payload, timestamp)
        const headers = {
            'Authorization': 'Bearer ' + token,
            'X-Timestamp': timestamp,
            'X-Partner-Id': this.Config.clientId,
            'X-Signature': sign,
            'X-External-Id': externalId.toString(),
            'Channel-Id': this.Config.channelId,
        }

        return this.Service.request('POST', url, headers, payload)
    }

}

module.exports = Mpm