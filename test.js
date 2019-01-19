const path = require('path');
const scanDir = require('./scanDir.js');
const getImports = require('./getImports.js');

const SEARCH_RE = /data\/currency$/;
const newLib = '../src/lib/currency';
const CUR_RE = /CURRENCY_(RUR|USD|EUR)/g;

scanDir('../test', function (file) {
    getImports(file, function (item) {
        if (SEARCH_RE.test(item.fullpath)) {
            console.log(file.fullname);
            /*
            file.read(function (error, data) {
                data = data.toString();
                data = data.replace(item.path, path.relative(file.dir, newLib));
                data = data.replace(item.items, '{ CURRENCY }');
                data = data.replace(CUR_RE, 'CURRENCY.$1');

                file.write(data);
            });
            */
        }
    });
});
