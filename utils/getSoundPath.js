const path = require("path");

module.exports = function getSoundPath(category, filename) {
  return path.join(__dirname, "..", "sounds", category, filename);
};
