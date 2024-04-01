const Config = require('./lib/config')
const Util = require('./lib/util')
const Service = require('./lib/service')
const Auth = require('./lib/auth')
const Mpm = require('./lib/mpm')

class PaydiaSnap {

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
        this.Service = new Service(options)
        this.Auth = new Auth(options)
        this.Mpm = new Mpm(options)
    }
}

module.exports = PaydiaSnap