# Stor.io

Stor.io is a Node.js library for storing files. It operates in a SQL-like manner, and stores its information as table structures in text files. It has a ORM interface for inserting and extracting database and is made for lightweight webapps and PWA's because of its easy setup.

## Installation

Currently, there isn't a easy solution for installing Stor.io on your website, so you will have to `git clone` this repo.
```bash
git clone https://github.com/AlanLikesCoding/Stor-io.git
```

## Usage

Currently, proper documentation has not been made, althought it would be appreciated if you could make pull requests to do so.
```js
const table = require('./storio/main.js');

const myTable = table(`
column1:string
column2:int
`, 'example');

myTable.insert('Hello', 123);

myTable.extract();
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate. As of right now, please use the SemVer versioning scheme and put your changes in the [changelog](CHANGELOG.md) file.

## License
[GNU AGPLv3](LICENSE.txt)