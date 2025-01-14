const User = require("../models/User");

let findUser = async (email)=>{
    const userData = await User.findOne({ email });
    return userData;
}

module.exports = {findUser}