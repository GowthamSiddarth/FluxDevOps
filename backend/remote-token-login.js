const url = require('url');

const remoteTokenLogin = (baseUrl, username, token) => {
    const myUrl = url.parse(baseUrl);
    return myUrl.protocol + '//' + username + ':' + token + '@' + myUrl.host + myUrl.path
}

module.exports = remoteTokenLogin;