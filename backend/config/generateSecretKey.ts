

const generateSecretKey = () => {
    const crypto = require('crypto')
    return crypto.randomBytes(64).toString('hex');
}

const secretKey = generateSecretKey();


export default secretKey;