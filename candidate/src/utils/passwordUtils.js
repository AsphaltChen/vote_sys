const crypto = require("crypto");

module.exports = {
  hash: function hash(password, salt) {
    let sha = crypto.createHash("sha1");
    return sha
      .update(password)
      .update(salt)
      .digest("hex");
  }
};
