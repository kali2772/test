/* MONGOURI =
  "mongodb+srv://deep:yzz2TLdLWn85iQE@instaclone.ujube9a.mongodb.net/retryWrites=true&w=majority";
JWT_SECRET="yzz2TLdLWn85iQEins"
module.exports={MONGOURI,JWT_SECRET}
 */
/* module.exports = {
  MONGOURI:
    "mongodb+srv://deep:yzz2TLdLWn85iQE@instaclone.ujube9a.mongodb.net/retryWrites=true&w=majority",
  JWT_SECRET: "yzz2TLdLWn85iQEins",
  SANDGRID_API_KEY:
    "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",
}; */

if (process.env.NODE_ENV == "production") {
  console.log("production side");
  module.exports = require("./prod");
} else {
  console.log("development side");
  module.exports = require("./dev");
}
