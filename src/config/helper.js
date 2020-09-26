const helper = {}

helper.randomNumber = () => {
    const possible = 'abcdefghijklmnopqrstuvwxyz0123456789'
    let randomId = ''
    for (let i = 0; i < 20; i++) {
        randomId += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return randomId.toUpperCase()

}

module.exports = helper