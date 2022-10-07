const bcrypt = require('bcrypt');

const encrypt = {
  /**
   *
   * @param {string} password
   * @return {string} hash
  */
  hashPassword: (password) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
  },

  /**
   *
   * @param {string} password
   * @param {void} hashPassword
   * @return {string} compare
  */
  comparePassword: (password, hashPassword) => {
    const compare = bcrypt.compareSync(password, hashPassword);
    return compare;
  },
};

module.exports = encrypt;
