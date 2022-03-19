const datatypes = require('./datatypes.js');

const check = (type) => {
  switch(type) {
    case datatypes.int:
      return true;
      break;
    case datatypes.string:
      return true;
      break;
    case datatypes.arr:
      return true;
      break;
    default:
      console.log(type)
      let error = "Invalid type: \"" + type + "\". Please use one of our prexisisting types.";
      throw error;
  }
}

module.exports = check;