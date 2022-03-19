var fs = require("fs");

const read = (filename, process) => {
  return fs.readFileSync(`storio/user/storage/${filename}.txt`).toString();
}

module.exports = read;