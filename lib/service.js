'use strict'

const { default: axios } = require('axios')
const Config = require('./config')

/**
 * 
 */
class Service {

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
    request(method, url, headers, data) {

        const defaultHeaders = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'User-Agent': this.Config.userAgent
        }
        const headersRequest = {
            ...defaultHeaders,
            ...headers,
        }

        let requestBody = {}
        let requestParam = {}

        if (method.toLowerCase() == 'get') {
            requestParam = data
        } else {
            requestBody = data
        }

        return new Promise(function(resolve, reject) {
            const response = axios({
                method: method,
                url: url,
                headers: headersRequest,
                data: requestBody,
                params: requestParam
            }).then(function(res) {
                const { data } = res
                resolve(data)
            }).catch(function(err) {
                if (err.response.data) {
                    resolve(err.response.data)
                }
                reject(new Error('Something is not right!'));
            })
        })
    }

}

module.exports = Service