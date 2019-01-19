const path = require('path');

const IMPORT_RE = /(?:^|\n)import\s+(\w+|\{[^{}]+\})\s+from\s+'([^']+)';/g;

function resolve(directory, dependency) {
    return (dependency[0] === '.')
        ? path.resolve(directory, dependency)
        : dependency;
}

function getImports(file, callback) {
    file.read(function (error, data) {
        if (!error) {
            data = data.toString();
            let regMatch = IMPORT_RE.exec(data);
            let item;

            while (regMatch) {
                if (callback) {
                    callback.call(file, {
                        raw: regMatch[0],
                        items: regMatch[1],
                        path: regMatch[2],
                        fullpath: resolve(file.dir, regMatch[2])
                    });
                }
                regMatch = IMPORT_RE.exec(data);
            }
        }
    });
}

module.exports = getImports;

