(function(modules){
      function require(filename){
        var fn = modules[filename];
        var module = { exprots:{}};

        fn(require,module,module.exports);

        return module.exports;
      }

      require('D:\gitCode\webpack\simplepackself\src\index.js')
    })({'D:\gitCode\webpack\simplepackself\src\index.js': function(require,module,exports){ "use strict";

var _greeting = require("./greeting.js");

// 文件后缀需要处理的

document.write((0, _greeting.greeting)('Jane'));},'./greeting.js': function(require,module,exports){ "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.greeting = greeting;
function greeting(name) {
  return 'hello' + name;
}},})