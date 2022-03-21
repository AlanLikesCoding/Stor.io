const check = require('./helper/datatype/check.js');
const convert = require('./helper/datatype/convert.js');
const replace = require('./helper/file/replace.js');
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
          write(name, `${value}.${coltype(i)}`);
        }
      }
    }
    return data;
  }
  editObj(obj) {
    let data = {};
    let name = this.name;
    let num = this.num;
    let cols = this.cols;
    for(let i = 0; i < this.num; i++) {
      data[this.cols[i].colname] = obj[this.cols[i].colname]; 
    }
    let extract = read(this.name).split('\n');
  
    data.save = function() {
      let parsed = '';
      for (let i = 0; i < num; i++) {
        const coltype = cols[i].coltype;
        const value = data[cols[i].colname];
        if(i !== num - 1) {
          parsed += `${value}.${coltype}|`;
        } else {
          parsed += `${value}.${coltype}`;
        }
      }
      extract[obj.pk] = parsed.toString();
      extract = extract.join('\n');
      replace(name, extract);
    }
    return data;
  }
  new() {
    return this.newObj();
  }
  extract() {
    const rows = read(this.name).split('\n');
    const data = [];
    for(var i = 0; i < rows.length; i++) {
      if(rows[i] == null || rows[i].replace(' ', '').split('').length == 0) {
        continue;
      }
      const row = rows[i].split('|');
      let extracted = {}
      for (let i = 0; i < this.cols.length; i++) {
        const value = row[i].split('.')[0];
        const type = row[i].split('.')[1];
        const insert = convert(value, type);
        extracted[this.cols[i].colname] = insert;
      }
      extracted['pk'] = i;
      data.push(this.editObj(extracted));
    }
    return data;
  }
  filter(obj) {
    const keys = Object.keys(obj);
    const extracted = this.extract();
    let data = [];
    for(let i = 0; i < extracted.length; i++) {
      if(keys.length > this.num) {
        throw "error";
      }
      let matched = true;
      for(let j = 0; j < keys.length; j++) {
        if(matched == false) {
          break;
        } 
        if(extracted[i][keys[j]] !== obj[keys[j]]) {
          matched = false;
        }
      }
      if(matched == true) {
        data.push(extracted[i]);
      }
    }
    return data;
  }
}

module.exports = table;