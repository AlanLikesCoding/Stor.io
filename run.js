const table = require('./storio/main.js');

const myTable = new table(
`col1:string
col2:int
col3:string`, 'user'
)

myTable.init();
// for(var i = 0; i < 1000000; i++) {
//   console.log(i)
//   myTable.insert('bye', 5, 'yo')  
// }
// let entry = myTable.new();
// entry.col1 = 'entry';
// entry.col2 = 123;
// entry.col3 = 'asd';
// entry.save();

// const entries = myTable.filter()
let initial = new Date();
myTable.extract()
let final = new Date();
console.log('time elapsed: ', final - initial)