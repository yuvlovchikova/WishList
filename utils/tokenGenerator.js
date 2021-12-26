require("dotenv").config();
const jwt = require("jsonwebtoken");

function tokenGenerator(user_id) {
  const payload = {
    user: user_id
  }

  return jwt.sign(payload, "" + process.env.wish_list_secret, {expiresIn: "36h"});
}

module.exports = tokenGenerator;
