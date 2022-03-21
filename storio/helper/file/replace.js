var fs = require("fs");

const replace = (filename, content) => {
  fs.writeFileSync(`storio/user/storage/${filename}.txt`, content, function (err) {
    if(err) {
      throw err;  
    };
  });
}

module.exports = replace;