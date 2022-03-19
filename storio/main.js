const check = require('./helper/datatype/check.js')
const convert = require('./helper/datatype/convert.js')
const write = require('./helper/file/write.js');
const read  = require('./helper/file/read.js');
class table {
  constructor(schema, name) {
    this.schema = schema;
    this.name = name;
    this.cols = [];
    this.num = 0;
  }
  init() {
    const cols = this.schema.split('\n');
    this.num = cols.length;
    write(this.name, '');
    for (let i = 0; i < cols.length; i++) {
      const colname = cols[i].split(':')[0];
      const coltype = cols[i].split(':')[1];
      check(coltype);
      this.cols.push({
        colname: colname,
        coltype: coltype,
      });
    }
  }
  insert(data) {
    for (let i = 0; i < this.num; i++) {
      const coltype = this.cols[i].coltype;
      const value = data[coltype];
      if(i !== this.num - 1) {
        write(this.name, `${value}.${coltype}|`);
      } else {
        write(this.name, `${value}.${coltype}\n`);
      }
    }
  }
  newObj() {
    let data = {};
    const num = this.num;
    const name = this.name;
    const coltype = (i) => {
      return this.cols[i].coltype;
    }
    const colname = (i) => {
      return this.cols[i].colname;
    }
    for (let i = 0; i < this.cols.length; i++) {
      data[this.cols[i].colname] = '';
    }
    data.save = function() {
      for (let i = 0; i < num; i++) {
        const value = data[colname(i)];
        if(i !== num - 1) {
          write(name, `${value}.${coltype(i)}|`);
        } else {
          write(name, `${value}.${coltype(i)}\n`);
        }
      }
    }
    return data;
  }
  editObj() {
    
  }
  filterObj() {
    
  }
  new() {
    return this.newObj();
  }
  filter() {
    return this.filterObj();
  }
  extract() {
    const rows = read(this.name).split('\n');
    const data = [];
    for(var i = 0; i < rows.length; i++) {
      if(rows[i] == null || rows[i].replace(' ', '').split('').length == 0) {
        break;
      }
      const row = rows[i].split('|');
      let params = {}
      for (let i = 0; i < this.cols.length; i++) {
        const value = row[i].split('.')[0];
        const type = row[i].split('.')[1];
        const insert = convert(value, type);
        params[this.cols[i].colname] = insert;
      }
      data.push(params);
    }
    console.log(data)
  }
}

module.exports = table;