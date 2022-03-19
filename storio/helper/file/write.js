var fs = require("fs");

const read = (filename, content) => {
  fs.appendFileSync(`storio/user/storage/${filename}.txt`, content, function (err) {
    if(err) {
      throw err;  
    };
  });
}

module.exports = read;