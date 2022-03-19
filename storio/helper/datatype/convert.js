const datatypes = require('./datatypes.js');

const convert = (value, type) => {
  switch(type) {
    case datatypes.int:
      return parseInt(value);
      break;
    case datatypes.string:
      return value.toString();
      break;
    default:
      console.log(type)
      let error = "Invalid type: \"" + type + "\". Please use one of our prexisisting types.";
      throw error;
  }
}

module.exports = convert;