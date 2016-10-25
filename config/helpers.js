var path = require('path');
var _root = path.resolve(__dirname, '..');

function root(args) {
    args = Array.prototype.slice.call(arguments, 0);

    console.log('args :'+ args);
    return path.join.apply(path, [_root].concat(args));
}
exports.root = root;
