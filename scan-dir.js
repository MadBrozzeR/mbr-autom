const fs = require('fs');
const path = require('path');

function File(filename, directory) {
    this.name = filename;
    this.dir = directory;
    this.fullname = `${directory}/${filename}`;
}
File.prototype.read = function (callback) {
    fs.readFile(this.fullname, callback);
};
File.prototype.write = function (data) {
    fs.writeFile(this.fullname, data, function (error) {
        throw error;
    });
};
File.prototype.getAbsolutePath = function (callback) {
    fs.realpath(this.fullname, callback);
};
File.prototype.replace = function (regexp, replacer) {
    const file = this;
    file.read(function (error, data) {
        if (error) {
            return;
        }

        let result = data.toString().replace(regexp, replacer);
        file.write(result);
    });
};

function scanDir(directoryName, callback) {
    fs.readdir(directoryName, function (error, files) {
        if (error) {
            throw error;
        } else {
            for (let index = 0; index < files.length; ++index) {
                let filename = path.join(directoryName, files[index]);

                fs.stat(filename, function (error, stat) { // eslint-disable-line no-loop-func
                    if (!error) {
                        if (stat.isDirectory()) {
                            scanDir(filename, callback);
                        } else if (stat.isFile()) {
                            callback(new File(files[index], directoryName));
                        }
                    }
                });
            }
        }
    });
}

module.exports = scanDir;
