const bcrypt = require('bcryptjs')

hashPassword = async (password, saltRounds = 10) => {
    try {
      const salt = await bcrypt.genSalt(saltRounds);
      const hashedPassword = await bcrypt.hash(password, salt);
      return hashedPassword;
    } catch (error) {
      throw new Error('Error hashing the password: ' + error.message);
    }
  };

  module.exports = {
    hashPassword
  }