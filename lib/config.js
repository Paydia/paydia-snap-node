'use strict'

const _ = require('lodash')
/**
 * Paydia SNAP Configuration
 */

class Config {

    /**
     * Constructor
     * 
     * @param options
     * 
     * @return void
     */
    constructor(options = {
        production: true,
        clientId: '',
        clientSecret: '',
        privateKey: '',
        channelId: ''
    }) {
        this.BASE_URL_SANDBOX = 'https://api.paydia.co.id'
        this.BASE_URL_PRODUCTION = 'https://api.paydia.id'

        this.production = true
        this.clientId = ''
        this.clientSecret = ''
        this.privateKey = ''
        this.channelId = '12345'
        this.userAgent = 'paydia-snap-node-v1.0.0'
        this.baseUrl = this.BASE_URL_PRODUCTION
        this.section = '/snap'
        this.version = 'v1.0'

        this.set(options)
    }
    
    /**
     * Gets the default configuration instance
     * 
     * @return {Object}
     */
    getDefaultConfig = () => {
        let config = {
            production: this.production,
            clientId: this.clientId,
            clientSecret: this.clientSecret,
            privateKey: this.privateKey,
            channelId: this.channelId,
            userAgent: this.userAgent,
            baseUrl: this.baseUrl,
            section: this.section,
            version: this.version,
        }

        return config
    }

    /**
     * Set configuration options
     * 
     * @param {Object} options
     * 
     * @return void
     */
    set(options) {
        let currentConfig = {
            production: this.production,
            clientId: this.clientId,
            clientSecret: this.clientSecret,
            privateKey: this.privateKey,
            channelId: this.channelId,
        }

        const parsedOptions = _.pick(options, ['production', 'clientId', 'clientSecret', 'privateKey'])
        let mergedConfig = _.merge({}, currentConfig, parsedOptions)
    
        this.production = mergedConfig.production
        this.clientId = mergedConfig.clientId
        this.clientSecret = mergedConfig.clientSecret
        this.privateKey = mergedConfig.privateKey

        if (!this.production) {
            this.baseUrl = this.BASE_URL_SANDBOX
        }
    }

    /**
     * 
     */
    getBaseUrl() {
        const baseUrl = this.baseUrl + this.section + '/' + this.version
        return baseUrl
    }
}

module.exports = Config