const table = require('./storio/main.js');

const myTable = new table(
`col1:string
col2:int
col3:string`, 'user1'
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

// let entry1 = myTable.new();
// entry1.col1 = 'entry2';
// entry1.col2 = 1234;
// entry1.col3 = 'asd';
// entry1.save();

// let entry2 = myTable.new();
// entry2.col1 = 'entry2';
// entry2.col2 = 123;
// entry2.col3 = 'asd';
// entry2.save();
// const entries = myTable.filter()
let initial = new Date();
// myTable.filter({
//   col1: 'entry2',
//   col2: 1234,
// })
// let final = new Date();
// // console.log('time elapsed: ', final - initial)
// console.log(myTable.parse({
//   col1: 'entry2',
//   col2: 1,
//   col3: 'hello',
// }))
let edit = myTable.filter({col1: 'entry2'})[3];
edit.col1 = 'edited';
edit.save();