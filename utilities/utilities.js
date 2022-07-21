// Dependencies
const bcrypt = require('bcrypt');



async function hashStr(str) {
    try {
        return await bcrypt.hash(str, 8)
    } catch (error) {
        throw error
    }
}



// Module Export
module.exports = { hashStr };